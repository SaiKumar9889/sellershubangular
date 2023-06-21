import { Component, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { StocksummaryService } from '../services/stocksummary.service';
import { environment } from 'src/environments/environment';
import { TransferStock } from '../models/TransferStock';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
declare var $: any;

@Component({
  selector: 'app-stocksummary',
  templateUrl: './stocksummary.component.html',
  styleUrls: ['./stocksummary.component.css']
})
export class StocksummaryComponent implements OnInit {
  loading: boolean = false;
  constructor(private appTrackingService: AppTrackingService, private toasterService: ToasterService, private stockService: StocksummaryService) {
    let ip: usertrackInput = { menu: TrackMenus.WAREHOUSEMANAGEMENT, submenu: subMenus.STOCKSUMMARY, page: pages.STOCKSUMMARYPAGE, function: "", descrption: "Stock summary page loaded" };
    this.appTrackingService.trackUserActivity(ip);
  }

  ngOnInit(): void {
    this.getProducts();
  }

  pageSize = environment.defaultPaginationValue;
  total = environment.defaultTotalValue;

  collectionsize = 0;
  allProds: any[] = [];
  searchValue: any = '';
  searchBy: any = 0;
  searchFrom: any = '';
  searchTo: any = '';
  topsalepercent: any = 0;
  topproductpercent: any = 0;
  topsaleValue: any = 0;
  topproductunits: any = 0;
  productTitle: string = '';
  page = 1;
  page2 = 1;
  currentPage = 3;
  disablepage = 3;
  isDisabled = true;
  productIsSelected: boolean = false;
  channel: any = '';
  sortvalue: number = 0;
  searchname: any = '';
  usedUnsedId: any = '';
  showParentProducts: boolean = false;
  showActiveProducts: boolean = false;
  showNonEmptyProducts: boolean = false;

  warehouseName: string = '';
  auditTrack(type: any) {
    let ip: usertrackInput;
    if (type == 1)
      ip = { menu: TrackMenus.WAREHOUSEMANAGEMENT, submenu: subMenus.STOCKSUMMARY, page: pages.STOCKSUMMARYPAGE, function: "", descrption: "Edit Stock button is clicked" };
    this.appTrackingService.trackUserActivity(ip);
  }
  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }


  changespage(page: any) {
    this.getProducts();
  }

  isAllChecked: boolean = true;

  selectall(event: any) {
    this.isAllChecked = !this.isAllChecked;
    this.allProds.map((i: any) => i.selected = this.isAllChecked);
    ////console.log(this.allProds);
    let selectedItems = this.allProds.filter(sale => sale.selected == true);
    if (selectedItems.length > 0) {
      this.productIsSelected = true;
    } else {
      this.productIsSelected = false;
    }
  }

  individualselection(event: any) {
    this.allProds.find(sale => sale.id == event.id).selected = !this.allProds.find(sale => sale.id == event.id).selected;
    let selectedItems = this.allProds.filter(sale => sale.selected == true);
    if (selectedItems.length > 0) {
      this.productIsSelected = true;
    } else {
      this.productIsSelected = false;
    }
  }


  getProducts() {
      this.loading = true;
      this.channel = 'all';
    this.searchname = 0;
    this.usedUnsedId = 'all';

    this.stockService.getStockview(this.page, this.total, this.pageSize, this.channel, this.sortvalue, this.searchname, this.searchValue, this.usedUnsedId, this.showParentProducts, this.showActiveProducts, this.showNonEmptyProducts).subscribe((res: any) => {
      ////console.log(res);
      this.allProds = res.products;
      // this.warehouseName = res.products[0].itemLocations[0].warehouseName;
      this.total = res?.page?.totalResults;
      this.page = res?.page?.currentPageNumber;
      this.loading = false;
      if (this.allProds.length > 0)
        this.productTitle = this.allProds[0].title;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };

  changePageSize() {
    this.getProducts();
  }

  modalclosed() {
    this.locations = false;
    $('#editstock-modal').modal('hide');
    $('#editstocktransfer-modal').modal('hide');
    // this.getProducts();
  }

  selectedstockid: any;
  selectedsku: any;
  isStockPage: boolean = false;
  stockDetails: any;
  assignqty: any;
  title: any;
  sku: any;
  totalquantity: any;
  locidAndquantity: any;
  transferqty: number;
  currentstock: number;
  // currentstock2: any;
  warehouselocations: any[] = [];
  aisle: any;
  bay: any;
  bin: any;
  shelf: any;
  locid: any;

  locations: boolean = false;
  status: any;
  srclocationId: any;
  dstlocationId: any;
  imageUrl: any;


  async editstock(selectedstock: any) {
    ////console.log(selectedstock)
    this.selectedstockid = selectedstock.id,
      this.selectedsku = selectedstock.sku,
      this.isStockPage = true;

    this.stockService.geteditStockDetails(this.selectedsku, this.isStockPage).subscribe(res => {

      this.stockDetails = res;
      this.title = this.stockDetails.product.title;
      this.sku = this.stockDetails.sku;
      this.totalquantity = this.stockDetails.totalqty;
      this.warehouselocations = this.stockDetails.warehouselocations;
      this.aisle = this.warehouselocations[0].aisle;
      this.bay = this.warehouselocations[0].bay;
      this.bin = this.warehouselocations[0].bin;
      this.shelf = this.warehouselocations[0].shelf;
      this.locid = this.warehouselocations[0].id;

      this.loading = false;
    },
      error => {
        ////console.log("Error updating");
        this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
        this.loading = false;
      });

    $('#editstock-modal').modal('show');
  }


  UpdatestockforLocation() {
    let skuid = this.selectedsku;
    this.locidAndquantity = this.locid + "-" + this.assignqty;

    if (this.assignqty == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'StockSummary', 'Please enter Assigned Quantity');
      return;
    }

    this.loading = true;
    this.stockService.updatestockforlocations(skuid, this.locidAndquantity).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, 'StockSummary', 'Assigned Quantity success');
      this.editstockclear();
      this.loading = false;
      $('#editstock-modal').modal('hide');
    },
      error => {
        ////console.log("Error StockSummary Assigned Quantity saving");
        this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
        this.loading = false;
      });
    this.getProducts();

  }
  editstockclear() {
    this.assignqty = '';
  }

  srcwarehousedetails: string = '';
  dstwarehousedetails: string = '';
  srcwarehouselocations: any[] = [];
  dstwarehouselocations: any[] = [];

  async transferstock(selectedstock: any) {
    ////console.log(selectedstock)
    this.selectedstockid = selectedstock.id,
      this.selectedsku = selectedstock.sku,
      this.isStockPage = true;
    this.loading = true;
    this.stockService.getskutransferDetails(this.selectedsku, this.isStockPage).subscribe(res => {
      ////console.log("geteditStockTransferDetails::", res);
      this.stockDetails = res;
      this.title = this.stockDetails.product.title;
      this.sku = this.stockDetails.sku;
      this.totalquantity = this.stockDetails.totalqty;
      this.srcwarehouselocations = this.stockDetails.warehouselocations;
      this.dstwarehouselocations = this.stockDetails.dstwarehouseLocations;
      this.loading = false;
    },
      error => {
        ////console.log("Error updating");
        this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
        this.loading = false;
      });

    $('#editstocktransfer-modal').modal('show');
  }

  ok() {

    if (this.srcwarehousedetails == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please select Source Location');
      return;
    }
    if (this.dstwarehousedetails == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please select Destination Location');
      return;
    }
    let srcselectedvalue = this.srcwarehousedetails;
    var srcvalues = srcselectedvalue.split("---");
    this.currentstock = Number(srcvalues[1]);
    this.srclocationId = srcvalues[0];

    let dstselectedvalue = this.dstwarehousedetails;
    var dstvalues = dstselectedvalue.split("---");
    this.dstlocationId = dstvalues[0];
    this.locations = true;
  }

  Updatestocktransfer() {
    let skuid = this.selectedsku;
    if (this.transferqty == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'StockSummary', 'Please enter Transfer Quantity');
      return;
    }

    if (this.transferqty > this.currentstock) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'StockSummary', 'Please enter Less Transfer Quantity');
      return;
    }

    let transferstockData: TransferStock = {
      srclocationId: this.srclocationId,
      status: "NEW",
      sku: this.selectedsku,
      dstlocationId: this.dstlocationId,
      title: this.title,
      imageUrl: "https://s3-us-west-2.amazonaws.com/synmultichannelprod/188/88526_fd249d85-91a3-4c16-92af-eb026c1177b80.jpg",
      transferQuantity: this.transferqty
    };

    this.loading = true;
    this.stockService.updatestocktransfer(transferstockData).subscribe(res => {
      ////console.log("updatestocktransfer::", res);
      this.loading = false;
    },
      error => {
        ////console.log("Error updating");
        this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
        this.loading = false;
      });

    this.transferqty = 0;
    $('#editstocktransfer-modal').modal('hide');
  }

}
