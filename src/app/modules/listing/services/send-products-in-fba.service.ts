import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendProductsInFbaService {

  constructor( private http: HttpClient) { }
  // getSendProductstoFBA(pageno: number, pagesize: number, total: number, searchname: string, searchvalue: string) {
  //   let authToken = localStorage.getItem("userToken");
  //   return this.http.get<any[]>(environment.list_sendproducttofba+`?pageno=${pageno}&total=${total}&pagesize=${pagesize}&searchname=${searchname}&searchvalue=${searchvalue}`, {
  //     headers: new HttpHeaders().set("Authorization", authToken),
  //   });
  // }
  getSendProductstoFBA(pageno: number, pageSize: number, total: number, searchname: string, searchValue:string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.list_sendproducttofba+`?pageno=${pageno}&pagesize=${pageSize}&total=${total}&searchname=${searchname}&searchvalue=${searchValue}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getshipmentitems(shipmentId: string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.list_shipmentitems+`?shipmentId=${shipmentId}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

}
