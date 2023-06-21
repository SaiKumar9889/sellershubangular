import { Component, OnInit } from '@angular/core';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { ToastTypes } from 'src/app/_models/_toaster';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { McfOrdersService } from '../services/mcf-orders.service';
import { SalsesOrdersService } from '../services/salses-orders.service';

@Component({
  selector: 'app-mcf-orders',
  templateUrl: './mcf-orders.component.html',
  styleUrls: ['./mcf-orders.component.css']
})
export class McfOrdersComponent implements OnInit {
  constructor(private salsesOrdersService: SalsesOrdersService,private appTrackingService:AppTrackingService, private toasterService: ToasterService, private mcfService: McfOrdersService ) {
    let ip:usertrackInput={menu:TrackMenus.ORDERS,submenu:subMenus.MCFORDERS,page:pages.MCFORDERSPAGE,function:"",descrption:"MCF orders page loaded"};
    this.appTrackingService.trackUserActivity(ip);
   }

  ngOnInit(): void {
    this.getOrders();
  }
  pageSize = environment.defaultPaginationValue;
  total = environment.defaultTotalValue;
  collectionsize = 0;
  allOrders: any[] = [];
  searchValue: any = '';
  searchBy: any = 0;
  searchFrom: any = '';
  searchTo: any = '';
  toCenterid = '';
  toChannelsale = '';
  productTitle:string='';
  productIsSelected: boolean = false;
  page:number=0;
  loading:boolean=false;

  // modalclosed() {
  //   $('#search-modal').modal('hide');
  // }
  changespage(page: any) {
    this.getOrders();
  }

  getOrders() {
    this.loading=true;
    this.mcfService.findMcfOrders(this.page, this.total, this.pageSize).subscribe((res: any) => {
      ////console.log(res);
      this.allOrders = res?.sales;
      this.collectionsize = res?.page?.totalResults;
      this.page = res?.page?.currentPageNumber;
      this.loading = false;
      if(this.allOrders?.length>0)
      this.productTitle= this.allOrders[0].title;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      this.loading=false;
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };

  isAllChecked: boolean = true;

  selectall(event: any) {
    ////console.log("selectall", event.target.value);
    this.isAllChecked = !this.isAllChecked;
    this.allOrders.map((i: any) => i.selected = this.isAllChecked);
    ////console.log(this.allOrders);
    let selectedItems = this.allOrders.filter(sale => sale.selected == true);
    this.selectedItemsLength = selectedItems.length;
    if (selectedItems.length > 0) {
      this.productIsSelected = true;
    } else {
      this.productIsSelected = false;
    }
  }
  selectedItemsLength: any;
  individualselection(event: any) {
    // ////console.log(event.target.value);
    this.allOrders.find(sale => sale.id == event.id).selected = !this.allOrders.find(sale => sale.id == event.id).selected;
    let selectedItems = this.allOrders.filter(sale => sale.selected == true);
    this.selectedItemsLength = selectedItems.length;
    if (selectedItems.length > 0) {
      this.productIsSelected = true;
    } else {
      this.productIsSelected = false;
    }
  }
  // modalclosed() {
  //   $('#search-modal').modal('hide');
  // }
  bulkemail() {
    // console.log(this.allOrders);
    this.getEmailInfo();
    this.loading = true;
    let selectedItems = this.allOrders.filter(sale => sale.selected == true);
    let attachLabel = this.bEmailInfo?.defaultsettings?.attachLabel;
    let dontShowPrices = this.bEmailInfo?.defaultsettings?.dontShowPrices;
    let includeOrderConfirmationCallbackUrl = this.bEmailInfo?.defaultsettings?.includeOrderConfirmationCallbackUrl;
    let invoiceOnly = this.bEmailInfo?.defaultsettings?.invoiceOnly;
    if (selectedItems.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'MCF Order', 'Please Select atleast one order');
      return;
    }
    const ids = selectedItems.map(ord => ord.channelOrderId);
    this.salsesOrdersService.sendEmailBulk(ids, attachLabel, dontShowPrices, includeOrderConfirmationCallbackUrl, invoiceOnly).subscribe((res: any) => {
      this.getOrders();
      this.toasterService.openToastMessage(ToastTypes.success, "Sellershub", "Email Sent Successfully");

      this.loading = false;
    }, error => {
      this.getOrders();
      this.toasterService.openToastMessage(ToastTypes.success, "Sellershub", "Email Sent Successfully");

      this.loading = false;
    });
  }
  bEmailInfo: any;
  getEmailInfo() {
    let selectedItems = this.allOrders.filter(sale => sale.selected == true);
    const ids = selectedItems.map(ord => ord.id);
    this.salsesOrdersService.getEmailInfo(ids).subscribe((res: any) => {
      // console.log(res);
      this.bEmailInfo = res;
      // console.log(this.bEmailInfo)
    }, error => {
      this.loading = false;
    });
  }

}
