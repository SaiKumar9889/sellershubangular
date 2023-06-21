import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class XeroInteService {

  constructor(private http: HttpClient) { }
  createIntegratedData(type:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.connect_to_xero+ `?type=${type}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  testConnection(type:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.xero_testconnection+ `?type=${type}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  getAccountingInfo(type:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.edit_accounting+ `?type=${type}`,{}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  enableChannel(type:any,enable:any,id:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.enablechannelforaccounting+ `?type=${type}&enable=${enable}&id=${id}`,{}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  uploadToXero(){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.uploadtoxero,{}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  saveToXero(data){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.savexero,data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  downloadOrders(account:any,user:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.download_orders_from_xero+ `?account=${account}&user=${user}`,{}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}
