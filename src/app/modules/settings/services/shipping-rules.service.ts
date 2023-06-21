import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShippingRulesService {

  constructor(  private http: HttpClient) { }
  getShippingrules() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_shippingrulrs, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  getSkuList(sku) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.findskulike +'?skulike='+sku, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getEditShippingrules(ruleid: number) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_editshippingrules + `?ruleid=${ruleid}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getRemoveRule(ruleid: number){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_removeshippingrule + `?ruleid=${ruleid}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  postSaveRule(data){
    let authToken = localStorage.getItem("userToken");
    const url =environment.set_saveshippingrules ;
    return this.http.post(url,data,
    {
      headers: new HttpHeaders().set("Authorization", authToken)
    });
  }
}
