import { Component, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { ListedProductsService } from '../services/listed-products.service';
import Swal from 'sweetalert2';
import { SalsesOrdersService } from '../../orders/services/salses-orders.service';
import { ChannelProductsService } from '../../inventory/services/channel-products.service';
import { CreateProductService } from '../../inventory/services/create-product.service';
import { AllMenuTabs } from 'src/app/_models/Tabs';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
declare var $: any;

@Component({
  selector: 'app-listed-products',
  templateUrl: './listed-products.component.html',
  styleUrls: ['./listed-products.component.css']
})


// interface templateDetails {
//   id: number;
//   templateName: string;
// }
export class ListedProductsComponent implements OnInit {
  // public templatedetails: templateDetails[];
  listing = true;
  editChannel = false;
  selectedChannel: string;
  channelProduct: any;
  productImages: any;
  channelId: any;
  templates: any;
  selectedProduct: any;
  constructor(private appTrackingService:AppTrackingService,private createProductService:CreateProductService,
    private channelproductService: ChannelProductsService,
    private toasterService: ToasterService,
    private salsesOrdersService: SalsesOrdersService,
    private datasharingService: DatasharingService,
    private listedService: ListedProductsService) {
      let ip:usertrackInput={menu:TrackMenus.LISTINGS,submenu:subMenus.LISTEDPRODUCTS,page:pages.LISTEDPRODUCTSPAGE,function:"",descrption:"Listed products page loaded"};
    this.appTrackingService.trackUserActivity(ip);
     }

  ngOnInit(): void {
    this.getProducts();
    this.getChannelRegistration();
  }
  pageSize = environment.defaultPaginationValue;
  total = environment.defaultTotalValue;
  collectionsize = 0;
  allProducts: any[] = [];
  status_values: any[] = [];
  // templates: any[] = [];
  selectedFilter: any;

  allSelectedProducts: any[] = [];
  finalselectedOrders: any[] = [];
  searchValue: any = '';
  searchChannel: any = 'all';
  searchName: any = '0';
  searchName1: any = '0';
  searchValue2: any = '';
  fbaProductId: any = '000';
  downloadNonEmptyProductsId: boolean = false;
  sortvalue: any = '0';
  productTitle: string = '';
  productIsSelected: boolean = false;
  productIsSelectedd: boolean = false;
  page: number = 0;
  loading: boolean = false;
  variations;
  disVariation;
  status: any = "";
  templateName: any = "";
  ids: any= [];
  selectedvalue: string = '';

  channelType: any = 'all';
  fliter: any = '0';

  channels: any = [];
  auditTrack(type:any){
    let ip:usertrackInput;
    if(type==1)
    ip={menu:TrackMenus.LISTINGS,submenu:subMenus.LISTEDPRODUCTS,page:pages.LISTEDPRODUCTSPAGE,function:"",descrption:"Apply filter button is clicked"};
    if(type==2)
    ip={menu:TrackMenus.LISTINGS,submenu:subMenus.LISTEDPRODUCTS,page:pages.LISTEDPRODUCTSPAGE,function:"",descrption:"Reset button is clicked"};
    if(type==3)
    ip={menu:TrackMenus.LISTINGS,submenu:subMenus.LISTEDPRODUCTS,page:pages.LISTEDPRODUCTSPAGE,function:"",descrption:"Update to Channel button is clicked"};
    if(type==4)
    ip={menu:TrackMenus.LISTINGS,submenu:subMenus.LISTEDPRODUCTS,page:pages.LISTEDPRODUCTSPAGE,function:"",descrption:"Bulk Revise Prices button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }
  modalclosed() {
    $('#search-modal').modal('hide');
  }
  changespage(page: any) {
    this.getProducts();
  }

  updateView(item:any){
    //console.log(item)

    this.loading = true;
    this.createProductService.editChannelProduct(item.id).subscribe((res: any) => {
      // console.log(res)
      this.selectedProduct = res;
      this.channelProduct = res?.channelproduct;
      this.productImages = res?.productimages;
      this.templates = res?.templates;
      this.channels = res?.id;
      this.editChannel = true;
      this.channelId = res?.id;
      this.selectedChannel = item.channel;

      this.loading = false;
    })

  }

  closeEditProduct(){
    this.channelProduct = null;
    this.productImages = null;
    this.channelId = null;
    this.editChannel = false;
    this.selectedChannel = null;
}

  getProducts() {
    this.loading = true;
    this.listedService.getListedproduct(this.page, this.pageSize, this.collectionsize, this.searchName, this.searchValue, this.searchChannel, this.fbaProductId, false, this.fliter).subscribe((res: any) => {
      ////console.log(res);
      this.allProducts = res?.products;
      this.collectionsize = res?.page?.totalResults;
      // this.page = res?.page?.currentPageNumber;
      this.loading = false;

      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      this.loading = false;
    }, eoor => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };

  isAllChecked: boolean = true;

  selectall(event: any) {
    // debugger;
    ////console.log("selectall", event.target.value);
    this.isAllChecked = !this.isAllChecked;
    this.allProducts.map((i: any) => i.selected = this.isAllChecked);
    ////console.log(this.allProducts);
    let selectedItems = this.allProducts.filter(sale => sale.selected == true);
    this.selectedItemsLength = selectedItems.length;
    if (selectedItems.length > 0) {
      this.productIsSelected = true;
    } else {
      this.productIsSelected = false;
    }
  }

  selectedItemsLength: any;
  individualselection(event: any) {
    // debugger;
    // ////console.log(event.target.value);
    this.allProducts.find(sale => sale.id == event.id).selected = !this.allProducts.find(sale => sale.id == event.id).selected;
    let selectedItems = this.allProducts.filter(sale => sale.selected == true);
    this.selectedItemsLength = selectedItems.length;
    if (selectedItems.length > 0) {
      this.productIsSelected = true;
    } else {
      this.productIsSelected = false;
    }
  }


  // isAllCheckedd: boolean = true;

  // selectalll(event: any) {
  //   debugger;
  //   ////console.log("selectalll", event.target.value);
  //   this.isAllCheckedd = !this.isAllCheckedd;
  //   this.allSelectedProducts.map((i: any) => i.selected = this.isAllCheckedd);
  //   ////console.log(this.allSelectedProducts);
  //   let selectedItemss = this.allSelectedProducts.filter(sale => sale.selected == true);
  //   if (selectedItemss.length > 0) {
  //     this.productIsSelectedd = true;
  //   } else {
  //     this.productIsSelectedd = false;
  //   }
  // }

  individualselections(event: any) {
    // debugger;
    // ////console.log(event.target.value);
    this.allSelectedProducts.find(sale => sale.id == event.id).selected = !this.allSelectedProducts.find(sale => sale.id == event.id).selected;
    let selectedItemss = this.allSelectedProducts.filter(sale => sale.selected == true);
    if (selectedItemss.length > 0) {
      this.productIsSelectedd = true;
    } else {
      this.productIsSelectedd = false;
    }
  }



  openBulkReviseModal() {
    $('#bulik-revise-modal').modal('show');
  }

  closeBulkReviseModal() {
    $('#bulik-revise-modal').modal('hide');
  }

  openBulkReviseQuantityModal() {
    $('#bulik-revisequantity-modal').modal('show');
  }

  closeBulkReviseQuantityModal() {
    $('#bulik-revisequantity-modal').modal('hide');
  }


  openUpdateChannelModal() {
    let selectedOrders = this.allProducts.filter(down => down.selected == true);
    // debugger;
    const ids = selectedOrders.map(ord => ord.id);

    if (ids.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Products', 'Please select one product atleast');
      return;
    }
    else {
      ////console.log(ids);
      this.loading = true;
      const data = {
        "ids": ids
      }
      this.listedService.getlistingtemplate(data).subscribe((res: any) => {
        ////console.log("getlistingtemplate:::",res);
        this.status_values = res?.ebaytemplates == null ? (res?.amazontemplates== null ? res?.templates : res?.amazontemplates) : res?.ebaytemplates;
        this.loading = false;
        // this.finalselectedOrders = selectedOrders;
        this.allSelectedProducts = selectedOrders;
        this.allSelectedProducts.map((i: any) => i.selected = false);
      },
        error => {
          this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
          this.loading = false;
        });
      $('#updatechannel-modal').modal('show');
    }
  }


  selectChangeHandler(event: any) {
    this.selectedvalue = event.target.value;
  }


  onBind($event) {
    let selectedProducts = this.allSelectedProducts.filter(down => down.selected == true);
    // debugger;
    this.ids = selectedProducts.map(ord => ord.id);
    const data = {
      "ids": this.ids
    }

    if (this.ids.length != 0) {
      // ////console.log("finalselectedOrders::",this.finalselectedOrders);
      this.finalselectedOrders = this.allSelectedProducts.filter(down => down.selected == true);
      for (let i = 0; i < this.ids.length; i++) {
        this.finalselectedOrders[i].templateName = this.selectedvalue;
        this.templateName = this.selectedvalue;
      }

      this.listedService.updatetemplate(data).subscribe((res: any) => {
        ////console.log("Apply button::", res);
      },
        error => {
          ////console.log("Apply button error::");
          this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
          this.loading = false;
        });
      this.allSelectedProducts.concat(this.finalselectedOrders);
    }
    else {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Products', 'Please select one product atleast');
      return;
    }
  }

  onNext($event) {
    // debugger;
    const data = {
      "ids": this.ids
    }

    if (this.ids.length != 0) {
      this.listedService.updateChanneltemplate(data).subscribe((res: any) => {
        ////console.log("Next button::", res);
      },
        error => {
          ////console.log("Next button error::");
          this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
          this.loading = false;
        });
      this.allSelectedProducts.concat(this.finalselectedOrders);
    }
    else {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Products', 'Please select one product atleast');
      return;
    }
    $('#updatechannel-modal').modal('hide');
  }

  closeUpdateChannelModal() {
    // this.templateName = "";
    $('#updatechannel-modal').modal('hide');
  }


  getChannelRegistration() {
    this.salsesOrdersService.getChannelRegistration().subscribe(res => {
      // ////console.log(res);
      this.channels = res;
    },error => {
      this.loading = false;
    })
  }
  refresh(){
    this.getProducts();
  }
  reset(){
    this.fliter = '0';
    this.searchName = '0';
    this.searchValue = '';
    this.searchChannel = 'all';
    this.getProducts();
  }



  editedProductDetails: any;
  editChannelProduct(editedProductDetails: any) {
    this.loading = true;
    $('#editqty-modal-listing').modal('show');
    this.editedProductDetails = editedProductDetails;
    this.loading = false;
    //console.log(editedProductDetails);
    this.channelDet = undefined;
    this.getChannelEditDetails(editedProductDetails?.sku);
  }

  channelDet: any;
  getChannelEditDetails(sku: any) {
    this.loading=true;
    this.channelproductService.getChannelproducts_Single(sku).subscribe((res:any) => {
      //console.log(res);
      this.channelDet = res;
      this.toasterService.openToastMessage(ToastTypes.warning, 'Listed Products', res.data);
      this.channelDet?.child?.map(chi=>{
        chi.variationSelected=true;
      });
      this.loading=false;
    })
  }

  closeChannelProductModal() {
    $('#editqty-modal-listing').modal('hide');
  }

  getImage(img: string) {
    return 'https://s3-us-west-1.amazonaws.com/khubweb/web/kartzhub' + img + '.png';
  }
  updateqtylistingskuinput: any[]=[];
  updateqtylistingqtyinput: any[]=[];
  variationsku: any[]=[];
  variationqty: any[]=[];
  variationqtyselected: any[]=[];
  relistClosedItems: boolean = true;
  listfullQuantity: boolean = true;
  changeRelist() {
    this.relistClosedItems = !this.relistClosedItems;
  }
  changListFull() {
    this.listfullQuantity = !this.listfullQuantity;
  }
  changVariationStatus(chaild:any){
    chaild.variationSelected=!chaild.variationSelected;
  }
  updateProductQty() {
    this.loading=true;
    this.updateqtylistingskuinput=[];
    this.updateqtylistingqtyinput=[];
    this.variationsku=[];
    this.variationqty=[];
    this.variationqtyselected=[];
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
      this.loading=false;
      this.toasterService.openToastMessage(ToastTypes.success, 'Listed Products', 'Price Details Updated');
      this.getProducts();
      this.closeChannelProductModal();
    });

  }

  bulkRevisePriceType = 'pricebynumber';
  bulkRevisePrice = 0;
  updateBulkRevisePrice(action = 'increase') {
    let selectedOrders = this.allProducts.filter(down => down.selected == true);
    // debugger;
    const ids = selectedOrders.map(ord => ord.id);

    if (ids.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Products', 'Please select one product atleast');
      return;
    }
    this.channelproductService.updateBulkRevisePrice(ids, action, this.bulkRevisePrice, this.bulkRevisePriceType, ids.length, '100').subscribe((res: any) => {

      this.toasterService.openToastMessage(ToastTypes.success, 'Currency Convertor', 'Prices will be updated for the given channel. Please check the status via');
      this.closeBulkReviseModal();
      // this.get();
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Currency Convertor', 'Error');
    });
  }

  editproduct(prod: any) {
    this.datasharingService.changeEditProductDetails({product:prod, isChannelProduct: true});
    let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.edit_product };
    this.datasharingService.addtoTab(menu);
  }


  updateproduct(item){

    let ids = [item.id];
    let body = { "ids": ids }
    this.channelproductService.listNow(body).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Channel Products', 'Started listing/updating items to the selected channels. Please allow up to 1 hour for the update');
      this.getProducts();
    }, error => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Channel Products', 'Started listing/updating items to the selected channels. Please allow up to 1 hour for the update');
      this.getProducts();
    });
  }
  removeKartzhubproduct(prod){
   // https://pre.sellershub.io:8080/channels/removechannelproductOnly?unique=1645014840168&id=123
   this.channelproductService.removeChannelProductOnly(prod.id).subscribe(res => {
    this.toasterService.openToastMessage(ToastTypes.success, 'Channel Products', 'Channel product removed');
    this.getProducts();
  }, error => {
    this.toasterService.openToastMessage(ToastTypes.error, 'Channel Products', 'Error while remove channel product');
    this.getProducts();
  });
  }
}
