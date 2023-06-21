import { DatePipe, formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, Inject, Input, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { PageSizes, PDFDocument, PDFPage, rgb, StandardFonts } from 'pdf-lib';
// import { ContextMenuComponent } from 'ngx-contextmenu';
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { NgxIndexedDBService } from 'ngx-indexed-db';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { filterDropDown } from 'src/app/_models/filterDropDown';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { AllMenuTabs } from 'src/app/_models/Tabs';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { ToastTypes } from 'src/app/_models/_toaster';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { DownloadcsvService } from 'src/app/_service/downloadcsv.service';
import { PdftoblobService } from 'src/app/_service/pdftoblob.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import cancelledReasonJson from '../../../../assets/config/cancelledReason.json';
import { InvoiceTemplatesService } from '../../template-designers/services/invoice-templates.service';
import { PackingslipGenartionService } from '../services/packingslip-genartion.service';
import { SalsesOrdersService } from '../services/salses-orders.service';
import { Subscription } from 'rxjs';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';


pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { forEach } from 'jszip';
declare var $: any;
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-sales-orders',
  templateUrl: './sales-orders.component.html',
  styleUrls: ['./sales-orders.component.scss']
})
export class SalesOrdersComponent implements OnInit {
  loading: boolean = false;
  isEdit: boolean = false;
  byOrderId: boolean = true;
  batchOrderId: boolean = false;
  byBarcode: boolean = false;
  isOrdersView = false;

  page = 0;
  collectionsize = environment.defaultTotalValue;
  pageSize = 50;
  orederIsSelected: boolean = false;
  printLabels = [];
  cancelledReasons: any[] = cancelledReasonJson;
  selectedCancelledReason: any;
  productFilters: filterDropDown[] = [];
  orderFilters: filterDropDown[] = [];

  channels: any = [];
  dropdownSettings_scd: any = {};
  dropdownSettings_cancelledReason: any = {};
  dropdownSettings_filter: any = {};
  dropdownSettings_channels: any = {};


  channelType: any = [];
  fliter: any = '0';
  currentDate = { year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate() };
  serviceFormat = '';

  filterBy: any = [{ id: '2-0', name: 'Unshipped Orders' }];

  searchname: any = '0';
  searchValue2: any = '';
  @ViewChild(CdkVirtualScrollViewport, { static: false })
  public viewPort: CdkVirtualScrollViewport;


