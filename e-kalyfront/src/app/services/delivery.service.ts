import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  authToken: any;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getOrderToDelivery() {
    this.authToken = this.authService.loadToken();
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.authToken);
    return this.http.get<any>(environment.apiUrl + 'order/get-order', {
      headers: headers,
    });
  }
}
