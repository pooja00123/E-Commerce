import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './models/product';
import { Pagination } from './models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';
  productsList : Product[] = [];
  constructor(private http : HttpClient) {
    
  }
  ngOnInit(): void {
    this.http.get<Pagination<Product[]>>("https://localhost:7035/api/products?pageSize=50").subscribe({
      next : response =>{console.log(response),
      this.productsList = response.data} ,
      error : error => console.log(error),
      complete : () => {
        console.log('req completed');
        console.log('some extra logs');
      },    
    })
  }
 
}
