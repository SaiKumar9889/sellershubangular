import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class StockOverviewService {
  constructor(private http: HttpClient) {}
  getStockview(
    pageno: number,
    total: number,
    pagesize: number,
    searchname: string,
    searchvalue: string,
    stock: string,
    bin: string,
    sku: string,
    warehouse: string,
    updatestock: boolean
  ) {
    let authToken = localStorage.getItem("userToken") as string;
    return this.http.get<any[]>(
      environment.inv_getStockview +
        `?pageno=${pageno}&total=${total}&pagesize=${pagesize}&searchname=${searchname}&searchvalue=${searchvalue}&stock=${stock}&bin=${bin}&sku=${sku}&warehouse=${warehouse}&updatestock=${updatestock}`,
      {
        headers: new HttpHeaders().set("Authorization", authToken),
      }
    );
  }
  viewOrderDetails(sku: string) {
    let authToken = localStorage.getItem("userToken") as string;
    return this.http.get<any[]>(
      environment.view_order_details + `?sku=${sku}`,
      {
        headers: new HttpHeaders().set("Authorization", authToken),
      }
    );
  }
}
