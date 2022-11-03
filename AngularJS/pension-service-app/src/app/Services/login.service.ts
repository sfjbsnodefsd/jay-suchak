import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const LOGIN_URL = "http://localhost:5003/auth/login"
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  login(user: {email:String, password: String}) {
    return this.http.post(LOGIN_URL, user);
  }
  constructor(private http:HttpClient) { }
}
