import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  quantity = 1;
  quantityInBasket = 0;

  constructor(private shopservice : ShopService, 
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService : BasketService){
      //Setting product details as empty string here so that before loading of the product
      // after clicking "view" on product we do not see name of the old product. If we do not 
      // set this to empty string than we will see name of previous product on top.  
      this.bcService.set('@productDetails', ' ')
    }
  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) this.shopservice.getProduct(+id).subscribe({
      next: product => {this.product = product,
      this.bcService.set('@productDetails', product.name),
      //As it is a non-HTTP req so if we subscribe it here then we are responsible to unsubcribe from it.
      //So one way to unsubscribe it is to make it complete. Here take(1) means that when we have one value 
      //of basketSource$ the the req will complete and effectively we will unsubscribe from it.
      this.basketService.basketSource$.pipe(take(1)).subscribe({
        next: basket => {
          //+id + is used to convert string id to number id.
          const item = basket?.items.find(x => x.id === +id);
          if(item){
            this.quantity = item.quantity;
            this.quantityInBasket = item.quantity;
          }
        }

      })
    },
      
      error: error => {console.log(error)}
    })
  }

  incrementQuantity(){
    this.quantity++;
  }

  decrementQuantity(){
    this.quantity--;
  }

  updateBasket(){
    if(this.product){
      if(this.quantity > this.quantityInBasket){
        const itemsToAdd = this.quantity - this.quantityInBasket;
        this.quantityInBasket = this.quantity;
        this.basketService.addItemToBasket(this.product, itemsToAdd);
      }else{
        const itemsToRemove =  this.quantityInBasket - this.quantity;
        this.quantityInBasket = this.quantity;
        this.basketService.removeItemFromBasket(this.product.id, itemsToRemove);
      }
    }
  }

  get buttonText() {
    return this.quantityInBasket === 0 ? 'Add to basket' : 'Update basket';
  }

}
