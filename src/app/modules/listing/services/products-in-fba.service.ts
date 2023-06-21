import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsInFbaService {

  constructor( private http: HttpClient) { }
  // getProductstoFBA(pageno: number, pagesize: number, total: number, searchname: string, searchvalue: string, orderBy: string) {
  //   let authToken = localStorage.getItem("userToken");
  //   return this.http.get<any[]>(environment.list_productstofba+`?pageno=${pageno}&total=${total}&pagesize=${pagesize}&searchname=${searchname}&searchvalue=${searchvalue}&orderBy=${orderBy}`, {
  //     headers: new HttpHeaders().set("Authorization", authToken),
  //   });
  // }


  getProductstoFBA(pageno: number, pagesize: number,total: number, sku:string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.list_productstofba+`?pageno=${pageno}&pagesize=${pagesize}&total=${total}&sku=${sku}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}
