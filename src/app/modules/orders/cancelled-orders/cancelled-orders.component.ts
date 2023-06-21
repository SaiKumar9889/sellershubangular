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
import { CancelledOrdersService } from '../services/cancelled-orders.service';

@Component({
  selector: 'app-cancelled-orders',
  templateUrl: './cancelled-orders.component.html',
  styleUrls: ['./cancelled-orders.component.css']
})
export class CancelledOrdersComponent implements OnInit {
  constructor(private appTrackingService:AppTrackingService, private toasterService: ToasterService, private cancelService: CancelledOrdersService,
    public datasharingService: DatasharingService ) { 
      let ip:usertrackInput={menu:TrackMenus.ORDERS,submenu:subMenus.CANCELLEDORDERS,page:pages.CANCELLEDORDERSPAGE,function:"",descrption:"Cancelled orders page loaded"};
      this.appTrackingService.trackUserActivity(ip);
    }

  ngOnInit(): void {
    this.getOrders();
  }
  pageSize = environment.defaultPaginationValue;
  total = environment.defaultTotalValue;
  collectionsize = environment.defaultTotalValue;
  allOrders: any[] = [];
  searchValue: any = '';
  searchBy: any = 0;
  searchFrom: any = '';
  searchTo: any = '';
  toCenterid = '';
  toChannelsale = '';
  productTitle:string='';
  productIsSelected: boolean = false;
  page:number=1;
  loading:boolean=false;

  // modalclosed() {
  //   $('#search-modal').modal('hide');
  // }
  changespage(page: any) {
    this.getOrders();
  }

  getOrders() {
    this.loading=true;
    this.cancelService.getCancelledOrders(this.page,this.collectionsize,this.pageSize,this.searchBy,this.searchValue,'all','000').subscribe((res: any) => {
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
    let ip:usertrackInput={menu:TrackMenus.ORDERS,submenu:subMenus.CANCELLEDORDERS,page:pages.CANCELLEDORDERSPAGE,function:"",descrption:"Search button is clicked"};
      this.appTrackingService.trackUserActivity(ip);
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
  // modalclosed() {
  //   $('#search-modal').modal('hide');
  // }
  getImage(img:string){
    return 'https://s3-us-west-1.amazonaws.com/khubweb/web/kartzhub'+img+'.png';
  }

  getSiteImage(img: string) {
    return 'https://s3-us-west-1.amazonaws.com/khubweb/web/' + img + '.png';
  }
  reset() {
    this.searchBy = '0';
    this.searchValue= '';
    this.getOrders();
    let ip:usertrackInput={menu:TrackMenus.ORDERS,submenu:subMenus.CANCELLEDORDERS,page:pages.CANCELLEDORDERSPAGE,function:"",descrption:"Reset button is clicked"};
      this.appTrackingService.trackUserActivity(ip);
  }

  viewOrderTab(order) {
    let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.view_order };
    this.datasharingService.addtoTab(menu);
    // let selectedItems = this.allOrders.filter(sale => sale.selected == true);
    this.datasharingService.changeActiveOrder(this.allOrders);
    let ip:usertrackInput={menu:TrackMenus.ORDERS,submenu:subMenus.CANCELLEDORDERS,page:pages.CANCELLEDORDERSPAGE,function:"",descrption:"View orders button is clicked"};
      this.appTrackingService.trackUserActivity(ip);
  }
}
