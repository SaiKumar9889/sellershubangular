import { Component, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { ManageReturnService } from '../services/manage-return.service';
import { PDFDocument } from 'pdf-lib';
import { SalsesOrdersService } from '../services/salses-orders.service';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { AllMenuTabs } from 'src/app/_models/Tabs';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';

@Component({
  selector: 'app-return-orders',
  templateUrl: './return-orders.component.html',
  styleUrls: ['./return-orders.component.css']
})
export class ReturnOrdersComponent implements OnInit {

  constructor(private appTrackingService:AppTrackingService, private toasterService: ToasterService, private returnService: ManageReturnService, private salsesOrdersService: SalsesOrdersService
    ,public datasharingService:DatasharingService ) {
      let ip:usertrackInput={menu:TrackMenus.ORDERS,submenu:subMenus.RETURNEDORDERS,page:pages.RETURNEDORDERSPAGE,function:"",descrption:"Return orders page loaded"};
    this.appTrackingService.trackUserActivity(ip);
     }

  ngOnInit(): void {
    this.getOrders();
    this.getChannelRegistration();
  }
  pageSize = environment.defaultPaginationValue;
  total = environment.defaultTotalValue;
  collectionsize = 0;
  allOrders: any[] = [];
  productTitle:string='';
  searchName = '0';
  searchValue = '';
  channel = 'all';
  shippingMethod = '000'
  productIsSelected: boolean = false;
  page:number=0;
  loading:boolean=false;

  // modalclosed() {
  //   $('#search-modal').modal('hide');
  // }
  auditTrack(type:any){
    let ip:usertrackInput;
    if(type==1)
    ip={menu:TrackMenus.ORDERS,submenu:subMenus.RETURNEDORDERS,page:pages.RETURNEDORDERSPAGE,function:"",descrption:"View order button is clicked"};
    if(type==2)
    ip={menu:TrackMenus.ORDERS,submenu:subMenus.RETURNEDORDERS,page:pages.RETURNEDORDERSPAGE,function:"",descrption:"Reset button is clicked"};
    if(type==3)
    ip={menu:TrackMenus.ORDERS,submenu:subMenus.RETURNEDORDERS,page:pages.RETURNEDORDERSPAGE,function:"",descrption:"Apply filter button is clicked"};
    if(type==4)
    ip={menu:TrackMenus.ORDERS,submenu:subMenus.RETURNEDORDERS,page:pages.RETURNEDORDERSPAGE,function:"",descrption:"Search button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }
  
  changespage(page: any) {
    this.getOrders();
  }
  channels: any = [];
  getChannelRegistration() {
    this.salsesOrdersService.getChannelRegistration().subscribe(res => {
      // ////console.log(res);
      this.channels = res;
    }, error => {
      this.loading = false;
    })
  }

  getOrders() {
    this.loading=true;
    this.returnService.getReturnedOrderspara(this.page,this.collectionsize,this.pageSize,this.searchName,this.searchValue,this.channel,this.shippingMethod).subscribe((res: any) => {
      ////console.log(res);
      this.allOrders = res?.sales;
      this.collectionsize = res?.page?.totalResults;
       //this.pageSize = res?.page?.entriesPerPage;
      if(this.allOrders?.length>0)
      this.productTitle= this.allOrders[0].title;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      this.loading=false;
    }, error => {
      this.loading=false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };

  isAllChecked: boolean = false;

  selectall(event: any) {
    ////console.log("selectall", event.target.value);
    this.isAllChecked = !this.isAllChecked;
    this.allOrders.map((i: any) => i.selected = this.isAllChecked);
    ////console.log(this.allOrders);
    let selectedItems = this.allOrders.filter(sale => sale.selected == true);
    if (selectedItems.length > 0) {
      this.productIsSelected = true;
    } else {
      this.productIsSelected = false;
    }
  }

  individualselection(event: any) {
    // ////console.log(event.target.value);
    this.allOrders.find(sale => sale.id == event.id).selected = !this.allOrders.find(sale => sale.id == event.id).selected;
    let selectedItems = this.allOrders.filter(sale => sale.selected == true);
    if (selectedItems.length > 0) {
      this.productIsSelected = true;
    } else {
      this.productIsSelected = false;
    }
  }
  getImage(img:string){
    return 'https://s3-us-west-1.amazonaws.com/khubweb/web/kartzhub'+img+'.png';
  }

  reset() {
    this.searchName = '0';
    this.searchValue= '';
    this.channel = 'all';
    this.getOrders();
  }

  viewOrderTab(order) {
    let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.view_order };
    this.datasharingService.addtoTab(menu);
    // let selectedItems = this.allOrders.filter(sale => sale.selected == true);
    this.datasharingService.changeActiveOrder(this.allOrders);
  }


}
