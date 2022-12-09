import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Authdata } from '../Models/auth/auth.model';
// import decode from 'jwt-decode';
const LOGIN_URL = 'http://localhost:5001/auth/login';
@Injectable()
export class AuthService {
  response: any;
  private token: any;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>()
  constructor(private http: HttpClient, private router: Router) { }
  getToken() {
    console.log(this.token);
    return this.token;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  login(username: string, password: string) {
    const authData: Authdata = { username, password };
    this.http.post(LOGIN_URL, authData).subscribe((response: any) => {
      console.log(response);
      this.token = response.data;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.saveAuthData(this.token);
      this.router.navigate(['list_pensioner'])
    })
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  logout() {
    this.token = '';
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.isAuthenticated = false;
    this.router.navigate(['login'])
  }

  private saveAuthData(token: string) {
    localStorage.setItem("token", token)
  }
  private clearAuthData() {
    console.log("Clear local storage");
    localStorage.removeItem("token")
  }
  private getAuthData() {
    return localStorage.getItem("token");
  }
  autoAuthUser() {
    const token = this.getAuthData();
    this.token = token;
    this.isAuthenticated = true;
    this.authStatusListener.next(true)
  }

}