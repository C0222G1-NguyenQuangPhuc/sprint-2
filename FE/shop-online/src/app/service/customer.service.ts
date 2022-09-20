import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../model/customer';
import {AppUser} from '../model/app-user';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  getCustomerByUsername(username: string): Observable<Customer> {
    return this.http.get<Customer>(API_URL + '/customers/get/' + username);
  }

  getAppUserFromUsername(username: string): Observable<AppUser> {
    return this.http.get<AppUser>(API_URL + '/get/user/' + username);
  }
}
