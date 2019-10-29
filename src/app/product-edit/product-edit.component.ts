import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProductsService } from '../products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../Product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  angForm: FormGroup;
  product: any = {};
  products: Observable<Product[]>;
  submitted = false;

  constructor(private fb: FormBuilder, private productService: ProductsService,
    private router: Router, private route: ActivatedRoute,
    private toastr: ToastrService) {

    this.createForm();
  }


  createForm() {
    this.angForm = this.fb.group({
      ProductId: [null],
      ProductName: ['', Validators.required],
      ProductDescription: ['', Validators.required],
      ProductPrice: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productService.getProduct(params['id']).subscribe(res => {
        console.log(res);
        this.product = res;
      });
    });

  }

  save() {
    this.productService.updateProduct(this.product.productId, this.product)
      .subscribe(data => console.log(data)
        , error => console.log(error));
    this.toastr.success('Product has been successfully Updated','Product App');
    
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.product = new Product();
    //this.product = Object.assign({}, this.product, this.angForm.value);
    this.product.productId = this.angForm.controls.ProductId.value;
    this.product.productName = this.angForm.controls.ProductName.value;
    this.product.productDescription = this.angForm.controls.ProductDescription.value;
    this.product.productPrice = this.angForm.controls.ProductPrice.value;
    console.log(this.product.productId);
    this.save();

  }

  gotoList() {
    this.products = this.productService.getProductList();
    this.router.navigate(['/products']);
  }

}
