import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AmazonInteService {
  constructor(  private http: HttpClient) { }

  getAllreadyIntegratedData(id){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.amazon_existing_data + `?id=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  getAllStores(){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.get_all_stores, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  createStores(data){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.create_stores,data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  updateStores(data){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.update_stores,data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  deleteStores(data){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.delete_stores,data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  updateStoreStatus(data){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.update_store_status,data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  getStoreById(data){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.get_storesById,data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  createIntegratedData(data){
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.amazon_existing_data,data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  updateIntegratedData(data){
    let authToken = localStorage.getItem("userToken");
    return this.http.put(environment.amazon_existing_data,data, {
      headers: new HttpHeaders().set("Authorization", authToken), responseType: 'text'
    });
  }

  deleteAmazonAccount(channelId){
    let authToken = localStorage.getItem("userToken");
    return this.http.delete(environment.amazon_existing_data+'?channelId='+channelId, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  testConnection(id){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.amazon_test_connection + `?id=${id}`, {
      headers: new HttpHeaders().set("Authorization", authToken), responseType: 'text'
    });
  }

  downloadRecentProducts(channelId){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.amazon_download_recent_prod + `?channelId=${channelId}`, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  downloadAllProducts(channelId){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.amazon_downloadAllProducts + `?channelId=${channelId}`, {
      headers: new HttpHeaders().set("Authorization", authToken), responseType: 'text'
    });
  }

 // listing amzon services

 getAllchannels(id){
  let authToken = localStorage.getItem("userToken");
  return this.http.get(environment.listingtemplate + `/amazon/all?channelId=${id}`, {
    headers: new HttpHeaders().set("Authorization", authToken),
  });
}
getSelectedTemplate(id, templateid){
  let authToken = localStorage.getItem("userToken");
  return this.http.get(environment.listingtemplate +  "/" +"amazon"+"?"+`channelId=${id}`+"&"+`templateId=${templateid}`, {
    headers: new HttpHeaders().set("Authorization", authToken),
  });
}
getSubCategory(site, name){
  let authToken = localStorage.getItem("userToken");
  return this.http.get(environment.amazon_subcategories + "?"+`site=${site}`+"&"+`name=${name}`, {
    headers: new HttpHeaders().set("Authorization", authToken),
  });
}
getBrowserNodes(page,total,search,site,name){
  let authToken = localStorage.getItem("userToken");
  return this.http.get(environment.amazon_browsernodes + "?"+`page=${page}`+"&"+`total=${total}`+"&"+`search=${search}`+"&"+`site=${site}`+"&"+`name=${name}`, {
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
  return this.http.post(environment.listingtemplate + "/" +"amazon"+"?"+ `amazonuserid=${id}`, estyobj, {
    headers: new HttpHeaders().set("Authorization", authToken),
  });
}
getProductAttributes(id,category,subcategory){
  let authToken = localStorage.getItem("userToken");
  return this.http.get(environment.find_product_attributes + "?"+`id=${id}`+"&"+`category=${category}`+"&"+`subcategory=${subcategory}`, {
    headers: new HttpHeaders().set("Authorization", authToken),
  });
}
updateInventory(body) {
  let authToken = localStorage.getItem("userToken");
  return this.http.post<any[]>(
    environment.inventory_update, body,
    { headers: new HttpHeaders().set("Authorization", authToken) }
  );
}
}