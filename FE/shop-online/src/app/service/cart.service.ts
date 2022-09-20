import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ProductOrder} from '../model/product-order';
import {Observable} from 'rxjs';
import {Customer} from '../model/customer';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addOrder(productOrder: ProductOrder): Observable<ProductOrder> {
    return this.http.post(API_URL + '/add/cart', productOrder);
  }

  getProductInCardByCustomer(customer: Customer): Observable<ProductOrder[]> {
    return this.http.post<ProductOrder[]>(API_URL + '/cart/products', customer);
  }

  minusQuantity(productOrder: ProductOrder): Observable<ProductOrder[]> {
    return this.http.post<ProductOrder[]>(API_URL + '/cart/minus/quantity', productOrder);
  }

  plusQuantity(productOrder: ProductOrder): Observable<ProductOrder[]> {
    return this.http.post<ProductOrder[]>(API_URL + '/cart/plus/quantity', productOrder);
  }

  deleteProductInCard(po: ProductOrder): Observable<any> {
    return this.http.post(API_URL + '/cart/delete', po);
  }

  goPayment(customer: Customer): Observable<any> {
    return this.http.post(API_URL + '/cart/payment', customer);
  }
}
