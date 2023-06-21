import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransfersService {

  constructor(private http: HttpClient) { }
  getTransfer(pageno: number, total: number, pagesize: number) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.ware_getTransfer+`?pageno=${pageno}&total=${total}&pagesize=${pagesize}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}
