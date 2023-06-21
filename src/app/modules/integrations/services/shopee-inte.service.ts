import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ShopeeInteService {

  constructor(private http: HttpClient) { }
  getAllreadyIntegratedData(id){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.shopee_existingData + `?id=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  createIntegratedData(data){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.shopee_existingData,data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  updateIntegratedData(data){
    let authToken = localStorage.getItem("userToken");
    return this.http.put(environment.shopee_existingData,data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  deleteAmazonAccount(channelId){
    let authToken = localStorage.getItem("userToken");
    return this.http.delete(environment.shopee_existingData+'?channelId='+channelId, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  testConnection(id){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.shopee_testConnection + `?id=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken),responseType: 'text'
    });
  }

  downloadRecentProducts(channelId){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.shopee_downloadRecent_prod + `?channelId=${channelId}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  downloadAllProducts(channelId:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.shopee_download_all_prod + `?channelId=${channelId}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  generateTockent(channelId){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.bonanza_tocken + `?id=${channelId}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}
