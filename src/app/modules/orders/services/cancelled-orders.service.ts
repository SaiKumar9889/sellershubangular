import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SalesOrders } from '../_models/sales-orders';

@Injectable({
  providedIn: 'root'
})
export class CancelledOrdersService {

  constructor(  private http: HttpClient) { }
  getCancelledOrders(pageno: number,total: number, pagesize: number,searchname: string,searchvalue: string,channel: string,shippingMethod: string
    ) {
      // return this.http.get<CancelledOrders[]>(this.BASE_URL_DUMMY + params);
      let authToken = localStorage.getItem("userToken");
      return this.http.get<any[]>(
        environment.order_getCancelledOrders+`?pageno=${pageno}&total=${total}&pagesize=${pagesize}&searchname=${searchname}&searchvalue=${searchvalue}&channel=${channel}&shippingMethod=${shippingMethod}`,
        { headers: new HttpHeaders().set("Authorization", authToken) }
      );
    }
}