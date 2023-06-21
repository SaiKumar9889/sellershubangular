import { Component, OnInit } from '@angular/core';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { ToastTypes } from 'src/app/_models/_toaster';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { DownloadcsvService } from 'src/app/_service/downloadcsv.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { OrderHistoryService } from '../services/order-history.service';
declare var $: any;
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  loading: boolean = false;
  allhistory: any[] = [];
  totalOrder = 0;
  totalUnits = 0;
  totalOrderValue = 0;
  numberCustomer = 0;
  page = 0;
  collectionsize = 0;
  pageSize = environment.defaultPaginationValue;
  fromDate: any = '';
  fromToDate: any = '';
  endDate: any = '';
  isclear:boolean=false;
  constructor(private appTrackingService:AppTrackingService,private downloadcsvService: DownloadcsvService,private toasterService: ToasterService, private orderHistoryService: OrderHistoryService) {
    let ip:usertrackInput={menu:TrackMenus.REPORTS,submenu:subMenus.ORDERHISTORY,page:pages.ORDERHISTORYPAGE,function:"",descrption:"Order history page loaded"};
    this.appTrackingService.trackUserActivity(ip);
   }

  ngOnInit(): void {
    this.getDefaultData();
  }

  getDefaultData() {
    $('#printabletable').DataTable().destroy();
    this.loading = true;
    this.orderHistoryService.getReportorderhistory(this.fromDate, this.fromToDate, this.endDate).subscribe((orderHistory: any) => {
      ////console.log(orderHistory);
      this.allhistory = orderHistory?.orderReports || [];
      this.totalOrder = orderHistory['totalorders'];
      this.totalUnits = orderHistory['totalunits'];
      this.totalOrderValue = orderHistory['totalordervalue'];
      this.numberCustomer = orderHistory['numbercustomers'];
      this.allhistory.map((i: any) => i.selected = false);
      this.page = orderHistory?.page?.currentPageNumber;
      this.collectionsize = orderHistory?.page?.totalResults;
      this.pageSize=orderHistory?.page?.entriesPerPage;
      this.loading = false;
      ////console.log('salesbyprod', this.allhistory);
      this.loadTablePagenation();
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Something Went Wrong');
    });
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
            'copy', 'csv', 'pdf', 'print'
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
  selectedFormDate(date: any) {
    this.fromDate = date.year + '/' + date.month + '/' + date.day;
  }
  selectedToDate(date: any) {
    this.fromToDate = date.year + '/' + date.month + '/' + date.day;
  }
  selectedEndDate(date: any) {
    this.endDate = date.year + '/' + date.month + '/' + date.day;
  }
  clear() {
    this.fromDate = '';
    this.fromToDate = '';
    this.endDate = '';
    this.isclear=true;
    let ip:usertrackInput={menu:TrackMenus.REPORTS,submenu:subMenus.SALESBYPRODUCT,page:pages.SALESBYPRODUCTPAGE,function:"",descrption:"Clear button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }
  getReposts() {
    this.getDefaultData();
  }
  download() {
    this.loading=true;
    if(this.fromDate!=null){
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Please select From Date');
    }
    if(this.fromToDate!=null){
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Please select To Date');
    }
    this.orderHistoryService.getDownloadReport(this.fromDate,this.fromToDate).subscribe((res: any) => {
      if(res!=null)
      this.downloadcsvService.downloadCSVFile(res, 'orderhistory_report');
      else
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'No Data found');
     
      this.loading=false;
    },
    error=>{
      this.loading=false;
      //this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'No Data found');
    });
     let ip:usertrackInput={menu:TrackMenus.REPORTS,submenu:subMenus.SALESBYPRODUCT,page:pages.SALESBYPRODUCTPAGE,function:"",descrption:"Download button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }
  isDescEnables: boolean = false;
  toggleDesc() {
    this.isDescEnables = !this.isDescEnables;
  }

  
  searchField(){
    this.isclear=false;
    this.page=1;
    this.collectionsize=0;
    this.getReposts();
    let ip:usertrackInput={menu:TrackMenus.REPORTS,submenu:subMenus.SALESBYPRODUCT,page:pages.SALESBYPRODUCTPAGE,function:"",descrption:"Search button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }
}
