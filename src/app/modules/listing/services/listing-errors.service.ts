import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListingErrorsService {

  constructor( private http: HttpClient) { }

  getListingerror(currentPage: number, pagesize: number, total: number, searchname: string, searchvalue: string, channel: string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.list_listingerrors+`?currentPage=${currentPage}&total=${total}&pageSize=${pagesize}&channel=${channel}&searchname=${searchname}&searchvalue=${searchvalue}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  removeAllProducts() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.list_removeerrorlist, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}
