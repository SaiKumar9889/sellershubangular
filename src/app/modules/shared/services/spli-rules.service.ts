import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpliRulesService {



  constructor( private http: HttpClient) { }

  getChannel(id: any) {
    let authToken = localStorage.getItem("userToken");

    return this.http.get<any[]>(environment.delete_integration+`?id=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  updateSpliRulz(channelUser: any) {
    let authToken = localStorage.getItem("userToken");

    return this.http.post<any[]>(environment.updateSplitRules, channelUser,{
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}
