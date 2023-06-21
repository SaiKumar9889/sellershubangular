import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralSettingsService {

  constructor(  private http: HttpClient) { }
  getGeneralSetting() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_generalsettings, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  postSaveDefaultSetting(body: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(
      environment.set_savedefault,body,
      { headers: new HttpHeaders().set("Authorization", authToken), responseType: 'text' }
    );
  }

  postSaveTaxrate(body: any, id: any) {
    let authToken = localStorage.getItem("userToken");
    //const url = id > -1 ? environment.set_savetaxrate + `?id=${id}` : environment.set_savetaxrate ;
    return this.http.post(
      environment.set_savetaxrate + `?id=${id}`, body,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  geteditTaxrate(id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(
      environment.set_edittaxrate + `?id=${id}`,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  getremoveTaxrate(id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(
      environment.set_removetaxrate + `?id=${id}`,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  getsaveCurrency(currency: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(
      environment.set_savecurrency + `?currency=${currency}`,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  getPrinters() {
    let authToken = localStorage.getItem("userToken");
    //const url = id > -1 ? environment.set_savetaxrate + `?id=${id}` : environment.set_savetaxrate ;
    return this.http.post(
      environment.get_printers, {},
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
}
