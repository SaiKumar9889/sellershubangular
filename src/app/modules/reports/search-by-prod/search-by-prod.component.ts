import { Component, OnInit, ViewChild } from "@angular/core";
import { TrackMenus } from "src/app/_models/menuForTrack";
import { pages } from "src/app/_models/pages";
import { subMenus } from "src/app/_models/subMenuTrack";
import { usertrackInput } from "src/app/_models/usertrackInput";
import { ToastTypes } from "src/app/_models/_toaster";
import { AppTrackingService } from "src/app/_service/app-tracking.service";
import { DownloadcsvService } from "src/app/_service/downloadcsv.service";
import { ToasterService } from "src/app/_service/toaster.service";
import { environment } from "src/environments/environment";
import { SearchByProductService } from "../services/search-by-product.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-search-by-prod",
  templateUrl: "./search-by-prod.component.html",
  styleUrls: ["./search-by-prod.component.css"],
})
export class SearchByProdComponent implements OnInit {
  loading: boolean = false;
  page = 1;
  pageSize = environment.defaultPaginationValue;
  collectionsize = environment.defaultTotalValue;
  allReports: any[] = [];
  searchValue: any = "";
  searchBy: any = 0;
  searchFrom: any = "";
  searchTo: any = "";
  topsalepercent: any = 0;
  topproductpercent: any = 0;
  topsaleValue: any = 0;
  topproductunits: any = 0;
  productTitle: string = "";
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: any[] = [
    "sku",
    "product",
    "total",
    "per_total",
    "units",
    "per_units",
    "price/units",
  ];
  isclear: boolean = false;
  constructor(
    private appTrackingService: AppTrackingService,
    private downloadcsvService: DownloadcsvService,
    private toasterService: ToasterService,
    private searchByProductService: SearchByProductService
  ) {
    let ip: usertrackInput = {
      menu: TrackMenus.REPORTS,
      submenu: subMenus.SALESBYPRODUCT,
      page: pages.SALESBYPRODUCTPAGE,
      function: "",
      descrption: "Sales By Product page loaded",
    };
    this.appTrackingService.trackUserActivity(ip);
  }

  ngOnInit(): void {
    this.getReposts();
  }
  changePageSize() {
    this.getReposts();
  }
  selectedFormDate(date: any) {
    console.log(date);
    this.searchFrom = date.year + "/" + date.month + "/" + date.day;
  }
  selectedToDate(date: any) {
    console.log(date);
    this.searchTo = date.year + "/" + date.month + "/" + date.day;
  }
  changespage(page: any) {
    this.getReposts();
  }
  getReposts() {
    this.loading = true;
    this.searchByProductService
      .getReportByProduct(
        this.page,
        this.collectionsize,
        this.searchValue,
        this.searchBy,
        this.searchFrom,
        this.searchTo
      )
      .subscribe(
        (res: any) => {
          if (res.length !== 0) {
            this.dataSource = new MatTableDataSource(res?.productReports);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            this.dataSource = new MatTableDataSource([]);
          }
          ////console.log(res);
          this.allReports = res?.productReports;
          this.collectionsize = res?.page?.totalResults;
          this.page = res?.page?.currentPageNumber;
          //this.pageSize = res?.page?.entriesPerPage;

          this.topproductpercent = res?.topproductpercent;
          this.topproductunits = res?.topproductunits;
          this.topsalepercent = res?.topsalepercent;
          this.topsaleValue = res?.topsalevalue;
          this.loading = false;
          if (this.allReports.length > 0)
            this.productTitle = this.allReports[0].title;
          this.toasterService.openToastMessage(
            ToastTypes.success,
            "SellersHub",
            "Please Wait"
          );
        },
        (error) => {
          this.loading = false;
          this.toasterService.openToastMessage(
            ToastTypes.warning,
            "SellersHub",
            "Error"
          );
        }
      );
  }
  download() {
    this.loading = true;
    this.searchByProductService
      .getDownloadReport(
        this.searchFrom,
        this.searchTo,
        this.searchValue,
        this.searchBy
      )
      .subscribe((res: any) => {
        ////console.log(res);
        if (res != null)
          this.downloadcsvService.downloadCSVFile(res, "sales_report");
        else
          this.toasterService.openToastMessage(
            ToastTypes.warning,
            "SellersHub",
            "No Data found"
          );
        this.loading = false;
      });
    let ip: usertrackInput = {
      menu: TrackMenus.REPORTS,
      submenu: subMenus.SALESBYPRODUCT,
      page: pages.SALESBYPRODUCTPAGE,
      function: "",
      descrption: "Download button is clicked",
    };
    this.appTrackingService.trackUserActivity(ip);
  }
  clear() {
    this.isclear = true;
    this.searchBy = "0";
    this.searchValue = "";
    this.getReposts();
    let ip: usertrackInput = {
      menu: TrackMenus.REPORTS,
      submenu: subMenus.SALESBYPRODUCT,
      page: pages.SALESBYPRODUCTPAGE,
      function: "",
      descrption: "Clear button is clicked",
    };
    this.appTrackingService.trackUserActivity(ip);
  }
  isDescEnables: boolean = false;
  toggleDesc() {
    this.isDescEnables = !this.isDescEnables;
  }

  searchField() {
    this.page = 1;
    this.collectionsize = 0;
    this.getReposts();
    this.isclear = false;
    let ip: usertrackInput = {
      menu: TrackMenus.REPORTS,
      submenu: subMenus.SALESBYPRODUCT,
      page: pages.SALESBYPRODUCTPAGE,
      function: "",
      descrption: "Search button is clicked",
    };
    this.appTrackingService.trackUserActivity(ip);
  }
}
