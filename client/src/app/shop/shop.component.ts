import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{

  productList : Product[] = [];
  brandList : Brand[] = [];
  typeList : Type[] = [];
  totalCount : number = 0;
  brandIdSelected : number = 0;
  typeIdSelected : number = 0;
  
  constructor(private shopService : ShopService) { }
  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.shopService.getProducts(this.brandIdSelected, this.typeIdSelected).subscribe({
      next : response => {this.productList = response.data, this.totalCount = response.count},
      error : error => console.log(error)
    })
  }
  getBrands(){
    this.shopService.getBrands().subscribe({
      next : response => this.brandList = [{id: 0, name: 'All'}, ...response],
      error : error => console.log(error)
    })
  }
  getTypes(){
    this.shopService.getTypes().subscribe({
      next : response => this.typeList = [{id: 0, name: 'All'}, ...response],
      error : error => console.log(error)
    })
  }
  onBrandSelected(brandId : number){
    this.brandIdSelected = brandId;
    this.getProducts();
  }
  onTypeSelected(typeId : number){
    this.typeIdSelected = typeId;
    this.getProducts();
  }

}
