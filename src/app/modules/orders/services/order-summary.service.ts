import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SalesOrders } from '../_models/sales-orders';

@Injectable({
  providedIn: 'root'
})
export class OrderSummaryService {

  constructor(  private http: HttpClient) { }
  getOrderSummary() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.order_getOrderSummary, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}