import { Component, OnInit, ViewChild } from '@angular/core';
import Stepper from 'bs-stepper';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { CreateOrdersService } from '../../orders/services/create-orders.service';
import { CreateProductService } from '../services/create-product.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CategoryService } from '../services/category.service';
import { SupplierService } from '../../suppliers/services/supplier.service';
import { ProductSuppliers } from 'src/app/_models/product-suppliers';
import currenciesJson from '../../../../assets/config/currencies.json';
import { SuppliersModule } from '../../suppliers/suppliers.module';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { WarehouseService } from '../../warehouse/services/warehouse.service';
import { WarehouseLocations } from 'src/app/_models/locations';
import { ChannelProductsService } from '../services/channel-products.service';



declare var $: any;
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  private stepper: Stepper;
  input: any = '';
  dropdownSettings_country: any;
  dropdownSettings_category: any;
  selectedCategory: any = [];
  allCategories: any = [];
  dropdownSettings_attributes: any;
  dropdownSettings_attributes_dynamic: any;
  selectedAttributes: any = [];
  allCountries: any = [];allShippingServices = [];
  minDate = { year: new Date().getUTCFullYear(), month: new Date().getUTCMonth() + 1, day: new Date().getUTCDate() };

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '5',
    minHeight: '5',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'indent',
        'outdent'
      ],
      [
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  };

  @ViewChild('ckeditorObj') ckeditor: any;

  page = 0;
  collectionsize = environment.defaultTotalValue;
  pageSize = environment.defaultPaginationValue;

  selectedCountry: any;

  productid: any;

  productsummary: any = '';
  productsummary1: any = '';
  productsummary2: any = '';
  productsummary3: any = '';
  productsummary4: any = '';
  desc: any = '';
  sku: any = '';
  title: any = '';
  qty: any = '' ;
  attributesArray = [];
  taxRatesDropdown = [];

  urlsPaths = [{ url: '' }, { url: '' }, { url: '' }, { url: '' }, { url: '' }];
  downloadImageChckbox = false;
  dropdownSettings_currency: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; enableCheckAll: boolean; allowSearchFilter: boolean; clearSearchFilter: boolean; closeDropDownOnSelection: boolean; };
  curencies: any = [];
  expirayDateString: string='';

  constructor(private channelProductsService: ChannelProductsService,private appTrackingService: AppTrackingService, private suplService: SupplierService, private categoryService: CategoryService, private toasterService: ToasterService, private datasharingService: DatasharingService, private createProductService: CreateProductService, private warehouseService: WarehouseService, private createOrdersService: CreateOrdersService) {
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
    this.dropdownSettings_category = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 1,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true
    };
    this.dropdownSettings_currency = {
      singleSelection: true,
      idField: 'code',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 1,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true
    };
    this.curencies = currenciesJson;
    this.getCategories();
    this.getSupplier();
    this.getProducts();
    this.createOrder();
    let ip: usertrackInput = { menu: TrackMenus.INVENTORY, submenu: subMenus.PRODUCTS, page: pages.IPCREATEPRODUCTPAGE, function: "", descrption: "Create product page loaded" };
    this.appTrackingService.trackUserActivity(ip);
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
    if (type == 'saveAttibutes') {
      let res = this.saveAttibutes();
      this.stepper.next();
    }
    if (type == 'saveProductSuppliers') {
      let res = this.saveProductSuppliers();
      this.stepper.next();
      // this.getInventoryTrackingDetails();
    }
    else {
      this.stepper.next();
    }
    if (type == "saveWarehouseLocations") {
      this.stepper.next();
      // this.getInventoryTrackingDetails();
    } else {
      this.stepper.next();
    }

  }
  onItemSelectCurrency(event, supp) {
    supp.currency = event.code;
  }
  saveProductSuppliers() {
    this.selectedSupp.forEach(sup => {
      sup.sku = this.sku;
    })
    if(this.selectedSupp.length>0){
      this.createProductService.saveProductSuppliers(this.productid, this.selectedSupp).subscribe(res => {
        this.toasterService.openToastMessage(ToastTypes.success, 'Create Product', 'Product Suppliers Details saved');
        this.stepper.next();
        // this.datasharingService.closeCreateorEditTab('edit');
        return;
      })
    } else {
      this.stepper.next();
      // this.datasharingService.closeCreateorEditTab('edit');
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

  onItemSelectCountryBil(event: any) {
    //console.log(event);
    //console.log(this.selectedCountry);
    // this.selectedCountry = event;
  }

  ngOnInit() {
    this.createProduct();
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
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
  getWarehouseLocations(sku: any){
    this.channelProductsService
        .getWarehouselocations(sku)
        .subscribe((res: any) => {
          console.log(res);
          this.locations = res;
          });
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
      this.getWarehouseLocations(this.sku)
      this.loading = false;
      this.taxRatesDropdown = res?.taxrates;
      this.taxrate = res?.product?.taxRate;
      this.attributesArray = res?.productAttributes;
      if (this.attributesArray.length > 0)
        this.attributesArray.forEach(item => {
          item['isEdit'] = false;
          item['value'] = item.value === null ? '' : item.value;

        });
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
    // this.desc = this.ckeditor._data;
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

    // if (this.selectedCategory == undefined || this.selectedCategory == []) {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Please Select Category');
    //   return;
    // }
    // if (this.expirayDate == undefined || this.expirayDate == null) {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Please Select Expirydate');
    //   return;
    // }
    //console.log(this.desc);
    this.createProductService.saveGeneralDetails(this.productid, this.title,
      this.desc, this.productsummary, this.sku,
      (this.selectedCountry && this.selectedCountry.length >0)?this.selectedCountry[0].country_code:''
      , this.isUpcSelected,
      this.isEAN_FSNSelected, this.isISBNSelected, this.isASINSelected,
      this.UPC, this.ean_fsn, this.ISBN, this.ASIN, (this.selectedCategory && this.selectedCategory.length >0)?this.selectedCategory[0].id:''
      , this.expirayDateString).subscribe((res: any) => {
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
  taxrate: any = 0;
  costprice: any = '';
  recomRetailsPrice: any = '';
  totlQty: any = '';
  minQty: any = 1;
  itemCond: any = '';
  condNotes: any = '';
  weightkg: any = '';
  weightgr: any = '';
  heightkg: any = '';
  depth: any = '';
  width: any = '';
  onWeightKG(){
   this.weightgr =(1000 * this.weightkg) ; 
  }
  onWeightGR(){
    this.weightkg = (0.001 * this.weightgr) ;
  }
  saveskuAndQuantityDetails() {
    // if (this.productid == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product Selling Price is missing');
    //   return false;
    // }
    // if (this.sellingpriceExTax == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product Selling Price after exculsion of tax is missing');
    //   return false;
    // }
    // if (this.taxrate == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product taxrate missing');
    //   return false;
    // }
    if (this.taxrate == '' || this.taxrate == null) {
      this.taxrate = 0;
    }

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

    if (this.minQty == '' || this.minQty === null) {
      this.minQty = 1;

    }
    // if (this.itemCond == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product Item Condition is missing');
    //   return false;
    // }
    // if (this.condNotes == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product Condition note is missing');
    //   return false;
    // }
    if (this.sellingprice == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'sellingprice  is missing');
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
      }, error => {
        this.loading = false;
        this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product failed', 'failed');
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
  isSaveVariationDone: boolean = false;
  isSelectVariationDone: boolean = false;
  goBacktoVariation() {
    this.isSaveVariationDone = false;
  }
  tableFields: any = [];
  loading: boolean = false;
  onItemSelect(event){
    this.isSelectVariationDone = true ;
  }
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
      if (Array.isArray(cmb))
        this.tableFields.push({ sku: this.sku + '' + i, qty: 1, ean: '', upc: '', baseprice: this.sellingprice, combinationIpArray: cmb });
      else
        this.tableFields.push({ sku: this.sku + '' + i, qty: 1, ean: '', upc: '', baseprice: this.sellingprice, combinationIpArray: [cmb] });
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
    this.loading = true;
    this.createProductService.findImages(this.productid).subscribe((res: any) => {
      //console.log(res);
      this.loading = false;
      this.uploadedimages = res.images;
      this.uploadedimages.map(um => {
        um.galleryImage = um.galleryImage == null ? false : true;
      });
    }, error => {
      this.loading = false;
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
      this.variations?.imagelist.map(img => {
        img.selected = false;
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
    let ids = [];
    let urls = [];
    for (const [key, value] of this.ChiladVariationsMap.entries()) {
      //console.log(key, value);
      ids.push(key);
      urls.push(value.toString());
    }

    this.createProductService.saveChaildImages(this.productid, ids, urls).subscribe(res => {
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
    let qparamFull = '';

    // if (this.brand != '') {
    //   qparam = qparam + '&attributevalue=' + this.brand;
    //   qparam1 = qparam1 + '&attributename=brand';
    // }
    // if (this.mpn != '') {
    //   qparam = qparam + '&attributevalue=' + this.mpn;
    //   qparam1 = qparam1 + '&attributename=mpn';
    // }
    // if (this.manfacturer != '') {
    //   qparam = qparam + '&attributevalue=' + this.manfacturer;
    //   qparam1 = qparam1 + '&attributename=manfacturer';
    // }
    // if (this.modelnumber != '') {
    //   qparam = qparam + '&attributevalue=' + this.modelnumber;
    //   qparam1 = qparam1 + '&attributename=modelnumber';
    // }

    for (let i = 0; i < this.attributesArray.length; i++) {
      let item = this.attributesArray[i];
      qparam = '&attributename=' + item.name + '&attributevalue=' + item.value;
      qparamFull = qparamFull + qparam;
    }
    this.createProductService.saveAttributes(this.productid, qparamFull).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Create Product', 'Product attributes saved successfully');
      this.stepper.next();
      //this.datasharingService.closeCreateorEditTab('create');
    }, error => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Product', 'Product attributes failed');
    });
  }

  openmodalMergeProd() {
    $('#mergeProd-modal').modal('show');
    this.getListMergeProducts();
  }
  getListMergeProducts() {
    // this.loading = true;
    if (this.productid)
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
    this.datasharingService.closeCreateorEditTab('create');
    this.modalclosedMerge();
  }
  modalclosedMerge() {
    $('#mergeProd-modal').modal('hide');
  }
  duplicateProd() {
    this.createProductService.duplicateThisProd(this.productid).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, "Sellershub", "Duplicate Product Created Successfully");
    });
    this.datasharingService.closeCreateorEditTab('create');
  }

  deleteProd() {
    this.createProductService.deleteThisProd(this.productid).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, "Sellershub", "Product Deleted Successfully");
    });
    this.datasharingService.closeCreateorEditTab('create');
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

  createAttribute() {
    const newObj = JSON.parse(JSON.stringify({ 'name': 'Attribute name' + this.attributesArray.length, 'value': '', 'category': '', isEdit: true }))
    this.attributesArray.push(JSON.parse(JSON.stringify(newObj)));
  }

  itemChange(event, item) {
    //console.log(event);
    //console.log(item);
  }

  uploadFormUrls() {
    this.urlsPaths = [{ url: '' }, { url: '' }, { url: '' }, { url: '' }, { url: '' }];
    $('#uploadimagesfromurl').modal('show');
  }
  uploadFromUrl() {
    this.loading = true;
    //console.log(this.urlsPaths);
    let urlPathsNew = '&'
    this.urlsPaths.forEach((item, i) => {
      if (item.url != '') {
        urlPathsNew = urlPathsNew + 'url' + (i + 1) + '=' + item.url + '&';
      }
    })
    //console.log(urlPathsNew);
    this.createProductService.saveUploadUrlImages(this.productid, urlPathsNew + 'download=' + this.downloadImageChckbox).subscribe(result => {
      //console.log(result);
      this.loading = false;
      $('#uploadimagesfromurl').modal('hide');
      this.getUploadedImages();
    }, error => {
      this.loading = false;
      //console.log(error);
    })
  }

  emithtml(event) {
    //console.log(event);
    //console.log(this.desc);
  }
  expirayDate:NgbDateStruct;
  expiryDate(event: any) {
    console.log(event);
    this.expirayDate = {year: event.year , month: event.month , day:event.day};
    this.expirayDateString =  event.day +'-'+(event.month < 10? '0'+event.month : event.month) +'-'+event.year;
  }

  getCategories() {
    this.loading = true;
    this.categoryService.getProductCategories().subscribe(res => {
      this.allCategories = res;
      this.loading = false;
    });
  }
  selectedSupp: Array<ProductSuppliers> = [];
  addSuppliers() {
    // this.selectedSupp=this.selectedSuppkiers;

    this.selectedSuppkiers.forEach(supp => {
      if (this.selectedSupp.findIndex(i => i.supplierId == supp.id) == -1) {
        const ps: ProductSuppliers = new ProductSuppliers();
        let Sup = this.allSupl.find(i => i.id == supp.id)
        ps.supplierId = Sup.id;
        ps.defaultSupplier = Sup.defaultSupplier;
        ps.name = Sup.firstName;
        ps.supplierCode = Sup.code;
        ps.leadTime = Sup['leadTime'];
        ps.currency = Sup['currency'];
        ps.minValue = Sup['minValue'];
        ps.maxValue = Sup['maxValue'];
        ps.packSize = Sup['packSize'];
        ps.costPrice = Sup['costPrice'];
        ps.cortonSize = Sup['cortonSize'];
        ps.palletQty = Sup['palletQty'];
        ps.vat = Sup['vat'];
        ps.miscNotes = Sup['miscNotes'];
        ps.costPrice = Sup['costPrice'];
        this.selectedSupp.push(ps);
      }
    });
  }

  allSupl: any = []; allProds: any[] = [];selectedWarehouse: any = [];allwarehouseLocations: any = [];location:any=[];locationId: any;locations:Array<WarehouseLocations> = [] ;locationName:any = '';
  selectedSuppkiers: any = [];
  dropdownSettings_supplier = {
    singleSelection: false,
    idField: 'id',
    textField: 'firstName',
    selectAllText: 'Select All',
    unSelectAllText: 'Deselect all',
    itemsShowLimit: 100,
    enableCheckAll: true,
    allowSearchFilter: true,
    clearSearchFilter: true,
    closeDropDownOnSelection: true
  };
  dropdownSettings_warehouse = {
    singleSelection: true,
    idField: "id",
    textField: "name",
    selectAllText: "Select All",
    unSelectAllText: "Deselect all",
    itemsShowLimit: 100,
    enableCheckAll: true,
    allowSearchFilter: true,
    clearSearchFilter: true,
    closeDropDownOnSelection: true,
  };
  dropdownSettings_location = {
    singleSelection: true,
    idField: "id",
    textField: "location",
    selectAllText: "Select All",
    unSelectAllText: "Deselect all",
    itemsShowLimit: 100,
    enableCheckAll: true,
    allowSearchFilter: true,
    clearSearchFilter: true,
    closeDropDownOnSelection: true,
  };
  getSupplier() {
    this.loading = true;
    this.suplService.getSupplier().subscribe((res: any) => {
      this.allSupl = res?.suppliers?.sort((a, b) => a.id > b.id ? -1 : 1);
      // let dname=supp.firstName+' '+supp.lastName!=null?supp.lastName:'';
      // this.allSupl.map(supp=>supp.display=)
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };
  channelId: any;id: any;
  createOrder() {
    this.createOrdersService.createOrder(this.channelId == null ? -1 : this.channelId).subscribe((res: any) => {
     
      this.id = res?.order?.id;
      
      this.createOrdersService.getShippingService(this.id).subscribe((res: any) => {
        this.allShippingServices = res.shippingoptions;
      })
      
    }, error => {
      
    });
      
      
      
  }
  getProducts() {
    this.loading = true;
    this.warehouseService.getWarehouse().subscribe((res: any) => {
      ////console.log("warehouse:::", res);
      this.allProds = res;
      this.collectionsize = res?.page?.totalResults;
      this.page = res?.page?.currentPageNumber;
      this.loading = false;
     
    }, eoor => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };
  addLocations(){
    const ps: WarehouseLocations = new WarehouseLocations();
    ps.warehouseName = this.warehouseName;
    ps.locationdetails = this.locationName ;
    ps.qty = this.totlQty;
    this.locations.push(ps);
    
  }
  warehouseName:any = '';
  onSelectLocation(e){
    this.locationId=e.id;
    this.locationName = e.location
    
  }
  onQuantitySubmit(loc){
    // console.log(loc)
    this.warehouseService.assignproducts(this.locationId, this.title, this.productid, loc.qty).subscribe(res => {
     
    },
      error => {
        ////console.log("Error updating");
        // this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
        this.loading = false;
      });
  }
  onSelectWarehouse(e){
    // console.log(e)
    this.warehouseService.getwarehouselocations(e.id).subscribe((res: any) => {
      // console.log(res)
      this.allwarehouseLocations = res.locations;
      this.warehouseName = res?.warehouse?.name;
    });
  }
  deleteSupplier(supp, index) {
    if (supp.id) {
      this.loading = true;
      this.suplService.removeSupplierProduct(supp.id, this.sku).subscribe((res: any) => {
        this.selectedSupp = this.selectedSupp.filter((i, n) => n != index);
        this.loading = false;
      }, eoor => {
        this.loading = false;
        this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
      });
    } else {
      this.selectedSupp = this.selectedSupp.filter((i, n) => n != index);

    }

  }
  selectDefaultSupp(event, supp) {
    if (event.target.checked) {
      this.selectedSupp.forEach(supp => { supp.isDefault = false });
    }
    supp.isDefault = event.target.checked;
  }

  // getInventoryTrackingDetails(){
  //   this.createProductService.inverntory_trcking(this.sku).subscribe(res=>{
  //     console.log(res);
  //   })
  // }
}
