import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  checkLogin(): Observable<boolean> {
    return this.http.post<boolean>(API_URL + '/check/login', null);
  }

  getRoles(): Observable<any> {
    return this.http.post(API_URL + '/get/role', null);
  }

  checkAdminRole(): Observable<string> {
    return this.http.post<string>(API_URL + '/role/admin', null);
  }
}
