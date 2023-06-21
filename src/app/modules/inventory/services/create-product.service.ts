import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { files } from 'jszip';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CreateProductService {



  constructor(private http: HttpClient) { }


  createProduct() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.create_product, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  editProduct(id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.edit_product + '?id=' + id, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  editChannelProduct(id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.edit_channel_product + '?id=' + id, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  updateChannelProduct(id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(environment.updatetochannel + '?id=' + id,{}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  saveGeneralDetails(id: any, title: any, desc: any, summary: any, sku: any, country: any, isUpcSelected: boolean, isEAN_FSNSelected: boolean, isISBNSelected: boolean, isASINSelected: boolean, upcText: any, eas_fsn: any, isbn: any, asbn: any,categoryid:any,expirydate:any) {
    let qparam = `?id=${id}&title=${title}&summary=${summary}&sku=${sku}&country=${country}&description=${desc}&categoryId=${categoryid}`;
    let sparam = '';
    if (isUpcSelected) {
      sparam = sparam + '&upc=' + upcText
    }
    if (isEAN_FSNSelected) {
      sparam = sparam + '&ean=' + eas_fsn
    }
    if (isISBNSelected) {
      sparam = sparam + '&isbn=' + isbn
    }
    if (isASINSelected) {
      sparam = sparam + '&asin=' + asbn
    }
    if(expirydate){
      sparam = sparam + '&expiryDate='+expirydate;
    }
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(environment.save_general + qparam + sparam, {}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  // https://login.sellershub.io/rest/saveproductimages

  saveKuDetails(id: any, sellingProce: any, quantity: any, itemcondition: any,
    minqty: any, taxRate: any, conditionnote: any, costprice: any, rrp: any, weightkg: any,
    height: any, depth: any, width: any,) {
    let qparam = `?id=${id}&sellingprice=${sellingProce}&quantity=${quantity}&itemcondition=${itemcondition}&minqty=${minqty}&taxcode=${taxRate}&conditionnote=${conditionnote}&rrp=${rrp}&weightkg=${weightkg}&height=${height}&depth=${depth}&width=${width}`;
    if(costprice){
      qparam=qparam+'&costprice='+costprice;
    }
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(environment.save_ku_details + qparam, {}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  saveProductVariations(parentid: any, qparam: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(environment.save_variations + "?parentid=" + parentid + qparam, {}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  saveProductSuppliers(productid: any, data: import("../../../_models/product-suppliers").ProductSuppliers[]) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(environment.save_product_suppliers + "?productid=" + productid , data, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  saveAttributes(parentid: any, qparam: any) {

    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(environment.saveAttributes + '?id=' + parentid + qparam, {}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getGeneralSetting() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_generalsettings, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getSettingattribute() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.set_editattributeset, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  async uploadImageSync(files: any, productId) {
    const formData: FormData = new FormData();
    // files.forEach(file=>{
    //   formData.append(file.name,file);
    // })
    // formData.append('files', files);
    let authToken = localStorage.getItem("userToken");
    for (var i = 0; i < files.length; i++) {
      formData.append('file', files[i], files[i].name);
    }
    return await this.http.post<any>(environment.upload_image + '?productId=' + productId + '&preserverimagename=true', formData, {
      headers: new HttpHeaders().set("Authorization", authToken),
    }).toPromise().then((data: any) => {
      //////console.log(JSON.stringify(data));
      return data;
    }).catch((error) => {
      // //////console.log("Promise rejected with " + JSON.stringify(error));
      return null;
    });
  }


  findImages(prodid: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.find_images_based_on_product + "?id=" + prodid, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  saveImages(body: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.saveImages_inproduct, body, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  gwtImagesForMapping(id){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.imagesForMapping+'?id='+id,{
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  saveChaildImages(parentid:any,chaildid:any[],chaildImages:any[]){
    let authToken = localStorage.getItem("userToken");
    let id='';
    let imgurl='';
    chaildid.forEach(cid=>{
      id=id+'&childid='+cid;
    });
    chaildImages.forEach(chaildImg=>{
      imgurl=imgurl+'&childimage='+chaildImg;
    });
    return this.http.post(environment.save_child_images+'?parentid='+parentid+id+imgurl,{},{
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  removeImage(imageiD: any, prodId: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(environment.remove_image + '?ids=' + imageiD + '&productid=' + prodId, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getListOfProducts(id: any, page: any, collectionsize: any, pagesize: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.merge_product_list + "?id=" + id + "&pageno=" + page + "&total=" + collectionsize + "&orderBy=0&pagesize=" + pagesize, {}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  mergeProd(prod_id: any, mr_id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.start_merge_prod + "?productId=" + prod_id + "&mergingproductid=" + mr_id, {}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  duplicateThisProd(prod_id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.duplicate_product + "?id=" + prod_id, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  deleteThisProd(prod_id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.delete_product + "?id=" + prod_id + '&removefromchannels=false&total=100&pageno=1', {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  printProduct(prod_id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.print_product + "?id=" + prod_id, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  saveUploadUrlImages(prod_id, pathUrl){
   // http://pre.sellershub.io:8080/rest/uploadimagesfromurl?id=88569&url1=https://ir.ebaystatic.com/rs/v/fxxj3ttftm5ltcqnto1o4baovyl.png
    let authToken = localStorage.getItem("userToken");
    return this.http.post(environment.uploadImagesFromurl + "?id=" + prod_id+pathUrl,  {}, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });

  }

  inverntory_trcking(sku:any){
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.inverntory_trcking + "?sku=" +sku, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

}
