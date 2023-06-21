import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListedProductsService {

  constructor( private http: HttpClient) { }
  getListedproduct(currentPage: number, pagesize: number, total: number, searchname: string, searchvalue: string, channel: string, fbaProductId: string, downloadNonEmptyProductsId: boolean, sortvalue: string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.list_listedproduct+`?currentPage=${currentPage}&total=${total}&pageSize=${pagesize}&channel=${channel}&searchname=${searchname}&searchvalue=${searchvalue}&fbaProductId=${fbaProductId}&downloadNonEmptyProductsId=${downloadNonEmptyProductsId}&sortvalue=${sortvalue}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getlistingtemplate(body: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.list_selectlistingtemplate+`?pricechanges=false&imagechanges=false`,body, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }



  updatetemplate(body: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.list_updatetemplate+`?pricechanges=true&imagechanges=true`,body, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  updateChanneltemplate(body: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.list_updateChanneltemplate+`?pricechanges=false&imagechanges=false`,body, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  

  // postEbay(body: any) {
  //   let authToken = localStorage.getItem("userToken");
  //   return this.http.post(environment.inte_ebay,body , {
  //     headers: new HttpHeaders().set("Authorization", authToken),
  //   });
  // }

}
