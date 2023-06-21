import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceTemplatesService {

  constructor(private http: HttpClient) { }

  getInvoiceTemplates() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.invoice_templates, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  saveTemplate(body: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.save_template, body, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  saveLabelTemplate(courierId: string, template: any, code: string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.shippingcourier_template + '?courierId=' + courierId + '&code=' + code, template, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  getLabelTemplate(courierId: string, code: string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.shippingcourier_template + '?courierId=' + courierId + '&code=' + code, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  saveLabel(body: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.saveshippinglabel, body, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getShiplabels(id) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.editshippinglabel + '?id=' + id, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}
