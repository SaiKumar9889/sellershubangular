import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrdersService {

  constructor( private http: HttpClient) { }
  getPurchaseOrders(pageno: number, total: number, pagesize: number, channel: string, searchname: string,
     status: string,seachvalue:any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.get_purchase_orders+`?pageno=${pageno}&total=${total}&pagesize=${pagesize}&channel=${channel}&status=${status}&searchname=${searchname}&searchvalue=${seachvalue}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  deletePo(id:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any>(environment.delete_po+`?id=${id}`,{}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  editPo(id:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any>(environment.edit_po+`?id=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  createPo(){
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any>(environment.create_po, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  savePo(qparam:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any>(environment.save_po_header+`?${qparam}`,{}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  savePo_header(qparam){
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any>(environment.save_po_header+`?${qparam}`,{}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }


  printpo(id:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any>(environment.print_po+`?id=${id}&print=false`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  emailGetPo(id:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any>(environment.email_po+`?orderid=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  sendEmail(id:any,settingJson= {},subject='',supplierEmail=''){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.po_email+`?orderid=${id}&subject=${subject}&toaddress=${supplierEmail}`,settingJson, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  sendEmailGetPo(id:any,subject:any,toemailid:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any>(environment.email_po+`?orderid=${id}&subject=${subject}+'&toaddress=${toemailid}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  displaySupplierProducts(id:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.display_supplier_products+`?supplierId=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getLisTofProducts() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.productnew, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  savepurchaseorderlines(qparam:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any>(environment.savepurchaseorderlines+`?${qparam}`,{}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  deletepurchaseorderlines(id:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.deletepurchaseorderline+`?id=${id}`,{}, {
      headers: new HttpHeaders().set("Authorization", authToken), responseType : 'text'
    });
  }
}
