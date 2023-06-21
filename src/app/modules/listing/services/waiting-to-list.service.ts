import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WaitingToListService {

  constructor( private http: HttpClient) { }
  getWaitingtolist(currentPage: number, pagesize: number, total: number, searchname: string, searchvalue: string, channel: string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.list_waitingtolist+`?currentPage=${currentPage}&total=${total}&pageSize=${pagesize}&channel=${channel}&searchname=${searchname}&searchvalue=${searchvalue}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  removewaitinglist() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.list_removewaitinglist, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  
}
