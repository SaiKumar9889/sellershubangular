import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EtsyService {

  constructor(  private http: HttpClient) { }
  getAllreadyIntegratedData(id){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.etsy_existingData + `?id=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  createIntegratedData(data){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.etsy_existingData,data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  updateIntegratedData(data){
    let authToken = localStorage.getItem("userToken");
    return this.http.put(environment.etsy_existingData,data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  deleteAmazonAccount(channelId){
    let authToken = localStorage.getItem("userToken");
    return this.http.delete(environment.etsy_existingData+'?channelId='+channelId, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  testConnection(id){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.etsy_testConnection + `?id=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  downloadRecentProducts(channelId){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.etsy_downloadRecent_prod + `?channelId=${channelId}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  downloadAllProducts(channelId){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.etsy_download_all_prod + `?channelId=${channelId}`, {
      headers: new HttpHeaders().set("Authorization", authToken), responseType: 'text'
    });
  }

  generateTockent(channelId){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.etsy_tocken + `?id=${channelId}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

}
