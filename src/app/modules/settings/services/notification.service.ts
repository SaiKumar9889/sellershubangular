import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(  private http: HttpClient) { }
  getNotification(type: string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_notification + `?type=${type}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  postSaveemailseller(body: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.set_notification, body, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  postSave(body: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.set_notification, body, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}