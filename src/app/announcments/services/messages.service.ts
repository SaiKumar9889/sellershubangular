import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }
  getMessages(channelid: any,  msgStatus: any,pageno: number, total: number  ) {
    let authToken = localStorage.getItem("userToken");
    // return this.http.get<any[]>(
    //   environment.getSalesOrders + `?pageno=${pageno}&total=${total}&pagesize=${pagesize}&channelid=${channelid}&sortvalue=${sortvalue}&msgStatus=`,
    //   { headers: new HttpHeaders().set("Authorization", authToken) }
    // );

    return this.http.get<any[]>(
      environment.msg_listmsg + `?channelid=${channelid}&msgStatus=${msgStatus}&pageno=${pageno}&total=${total}`,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  viewMessages(id: number) {
    let authToken = localStorage.getItem("userToken");


    return this.http.get<any[]>(
      environment.msg_showmsg + `?id=${id}`,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  editReplyMessages(id: number) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(
      environment.msg_replymsg + `?id=${id}`,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  savereplymessage(data:any) {
    let authToken = localStorage.getItem("userToken");

    return this.http.post<any[]>(
      environment.msg_replySavemsg, data , 
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

}
