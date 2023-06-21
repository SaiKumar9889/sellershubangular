import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductAttributeService {

  constructor(  private http: HttpClient) { }
  getAttributes() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_editattributeset, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  getSettingattribute() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_editattributeset, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getEditattribute(id: number) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_editattribute + `?id=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getEditattributeset(id: number) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_editattributeset + `?id=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  postRemoveattribute(id: number) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.set_removeattribute + `?id=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  postRemoveattributeset(id: number) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_removeattributeset + `?id=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  postAttribute(body: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.set_saveattribute, body, {
      headers: new HttpHeaders().set("Authorization", authToken),responseType: 'text'
    });
  }

  postAttributeSet(body: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.set_saveattributeset, body, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  postAttributesetValue(body: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.set_saveattributesetValue, body, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}
