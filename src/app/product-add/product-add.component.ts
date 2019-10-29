import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProductsService } from '../products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../Product';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  product: Product = new Product();

  angForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private productService: ProductsService,
    private router: Router, private route: ActivatedRoute,
    private toastr: ToastrService) {


  }

  products: Observable<Product[]>;

  //get formControls() { return this.angForm.controls; }

  createForm() {
    this.angForm = this.fb.group({
      ProductName: ['', Validators.required],
      ProductDescription: ['', Validators.required],
      ProductPrice: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.createForm();
  }

  /*
  mapFormValuesToProductModel() {

    this.product.productName=this.angForm.get('ProductName').value;
    this.product.productDescription=this.angForm.get('ProductDescription').value;
    this.product.productPrice=this.angForm.get('ProductPrice').value;
    
  }
  newProduct(): void {
    this.submitted = false;
    this.product = new Product();
  }
  */

  save() {
    this.productService.createProduct(this.product)
      .subscribe(data => console.log(data)
        , error => console.log(error));
    this.toastr.success('Product has been successfully Inserted', 'Product App');
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.product = new Product();
    //this.product = Object.assign({}, this.product, this.angForm.value);
    this.product.productName = this.angForm.controls.ProductName.value;
    this.product.productDescription = this.angForm.controls.ProductDescription.value;
    this.product.productPrice = this.angForm.controls.ProductPrice.value;
    this.save();

  }

  gotoList() {
    this.products = this.productService.getProductList();
    this.router.navigate(['/products']);
  }

}
