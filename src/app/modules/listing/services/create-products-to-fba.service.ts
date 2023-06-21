import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateProductsToFbaService {

  constructor( private http: HttpClient) { }
  getCreateProductstoFBA(pageno: number, pageSize: number, total: number, searchname: string, searchValue:string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.list_createproductstofba+`?pageno=${pageno}&pagesize=${pageSize}&total=${total}&searchname=${searchname}&searchvalue=${searchValue}`, {
      // return this.http.get<any[]>(environment.list_createproductstofba+`?pageno=1&pagesize=10&total=100&searchname=0`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  inboundshipment(channelProductIds: string,shipmentName: string,addrName: string,addressLine1: string,addrCity:string,addrPostCode:string,addrState:string,addrCountry:string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.list_newinboundshipment+`?channelProductIds=${channelProductIds}&shipmentName=${shipmentName}&addrName=${addrName}&addressLine1=${addressLine1}&addrCity=${addrCity}&addrPostCode=${addrPostCode}&addrState=${addrState}&addrCountry=${addrCountry}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

}
