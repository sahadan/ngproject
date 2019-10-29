import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './Product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl = 'http://localhost:10755/DemoDynamicProject/api';

  constructor(private http: HttpClient) { }

  /*
  addProduct(productName: any, productDescription: any, productPrice: any) {
    const obj = {
      productName,
      productDescription,
      productPrice
    };
    console.log(obj);
    this.http.post('${this.uri}/insertproduct', obj)
        .subscribe(res => console.log('Done'));
  }
*/

  getProduct(id: number): Observable<any> {
    //return this.http.get('${this.baseUrl}/${id}');
    return this.http.get(this.baseUrl+'/productbyid/'+id);
  }


  getProducts() {
    return this.http.get<Product[]>(this.baseUrl+'/products');
   }

   addProductOne(product: Product){
    console.log(product);
    return this.http.post(this.baseUrl+ '/insertproduct/', product );
  }

  createProduct(product: Product): Observable<Object> {
    //return this.http.post('${this.baseUrl}', employee);
    console.log(product);
    return this.http.post(this.baseUrl+'/insertproduct', product);
    
  }

  createProductTest(product: Product) {
    //return this.http.post('${this.baseUrl}', employee);
    console.log(product);
    return this.http.post(this.baseUrl+'/insertproduct', product);
    
  }

  updateProduct(id: number, product: Product): Observable<any> {
    //return this.http.put('${this.baseUrl}/${id}', value);
    return this.http.put(this.baseUrl+'/updateproductbyid/'+id, product);
  }

  deletePoduct(id: number,  product: Product): Observable<any> {
    //return this.http.delete('${this.baseUrl}/${id}', { responseType: 'text' });
    return this.http.put(this.baseUrl+'/disableproduct/'+id, product);
  }

  getProductList(): Observable<any> {
    return this.http.get(this.baseUrl+'/products');
  }
  
}
