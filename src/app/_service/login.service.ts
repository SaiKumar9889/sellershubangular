import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  BASE_URL: string = environment.BASE_URL;
  BASE_URL_DUMMY: string = "assets/json-data/";
  constructor(private httpClient: HttpClient) { }

  getLogin(email:any,password:any){
    let headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    const body = { userId: email, password: password, };
    return this.httpClient.post(this.BASE_URL + "/login", body,{ headers: headers });
  }

  getUserProfile(){
    let authToken = localStorage.getItem("userToken") as string;
    return this.httpClient.get(environment.user_profile, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  forgotpassword(email:any){
    let headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    const body = { emailAddress: email};
    return this.httpClient.post(environment.resetPassword,body,{ headers: headers });
  }
  passwordResetSubmit(otp:any,email:any,password:any){
    const body = { token: otp,newpassword:password,emailaddress:email};
    let headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    return this.httpClient.post(environment.passwordResetSubmit,body,{ headers: headers });
  }
  isLogin:boolean=false;
  isLoggedIn() {
    const loggedIn = localStorage.getItem('userLoginEmail');
    const loggedInEmail = localStorage.getItem('userLoginName');
    const userToken = localStorage.getItem('userToken');
    if (loggedIn != null && loggedIn != undefined && loggedInEmail!=null && loggedInEmail!=undefined && userToken!=null && userToken!=undefined)
      this.isLogin = true;
    else
      this.isLogin = false;
    return this.isLogin;
  }

  etsyTokenSave(id:string = '', khubUserId:string = '', oauth_token:string = '', oauth_verifier:string =''){
    const url = environment.etsycallback+`?id=${id}&khubUserId=${khubUserId}&oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`;
    return this.httpClient.get(url,{responseType: 'text' });
  }

  verifyUser(param1:any, param2:any ){
    let headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    const body = { };
    return this.httpClient.post(environment.activateUser+ '?param1='+param1+'&param2='+param2,body,{ headers: headers, responseType: 'text' });
  }
}
