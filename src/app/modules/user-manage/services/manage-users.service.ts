import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {

  constructor(private http: HttpClient) { }
  getUsersData() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.user_manageUser, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getAllSubscription() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.user_subscription, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getPricePlans(upgrade, currency) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.user_priceplans + '?upgrade=' + upgrade + '&currency=' + currency, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  adduser(options: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.user_add, options, {
      headers: new HttpHeaders().set("Authorization", authToken), responseType: 'text'
    });
  }

  edituser(id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.user_edit + "?id=" + id, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  updateuser(options: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any>(environment.user_update, options, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }


  removeuser(id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.user_remove + "?id=" + id, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  accountSettings() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.user_accountSettings, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  editaccountsubuserpermissions(id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.user_editaccountsubuserpermissions + "?id=" + id, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  savepermissions(kartzhubUserId: any, id: any, options: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any>(environment.user_savepermissions + "?id=" + kartzhubUserId + "&subuserid=" + id, options, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  deleteSubscrption(id: any, values: any, reason: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.deleteSubscrption + '?id=' + id + '&values=' + values + '&reason=' + reason, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getPaymentMethods(id) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.paymentmethods + '?id=' + id, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  chargeCard(token: string,plan:any,id?:any) {
    let body={
      stripeToken:token,
      plan:plan,
      id:id
    };
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.submitPayment, body, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }  
}
