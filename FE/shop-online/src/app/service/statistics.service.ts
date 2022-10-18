import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Statistics} from '../model/statistics';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) {
  }

  getStatisticsWeek(): Observable<Statistics[]> {
    return this.http.get<Statistics[]>(API_URL + '/statistics/week');
  }

  getStatisticsMonth(): Observable<Statistics[]> {
    return this.http.get<Statistics[]>(API_URL + '/statistics/month');
  }

  getStatisticsYear(): Observable<Statistics[]> {
    return this.http.get<Statistics[]>(API_URL + '/statistics/year');
  }

  getStatisticsCustomer(): Observable<Statistics[]> {
    return this.http.get<Statistics[]>(API_URL + '/statistics/customer');
  }
}
