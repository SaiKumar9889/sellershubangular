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
import { DownloadcsvService } from 'src/app/_service/downloadcsv.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { SalsesOrdersService } from '../services/salses-orders.service';
import { ShippedOrdersService } from '../services/shipped-orders.service';
declare var $: any;
@Component({
  selector: 'app-shipped-orders',
  templateUrl: './shipped-orders.component.html',
  styleUrls: ['./shipped-orders.component.css']
})
export class ShippedOrdersComponent implements OnInit {
  constructor(private appTrackingService:AppTrackingService,private datasharingService:DatasharingService, private salsesOrdersService: SalsesOrdersService,
    private downloadService:DownloadcsvService,private datePipe: DatePipe, private toasterService: ToasterService, private shippedService: ShippedOrdersService) {
      let ip:usertrackInput={menu:TrackMenus.ORDERS,submenu:subMenus.SHIPPEDORDERS,page:pages.SHIPPEDORDERSPAGE,function:"",descrption:"Shipped orders page loaded"};
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
  productTitle: string = '';
  searchname = 0;
  searchvalue = '';
  searchValue: any = '';
  searchBy: any = 0;
  searchFrom: any = '';
  searchTo: any = '';
  channelId = 'all';
  shippingMethod = '000';
  startDate = '';
  endDate = '';
  dateOrder = 'desc';
  productIsSelected: boolean = false;
  page: number = 0;
  loading: boolean = false;

  // modalclosed() {
  //   $('#search-modal').modal('hide');
  // }
  auditTrack(type:any){
    let ip:usertrackInput;
    if(type==1)
    ip={menu:TrackMenus.ORDERS,submenu:subMenus.SHIPPEDORDERS,page:pages.SHIPPEDORDERSPAGE,function:"",descrption:"Search button is clicked"};
    if(type==2)
    ip={menu:TrackMenus.ORDERS,submenu:subMenus.SHIPPEDORDERS,page:pages.SHIPPEDORDERSPAGE,function:"",descrption:"Apply filter button is clicked"};
    if(type==3)
    ip={menu:TrackMenus.ORDERS,submenu:subMenus.SHIPPEDORDERS,page:pages.SHIPPEDORDERSPAGE,function:"",descrption:"Reset button is clicked"};
    if(type==4)
    ip={menu:TrackMenus.ORDERS,submenu:subMenus.SHIPPEDORDERS,page:pages.SHIPPEDORDERSPAGE,function:"",descrption:"View order button is clicked"};
    if(type==5)
    ip={menu:TrackMenus.ORDERS,submenu:subMenus.SHIPPEDORDERS,page:pages.SHIPPEDORDERSPAGE,function:"",descrption:"View order button is clicked"};
    if(type==6)
    ip={menu:TrackMenus.ORDERS,submenu:subMenus.SHIPPEDORDERS,page:pages.SHIPPEDORDERSPAGE,function:"",descrption:"Resend button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }

  selectedFormDate(date: any) {
    this.searchFrom = date.year + '/' + date.month + '/' + date.day;
  }
  selectedToDate(date: any) {
    this.searchTo = date.year + '/' + date.month + '/' + date.day;
  }
  changespage(page: any) {
    this.getOrders();
  }
  downloadorders(){
    this.downloadService.downloadCSVFile(this.allOrders);
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
    this.loading = true;
    this.shippedService.getShippedOrdersSearch(this.page, this.collectionsize, this.pageSize, this.searchname, this.searchvalue, this.channelId, this.shippingMethod, this.startDate, this.endDate, this.dateOrder).subscribe((res: any) => {
      ////console.log(res);
      this.allOrders = res?.sales || [];
      this.collectionsize = res?.page?.totalResults;
      // //this.pageSize = res?.page?.entriesPerPage;
      if (this.allOrders.length > 0)
        this.productTitle = this.allOrders[0].title;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      this.allOrders.map(orders => orders.isExpired = this.checkOrderDate(orders.purchaseDate))
      this.loading = false;
    }, eoor => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };
  download() {

  }
  reset() {
    this.searchname = 0;
    this.searchvalue= '';
    this.channelId = 'all';
    this.getOrders();
  }
  isDescEnables: boolean = false;
  toggleDesc() {
    this.isDescEnables = !this.isDescEnables;
  }

  viewOrderTab(order) {
    let sorder=[order];
      let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.view_order };
      this.datasharingService.addtoTab(menu);
      // let selectedItems = this.allOrders.filter(sale => sale.selected == true);
      this.datasharingService.changeActiveOrder(sorder);
  }

  viewOrderTabv2(order){
    Swal.fire({
      title: '<span style="font-size:15px">Encrypted Order ( PII Privacy Policy ) : '+order.id+'</span>',
      html: "<span  style='font-size:12px'>This orders personal identifiable information has been encrypted in line with PII Privacy Policy. If You agree to decrypt and view the order details, it will be available for 24 hrs from now.\n"+
      "For more information on Usage Policy & PII access, please click here.\n"+
      "Would you like to view the details of this order \n?</span>",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Agree!',
      cancelButtonText: 'Dis Agree!'
    }).then(async (result) => {
      ////console.log(result);
      if (result?.value) {
        this.viewOrderTab(order);
        // Swal.fire(
        //   'Marketplace is integrated!',
        //   'Amazon integration done.',
        //   'success'
        // )
      }
    });
  }

  // isAllChecked: boolean = false;

  // selectall(event: any) {
  //   ////console.log("selectall", event.target.value);
  //   this.isAllChecked = !this.isAllChecked;
  //   this.allOrders.map((i: any) => i.selected = this.isAllChecked);
  //   ////console.log(this.allOrders);
  //   let selectedItems = this.allOrders.filter(sale => sale.selected == true);
  //   if (selectedItems.length > 0) {
  //     this.productIsSelected = true;
  //   } else {
  //     this.productIsSelected = false;
  //   }
  // }

  // individualselection(event: any) {
  //   // ////console.log(event.target.value);
  //   this.allOrders.find(sale => sale.id == event.id).selected = !this.allOrders.find(sale => sale.id == event.id).selected;
  //   let selectedItems = this.allOrders.filter(sale => sale.selected == true);
  //   if (selectedItems.length > 0) {
  //     this.productIsSelected = true;
  //   } else {
  //     this.productIsSelected = false;
  //   }
  // }
  // modalclosed() {
  //   $('#search-modal').modal('hide');
  // }

  openModal(order:any) {
  
  }
  gotoView(order:any) {
    let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.view_order };
    this.datasharingService.addtoTab(menu);
    let selectedItems = [order];
    this.datasharingService.changeActiveOrder(selectedItems);
  }

  checkOrderDate(purchaseDate1: any) {
    let currentDate = new Date();
    let purchaseDate = new Date(purchaseDate1);
    // ////console.log(currentDate);
    // ////console.log(order.purchaseDate);
    // ////console.log(purchaseDate);
    // ////console.log(this.datePipe.transform(order.purchaseDate));
    let Difference_In_Time = currentDate.getTime() - purchaseDate.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    // ////console.log(Difference_In_Days);
    if (Difference_In_Days > 30) {
      return true;
    } else {
      return false;
    }
  }
  getImage(img:string){
    return 'https://s3-us-west-1.amazonaws.com/khubweb/web/kartzhub'+img+'.png';
  }
  createDuplicateOrderTab(order:any) {
    this.datasharingService.changeDuplicateOrderDetails(order);
    let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.duplicateOrder };
    this.datasharingService.addtoTab(menu); 
  }

}


