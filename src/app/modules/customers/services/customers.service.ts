import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(  private http: HttpClient) { }
  getCustomers(data) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.cust_customerlist,data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  saveCustomers(data) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.savecustomer,data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  findSearchName(pageno: number,  pagesize: number,total: number, searchvalue: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.find_searchname + `?pageno=${pageno}&pagesize=${pagesize}&total=${total}&searchvalue=${searchvalue}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}
