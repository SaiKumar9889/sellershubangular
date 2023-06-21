import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(  private http: HttpClient) { }

    getAllchannels(id){
        let authToken = localStorage.getItem("userToken");
        return this.http.get(environment.listingtemplate + `/all?channelId=${id}`, {
          headers: new HttpHeaders().set("Authorization", authToken),
        });
      }
      getSelectedTemplate(id, templateid){
        let authToken = localStorage.getItem("userToken");
        return this.http.get(environment.listingtemplate + `?channelId=${id}&templateId=${templateid}`, {
          headers: new HttpHeaders().set("Authorization", authToken),
        });
      }

      deleteSelectedTemplate(id, templateid){
        let authToken = localStorage.getItem("userToken");
        return this.http.delete(environment.listingtemplate + `?channelId=${id}&templateId=${templateid}`, {
          headers: new HttpHeaders().set("Authorization", authToken),
        });
      }
      saveEtsyTemplate(estyobj:any, id){
        let authToken = localStorage.getItem("userToken");
        return this.http.post(environment.listingtemplate + `?channelId=${id}`, estyobj, {
          headers: new HttpHeaders().set("Authorization", authToken),
        });
      }
      updateEtsyTemplate(estyobj:any, id){
        let authToken = localStorage.getItem("userToken");
        return this.http.put(environment.listingtemplate + `?channelId=${id}`, estyobj, {
          headers: new HttpHeaders().set("Authorization", authToken),
        });
      }

      etsyCategories(id){
        let authToken = localStorage.getItem("userToken");
        return this.http.post(environment.loadetsycategories + `?channelid=${id}`, [], {
          headers: new HttpHeaders().set("Authorization", authToken),
        });
      }

      shopifyCategories(id){
        let authToken = localStorage.getItem("userToken");
        return this.http.get(environment.loadshopifystorecategories + `?id=${id}`, {
          headers: new HttpHeaders().set("Authorization", authToken),
        });
      }



}
