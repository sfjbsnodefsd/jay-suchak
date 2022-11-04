import { Injectable } from '@angular/core';
// import decode from 'jwt-decode';

@Injectable()
export class AuthService {

  public getToken(): any {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean indicating whether or not the token is expired
    return token ? true : false;
  }

}