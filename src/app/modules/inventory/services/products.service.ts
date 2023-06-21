import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  getProducts(pageno: number, total: number, pagesize: number, channel: string, sortvalue: number, searchname: string, searchvalue: string, usedUnsedId: string, brandname: string, supplierId: string, showParentProducts: boolean, showActiveProducts: boolean, showNonEmptyProducts: boolean, showZeroProducts: boolean,
    defaultSupplier = false,freeFormSearch = '') {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.inv_getProducts + `?pageno=${pageno}&total=${total}&pagesize=${pagesize}&channel=${channel}&sortvalue=${sortvalue}&searchname=${searchname}&searchvalue=${searchvalue}&usedUnsedId=${usedUnsedId}&brandname=${brandname}&supplierId=${supplierId}&showParentProducts=${showParentProducts}&showActiveProducts=${showActiveProducts}&showNonEmptyProducts=${showNonEmptyProducts}&showZeroProducts=${showZeroProducts}&isDefaultSupplier=${defaultSupplier}&freeFormSearch=${freeFormSearch}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  updateTracking(productIds: {}, type: boolean) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(environment.update_tracking + `?ids=${productIds}&type=${type}`, {},{
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  getKhubProducts() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.view_kartzhub_products , {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  getChannelProducts(pageno: number, total: number, pagesize: number,channelId:any, searchName:any, searchValue) {
    let authToken = localStorage.getItem("userToken");
    let url =environment.view_channel_products + `?pageno=${pageno}&total=${total}&pagesize=${pagesize}&channelid=${channelId}`
    if(searchName){
      url = url + '&searchname='+searchName+'&searchvalue='+searchValue;
    }
    return this.http.get<any[]>(url, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  createMapLinkSku(data = {}, type = 'createsku') {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(environment.createMapLinkSku + `?type=${type}`, data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  removeProduct(id: any[], type: any = true) {
    let authToken = localStorage.getItem("userToken");

    let qParam = '?';
    id.forEach((id, index) => {
      if (index === 0)
        qParam = qParam + 'id=' + id;
      else
        qParam = qParam + '&id=' + id;
    });
    qParam = qParam + `&remove=${type}`;

    return this.http.get<any[]>(environment.removeProduct + qParam, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  excludeInventoryFromSku(id: any[], type: any = true) {
    let authToken = localStorage.getItem("userToken");
    let qParam = '?';
    id.forEach((id, index) => {
      if (index == 0)
        qParam = qParam + 'id=' + id;
      else
        qParam = qParam + '&id=' + id;
    });
    qParam = qParam + `&add=${type}`;
    return this.http.get<any[]>(environment.excluseSKUFrominven + qParam, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  startAddToChannel(id: any[]) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(environment.startAddToChannel, { ids: id }, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  addProductsTochannel(body: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(environment.addToChannel, body, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  createbundleproduct(id: any[]) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(environment.create_bundle_product, { productIds: id }, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  validatebundleproduct(id: any[]) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(environment.verify_bundle, { productIds: id }, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  updatebundleproduct(id: any[]) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(environment.update_bundle_product, { productIds: id }, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  linkProducts(id: any[]) {
    let authToken = localStorage.getItem("userToken");
    let qParam = '?';
    id.forEach((id, index) => {
      if (index == 0)
        qParam = qParam + 'productIds=' + id;
      else
        qParam = qParam + '&productIds=' + id;
    });

    return this.http.get<any[]>(environment.link_product + qParam, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  confirmlinkProducts(ids: any[]) {
    let authToken = localStorage.getItem("userToken");
    let qParam = '?productIds=';
    ids.forEach((id, index) => {
      if (index == 0)
        qParam = qParam + '' + id;
      else
        qParam = qParam + ',' + id;
    });
    return this.http.get<any[]>(environment.confirem_link_products + qParam, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  unlinkproducts(ids: any[]) {
    let authToken = localStorage.getItem("userToken");
    let qParam = '?productIds=';
    ids.forEach((id, index) => {
      if (index == 0)
        qParam = qParam + '' + id;
      else
        qParam = qParam + ',' + id;
    });
    return this.http.get<any[]>(environment.unlink_product + qParam, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  updateProductQty(sku: any, qty: any, price: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(environment.update_qty + '?sku=' + sku + '&qty=' + qty + '&price=' + price + '&relist=true&type=0',{}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  updateChannelProductQtyForSku(sku: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(environment.updateChannelProductQtyForSku + '?sku=' + sku ,{}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  equalizeTheQty(qparam) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.enable_equal_qty + '?'+qparam, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getBundleProdusModal(id: any,page:any,page_size:any,collectionsize:any,title:any,sku:any, compositeSearch = false) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(environment.bundle_prods_modal + '?id=' + id + '&pageno='+page+'&total='+collectionsize+'&pagesize='+page_size+'&orderBy=1&compositeSearch='+compositeSearch, { "orderBy": "1", "sku": sku,"title": title,}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  findBundleProductsforqty(id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.find_bundle_prods + '?id=' + id, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  updateSaveBundleChailsItems(id: any,body:any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(environment.update_save_bundle_chaild_items + '?productid='+id, body, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  addToBundle(id:any,parentId:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.add_bundle + '?productid='+parentId+'&id='+id, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  removeFromBundle(id:any,parentId:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.remove_bundle_prod + '?id='+id+'&parentId='+parentId, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  compositeProducts(parentId) {
    let authToken = localStorage.getItem("userToken");

    return this.http.get<any[]>(environment.composition+'?productid='+parentId , {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  saveComposition(data) {
    let authToken = localStorage.getItem("userToken");

    return this.http.post(environment.composition , data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  removecompositeProducts(parentId, childId) {
    let authToken = localStorage.getItem("userToken");

    return this.http.delete(environment.composition+'?parentId='+parentId + '&childId='+childId , {
      headers: new HttpHeaders().set("Authorization", authToken),
      responseType:'text'
    });
  }

  prepInstructions(data, channelId: any) {
    let authToken = localStorage.getItem("userToken");

    return this.http.post(environment.fba_prepInstructions+ '?channelId='+channelId , data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  fbaPlans(data, channelId: any) {
    let authToken = localStorage.getItem("userToken");

    return this.http.post(environment.fba_plans + '?channelId='+channelId , data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  createInbound(data, channelId: any, shipmentId:any) {
    let authToken = localStorage.getItem("userToken");

    return this.http.post(environment.fba_create_inbound + '?channelId='+channelId+'&shipmentId='+shipmentId , data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  updateInbound(data, channelId: any, shipmentId:any) {
    let authToken = localStorage.getItem("userToken");

    return this.http.post(environment.fba_update_inbound + '?channelId='+channelId +'&shipmentId='+shipmentId, data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }


}
