import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderSettingService {

  constructor(  private http: HttpClient) { }
  getPacklist() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_customizepacklist, {
      headers: new HttpHeaders().set("Authorization", 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrYXJ0emh1Yl9zdWJzY3JpcHRpb25fc3RhdHVzIjoiQWN0aXZlIiwidXNlcl9lbWFpbCI6ImJoYXNrYXJmb3JAZ21haWwuY29tIiwiZXhwaXJlc19hdCI6MTYzNDcwMTIxMjY3MiwidXNlcl9mdWxsX25hbWUiOiJCaGFza2FyIiwia2FydHpodWJfdXNlcl9pZCI6MjA2fQ.Rrw-YEIkdaQCc6aR9HykeqFKQ3sy3yGCaOr2qdfVEQ0'),
    });
  }

  getupdatePacklist(title, orderid, transactionid, orderdate, itemid, channel, checkoutmessage, warehouse, location, stockremaining, buyername, quantity, barcode) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_updatepicklist + `?title=${title}&orderid=${orderid}&transactionid=${transactionid}&orderdate=${orderdate}&itemid=${itemid}&channel=${channel}&checkoutmessage=${checkoutmessage}&warehouse=${warehouse}&location=${location}&stockremaining=${stockremaining}&buyername=${buyername}&quantity=${quantity}&barcode=${barcode}`, {
      headers: new HttpHeaders().set("Authorization", 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrYXJ0emh1Yl9zdWJzY3JpcHRpb25fc3RhdHVzIjoiQWN0aXZlIiwidXNlcl9lbWFpbCI6ImJoYXNrYXJmb3JAZ21haWwuY29tIiwiZXhwaXJlc19hdCI6MTYzNDcwMTIxMjY3MiwidXNlcl9mdWxsX25hbWUiOiJCaGFza2FyIiwia2FydHpodWJfdXNlcl9pZCI6MjA2fQ.Rrw-YEIkdaQCc6aR9HykeqFKQ3sy3yGCaOr2qdfVEQ0'),
    });
  }

  getPicklist() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_customizepicklist, {
      headers: new HttpHeaders().set("Authorization", 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrYXJ0emh1Yl9zdWJzY3JpcHRpb25fc3RhdHVzIjoiQWN0aXZlIiwidXNlcl9lbWFpbCI6ImJoYXNrYXJmb3JAZ21haWwuY29tIiwiZXhwaXJlc19hdCI6MTYzNDcwMTIxMjY3MiwidXNlcl9mdWxsX25hbWUiOiJCaGFza2FyIiwia2FydHpodWJfdXNlcl9pZCI6MjA2fQ.Rrw-YEIkdaQCc6aR9HykeqFKQ3sy3yGCaOr2qdfVEQ0'),
    });
  }

  getupdatePicklist(title, orderid, transactionid, orderdate, itemid, channel, checkoutmessage, warehouse, location, stockremaining, shippingaddress, shippedcountry, buyername, quantity) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_updatepicklist + `?title=${title}&orderid=${orderid}&transactionid=${transactionid}&orderdate=${orderdate}&itemid=${itemid}&channel=${channel}&checkoutmessage=${checkoutmessage}&warehouse=${warehouse}&location=${location}&stockremaining=${stockremaining}&shippingaddress=${shippingaddress}&shippedcountry=${shippedcountry}&buyername=${buyername}&quantity=${quantity}`, {
      headers: new HttpHeaders().set("Authorization", 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrYXJ0emh1Yl9zdWJzY3JpcHRpb25fc3RhdHVzIjoiQWN0aXZlIiwidXNlcl9lbWFpbCI6ImJoYXNrYXJmb3JAZ21haWwuY29tIiwiZXhwaXJlc19hdCI6MTYzNDcwMTIxMjY3MiwidXNlcl9mdWxsX25hbWUiOiJCaGFza2FyIiwia2FydHpodWJfdXNlcl9pZCI6MjA2fQ.Rrw-YEIkdaQCc6aR9HykeqFKQ3sy3yGCaOr2qdfVEQ0'),
    });
  }
}