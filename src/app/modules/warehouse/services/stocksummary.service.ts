import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StocksummaryService {

  constructor(private http: HttpClient) { }

  getStockview(pageno: number, total: number, pagesize: number, channel: string, sortvalue: number, searchname: string, searchvalue: string, usedUnsedId: string, showParentProducts: boolean, showActiveProducts: boolean, showNonEmptyProducts: boolean) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.ware_getStock+`?pageno=${pageno}&total=${total}&pagesize=${pagesize}&channel=${channel}&sortvalue=${sortvalue}&searchname=${searchname}&searchvalue=${searchvalue}&usedUnsedId=${usedUnsedId}&showParentProducts=${showParentProducts}&showActiveProducts=${showActiveProducts}&showNonEmptyProducts=${showNonEmptyProducts}`, {
    // return this.http.get<any[]>(environment.ware_getStock + `?pageno=1&total=1&pagesize=100&channel=all&sortvalue=0&searchname=0&searchvalue&usedUnsedId=all&showParentProducts=false&showActiveProducts=false&showNonEmptyProducts=false`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  geteditStockDetails(selectedsku: string, isStockPage: boolean) { //3533106,true
    let authToken = localStorage.getItem("userToken");  
    return this.http.get(environment.ware_findcurrentlocationsforsku + "?sku=" + selectedsku + "&isStockPage=" + isStockPage, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  // ware_updatestockforlocations:'/updatestockforlocations',
  updatestockforlocations(selectedsku: string, locidAndquantity: string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.ware_updatestockforlocations+`?sku=${selectedsku}&locidAndquantity=${locidAndquantity}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  // ware_findcurrentlocationsforskutransfer:'/findcurrentlocationsforskutransfer',
  getskutransferDetails(selectedsku: string, isStockPage: boolean) { //3533106,true
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.ware_findcurrentlocationsforskutransfer + "?sku=" + selectedsku + "&isStockPage=" + isStockPage, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }    

  updatestocktransfer(options: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any>(environment.ware_updatestocktransfer, options, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
    
  // ware_updatestocktransfer:'/updatestocktransfer', //post
}
