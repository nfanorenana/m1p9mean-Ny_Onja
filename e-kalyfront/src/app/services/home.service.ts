import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getRestaurant() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(
      environment.apiUrl + 'restaurant/get-restaurant',
      { headers: headers }
    );
  }
}
