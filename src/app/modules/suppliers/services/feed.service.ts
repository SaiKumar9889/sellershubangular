import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor( private http: HttpClient) { }
  getFeed() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.supl_feed, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}
