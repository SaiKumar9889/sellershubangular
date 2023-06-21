import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChannelProductsService {

  constructor( private http: HttpClient) { }
  getChannelproducts(pageno: number, total: number, pagesize: number, searchname: string, searchvalue: string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.inv_getChannelproducts+`?pageno=${pageno}&total=${total}&pagesize=${pagesize}&searchname=${searchname}&searchvalue=${searchvalue}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getCurrencyValues(fromcurrencyid:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.getCurrencyCodes+`?fromcurrencyid=${fromcurrencyid}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  updateBulkRevisePrice(ids = [], action = '', pricechange = 0, type: string, count: number, channelfilter: string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.update_bulk_revise_price+`?ids=${ids.join(',')}&action=${action}&pricechange=${pricechange}&type=${type}&count=${count}&channelfilter=${channelfilter}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getChannelproducts_Single(sku:any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.findDetials_in_channel_products+`?sku=${sku}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  getWarehouselocations(sku:any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.find_warehouselocationsforproducts+`?sku=${sku}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  updateProductQtyV2(sku,qty,price,listfullqty,relist,updateqtylistingskuinput:any[],updateqtylistingqtyinput:any[],variationsku:any[],variationqty:any[],variationqtyselected:any[]){
    let authToken = localStorage.getItem("userToken");
    let body={
      "updateqtylistingskuinput" :updateqtylistingskuinput,
      "updateqtylistingqtyinput":updateqtylistingqtyinput,
      "variationsku":variationsku,
      "variationqty":variationqty,
      "variationqtyselected": variationqtyselected
    };
    return this.http.post<any[]>(environment.update_qty +'?sku='+sku+'&qty='+qty+'&price='+price+'&relist='+relist+'&listfullqty='+listfullqty, body,{
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  listNow(body){
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(environment.list_now,body,{
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  scheduleListing(){
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.schedule_listing,{
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  removeChannelProductOnly(id:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.removechannelproductOnly+'?id='+id,{
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }


  savechannelproduct(body: any, id:any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.savechannelproduct+'?id='+id, body, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  removewaitinglist() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.removewaitinglist, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}
