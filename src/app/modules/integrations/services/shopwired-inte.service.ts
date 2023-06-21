import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ShopwiredInteService {

  constructor(private http: HttpClient) { }
  createIntegratedData(data){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.shopwired_existingData,data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  getAllreadyIntegratedData(id){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.shopwired_existingData + `?id=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  testConnection(id:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.shopwired_testConnection + `?id=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken),responseType: 'text'
    });
  }
  downloadAllProducts(channelId:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.shopwired_download_all_prod + `?channelId=${channelId}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  updateIntegratedData(data){
    let authToken = localStorage.getItem("userToken");
    return this.http.put(environment.shopwired_existingData,data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  deleteShopWiredAccount(channelId){
    let authToken = localStorage.getItem("userToken");
    return this.http.delete(environment.shopwired_existingData+'?channelId='+channelId, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}
