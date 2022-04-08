import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) {}

  registerUser(user) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(environment.apiUrl + 'user/register', user, {
      headers: headers,
    });
    // return this.http.post<any>('user/register', user, {
    //   headers: headers,
    // });
  }

  authenticateUser(user) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(environment.apiUrl + 'user/authenticate', user, {
      headers: headers,
    });
    // return this.http.post<any>('user/authenticate', user, {
    //   headers: headers,
    // });
  }

  getOrder() {
    this.authToken = this.loadToken();
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.authToken);
    return this.http.get<any>(environment.apiUrl + 'user/order', {
      headers: headers,
    });
    // return this.http.get<any>('user/order', {
    //   headers: headers,
    // });
  }

  verifyUser(code) {
    console.log(code);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(environment.apiUrl + 'user/confirm/' + code, {
      headers: headers,
    });
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    return token;
  }

  loggedIn() {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user === null) {
      return false;
    }
    return true;
  }

  isAdmin() {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user.role !== 'admin') {
      return false;
    }
    return true;
  }

  isRestaurant() {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user.role !== 'restaurant') {
      return false;
    }
    return true;
  }

  isDeliveryMan() {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user.role !== 'delivery_man') {
      return false;
    }
    return true;
  }

  isUser() {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user.role !== 'user') {
      return false;
    }
    return true;
  }

  getUserInformation() {
    return JSON.parse(localStorage.getItem('user')!);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
