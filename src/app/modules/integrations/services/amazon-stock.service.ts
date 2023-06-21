import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AmazonStockService {
  constructor(  private http: HttpClient) { }


 // stock setting page
  updateRepricerRules(id, value){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.stockRepricerSettings + `?channeluserid=${id}&decreaseamount=${value}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getAmazonRepriceRules(id){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.stockRepricerRules + `?id=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  //stock page

  stockfindAllItems(page, total){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.stockfindAllItems + `?pageno=${page}&pagesize=10&total=${total}`, {}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  
  findStockRepriceItems(page, total){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.findStockRepriceItems + `?pageno=${page}&pagesize=10&total=${total}`, {}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }


  findNotReseterItems(page, total){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.findNotReseterItems + `?pageno=${page}&pagesize=10&total=${total}`, {}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }


}