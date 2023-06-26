import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class LowStockService {
  constructor(private http: HttpClient) {}
  getReportlowStock(pageno: number, total: number, search: string) {
    let authToken = localStorage.getItem("userToken") as string;
    return this.http.get<any[]>(
      environment.repo_lowStockReports +
        `?pageno=${pageno}&total=${total}&search=${search}`,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  getDownloadReport(search: any) {
    let authToken = localStorage.getItem("userToken") as string;
    return this.http.post<any[]>(
      environment.exportLowStockReport,
      {
        type: "lowstockreport",
        lowstocksearch: search,
      },
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
}
