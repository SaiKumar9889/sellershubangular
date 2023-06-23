import { Component, OnInit } from "@angular/core";
import { TrackMenus } from "src/app/_models/menuForTrack";
import { pages } from "src/app/_models/pages";
import { subMenus } from "src/app/_models/subMenuTrack";
import { usertrackInput } from "src/app/_models/usertrackInput";
import { ToastTypes } from "src/app/_models/_toaster";
import { AppTrackingService } from "src/app/_service/app-tracking.service";
import { ToasterService } from "src/app/_service/toaster.service";
import { environment } from "src/environments/environment";
import { StockOverviewService } from "../services/stock-overview.service";
declare var $: any;

@Component({
  selector: "app-stock-overview",
  templateUrl: "./stock-overview.component.html",
  styleUrls: ["./stock-overview.component.css"],
})
export class StockOverviewComponent implements OnInit {
  loading: boolean = false;
  orderDetails: any;

  constructor(
    private appTrackingService: AppTrackingService,
    private toasterService: ToasterService,
    private stockService: StockOverviewService
  ) {
    let ip: usertrackInput = {
      menu: TrackMenus.INVENTORY,
      submenu: subMenus.STOCKVIEW,
      page: pages.STOCKVIEWPAGE,
      function: "",
      descrption: "Stock view page loaded",
    };
    this.appTrackingService.trackUserActivity(ip);
  }

  ngOnInit(): void {
    this.getStockOverview();
  }

  pageSize = environment.defaultPaginationValue;
  total = environment.defaultTotalValue;
  collectionsize = 0;
  allStock: any[] = [];
  searchValue: any = "";
  searchBy: any = 0;
  searchFrom: any = "";
  searchTo: any = "";
  topsalepercent: any = 0;
  topproductpercent: any = 0;
  topsaleValue: any = 0;
  topproductunits: any = 0;
  productTitle: string = "";
  page: number = 1;

  productIsSelected: boolean = false;

  auditTrack(type: any) {
    // let ip:usertrackInput;
    // if(type==1)
    // ip={menu:TrackMenus.INVENTORY,submenu:subMenus.STOCKVIEW,page:pages.STOCKVIEWPAGE,function:"",descrption:"Search button is clicked"};
    // if(type==2)
    // ip={menu:TrackMenus.INVENTORY,submenu:subMenus.STOCKVIEW,page:pages.STOCKVIEWPAGE,function:"",descrption:"Reset button is clicked"};
    // this.appTrackingService.trackUserActivity(ip);
  }

  modalclosed() {
    $("#search-modal").modal("hide");
  }

  changespage(page: any) {
    this.getStockOverview();
  }

  getStockOverview() {
    this.loading = true;
    this.stockService
      .getStockview(
        this.page,
        this.collectionsize,
        this.pageSize,
        this.searchBy,
        this.searchValue,
        "",
        "",
        "",
        "",
        false
      )
      .subscribe(
        (res: any) => {
          ////console.log(res);
          this.allStock = res?.products;
          this.collectionsize = res?.page?.totalResults;
          //this.page = res?.page?.currentPageNumber;
          // this.topproductpercent = res?.topproductpercent;
          // this.topproductunits = res?.topproductunits;
          // this.topsalepercent = res?.topsalepercent;
          // this.topsaleValue = res?.topsalevalue;
          this.loading = false;
          if (this.allStock.length > 0)
            this.productTitle = this.allStock[0].title;
          this.toasterService.openToastMessage(
            ToastTypes.success,
            "SellersHub",
            "Please Wait"
          );
        },
        (eoor) => {
          this.toasterService.openToastMessage(
            ToastTypes.warning,
            "SellersHub",
            "Error"
          );
        }
      );
  }

  isAllChecked: boolean = false;

  selectall(event: any) {
    ////console.log("selectall", event.target.value);
    this.isAllChecked = !this.isAllChecked;
    this.allStock.map((i: any) => (i.selected = this.isAllChecked));
    ////console.log(this.allStock);
    let selectedItems = this.allStock.filter((sale) => sale.selected == true);
    if (selectedItems.length > 0) {
      this.productIsSelected = true;
    } else {
      this.productIsSelected = false;
    }
  }

  individualselection(event: any) {
    // ////console.log(event.target.value);
    this.allStock.find((sale) => sale.id == event.id).selected =
      !this.allStock.find((sale) => sale.id == event.id).selected;
    let selectedItems = this.allStock.filter((sale) => sale.selected == true);
    if (selectedItems.length > 0) {
      this.productIsSelected = true;
    } else {
      this.productIsSelected = false;
    }
  }
  // modalclosed() {
  //   $('#search-modal').modal('hide');
  // }
  // changespage(pagenum: any) {
  //   ////console.log(pagenum);
  //   this.getDefaultData(pagenum);
  // }
  changePageSize() {
    this.getStockOverview();
  }

  orderHistory(prod: any) {
    this.loading = true;
    this.stockService.viewOrderDetails(prod.sku).subscribe(
      (res: any) => {
        //console.log(res);
        this.orderDetails = res;
        $("#order-history-modal").modal("show");
        this.loading = false;
      },
      (error) => {
        this.toasterService.openToastMessage(
          ToastTypes.warning,
          "SellersHub",
          "Error"
        );
        this.loading = false;
      }
    );
  }

  reset() {
    this.searchBy = "0";
    this.searchValue = "";
    this.getStockOverview();
  }
}
