import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{

  @ViewChild('search') searchTerm?: ElementRef;
  productList : Product[] = [];
  brandList : Brand[] = [];
  typeList : Type[] = [];
  totalCount = 0;
  shopParams = new ShopParams();
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price High to Low', value: 'priceDesc'}
  ]

  
  constructor(private shopService : ShopService) { }
  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe({
      next : response => {
        this.productList = response.data,
        this.totalCount = response.count,
        this.shopParams.pageNumber = response.pageIndex,
        this.shopParams.pageSize = response.pagesize
      },
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
    this.shopParams.brandId= brandId;
    this.getProducts();
  }
  onTypeSelected(typeId : number){
    this.shopParams.typeId = typeId;
    this.getProducts();
  }
  onSortSelected(event : any){
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }

  onPageChanged(event : any){
    if(this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch(){
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.getProducts();
  }

  onReset(){
    if(this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
