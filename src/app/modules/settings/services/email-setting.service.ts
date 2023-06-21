import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailSettingService {

  constructor(  private http: HttpClient) { }
  getMailSetting() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_emailSetting, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getTestsmptcon() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_testmailcon, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getSavesmptcon(host: string, port: string, username: string, password: string, fromEmail: string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_savemailcon + `?host=${host}&port=${port}&username=${username}&password=${password}&fromEmail=${fromEmail}`, {
      headers: new HttpHeaders().set("Authorization", authToken),responseType: 'text'
    });
  }

  getRemovesmtp() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_removesmtp, {
      headers: new HttpHeaders().set("Authorization", authToken),responseType: 'text'
    });
  }
}
