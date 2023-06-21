import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChannelIntegrationService {

  deleteChannelId(id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.delete(environment.delete_integration+'?channelId='+id,{
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  constructor(  private http: HttpClient) { }
  getChannelRegistration() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.inte_channelRegistration, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  enableAccounting(type,enable) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.enable_accounting+ `?type=${type}&enable=${enable}`,{}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  getIndex() {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.index,{}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}