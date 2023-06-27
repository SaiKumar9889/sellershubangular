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
import { LowStockService } from "../services/low-stock.service";
import { StockValueReportService } from "../services/stock-value-report.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-stock-value-repo",
  templateUrl: "./stock-value-repo.component.html",
  styleUrls: ["./stock-value-repo.component.css"],
})
export class StockValueRepoComponent implements OnInit {
  loading: boolean = false;
  page = 1;
  pageSize = environment.defaultPaginationValue;
  costPrice: any;
  collectionsize = environment.defaultTotalValue;
  allReports: any[] = [];
  search: string = "";
  totalElements: number = environment.defaultTotalValue;
  isclear: boolean = false;
  fromDate: any = "";

  dataSource = new MatTableDataSource([]);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: any[] = ["sku", "title", "qty", "item_cost", "stock_value"];
  constructor(
    private appTrackingService: AppTrackingService,
    private toasterService: ToasterService,
    private downloadcsvService: DownloadcsvService,
    private stockValueReportService: StockValueReportService
  ) {
    let ip: usertrackInput = {
      menu: TrackMenus.REPORTS,
      submenu: subMenus.STOCKVALUEREPORT,
      page: pages.STOCKVALUEREPORTPAGE,
      function: "",
      descrption: "Stock value report page loaded",
    };
    this.appTrackingService.trackUserActivity(ip);
  }
  ngOnInit(): void {
    this.loading = true;
    this.getReposts();
  }
  changespage(page: any) {
    this.getReposts();
  }
  selectedFormDate(date: any) {
    this.fromDate = date.year + "/" + date.month + "/" + date.day;
  }
  getReposts() {
    this.loading = true;
    // $("#printabletable").DataTable().destroy();
    this.stockValueReportService
      .getStockValueReport(
        this.page,
        this.collectionsize,
        this.pageSize,
        this.search
      )
      .subscribe(
        (res: any) => {
          ////console.log(res);
          if (res.length !== 0) {
            this.dataSource = new MatTableDataSource(res?.products);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            this.dataSource = new MatTableDataSource([]);
          }
          this.allReports = res?.products;
          if (res?.products["costPrice"] == null) {
            this.costPrice = "NOT AVAILABLE";
          } else {
            this.costPrice = res?.products["costPrice"];
          }

          this.collectionsize = res?.page?.totalResults;
          this.page = res?.page?.currentPageNumber;
          this.totalElements = res?.page?.total;

          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }
  changePageSize() {
    this.getReposts();
  }
  download() {
    this.loading = true;
    this.stockValueReportService
      .getDownloadReport(this.search, this.fromDate)
      .subscribe((res: any) => {
        if (res != null)
          this.downloadcsvService.downloadCSVFile(res, "Stock_value_eport");
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
  searchField() {
    this.page = 1;
    this.collectionsize = 0;
    this.getReposts();
    let ip: usertrackInput = {
      menu: TrackMenus.REPORTS,
      submenu: subMenus.SALESBYPRODUCT,
      page: pages.SALESBYPRODUCTPAGE,
      function: "",
      descrption: "Search button is clicked",
    };
    this.appTrackingService.trackUserActivity(ip);
  }
  clear() {
    this.search = "";
    this.ngOnInit();
    let ip: usertrackInput = {
      menu: TrackMenus.REPORTS,
      submenu: subMenus.SALESBYPRODUCT,
      page: pages.SALESBYPRODUCTPAGE,
      function: "",
      descrption: "Clear button is clicked",
    };
    this.appTrackingService.trackUserActivity(ip);
  }
}
