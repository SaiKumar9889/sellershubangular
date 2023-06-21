import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AllMenuTabs } from 'src/app/_models/Tabs';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { DownloadcsvService } from 'src/app/_service/downloadcsv.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { ShippingService } from '../shipping.service';
declare var $: any;
@Component({
  selector: 'app-filed-manifests',
  templateUrl: './filed-manifests.component.html',
  styleUrls: ['./filed-manifests.component.scss']
})
export class FiledManifestsComponent implements OnInit {
  sDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  isclear: boolean = false;
  searchFrom: any = '';
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
  manifestDate:any;
  orders: any;
  constructor(private ShippingService: ShippingService, private toasterService: ToasterService, private datePipe: DatePipe, private downloadcsvService: DownloadcsvService, private datasharingService: DatasharingService) { }

  ngOnInit(): void {
    this.isEdit = false;
    this.purchaseStartDate.setFullYear(this.purchaseStartDate.getFullYear() - 10);
    this.purchaseEndDate.setDate(this.purchaseEndDate.getDate() + 1);
    this.purchaseEndDate = this.datePipe.transform(this.purchaseEndDate, 'yyyy-MM-dd');
    this.purchaseStartDate = this.datePipe.transform(this.purchaseStartDate, 'yyyy-MM-dd');
    this.retrieveAllManifestIds();
  }
  selectedFormDate(date: any) {
    this.searchFrom = date.year + '/' + date.month + '/' + date.day;
    ////console.log(this.searchFrom);
  }
  retrieveAllManifestIds(){
    this.loading = true;
    this.ShippingService.retrieveAllManifestIds().subscribe((res: any) => {
      console.log(res);
      this.allSales = res?.channelSales;
      this.allSales.forEach(s=>s.manifestDate =new Date(s.manifestId*1000));
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'ManifestIds retrived');
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  }
  viewFiledManifest(order){
    this.orders = order;
    this.loading = true;
    this.isEdit = true;
    $('#view-filedmanifest-modal').modal('show');
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
  selectall(event: any) {
    ////console.log("selectall", this.isAllChecked);
    this.isAllChecked = !this.isAllChecked;
    ////console.log("selectall", this.isAllChecked);
    this.Sales.map((i: any) => i.selected = this.isAllChecked);
    ////console.log(this.allProducts);
    let selectedItems = this.Sales.filter(sale => sale.selected == true);
  }
  individualselection(event: any) {
    // ////console.log(event.target.value);
    this.Sales.find(sale => sale.id == event.id).selected = !this.Sales.find(sale => sale.id == event.id).selected;
    let selectedItems = this.Sales.filter(sale => sale.selected == true);
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
  viewOrdersTab(order) {
    let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.view_order };
    this.datasharingService.addtoTab(menu);
    let selectedItems = this.Sales.filter(s => s.orderId == order.orderId);
    this.datasharingService.changeActiveOrder(selectedItems);
    this.modalclosed();
  }
  modalclosed() {
    $('#view-filedmanifest-modal').modal('hide');
    this.Sales = [];
  }
}
