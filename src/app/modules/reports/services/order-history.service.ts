import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class OrderHistoryService {
  getDownloadReport(fromdDate: any, toDate: any) {
    let authToken = localStorage.getItem("userToken") as string;
    return this.http.post<any[]>(
      environment.exportOrderHistoryReport,
      {
        type: "orderhistoryreport",
        startDate: fromdDate,
        endDate: toDate,
      },
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  constructor(private http: HttpClient) {}
  getReportorderhistory(start: string, end: string, searchdate: string) {
    let authToken = localStorage.getItem("userToken") as string;
    return this.http.get<any[]>(
      environment.repo_getReportorderhistory +
        `?start=${start}&end=${end}&searchdate=${searchdate}`,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
}
