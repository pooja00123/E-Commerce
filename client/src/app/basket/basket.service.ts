import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Basket, BasketItem } from '../shared/models/basket';
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

  constructor(private http : HttpClient) { }

  getBasket(id : string){
    return this.http.get<Basket>(this.baseUrl + 'basket?id=' + id).subscribe({
      next: basket => this.basketSource.next(basket)
    })
  }

  setBasket(basket: Basket){
    return this.http.post<Basket>(this.baseUrl + 'basket', basket).subscribe({
      next: basket => this.basketSource.next(basket)
    })
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  addItemToBasket(item: Product, quantity =1){
    const itemToAdd = this.mapProductItemtobasketItem(item);
    // If current basket value is null then we have to create a basket.
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addorUpdateItem(basket.items, itemToAdd, quantity);
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
}
