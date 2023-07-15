import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { 

  }

  login(email: any, password: any) {
    let url = environment.apiUrl;
    this.http.post(url + 'login', { email: email, password: password }).subscribe(response => this.setSession(response))
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['']);
  }

  setSession(response: any) {
    if (response.success === true) {
      localStorage.setItem('access_token', response.data.access_token);
      this.router.navigate(['booking/wizard']);
    }
  }

  getExpirationTime() {
    let accessToken = localStorage.getItem('access_token');

    if (accessToken != null) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(accessToken);
      const expirationDate = helper.getTokenExpirationDate(accessToken);
      return expirationDate;
    }
    return null;
  }

  isTokenExpired(): boolean {
    let isExpired = true;
    let accessToken = localStorage.getItem('access_token');

    if (accessToken != null) {
      const helper = new JwtHelperService();
      return helper.isTokenExpired(accessToken);
    }

    return isExpired
  }

  isLoggedIn(): boolean {
    return !this.isTokenExpired();
  }

  getToken() {
    return localStorage.getItem('access_token')
  }
}
