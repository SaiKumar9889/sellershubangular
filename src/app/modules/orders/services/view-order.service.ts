import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewOrderService {

  constructor(private http: HttpClient) { }
  editOrderInfo(
    orderId: any
  ) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(
      environment.editOrderDetails + `?orderId=` + orderId,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
}
