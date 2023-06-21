import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BarcodeManagementService {

  constructor(  private http: HttpClient) { }
  getSettingunusedbarcode(pageno: number, searchtext: string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_unusedbarcode + `?pageno=${pageno}&searchtext=${searchtext}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }


  getSettingusedbarcode(pageno: number, searchtext: string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_usedbarcode + `?pageno=${pageno}&searchtext=${searchtext}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }


  getSettingskubarcode(pageno: number, total: number, value: string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_skubarcode + `?pageno=${pageno}&total=${total}&value=${value}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }


  getSettingaddunusedbarcode(value: boolean) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_addunusedbarcode + `?autoadd=${value}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}