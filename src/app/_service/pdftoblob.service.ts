import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PdftoblobService {

  img_not_available = 'data:image/png;base64,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';

  constructor(public http: HttpClient) {

  }

  async getBlob(filename: any[]) {
    const base = environment.pdftoblob;
    let urlIp = '&urls=';
    filename.forEach((url, i) => {
      if (i == (filename.length - 1))
        urlIp = urlIp + url;
      else
        urlIp = urlIp + url + ',';
    })

    let url = base + '?type=blob';
    let authToken = localStorage.getItem("userToken");
    // return this.http.get(url,{responseType:'blob',headers: new HttpHeaders().set("Authorization", authToken)});

    return await this.http.post(url,{urls : filename}, { responseType: 'blob', headers: new HttpHeaders().set("Authorization", authToken) }).toPromise().then((data: any) => {
      //////console.log(JSON.stringify(data));
      return data;
    }).catch((error) => {
      // //////console.log("Promise rejected with " + JSON.stringify(error));
      return null;
    });

  }
  async s3Image(file='') {
    const base = environment.s3Image+'?url='+file;

    let url = base ;
    let authToken = localStorage.getItem("userToken");
    // return this.http.get(url,{responseType:'blob',headers: new HttpHeaders().set("Authorization", authToken)});

    return await this.http.post(url,{}, { responseType: 'blob', headers: new HttpHeaders().set("Authorization", authToken) }).toPromise().then((data: any) => {
      //////console.log(JSON.stringify(data));
      return data;
    }).catch((error) => {
      // //////console.log("Promise rejected with " + JSON.stringify(error));
      return null;
    });

  }
  async getBarCode(file='') {
    const base = environment.s3Image+'?url='+file;

    let url = base ;
    let authToken = localStorage.getItem("userToken");
    // return this.http.get(url,{responseType:'blob',headers: new HttpHeaders().set("Authorization", authToken)});

    return await this.http.post(url,{}, { responseType: 'blob', headers: new HttpHeaders().set("Authorization", authToken) }).toPromise().then((data: any) => {
      //////console.log(JSON.stringify(data));
      return data;
    }).catch((error) => {
      // //////console.log("Promise rejected with " + JSON.stringify(error));
      return null;
    });

  }

  async getCarrier(carrierId: any) {
    const base = environment.shippingcourier_template;


    let url = base + '?code=&courierId=' + carrierId;
    let authToken = localStorage.getItem("userToken");
    // return this.http.get(url,{responseType:'blob',headers: new HttpHeaders().set("Authorization", authToken)});

    return await this.http.get(url, {headers: new HttpHeaders().set("Authorization", authToken) }).toPromise().then((data: any) => {
      //////console.log(JSON.stringify(data));
      return data;
    }).catch((error) => {
      // //////console.log("Promise rejected with " + JSON.stringify(error));
      return null;
    });

  }

  async getBlobForDuplex(filename: any[], fileob: any) {
    const base = environment.pdftoblobDuplex;
    // let urlIp='';
    // filename.forEach((url,i)=>{
    //   if(i==(filename.length-1))
    //   urlIp=urlIp+url;
    //   else
    //   urlIp=urlIp+url+',';
    // })
    let formData = new FormData();
    formData.append("urls", filename.join(","));
    formData.append("file", fileob);
    let url = base;
    let authToken = localStorage.getItem("userToken");
    // return this.http.get(url,{responseType:'blob',headers: new HttpHeaders().set("Authorization", authToken)});

    return await this.http.post(url, formData, { responseType: 'blob', headers: new HttpHeaders().set("Authorization", authToken) }).toPromise().then((data: any) => {
      //////console.log(JSON.stringify(data));
      return data;
    }).catch((error) => {
      // //////console.log("Promise rejected with " + JSON.stringify(error));
      return null;
    });

  }

}
