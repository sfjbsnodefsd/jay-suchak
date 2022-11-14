import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL = "http://localhost:5003/auth"
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  login(user: {email:String, password: String}) {
    return this.http.post(`${URL}/login`, user);
  }
  register(user: {name:String, email:String, password: String}) {
    return this.http.post(`${URL}/reg`, user);
  }
  constructor(private http:HttpClient) { }
}
