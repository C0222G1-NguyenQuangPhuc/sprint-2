import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../model/customer';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getNewProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + '/products/new');
  }

  getAllPageProducts(pageNumber: number): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + '/products/list');
  }

  findProductById(id: string): Observable<Product> {
    return this.http.get<Product>(API_URL + '/products/detail/' + id);
  }

  findAllByName(page: number, name: string): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + `/products/search/${page}?name=` + name);
  }

  findAllByCategory(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + '/products/filter?id=' + id);
  }

  getOrdersByCustomer(customer: Customer): Observable<any> {
    return this.http.post(API_URL + '/cart/ordered', customer);
  }

}
