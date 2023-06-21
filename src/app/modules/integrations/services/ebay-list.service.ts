import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EbayListService {

    constructor(  private http: HttpClient) { }
    getAllchannels(id){
      let authToken = localStorage.getItem("userToken");
      return this.http.get(environment.listingtemplate+'/ebay/all?channelId='+id, {
        headers: new HttpHeaders().set("Authorization", authToken),
      });
    }

    getSelectedTemplate(id, templateId){
      let authToken = localStorage.getItem("userToken");
      return this.http.get(environment.listingtemplate+'/ebay?channelId='+id+'&templateId='+templateId, {
        headers: new HttpHeaders().set("Authorization", authToken),
      });
    }
    deleteSelectedTemplate(id, templateid){
      let authToken = localStorage.getItem("userToken");
      return this.http.delete(environment.listingtemplate + `/ebay?channelId=${id}&templateId=${templateid}`, {
        headers: new HttpHeaders().set("Authorization", authToken),responseType:'text'
      });
    }
    saveEbayTemplate(estyobj:any, id){
      let authToken = localStorage.getItem("userToken");
      return this.http.post(environment.listingtemplate + `/ebay?ebayuserid=${id}`, estyobj, {
        headers: new HttpHeaders().set("Authorization", authToken),
      });
    }

    getCategories(id, site){
      let authToken = localStorage.getItem("userToken");
      return this.http.get(environment.findebaycategories+'?categoryid='+id+'&site='+site+'&parentid=-1', {
        headers: new HttpHeaders().set("Authorization", authToken),
      });
    }
    getSubCategories(id, site, subtag){
      if(subtag === '') { subtag = '%23'; }
      let authToken = localStorage.getItem("userToken");
      return this.http.get(environment.loadebaycategories+'?id='+id+'&site='+site+'&parent='+subtag, {
        headers: new HttpHeaders().set("Authorization", authToken),
      });
    }
    loadEbayStoreCategories(id, channeluserid, subtag){
      if(subtag === '') { subtag = '%23'; }
      let authToken = localStorage.getItem("userToken");
      return this.http.get(environment.loadebaystorecategories+'?id='+id+'&channeluserid='+channeluserid+'&parent='+subtag, {
        headers: new HttpHeaders().set("Authorization", authToken),
      });
    }

    getEbayItemSpecs(id, site, categoryid){
      let authToken = localStorage.getItem("userToken");
      return this.http.post(environment.findebayitemspecificsfortemplate+'?id='+id+'&site='+site+'&category='+categoryid, {}, {
        headers: new HttpHeaders().set("Authorization", authToken),
      });
    }
    getEbayItemSpecsForProduct(prodId, id){
      let authToken = localStorage.getItem("userToken");
      return this.http.post(environment.findebayitemspecifics+'?id='+id+'&productid='+prodId, {}, {
        headers: new HttpHeaders().set("Authorization", authToken),
      });
    }

    saveEbayItemSpecs(id, data){
      let authToken = localStorage.getItem("userToken");
      return this.http.post(environment.savetemplateproductattributes+'?id='+id, data, {
        headers: new HttpHeaders().set("Authorization", authToken),
      });
    }

    getPolicies(id){
      let authToken = localStorage.getItem("userToken");
      return this.http.get(environment.downloadebaylatestpolices+'?id='+id, {
        headers: new HttpHeaders().set("Authorization", authToken),
      });
    }
}
