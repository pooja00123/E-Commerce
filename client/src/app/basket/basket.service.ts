import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Basket, BasketItem, BasketTotals } from '../shared/models/basket';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<BasketTotals | null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();

  constructor(private http : HttpClient) { }

  getBasket(id : string){
    return this.http.get<Basket>(this.baseUrl + 'basket?id=' + id).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }

  setBasket(basket: Basket){
    return this.http.post<Basket>(this.baseUrl + 'basket', basket).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  addItemToBasket(item: Product | BasketItem, quantity =1){    
    if(this.isProduct(item)){
      item = this.mapProductItemtobasketItem(item);
    }    
    // If current basket value is null then we have to create a basket.
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addorUpdateItem(basket.items, item, quantity);
    this.setBasket(basket);
  }

  private addorUpdateItem(items: BasketItem[], itemToAdd : BasketItem, quantity: number): BasketItem[] {
    const item = items.find(x => x.id === itemToAdd.id);
    if (item) item.quantity += quantity;
    else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }
 
  removeItemFromBasket(id: number, quantity =1){
    const basket = this.getCurrentBasketValue();
    if(!basket) return;
    const item = basket.items.find(x => x.id === id);
    if(item){
      item.quantity -= quantity;
      if(item.quantity === 0){
        basket.items = basket.items.filter(x => x.id !== id);
      }
      if(basket.items.length > 0) this.setBasket(basket);
      else this.deleteBasket(basket);
    }
  }
  
  deleteBasket(basket: Basket) {
    return this.http.delete(this.baseUrl + 'basket?id' + basket.id).subscribe({
      next: () => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
      }
    })
  }

  private createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  // The product on which we click to add has different properties than the basket item that we 
  // are storing as basket item in redis database. So we need to map product to basket item. 
  private mapProductItemtobasketItem(item: Product): BasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity: 0,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand,
      type : item.productType
    }
  }

  private calculateTotals(){
    const basket = this.getCurrentBasketValue();
    if (!basket) return;
    const shipping = 0;
    const subtotal = basket.items.reduce((a,b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    this.basketTotalSource.next({shipping, total, subtotal});
  }

  // Function to check if the item is product or basketItem using Type Guard
  private isProduct(item: Product | BasketItem) : item is Product {
    return (item as Product).productBrand !== undefined;
  }
}
