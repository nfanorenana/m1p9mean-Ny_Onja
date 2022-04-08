import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  user: any;
  authToken: any;

  constructor(private http: HttpClient, private authService: AuthService) {}

  addUser(user) {
    this.authToken = this.authService.loadToken();
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.authToken);
    return this.http.post<any>(environment.apiUrl + 'user/create-user', user, {
      headers: headers,
    });
  }

  getUser() {
    this.authToken = this.authService.loadToken();
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.authToken);
    return this.http.get<any>(environment.apiUrl + 'user/list-user', {
      headers: headers,
    });
  }

  getUserByRole(role: String) {
    this.authToken = this.authService.loadToken();
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.authToken);
    return this.http.get<any>(environment.apiUrl + 'user/list-user/' + role, {
      headers: headers,
    });
  }

  addRestaurant(restaurant: any) {
    this.authToken = this.authService.loadToken();
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.authToken);
    return this.http.post<any>(
      environment.apiUrl + 'restaurant/add-restaurant',
      restaurant,
      {
        headers: headers,
      }
    );
  }
}
