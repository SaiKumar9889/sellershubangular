import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { AllMenuTabs } from 'src/app/_models/Tabs';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { ToastTypes } from 'src/app/_models/_toaster';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { ListingErrorsService } from '../../listing/services/listing-errors.service';
import { SalsesOrdersService } from '../../orders/services/salses-orders.service';
import { ChannelProductsService } from '../services/channel-products.service';
import { CreateProductService } from '../services/create-product.service';
declare var $: any;

@Component({
  selector: 'app-channel-products',
  templateUrl: './channel-products.component.html',
  styleUrls: ['./channel-products.component.css']
})
export class ChannelProductsComponent implements OnInit {
  loading: boolean = false;
  editChannel: boolean = false;
  allCurrencies: any = [];
  fromcurrency: any;
  tocurrency: any;
  dropdownSettings_currency: any;

  searchname: any = '0';
  searchValue2: any = '';
  selectedids: any[] = [];
  selectedChannel: any;
  channelProduct: any;
  productImages: any;
  channelId: any;
  selectedProduct: any;
  constructor(private appTrackingService:AppTrackingService,private createProductService:CreateProductService, private datasharingService: DatasharingService, private toasterService: ToasterService, private salsesOrdersService: SalsesOrdersService,
    private channelproductService: ChannelProductsService, private productService: ListingErrorsService) { 
      let ip:usertrackInput={menu:TrackMenus.INVENTORY,submenu:subMenus.CHANNELPRODUCTS,page:pages.CHANNELPRODUCTSPAGE,function:"",descrption:"Channel products page loaded"};
      this.appTrackingService.trackUserActivity(ip);
    }

  ngOnInit(): void {
    this.dropdownSettings_currency = {
      singleSelection: true,
      idField: 'value',
      textField: 'key',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 1,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true
    };
    this.getChannelProducts();
    this.getCurrencyValues();
    this.getChannelRegistration();
  }
  pageSize = environment.defaultPaginationValue;
  total = environment.defaultTotalValue;
  collectionsize = 0;
  allChannelProducts: any[] = [];
  searchValue: any = '';
  searchBy: any = 0;
  searchFrom: any = '';
  searchTo: any = '';
  topsalepercent: any = 0;
  topproductpercent: any = 0;
  topsaleValue: any = 0;
  topproductunits: any = 0;
  productTitle: string = '';
  page = 1;
  page2 = 1;
  currentPage = 3;
  disablepage = 3;
  isDisabled = true;

