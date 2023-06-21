import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailConfig } from 'src/app/_models/email-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailConfigService {

  constructor( private http: HttpClient) { }

  getEmailConfig(id:string = '', channelId:string = '',type=''){
    if(!id){id = ''};
    if(!channelId){channelId = ''};
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.emailconfig+`?id=${id}&channelId=${channelId}&type=${type}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  saveEmailConfig(emailConfig:EmailConfig) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.saveemtpconfig, emailConfig ,{
      headers: new HttpHeaders().set("Authorization", authToken),responseType: 'text'
    });
  }

  testEmailConfig(id:string = ''){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.testsmtpconfig+`?id=${id}`, {}, {
      headers: new HttpHeaders().set("Authorization", authToken),responseType: 'text'
    });
  }

  removeEmailConfig(id:string = ''){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.removesmtpconfig+`?id=${id}`, {}, {
      headers: new HttpHeaders().set("Authorization", authToken),responseType: 'text'
    });
  }
  activateEmailConfig(emailConfigs:EmailConfig[]){
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(environment.activatesmtpconfig, emailConfigs, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

}
