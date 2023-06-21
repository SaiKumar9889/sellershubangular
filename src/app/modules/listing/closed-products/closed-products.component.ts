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
import { ChannelProductsService } from '../../inventory/services/channel-products.service';
import { CreateProductService } from '../../inventory/services/create-product.service';
import { SalsesOrdersService } from '../../orders/services/salses-orders.service';
import { ClosedProductsService } from '../services/closed-products.service';
import { ListingErrorsService } from '../services/listing-errors.service';
declare var $: any;

@Component({
  selector: 'app-closed-products',
  templateUrl: './closed-products.component.html',
  styleUrls: ['./closed-products.component.css']
})
export class ClosedProductsComponent implements OnInit {
  channelProduct: any;
  productImages: any;
  channels: any;
  editChannel: boolean;
  selectedChannel: any;
  channelId: any;
  constructor(private appTrackingService:AppTrackingService, private toasterService: ToasterService, private productService: ListingErrorsService,
    private createProductService:CreateProductService, private datasharingService: DatasharingService,
    private channelproductService: ChannelProductsService, private closedService: ClosedProductsService,private salsesOrdersService: SalsesOrdersService ) {
      let ip:usertrackInput={menu:TrackMenus.LISTINGS,submenu:subMenus.CLOSEDPRODUCTS,page:pages.CLOSEDPRODUCTSPAGE,function:"",descrption:"Closed products page loaded"};
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
  searchValue: any = '';
  searchChannel: any = 'all';
  searchName: any = '0';
  productTitle:string='';
  productIsSelected: boolean = false;
  page:number=0;
  loading:boolean=false;
  variations;
  disVariation;

  auditTrack(type:any){
    let ip:usertrackInput;
    if(type==1)
    ip={menu:TrackMenus.LISTINGS,submenu:subMenus.CLOSEDPRODUCTS,page:pages.CLOSEDPRODUCTSPAGE,function:"",descrption:"Search button is clicked"};
    if(type==2)
    ip={menu:TrackMenus.LISTINGS,submenu:subMenus.CLOSEDPRODUCTS,page:pages.CLOSEDPRODUCTSPAGE,function:"",descrption:"Apply filter button is clicked"};
    if(type==3)
    ip={menu:TrackMenus.LISTINGS,submenu:subMenus.CLOSEDPRODUCTS,page:pages.CLOSEDPRODUCTSPAGE,function:"",descrption:"Reset button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }
  modalclosed() {
    $('#search-modal').modal('hide');
  }
  changespage(page: any) {
    this.getProducts();
  }
  reset(){
    this.searchName = '0';
    this.searchValue = '';
    this.getProducts();
  }

  getChannelRegistration() {
    this.salsesOrdersService.getChannelRegistration().subscribe(res => {
      // ////console.log(res);
      this.channels = res;
    },error => {
      this.loading = false;
    })
  }


  getProducts() {
    this.loading=true;
    this.closedService.getClosedproduct(this.page,this.pageSize,this.total,this.searchName,this.searchValue,this.searchChannel).subscribe((res: any) => {
      ////console.log(res);
      this.allProducts = res?.productsList;
      this.collectionsize = res?.page?.totalResults;
      this.page = res?.page?.currentPageNumber;
      this.loading = false;
      if(this.allProducts.length>0)
      this.productTitle= this.allProducts[0].title;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      this.loading=false;
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };

  isAllChecked: boolean = false;

  selectall(event: any) {
    ////console.log("selectall", event.target.value);
    this.isAllChecked = !this.isAllChecked;
    this.allProducts.map((i: any) => i.selected = this.isAllChecked);
    ////console.log(this.allProducts);
    let selectedItems = this.allProducts.filter(sale => sale.selected == true);
    if (selectedItems.length > 0) {
      this.productIsSelected = true;
    } else {
      this.productIsSelected = false;
    }
  }

  individualselection(event: any) {
    // ////console.log(event.target.value);
    this.allProducts.find(sale => sale.id == event.id).selected = !this.allProducts.find(sale => sale.id == event.id).selected;
    let selectedItems = this.allProducts.filter(sale => sale.selected == true);
    if (selectedItems.length > 0) {
      this.productIsSelected = true;
    } else {
      this.productIsSelected = false;
    }
  }
  // modalclosed() {
  //   $('#search-modal').modal('hide');
  // }
//Action Implimentation
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
closeBulkReviseQuantityModal() {
  $('#bulik-revisequantity-modal').modal('hide');
}
closeChannelProductModal() {
  $('#editqty-modal-listing').modal('hide');
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
    //console.log(res)
    this.channelProduct = res?.channelproduct;
    this.productImages = res?.productimages;
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
    this.channels = null;
    this.editChannel = false;
    this.selectedChannel = null;
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
