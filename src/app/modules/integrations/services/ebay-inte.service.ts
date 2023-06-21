import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EbayInteService {

  constructor(  private http: HttpClient) { }
  getEbayToken(channelId: number) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.inte_ebaygenerateTokenNew + `?channelId=${channelId}&nexturl='http://localhost:4200/login/ebaytocken'`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getEbayTestCon(id: number) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.inte_ebaytestCon + `?id=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken), responseType : 'text'
    });
  }

  getRecentProducts(channelId: number) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.inte_ebaydownloadrecentProduct + `?channelId=${channelId}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getAllProducts(channelId: number) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.inte_ebaydownloadAllProduct + `?channelId=${channelId}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getEbay(id: number) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.inte_ebay + `?id=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  postEbay(body: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.inte_ebay,body , {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  putEbay(data){
    let authToken = localStorage.getItem("userToken");
    return this.http.put(environment.inte_ebay,data, {
      headers: new HttpHeaders().set("Authorization", authToken),responseType: 'text'
    });
  }
  deleteEbay(channelId: number) {
    let authToken = localStorage.getItem("userToken");
    return this.http.delete(environment.inte_ebay + `?channelId=${channelId}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}
