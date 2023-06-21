import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  getDashboard() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.das_dashboardnew, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  getListRecentOrders() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.dash_ordersummary, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  getSalesbychannel() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.dash_loadsalesbychannel, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  getListLowStock() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.dash_inventorysummary, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  getLoadsalebycountry() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.dash_loadsalesbycountry, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  getLoadorderhistory() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.dash_loadorderhistory, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}
