import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;

  constructor(private shopservice : ShopService, private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService){
      //Setting product details as empty string here so that before loading of the product
      // after clicking "view" on product we do not see name of the old product. If we do not 
      // set this to empty string than we will see name of previous product on top.  
      this.bcService.set('@productDetails', '')
    }
  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) this.shopservice.getProduct(+id).subscribe({
      next: product => {this.product = product,
      this.bcService.set('@productDetails', product.name)},
      error: error => {console.log(error)}
    })
  }

}