  auditTrack(type:any){
    let ip:usertrackInput;
    if(type==1)
    ip={menu:TrackMenus.INVENTORY,submenu:subMenus.CHANNELPRODUCTS,page:pages.CHANNELPRODUCTSPAGE,function:"",descrption:"Search button is clicked"};
    if(type==2)
    ip={menu:TrackMenus.INVENTORY,submenu:subMenus.CHANNELPRODUCTS,page:pages.CHANNELPRODUCTSPAGE,function:"",descrption:"Reset button is clicked"};
    if(type==3)
    ip={menu:TrackMenus.INVENTORY,submenu:subMenus.CHANNELPRODUCTS,page:pages.CHANNELPRODUCTSPAGE,function:"",descrption:" Bulk Revise Prices button is clicked"};
    if(type==4)
    ip={menu:TrackMenus.INVENTORY,submenu:subMenus.CHANNELPRODUCTS,page:pages.CHANNELPRODUCTSPAGE,function:"",descrption:"List Now button is clicked"};
    if(type==5)
    ip={menu:TrackMenus.INVENTORY,submenu:subMenus.CHANNELPRODUCTS,page:pages.CHANNELPRODUCTSPAGE,function:"",descrption:"Remove All button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }
  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  modalclosed() {
    $('#search-modal').modal('hide');
  }

  changespage(page: any) {
    this.getChannelProducts();
  }

  selectedItemsLength: any;
  individualselection(prod: any, event: any) {
    //this.allChannelProducts.find(cp=>cp.id=event.id).selected=!this.allChannelProducts.find(cp=>cp.id=event.id).selected;
    prod.selected = event.target.checked;
    let selectedItems = this.allChannelProducts.filter(sale => sale.selected == true);
    this.selectedItemsLength = selectedItems.length;
  }

  isAllChecked: boolean;

  selectall(event: any) {
    this.isAllChecked = event.target.checked;
    this.allChannelProducts.forEach((i: any) => i.selected = this.isAllChecked);
    let selectedItems = this.allChannelProducts.filter(sale => sale.selected == true);
    this.selectedItemsLength = selectedItems.length;
    if(this.isAllChecked){
      this.selectedids = this.allChannelProducts.map(item=>item.id);
      //console.log(this.selectedids);
    } else{
      this.allChannelProducts.forEach(item=>{
        if(this.selectedids.includes(item.id)){
          this.selectedids.splice( this.selectedids.findIndex(i=>i==item.id), 1);
        }
      })

    }

    // this.removeItem.push()
  }

  removeAll() {
    this.loading = true;
    this.channelproductService.removewaitinglist().subscribe((res: any) => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'Sellershub', 'success');
    },
    error => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Sellershub', error);
      this.loading = false;
    });
  }

  getChannelProducts() {
    this.loading = true;
    this.channelproductService.getChannelproducts(this.page, this.collectionsize, this.pageSize, this.channelType, this.fliter).subscribe((res: any) => {
      ////console.log(res);
      this.allChannelProducts = res?.channelProducts;
      if(this.selectedids.length === 0){
        this.allChannelProducts.map(cp => cp.selected = false);
      } else {
        this.selectedids.forEach(item=>{
          this.allChannelProducts.map(cp => cp.id=== item ? cp.selected = true: cp.selected = false);
        })
      }

      this.collectionsize = res?.page?.totalResults;
      // this.page = res?.page?.currentPageNumber;
      this.loading = false;
      if (this.allChannelProducts.length > 0)
        this.productTitle = this.allChannelProducts[0].title;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };


  getCurrencyValues() {
    this.channelproductService.getCurrencyValues("").subscribe(res => {
      ////console.log(res);
      this.allCurrencies = res;
    })
  }
  openCurrencyConverterModal() {
    $('#currency-modal').modal('show');
  }

  colseCurrencyModal() {
    $('#currency-modal').modal('hide');
  }

  openBulkReviseModal() {
    $('#bulik-revise-modal').modal('show');
  }

  colseBulkReviseModal() {
    $('#bulik-revise-modal').modal('hide');
  }

  scheduleResponse: any;
  schdate: any;
  openScheduleModal() {
    let selectedProd = this.allChannelProducts.filter(prod => prod.selected == true);
    if (selectedProd.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Channel Products', 'Please select atleast one product');
      return;
    }
    $('#schedule-modal').modal('show');

    this.channelproductService.scheduleListing().subscribe((res: any) => {
      // //console.log(res);
      // this.schdate = new DatePipe('en-US').transform(res.date, 'yyyy-MM-dd');
      // //console.log(this.schdate);
      // let darr=this.schdate.split('-');
      this.schdate = { year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate() }
      this.scheduleResponse = res;
      this.scheduledDate = this.schdate.year + '/' + this.schdate.month +'/'+ this.schdate.day;
    });
  }

  colseSchduleModal() {
    $('#schedule-modal').modal('hide');
  }

  onItemToSelect(event: any) {

  }

  onItemSelect(event: any) {

  }

  channelType: any = 0;
  fliter: any = '';

  channels: any = [];
  getChannelRegistration() {
    this.salsesOrdersService.getChannelRegistration().subscribe(res => {
      // ////console.log(res);
      this.channels = res;
    }, error => {
      this.loading = false;
    })
  }
  refresh() {
    this.getChannelProducts();
  }
  reset() {
    this.fliter = '';
    this.channelType = '0';
    this.getChannelProducts();
  }

  bulkRevisePriceType = 'pricebynumber';
  bulkRevisePrice = 0;
  updateBulkRevisePrice(action = 'increase') {
    const ids = this.allChannelProducts.filter(cp => cp.selected).map(i => { return i.id });
    this.channelproductService.updateBulkRevisePrice(ids, action, this.bulkRevisePrice, this.bulkRevisePriceType, ids.length, '100').subscribe((res: any) => {

      this.toasterService.openToastMessage(ToastTypes.success, 'Currency Convertor', 'Prices will be updated for the given channel. Please check the status via');
      this.colseCurrencyModal();
      this.getChannelProducts();
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Currency Convertor', 'Error');
    });
  }

  editedProductDetails: any;
  editChannelProduct(editedProductDetails: any) {
    this.loading = true;
    $('#editqty-modal').modal('show');
    this.editedProductDetails = editedProductDetails;
    this.loading = false;
    //console.log(editedProductDetails);
    this.channelDet = undefined;
    this.getChannelEditDetails(editedProductDetails?.sku);
  }



  channelDet: any;
  getChannelEditDetails(sku: any) {
    this.loading = true;
    this.channelproductService.getChannelproducts_Single(sku).subscribe(res => {
      //console.log(res);
      this.channelDet = res;
      this.channelDet?.child?.map(chi => {
        chi.variationSelected = true;
      });
      this.loading = false;
    })
  }

  closeChannelProductModal() {
    $('#editqty-modal').modal('hide');
  }

  getImage(img: string) {
    return 'https://s3-us-west-1.amazonaws.com/khubweb/web/kartzhub' + img + '.png';
  }
  updateqtylistingskuinput: any[] = [];
  updateqtylistingqtyinput: any[] = [];
  variationsku: any[] = [];
  variationqty: any[] = [];
  variationqtyselected: any[] = [];
  relistClosedItems: boolean = true;
  listfullQuantity: boolean = true;
  changeRelist() {
    this.relistClosedItems = !this.relistClosedItems;
  }
  changListFull() {
    this.listfullQuantity = !this.listfullQuantity;
  }
  changVariationStatus(chaild: any) {
    chaild.variationSelected = !chaild.variationSelected;
  }
  updateProductQty() {
    this.loading = true;
    this.updateqtylistingskuinput = [];
    this.updateqtylistingqtyinput = [];
    this.variationsku = [];
    this.variationqty = [];
    this.variationqtyselected = [];
    var sku = this.editedProductDetails?.sku;
    var qty = this.channelDet.kartzhubproduct.qty;
    var price = this.channelDet.kartzhubproduct.sellingPrice;
    var listfullqty = this.listfullQuantity;
    var relist = this.relistClosedItems;

    this.channelDet?.products?.forEach(pr => {
      this.updateqtylistingskuinput.push(pr.id);
      this.updateqtylistingqtyinput.push(pr.listingQty);
    });

    this.channelDet?.child?.forEach(pr => {
      this.variationsku.push(pr.sku);
      this.variationqty.push(pr.qty);
      this.variationqtyselected.push(pr.variationSelected);
    })

    this.channelproductService.updateProductQtyV2(sku, qty, price, listfullqty, relist, this.updateqtylistingskuinput, this.updateqtylistingqtyinput, this.variationsku, this.variationqty, this.variationqtyselected).subscribe(res => {
      //console.log(res);
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'Channel Products', 'Price Details Updated');
      this.getChannelProducts();
      this.closeChannelProductModal();
    });
  }
  listnow() {
    let selectedProd = this.allChannelProducts.filter(prod => prod.selected == true);
    if (selectedProd.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Channel Products', 'Please select atleast one product');
      return;
    }
    let ids = selectedProd.map(prd => prd.id);
    let body = { "ids": ids }
    this.channelproductService.listNow(body).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Channel Products', 'Started listing/updating items to the selected channels. Please allow up to 1 hour for the update');
      this.getChannelProducts();
    }, error => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Channel Products', 'Started listing/updating items to the selected channels. Please allow up to 1 hour for the update');
      this.getChannelProducts();
    });
  }

  colseScheduleModal() {
    $('#schedule-modal').modal('hide');
  }

  scheduledDate: any;
  schedulehh: any;
  schedulemm: any;
  scheduletimezone: any;
  dateEvt(event: any) {
    //console.log(event);
    this.scheduledDate = event.year + '/' + event.month +'/'+ event.day;
  }
  saveScheduleDetails() {
    let selectedProd = this.allChannelProducts.filter(prod => prod.selected == true);
    if (selectedProd.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Channel Products', 'Please select atleast one product');
      return;
    }
    let ids = selectedProd.map(prd => prd.id);
    let body = {
      "ids": ids,
      "scheduleHour": this.schedulehh,
      "scheduleMinute": this.schedulemm,
      "scheduleTime": this.scheduledDate,
      "scheduleTimeZone": this.scheduletimezone,
      "scheduleType": "schedule"
    }
    this.channelproductService.listNow(body).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Channel Products', 'Please select atleast one product');
      this.getChannelProducts();
      this.colseSchduleModal();
    })
  }
  editproduct(prod: any) {
    this.datasharingService.changeEditProductDetails({product:prod, isChannelProduct: true});
    let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.edit_product };
    this.datasharingService.addtoTab(menu);
  }

  updateView(item:any){
    //console.log(item)

    this.loading = true;
    this.createProductService.editChannelProduct(item.id).subscribe((res: any) => {
      // console.log(res)
      this.selectedProduct = res;
      this.channelProduct = res?.channelproduct;
      this.productImages = res?.productimages;
      this.channels = res?.id;
      this.channelId = res?.id;
      this.editChannel = true;
      this.selectedChannel = item.channel;

      this.loading = false;
    })

  }
  closeEditProduct(){
    this.channelProduct = null;
    this.productImages = null;
    this.channels = null;
    this.editChannel = false;
    this.selectedChannel = null;
}

  updateproduct(item){

    let ids = [item.id];
    let body = { "ids": ids }
    this.channelproductService.listNow(body).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Channel Products', 'Started listing/updating items to the selected channels. Please allow up to 1 hour for the update');
      this.getChannelProducts();
    }, error => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Channel Products', 'Started listing/updating items to the selected channels. Please allow up to 1 hour for the update');
      this.getChannelProducts();
    });
  }
  removeKartzhubproduct(prod){
   // https://pre.sellershub.io:8080/channels/removechannelproductOnly?unique=1645014840168&id=123
   this.channelproductService.removeChannelProductOnly(prod.id).subscribe(res => {
    this.toasterService.openToastMessage(ToastTypes.success, 'Channel Products', 'Channel product removed');
    this.getChannelProducts();
  }, error => {
    this.toasterService.openToastMessage(ToastTypes.error, 'Channel Products', 'Error while remove channel product');
    this.getChannelProducts();
  });
  }
}
