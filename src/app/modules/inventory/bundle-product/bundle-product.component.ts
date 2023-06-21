import { Component, OnDestroy, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { Subscription } from 'rxjs';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { CreateOrdersService } from '../../orders/services/create-orders.service';
import { CreateProductService } from '../services/create-product.service';
declare var $: any;

@Component({
  selector: 'app-bundle-product',
  templateUrl: './bundle-product.component.html',
  styleUrls: ['./bundle-product.component.scss']
})
export class BundleProductComponent implements OnInit,OnDestroy {

  private stepper: Stepper;
  input: any = '';
  dropdownSettings_country: any;
  dropdownSettings_attributes: any;
  dropdownSettings_attributes_dynamic: any;
  selectedAttributes: any = [];
  allCountries: any = [];


  page = 0;
  collectionsize = environment.defaultTotalValue;
  pageSize = environment.defaultPaginationValue;


  onItemSelectCountryBil(event: any) {

  }
  selectedCountry: any;

  productid: any;

  productsummary: any = '';
  desc: any = '';
  sku: any = '';
  title: any = '';
  eProdSubsc: Subscription;
  constructor(private toasterService: ToasterService, private datasharingService: DatasharingService, private createProductService: CreateProductService) {
    this.allCountries = this.datasharingService.getCountries();
    this.dropdownSettings_country = {
      singleSelection: true,
      idField: 'country_code',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 1,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true
    };
    this.dropdownSettings_attributes = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectionLimit: 4,
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 1,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true
    };
    this.dropdownSettings_attributes_dynamic = {
      singleSelection: false,
      idField: 'id',
      textField: 'value',
      selectionLimit: 4,
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 1,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true
    };

    this.eProdSubsc = this.datasharingService.bundle_productDetails.subscribe(res => {
      //console.log(':::::::::', res);
      // if(res.isChannelProduct){
      //   this.productid = res?.product?.productId;
      // } else{
      //   this.productid = res?.product?.id;
      // }

      // this.editProduct(this.productid);
    });
  }
  ngOnDestroy(): void {
   this.eProdSubsc.unsubscribe();
  }

  next(type: any) {
    if (type == 'saveGeneralSetting') {
      let res = this.saveGeneralDetails();
      ////console.log();
      if (!res) {
        return;
      } else {
        this.stepper.next();
      }
    }
    if (type == 'skuPrice') {
      let res = this.saveskuAndQuantityDetails();
      ////console.log();
      if (!res) {
        return;
      } else {
        this.stepper.next();
      }
    }
    if (type == 'variation' && this.hasVariation) {
      let res = this.save_productVariation();
      ////console.log();
      if (!res) {
        // this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product Base Price is missing');
        return false;
      } else {
        this.stepper.next();
      }
      this.stepper.next();
    }
    if (type == 'images') {
      let res = this.saveImagesSortingOption();
      this.stepper.next();
    }
    if (type == 'variationimages') {
      let res = this.saveVariationImages();
      this.stepper.next();
    }

    
    else {
      this.stepper.next();
    }

  }

  save_productVariation() {
    let price = '';
    let qty = '';
    let sku = '';
    let upc = '';
    let ean = '';
    let inputvar1 = '';
    let inputvar2 = '';
    let inputvar3 = '';
    let inputvar4 = '';
    let variationheaders = ''
    this.tableFields.forEach(prd => {
      // if(prd.baseprice==''||prd.baseprice==undefined){
      //   this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product Base Price is missing');
      //   return false;
      // }
      price = price + '&price=' + prd.baseprice;
      qty = qty + '&qty=' + prd.qty;
      sku = sku + '&sku=' + prd.sku;
      upc = upc + '&upc=' + prd.upc;
      ean = ean + '&ean=' + prd.ean;
      ////console.log(prd.combinationIpArray);
      prd.combinationIpArray.forEach((cIp, index) => {
        if (index == 0)
          inputvar1 = inputvar1 + '&inputvar1=' + cIp;
        if (index == 1)
          inputvar2 = inputvar2 + '&inputvar2=' + cIp;
        if (index == 2)
          inputvar3 = inputvar3 + '&inputvar3=' + cIp;
        if (index == 3)
          inputvar4 = inputvar4 + '&inputvar4=' + cIp;
      });
    });
    let param = price + qty + sku + upc + ean;
    let par = '';
    this.mappedAttributes.forEach((res, index) => {
      if (index == 0)
        par = par + '' + res.name;
      else
        par = par + ',' + res.name;
    });
    variationheaders = '&variationheaders=' + par;
    param = param + inputvar1 + inputvar2 + inputvar3 + inputvar4 + variationheaders;
    this.createProductService.saveProductVariations(this.productid, param).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Create Product', 'Product Variation Details saved');
      this.stepper.next();
      return;
    })
    return null;
  }
  removeImage(image: any) {
    this.createProductService.removeImage(image.id, this.productid).subscribe(res => {
      this.uploadedimages = this.uploadedimages.filter(img => img.id != image.id);
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Image Removed successfully');
    })
  }
  hasVariation: any = false;
  changeVariation(val: any) {
    this.hasVariation = val;
    if (this.hasVariation)
      this.getAttributes();
  }
  onSubmit() {
    return false;
  }

  ngOnInit() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
  //  this.createProduct();
    this.getGeneralSettinigs();
  }

  attributes: any = [];
  getAttributes() {
    this.createProductService.getSettingattribute().subscribe((res: any) => {
      this.attributes = res.attributes;
      this.attributes.map(attr => attr.attributeValuesJson = JSON.parse(attr.attributeValuesJson));
      this.attributes.forEach(att => {
        att.attributeValuesJson?.values?.map(val => val.id = val.value);
        att.selvalues = [];
      });
      ////console.log(this.attributes);
    });
  }

  mappedAttributes: any = [];

  setMapAttributes() {
    let selectedid = [];
    selectedid = this.selectedAttributes.map(id => id.id);
    ////console.log(selectedid);
    this.mappedAttributes = this.attributes.filter(att => selectedid.includes(att.id));
    ////console.log(this.mappedAttributes);
  }

  onDropDownClose(event: any) {
    ////console.log('drop change');
    this.setMapAttributes();
  }

  getDataDataJson(vari: any) {
    let Json = JSON.parse(vari?.attributeValuesJson);
    Json?.values.map(val => val.id = val.value);
    return Json?.values;
  }

  createProduct() {
    this.loading = true;
    this.createProductService.createProduct().subscribe((res: any) => {
      this.productid = res.id;
      this.loading = false;
      this.editProduct(this.productid);
    }, error => {
      this.loading = false;
    })
  }

  onDropDownCloseAttri(event: any) {
    ////console.log(event);
    // ////console.log(type);
  }
  editProduct(id) {
    this.loading = true;
    this.createProductService.editProduct(id).subscribe((res: any) => {
      ////console.log(res);
      // this.productid=res.id;
      this.sku = res.product.sku;
      this.loading = false;
    })
  }

  saveGeneralDetails() {
    if (this.productid == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product id is missing');
      return false;
    }
    if (this.sku == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'SKU is missing');
      return false;
    }
    if (this.title == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product title missing');
      return false;
    }

    if (this.desc == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product descrption missing');
      return false;
    }
    // if (this.productsummary == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product summary is missing');
    //   return false;
    // }
    // if (this.selectedCountry == undefined || this.selectedCountry == []) {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product select country');
    //   return false;
    // }
    if (this.isUpcSelected && this.UPC == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product UPC missing');
      return;
    }
    if (this.isEAN_FSNSelected && this.ean_fsn == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product EAN/FSN missing');
      return;
    }
    if (this.isISBNSelected && this.ISBN == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product ISBN missing');
      return;
    }
    if (this.isASINSelected && this.ASIN == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product ASIN missing');
      return;
    }
    this.createProductService.saveGeneralDetails(this.productid, this.title,
      this.desc, this.productsummary, this.sku, "", this.isUpcSelected,
      this.isEAN_FSNSelected, this.isISBNSelected, this.isASINSelected,
      this.UPC, this.ean_fsn, this.ISBN, this.ASIN,'','').subscribe((res: any) => {
        ////console.log(res);
        if (res.status == 'ok') {
          this.stepper.next();
          this.toasterService.openToastMessage(ToastTypes.success, 'Create Product', 'Product general Details saved');
          return;
        }
      });
  }

  isUpcSelected: boolean = false;
  isEAN_FSNSelected: boolean = false;
  isISBNSelected: boolean = false;
  isASINSelected: boolean = false;

  UPC: any = '';
  ean_fsn: any = '';
  ISBN: any = '';
  ASIN: any = '';

  upcSelected() {
    this.isUpcSelected = !this.isUpcSelected;

  }
  EAN_FSNSelected() {
    this.isEAN_FSNSelected = !this.isEAN_FSNSelected;
  }
  isbnSelected() {
    this.isISBNSelected = !this.isISBNSelected;
  }
  asinSelected() {
    this.isASINSelected = !this.isASINSelected;
  }
  pevious() {
    this.stepper.previous();
  }
  taxRates: any = [];
  getGeneralSettinigs() {
    this.createProductService.getGeneralSetting().subscribe((res: any) => {
      this.taxRates = res?.taxRates;
    }, error => {
      this.loading = false;
    })
  }

  sellingprice: any = '';
  sellingpriceExTax: any = '';
  taxrate: any = '';
  costprice: any = '';
  recomRetailsPrice: any = '';
  totlQty: any = '';
  minQty: any = '';
  itemCond: any = '';
  condNotes: any = '';
  weightkg: any = '';
  heightkg: any = '';
  depth: any = '';
  width: any = '';

  saveskuAndQuantityDetails() {
    if (this.productid == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product Selling Price is missing');
      return false;
    }
    // if (this.sellingpriceExTax == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product Selling Price after exculsion of tax is missing');
    //   return false;
    // }
    // if (this.taxrate == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product taxrate missing');
    //   return false;
    // }

    // if (this.costprice == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product Cost Price missing');
    //   return false;
    // }
    // if (this.recomRetailsPrice == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product Recomended retail price is missing');
    //   return false;
    // }

    if (this.totlQty == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product Total Quantity is missing');
      return false;
    }


    // if (this.minQty == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product Minimum Quantity is missing');
    //   return false;
    // }
    // if (this.itemCond == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product Item Condition is missing');
    //   return false;
    // }
    // if (this.condNotes == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product Condition note is missing');
    //   return false;
    // }
    if (this.weightkg == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product Weight is missing');
      return false;
    }
    if (this.heightkg == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product Height is missing');
      return false;
    }
    if (this.depth == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product Depth is missing');
      return false;
    }

    if (this.width == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product width is missing');
      return false;
    }
    this.loading = true;
    this.createProductService.saveKuDetails(this.productid, this.sellingprice,
      this.totlQty, this.itemCond, this.minQty, this.taxrate, this.condNotes,
      this.costprice, this.recomRetailsPrice, this.weightkg,
      this.heightkg, this.depth, this.width).subscribe((res: any) => {
        this.loading = false;
        ////console.log(res);
        if (res.status == 'ok') {
          this.stepper.next();
          this.toasterService.openToastMessage(ToastTypes.success, 'Create Product', 'Product SKU Details saved');
          return;
        }
      });
  }

  addedUrls: any = [{ id: 'input1', value: '', serial: 1 }];

  addUrlUi() {
    let serial = this.addedUrls[this.addedUrls.length - 1].serial++;
    this.addedUrls.push({ id: 'input' + serial, value: '', serial: serial });
  }
  modalclosed() {
    $('#imageurl-modal').modal('hide');
  }

  openURlModel() {
    $('#imageurl-modal').modal('show');
  }
  openuploadfun() {
    this.isVarionImages = false;
    $('#my-file').click();
  }
  isSaveVariationDone: boolean = false
  goBacktoVariation() {
    this.isSaveVariationDone = false;
  }
  tableFields: any = [];
  loading: boolean = false;
  genTableVariations() {
    this.loading = true;
    ////console.log(this.mappedAttributes);
    let i = 0;

    let combinationIpArray = [];


    this.mappedAttributes.forEach((ma, index) => {
      combinationIpArray.push(ma.selvalues.map(sel => sel.value));
      // ma.selvalues.forEach(sv => {
      //   ////console.log(i);
      //   this.tableFields.push({ sku: this.sku + '' + i, qty: 1, ean: '', upc: '', baseprice: '' });
      // });
      // i++;
    })
    ////console.log(combinationIpArray);
    ////console.log(this.cartesian(combinationIpArray));
    this.tableFields = [];
    this.cartesian(combinationIpArray).forEach(cmb => {
      this.tableFields.push({ sku: this.sku + '' + i, qty: 1, ean: '', upc: '', baseprice: this.sellingprice, combinationIpArray: cmb });
      i++;
    })
    this.isSaveVariationDone = true;
    this.loading = false;
  }
  cartesian(array) {
    let result = array.reduce((a, b) => a.reduce((r, v) => r.concat(b.map(w => [].concat(v, w))), []));
    ////console.log(result.map(a => a.join(', ')));
    return result;
  }
  selectedFiles: [];
  uploadedimages: any = [];
  async changeFiles(event: any) {
    ////console.log(event.target.files);
    this.loading = true;
    let res = await this.createProductService.uploadImageSync(event.target.files, this.productid);
    this.loading = false;
    ////console.log(res);
    this.uploadedimages = res;
    this.getUploadedImages();
  }
  changeTheGallery(image: any) {
    image.galleryImage = !image.galleryImage;
  }
  getUploadedImages() {
    this.createProductService.findImages(this.productid).subscribe((res: any) => {
      //console.log(res);
      this.uploadedimages = res.images;
      this.uploadedimages.map(um => {
        um.galleryImage = um.galleryImage == null ? false : true;
      });
    });
  }

  saveImagesSortingOption() {
    let id = [];
    let checked = [];
    let sortorders = [];
    this.uploadedimages.forEach(img => {
      id.push(img.id);
      checked.push(img.galleryImage);
      sortorders.push(img.sortorders);
    })
    let body = {
      "id": this.productid,
      "ids": id,
      "checked": checked,
      "sortorders": sortorders
    }
    this.createProductService.saveImages(body).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Create Product', 'Product Images saved successfully');
    })
  }
  isVarionImages: boolean = false;
  variations: any;
  gwtImagesForMapping() {
    this.isVarionImages = true;
    this.variations = undefined;
    this.createProductService.gwtImagesForMapping(this.productid).subscribe((res: any) => {
      //console.log(res);
      this.variations = res;
      this.variations?.imagelist.map(img=>{
        img.selected=false;
      });
    })
  }
  ChiladVariationsMap = new Map();
  saveChaildImage(childs: any, img: any) {
    //console.log(childs.id);
 //   //console.log('Before::::', img.selected);
    img.selected = !img.selected;
  //  //console.log(img.selected);
    if (this.ChiladVariationsMap.has(childs.id)) {
      let imgArray: any[] = this.ChiladVariationsMap.get(childs.id);
      if (!imgArray.includes(img.url)) {
        imgArray.push(img.url);
        this.ChiladVariationsMap.set(childs.id, imgArray);
      } else {
        imgArray = imgArray.filter(imgS => imgS != img.url);
        this.ChiladVariationsMap.set(childs.id, imgArray);
      }
    } else {
      this.ChiladVariationsMap.set(childs.id, [img.url]);
    }
    //console.log(this.ChiladVariationsMap);
  }

  saveVariationImages() {
   let ids=[];
   let urls=[];
    for (const [key, value] of this.ChiladVariationsMap.entries()) {
      //console.log(key, value);
      ids.push(key);
      urls.push(value.toString());
    }

    this.createProductService.saveChaildImages(this.productid,ids,urls).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Create Product', 'Product Images saved successfully');
    })
  }



  getBackToUplod() {
    this.isVarionImages = false;
  }
  removeFromcombi(tbf) {
    this.tableFields = this.tableFields.filter(tf => tf.sku != tbf.sku);
  }
  getCombn(arr, pre) {
    pre = pre || '';
    if (!arr.length) {
      return pre;
    }
    var ans = arr[0].reduce(function (ans, value) {
      return ans.concat(this.getCombn(arr.slice(1), pre + value));
    }, []);
    return ans;
  }
  brand: any = '';
  mpn: any = '';
  manfacturer: any = '';
  modelnumber: any = '';
  saveAttibutes() {
    let qparam = '';
    let qparam1 = '';
    if (this.brand != '') {
      qparam = qparam + '&attributevalue=' + this.brand;
      qparam1 = qparam1 + '&attributename=brand';
    }
    if (this.mpn != '') {
      qparam = qparam + '&attributevalue=' + this.mpn;
      qparam1 = qparam1 + '&attributename=mpn';
    }
    if (this.manfacturer != '') {
      qparam = qparam + '&attributevalue=' + this.manfacturer;
      qparam1 = qparam1 + '&attributename=manfacturer';
    }
    if (this.modelnumber != '') {
      qparam = qparam + '&attributevalue=' + this.modelnumber;
      qparam1 = qparam1 + '&attributename=modelnumber';
    }
    this.createProductService.saveAttributes(this.productid, qparam + qparam1).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Create Product', 'Product attributes saved successfully');
    });
  }

  openmodalMergeProd() {
    $('#mergeProd-modal').modal('show');
    this.getListMergeProducts();
  }
  getListMergeProducts() {
   
    if(this.productid)
    this.createProductService.getListOfProducts(this.productid, this.page, this.collectionsize, this.pageSize).subscribe((res: any) => {
      // //console.log(res);
      // this.page=res?.page.;
      this.collectionsize = res?.page.totalResults;
      this.mergedProds = res?.products;
      this.loading = false;
    })
  }
  mergedProds: any = [];
  mergeThisProd(prod: any) {
    this.createProductService.mergeProd(this.productid, prod.id).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, "Sellershub", "Merger Product Done Successfully");
    });
    this.datasharingService.closeCreateProductTab();
    this.modalclosedMerge();
  }
  modalclosedMerge() {
    $('#mergeProd-modal').modal('hide');
  }
  duplicateProd() {
    this.createProductService.duplicateThisProd(this.productid).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, "Sellershub", "Duplicate Product Created Successfully");
    });
    this.datasharingService.closeCreateProductTab();
  }

  deleteProd() {
    this.createProductService.deleteThisProd(this.productid).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, "Sellershub", "Product Deleted Successfully");
    });
    this.datasharingService.closeCreateProductTab();
  }

  printProd() {
    this.createProductService.printProduct(this.productid).subscribe(res => {
      //  this.toasterService.openToastMessage(ToastTypes.success, "Sellershub", "Product Deleted Successfully");
    });
    // this.datasharingService.closeCreateProductTab();
    // this.modalclosedMerge();
  }

  changespage(event: any) {
    this.getListMergeProducts();
  }

}
