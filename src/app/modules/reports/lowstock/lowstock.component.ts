import { Component, OnInit } from '@angular/core';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { DownloadcsvService } from 'src/app/_service/downloadcsv.service';
import { environment } from 'src/environments/environment';
import { LowStockService } from '../services/low-stock.service';
declare var $: any;
@Component({
  selector: 'app-lowstock',
  templateUrl: './lowstock.component.html',
  styleUrls: ['./lowstock.component.css']
})
export class LowstockComponent implements OnInit {
  loading: boolean = false;
  page = 1;
  pageSize = environment.defaultPaginationValue;
  collectionsize = environment.defaultTotalValue;
  allReports: any[] = [];
  search: string = '';
  constructor(private appTrackingService:AppTrackingService,private downloadcsvService: DownloadcsvService, private lowStockService: LowStockService) {
    let ip:usertrackInput={menu:TrackMenus.REPORTS,submenu:subMenus.LOWSTOCK,page:pages.LOWSTOCKPAGE,function:"",descrption:"Low stock page loaded"};
    this.appTrackingService.trackUserActivity(ip);
   }
  ngOnInit(): void {
    this.loading = true;
    this.getReposts();
  }
  changespage(page: any) {
    this.getReposts();
  }

  clear(){
    this.search = "";
    this.ngOnInit();
    let ip:usertrackInput={menu:TrackMenus.REPORTS,submenu:subMenus.SALESBYPRODUCT,page:pages.SALESBYPRODUCTPAGE,function:"",descrption:"Clear button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }
  getReposts() {
    this.loading = true ;
    this.lowStockService.getReportlowStock(this.page, this.collectionsize, this.search).subscribe((res: any) => {
      ////console.log(res);
      this.allReports = res?.productReports;
      this.collectionsize = res?.page?.totalResults;
      this.page = res?.page?.currentPageNumber;
       //this.pageSize = res?.page?.entriesPerPage;
      this.loading = false;
    });
  }
  changePageSize() {
    this.getReposts();
  }
  download() {
    this.loading=true;
    this.lowStockService.getDownloadReport(this.search).subscribe((res: any) => {
      this.downloadcsvService.downloadCSVFile(res, 'lowStock_report');
      this.loading=false;
    });
    let ip:usertrackInput={menu:TrackMenus.REPORTS,submenu:subMenus.SALESBYPRODUCT,page:pages.SALESBYPRODUCTPAGE,function:"",descrption:"Download button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }
  jsonData = [
    {
      name: "Anil Singh",
      age: 33,
      average: 98,
      approved: true,
      description: "I am active blogger and Author."
    },
    {
      name: 'Reena Singh',
      age: 28,
      average: 99,
      approved: true,
      description: "I am active HR."
    },
    {
      name: 'Aradhya',
      age: 4,
      average: 99,
      approved: true,
      description: "I am engle."
    },
  ];
  isDescEnables: boolean = false;
  toggleDesc() {
    this.isDescEnables = !this.isDescEnables;
  }

  searchField() {
    this.page = 1;
    this.collectionsize = 0;
    this.getReposts();
    let ip:usertrackInput={menu:TrackMenus.REPORTS,submenu:subMenus.SALESBYPRODUCT,page:pages.SALESBYPRODUCTPAGE,function:"",descrption:"Search button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }


}
