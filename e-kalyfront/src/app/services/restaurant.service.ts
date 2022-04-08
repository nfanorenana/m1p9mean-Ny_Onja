import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  meal: any;
  authToken: any;

  constructor(private http: HttpClient, private authService: AuthService) {}

  addMeal(meal: any) {
    this.authToken = this.authService.loadToken();
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.authToken);
    return this.http.post<any>(environment.apiUrl + 'meal/add-meal', meal, {
      headers: headers,
    });
  }

  getMeal(id) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(
      environment.apiUrl + 'meal/get-restaurant-meal/' + id,
      {
        headers: headers,
      }
    );
  }

  getResponsible(id) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(
      environment.apiUrl + 'restaurant/get-restaurant-responsible/' + id,
      {
        headers: headers,
      }
    );
  }

  getOrder(id) {
    this.authToken = this.authService.loadToken();
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(
      environment.apiUrl + 'order/get-restaurant-order/' + id,
      {
        headers: headers,
      }
    );
  }

  orderMeal(meal: any[]) {
    this.authToken = this.authService.loadToken();
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.authToken);
    return this.http.post<any>(environment.apiUrl + 'order/add-order/', meal, {
      headers: headers,
    });
  }
}
