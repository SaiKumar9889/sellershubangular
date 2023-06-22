import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateTicket } from '../_models/create-ticket';


@Injectable({
  providedIn: 'root'
})
export class HeaderService { 

    constructor(public http: HttpClient){

    }

    createTicket(createObj:CreateTicket){
      const base = environment.createTicket;
      let url = '?name='+createObj.name+'&email='+createObj.email+'&phone='+createObj.phone+'&reason='+createObj.query;
      return this.getApi(base+url);
    }

    phoneSupport(createObj:CreateTicket){
        const base = environment.callback;
        let url = '?name='+createObj.name+'&email='+createObj.email+'&phone='+createObj.phone+'&reason='+createObj.query;
        return this.getApi(base+url);
    }

    getApi(url:any){
      let authToken = localStorage.getItem("userToken") as string;
      return this.http.get(url, {
        headers: new HttpHeaders().set("Authorization", authToken),
      });
    }
    getExpiredProducts(){
      let authToken = localStorage.getItem("userToken") as string;
      return this.http.get(environment.expired_products, {
        headers: new HttpHeaders().set("Authorization", authToken),
      });
    }
    getUserInfo(){
      let url = '/callback';
      return this.getApi(url);
    }
}