  public items = [
    { name: 'John', otherProperty: 'Foo' },
    { name: 'Joe', otherProperty: 'Bar' }
  ];
  doc: jsPDF;
  filesObjBlobs: any = [];
  selectedpdfObjects: any = [];
  printLabelJobs: boolean = false;
  selectedOrderData1: any;
  state = 0;
  isSalesOrdersView: boolean;
  // @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  showMessage(message: any) {
    ////console.log(message);
  }
  allSales: any[] = [];
  Sales: any[] = [];

  @Input()
  tab: string = '';

  selectedPrinter: any = 0;

  refreshEventSubscription: Subscription;


  constructor(private packingslipGenartionService: PackingslipGenartionService, private pdftoblobService: PdftoblobService, public datepipe: DatePipe, private appTrackingService: AppTrackingService, private dbService: NgxIndexedDBService, private router: Router, private downloadcsvService: DownloadcsvService, private toasterService: ToasterService,
    private salsesOrdersService: SalsesOrdersService, private datasharingService: DatasharingService,
    private invoiceTemplatesService: InvoiceTemplatesService,
    @Inject(LOCALE_ID) public locale: string, public http: HttpClient,
    private cdref: ChangeDetectorRef) {
    this.orderFilters.push({ columnName: 'Order ID', columnFilterKey: '2' });
    this.productFilters.push({ columnName: 'SKU', columnFilterKey: '1' });
    this.productFilters.push({ columnName: 'Item ID', columnFilterKey: '4' });
    let ip: usertrackInput = { menu: TrackMenus.ORDERS, submenu: subMenus.SALESORDERS, page: pages.SALESORDERSPAGE, function: "", descrption: "Sales orders page loaded" };
    this.appTrackingService.trackUserActivity(ip);
    // this.productFilters.push({columnName:'Product Tiele',columnFilterKey:'title'});
    // this.printLabels.push({ id: '', display: 'Default Labels' });
    // this.printLabels.push({ id: '', display: 'Via Dpd' });
    // this.printLabels.push({ id: '', display: 'Default Labels' });
    // this.printLabels.push({ id: '', display: 'Default Labels' });
    // this.printLabels.push({ id: '', display: 'Default Labels' });
    // this.printLabels.push({ id: '', display: 'Default Labels' });
    // this.printLabels.push({ id: '', display: 'Default Labels' });
  }
  allPrintLables: any = [];
  allPrinters: any = [];
  exportCarriers_v2: any = [];
  FilterByOptions: any = [];
  selectedFilter: any = ["11-3", "13-4"];
  selectedChannel: any = [];
  public cssisCollapsed = true;
  public channelCollapsed = true;
  public sortCollapsed = true;
  ngOnInit(): void {
    let userdetails = localStorage.getItem('userId');
    if (userdetails == '2707' || userdetails == '2709') {
      this.fliter = '1';
    }
    this.refreshEventSubscription = this.salsesOrdersService.refreshEvent.subscribe((i: any) => {
      if (i == '1') {
        this.getDefaultData();
      }
    })
    this.isEdit = false;
    this.getChannelRegistration();
    // this.mergeMultipleBlobs();
    this.FilterByOptions = [
      { id: '1-0', name: 'Pending Orders' },
      { id: '2-0', name: 'Unshipped Orders' },
      { id: '3-1', name: 'Prime Orders' },
      { id: '4-2', name: 'Printed Invoices' },
      { id: '5-2', name: 'Non Printed Invoices' },
      // { id: '10-3', name: 'Printed Labels' },
      // { id: '11-3', name: 'Non Printed Labels' },
      // { id: '12-4', name: 'Error Labels' },
      // { id: '13-4', name: 'Non Error Labels' },
    ];
    this.dropdownSettings_filter = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 1,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true,
    };
    this.dropdownSettings_channels = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 1,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true,
    };
    this.dropdownSettings_scd = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 1,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true
    };

    this.dropdownSettings_cancelledReason = {
      singleSelection: true,
      idField: 'id',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 1,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true
    };
    this.getDefaultData();
    this.getPrintLabels();
    this.getPrinters();
    this.selectShippingMethod = false;
    this.shippingMethodSelected = false;
    this.logozoom();
  }
  filterByOption:any = [];
  filterByChannel:any = [];
  sortBy:any = [];
  getFilters(e, checked) {
    checked = !checked;
    if(checked == true){
      this.filterByOption.push(e)
    }
    console.log(this.filterByOption);
    // console.log(checked)
  }
  getChannels(e, checked) {
    if(checked == true){
      this.filterByChannel.push(e)
    }
    console.log(this.filterByChannel);
    // console.log(checked)
  }
  getSortValue(e, checked) {
    if(checked == true){
      this.sortBy.push(e)
    }
    console.log(this.sortBy);
    // console.log(checked)
  }
  getPrinters() {
    this.salsesOrdersService.getPrinters().subscribe(res => {
      this.allPrinters = res;
    }, error => {
      this.allPrinters = [];
      this.loading = false;
    })
  }
  openFilter: boolean = false;
  openFilters() {
    this.openFilter = !this.openFilter
  }
  onItemSelect(event) {
    this.selectedFilter.push(event.id);
  }
  onChannelSelect(event) {
    this.selectedChannel.push(event.id);
  }
  dcConfirmShipmentTest() {
    const obj = {
      carriers: [],
      // dimensionH: [],
      // dimensionL: [],
      // dimensionW: [],
      dispatchDates: [],
      ids: [],
      orderIds: [],
      ordercomment: [],
      // packagemethod: null,
      // parcel: [],
      // serviceformats: [],
      shippingMethods: [],
      status: [],
      trackingIds: [],
      // weight: []
    }
    // this.labeledOrders.forEach(shipment => {
    //   shipment.channelSales.forEach(cs => {
    //     obj.carriers.push(cs.carrierName);
    //     obj.ids.push(cs.id);
    //     if (cs.trackingNumber != null)
    //       obj.trackingIds.push(cs.trackingNumber);
    //     else
    //       obj.trackingIds.push("");

    //     obj.shippingMethods.push(cs.shippingMethod);
    //     obj.dispatchDates.push(cs.dispatchDate);
    //     obj.status.push("enabled");
    //     if (cs.serialNumber != null)
    //       obj.ordercomment.push(cs.serialNumber);
    //     else
    //       obj.ordercomment.push("");

    //   })
    // });
    let labeledOrder: any = [], labeledOrderId: any;
    // this.labelsPrintd.filter(element => {
    //   labeledOrderId = element.orderId
    // });
    let selectedItems = this.onGoingOrderDet?.currentSale.filter(sale => sale.selected == true);
    // let selectedItems = labeledOrder.filter(sale => sale.labelPdfs.length > 0);
    selectedItems.forEach(data => {
      if (data.carrierName != null)
        obj.carriers.push(data.carrierName);
      else
        obj.carriers.push("");
      obj.ids.push(data.id);
      if (data.trackingNumber != null)
        obj.trackingIds.push(data.trackingNumber);
      else
        obj.trackingIds.push("");

      obj.shippingMethods.push(data.shippingMethod);
      obj.dispatchDates.push(new Date());
      obj.status.push("enabled");
      if (data.serialNumber != null)
        obj.ordercomment.push(data.serialNumber);
      else
        obj.ordercomment.push("");
    })

    this.salsesOrdersService.connfirmShipment(obj).subscribe((res: any) => {
      ////console.log(res);
      this.toasterService.openToastMessage(ToastTypes.success, 'Shipment confirmation', 'Shipment confirmed');
      if (res.status == "ok") {
        this.modalDispatchclosed();
        this.getDefaultData();
      }
      this.loading = false;
      // this.modalActionclosed();

    }, error => {
      this.loading = false;
    })
  }
  isAllOrdersChecked: boolean = true;
  selectallOrders(event: any) {
    this.isAllOrdersChecked = !this.isAllOrdersChecked;
    console.log(this.isAllOrdersChecked)
    if (this.isAllOrdersChecked) {
      this.onGoingOrderDet?.currentSale.map(lb => lb.selected = true);
    } else {
      this.onGoingOrderDet?.currentSale.map(lb => lb.selected = false);
    }
    let selectedItems = this.onGoingOrderDet?.currentSale.filter(sale => sale.selected == true);
    console.log(selectedItems)
  }
  individualselectOrders(sale: any) {
    sale.selected = !sale.selected;
    let selectedItems = this.onGoingOrderDet?.currentSale.filter(sale => sale.selected == true);
  }
  getDcOrderItems() {
    this.splitViewItems = [];
    this.splitOrderItems = [];
    this.splitAddressItems = [];
    let selectedItems = this.onGoingOrderDet?.currentSale.filter(sale => sale.selected == true);
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.salsesOrdersService.getOrderItemsForSpli(ids).subscribe((res: any) => {
      ////console.log(res);
      this.splitAddressItems = res;
      this.splitAddressItems.map(so => so.selected = false);
      this.splitOrderItems = this.splitAddressItems.slice();
    }, error => {
      this.loading = false;
    })
  }
  async dcPrintLableOpen(printOpt) {
    this.selectedItemsLengthTemp = this.selectedItemsLength;
    this.printLabelJobs = true;
    this.isEdit = true;
    this.loadingMessage = 'Printing';
    this.errorOders = [];
    this.successOders = [];
    let selectedItems = this.onGoingOrderDet?.currentSale.filter(sale => sale.selected == true);
    this.selectedLabelssLength = selectedItems.length;
    // if (selectedItems.length == 0) {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Please Select atleast one order');
    //   this.loading = false;
    //   return;
    // }
    this.loading = true;
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.selectedCarrier = printOpt.name;
    this.selectedCarrier_code = printOpt.code;
    if (this.isLabelsPrinted = true) {
      this.toasterService.openToastMessage(ToastTypes.info, 'Generate labels', 'Labels Generating');
    }

    for (let index = 0; index < selectedItems.length; index++) {
      let Obj = {
        "carriers": [],
        "dimensionH": [],
        "dimensionL": [],
        "dimensionW": [],
        "dispatchDates": [],
        "ids": [],
        "orderIds": [],
        "shippingMethods": [],
        "serviceformats": [],
        "packagemethod": [],
        "weight": [],
        "parcel": [],
        "amazonBuyShippingService": {}
      }
      Obj.carriers.push(selectedItems[index].shippingMethod);
      Obj.dimensionH.push(selectedItems[index].depth);
      Obj.dimensionL.push(selectedItems[index].length);
      Obj.dimensionW.push(selectedItems[index].width);
      Obj.dispatchDates.push(formatDate(new Date(), "yyyy-MM-dd", this.locale));
      Obj.ids.push(selectedItems[index].id);
      Obj.orderIds.push(selectedItems[index].channelOrderId);
      Obj.shippingMethods.push(selectedItems[index].shippingMethod);
      // Obj.serviceformats.push(data.serviceFormat);
      // Obj.packagemethod.push(data.serviceFormat);
      Obj.weight.push(selectedItems[index].weight);
      Obj.parcel.push("1");
      if (this.selectedCarrier_code == 'amazonbuyshipping') {
        Obj.amazonBuyShippingService = JSON.parse(JSON.stringify(this.amBuyShippingOptions.find(i => i.shippingServiceId == this.shippingservice)));
      }

      if (this.selectedCarrier_code != 'royalmail' && this.selectedCarrier_code != 'dropbox') {
        delete Obj.packagemethod;
      }
      if (this.selectedCarrier_code == 'royalmail' || this.selectedCarrier_code == 'dropbox') {
        if (!this.weight) {
          this.toasterService.openToastMessage(ToastTypes.warning, 'Generate labels', "Please enter weight in kgs");
          this.loading = false;
          return;
        }
        if (!this.serviceFormat) {
          this.toasterService.openToastMessage(ToastTypes.warning, 'Generate labels', "Please select service format");
          this.loading = false;
          return;
        }
      }
      const res: any = await this.salsesOrdersService.savePrintLabelsData1(Obj, this.selectedCarrier_code);
      if (res) {
        if (res?.errororders?.length > 0) {
          res?.errororders.forEach(order => {
            this.errorOders.push(order);
          });
        }

        if (res?.orders?.length > 0) {
          res?.orders.forEach(order => {
            this.successOders.push(order);
          });
        }
        if (index == 0) {
          this.loading = false;
          if (this.tab == 'error_labels') {
            $('#error-labels1').modal('show');
          } else {
            $('#error-labels').modal('show');
          }

        }

      }
    }
    for (let index = 0; index < this.successOders.length; index++) {
      await this.salsesOrdersService.getPrintedLabelsData1(this.successOders[index].id);

    }

    this.pdfDoc = await PDFDocument.create();

    let fnames = [];

    for (var i = 0; i < this.successOders.length; i++) {
      let ur = this.successOders[i];
      console.log(ur);
      let lablePDF = ur.labelPdfs[0];
      let fileName = lablePDF.split("/");
      fnames.push(fileName[(fileName.length - 1)]);

    }
    let self = this;

    let channelSales = [];
    this.successOders.forEach(order => {
      order.channelSales.find(i => {
        if (i.field12) {
          order.field12 = i.field12;
          channelSales.push(i);
        }
      })
    });

    if (this.successOders.length > 0) {
      await this.createPdfSkus(await this.pdftoblobService.getBlob(fnames), channelSales);
      // this.getOrders();

    } else {
      // this.getOrders();
    }
    this.printLabelJobs = false;
  }
  dcPrintInvoice(type: any) {
    this.loading = true;
    let selectedItems = this.onGoingOrderDet?.currentSale.filter(sale => sale.selected == true);
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Please Select atleast one order');
    //   this.loading = false;
    //   return;
    // }
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.salsesOrdersService.printInvoice(ids, type).subscribe(async (res: any) => {
      ////console.log(res);
      this.loading = false;
      res.orders.forEach(order => {
        order.invoiceBodyText = order.invoiceBodyText.replace(/GBP/g, '£')
      });
      this.printInvoiceData = res.orders;
      // this.downloadInvoicePDF(this.printInvoiceData);
      // $('#print-invoices').modal("show");
      // //console.log(this.printInvoiceData);
      this.dbService.clear('shub').subscribe((successDeleted) => {
        //console.log('success? ', successDeleted);
      });
      this.datasharingService.printOrdersData = this.printInvoiceData;
      // localStorage.setItem('printDate', JSON.stringify(this.printInvoiceData));
      this.dbService
        .add('shub', {
          key: 'printData',
          value: JSON.stringify(this.printInvoiceData),
        })
        .subscribe((key) => {
          //console.log('key: ', key);
        });
      // this.router.navigate(['/something/create']);
      let link = environment.ui_base_url + 'printinvoice';
      await this.delay(400);
      this.router.navigate([]).then(result => { window.open(link, '_blank'); });
    }, error => {
      this.loading = false;
    });
  }
  dcSplitOrder() {
    $('#split-order').modal('show');
    this.getDcOrderItems();
  }
  onDpdSelect(event) {
    console.log(event);
    this.loading = true;
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.salsesOrdersService.addShippingMethod(ids, event).subscribe(res => {
      this.loading = false;
    }, error => {
      this.getDefaultData();
      this.getPrinters();
      this.selectShippingMethod = false;
      this.shippingMethodSelected = false;
      this.shippingservice = '';
      this.shippingMethod = '';
      this.loading = false;
    });
  }
  onRMSelect(event) {
    console.log(event); this.loading = true;
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.salsesOrdersService.addShippingMethod(ids, event).subscribe(res => {
      this.loading = false;
    }, error => {
      this.getDefaultData();
      this.getPrinters();
      this.selectShippingMethod = false;
      this.shippingMethodSelected = false;
      this.shippingservice = '';
      this.shippingMethod = '';
      this.loading = false;
    });
  }
  onFedExSelect(event) {
    console.log(event); this.loading = true;
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.salsesOrdersService.addShippingMethod(ids, event).subscribe(res => {
      this.loading = false;
    }, error => {
      this.getDefaultData();
      this.getPrinters();
      this.selectShippingMethod = false;
      this.shippingMethodSelected = false;
      this.shippingservice = '';
      this.shippingMethod = '';
      this.loading = false;
    });
  }
  onDhlSelect(event) {
    console.log(event); this.loading = true;
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.salsesOrdersService.addShippingMethod(ids, event).subscribe(res => {
      this.loading = false;
    }, error => {
      this.getDefaultData();
      this.getPrinters();
      this.selectShippingMethod = false;
      this.shippingMethodSelected = false;
      this.shippingservice = '';
      this.shippingMethod = '';
      this.loading = false;
    });
  }
  onAmazonSelect(event) {
    console.log(event);
    this.loading = true;
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.salsesOrdersService.addShippingMethod(ids, event).subscribe(res => {
      this.loading = false;
    }, error => {
      this.getDefaultData();
      this.getPrinters();
      this.selectShippingMethod = false;
      this.shippingMethodSelected = false;
      this.shippingservice = '';
      this.shippingMethod = '';
      this.loading = false;
    });
  }
  onDCDpdSelect(event) {
    this.shippingMethod_v2 = event;
  }
  onDCFedSelect(event) {
    this.shippingMethod_v2 = event;
  }
  onDCDhlSelect(event) {
    this.shippingMethod_v2 = event;
  }
  onDCRMSelect(event) {
    this.shippingMethod_v2 = event;
  }
  onDCAmazonSelect(event) {
    this.shippingMethod_v2 = event;
  }
  keyPressAlphanumeric(event: any) {

    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  public get inverseOfTranslation(): string {
    if (!this.viewPort || !this.viewPort["_renderedContentOffset"]) {
      return "-0px";
    }
    let offset = this.viewPort["_renderedContentOffset"];
    return `-${offset}px`;
  }

  ngDoCheck(): void {
    if (this.datasharingService.salesPageRefresh) {
      this.channelType = [];
      this.ngOnInit();
      this.datasharingService.salesPageRefresh = false;
    }
  }

  logozoom() {
    $('.zoom-gallery').magnificPopup({
      delegate: 'a',
      type: 'image',
      closeOnContentClick: false,
      closeBtnInside: false,
      mainClass: 'mfp-with-zoom mfp-img-mobile',
      image: {
        verticalFit: true,
        titleSrc: function (item) {
          return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
        }
      },
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true,
        duration: 300, // don't foget to change the duration also in CSS
        opener: function (element) {
          return element.find('img');
        }
      }

    });
  }
  getChannelRegistration() {
    this.salsesOrdersService.getChannelRegistration().subscribe(res => {
      // console.log(res);
      this.channels = res;
      this.channels.forEach(sale => this.selectedChannel.push(sale.id));
      console.log(this.selectedChannel)
    }, error => {
      this.loading = false;
    })
  }
  refresh() {
    this.isEdit = false;
    this.collectionsize = environment.defaultTotalValue;
    this.pageSize = 50;
    this.getDefaultData();
    this.getPrinters();
    let ip: usertrackInput = { menu: TrackMenus.ORDERS, submenu: subMenus.SALESORDERS, page: pages.SALESORDERSPAGE, function: "", descrption: "Apply filter button is clicked" };
    this.appTrackingService.trackUserActivity(ip);
  }
  filterChange(evt: any) {
    ////console.log(evt);
  }

  allSalesV2 = [];
  splitOrderItem: any = 0;
  getDefaultData(pagenum: number = 1) {
    this.isAllCheckedDown = false;
    this.loading = true;
    this.orederIsSelected = false;
    this.selectedItemsLength = 0;
    this.allSales.map((i: any) => i.selected = false);
    this.selectedFilter = this.tab == 'error_labels' ? ["12-4"] : ["11-3", "13-4"];
    this.filterBy.forEach(sale => this.selectedFilter.push(sale.id));
    this.selectedChannel = [];
    console.log(this.channelType)
    this.channelType.forEach(sale => this.selectedChannel.push(sale.id));
    console.log(this.selectedChannel)
    this.salsesOrdersService.getSalesOrders(pagenum, this.collectionsize ? this.collectionsize : 0, this.pageSize, this.selectedChannel, this.selectedFilter, this.searchname, this.searchValue2, '000', null, true, this.fliter, '000', this.splitOrderItem, this.isOrdersView).subscribe((sales_orders: any) => {

      this.allSales = sales_orders?.sales || [];
      if(this.isOrdersView){
        this.isSalesOrdersView = true;
        sales_orders?.channelSales.forEach(cs => {
          cs['product'] = sales_orders?.products.filter(p => p.sku == cs.sku);
        });
        sales_orders?.orders.forEach(o => {
          o.channelSales = sales_orders?.channelSales?.filter(cs => cs.channelOrderId == o.id);
          o.selected = false;
          o.isExpand = false;
        });
        this.allSales = sales_orders?.orders || [];
      } else {
        this.isSalesOrdersView = false;
      }
      console.log(sales_orders);
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
      this.collectionsize = sales_orders?.page?.totalResults;
      this.loading = false;
      // ////console.log(this.allSales);
    }, error => {
      this.loading = false;
    });
  }
  getSplitOrders() {
    this.loading = true;
    this.orederIsSelected = false;
    this.selectedItemsLength = 0;
    this.splitOrderItem = 1;
    this.allSales.map((i: any) => i.selected = false);
    this.selectedFilter = this.tab == 'error_labels' ? ["12-4"] : ["11-3", "13-4"];
    this.filterBy.forEach(sale => this.selectedFilter.push(sale.id));
    this.selectedChannel = [];
    console.log(this.channelType)
    this.channelType.forEach(sale => this.selectedChannel.push(sale.id));
    console.log(this.selectedChannel)
    this.salsesOrdersService.getSalesOrders(1, this.collectionsize ? this.collectionsize : 0, this.pageSize, this.selectedChannel, this.selectedFilter, this.searchname, this.searchValue2, '000', null, true, this.fliter, '000', this.splitOrderItem).subscribe((sales_orders: any) => {
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
      this.collectionsize = sales_orders?.page?.totalResults;
      this.loading = false;
      // ////console.log(this.allSales);
    }, error => {
      this.loading = false;
    });
  }
  reset() {
    this.isEdit = false;
    let userdetails = localStorage.getItem('userId');
    if (userdetails == '2707' || userdetails == '2709') {
      this.fliter = '1';
    } else {
      this.fliter = '0';
    }
    this.channelType = [];
    this.filterBy = [{ id: '2-0', name: 'Unshipped Orders' }];
    this.searchname = '0';
    this.searchValue2 = '';
    this.selectShippingMethod = false;
    this.shippingMethodSelected = false;
    this.shippingservice = '';
    this.shippingMethod = '';
    this.splitOrderItem = 0;
    this.getDefaultData();
    this.getPrinters();
    let ip: usertrackInput = { menu: TrackMenus.ORDERS, submenu: subMenus.SALESORDERS, page: pages.SALESORDERSPAGE, function: "", descrption: "Reset button is clicked" };
    this.appTrackingService.trackUserActivity(ip);
  }


  async openPdf(sale: any) {
    ////console.log(pdf);
    // await this.createPdfSkus(await this.pdftoblobService.getBlob([sale?.labelPdfs]), sale);
    window.open(sale, "_blank");

  }

  updatePrintedStatus(sale: any) {
    this.salsesOrdersService.updateLableUpdatedSTatus(sale.channelSales[0].channelOrderId).subscribe(res => {
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  isAllChecked: boolean = false;
  selectall(event: any) {
    ////console.log("selectall", event.target.value);
    this.isAllChecked = event.target.checked
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
    // this.goToErrorLabels();
    this.cdref.detectChanges();
  }
  orederIsSelectedForEdit = false;
  selectedItemsLength: any;
  individualselection(event: any, event1: any) {
    event.selected = event1.target.checked;

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
    if (selectedItems.length == this.allSales.length) {
      this.isAllChecked = true;
    } else {
      this.isAllChecked = false;
    }
    this.cdref.detectChanges();
  }
  storePdfObj(sale: any) {
    // if (sale?.labelPdfs?.length > 0) {
    //   this.storePdfFiles(sale?.labelPdfs[0])
    // }
  }

  modalclosed() {
    $('#search-modal').modal('hide');
  }
  changespage(pagenum: any) {
    ////console.log(pagenum);
    this.getDefaultData(pagenum);
    this.getPrinters();
  }
  changePageSize() {
    this.getDefaultData();
    this.getPrinters();
  }

  getImage(img: string) {
    return 'https://s3-us-west-1.amazonaws.com/khubweb/web/kartzhub' + img + '.png';
  }

  getSiteImage(img: string) {
    return 'https://s3-us-west-1.amazonaws.com/khubweb/web/' + img + '.png';
  }

  createOrderTab() {
    let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.created_order };
    this.datasharingService.addtoTab(menu);
    let ip: usertrackInput = { menu: TrackMenus.ORDERS, submenu: subMenus.SALESORDERS, page: pages.SALESORDERSPAGE, function: "", descrption: "Create order  button is clicked" };
    this.appTrackingService.trackUserActivity(ip);
  }




  openDownloadOrders() {
    this.loading = true;
    this.state = 1;
    $('#download-orders').modal('show');
    this.getChannelsForOrders();
    let ip: usertrackInput = { menu: TrackMenus.ORDERS, submenu: subMenus.SALESORDERS, page: pages.SALESORDERSPAGE, function: "", descrption: "Download orders button is clicked" };
    this.appTrackingService.trackUserActivity(ip);
  }
  modalDownloadOrdersclosed() {
    this.state = 0;
    $('#download-orders').modal('hide');
  }

  allDownloadChannels: any = [];
  getChannelsForOrders() {
    this.allDownloadChannels = [];
    this.timePeriod = '';
    this.isSaveEnable = false;
    this.salsesOrdersService.downloadordersfromchannels().subscribe((res: any) => {
      ////console.log(res);
      this.allDownloadChannels = res;
      this.allDownloadChannels.map(down => down.selected = false);
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  isAllCheckedDown: boolean = false;
  timePeriod: any = '';
  isSaveEnable: boolean = false;
  selectallchannel(event: any) {
    this.isAllCheckedDown = !this.isAllCheckedDown;

    this.allDownloadChannels.map(down => down.selected = this.isAllCheckedDown);
  }
  individualselectionchannel(event: any) {
    event.selected = true;
  }
  durationChange() {
    this.isSaveEnable = true;
  }
  SaveDownloadOrders() {
    this.loading = true;
    let selectedOrders = this.allDownloadChannels.filter(down => down.selected == true);
    if (selectedOrders.length > 0) {
      const ids = selectedOrders.map(ord => ord.id);
      this.salsesOrdersService.savedownloadordersfromchannels(ids, this.timePeriod).subscribe(res => {
        this.toasterService.openToastMessage(ToastTypes.success, "Sellershub", "Successfully Saved");
        this.modalDownloadOrdersclosed();
        this.loading = false;
      }, error => {
        this.loading = false;
      })
    } else {
      this.toasterService.openToastMessage(ToastTypes.warning, "", "Please select at least one channel");
      this.loading = false;
    }
  }
  SaveDispatchConsole() {

  }
  modalDispatchclosed() {
    $('#dispatch-orders').modal('hide');
    this.searchDetails = false;
  }
  openlDispatchOrders() {
    $('#dispatch-orders').modal('show');
    // this.getChannelsForOrders();
  }
  dispatch_order_id = '';
  batch_order_id = '';
  dispatch_bar_code = '';
  searchDetails: boolean = false;
  selectedOrderDet: any;
  getDetails() {
    // let selectedItems = this.allSales.filter(sale => sale.selected == true);
    // const ids = selectedItems.map(ord => ord.id);
    if (this.dispatch_order_id != '') {
      this.salsesOrdersService.searchOrderTrackingId(this.dispatch_order_id, 1).subscribe((res: any) => {
        ////console.log(res);
        this.searchDetails = true;
        this.selectedOrderDet = res;
        this.onGoingOrderDet = this.selectedOrderDet.channelSales[0];
        this.trackNumber = this.onGoingOrderDet.currentSale[0].trackingNumber;
        this.shippingCarrier_v2 = this.onGoingOrderDet.currentSale[0].carrierName;
        this.shippingMethod_v2 = this.onGoingOrderDet.currentSale[0].shippingMethod;
      }, error => {
        this.loading = false;
      })
    } else {

    }

  }

  totalOrders: any = 0;
  remainingOrders: any = 0;
  dispatchedOrders: any = 0;

  onGoingOrderDet: any;

  getDetailsBasedOnId() {
    this.openlDispatchOrders();
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.salsesOrdersService.searchOrderTrackingId(ids[0], 1).subscribe((res: any) => {
      ////console.log(res);
      this.searchDetails = true;
      this.selectedOrderDet = res;
      this.onGoingOrderDet = this.selectedOrderDet.channelSales[0];
      this.onGoingOrderDet?.currentSale.map(lb => lb.selected = true);
      if (this.onGoingOrderDet?.currentSale.length === 1) {
        this.onGoingOrderDet.currentSale[0].selected = true;
        this.isAllOrdersChecked = true;
      }
      this.onGoingOrderDet?.currentSale.forEach(sale => sale.selected == true)
      this.trackNumber = this.onGoingOrderDet.currentSale[0].trackingNumber;
      this.shippingCarrier_v2 = this.onGoingOrderDet.currentSale[0].carrierName;
      this.shippingMethod_v2 = this.onGoingOrderDet.currentSale[0].shippingMethod;
      this.totalOrders = this.selectedOrderDet.channelSales.length;
      this.exportCarriers_v2 = this.selectedOrderDet.channelSales[0];
    }, error => {
      this.loading = false;
    });
  }



  confirmorderpayment() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to mark these orders as payment received?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result?.value) {
        let selectedItems = this.allSales.filter(sale => sale.selected == true);
        if (selectedItems.length == 0) {
          this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Please Select atleast one order');
          this.loading = false;
          return;
        }
        const ids = selectedItems.map(ord => ord.id);
        this.salsesOrdersService.confirmorderpayment(ids).subscribe((res: any) => {
          this.toasterService.openToastMessage(ToastTypes.success, "Sellershub", "Payment Confirmed Successfully");
          this.getDefaultData();
          this.getPrinters();
        }, error => {
          this.loading = false;
        });
        Swal.fire(
          'Payment Success!',
          'Your payment has confirmed.',
          'success'
        )
      }
    });
  }
  orderProcess() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to Process the order?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result?.value) {
        let selectedItems = this.allSales.filter(sale => sale.selected == true);
        if (selectedItems.length == 0) {
          this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Please Select atleast one order');
          this.loading = false;
          return;
        }
        const ids = selectedItems.map(ord => ord.id);
        this.salsesOrdersService.orderProcess(ids).subscribe((res: any) => {
          this.toasterService.openToastMessage(ToastTypes.success, "Sellershub", "Order Processed Successfully");
          this.getDefaultData();
          this.getPrinters();
        }, error => {
          this.loading = false;
        });
        Swal.fire(
          'Order Processed!',
          'Your order process has done.',
          'success'
        )
      }
    });
  }

  checKInvoiceForBulkEmail(event) {
    if (event.target.checked) {
      this.bEmailInfo.defaultsettings.invoiceOnly = true;
    } else {
      this.bEmailInfo.defaultsettings.invoiceOnly = false;
    }
  }
  checKLabelsForBulkEmail(event) {
    if (event.target.checked) {
      this.bEmailInfo.defaultsettings.attachLabel = true;
    } else {
      this.bEmailInfo.defaultsettings.attachLabel = false;
    }
  }
  checKPricesForBulkEmail(event) {
    if (event.target.checked) {
      this.bEmailInfo.defaultsettings.dontShowPrices = true;
    } else {
      this.bEmailInfo.defaultsettings.dontShowPrices = false;
    }
  }
  checKCallBackUrlForBulkEmail(event) {
    if (event.target.checked) {
      this.bEmailInfo.defaultsettings.includeOrderConfirmationCallbackUrl = true;
    } else {
      this.bEmailInfo.defaultsettings.includeOrderConfirmationCallbackUrl = false;
    }
  }

  bulkemail() {
    this.loading = true;
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    let attachLabel = this.bEmailInfo?.defaultsettings?.attachLabel;
    let dontShowPrices = this.bEmailInfo?.defaultsettings?.dontShowPrices;
    let includeOrderConfirmationCallbackUrl = this.bEmailInfo?.defaultsettings?.includeOrderConfirmationCallbackUrl;
    let invoiceOnly = this.bEmailInfo?.defaultsettings?.invoiceOnly;
    if (selectedItems.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Please Select atleast one order');
      this.loading = false;
      return;
    }
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.salsesOrdersService.sendEmailBulk(ids, attachLabel, dontShowPrices, includeOrderConfirmationCallbackUrl, invoiceOnly).subscribe((res: any) => {
      this.getDefaultData();
      this.getPrinters();
      this.toasterService.openToastMessage(ToastTypes.success, "Sellershub", "Email Sent Successfully");
      this.modalActionclosed();
      this.loading = false;
    }, error => {
      this.getDefaultData();
      this.getPrinters();
      this.toasterService.openToastMessage(ToastTypes.success, "Sellershub", "Email Sent Successfully");
      this.modalActionclosed();
      this.loading = false;
    });
  }

  allItemForCancel: any = [];
  ordercancel() {
    this.loading = true;
    this.allItemForCancel = [];
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    if (selectedItems.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Please Select atleast one order');
      this.loading = false;
      return;
    }
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.salsesOrdersService.getDetailsBasedOnId(ids, 1).subscribe((res: any) => {
      ////console.log(res);
      this.allItemForCancel = res?.channelSales;//ord.selected = false
      this.allItemForCancel.map(ord => ord.currentSale.map(co => co.selected = false));
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  isAllOrderCancel: boolean = false;
  selectallOrderCancel($event) {
    this.isAllOrderCancel = !this.isAllOrderCancel;
    // this.allItemForCancel.map(ord => ord.selected = this.isAllOrderCancel);
    this.allItemForCancel.map(ord => ord.currentSale.map(co => co.selected = this.isAllOrderCancel));
  }
  individualCancelSelection(ord: any) {
    let cSale = this.allItemForCancel.find(ao => ao.orderId == ord.orderId).currentSale;
    ////console.log(cSale);
    cSale.find(ao => ao.id == ord.id).selected = !cSale.find(ao => ao.id == ord.id).selected;
  }
  onCancelReasonSelect(event) {
    console.log(event)
    // this.allItemForCancel.forEach(item => {
    //   item['cancelreason'] = event.id
    // });
    this.allItemForCancel.forEach(it => {
      it.currentSale.forEach(item => {
        item['cancelreason'] = event.id
      });
      // it['cancelreason'] = event.id
    });
    this.allItemForCancel.map(ord => ord.cancelreason = event.id);
  }
  cancelSelectedOrders() {
    let selectedOrdersForCancel = this.allItemForCancel.map(ord => ord.cancelreason);
    // let ids = this.allItemForCancel.map(ord => ord.currentSale.map(cs=>cs.id));
    let ids = [];
    this.allItemForCancel.forEach(it => {
      it.currentSale.forEach(item => {
        ids.push(item.id);
      });
    });

    const inputData = { cancelreason: selectedOrdersForCancel, ids: ids };
    this.salsesOrdersService.cancelOrder(inputData).subscribe((res: any) => {
      this.getDefaultData();
      this.getPrinters();
      this.modalActionclosed();
      this.toasterService.openToastMessage(ToastTypes.success, "Sellershub", "Order Cancelled Successfully");
    }, error => {
      this.toasterService.openToastMessage(ToastTypes.warning, "Sellershub", error.message);
      this.loading = false;
    });
  }
  openNote() {

  }

  selectedMenu = '';
  openActionModal(selectedMenu: string) {
    this.selectedMenu = selectedMenu;
    if (this.selectedMenu == 'Bulk email')
      this.getEmailInfo();
    if (this.selectedMenu == 'Cancel orders')
      this.ordercancel()
    if (this.selectedMenu == 'Ship orders')
      this.findOrdersForShipping();
    this.getEmailInfo();
    if (this.selectedMenu == 'Notes')
      this.getNotes();
    $('#action-modal').modal('show');
  }

  bEmailInfo: any;
  getEmailInfo() {
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    const ids = selectedItems.map(ord => ord.id);
    this.salsesOrdersService.getEmailInfo(ids).subscribe((res: any) => {
      ////console.log(res);
      this.bEmailInfo = res;
    }, error => {
      this.loading = false;
    });
  }


  sendEmail() {
    // this.salsesOrdersService.sendEmailBulk(ids).subscribe((res: any) => {
    //   ////console.log(res);
    //   this.bEmailInfo = res;
    // });
  }


  modalActionclosed() {
    $('#action-modal').modal('hide');
    this.getDefaultData();
    this.getPrinters();
  }
  selectedFormDate(event: any) {
    ////console.log(event)
  }
  applySeachDate() {

  }
  isPrintLabelSelectAll: boolean = true;
  selectedLabelssLength: any;
  changePrintLabelSelectAll() {
    this.isPrintLabelSelectAll = !this.isPrintLabelSelectAll;

    if (this.isPrintLabelSelectAll) {
      this.labeledOrders.map(lb => lb.selected = true);
    } else {
      this.labeledOrders.map(lb => lb.selected = false);
    }
    let selectedItems = this.labeledOrders.filter(sale => sale.selected == true);
    this.selectedLabelssLength = selectedItems.length;
  }
  changePrintLabelSelectAllv2(ordDetails: any) {
    ordDetails.selected = !ordDetails.selected;
    let selectedItems = this.labeledOrders.filter(sale => sale.selected == true);
    this.selectedLabelssLength = selectedItems.length;
  }
  pdfDoc: PDFDocument;
  async printLabel() {
    let labeledOrder: any = [], labeledOrderId: any;
    this.labelsPrintd.filter(element => {
      labeledOrderId = element.orderId
    });
    console.log(labeledOrderId);
    labeledOrder = this.allSales.filter(sale => sale.allOrderId == labeledOrderId);
    console.log(labeledOrder)
    let selectedItems = labeledOrder.filter(sale => sale.labelPdfs.length > 0);

    // if (selectedItems.length == 0) {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Please Select atleast one label generated order');
    //   return;
    // }

    this.pdfDoc = await PDFDocument.create();
    this.loading = true;
    let fnames = [];

    for (var i = 0; i < selectedItems.length; i++) {
      let ur = selectedItems[i];
      console.log(ur);
      let lablePDF = ur.labelPdfs[0];
      let fileName = lablePDF.split("/");
      fnames.push(fileName[(fileName.length - 1)]);

    }
    let self = this;
    // console.log(fnames);
    // this.loading = false;
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', self.pdftoblobService.getBlob(fnames), true);

    // xhr.responseType = 'arraybuffer';

    // // Process the response when the request is ready.
    // xhr.onload = function (e) {
    //   if (this.status == 200) {
    //     // Create a binary string from the returned data, then encode it as a data URL.
    //     var blob = new Blob([this.response], { type: 'pdf' });
    //     console.log(blob)
    //     self.createPdfSkus(blob, selectedItems);

    //   }
    // };
    // let authToken = localStorage.getItem("userToken");
    // xhr.setRequestHeader('Authorization', authToken);
    // xhr.send();
    // const blob = ;

    //  console.log(blob);
    let blob = await this.pdftoblobService.getBlob(fnames);
    let file = new Blob([blob], { type: 'application/pdf' });
    let fileURL = URL.createObjectURL(file);
    window.open(fileURL);
    // await this.createPdfSkus(await this.pdftoblobService.getBlob(fnames), selectedItems);
    this.loading = false;
    // let link = environment.ui_base_url + "printlabels";
    // localStorage.setItem('pdf', JSON.stringify(selectedItems));
    // await this.delay(400);
    // this.router.navigate([]).then(result => { window.open(link, '_blank'); });

  }
  async printLabelsTest() {
    let selectedItems = this.allSales.filter(sale => sale.selected == true && sale.labelPdfs.length > 0);
    if (selectedItems.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Please Select atleast one label generated order');
      this.loading = false;
      return;
    }
    this.pdfDoc = await PDFDocument.create();
    this.loading = true;
    let fnames = [];

    for (var i = 0; i < selectedItems.length; i++) {
      let ur = selectedItems[i];
      console.log(ur);
      let lablePDF = ur.labelPdfs[0];
      let fileName = lablePDF.split("/");
      fnames.push(fileName[(fileName.length - 1)]);

    }
    let self = this;
    // console.log(fnames);
    // this.loading = false;
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', self.pdftoblobService.getBlob(fnames), true);

    // xhr.responseType = 'arraybuffer';

    // // Process the response when the request is ready.
    // xhr.onload = function (e) {
    //   if (this.status == 200) {
    //     // Create a binary string from the returned data, then encode it as a data URL.
    //     var blob = new Blob([this.response], { type: 'pdf' });
    //     console.log(blob)
    //     self.createPdfSkus(blob, selectedItems);

    //   }
    // };
    // let authToken = localStorage.getItem("userToken");
    // xhr.setRequestHeader('Authorization', authToken);
    // xhr.send();
    // const blob = ;

    //  console.log(blob);
    let blob = await this.pdftoblobService.getBlob(fnames);
    let file = new Blob([blob], { type: 'application/pdf' });
    let fileURL = URL.createObjectURL(file);
    window.open(fileURL);
    // await this.createPdfSkus(await this.pdftoblobService.getBlob(fnames), selectedItems);
    this.loading = false;
    // let link = environment.ui_base_url + "printlabels";
    // localStorage.setItem('pdf', JSON.stringify(selectedItems));
    // await this.delay(400);
    // this.router.navigate([]).then(result => { window.open(link, '_blank'); });

  }
  confirmShipmentTest() {
    const obj = {
      carriers: [],
      // dimensionH: [],
      // dimensionL: [],
      // dimensionW: [],
      dispatchDates: [],
      ids: [],
      orderIds: [],
      ordercomment: [],
      // packagemethod: null,
      // parcel: [],
      // serviceformats: [],
      shippingMethods: [],
      status: [],
      trackingIds: [],
      // weight: []
    }
    // this.labeledOrders.forEach(shipment => {
    //   shipment.channelSales.forEach(cs => {
    //     obj.carriers.push(cs.carrierName);
    //     obj.ids.push(cs.id);
    //     if (cs.trackingNumber != null)
    //       obj.trackingIds.push(cs.trackingNumber);
    //     else
    //       obj.trackingIds.push("");

    //     obj.shippingMethods.push(cs.shippingMethod);
    //     obj.dispatchDates.push(cs.dispatchDate);
    //     obj.status.push("enabled");
    //     if (cs.serialNumber != null)
    //       obj.ordercomment.push(cs.serialNumber);
    //     else
    //       obj.ordercomment.push("");

    //   })
    // });
    let labeledOrder: any = [], labeledOrderId: any;
    this.labelsPrintd.filter(element => {
      labeledOrderId = element.orderId
    });
    labeledOrder = this.allSales.filter(sale => sale.allOrderId == labeledOrderId);
    let selectedItems = labeledOrder.filter(sale => sale.labelPdfs.length > 0);
    selectedItems.forEach(ord => {
      ord.channelSales.forEach(data => {
        obj.carriers.push(data.carrierName);
        obj.ids.push(data.id);
        if (data.trackingNumber != null)
          obj.trackingIds.push(data.trackingNumber);
        else
          obj.trackingIds.push("");

        obj.shippingMethods.push(data.shippingMethod);
        obj.dispatchDates.push(data.dispatchDate);
        obj.status.push("enabled");
        if (data.serialNumber != null)
          obj.ordercomment.push(data.serialNumber);
        else
          obj.ordercomment.push("");
      });
    })

    this.salsesOrdersService.connfirmShipment(obj).subscribe((res: any) => {
      ////console.log(res);
      this.toasterService.openToastMessage(ToastTypes.warning, 'Shipment confirmation', 'Shipment confirmed');
      this.loading = false;
      // this.modalActionclosed();

    }, error => {
      this.loading = false;
    })
  }
  async printCustomLabels() {
    let labeledOrder: any = [], labeledOrderId: any;
    this.labelsPrintd.filter(element => {
      labeledOrderId = element.orderId
    });
    console.log(labeledOrderId)
    console.log(this.allSales)
    labeledOrder = this.allSales.filter(sale => sale.allOrderId == labeledOrderId);
    console.log(labeledOrder)
    let selectedItems = labeledOrder.filter(sale => sale.labelPdfs.length > 0);
    console.log(selectedItems)
    // if (selectedItems.length == 0) {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Please Select atleast one label generated order');
    //   return;
    // }
    this.pdfDoc = await PDFDocument.create();
    this.loading = true;
    let fnames = [];

    for (var i = 0; i < selectedItems.length; i++) {
      let ur = selectedItems[i];
      console.log(ur);
      let lablePDF = ur.labelPdfs[0];
      let fileName = lablePDF.split("/");
      fnames.push(fileName[(fileName.length - 1)]);

    }
    let self = this;
    // console.log(fnames);
    // this.loading = false;
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', self.pdftoblobService.getBlob(fnames), true);

    // xhr.responseType = 'arraybuffer';

    // // Process the response when the request is ready.
    // xhr.onload = function (e) {
    //   if (this.status == 200) {
    //     // Create a binary string from the returned data, then encode it as a data URL.
    //     var blob = new Blob([this.response], { type: 'pdf' });
    //     console.log(blob)
    //     self.createPdfSkus(blob, selectedItems);

    //   }
    // };
    // let authToken = localStorage.getItem("userToken");
    // xhr.setRequestHeader('Authorization', authToken);
    // xhr.send();
    // const blob = ;

    //  console.log(blob);
    await this.createPdfSkus(await this.pdftoblobService.getBlob(fnames), selectedItems);
    this.loading = false;
    // let link = environment.ui_base_url + "printlabels";
    // localStorage.setItem('pdf', JSON.stringify(selectedItems));
    // await this.delay(400);
    // this.router.navigate([]).then(result => { window.open(link, '_blank'); });

  }
  async printCustomLabelsTest() {
    let selectedItems = this.allSales.filter(sale => sale.selected == true && sale.labelPdfs.length > 0);
    if (selectedItems.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Please Select atleast one label generated order');
      this.loading = false;
      return;
    }
    this.pdfDoc = await PDFDocument.create();
    this.loading = true;
    let fnames = [];

    for (var i = 0; i < selectedItems.length; i++) {
      let ur = selectedItems[i];
      console.log(ur);
      let lablePDF = ur.labelPdfs[0];
      let fileName = lablePDF.split("/");
      fnames.push(fileName[(fileName.length - 1)]);

    }
    let self = this;
    // console.log(fnames);
    // this.loading = false;
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', self.pdftoblobService.getBlob(fnames), true);

    // xhr.responseType = 'arraybuffer';

    // // Process the response when the request is ready.
    // xhr.onload = function (e) {
    //   if (this.status == 200) {
    //     // Create a binary string from the returned data, then encode it as a data URL.
    //     var blob = new Blob([this.response], { type: 'pdf' });
    //     console.log(blob)
    //     self.createPdfSkus(blob, selectedItems);

    //   }
    // };
    // let authToken = localStorage.getItem("userToken");
    // xhr.setRequestHeader('Authorization', authToken);
    // xhr.send();
    // const blob = ;

    //  console.log(blob);
    await this.createPdfSkus(await this.pdftoblobService.getBlob(fnames), selectedItems);
    this.loading = false;
    // let link = environment.ui_base_url + "printlabels";
    // localStorage.setItem('pdf', JSON.stringify(selectedItems));
    // await this.delay(400);
    // this.router.navigate([]).then(result => { window.open(link, '_blank'); });

  }
  async createPdfSkus(blob: any, selectedItems: any) {


    console.log(blob)
    const existingPdfBytes = await blob.arrayBuffer();
    console.log(existingPdfBytes);
    // // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    // Get the first page of the document
    const pages = pdfDoc.getPages();
    for (let i = 0; i < selectedItems.length; i++) {
      const page = pages[i];
     // page.setSize(PageSizes.A4[0],PageSizes.A4[1]);
      //page.setTrimBox()
      // page.setWidth(page.getWidth() + 50);
      // page.setMediaBox(-30, 10, page.getWidth()-50, page.getHeight());

      await this.getTemplate(selectedItems[i].field12, page, selectedItems[i], pdfDoc);

    }
    const pdfBytes = await pdfDoc.save()
    let file = new Blob([pdfBytes], { type: 'application/pdf' });
    console.log(file)
    let fileURL = URL.createObjectURL(file);
    if (this.selectedPrinter) {
      window.open(fileURL);
      this.createPrintJobs(blob, selectedItems);
    } else {
      window.open(fileURL);
    }


  }
  async createPrintJobs(blob: any, selectedItems: any = null) {
    const reader = new FileReader();
    const self = this;
    reader.readAsDataURL(blob);
    new Promise(resolve => {
      reader.onloadend = () => {
        const data = {
          printerId: this.selectedPrinter,
          status: 'OPEN',
          pdfString: reader.result,
          jobId: Date.parse(new Date().toISOString())
        }
        this.salsesOrdersService.createPrintjob(data).subscribe(res => {
          this.toasterService.openToastMessage(ToastTypes.success, "Success", "Print Job Created");
          this.loading = false;
        }, error => {
          this.loading = false;
        })

      };
    });

  }

  async appendData(page: PDFPage, fields: any, j: any, k: any, selectedItem, pdfDoc: PDFDocument) {
    const { width, height } = page.getSize()
    //page.setSize(128 * 3, 570);
    //console.log() 238,432
    // Draw a string of text diagonally across the first page
    let heightY = height - (j * (height / 10));
    for (let index = 0; index < fields.length; index++) {
      if (fields[index].key == '${product_image!}' && selectedItem.imageUrl) {

        const pngImageBytes = await fetch(selectedItem.imageUrl).then((res) => res.arrayBuffer(), (e) => { return null });
        if (pngImageBytes) {
          heightY = heightY - 30;
          const pngImage = await pdfDoc.embedJpg(pngImageBytes)

          page.drawImage(pngImage, {
            x: k * (width / 3) ? k * (width / 3) : 5,
            y: heightY,
            width: 30,
            height: 30,
          })
        }

      } else {
        heightY = heightY - 11;
        page.drawText(this.getTextForLabel(fields[index], selectedItem), {
          x: k * (width / 3) ? k * (width / 3) : 5,
          y: heightY,
          size: 8,
          color: rgb(0, 0, 0)
        })
      }

    }


  }
  getTextForLabel(field: any, selectedItem): string {
    let text = '';
    switch (field.key) {
      case '${shippingname!}':
        text = text + ('shippingname : ' + (selectedItem['shippingname'] ? selectedItem['shippingname'] : ''));
        break;
      case '${address_line1!}':
        text = text + ('address_line1 : ' + (selectedItem['shipAddress1'] ? selectedItem['shipAddress1'] : ''));
        break;
      case '${address_line2!}':
        text = text + ('address_line2 : ' + (selectedItem['shipAddress2'] ? selectedItem['shipAddress2'] : ''));
        break;
      case '${address_line3!}':
        text = text + ('address_line3 : ' + (selectedItem['shipAddress3'] ? selectedItem['shipAddress3'] : ''));
        break;
      case '${city!}':
        text = text + ('city : ' + (selectedItem['shipCity'] ? selectedItem['shipCity'] : ''));
        break;
      case '${state!}':
        text = text + ('state : ' + (selectedItem['shipState'] ? selectedItem['shipState'] : ''));
        break;
      case '${postcode!}':
        text = text + ('postcode : ' + (selectedItem['shipPostalCode'] ? selectedItem['shipPostalCode'] : ''));
        break;
      case '${country!}':
        text = text + ('country : ' + (selectedItem['shipCountry'] ? selectedItem['shipCountry'] : ''));
        break;
      case '${ebay_record_number!}':
        text = text + '';
        break;
      case '${total_price!}':
        text = text + ('total_price : ' + (selectedItem['totalPrice'] ? selectedItem['totalPrice'] : ''));
        break;
      case '${qty!}':
        text = text + ('qty : ' + (selectedItem['quantityPurchased'] ? selectedItem['quantityPurchased'] : ''));
        break;
      case '${sku!}':
        text = text + ((selectedItem['sku'] ? selectedItem['sku'] : ''));
        break;
      case '${shipping_charge!}':
        text = text + ('shipping_charge : ' + (selectedItem['shippingPrice'] ? selectedItem['shippingPrice'] : ''));
        break;
      case '${order_id!}':
        text = text + ('order_id : ' + (selectedItem['orderId'] ? selectedItem['orderId'] : ''));
        break;
      case '${buyer_username!}':
        text = text + ('buyer_username : ' + (selectedItem['buyerName'] ? selectedItem['buyerName'] : ''));
        break;
      case '${order_notes!}':
        text = text + '';
        break;
      case '${invoice_no!}':
        text = text + '';
        break;
      case '${order_date!}':
        text = text + ('order_date : ' + (new Date(selectedItem['purchaseDate']) ? new Date(selectedItem['purchaseDate']).toLocaleString() : ''));
        break;
      case '${shipping_method!}':
        text = text + ('shipping_method : ' + (selectedItem['shippingMethod'] ? selectedItem['shippingMethod'] : ''));
        break;

      default:
        break;
    }
    return text;
  }

  async getTemplate(courierId, page, selectedItem, pdfDoc: PDFDocument) {

    // selectedItem.field12 = await this.pdftoblobService.getCarrier(selectedItem.field12);

    const template = selectedItem.field12 ? JSON.parse(selectedItem.field12) : {};
    if (template && template.rows && template.rows.length > 0) {
      if (template && template.rows && template.rows.length > 0) {
        for (let i = 0; i < template.rows.length; i++) {
          for (let j = 0; j < template.rows[i].cols.length; j++) {
            if (template.rows[i].cols[j].fields && template.rows[i].cols[j].fields.length > 0) {
              await this.appendData(page, template.rows[i].cols[j].fields, i, j, selectedItem, pdfDoc);
            }
          }
        }
      }
    }
    return template;
  }
  async printpicklistTest() {
    let labeledOrder: any = [], labeledOrderId: any;
    this.labelsPrintd.filter(element => {
      labeledOrderId = element.orderId
    });
    labeledOrder = this.allSales.filter(sale => sale.allOrderId == labeledOrderId);
    let selectedItems = labeledOrder.filter(sale => sale.labelPdfs.length > 0);
    this.loading = true;
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.salsesOrdersService.printInvoice(ids, 'default').subscribe(async (res: any) => {
      let data = res.orders;
      if (!data || data.length == 0) {
        this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Invalid data');
        this.loading = false;
      }
      let link = environment.ui_base_url + "printpicklist";
      this.dbService.clear('shub').subscribe((successDeleted) => {
        //console.log('success? ', successDeleted);
      });

      if (this.selectedPrinter) {
        this.printVirtualPickList({
          key: 'printpicklist',
          value: JSON.stringify(data),
        });

        this.loading = false;
      } else {
        this.dbService
          .add('shub', {
            key: 'printpicklist',
            value: JSON.stringify(data),
          })
          .subscribe((key) => {
            //console.log('key: ', key);
          });
        await this.delay(100);
        this.loading = false;
        this.router.navigate([]).then(result => { window.open(link, '_blank'); });
      }

    }, error => {
      this.loading = false;
    });

  }
  selectedOrderData_res: any = [];
  channelsalessku = [];
  header: any = [];
  selectedOrderDataPicklist: any = [];


  async printVirtualPickList(data: { key: string; value: string; }, isPackList = false) {
    let imgMap = new Map();
    let barcodeMap = new Map();
    this.selectedOrderData_res = JSON.parse(data.value);
    this.channelsalessku = []

    let headerCols = [];

    let count = 0;
    headerCols.push({ text: 'S.No', bold: true, fillColor: '#a9a9a9', width: 'auto' });
    let body = [];
    for (let index = 0; index < this.selectedOrderData_res.length; index++) {
      const order = this.selectedOrderData_res[index];
      this.header = !isPackList ? JSON.parse(order.channelUser.labelHeaderText) : JSON.parse(order.channelUser.labelFooterText);
      console.log(this.header)
      if (headerCols.length == 1) {
        this.header.forEach(i => headerCols.push({ text: i.displaycolumn, bold: true, fillColor: '#a9a9a9', width: 'auto' }));
        //body.push(headerCols);
        let h = [];
        for (let index = 0; index < headerCols.length; index++) {
          h.push(headerCols[index]);
          if ((index != 0 && (index + 1) % 6 == 0) || (index == headerCols.length - 1)) {
            while (h.length < 6) {
              h.push({ text: '' })
            }
            body.push(h);
            h = [];
          }

        }
      }
      // order.channelUser.labelHeaderText
      for (let i = 0; i < order.channelSales.length; i++) {
        const co = order.channelSales[i];
        co.category = order?.kartzhubProduct?.categories;
        let sale = this.channelsalessku.find(k => k.sku == co.sku)
        if (sale) {
          sale.quantityPurchased = sale.quantityPurchased + co.quantityPurchased;
        } else {
          let barcode = await this.getImageToBase64(co?.orderId);
          barcodeMap.set(co?.id, barcode);
          let img;
          try {
            let response = await fetch(co?.imageUrl);
            if (response.ok) {
              img = await response.blob();
              imgMap.set(co?.id, await this.blobToDataUrl(img));
              // Do something with the image blob here
            } else {
              imgMap.set(co?.id, this.pdftoblobService.img_not_available);
              console.error(`Error ${response.status}: ${response.statusText}`);
            }
          } catch (err) {
            imgMap.set(co?.id, this.pdftoblobService.img_not_available);
            console.error('Fetch error:', err);
          }


          count++;
          this.channelsalessku.push(co)
        }
        co.warehouseLocations = order?.kartzhubProduct?.warehouseLocations;
        co.quantity = order?.kartzhubProduct?.qty;
        if (co.upc == null) {
          if (order.kartzhubProduct == null) {
            co.upc = '';
          } else {
            co.upc = order.kartzhubProduct.upc;
          }
        }
        if (co.title == null) {

          if (order.kartzhubProduct == null) {
            co.title = '';
          } else {
            co.title = order.kartzhubProduct.title;
          }
        }

        this.selectedOrderDataPicklist.push(co);

      }

      if (index == this.selectedOrderData_res.length - 1) {
        for (let i = 0; i < this.selectedOrderDataPicklist.length; i++) {
          const co = this.selectedOrderDataPicklist[i];
          let row = [];


          for (let j = 0; j < headerCols.length; j++) {
            const head = headerCols[j];
            if (head.text != 'Image' && head.text != 'Barcode' && head.text != 'Order Date' && head.text != 'Category' && head.text != 'S.No') {
              row.push({ text: this.getValue(head.text, co), fillColor: ((i % 2) == 0) ? '#d3d3d3' : '#f5f5f5' });
            } else if (head.text == 'Order Date') {
              row.push({ text: formatDate(co.purchaseDate, 'dd/MM/yyyy', this.locale), fillColor: ((i % 2) == 0) ? '#d3d3d3' : '#f5f5f5' });
            } else if (head.text == 'Category') {
              row.push({ text: co.category, fillColor: ((i % 2) == 0) ? '#d3d3d3' : '#f5f5f5' });
            } else if (head.text == 'Image') {
              row.push({
                // if you specify both width and height - image will be stretched
                image: imgMap.get(co.id) ? imgMap.get(co.id) : this.pdftoblobService.img_not_available,
                width: 100,
                height: 40,
                fillColor: ((i % 2) == 0) ? '#d3d3d3' : '#f5f5f5'
              });
            } else if (head.text == 'Barcode') {
              row.push({
                // if you specify both width and height - image will be stretched
                image: barcodeMap.get(co.id) ? barcodeMap.get(co.id) : this.pdftoblobService.img_not_available,
                width: 100,
                height: 40,

                fillColor: ((i % 2) == 0) ? '#d3d3d3' : '#f5f5f5'
              });
            } else if (head.text == 'S.No') {
              row.push({ text: i + 1, fillColor: ((i % 2) == 0) ? '#d3d3d3' : '#f5f5f5' });
            }
            if ((j != 0 && (j + 1) % 6 == 0) || (j == headerCols.length - 1)) {
              while (row.length < 6) {
                row.push({ text: '' })
              }
              body.push(row);
              row = [];
            }
          }

        }

        let ob = {
          pageSize: 'A4',
          pageOrientation: 'portrait',
          pageMargins: [10, 10, 10, 10],
          content: [{
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 2,


              body: body
            }
          }],
          styles: {
            notesTitle: {
              fontSize: 10,
              bold: true,
              margin: [0, 50, 0, 3],
            },
            notesText: {
              fontSize: 10,
            },
          },
          defaultStyle: {
            columnGap: 20,
            //font: 'Quicksand',
          },
          head: {
            border: '5px solid black'
          },
          noBorder: {
            border: '0px solid black'
          },

        };
        //pdfMake.createPdf(ob).open();
        console.log(ob)
        const pdfDocGenerator = pdfMake.createPdf(ob);
        const self = this;
        pdfDocGenerator.getBlob((data) => {
          self.createPrintJobs(data)
        });

      }
    }


    this.selectedOrderDataPicklist = [];
    this.selectedOrderData_res = [];
    this.channelsalessku = [];
    this.header = [];

  }

  async printpicklist() {
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    if (selectedItems.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Please Select atleast one order');
      this.loading = false;
      return;
    }
    this.loading = true;
    let ids = []
    if(this.isOrdersView && this.isSalesOrdersView){
      ids = selectedItems.map(ord => ord.id)
    } else{
      ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    }

    this.salsesOrdersService.printInvoice(ids, 'default').subscribe(async (res: any) => {
      let data = res.orders;
      if (!data || data.length == 0) {
        this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Invalid data');
        this.loading = false;
      }
      let link = environment.ui_base_url + "printpicklist";
      this.dbService.clear('shub').subscribe((successDeleted) => {
        //console.log('success? ', successDeleted);
      });
      if (this.selectedPrinter) {
        this.printVirtualPickList({
          key: 'printpicklist',
          value: JSON.stringify(data),
        });
        // await this.delay(100);
        // this.downloadPDF('printPickList-pdf');

      } else {
        this.dbService
          .add('shub', {
            key: 'printpicklist',
            value: JSON.stringify(data),
          })
          .subscribe((key) => {
            //console.log('key: ', key);
          });
        await this.delay(100);
        this.loading = false;
        this.router.navigate([]).then(result => { window.open(link, '_blank'); });
      }

    }, error => {
      this.loading = false;
    });

  }

  getValue(head: any, order: any) {
    switch (head) {
      case 'Channel Order Id':
        return order.orderId ? order.orderId : '';
        break;
      case 'Sellershub Order Id':
        return order.channelOrderId ? order.channelOrderId : '';
        break;
      // case 'Order Date':
      //   //return order.purchaseDate;
      //   // var datePipe = new DatePipe(Utills.UK_DATE);
      //   order.purchaseDate = order.purchaseDate?this.datepipe.transform(order.purchaseDate,Utills.UK_DATE):'';
      //   break;
      case 'Postal Code':
        return order.shipPostalCode ? order.shipPostalCode : '';
        break;
      case 'Image':
        return order.imageUrl ? order.imageUrl : '';
        break;
      case 'SKU':
        return order.sku ? order.sku : '';
        break;
      case 'Quantity':
        return order.quantityPurchased ? order.quantityPurchased : '';
        break;
      case 'Line Cost':
        return order.itemPrice ? order.itemPrice : '';
        break;
      case 'Bin':
        return order.location ? order.location : '';
        break;
      case 'Item ID':
        return order.orderItemId ? order.orderItemId : '';
        break;
      case 'Channel':
        return order.channel ? order.channel : '';
        break;
      case 'Warehouse':
        return order.warehouse ? order.warehouse : '';
        break;
      case 'Stock Remaining':
        return order.quantity ? order.quantity : '';
        break;
      case 'Product Title':
        return order.title ? order.title : '';
        break;
      default:
        break;
    }
  }
  async printPackListTest() {
    let labeledOrder: any = [], labeledOrderId: any;
    this.labelsPrintd.filter(element => {
      labeledOrderId = element.orderId
    });
    labeledOrder = this.allSales.filter(sale => sale.allOrderId == labeledOrderId);
    let selectedItems = labeledOrder.filter(sale => sale.labelPdfs.length > 0);
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.loading = true;
    this.salsesOrdersService.printInvoice(ids, 'default').subscribe(async (res: any) => {
      ////console.log(res);

      let data = res.orders;
      if (!data || data.length == 0) {
        this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Invalid data');
        this.loading = false;
      }

      this.printInvoiceData = res.orders;
      // $('#print-invoices').modal("show");
      //console.log(data);
      let link = environment.ui_base_url + "printpacklist";
      this.dbService.clear('shub').subscribe((successDeleted) => {
        //console.log('success? ', successDeleted);
      });
      this.dbService
        .add('shub', {
          key: 'printpacklist',
          value: JSON.stringify(data),
        })
        .subscribe((key) => {
          //console.log('key: ', key);
        });
      // await this.delay(100);
      this.loading = false;
      this.router.navigate([]).then(result => { window.open(link, '_blank'); });
    }, error => {
      this.loading = false;
    });

  }
  async printPackList() {
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    if (selectedItems.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Please Select atleast one order');
      this.loading = false;
      return;
    }
    let ids = []
    if(this.isOrdersView && this.isSalesOrdersView){
      ids = selectedItems.map(ord => ord.id)
    } else{
      ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    }

    this.loading = true;
    this.salsesOrdersService.printInvoice(ids, 'default').subscribe(async (res: any) => {
      ////console.log(res);

      let data = res.orders;
      if (!data || data.length == 0) {
        this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Invalid data');
        this.loading = false;
      }

      this.printInvoiceData = res.orders;
      if (this.selectedPrinter) {
        this.printVirtualPickList({
          key: 'printpicklist',
          value: JSON.stringify(data),
        }, true);

      } else {
        // $('#print-invoices').modal("show");
        //console.log(data);
        let link = environment.ui_base_url + "printpacklist";
        this.dbService.clear('shub').subscribe((successDeleted) => {
          //console.log('success? ', successDeleted);
        });
        this.dbService
          .add('shub', {
            key: 'printpacklist',
            value: JSON.stringify(data),
          })
          .subscribe((key) => {
            //console.log('key: ', key);
          });
        await this.delay(100);
        this.loading = false;
        this.router.navigate([]).then(result => { window.open(link, '_blank'); });
      }

    }, error => {
      this.loading = false;
    });

  }

  cancelLabel() {
    let selectedItems = this.allSales.filter(sale => sale.selected == true && sale.labelPdfs.length > 0);
    if (selectedItems.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Please Select atleast one label generated order');
      this.loading = false;
      return;
    }
    // let shipmentId: any[]=[] = selectedItems[0].shipmentId;

    let shipmentId: any[] = [];
    selectedItems.forEach(si => {
      if (si.shipmentId != null && si.shipmentId != '')
        shipmentId.push(si.shipmentId);
    })

    this.salsesOrdersService.cancelLabel(shipmentId).subscribe(response => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Sales Order', 'Cancelled Label will update to the platform in the next scheduled synchronization with the platform');
      // this.toasterService.openToastMessage(ToastTypes.success, 'Sales Order', 'Shipment Cancelled Successfully..');
      selectedItems.forEach(data => {
        this.salsesOrdersService.afterCancelLabel(data.khubOrderId ? data.khubOrderId : data.channelOrderId).subscribe(i => {

        })
      });

      this.getDefaultData();
      this.getPrinters();
      return;
    }, error => {
      //console.log(error)
      // this.toasterService.openToastMessage(ToastTypes.success, 'Sales Order', error?.error?.text);
      this.toasterService.openToastMessage(ToastTypes.success, 'Sales Order', 'Cancelled Label will update to the platform in the next scheduled synchronization with the platform');
      this.getDefaultData();
      this.getPrinters();
    })
  }

  undoSplitOrder() {

  }
  picklistFormatTYpe = 111;
  packlistType = 111;
  createPickList() {
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    if (selectedItems.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Please Select atleast one order');
      this.loading = false;
      return;
    }
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.salsesOrdersService.createPickList(ids, this.picklistFormatTYpe).subscribe(res => {
      ////console.log(res);
      this.downloadcsvService.downloadCSVFile(res, 'picklist');
    }, error => {
      this.loading = false;
    });
  }

  createPackList() {
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    if (selectedItems.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Please Select atleast one order');
      this.loading = false;
      return;
    }
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.salsesOrdersService.createPackList(ids, this.packlistType).subscribe(res => {
      ////console.log(res);
      this.downloadcsvService.downloadCSVFile(res, 'packlist');
    }, error => {
      this.loading = false;
    });
  }
  PrintLables: any;
  getPrintLabels() {
    let user: any;
    this.salsesOrdersService.getShippingCourier().subscribe((res: any) => {
      ////console.log(res);
      user = localStorage.getItem('userId')
      if (user != 2738) {
        this.allPrintLables = res.filter(ord => ord.enable == true && ord.name != 'Amazon Buy Shipping' && ord.name != 'FedEx' && ord.name != 'DHL');
        this.PrintLables = res.filter(ord => ord.enable == true && ord.name != 'Amazon Buy Shipping' && ord.name != 'FedEx' && ord.name != 'DHL');
      } else {
        this.allPrintLables = res.filter(ord => ord.enable == true && ord.name != 'Amazon Buy Shipping');
        this.PrintLables = res.filter(ord => ord.enable == true && ord.name != 'Amazon Buy Shipping');
      }
      this.allPrintLables.map(ord => ord.mname = 'via ' + ord.name);
      this.PrintLables.map(ord => ord.mname = ord.name);
    }, error => {
      this.loading = false;
    })
  }
  modalPrintLableClose() {
    this.weight = '';
    this.length = '';
    this.height = '';
    this.width = '';
    this.shippingdate = null;
    this.shippingservice = null;
    this.serviceFormat = '';
    this.selectedCarrier = '';
    this.selectedCarrier_code = '';

    $('#print-labels').modal('hide');
  }


  selectedToDate(event: any) {

  }

  exportCouriers: any = [];
  exportCarriers: any = [];
  selectedShipping: any;
  selectedCarrier_v2: any = '';
  shipOrderItems: any = [];
  selectedShippingMethod: any;

  selectedFullFillmentDate(event: any) {
    this.shipOrderItems.forEach(shipment => {
      shipment.deliveryStartDate = event.year + '/' + event.month + '/' + event.day;
    });
  }
  selectedDispatchDate(event: any) {
    this.shipOrderItems.map(ord => ord.currentSale.map(co => co.deliveryStartDate = event.year + '-' + event.month + '-' + event.day));
  }
  carriersName: any = ''; carrierCode: any = ''; exportOrders: any = []; exportCarrier: any = [];

  findOrdersForShipping() {
    this.loading = true;
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.salsesOrdersService.findOrdersForShipping(ids).subscribe((res: any) => {
      this.exportCouriers = res.courierList.filter(ord => ord.exportCsv == true);
      this.exportCarriers = res.courierList;
      this.exportCarrier = res.courierList;
      // res.orders.forEach(order => {
      //   this.getOrder(order);
      // });
      // this.shipOrderItems = res.orders;
      // this.shipOrderItems.map(so=>so.selected=false);
      // ////console.log(this.shipOrderItems);
      this.loading = true;
      this.salsesOrdersService.getDetailsBasedOnId(ids, 1).subscribe((response: any) => {
        ////console.log(res);
        this.shipOrderItems = response?.channelSales;//ord.selected = false
        this.shipOrderItems.filter((s: any) =>
          this.exportOrders = s.currentSale
        )
        let cDate = new Date();
        this.shipOrderItems.map(ord => ord.currentSale.map(co => co.deliveryStartDate = cDate.getFullYear() + '-' + (cDate.getMonth() + 1) + '-' + cDate.getDate()));
        this.loading = false;
      }, error => {
        this.loading = false;
      });
      this.loading = false;
    })

  }
  getOrder(order) {
    this.salsesOrdersService.getOrderDetailsBasedOnOrderID(order.id).subscribe((res: any) => {
      res.channelSales.forEach(ord => {
        this.shipOrderItems.push(ord);
      });
    }, error => {
      this.loading = false;
    })
  }
  onShippingCarrierChange(event) {
    // this.shipOrderItems.forEach(shipment => {
    //   shipment.carrierName = event.name
    // });
    this.shipOrderItems.map(ord => ord.currentSale.map(co => co.carrierName = event.name));
  }
  onShippingMethodChange(event) {
    // this.shipOrderItems.forEach(shipment => {
    //   shipment.shippingMethod = this.selectedShippingMethod;
    // });
    this.shipOrderItems.map(ord => ord.currentSale.map(co => co.shippingMethod = this.selectedShippingMethod));
  }
  onExportShippingChange(event) {

  }
  confirmShipment() {
    const obj = {
      carriers: [],
      // dimensionH: [],
      // dimensionL: [],
      // dimensionW: [],
      dispatchDates: [],
      ids: [],
      orderIds: [],
      ordercomment: [],
      // packagemethod: null,
      // parcel: [],
      // serviceformats: [],
      shippingMethods: [],
      status: [],
      trackingIds: [],
      // weight: []
    }
    this.shipOrderItems.forEach(shipment => {
      shipment.currentSale.forEach(cs => {
        obj.carriers.push(cs.carrierName);
        obj.ids.push(cs.id);
        if (cs.trackingNumber != null)
          obj.trackingIds.push(cs.trackingNumber);
        else
          obj.trackingIds.push("");

        obj.shippingMethods.push(cs.shippingMethod);
        obj.dispatchDates.push(cs.deliveryStartDate);
        obj.status.push("enabled");
        if (cs.serialNumber != null)
          obj.ordercomment.push(cs.serialNumber);
        else
          obj.ordercomment.push("");

      })
    });
    // this.exportOrders.forEach(shipment => {
    //   obj.carriers.push(shipment.carrierName);
    //   obj.ids.push(shipment.id);
    //   // if (shipment.trackingNumber != null)
    //   obj.trackingIds.push(shipment.trackingNumber);
    //   // else
    //   //   obj.trackingIds.push("");

    //   obj.shippingMethods.push(shipment.shippingMethod);
    //   obj.dispatchDates.push(shipment.deliveryStartDate);
    //   obj.status.push("enabled");
    //   // if (shipment.serialNumber != null)
    //   obj.ordercomment.push(shipment.serialNumber);
    //   // else
    //   //   obj.ordercomment.push("");
    // })

    this.salsesOrdersService.connfirmShipment(obj).subscribe((res: any) => {
      ////console.log(res);
      this.toasterService.openToastMessage(ToastTypes.warning, 'Shipment confirmation', 'Shipment confirmed');
      this.loading = false;
      this.modalActionclosed();
    }, error => {
      this.loading = false;
    })
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    let attachLabel = this.bEmailInfo?.defaultsettings?.attachLabel;
    let dontShowPrices = this.bEmailInfo?.defaultsettings?.dontShowPrices;
    let includeOrderConfirmationCallbackUrl = this.bEmailInfo?.defaultsettings?.includeOrderConfirmationCallbackUrl;
    let invoiceOnly = this.bEmailInfo?.defaultsettings?.invoiceOnly;

    const ids = selectedItems.map(data => data.khubOrderId ? data.khubOrderId : data.channelOrderId);
    this.salsesOrdersService.sendEmailBulk(ids, attachLabel, dontShowPrices, includeOrderConfirmationCallbackUrl, invoiceOnly).subscribe((res: any) => {
      this.getDefaultData();
      this.getPrinters();
      this.toasterService.openToastMessage(ToastTypes.success, "Sellershub", "Email Sent Successfully");
      this.modalActionclosed();
      this.loading = false;
    }, error => {
      this.getDefaultData();
      this.getPrinters();
      this.toasterService.openToastMessage(ToastTypes.success, "Sellershub", "Email Sent Successfully");
      this.modalActionclosed();
      this.loading = false;
    });

  }

  splitViewItems: any = [];
  splitOrderItems: any = [];
  splitAddressItems: any = [];
  getOrderItems() {
    this.splitViewItems = [];
    this.splitOrderItems = [];
    this.splitAddressItems = [];
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.salsesOrdersService.getOrderItemsForSpli(ids).subscribe((res: any) => {
      ////console.log(res);
      this.splitAddressItems = res;
      this.splitAddressItems.map(so => so.selected = false);
      this.splitOrderItems = this.splitAddressItems.slice();
    }, error => {
      this.loading = false;
    })
  }
  splitOrder() {
    $('#split-order').modal('show');
    this.getOrderItems();
  }
  modalSplitClose() {
    $('#split-order').modal('hide');
    this.clearSplitItems();
  }
  errorLabelsClose() {
    // this.errorOders = [];
    // this.successOders = [];
    if (this.tab == 'error_labels') {
      $('#error-labels1').modal('hide');
    } else {
      $('#error-labels').modal('hide');
    }


  }
  openPrintJobsModel() {
    if (this.tab == 'error_labels') {
      $('#error-labels1').modal('show');
    } else {
      $('#error-labels').modal('show');
    }

  }
  oneinSplit() {
    if (this.splitOrderItems.length == 1) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Split Order', 'Atleast one should be there');
      this.loading = false;
      return;
    }
    this.splitOrderItems.forEach(spi => {
      this.splitViewItems.push([spi]);
    });
    this.splitOrderItems = [];
  }

  clearSplitItems() {
    this.splitViewItems = [];
    this.splitOrderItems = this.splitAddressItems.slice();
    this.splitOrderItems.map(sp => sp.selected = false);
  }

  individualSplit() {
    let array = [];
    let SelectedCount = this.splitOrderItems.filter(so => so.selected == true);
    if (SelectedCount.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Split Order', 'Please Select One');
      this.loading = false;
      return;
    }
    else if (SelectedCount.length >= this.splitOrderItems.length) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Split Order', 'Atleast one should be there');
      this.loading = false;
      return;
    }
    else {
      this.splitViewItems.push(SelectedCount);
      SelectedCount.forEach(sc => array.push(sc.id));
    }
    this.splitOrderItems = this.splitOrderItems.filter(spo => !array.includes(spo.id));
  }

  splitIndividualSelection(orderItem: any) {
    this.splitOrderItems.find(sp => sp.id === orderItem.id).selected = !this.splitOrderItems.find(sp => sp.id === orderItem.id).selected;
    // ////console.log(this.splitOrderItems);
  }

  openMergeSwal() {
    if (this.allSales.filter(sale => sale.selected == true).length < 2) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Please select at least two orders to merge?",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, do it!'
      }).then((result) => {
        if (result?.value) {


        }
      });
    } else {
      this.mergeOrder();
    }

  }

  mergeOrder() {
    this.loading = true;
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.salsesOrdersService.mergeOrder(ids).subscribe((res: any) => {
      ////console.log(res);
      this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', res);
      this.getDefaultData();
      this.getPrinters();
      this.loading = false;
    }, error => {
      this.getDefaultData();
      this.getPrinters();
      this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
      this.loading = false;
    });
  }


  unmergeOrder() {
    this.loading = true;
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.salsesOrdersService.unmergeOrder(ids[0]).subscribe((res: any) => {
      ////console.log(res);
      this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', res);
      this.getDefaultData();
      this.getPrinters();
      this.loading = false;
    }, error => {
      this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', 'Merge Failed');
      this.loading = false;
    });
  }
  openSplitSwal() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result?.value) {
        this.saveSplitItems();
        Swal.fire(
          'Split Order!',
          'Your order Split has done.',
          'success'
        )
      }
    });
  }

  saveSplitItems() {
    this.splitViewItems.forEach(sv => {
      let splitItems = [];
      sv.forEach(svi => {
        splitItems.push(svi.id);
      });
      this.salsesOrdersService.splitOrder(sv[0].channelOrderId, splitItems).subscribe((res: any) => {
        ////console.log(res);
        // if(res==='No order items found for this order, split failed'){
        //   this.toasterService.openToastMessage(ToastTypes.warning, 'Split Order', res);
        // }else{
        //   this.toasterService.openToastMessage(ToastTypes.success, 'Split Order', res);
        // }
        $('#split-order').modal('hide');
        this.modalSplitClose();
        this.getDefaultData();
        this.getPrinters();
      }, error => {
        $('#split-order').modal('hide');
        this.modalSplitClose();
        this.getDefaultData();
        this.getPrinters();
      });

    });

  }

  notes: any = [];
  getNotes() {
    this.loading = true;
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.salsesOrdersService.getNotes(ids).subscribe(res => {
      this.notes = res;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  createNotes() {
    this.loading = true;
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.salsesOrdersService.createNotes(ids, this.coomentText).subscribe(res => {
      ////console.log(res);
      this.isAddComment = false;
      this.getNotes();
      this.coomentText = "";
    }, error => {
      this.loading = false;
    })
  }
  isAddComment: boolean = false;
  enableaddcomment() {
    this.isAddComment = true;
  }
  coomentText: any = '';

  viewOrderTab() {
    let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.view_order };
    this.datasharingService.addtoTab(menu);
    this.datasharingService.previousMenu = this.tab ? AllMenuTabs.error_labels : AllMenuTabs.sales_orders;
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    this.datasharingService.changeActiveOrder(selectedItems);
  }
  editOrderTab() {
    this.datasharingService.previousMenu = this.tab ? AllMenuTabs.error_labels : AllMenuTabs.sales_orders;
    let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.edit_order };
    this.datasharingService.addtoTab(menu);
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    this.datasharingService.changeActiveOrder(selectedItems);
  }
  exportOrderType: string;
  exportOrdersToExcell() {
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.salsesOrdersService.exportOrdertoCsv(ids).subscribe(res => {
      ////console.log(res);
      this.downloadcsvService.downloadCSVFile(res, 'Orders');
    }, error => {
      this.loading = false;
    });
  }

  exportOrdersToCSV() {
    this.exportOrdersToExcell();
  }



  isPreviewEnabled: boolean = false;
  printInvoiceData: any;

  selectedOrderData: any;

  printInvoice(type: any) {
    this.loading = true;
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    if (selectedItems.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Please Select atleast one order');
      this.loading = false;
      return;
    }
    let ids = []
    if(this.isOrdersView && this.isSalesOrdersView){
      ids = selectedItems.map(ord => ord.id)
    } else{
      ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    }

    this.salsesOrdersService.printInvoice(ids, type).subscribe(async (res: any) => {
      ////console.log(res);
      const data = res.orders;
      this.loading = false;
      if (!data || data.length == 0) {
        this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Invalid data');
        this.loading = false;
      }
      res.orders.forEach(order => {
        order.invoiceBodyText = order.invoiceBodyText.replace(/GBP/g, '£')
      });
      this.printInvoiceData = res.orders;

      // $('#print-invoices').modal("show");
      // //console.log(this.printInvoiceData);
      this.dbService.clear('shub').subscribe((successDeleted) => {
        //console.log('success? ', successDeleted);
      });
      this.datasharingService.printOrdersData = this.printInvoiceData;
      // localStorage.setItem('printDate', JSON.stringify(this.printInvoiceData));

      //this.router.navigate(['/something/create']);
      if (this.selectedPrinter) {
        this.printVirtualInvoice([{
          key: 'printData',
          value: JSON.stringify(this.printInvoiceData),
        }]);
      } else {
        this.dbService
          .add('shub', {
            key: 'printData',
            value: JSON.stringify(this.printInvoiceData),
          })
          .subscribe((key) => {
            //console.log('key: ', key);
          });
        let link = environment.ui_base_url + 'printinvoice';
        await this.delay(400);
        this.router.navigate([]).then(result => { window.open(link, '_blank'); });
      }

    }, error => {
      this.loading = false;
    });
  }

  async printVirtualInvoice(peoples: any): Promise<void> {

    this.selectedOrderData1 = peoples.find(pp => pp.key == 'printData')?.value;
    this.selectedOrderData1 = JSON.parse(this.selectedOrderData1);
    this.selectedOrderData1?.forEach(so => {
      let temp = so?.invoiceBodyText;
      temp = temp.replace('<p>', '');
      temp = temp.replace('</p>', '');
      let template = JSON.parse(temp);
      so.invoiceBodyText = template;
      console.log(template)

      this.updatePrintInvoiceUpdatedSTatus(so.id);
    });

    const body = [];

    const rowSpan = 30;
    const colSpan = 150;
    const ob = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [50, 30, 50, 50],
      header: {
        text: '`              ' + formatDate(new Date(), "yyyy-MM-dd H:mm:ss", this.locale) + '                                                         sshub'
      },
      content: [],
      styles: {
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [0, 50, 0, 3],
        },
        right: {
          alignment: 'right'
        },
        notesText: {
          fontSize: 10,
        },
        header: {
          fontSize: 22,
          bold: true
        },
        header4: {
          fontSize: 26,
          bold: true
        }
        // text:{
        //   fontSize: 10,
        //   color:
        // }
      },
      defaultStyle: {
        columnGap: 20,
        //font: 'Quicksand',
      }

    };


    for (let index = 0; index < this.selectedOrderData1.length; index++) {
      const so = this.selectedOrderData1[index];
      let items = this.sortByRowAndColumns(so.invoiceBodyText);
      console.log(items)

      for (let i = 0; i < items.length; i++) {
        let row = items[i];
        const hcolumns = {
          columns: []
        };
        for (let j = 0; j < row.cols?.length; j++) {
          const item = row.cols[j];

          switch (item?.type) {

            case 'GeneralDetails':
            case 'Image':

              let ch = {
                // if you specify both width and height - image will be stretched
                text: '',
                width: item.cols * colSpan,
                height: item.rows * rowSpan

              }
              for (let k = 0; k < item.childs.length; k++) {
                const chaild = item.childs[k];

                switch (chaild?.type) {
                  case 'image':
                    delete ch['text'];
                    ch['height'] = 40;
                    ch['image'] = chaild.text.replace(/<\/?[^>]+(>|$)/g, "");

                    break;
                  case 'field':
                  case 'label':
                    if (chaild.key)
                      ch['text'] = ch['text'] + chaild.key.replace(/<\/?[^>]+(>|$)/g, "") + ' \n';

                    break;
                  case 'editor':
                    ch['text'] = ch['text'] + chaild.text.replace('<div>', '\n').replace('&amp;', '').replace('From:', 'From:\n').replace(/<\/?[^>]+(>|$)/g, "") + ' \n';
                    break;
                  default:
                    ch['text'] = 'This is Default';

                    break;
                }
              }
              hcolumns.columns.push(ch);


              break;
            case 'Item':
              const table = {
                table: {
                  headerRows: 1,
                  widths: [100, 80, 100, 30, 60, 60],
                  body: await this.getTableBody(so)
                }
              }
              ob.content.push('\n');
              ob.content.push('\n');
              ob.content.push(table);
              ob.content.push('\n');
              ob.content.push('\n');
              break;
            case 'Total':
              ob.content.push('\n');
              ob.content.push('\n');

              ob.content.push(
                {
                  text: 'Sub Total : ' + ((so?.order?.channelSales[0].currencyCode == 'GBP' ? '£' : so?.order?.channelSales[0].currencyCode) + so?.order?.subTotal).replace(/<\/?[^>]+(>|$)/g, ""),
                  style: 'right'
                }
              );

              ob.content.push(
                {
                  text: 'Postage & Package Charges : ' + ((so?.order?.channelSales[0].currencyCode == 'GBP' ? '£' : so?.order?.channelSales[0].currencyCode) + so.shippingPrice?.toFixed(2)),
                  style: 'right'
                }
              );

              ob.content.push(
                {
                  text: ' VAT : ' + ((so?.order?.channelSales[0].currencyCode == 'GBP' ? '£' : so?.order?.channelSales[0].currencyCode) + so.vat?.toFixed(2)),
                  style: 'right'
                }
              );

              ob.content.push(
                {
                  text: 'Total : ' + ((so?.order?.channelSales[0].currencyCode == 'GBP' ? '£' : so?.order?.channelSales[0].currencyCode) + so?.order?.totalPrice),
                  style: 'right'
                }
              );

              ob.content.push('\n');
              ob.content.push('\n');
              ob.content.push('\n');
              ob.content.push('\n');
              break;

            default:
              break;
          }
        }
        if (hcolumns.columns.length > 0) {
          ob.content.push(hcolumns);
          ob.content.push('\n');
        }


      }
      if (index != this.selectedOrderData1.length - 1) {
        ob.content.push({
          text: '',
          pageBreak: 'after'
        })
      }
    }

    //pdfMake.createPdf(ob).open();
    console.log(ob)
    const pdfDocGenerator = pdfMake.createPdf(ob);
    const self = this;
    pdfDocGenerator.getBlob((data) => {
      self.createPrintJobs(data)
    });
    // localStorage.removeItem('printDate');
    // await this.delay(2000);

    // this.convetToPDF();


  }
  async getTableBody(order: any) {
    const body = [];
    const headerCols = [];
    let imgMap = new Map();
    headerCols.push({ text: 'Product', bold: true, width: 'auto' })
    headerCols.push({ text: 'SKU', bold: true, width: 'auto' })
    headerCols.push({ text: 'Title', bold: true, width: 'auto' })
    headerCols.push({ text: 'Qty', bold: true, width: 'auto' })
    headerCols.push({ text: 'Item Price', bold: true, width: 'auto' })
    headerCols.push({ text: 'Item Total', bold: true, width: 'auto' })
    body.push(headerCols);

    // order.channelUser.labelHeaderText

    for (let i = 0; i < order.channelSales.length; i++) {
      const row = [];
      const co = order.channelSales[i];
      co.category = order?.kartzhubProduct?.categories;
      let img;
      try {
        let response = await fetch(co?.imageUrl);
        if (response.ok) {
          img = await response.blob();
          imgMap.set(co?.id, await this.blobToDataUrl(img));
          // Do something with the image blob here
        } else {
          imgMap.set(co?.id, this.pdftoblobService.img_not_available);
          console.error(`Error ${response.status}: ${response.statusText}`);
        }
      } catch (err) {
        imgMap.set(co?.id, this.pdftoblobService.img_not_available);
        console.error('Fetch error:', err);
      }
      row.push({
        // if you specify both width and height - image will be stretched
        image: imgMap.get(co.id) ? imgMap.get(co.id) : this.pdftoblobService.img_not_available,
        width: 100,
        height: 40,
        fillColor: ((i % 2) == 0) ? '#d3d3d3' : '#f5f5f5'
      });
      row.push({ text: co.sku });
      row.push({ text: co.title });
      row.push({ text: co.quantityPurchased });
      row.push({ text: co.itemPrice ? co.itemPrice : '' });
      row.push({ text: co.totalPrice });
      body.push(row);




    }

    return body;
  }
  sortByRowAndColumns(items: any) {
    let maxRow = 0;
    let maxCol = 0;
    let rows = [];
    items.forEach(i => {
      if (i.y > maxRow) {
        maxRow = i.y;
      }
      if (i.x > maxCol) {
        maxCol = i.x;
      }
    });

    for (let index = 0; index <= maxRow; index++) {
      let cols = [];
      for (let k = 0; k <= maxCol; k++) {
        let item = items.find(col => col.y == index && col.x == k);
        if (item) {
          cols.push(item);
        }

      }
      rows.push({ cols: cols });
    }

    return rows;
  }

  @ViewChild('pdfTable') pdfTable: ElementRef;

  public convertAsPDF() {
    const doc = new jsPDF();

    const pdfTable = this.pdfTable.nativeElement;

    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
    console.log(pdfMake);

  }

  downloadPDF(id = 'printOnly-pdf') {

    var node = document.getElementById(id);

    var img;
    var filename;
    var newImage;
    domtoimage.

      domtoimage.toPng(node, { bgcolor: '#fff' })

      .then(function (dataUrl) {

        img = new Image();
        img.src = dataUrl;
        newImage = img.src;

        img.onload = function () {

          var pdfWidth = img.width;
          var pdfHeight = img.height;

          // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image

          var doc;

          if (pdfWidth > pdfHeight) {
            doc = new jsPDF('l', 'px', [pdfWidth, pdfHeight]);
          }
          else {
            doc = new jsPDF('p', 'px', [pdfWidth, pdfHeight]);
          }


          var width = doc.internal.pageSize.getWidth();
          var height = doc.internal.pageSize.getHeight();


          doc.addImage(newImage, 'PNG', 10, 10, width, height);
          filename = 'mypdf_' + '.pdf';
          doc.save(filename);

        };


      })
      .catch(function (error) {

        // Error Handling

      });



  }

  public convertToPDF(id = 'printOnly-pdf') {

    const data = document.getElementById(id);
    html2canvas(data).then(canvas => {
      let width = canvas.width;
      let height = canvas.height;

      //set the orientation
      let pdf = new jsPDF('p', 'px', [2480, 3508]);
      // if(width > height){
      //   pdf = new jsPDF('l', 'px', [width, height]);
      // }
      // else{
      //   pdf = new jsPDF('p', 'px', [height, width]);
      // }
      //then we get the dimensions from the 'pdf' file itself
      width = pdf.internal.pageSize.getWidth();
      height = pdf.internal.pageSize.getHeight();
      pdf.addImage(canvas, 'jpeg', 0, 0, 2480, 3508);
      pdf.save("download.pdf");

      // let blobPDF =  new Blob([ pdf.output() ], { type : 'application/pdf'});
      //this.createPrintJobs(blobPDF,[]);
    });
  }

  convetToPDF(id = 'printOnly-pdf') {
    const data = document.getElementById(id);

    var doc = new jsPDF();

    doc.html(
      data,
      {
        'width': 180,

      });

    doc.output("dataurlnewwindow");
    console.log(doc.output("dataurlnewwindow"))
  }

  printPackingSlip(type: any) {
    this.loading = true;
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    if (selectedItems.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Please Select atleast one order');
      this.loading = false;
      return;
    }
    let ids = []
    if(this.isOrdersView && this.isSalesOrdersView){
      ids = selectedItems.map(ord => ord.id)
    } else{
      ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    }

    this.salsesOrdersService.printInvoice(ids, type).subscribe(async (res: any) => {
      this.loading = false;
      console.log(res.orders);
      const data = res.orders;
      if (!data || data.length == 0) {
        this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Invalid data');
        this.loading = false;
      }
      this.printInvoiceData = res.orders;
      let userdetails = localStorage.getItem('userId');
      if (userdetails == '2431') { //2431
        let ob = await this.getBarcodeInvoice(this.printInvoiceData);
        pdfMake.createPdf(ob).open();
      } else {
        this.downloadPackingSlipPDF(this.printInvoiceData);
      }


    }, error => {
      this.loading = false;
    });


  }

  async getBarcodeInvoice(printInvoiceData: any) {
    console.log(printInvoiceData);
    let imgMap = new Map();
    this.loading = true;
    for (var i = 0; i < printInvoiceData.length; i++) {
      let so = printInvoiceData[i];
      let img = await this.getImageToBase64(so?.channelSales[0]?.orderId);
      imgMap.set(so?.channelSales[0]?.orderId, img);
    }
    this.loading = false;
    let contentArray = [];
    for (var i = 0; i < printInvoiceData.length; i++) {
      let so = printInvoiceData[i];
      let tbody = this.packingslipGenartionService.getOrderIteDetailsPackingBarcode(so);
      let content = [
        {
          columns: [
            {
              text: 'Packing Slip',
              color: '#333333',
              width: '*',
              fontSize: 15,
              bold: true,
              alignment: 'left',
              margin: [0, 0, 20, 0],
            },
            {
              image: imgMap.get(so?.channelSales[0]?.orderId) ? imgMap.get(so?.channelSales[0]?.orderId) : this.pdftoblobService.img_not_available,
              width: 120
            },
          ],
        },
        '\n',
        {
          // + so?.order?.shipPhoneNumber,
          columns: [
            {
              text: so?.order?.shipName,
              bold: true,
              color: '#000000',
              alignment: 'left',
              fontSize: 10,
            },

            {
              text: so?.channelSales[0]?.orderId,
              bold: true,
              color: '#000000',
              alignment: 'left',
              fontSize: 10,
            },

          ],
        },

        {
          columns: [
            {
              bold: true,
              alignment: 'left',
              text: so?.order?.shipPostalCode + ',' + so?.order?.shipCountry,
              style: 'invoiceBillingAddress',
              fontSize: 10,
            }
          ],
        },
        '\n',
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] },
        '\n',
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function (i, node) {
              return 1;
            },
            vLineWidth: function (i, node) {
              return 1;
            },
            hLineColor: function (i, node) {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: function (i, node) {
              return '#eaeaea';
            },
            hLineStyle: function (i, node) {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: function (i, node) {
              return 10;
            },
            paddingRight: function (i, node) {
              return 10;
            },
            paddingTop: function (i, node) {
              return 2;
            },
            paddingBottom: function (i, node) {
              return 2;
            },
            fillColor: function (rowIndex, node, columnIndex) {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['*', 80],
            body: tbody,
          },
        }
      ];

      contentArray.push(...content);
      if (i != (printInvoiceData.length - 1)) {
        contentArray.push({
          text: '',
          pageBreak: 'after'
        });
      }
    }
    let ob = {
      pageSize: 'A6',
      pageOrientation: 'portrait',
      pageMargins: [10, 10, 10, 10],
      content: contentArray,
      styles: {
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [0, 50, 0, 3],
        },
        notesText: {
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
        //font: 'Quicksand',
      },
    };

    return ob;
  }
  async getImageToBase64(orderid: any) {
    console.log(orderid);
    let authToken = localStorage.getItem("userToken");
    const headers = new HttpHeaders().set("Authorization", authToken);
    return await this.http.get<any>(environment.barcode + `?barcodeText=${orderid}`, { headers }).toPromise().then((data: any) => {
      console.log(data.base64);
      return data.base64;
    }).catch((error) => {
      console.log(error?.error?.text);
      return error?.error?.text;
    });
  }
  async printDuplexPrint(type: any) {
    this.loading = true;
    let selectedItems = this.allSales.filter(sale => (sale.selected == true && sale.labelPdfs.length > 0));
    if (selectedItems.length == 0) {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Please Select label printed order');
      this.loading = false;
      return;
    }

    let fnames = [];
    for (var i = 0; i < selectedItems.length; i++) {
      let ur = selectedItems[i];
      console.log(ur);
      let lablePDF = ur.labelPdfs[0];
      let fileName = lablePDF.split("/");
      fnames.push(fileName[(fileName.length - 1)]);
    }

    console.log(fnames);

    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    console.log(ids);
    const res: any = await this.salsesOrdersService.printInvoicePromise(ids, type)
    this.loading = false;
    console.log(res);
    this.printInvoiceData = res.orders;
    let userdetails = localStorage.getItem('userId');
    if (userdetails == '2431') { //2431
      await this.printDuplexPrintv2For2341(this.printInvoiceData, fnames);
    } else {
      let blob = await this.printDuplexPrintv2(this.printInvoiceData, fnames);
    }

  }


  async printDuplexPrintv2(pdfdata: any, fnames: any[]) {
    // pdfMake.clear();
    this.content = [];
    for (var i = 0; i < pdfdata.length; i++) {
      let so = pdfdata[i];
      let tbody = this.getOrderIteDetailsPacking(so);
      let itemsInfo = {
        layout: {
          defaultBorder: false,
          hLineWidth: function (i, node) {
            return 1;
          },
          vLineWidth: function (i, node) {
            return 1;
          },
          hLineColor: function (i, node) {
            if (i === 1 || i === 0) {
              return '#bfdde8';
            }
            return '#eaeaea';
          },
          vLineColor: function (i, node) {
            return '#eaeaea';
          },
          hLineStyle: function (i, node) {
            // if (i === 0 || i === node.table.body.length) {
            return null;
            //}
          },
          // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          paddingLeft: function (i, node) {
            return 5;
          },
          paddingRight: function (i, node) {
            return 5;
          },
          paddingTop: function (i, node) {
            return 2;
          },
          paddingBottom: function (i, node) {
            return 2;
          },
          fillColor: function (rowIndex, node, columnIndex) {
            return '#fff';
          },
        },
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto'],
          body: tbody,
        },
      };
      this.content.push(...this.getContentPacking(so, itemsInfo));

      if (i != (pdfdata.length - 1)) {
        this.content.push({
          text: '',
          pageBreak: 'after'
        });
      }

      console.log(this.content);
    }
    let dd = this.downloadAsPDF();
    const pdfDocGenerator = pdfMake.createPdf(dd);
    await pdfDocGenerator.getBlob((blob) => {
      console.log(blob);
      this.uploadBlobForPrinting(blob, fnames);

      this.loading = false;
    });

  }

  async printDuplexPrintv2For2341(pdfdata: any, fnames: any[]) {
    // pdfMake.clear();
    let dd = await this.getBarcodeInvoice(pdfdata);
    const pdfDocGenerator = pdfMake.createPdf(dd);
    await pdfDocGenerator.getBlob((blob) => {
      console.log(blob);
      this.uploadBlobForPrinting(blob, fnames);
    });
  }

  async uploadBlobForPrinting(fileobj: any, fnames: any[]) {
    this.loading = true;
    let blob = await this.pdftoblobService.getBlobForDuplex(fnames, fileobj);
    let selectedItems = this.allSales.filter(sale => (sale.selected == true && sale.labelPdfs.length > 0));
    await this.createPdfSkus(blob, selectedItems);
    this.loading = false;
    // let file = new Blob([blob], { type: 'application/pdf' });
    // let fileURL = URL.createObjectURL(file);
    // this.loading = false;
    // window.open(fileURL);
  }

  content: any = [];
  async downloadPackingSlipPDF(pdfdata: any) {
    this.content = [];
    for (var i = 0; i < pdfdata.length; i++) {
      let so = pdfdata[i];
      let tbody = this.getOrderIteDetailsPacking(so);
      // let tbody = this.getOrderIteDetailsPackingBarcode(so);
      let itemsInfo = {
        layout: {
          defaultBorder: false,
          hLineWidth: function (i, node) {
            return 1;
          },
          vLineWidth: function (i, node) {
            return 1;
          },
          hLineColor: function (i, node) {
            if (i === 1 || i === 0) {
              return '#bfdde8';
            }
            return '#eaeaea';
          },
          vLineColor: function (i, node) {
            return '#eaeaea';
          },
          hLineStyle: function (i, node) {
            // if (i === 0 || i === node.table.body.length) {
            return null;
            //}
          },
          // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          paddingLeft: function (i, node) {
            return 5;
          },
          paddingRight: function (i, node) {
            return 5;
          },
          paddingTop: function (i, node) {
            return 2;
          },
          paddingBottom: function (i, node) {
            return 2;
          },
          fillColor: function (rowIndex, node, columnIndex) {
            return '#fff';
          },
        },
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto'],
          body: tbody,
        },
      };
      this.content.push(...this.getContentPacking(so, itemsInfo));

      if (i != (pdfdata.length - 1)) {
        this.content.push({
          text: '',
          pageBreak: 'after'
        });
      }

      // console.log(this.content);
    }
    let dd = this.downloadAsPDF();
    const pdfDocGenerator = pdfMake.createPdf(dd);
    await pdfDocGenerator.getBlob(async (blob) => {
      if (this.selectedPrinter) {
        this.createPrintJobs(blob);
      } else {
        await this.createPdfSkus(await blob, pdfdata);
        this.loading = false;
      }



    });
    // pdfDocGenerator.open();
  }
  public downloadAsPDF() {
    var dd = {
      content: this.content,
      pageSize: 'A6',
      pageOrientation: 'portrait',
      pageMargins: [40, 40, 40, 40],
      styles: {
        notesTitle: {
          fontSize: 8,
          bold: true,
          margin: [0, 5, 0, 3],
        },
        notesText: {
          fontSize: 6,
        },
      },
      defaultStyle: {
        columnGap: 10,
        //font: 'Quicksand',
      },
    };
    return dd;
  }

  getContentPacking(slectedOrders: any, itemsInfo: any) {
    let btext = JSON.parse(slectedOrders?.invoiceBodyText)?.find(tx => tx?.type == 'Image')?.childs[0].text;
    console.log(btext);
    // .childs[0].text
    if (btext) {
      let content = [
        {
          columns: [
            {
              image: btext.toString(),
              width: 50,
            },
            [
              {
                text: 'Packing Slip',
                color: '#000000',
                width: '*',
                fontSize: 14,
                bold: true,
                alignment: 'right',
                margin: [0, 0, 0, 10],
              },
              {
                stack: [
                  {
                    columns: [
                      {
                        text: 'Order No.',
                        color: '#000000',
                        bold: true,
                        width: '*',
                        fontSize: 8,
                        alignment: 'right',
                      },
                      {
                        text: '#' + slectedOrders?.channelSales[0]?.khubOrderId ? slectedOrders?.channelSales[0]?.khubOrderId : slectedOrders?.channelSales[0]?.channelOrderId,
                        bold: true,
                        color: '#000000',
                        fontSize: 8,
                        alignment: 'right',
                        width: 70,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'Order Date',
                        color: slectedOrders?.order?.channelSales?.channelOrderId,
                        bold: true,
                        width: '*',
                        fontSize: 8,
                        alignment: 'right',
                      },
                      {
                        text: this.datepipe.transform(slectedOrders?.order?.purchaseDate, 'MMM d, y'),
                        bold: true,
                        color: '#000000',
                        fontSize: 8,
                        alignment: 'right',
                        width: 70,
                      },
                    ],
                  },
                  // {
                  //   columns: [
                  //     {
                  //       text: 'Status',
                  //        color: '#000000',
                  //       bold: true,
                  //       fontSize: 8,
                  //       alignment: 'right',
                  //       width: '*',
                  //     },
                  //     {
                  //       text: 'PAID',
                  //       bold: true,
                  //       fontSize: 10,
                  //       alignment: 'right',
                  //       color: '#000000',
                  //       width: 70,
                  //     },
                  //   ],
                  // },
                ],
              },
            ],
          ],
        },
        {
          columns: [
            {
              text: 'Shipping To',
              color: '#000000',
              bold: true,
              fontSize: 8,
              alignment: 'left',
              margin: [0, 5, 0, 5],
            },
            {
              text: 'Address',
              color: '#000000',
              bold: true,
              fontSize: 8,
              alignment: 'left',
              margin: [0, 5, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              text: slectedOrders?.order?.shipName + '\n' + slectedOrders?.order?.shipPhoneNumber,
              bold: true,
              color: '#000000',
              alignment: 'left',
              fontSize: 6,
            },
            {
              // text:  slectedOrders?.order?.shipName+'\n'+ slectedOrders?.order?.shipPhoneNumber,
              bold: true,
              // color: '#000000',
              // fontSize: 6,
              alignment: 'left',
              text: slectedOrders?.order?.shipAddress1 + ',' + slectedOrders?.order?.shipAddress2 + ',\n' + slectedOrders?.order?.shipCity + ' \n ' + slectedOrders?.order?.shipCountry + ' \n  ' + slectedOrders?.order?.shipPostalCode,
              style: 'invoiceBillingAddress',
              fontSize: 6,
            },
          ],
        },
        {
          columns: [
            {
              text: 'Shipping Method',
              color: '#000000',
              bold: true,
              fontSize: 8,
              margin: [0, 5, 0, 3],
            },
            {
              text: slectedOrders?.order?.shippingDetails[0]?.shippingMethod,
              color: '#000000',
              bold: true,
              fontSize: 8,
              margin: [0, 5, 0, 3],
            },
          ],
        },
        {
          columns: [
            {
              text: 'Tracking Number',
              color: '#000000',
              bold: true,
              fontSize: 8,
              margin: [0, 5, 0, 3],
            },
            {
              text: slectedOrders?.order?.trackingNumber ? slectedOrders?.order?.trackingNumber : '--',
              color: '#000000',
              bold: true,
              fontSize: 8,
              margin: [0, 5, 0, 3],
            },
          ],
        },
        {
          columns: [
            {
              text: 'Source',
              color: '#000000',
              bold: true,
              fontSize: 8,
              margin: [0, 5, 0, 3],
            },
            {
              text: slectedOrders?.order?.channel,
              color: '#000000',
              bold: true,
              fontSize: 8,
              margin: [0, 5, 0, 3],
            },
          ],
        },
        '\n',
        itemsInfo,
        '\n',
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function (i, node) {
              return 1;
            },
            vLineWidth: function (i, node) {
              return 1;
            },
            hLineColor: function (i, node) {
              return '#eaeaea';
            },
            vLineColor: function (i, node) {
              return '#eaeaea';
            },
            hLineStyle: function (i, node) {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: function (i, node) {
              return 10;
            },
            paddingRight: function (i, node) {
              return 10;
            },
            paddingTop: function (i, node) {
              return 3;
            },
            paddingBottom: function (i, node) {
              return 3;
            },
            fillColor: function (rowIndex, node, columnIndex) {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['*', 'auto'],
            body: [
              [
                {
                  text: 'Payment Subtotal',
                  border: [false, true, false, true],
                  alignment: 'right',
                  color: '#000000',
                  fontSize: 6,
                  margin: [0, 2, 0, 2],
                },
                {
                  border: [false, true, false, true],
                  text: slectedOrders?.order?.subTotal,
                  alignment: 'right',
                  color: '#000000',
                  fontSize: 6,
                  // fillColor: '#f5f5f5',
                  margin: [0, 2, 0, 2],
                },
              ],
              [
                {
                  text: 'Shipping Fee',
                  border: [false, false, false, true],
                  alignment: 'right',
                  color: '#000000',
                  fontSize: 6,
                  margin: [0, 2, 0, 2],
                },
                {
                  text: slectedOrders?.order?.shippingPrice ? slectedOrders?.order?.shippingPrice : '--',
                  border: [false, false, false, true],
                  // fillColor: '#f5f5f5',
                  fontSize: 6,
                  color: '#000000',
                  alignment: 'right',
                  margin: [0, 2, 0, 2],
                },
              ],
              [
                {
                  text: 'Total Amount',
                  bold: true,
                  fontSize: 8,
                  alignment: 'right',
                  border: [false, false, false, true],
                  margin: [0, 2, 0, 2],
                },
                {
                  text: slectedOrders?.order?.totalPrice,
                  bold: true,
                  fontSize: 8,
                  alignment: 'right',
                  border: [false, false, false, true],
                  // fillColor: '#f5f5f5',
                  margin: [0, 2, 0, 2],
                },
              ],
            ],
          },
        },
      ];
      return content;
    }
    return [];
  }

  getOrderIteDetailsPacking(selectedOrder) {
    let tbody = [[
      {
        text: 'Item Title',
        // fillColor: '#eaf2f5',
        color: '#000000',
        border: [false, true, false, true],
        margin: [0, 2, 0, 2],
        fontSize: 6,
        textTransform: 'uppercase',
      },
      {
        text: 'Item Location',
        // fillColor: '#eaf2f5',
        color: '#000000',
        border: [false, true, false, true],
        margin: [0, 2, 0, 2],
        fontSize: 6,
        textTransform: 'uppercase',
      },
      {
        text: 'QTY',
        // fillColor: '#eaf2f5',
        border: [false, true, false, true],
        margin: [0, 2, 0, 2],
        fontSize: 6,
        textTransform: 'uppercase',
      },
      {
        text: 'TOTAL',
        border: [false, true, false, true],
        alignment: 'right',
        fontSize: 6,
        // fillColor: '#eaf2f5',
        margin: [0, 2, 0, 2],
        textTransform: 'uppercase',
      },
    ]];

    selectedOrder.channelSales.forEach(ch => {
      tbody.push([
        {
          text: ch.title,
          // fillColor: '#eaf2f5',
          color: '#000000',
          border: [false, true, false, true],
          margin: [0, 2, 0, 2],
          fontSize: 6,
          textTransform: 'uppercase',
        },
        {
          text: ch.warehouse ? ch.warehouse : '',
          // fillColor: '#eaf2f5',
          color: '#000000',
          border: [false, true, false, true],
          margin: [0, 2, 0, 2],
          fontSize: 6,
          textTransform: 'uppercase',
        },
        {
          text: ch.quantityPurchased,
          // fillColor: '#eaf2f5',
          border: [false, true, false, true],
          margin: [0, 2, 0, 2],
          fontSize: 6,
          textTransform: 'uppercase',
        },
        {
          text: ch.totalPrice,
          border: [false, true, false, true],
          alignment: 'right',
          fontSize: 6,
          // fillColor: '#eaf2f5',
          margin: [0, 2, 0, 2],
          textTransform: 'uppercase',
        },
      ]);
    });

    return tbody;
  }
  getOrderPickList(selectedOrder) {
    let tbody = [[
      {
        text: 'Item Title',
        // fillColor: '#eaf2f5',
        color: '#000000',
        border: [false, true, false, true],
        margin: [0, 2, 0, 2],
        fontSize: 6,
        textTransform: 'uppercase',
      },
      {
        text: 'Item Location',
        // fillColor: '#eaf2f5',
        color: '#000000',
        border: [false, true, false, true],
        margin: [0, 2, 0, 2],
        fontSize: 6,
        textTransform: 'uppercase',
      },
      {
        text: 'QTY',
        // fillColor: '#eaf2f5',
        border: [false, true, false, true],
        margin: [0, 2, 0, 2],
        fontSize: 6,
        textTransform: 'uppercase',
      },
      {
        text: 'TOTAL',
        border: [false, true, false, true],
        alignment: 'right',
        fontSize: 6,
        // fillColor: '#eaf2f5',
        margin: [0, 2, 0, 2],
        textTransform: 'uppercase',
      },
    ]];

    selectedOrder.channelSales.forEach(ch => {
      tbody.push([
        {
          text: ch.title,
          // fillColor: '#eaf2f5',
          color: '#000000',
          border: [false, true, false, true],
          margin: [0, 2, 0, 2],
          fontSize: 6,
          textTransform: 'uppercase',
        },
        {
          text: ch.warehouse ? ch.warehouse : '',
          // fillColor: '#eaf2f5',
          color: '#000000',
          border: [false, true, false, true],
          margin: [0, 2, 0, 2],
          fontSize: 6,
          textTransform: 'uppercase',
        },
        {
          text: ch.quantityPurchased,
          // fillColor: '#eaf2f5',
          border: [false, true, false, true],
          margin: [0, 2, 0, 2],
          fontSize: 6,
          textTransform: 'uppercase',
        },
        {
          text: ch.totalPrice,
          border: [false, true, false, true],
          alignment: 'right',
          fontSize: 6,
          // fillColor: '#eaf2f5',
          margin: [0, 2, 0, 2],
          textTransform: 'uppercase',
        },
      ]);
    });

    return tbody;
  }



  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  preview(order: any) {
    this.selectedOrderData = order;
    this.isPreviewEnabled = true;
    this.updatePrintInvoiceUpdatedSTatus(order.order.id);
  }

  print() {
    var mode = 'iframe'; //popup
    var close = mode == "popup";
    var options = {
      mode: mode,
      popClose: close
    };
    $("div.printableArea").printArea(options);
  }
  backToList() {
    this.isPreviewEnabled = false;
  }

  updatePrintInvoiceUpdatedSTatus(id) {
    this.salsesOrdersService.updatePrintInvoiceUpdatedSTatus(id).subscribe(res => {

    }, error => {
      this.loading = false;
    });
  }

  selectedLabels: any;
  individualselectionSelectedLabel(event: any) {
    this.selectedLabels = event;
    let currentDate = new Date();
    let dispatchDate = currentDate.getFullYear() + '-' + currentDate.getMonth() + '-' + currentDate.getDate();

    this.labeledOrders.forEach(labels => {
      labels.channelSales.forEach(selectedLabels => {
        if (selectedLabels.dispatchDate == '' || selectedLabels.dispatchDate == undefined)
          selectedLabels.dispatchDate = dispatchDate;
      });
    })
  }

  weight: any = '';
  length: any = '';
  shippingservice: any = ''; shippingmethod: any = ''
  width: any = '';
  height: any = '';

  shippingdate = '';
  shippingDates(event: any) {
    ////console.log(event);
    this.shippingdate = event.year + '-' + event.month + '-' + event.day;
    this.mapData();
    // this.selectedLabels.dispatchDate = event.year + '-' + event.month + '-' + event.day;
  }
  mapData() {
    // if (this.selectedLabels != undefined) {
    //   this.selectedLabels.weight = this.weight;
    //   this.selectedLabels.length = this.length;
    //   this.selectedLabels.width = this.width;
    //   this.selectedLabels.height = this.height;
    //   this.selectedLabels.dispatchDate = this.shippingdate;
    //   this.selectedLabels.shippingMethod = this.shippingservice;
    // }

    let selectedLabels = this.labeledOrders.filter(lbo => lbo.selected == true);
    selectedLabels.forEach(labels => {
      labels.channelSales.forEach(selectedLabels => {
        if (this.weight)
          selectedLabels.weight = this.weight;
        if (this.length)
          selectedLabels.length = this.length;
        if (this.width)
          selectedLabels.width = this.width;
        if (this.height)
          selectedLabels.height = this.height;
        if (this.shippingdate)
          selectedLabels.dispatchDate = this.shippingdate;
        if (this.shippingservice)
          selectedLabels.shippingMethod = this.shippingservice;
        if (this.serviceFormat)
          selectedLabels.serviceFormat = this.serviceFormat;
      });
    })
  }
  selectCarrier: any = ''; track: any;
  mapData1() {
    let selectedOrder = this.exportOrders.filter(lbo => lbo);
    selectedOrder.forEach(carriers => {

      if (this.track) {
        carriers.trackingNumber = this.track;

      }
      if (this.selectCarrier) {
        carriers.carrierName = this.selectCarrier;
      }
      if (this.shippingmethod)
        carriers.shippingMethod = this.shippingservice;
    })
  }
  shippingCarrier_v2; trackNumber: any = ''; shippingMethod_v2
  mapData2() {
    this.onGoingOrderDet.currentSale.forEach(carriers => {
      console.log(carriers)
      if (this.trackNumber) {
        carriers.trackingNumber = this.trackNumber;

      }
      if (this.shippingCarrier_v2) {
        carriers.carrierName = this.shippingCarrier_v2;
      }
      if (this.shippingMethod_v2)
        carriers.shippingMethod = this.shippingMethod_v2;
    })
  }
  // lableModalInfo: any = [];
  labeledOrders: any;
  selectedCarrier: any = '';
  selectedCarrier_code: any = '';
  shippingMethods: any = '';
  showConfirmShipmentButton = false;
  modalPrintLableOpen(printOpt: any) {
    this.showConfirmShipmentButton = false;
    // ////console.log(printOpt);
    this.loading = true;
    this.isLabelsPrinted = false;
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    this.selectedLabelssLength = selectedItems.length;
    if (selectedItems.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Please Select atleast one order');
      this.loading = false;
      return;
    }

    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    console.log(printOpt.name);
    this.selectedCarrier = printOpt.name;
    this.selectedCarrier_code = printOpt.code;
    this.salsesOrdersService.getLabelInfo(printOpt.name, ids).subscribe((res: any) => {
      // ////console.log(res);
      this.labeledOrders = res?.orders;
      this.labeledOrders.forEach(order => {
        this.shippingservice = (order.shippingMethod);
      });


      this.labeledOrders.map(lb => lb.selected = true);
      if (this.labeledOrders.length === 1) {
        this.labeledOrders[0].selected = true;
        this.isPrintLabelSelectAll = true;
      }
      // ////console.log(this.labeledOrders);
      this.labeledOrders.forEach(order => {
        let arr = [];
        order.channelSales.forEach(cs => {
          cs.selected = true;
          const cDate = new Date();
          cs.dispatchDate = cDate.getFullYear() + '-' + (cDate.getMonth() + 1) + '-' + cDate.getDate();
          if (cs?.labelPdfs?.length > 0) {
            this.showConfirmShipmentButton = true;
            this.openPdf(cs?.labelPdfs[0]);
            this.updatePrintedStatus({ channelSales: [cs] });
          }
        });
        order.channelSales.forEach(cs => {
          if (arr.findIndex(i => i.channelOrderId == cs.channelOrderId) == -1) {
            arr.push(cs)
          }
        });
        order.channelSales = arr;
      });
      this.loading = false;
      let sID = this.salsesOrdersService.getCarrierId(this.selectedCarrier);
      this.salsesOrdersService.getIntegrateDetails(sID).subscribe((res: any) => {
        //  ////console.log(res?.shippingRules.labelServiceClassDMList);
        if (sID == 3) {
          this.shippingMethods = res?.dpdCourierResponse.services;
        } else {
          this.shippingMethods = res?.shippingRules.labelServiceClassDMList;
        }
        if (sID == 1) {
          this.shippingMethods = res?.shippingRules.serviceFormatList;
        } else {
          this.shippingMethods = res?.shippingRules.labelServiceClassDMList;
        }
      }, error => {
        this.loading = false;
      });
      $('#print-labels').modal('show');
    }, error => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Print labels', "Process error");
      this.loading = false;
    });
  }


  printGenLaels() {
    this.isEdit = true;
    let Obj = {
      "carriers": [],
      "dimensionH": [],
      "dimensionL": [],
      "dimensionW": [],
      "dispatchDates": [],
      "ids": [],
      "orderIds": [],
      "shippingMethods": [],
      "serviceformats": [],
      "packagemethod": [],
      "weight": [],
      "parcel": [],
      "amazonBuyShippingService": {}
    }

    this.labeledOrders.forEach(ord => {
      ord.channelSales.forEach(data => {
        Obj.carriers.push(this.shippingservice);
        Obj.dimensionH.push(data.height);
        Obj.dimensionL.push(data.length);
        Obj.dimensionW.push(data.width);
        Obj.dispatchDates.push(formatDate(data.dispatchDate, "yyyy-MM-dd", this.locale));
        Obj.ids.push(data.id);
        Obj.orderIds.push(data.khubOrderId ? data.khubOrderId : data.channelOrderId);
        Obj.shippingMethods.push(data.shippingMethod);
        Obj.serviceformats.push(data.serviceFormat);
        Obj.packagemethod.push(data.serviceFormat);
        Obj.weight.push(data.weight);
        Obj.parcel.push("1");
      });
    })
    if (this.selectedCarrier_code == 'amazonbuyshipping') {
      Obj.amazonBuyShippingService = JSON.parse(JSON.stringify(this.amBuyShippingOptions.find(i => i.shippingServiceId == this.shippingservice)));
    }

    if (this.selectedCarrier_code != 'royalmail' && this.selectedCarrier_code != 'dropbox') {
      delete Obj.packagemethod;
    }
    // if (!this.shippingservice) {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Generate labels', "Please select shipping service");
    //   return;
    // }
    if (this.selectedCarrier_code == 'royalmail' || this.selectedCarrier_code == 'dropbox') {
      if (!this.weight) {
        this.toasterService.openToastMessage(ToastTypes.warning, 'Generate labels', "Please enter weight in kgs");
        this.loading = false;
        return;
      }
      if (!this.serviceFormat) {
        this.toasterService.openToastMessage(ToastTypes.warning, 'Generate labels', "Please select service format");
        this.loading = false;
        return;
      }
    }
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You want to print label !",
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, do it!'
    // }).then(async (result) => {
    //   ////console.log(result);
    //   if (result?.value) {
    //     this.loading = true;

    //   }
    // });
    this.loading = true;
    if (this.isLabelsPrinted = true) {
      this.toasterService.openToastMessage(ToastTypes.info, 'Generate labels', 'Labels Generating');
    }
    this.salsesOrdersService.savePrintLabelsData(Obj, this.selectedCarrier_code).subscribe((res: any) => {
      // this.modalDispatchclosed();
      // this.closePrintLabels();
      if (res?.errororders?.length > 0) {
        this.toasterService.openToastMessage(ToastTypes.warning, 'Generate labels', res?.errororders[0].field1);
        this.loading = false;
        return;
      } else if (res?.errormessage) {
        this.toasterService.openToastMessage(ToastTypes.warning, 'Generate labels', res?.errormessage);
        this.loading = false;
      } else {
        this.isLabelsPrinted = true;
        if (this.selectedLabelssLength > 1) {
          this.toasterService.openToastMessage(ToastTypes.success, 'Generate labels', 'Labels Generated Successfully');
        } else {
          this.toasterService.openToastMessage(ToastTypes.success, 'Generate labels', 'Label Generated Successfully');
        }
        this.labelsPrintd = res?.orders;
        if (this.labelsPrintd && Array.isArray(this.labelsPrintd)) {
          this.labelsPrintd.forEach(element => {
            element.orderDetails = JSON.parse(element.orderDetails);
          });
        }
        this.getDefaultData();
        this.getPrinters();
        this.loading = false;
      }
      let allOrders: any = [], id: any, labelPrint: any;
      allOrders = res.orders;
      allOrders.filter((s: any) => {
        id = s.id;
        labelPrint = s.labelPrinted;
      })
      if (labelPrint == true) {
        this.salsesOrdersService.getPrintedLabelsData(id).subscribe((response: any) => {
          this.toasterService.openToastMessage(ToastTypes.success, 'Generate labels', response.message);
          this.loading = false;
        });
      }
    }, (error: any) => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Generate labels', "Error Occured ");
      this.loading = false;
    });
  }

  labelsPrintd: any = [];

  isLabelsPrinted: boolean = false;

  closePrintLabels() {
    this.selectedCarrier_code = '';
    this.serviceFormat = '';
    this.height = '';
    this.width = '';
    this.length = '';
    this.weight = '';
    $('#print-labels').modal('hide');
  }

  confirmShipmentV2() {
    const obj = {
      carriers: [],
      // dimensionH: [],
      // dimensionL: [],
      // dimensionW: [],
      dispatchDates: [],
      ids: [],
      orderIds: [],
      ordercomment: [],
      // packagemethod: null,
      // parcel: [],
      // serviceformats: [],
      shippingMethods: [],
      status: [],
      trackingIds: [],
      // weight: []
    }
    // this.labeledOrders.forEach(shipment => {
    //   shipment.channelSales.forEach(cs => {
    //     obj.carriers.push(cs.carrierName);
    //     obj.ids.push(cs.id);
    //     if (cs.trackingNumber != null)
    //       obj.trackingIds.push(cs.trackingNumber);
    //     else
    //       obj.trackingIds.push("");

    //     obj.shippingMethods.push(cs.shippingMethod);
    //     obj.dispatchDates.push(cs.dispatchDate);
    //     obj.status.push("enabled");
    //     if (cs.serialNumber != null)
    //       obj.ordercomment.push(cs.serialNumber);
    //     else
    //       obj.ordercomment.push("");

    //   })
    // });

    this.labeledOrders.forEach(ord => {
      ord.channelSales.forEach(data => {
        obj.carriers.push(data.carrierName);
        obj.ids.push(data.id);
        if (data.trackingNumber != null)
          obj.trackingIds.push(data.trackingNumber);
        else
          obj.trackingIds.push("");

        obj.shippingMethods.push(data.shippingMethod);
        obj.dispatchDates.push(data.dispatchDate);
        obj.status.push("enabled");
        if (data.serialNumber != null)
          obj.ordercomment.push(data.serialNumber);
        else
          obj.ordercomment.push("");
      });
    })

    this.salsesOrdersService.connfirmShipment(obj).subscribe((res: any) => {
      ////console.log(res);
      this.toasterService.openToastMessage(ToastTypes.warning, 'Shipment confirmation', 'Shipment confirmed');
      // this.modalActionclosed();
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  editNote(comment) {
    //console.log(comment)
  }


  async printPDFS() {
    /* Array of pdf urls */
    let pdfsToMerge = this.filesObjBlobs;
    const mergedPdf = await PDFDocument.create();
    for (const pdfCopyDoc of pdfsToMerge) {
      const pdf = await PDFDocument.load(pdfCopyDoc);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => { mergedPdf.addPage(page); });
    }
    const mergedPdfFile = await mergedPdf.save();
    this.downloadFile(mergedPdfFile);
  }

  downloadFile(data) {
    this.filesObjBlobs = [];
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  async openPdfUrl(sale: any) {
    const fnames = [];
    const lablePDF = sale.labelPdfs[0];
    const fileName = lablePDF.split("/");
    fnames.push(fileName[(fileName.length - 1)]);

    await this.createPdfSkus(await this.pdftoblobService.getBlob(fnames), [sale]);

    // urls.forEach(url => {
    //   window.open(url, '_blank');
    // });
  }

  storePdfFiles(url: any) {
    this.http.get(url, { responseType: 'blob' })
      .subscribe((data) => {
        let file = new Blob([data], { type: 'application/pdf' });
        console.log(file);
        this.blobToBase64(file)
      }, error => {
        console.error(error);
      });
  }

  blobToBase64(file) {
    const reader = new FileReader();
    const self = this;
    reader.readAsDataURL(file);
    return new Promise(resolve => {
      reader.onloadend = () => {
        self.filesObjBlobs.push(reader.result);
        return reader.result;
      };
    });
  };

  blobToDataUrl(blob) {
    return new Promise(r => { let a = new FileReader(); a.onload = r; a.readAsDataURL(blob) }).then((e: any) => e.target.result);
  }

  amBuyShippingOptions: any = [];
  getBuyShipServices() {
    if (!this.weight) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Shipment confirmation', 'weight required');
      this.loading = false;
      return;
    }
    if (!this.length) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Shipment confirmation', 'length required');
      this.loading = false;
      return;
    }
    if (!this.width) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Shipment confirmation', 'width required');
      this.loading = false;
      return;
    }
    if (!this.height) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Shipment confirmation', 'height required');
      this.loading = false;
      return;
    }
    this.loading = true;
    let Obj = {
      "dimensionH": [],
      "dimensionL": [],
      "dimensionW": [],
      "dispatchDates": [],
      "ids": [],
      "orderIds": [],
      "weight": [],
      "parcel": []
    }

    this.labeledOrders.forEach(ord => {
      ord.channelSales.forEach(data => {
        Obj.dimensionH.push(data.height);
        Obj.dimensionL.push(data.length);
        Obj.dimensionW.push(data.width);
        Obj.dispatchDates.push(formatDate(data.dispatchDate, "yyyy-MM-dd", this.locale));
        Obj.ids.push(data.id);
        Obj.orderIds.push(data.khubOrderId ? data.khubOrderId : data.channelOrderId);
        Obj.weight.push(data.weight);
        Obj.parcel.push("1");
      });
    })



    this.salsesOrdersService.getEligibleServicesForAmazonBuyShipping(Obj).subscribe((res: any) => {

      if (res?.payload?.shippingServiceList?.length > 0) {
        this.amBuyShippingOptions = res?.payload?.shippingServiceList;
      } else {
        this.toasterService.openToastMessage(ToastTypes.warning, 'Generate labels', "No Services Available");
      }
      this.loading = false;
    }, (error: any) => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Generate labels', "Error Occured ");
      this.loading = false;
    });
  }
  selectShippingMethod: boolean = true; shippingMethod: any = ''; labels: any = [];
  shippingMethodSelected: boolean = true;
  onShippingMethod() {
    let selectedItems = this.allSales.filter(sale => sale.selected == true);

    if (selectedItems.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Please Select atleast one order');
      this.loading = false;
      return;
    }
    this.selectShippingMethod = true;
  }
  onSelectShippingMethod(printOpt: any) {
    this.labels = this.allPrintLables.find(s => s.mname == printOpt);
    this.selectedCarrier = this.labels.name;
    this.selectedCarrier_code = this.labels.code;
    this.shippingMethodSelected = true;
    let sID = this.salsesOrdersService.getCarrierId(this.selectedCarrier);
    this.salsesOrdersService.getIntegrateDetails(sID).subscribe((res: any) => {
      //  ////console.log(res?.shippingRules.labelServiceClassDMList);
      if (sID == 3) {
        this.shippingMethods = res?.dpdCourierResponse.services;
      } else {
        this.shippingMethods = res?.shippingRules.labelServiceClassDMList;
      }
      if (sID == 1) {
        this.shippingMethods = res?.shippingRules.serviceFormatList;
      } else {
        this.shippingMethods = res?.shippingRules.labelServiceClassDMList;
      }
    });
    console.log(this.selectedCarrier);
    console.log(this.selectedCarrier_code);
  }
  onDCShippingMethod(printOpt: any) {
    this.labels = this.PrintLables.find(s => s.mname == printOpt);
    this.selectedCarrier = this.labels.name;
    this.selectedCarrier_code = this.labels.code;
    this.shippingMethodSelected = true;
    let sID = this.salsesOrdersService.getCarrierId(this.selectedCarrier);
    this.salsesOrdersService.getIntegrateDetails(sID).subscribe((res: any) => {
      //  ////console.log(res?.shippingRules.labelServiceClassDMList);
      if (sID == 3) {
        this.shippingMethods = res?.dpdCourierResponse.services;
      } else {
        this.shippingMethods = res?.shippingRules.labelServiceClassDMList;
      }
      if (sID == 1) {
        this.shippingMethods = res?.shippingRules.serviceFormatList;
      } else {
        this.shippingMethods = res?.shippingRules.labelServiceClassDMList;
      }
    });
    console.log(this.selectedCarrier);
    console.log(this.selectedCarrier_code);
  }
  errorOders = [];
  successOders = [];
  loadingMessage: any;
  selectedItemsLengthTemp = 0;

  async PrintLableOpen(printOpt) {
    this.selectedItemsLengthTemp = this.selectedItemsLength;
    this.printLabelJobs = true;
    this.isEdit = true;
    this.loadingMessage = 'Printing';
    this.errorOders = [];
    this.successOders = [];
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    this.selectedLabelssLength = selectedItems.length;
    if (selectedItems.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Sales Order', 'Please Select atleast one order');
      this.loading = false;
      return;
    }
    this.loading = true;
    const ids = selectedItems.map(ord => ord.khubOrderId ? ord.khubOrderId : ord.channelOrderId);
    this.selectedCarrier = printOpt.name;
    this.selectedCarrier_code = printOpt.code;
    if (this.isLabelsPrinted = true) {
      this.toasterService.openToastMessage(ToastTypes.info, 'Generate labels', 'Labels Generating');
    }

    for (let index = 0; index < selectedItems.length; index++) {
      let Obj = {
        "carriers": [],
        "dimensionH": [],
        "dimensionL": [],
        "dimensionW": [],
        "dispatchDates": [],
        "ids": [],
        "orderIds": [],
        "shippingMethods": [],
        "serviceformats": [],
        "packagemethod": [],
        "weight": [],
        "parcel": [],
        "amazonBuyShippingService": {}
      }
      Obj.carriers.push(selectedItems[index].shippingMethod);
      Obj.dimensionH.push(selectedItems[index].depth);
      Obj.dimensionL.push(selectedItems[index].length);
      Obj.dimensionW.push(selectedItems[index].width);
      Obj.dispatchDates.push(formatDate(new Date(), "yyyy-MM-dd", this.locale));
      Obj.ids.push(selectedItems[index].id);
      Obj.orderIds.push(selectedItems[index].channelOrderId);
      Obj.shippingMethods.push(selectedItems[index].shippingMethod);
      // Obj.serviceformats.push(data.serviceFormat);
      // Obj.packagemethod.push(data.serviceFormat);
      Obj.weight.push(selectedItems[index].weight);
      Obj.parcel.push("1");
      if (this.selectedCarrier_code == 'amazonbuyshipping') {
        Obj.amazonBuyShippingService = JSON.parse(JSON.stringify(this.amBuyShippingOptions.find(i => i.shippingServiceId == this.shippingservice)));
      }

      if (this.selectedCarrier_code != 'royalmail' && this.selectedCarrier_code != 'dropbox') {
        delete Obj.packagemethod;
      }
      if (this.selectedCarrier_code == 'royalmail' || this.selectedCarrier_code == 'dropbox') {
        if (!this.weight) {
          this.toasterService.openToastMessage(ToastTypes.warning, 'Generate labels', "Please enter weight in kgs");
          this.loading = false;
          return;
        }
        if (!this.serviceFormat) {
          this.toasterService.openToastMessage(ToastTypes.warning, 'Generate labels', "Please select service format");
          this.loading = false;
          return;
        }
      }
      const res: any = await this.salsesOrdersService.savePrintLabelsData1(Obj, this.selectedCarrier_code);
      if (res) {
        if (res?.errororders?.length > 0) {
          res?.errororders.forEach(order => {
            this.errorOders.push(order);
          });
        }

        if (res?.orders?.length > 0) {
          res?.orders.forEach(order => {
            this.successOders.push(order);
          });
        }
        if (index == 0) {
          this.loading = false;
          if (this.tab == 'error_labels') {
            $('#error-labels1').modal('show');
          } else {
            $('#error-labels').modal('show');
          }

        }

      }
    }
    for (let index = 0; index < this.successOders.length; index++) {
      await this.salsesOrdersService.getPrintedLabelsData1(this.successOders[index].id);

    }

    this.pdfDoc = await PDFDocument.create();

    let fnames = [];

    for (var i = 0; i < this.successOders.length; i++) {
      let ur = this.successOders[i];
      console.log(ur);
      let lablePDF = ur.labelPdfs[0];
      let fileName = lablePDF.split("/");
      fnames.push(fileName[(fileName.length - 1)]);

    }
    let self = this;

    let channelSales = [];
    this.successOders.forEach(order => {
      order.channelSales.find(i => {
        if (i.field12) {
          order.field12 = i.field12;
          channelSales.push(i);
        }
      })
    });

    if (this.successOders.length > 0) {
    //   let blob = await this.pdftoblobService.getBlob(fnames);
    // let file = new Blob([blob], { type: 'application/pdf' });
    // let fileURL = URL.createObjectURL(file);
    // window.open(fileURL);
       await this.createPdfSkus(await this.pdftoblobService.getBlob(fnames), channelSales);
      this.getDefaultData();
      this.getPrinters();

    } else {
      this.getDefaultData();
      this.getPrinters();
    }
    this.printLabelJobs = false;
  }


  goToErrorLabels() {
    this.errorLabelsClose()
    this.datasharingService.addtoTab({ icon: '', pmenu: 'Orders', menuname: 'Error Labels', routerLink: '/selleshub', haschildrens: false, tab: AllMenuTabs.error_labels, isPremium: false, isComingSoon: false });
    this.salsesOrdersService.refreshEvent.next('2');
  }
  goToPrintedLabels() {
    this.errorLabelsClose()
    this.datasharingService.addtoTab({ icon: '', pmenu: 'Orders', menuname: 'Ready To Shipment', routerLink: '/selleshub', haschildrens: false, tab: AllMenuTabs.ready_to_shipment, isPremium: false, isComingSoon: false });
    this.salsesOrdersService.refreshEvent.next('1');
  }

  switchOrdersView(event){
    if(!event || !event?.target?.checked){
       this.isOrdersView = false;
    } else if(event?.target?.checked){
      this.isOrdersView = true;
    }
  }
  currentOrder:any;
  toggleExpandOrder(o){
    this.currentOrder = o;
    o.isExpand = !o.isExpand;
    $('#viewSaleItems').modal('show');
  }

  viewSaleItemsClose() {
      $('#viewSaleItems').modal('hide');
      this.currentOrder = null;


  }
}
