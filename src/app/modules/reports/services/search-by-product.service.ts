import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SearchByProductService {
  getDownloadReport(
    startDate: any,
    endDate: any,
    searchname: any,
    searchvalue: any
  ) {
    let authToken = localStorage.getItem("userToken") as string;
    return this.http.post<any[]>(
      environment.exportSaleProductReport,
      {
        type: "saleproductreport",
        startDate: startDate,
        endDate: endDate,
        searchname: searchname,
        searchvalue: searchvalue,
      },
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  constructor(private http: HttpClient) {}
  getReportByProduct(
    pageno: number,
    total: number,
    searchvalue: string,
    searchname: string,
    start: string,
    end: string
  ) {
    let authToken = localStorage.getItem("userToken") as string;
    return this.http.get<any[]>(
      environment.repo_getReportByProduct +
        `?pageno=${pageno}&total=${total}&searchvalue=${searchvalue}&searchname=${searchname}&start=${start}&end=${end}`,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  exportOrders() {
    let authToken = localStorage.getItem("userToken") as string;
    return this.http.post<any[]>(
      environment.repo_export,
      { type: "stockvaluereport" },
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
}
