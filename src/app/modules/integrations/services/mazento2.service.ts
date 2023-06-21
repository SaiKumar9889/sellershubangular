import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Mazento2Service {

  constructor(  private http: HttpClient) { }

  getAllreadyIntegratedData(id){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.magento2_existingData + `?id=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  createIntegratedData(data){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.magento2_existingData,data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  updateIntegratedData(data){
    let authToken = localStorage.getItem("userToken");
    return this.http.put(environment.magento2_existingData,data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  deleteAmazonAccount(channelId){
    let authToken = localStorage.getItem("userToken");
    return this.http.delete(environment.magento2_existingData+'?channelId='+channelId, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  testConnection(id){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.magento2_testConnection + `?id=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  downloadRecentProducts(channelId){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.magento2_downloadRecent_prod + `?channelId=${channelId}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  downloadAllProducts(channelId){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.magento2_download_all_prod + `?channelId=${channelId}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}
