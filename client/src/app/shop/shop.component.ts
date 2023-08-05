import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { Product } from '../shared/models/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{

  productList : Product[] = [];
  constructor(private shopService : ShopService) { }
  ngOnInit(): void {
    this.shopService.getProducts().subscribe({
      next : response => {this.productList = response.data},
      error : error => console.log(error)
    })
  }

}
