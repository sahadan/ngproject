import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../products.service';
import { Product } from '../Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.css']
})
export class ProductGetComponent implements OnInit {

  products: Product[];
 
  //Testing for git upload on seventh commit
  constructor(private productService: ProductsService, 
      private router: Router) { }

  ngOnInit() {

    this.productService.getProducts().subscribe(
      data => {
          console.log(data)
          //Testing
          this.products = data
      },
      error => {
          console.log(error);
      }
  )
  }

}
