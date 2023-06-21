import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChannelScheduledListingService {

  constructor( private http: HttpClient) { }
  getSchedulelisting() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.list_schedulelisting, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}
