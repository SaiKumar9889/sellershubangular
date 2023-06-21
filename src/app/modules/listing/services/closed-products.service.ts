import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClosedProductsService {

  constructor( private http: HttpClient) { }
  getClosedproduct(currentPage: number, pagesize: number, total: number, searchname: string, searchvalue: string, channel: string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.list_closedproduct+`?currentPage=${currentPage}&total=${total}&pageSize=${pagesize}&channel=${channel}&searchname=${searchname}&searchvalue=${searchvalue}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}
