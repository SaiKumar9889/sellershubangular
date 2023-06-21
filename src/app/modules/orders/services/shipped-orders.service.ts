import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShippedOrdersService {

  constructor(  private http: HttpClient) { }
  getShippedOrdersSearch(
    pageno: number,
    total: number,
    pagesize: number,
    searchname: number,
    searchvalue: string,
    channelId: string,
    shippingMethod: string,
    startDate: string,
    endDate: string,
    dateOrder: string
  ) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(
      environment.order_getShippedOrdersSearch+`?pageno=${pageno}&total=${total}&pagesize=${pagesize}&searchname=${searchname}&searchvalue=${searchvalue}&channelId=${channelId}&shippingMethod=${shippingMethod}&startDate=${startDate}&endDate=${endDate}&dateOrder=${dateOrder}`,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
}
