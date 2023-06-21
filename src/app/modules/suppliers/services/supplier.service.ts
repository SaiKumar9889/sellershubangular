import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }
  getSupplier() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.supl_supplier, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  getProductSupplier(sku = '') {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.get_prod_supplier+ '?sku=' + sku, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getProductSupplierById(skuString = '', supplierId) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.findSupplierForProduct+ '?skus=' + skuString + '&supplierId='+supplierId,{}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  removeSupplier(id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any>(environment.supl_remove + '?id=' + id , '', {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  removeSupplierProduct(id: any,sku='') {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any>(environment.supl_remove_product + '?id=' + id +'&sku='+sku, '', {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  async editSupplier(id: any) {
    let authToken = localStorage.getItem("userToken");
    // return this.http.get<any>(environment.supl_edit+"?id="+id,{
    //   headers: new HttpHeaders().set("Authorization", authToken),
    // });
    return await this.http.get<any>(environment.supl_edit + "?id=" + id, {
      headers: new HttpHeaders().set("Authorization", authToken),
    }).toPromise().then((data: any) => {
      return data;
    }).catch((error) => {
      return null;
    });
  }

  addSupplier(options: any, id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any>(environment.supl_add + "?id=" + id, options, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }


}
