import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(private http: HttpClient) { }
  getShippingManifest() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.shipping_manifests, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  viewShippingManifest(pageno: number, total: number, pagesize: number, shippingMethod: any, carrierName: any, purchaseStartDate: any, purchaseEndDate: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.view_shipping_manifests + `?pageno=${pageno}&total=${total}&pagesize=${pagesize}&shippingMethod=${shippingMethod}&carrierName=${carrierName}&purchaseStartDate=${purchaseStartDate}&purchaseEndDate=${purchaseEndDate}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  generateManifest(orderids: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.generate_manifest + `?orderids=${orderids}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  retrieveManifestId(manifestid: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.retrieve_manifestId + `?manifestid=${manifestid}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  exportManifestId(manifestid: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.export_manifest + `?manifestid=${manifestid}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  retrieveAllManifestIds() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.retrieve_allmanifestIds, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}
