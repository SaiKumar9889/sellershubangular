import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor( private http: HttpClient) { }

  getProductCategories() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.productcategory, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  saveCategory(ip:any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(environment.create_productcategory, ip,{
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  updateCategory(ip: { details: any; display: boolean; id: any; kartzhubUserId: number; name: string; parentCategory: any; parentId: any; path: any; subCategories: any[]; }) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(environment.create_productcategory, ip,{
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  delete(id = '') {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(environment.delete_productcategory+'?id='+id, {},{
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
}
