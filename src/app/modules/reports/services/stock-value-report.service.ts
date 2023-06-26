import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class StockValueReportService {
  constructor(private http: HttpClient) {}
  getStockValueReport(
    pageno: number,
    total: number,
    pagesize: number,
    searchvalue: string
  ) {
    let authToken = localStorage.getItem("userToken") as string;
    return this.http.get<any[]>(
      environment.repo_getStockValueReport +
        `?pageno=${pageno}&total=${total}&pagesize=${pagesize}&searchvalue=${searchvalue}`,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  getStockValueOrder(pageno: number, total: number) {
    let authToken = localStorage.getItem("userToken") as string;
    return this.http.get<any[]>(
      environment.repo_getStockValueOrder + `?pageno=${pageno}&total=${total}`,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  getDownloadReport(searchvalue: any, lastmodifieddate: any) {
    let authToken = localStorage.getItem("userToken") as string;
    return this.http.post<any[]>(
      environment.exportStockValueReport,
      {
        type: "stockvaluereport",
        searchvalue: searchvalue,
        lastmodifieddate: lastmodifieddate,
      },
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
}
