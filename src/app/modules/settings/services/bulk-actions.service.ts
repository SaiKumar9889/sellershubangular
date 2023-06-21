import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BulkActionsService {

  constructor(  private http: HttpClient) { }
  getSettingbulkaction(type: string, tab: string, channelUserId: string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_bulkaction + `?type=${type}&tab=${tab}&channelUserId=${channelUserId}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getRemoveBulkimportfile(id: string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_removeimport + `?id=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getRemoveBulkexportfile(id: string) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_removeexport + `?id=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  postBulkimport(uploadProductFileType: string, file: any) {
    let authToken = localStorage.getItem("userToken");
    let formData: any = new FormData();
    formData.append("file", file);
    return this.http.post(environment.set_bulkimportfile + `?uploadProductFileType=${uploadProductFileType}`,
    formData, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  postBulkExport(type: string, tab: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_bulkaction + `?type=${type}&tab=${tab}`,
    {
      headers: new HttpHeaders().set("Authorization", authToken),
  })
}

}
