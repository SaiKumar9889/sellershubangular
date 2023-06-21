import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http: HttpClient) { }
  getWarehouse() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.ware_getWarehouse, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  removewarehouse(id: Number) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.ware_removewarehouse + "?id=" + id, {}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getwarehouselocations(id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.ware_findwarehouselocations + "?id=" + id, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  addWarehouse(options: any, id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any>(environment.ware_updatewarehouse + "?id=" + id, options, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  async editwarehouse(id: any) {
    let authToken = localStorage.getItem("userToken");
    return await this.http.get<any>(environment.ware_editwarehouse + "?id=" + id, {
      headers: new HttpHeaders().set("Authorization", authToken),
    }).toPromise().then((data: any) => {
      return data;
    }).catch((error) => {
      return null;
    });
  }



  async editwarehouselocation(id: any, warehouseid: any) {
    let authToken = localStorage.getItem("userToken");
    return await this.http.get<any>(environment.ware_editwarehouselocation + "?id=" + id + "&warehouseid=" + warehouseid, {
      headers: new HttpHeaders().set("Authorization", authToken),
    }).toPromise().then((data: any) => {
      return data;
    }).catch((error) => {
      return null;
    });
  }

  addNewLocationData(id: any, options: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any>(environment.ware_updatewarehouselocation + "?id=" + id, options, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  removeWarehouseLocation(id: any, wid: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any>(environment.ware_removewarehouse_location + "?id=" + id + "&wid=" + wid, {}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getProductsNew() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.ware_productNew, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  showProducts(lid = '', wid = '') {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.ware_showProduct + '?id=' + lid, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  assignproducts(locationId: any, title: any, prodId: any, qty: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any>(environment.ware_assignlocationforProduct + "?id=" + locationId + "&title=" + title + "&productid=" + prodId + "&quantity=" + qty, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  updateTransfer(options: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any>(environment.update_transfer, options, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}
