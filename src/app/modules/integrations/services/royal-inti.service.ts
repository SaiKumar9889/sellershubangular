import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoyalIntiService {

  constructor(  private http: HttpClient) { }

  saveIntegrationDetials(body:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.label_setup,body, {
      headers: new HttpHeaders().set("Authorization", authToken), responseType: 'text'
    });
  }

  getIntegrateDetails(id:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.label_setup+'?courierId='+id, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}
