import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShippingCourierSetupService {

  constructor(  private http: HttpClient) { }
  getShippingCourier() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.inte_shippingCourier, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}