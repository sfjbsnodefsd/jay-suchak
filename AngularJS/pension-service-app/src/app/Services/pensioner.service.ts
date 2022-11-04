import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = "http://localhost:5001/processpension"
@Injectable({
  providedIn: 'root'
})
export class PensionerService {
  getPensioner(aadhaar:String) {
    return this.http.post(BASE_URL, String);
  }
  constructor(private http:HttpClient) { }
}
