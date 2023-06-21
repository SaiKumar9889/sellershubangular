import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventorySyncService {

  constructor(  private http: HttpClient) { }
  getSettingsyncchannel() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_syncchannel, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getsaveSync(body:any, synchronize: boolean) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_syncchannel + `?synchronize=${synchronize}&channeluserid=${body}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  savesaveSync(body:any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_savesyncsettings + `${body}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  excludeSync(sku:Array<string>) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.removesynchronizesku + `?${sku.join('&')}`, {
      headers: new HttpHeaders().set("Authorization", authToken), responseType: 'text'
    });
  }
}
