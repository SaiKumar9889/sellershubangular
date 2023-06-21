import { Component, OnInit, ViewChild } from '@angular/core';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { ToastTypes } from 'src/app/_models/_toaster';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { SalsesOrdersService } from '../../orders/services/salses-orders.service';
import { CustomersService } from '../services/customers.service';
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { AllMenuTabs } from 'src/app/_models/Tabs';
import { DatasharingService } from 'src/app/_service/datasharing.service';
declare var $: any;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  constructor(private appTrackingService: AppTrackingService, private toasterService: ToasterService, private customerService: CustomersService,private salsesOrdersService: SalsesOrdersService, private datasharingService: DatasharingService) {
    let ip: usertrackInput = { menu: TrackMenus.CUSTOMERS, submenu: subMenus.OTHERS, page: pages.CUSTOMERSPAGE, function: "", descrption: "Customers page loaded" };
    this.appTrackingService.trackUserActivity(ip);
  }
  @ViewChild(CdkVirtualScrollViewport, { static: false })
  public viewPort: CdkVirtualScrollViewport;
  ngOnInit(): void {
    this.isEdit = false ;
    this.getCustomer();
  }
  allSales: any[] = [];
  pageSize = environment.defaultPaginationValue;
  total = environment.defaultTotalValue;
  collectionsize = 0;
  allCust: any[] = [];
  productIsSelected: boolean = false;
  page: number = 0;
  loading: boolean = false;
  variations;
  disVariation;
  view = 0;
  isAllCheckedDown: boolean = false;
  orederIsSelected: boolean = false;
  searchName: string = '';
  isEdit: boolean = false;
  modalclosed() {
    $('#search-modal').modal('hide');
  }
  changespage(page: any) {
if(this.isEdit == false){
    this.getCustomer(page);
}else{
  this.findSearchName()
}
  }
  reset(){
    this.isEdit = false ;
    this.searchName = '';
    this.getCustomer();
  }
  loadTablePagenation() {
    $(function () {
      // $('#printabletable').DataTable();
      $('#printabletable').DataTable({
        responsive: true,
        pagingType: "simple_numbers",
        pageLength: 10,
        lengthChange: true,
        dom: 'Bfrtip',
        buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        columnDefs: [
          {
            "targets": 2, // your case first column
            "className": "text-center"
          },
          {
            "targets": 3, // your case first column
            "className": "text-center"
          },
          {
            "targets": 4, // your case first column
            "className": "text-center"
          }
        ]
      });
      $('.buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel').addClass('btn btn-primary mr-1');
    });
  }
  findSearchName(){
    this.loading = true;
    this.isEdit = true ;
    this.customerService.findSearchName(this.page, this.pageSize,this.collectionsize,this.searchName).subscribe((res: any) => {
      // console.log(res);
      this.allCust = res?.customers;
      this.collectionsize = res?.page?.totalResults;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  getCustomer(pageno = 1) {
    this.loading = true;
    let obj ={
      pageno :pageno,
	    total: this.collectionsize,
	    pagesize: this.pageSize
    }
    // $('#printabletable').DataTable().destroy();
    this.customerService.getCustomers(obj).subscribe((res: any) => {
      ////console.log(res);
      this.allCust = res?.customers;
      this.collectionsize = res?.page?.totalResults;
      this.page = res?.page?.currentPageNumber;
      this.loading = false;
      if (this.allCust.length > 0)
        // this.productTitle= this.allCust[0].title;
        this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait..');
      this.loading = false;
      // this.loadTablePagenation();
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
      this.loading = false;
    });
  };

  // modalclosed() {
  //   $('#search-modal').modal('hide');
  // }
  selectedCustomer:any;
  editCustomer(cust){
    this.selectedCustomer = JSON.parse(JSON.stringify(cust));
    this.view = 1;
  }
  isAllChecked: boolean = false;
  selectall(event: any) {
    ////console.log("selectall", event.target.value);
    this.isAllChecked = !this.isAllChecked;
    this.allSales.map((i: any) => {
        i.selected = this.isAllChecked
    }
    );
    ////console.log(this.allSales);
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    this.selectedItemsLength = selectedItems.length;
    if (selectedItems.length > 0) {
      this.orederIsSelected = true;
    } else {
      this.orederIsSelected = false;
    }
  }
  orederIsSelectedForEdit = false;
  selectedItemsLength: any;
  individualselection(event: any, event1:any) {
    // if(event1.target.checked){
    //   event.selected = true;
    // } else {
    //   event.selected = false;
    // }
   // this.allSales.find(sale => sale.id == event.id).selected = !this.allSales.find(sale => sale.id == event.id).selected;
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    this.selectedItemsLength = selectedItems.length;
    if (selectedItems.length == 1) {
      this.orederIsSelectedForEdit = true;
    } else {
      this.orederIsSelectedForEdit = false;
    }
    if (selectedItems.length > 0) {
      this.orederIsSelected = true;
    } else {
      this.orederIsSelected = false;
    }
    if(selectedItems.length == this.allSales.length){
      this.isAllChecked= true;
    } else {
      this.isAllChecked= false;
    }
  }
  filterBy: any = [];
  selectedFilter: any = [];selectedChannel: any = [];
  channelType: any = [];
  searchname: any = '9';
  searchValue2: any = '';
  fliter: any = '0';
  collectionSize = environment.defaultTotalValue;
  fetchCustomerOrders(cust){
    this.selectedCustomer = JSON.parse(JSON.stringify(cust));
    this.isAllCheckedDown = false;
    this.searchValue2 = cust.email;
    this.loading = true;
    this.orederIsSelected = false;
    this.selectedItemsLength = 0;
    this.allSales.map((i: any) => i.selected = false);
    // this.selectedFilter = this.tab == 'error_labels'?["12-4"]:["11-3","13-4"];
    this.filterBy.forEach(sale => this.selectedFilter.push(sale.id));
    this.selectedChannel = [];
    this.channelType.forEach(sale => this.selectedChannel.push(sale.id));
    this.salsesOrdersService.getSalesOrders(1, this.collectionSize ? this.collectionSize : 0, this.pageSize, this.selectedChannel, this.selectedFilter, '9', this.searchValue2, '000', null, true, this.fliter, '000',0).subscribe((sales_orders: any) => {
      // ////console.log(sales_orders);
      this.allSales = sales_orders?.sales || [];
      // let groupByOrders = this.allSales.reduce(function (r, a) {
      //   r[a.channelOrderId] = r[a.channelOrderId] || [];
      //   r[a.channelOrderId].push(a);
      //   return r;
      // }, Object.create(null));

      // for (let [key, value] of Object.entries(groupByOrders)) {
      //   console.log(key, value);
      //   this.allSalesV2.push(value);
      // }

      this.allSales.map((i: any) => i.selected = false);
      // this.page = sales_orders?.page?.currentPageNumber;
      this.collectionSize = sales_orders?.page?.totalResults;
      this.loading = false;
      // ////console.log(this.allSales);
    }, error => {
      this.loading = false;
    });
    this.view = 2;
  }
  getImage(img: string) {
    return 'https://s3-us-west-1.amazonaws.com/khubweb/web/kartzhub' + img + '.png';
  }
  getSiteImage(img: string) {
    return 'https://s3-us-west-1.amazonaws.com/khubweb/web/' + img + '.png';
  }
  viewOrderTab(sales) {
    let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.view_order };
    this.datasharingService.addtoTab(menu);
    let selectedItems = this.allSales.filter(sale => sale.orderId == sales.orderId);
    this.datasharingService.changeActiveOrder(selectedItems);
  }
  saveOrUpdateUser(){
    this.customerService.saveCustomers(this.selectedCustomer).subscribe((res: any) => {
        this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Saved successfully');
        this.getCustomer();
      this.loading = false;
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
      this.loading = false;
    });
  }
  resetView(){
    this.selectedCustomer = null;
    this.fliter = '0';
    this.channelType = [];
    this.filterBy = [];
    this.searchname = '5';
    this.searchValue2 = '';
    this.view = 0;
  }


}
