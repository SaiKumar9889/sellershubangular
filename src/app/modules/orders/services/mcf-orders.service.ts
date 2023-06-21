import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SalesOrders } from '../_models/sales-orders';

@Injectable({
  providedIn: 'root'
})
export class McfOrdersService {

  constructor(  private http: HttpClient) { }
  getMcfOrders(centerid: string, channelsaleid: string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(
      environment.order_getMcfOrders+`?centerid=${centerid}&channelsaleid=${channelsaleid}`,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  findMcfOrders(pageNo: number, total: any, pageSize) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(
      environment.order_findMcfOrders+`?pageno=${pageNo}&total=${total}&pagesize=${pageSize}`,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
}
