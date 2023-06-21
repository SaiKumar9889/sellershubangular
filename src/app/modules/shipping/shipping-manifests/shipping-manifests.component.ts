import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AllMenuTabs } from 'src/app/_models/Tabs';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { DownloadcsvService } from 'src/app/_service/downloadcsv.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { SalsesOrdersService } from '../../orders/services/salses-orders.service';
import { ShippingService } from '../shipping.service';
declare var $: any;

@Component({
  selector: 'app-shipping-manifests',
  templateUrl: './shipping-manifests.component.html',
  styleUrls: ['./shipping-manifests.component.scss']
})
export class ShippingManifestsComponent implements OnInit {
  loading: boolean = false;
  isEdit: boolean = false;
  allSales: any[] = [];
  Sales: any[] = [];
  viewSales: any[] = [];
  page: number = 0;
  pageSize = environment.defaultPaginationValue;
  total = environment.defaultTotalValue;
  collectionsize = environment.defaultTotalValue;
  purchaseStartDate: any = new Date();
  purchaseEndDate: any = new Date();
  constructor(private ShippingService: ShippingService, private toasterService: ToasterService, private salsesOrdersService: SalsesOrdersService, private datePipe: DatePipe, private datasharingService: DatasharingService, private downloadcsvService: DownloadcsvService) { }

  ngOnInit(): void {
    this.isEdit = false;
    this.purchaseStartDate.setFullYear(this.purchaseStartDate.getFullYear() - 10);
    this.purchaseEndDate.setDate(this.purchaseEndDate.getDate() + 1);
    this.purchaseEndDate = this.datePipe.transform(this.purchaseEndDate, 'yyyy-MM-dd');
    this.purchaseStartDate = this.datePipe.transform(this.purchaseStartDate, 'yyyy-MM-dd');
    this.getShippingManifests();
  }
  getShippingManifests() {
    this.loading = true;
    this.ShippingService.getShippingManifest().subscribe((res: any) => {
      // console.log(res);
      this.allSales = res?.channelSales;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Shipping manifests retrived');
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };
  orders: any;
  viewShippingManifest(order) {
    this.orders = order;
    this.loading = true;
    this.isEdit = true;
    $('#viewmanifest-modal').modal('show');
    this.ShippingService.viewShippingManifest(this.page, this.collectionsize, this.pageSize, order.shippingMethod, order.carrierName, this.purchaseStartDate, this.purchaseEndDate).subscribe((res: any) => {
      // console.log(res);
      this.Sales = res?.sales;
      this.collectionsize = res?.page?.totalResults;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Shipping manifests retrived');
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  }
  changepage(page: any) {
    this.loading = true;
    // this.isEdit = true ;
    this.ShippingService.viewShippingManifest(this.page, this.collectionsize, this.pageSize, this.orders.shippingMethod, this.orders.carrierName, this.purchaseStartDate, this.purchaseEndDate).subscribe((res: any) => {
      // console.log(res);
      this.Sales = res?.sales;
      this.collectionsize = res?.page?.totalResults;
      // this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Shipping manifests retrived');
      this.loading = false;
    }, error => {
      this.loading = false;
      // this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  }
  isAllChecked: boolean = false;
  isSaleAllChecked: boolean = false;
  selectall(event: any) {
    ////console.log("selectall", this.isAllChecked);
    this.isAllChecked = !this.isAllChecked;
    ////console.log("selectall", this.isAllChecked);
    this.Sales.map((i: any) => i.selected = this.isAllChecked);
    ////console.log(this.allProducts);
    let selectedItems = this.Sales.filter(sale => sale.selected == true);
  }
  selectallsales(event: any) {
    ////console.log("selectall", this.isAllChecked);
    this.isSaleAllChecked = !this.isSaleAllChecked;
    ////console.log("selectall", this.isAllChecked);
    this.viewSales.map((i: any) => i.selected = this.isSaleAllChecked);
    ////console.log(this.allProducts);
    let selectedItems = this.viewSales.filter(sale => sale.selected == true);
  }
  individualselection(event: any) {
    // ////console.log(event.target.value);
    this.Sales.find(sale => sale.id == event.id).selected = !this.Sales.find(sale => sale.id == event.id).selected;
    let selectedItems = this.Sales.filter(sale => sale.selected == true);
  }
  individualSaleselection(event: any) {
    // ////console.log(event.target.value);
    this.viewSales.find(sale => sale.id == event.id).selected = !this.viewSales.find(sale => sale.id == event.id).selected;
    let selectedItems = this.viewSales.filter(sale => sale.selected == true);
  }
  generateManifest() {
    this.loading = true;
    let selectedItems = this.Sales.filter(sale => sale.selected == true);
    const ids = selectedItems.map(ord => ord.id);
    this.ShippingService.generateManifest(ids).subscribe((res: any) => {
      console.log(res);
      // this.Sales = res?.sales
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Shipping manifests Generated');
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  }
  exportManifest() {
    this.loading = true;
    this.ShippingService.exportManifestId(this.orders.manifestId).subscribe((res: any) => {
      if (res != null)
        this.downloadcsvService.downloadCSVFile(res?.exportChannelSales, 'Shipping_manifest');
      else
        this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'No Data found');
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  }
  editproduct(order) {
    this.loading = true;
    this.isEdit = true;
    $('#view-manifest-modal').modal('show');
    this.ShippingService.retrieveManifestId(order.manifestId).subscribe((res: any) => {
      // console.log(res);
      this.viewSales = res?.channelSales;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Shipping manifests Retrieved');
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  }
  viewOrdersTab(order) {
    let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.view_order };
    this.datasharingService.addtoTab(menu);
    let selectedItems = this.Sales.filter(s => s.orderId == order.orderId);
    this.datasharingService.changeActiveOrder(selectedItems);
    this.modalclosed();
  }
  modalclosed() {
    $('#viewmanifest-modal').modal('hide');
    this.Sales = [];
  }
  viewmodalclosed() {
    $('#view-manifest-modal').modal('hide');
    this.viewSales = [];
  }
}
