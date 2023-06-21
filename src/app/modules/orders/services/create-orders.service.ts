import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateOrdersService {

  constructor(private http: HttpClient) { }
  getDraftOrders() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(
      environment.finddraftorders,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  removeOrderFromDraft(orderId: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(
      environment.removeOrdersFromDraft + '?id=' + orderId,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  getChannelRegistration() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.inte_channelRegistration, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getLisTofProducts() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.productnew, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  createOrder(channelId: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.createOrder + "?channel=" + channelId, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  async saveProductItem(id: any, orderid: any, sellingPrice: any, sku: any, userQuantity: any,weight: any,length: any,width: any,depth: any) {
    let authToken = localStorage.getItem("userToken");
    return await this.http.post<any>(environment.updateSaleItem + '?id=' + id + '&orderid=' + orderid + '&price=' + sellingPrice + '&sku=' + encodeURIComponent(sku) + '&qty=' + userQuantity+ '&weight=' + weight+ '&length=' + length+ '&width=' + width+ '&depth=' + depth, {},
      { headers: new HttpHeaders().set("Authorization", authToken) }
    ).toPromise().then((data: any) => {
      return data;
    }).catch((error) => {
      return null;
    });
  }

  async addProductToOrder(ordid: any, productId: any): Promise<any> {
    let authToken = localStorage.getItem("userToken");
    return await this.http.post<any>(environment.addProductToOrder + '?id=' + ordid + '&productId=' + productId, {},
      { headers: new HttpHeaders().set("Authorization", authToken) }
    )
      .toPromise().then((data: any) => {
        return data;
      }).catch((error) => {
        return null;
      });
  }

  remove(id: any, saleId: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any>(environment.removeProductSaleItem + '?id=' + id + '&saleId=' + saleId, {},
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  saveOrderDetails(id: any, sameasbillingaddress = false, data: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any>(environment.saveOrder + '?id=' + id + '&sameasbillingaddress=' + sameasbillingaddress, data, { headers: new HttpHeaders().set("Authorization", authToken) });
  }

  updatePaymentMethodForOrder(id: any, paymentmethod: any, paymentstatus = false) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any>(environment.updatePaymentMethodForOrder + '?id=' + id + '&paymentmethod=' + paymentmethod + '&paymentstatus=' + paymentstatus, { headers: new HttpHeaders().set("Authorization", authToken) });
  }
  getShippingService(id: any, value = 1) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any>(environment.updateordershipping + '?id=' + id + '&value=' + value, { headers: new HttpHeaders().set("Authorization", authToken) });
  }
}
