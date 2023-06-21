import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { SalsesOrdersService } from '../services/salses-orders.service';
import { PDFDocument, PDFPage, rgb, StandardFonts } from 'pdf-lib';
import { PdftoblobService } from 'src/app/_service/pdftoblob.service';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-dispatch-console',
  templateUrl: './dispatch-console.component.html',
  styleUrls: ['./dispatch-console.component.scss']
})
export class DispatchConsoleComponent implements OnInit {

  constructor(@Inject(LOCALE_ID) public locale: string, public http: HttpClient, private salsesOrdersService: SalsesOrdersService, private router: Router, private toasterService: ToasterService, private pdftoblobService: PdftoblobService, private datasharingService: DatasharingService, private dbService: NgxIndexedDBService, private datePipe: DatePipe) { }
  filterBy: any = [];
  selectedFilter: any = []; selectedChannel: any = [];
  channelType: any = [];
  searchname: any = '0';
  searchValue2: any = '';
  fliter: any = '0';
  loading: boolean = false;
  collectionSize: any;
  allSales: any[] = [];
  pageSize = environment.defaultTotalValue;
  byOrderId: boolean = true;
  batchOrderId: boolean = false;
  byBarcode: boolean = false;
  allPrinters: any = [];
  allPrintLables: any = [];
  ngOnInit(): void {
    // this.getOrders()
    this.getPrinters();
    this.getPrintLabels();
  }
  getPrinters() {
    this.loading = true;
    this.salsesOrdersService.getPrinters().subscribe(res => {
      this.allPrinters = res;
      this.loading = false;
    }, error => {
      this.allPrinters = [];
      this.loading = false;
    })
  }
  getPrintLabels() {
    this.salsesOrdersService.getShippingCourier().subscribe((res: any) => {
      ////console.log(res);
      this.allPrintLables = res.filter(ord => ord.enable == true && ord.name != 'Amazon Buy Shipping');
      this.allPrintLables.map(ord => ord.mname = 'via ' + ord.name);
    }, error => {
      this.loading = false;
    })
  }
  getOrders() {
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
      // this.page = sales_orders?.page?.currentPageNumber;
      this.loading = false;
      // ////console.log(this.allSales);
    }, error => {
      this.loading = false;
    });
  }
  dispatch_order_id = '';
  batch_order_id = '';
  dispatch_bar_code = '';
  searchDetails: boolean = false;
  selectedOrderDet: any;
  onGoingOrderDet: any;
  selectedCarrier_v2: any = '';
  trackingNumber: any = '';
  dcweight: any = '';
  dcheight: any = '';
  dcwidth: any = '';
  dclength: any = '';
  dcscan: any = '';
  totalOrders: any = 0;
  getDetails() {
    this.loading = true;
    // let selectedItems = this.allSales.filter(sale => sale.selected == true);
    // const ids = selectedItems.map(ord => ord.id);
    if (this.dispatch_order_id != '') {
      this.salsesOrdersService.getDetailsBasedOnId(this.dispatch_order_id,1).subscribe((res: any) => {
        ////console.log(res);
        this.selectedOrderDet = res;
        if(res.channelSales.length > 0){
          this.searchDetails = true;
          this.onGoingOrderDet = this.selectedOrderDet.channelSales[0];
        this.trackingNumber = this.onGoingOrderDet.currentSale[0].trackingNumber
        this.dcheight = this.onGoingOrderDet.currentSale[0].depth
        this.dclength = this.onGoingOrderDet.currentSale[0].length
        this.dcweight = this.onGoingOrderDet.currentSale[0].weight
        this.dcwidth = this.onGoingOrderDet.currentSale[0].width
        this.totalOrders = this.selectedOrderDet.channelSales.length;
        this.selectedCarrier_v2 = this.onGoingOrderDet.currentSale[0].shippingMethod;
        }else{
          this.searchDetails = false;
        }
        if(this.onGoingOrderDet?.currentSale[0]?.orderStatus == 'Shipped'){
          this.searchDetails = false;
        }
        this.loading = false;
      }, error => {
        this.loading = false;
      })
    } else {

    }

  }
  dispatchDates: any = new Date();
  getOrderDetails(){
    this.loading = true;
    // let selectedItems = this.allSales.filter(sale => sale.selected == true);
    // const ids = selectedItems.map(ord => ord.id);
    if (this.batch_order_id != '') {
      this.salsesOrdersService.getDetailsBasedOnId(this.batch_order_id,1).subscribe((res: any) => {
        ////console.log(res);
        this.selectedOrderDet = res;
        if(res.channelSales.length > 0){
          this.onGoingOrderDet = this.selectedOrderDet.channelSales[0];
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
          res.channelSales.forEach(ord => {
            ord.currentSale.forEach(data => {
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
            });
          })
      
          this.salsesOrdersService.connfirmShipment(obj).subscribe((res: any) => {
            this.toasterService.openToastMessage(ToastTypes.success, 'Shipment confirmation', 'Shipment confirmed');
            this.loading = false;
            // this.modalActionclosed();
      
          }, error => {
            this.loading = false;
          })
        }else{
          this.searchDetails = false;
        }
        if(this.onGoingOrderDet?.currentSale[0]?.orderStatus == 'Shipped'){
          this.searchDetails = false;
        }
        this.loading = false;
      }, error => {
        this.loading = false;
      })
    } else {

    }
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
      this.loading = false;
      // this.modalActionclosed();

    }, error => {
      this.loading = false;
    })
  }
  splitViewItems: any = [];
  splitOrderItems: any = [];
  splitAddressItems: any = [];
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
  pdfDoc: PDFDocument;
  errorOders = [];
  successOders = [];
  loadingMessage: any;
  selectedItemsLengthTemp = 0;
  orederIsSelectedForEdit = false;
  selectedItemsLength: any;
  printLabelJobs: boolean = false;
  isEdit: boolean = false;
  selectedLabelssLength: any;
  labeledOrders: any;
  selectedCarrier: any = '';
  selectedCarrier_code: any = '';
  shippingMethods: any = '';
  showConfirmShipmentButton = false;
  isLabelsPrinted: boolean = false;
  amBuyShippingOptions: any = [];
  weight: any = '';
  length: any = '';
  shippingservice: any = ''; shippingmethod: any = ''
  width: any = '';
  height: any = '';
  serviceFormat = '';
  shippingdate = '';
  @Input()
  tab: string = '';
  printInvoiceData: any;
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
  getBuyShipServices() {

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
        Obj.orderIds.push(data.channelOrderId);
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
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
      // page.setWidth(page.getWidth() + 50);
      // page.setMediaBox(-30, 10, page.getWidth()-50, page.getHeight());

      await this.getTemplate(selectedItems[i].field12, page, selectedItems[i], pdfDoc);

    }
    const pdfBytes = await pdfDoc.save()
    let file = new Blob([pdfBytes], { type: 'application/pdf' });
    console.log(file)
    let fileURL = URL.createObjectURL(file);
    if (this.selectedPrinter) {
      this.createPrintJobs(blob, selectedItems);
    } else {
      window.open(fileURL);
    }


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
  selectedPrinter: any = 0;
  async createPrintJobs(blob: any, selectedItems: any) {
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
          this.loading = false;
        }, error => {
          this.loading = false;
        })

      };
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
        // this.getOrders();
      }, error => {
        $('#split-order').modal('hide');
        this.modalSplitClose();
        // this.getOrders();
      });

    });

  }
  modalSplitClose() {
    $('#split-order').modal('hide');
    this.clearSplitItems();
  }
  clearSplitItems() {
    this.splitViewItems = [];
    this.splitOrderItems = this.splitAddressItems.slice();
    this.splitOrderItems.map(sp => sp.selected = false);
  }
  splitIndividualSelection(orderItem: any) {
    this.splitOrderItems.find(sp => sp.id === orderItem.id).selected = !this.splitOrderItems.find(sp => sp.id === orderItem.id).selected;
    // ////console.log(this.splitOrderItems);
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
  isAllChecked: boolean = false;
  selectall(event: any) {
    ////console.log("selectall", event.target.value);
    this.isAllChecked = !this.isAllChecked;
    this.onGoingOrderDet?.currentSale.map((i: any) => {
      i.selected = this.isAllChecked
    }
    
    );
    ////console.log(this.allSales);
    let selectedItems = this.onGoingOrderDet?.currentSale.filter(sale => sale.selected == true);
    this.selectedItemsLength = selectedItems.length;
    
  }
  individualselection(sale: any) {
    let selectedItems = this.onGoingOrderDet?.currentSale.filter(sale => sale.selected == true);
    this.selectedItemsLength = selectedItems.length;
    if (selectedItems.length == 1) {
      this.orederIsSelectedForEdit = true;
    } else {
      this.orederIsSelectedForEdit = false;
    }
    if (selectedItems.length == this.onGoingOrderDet?.currentSale.length) {
      this.isAllChecked = true;
    } else {
      this.isAllChecked = false;
    }
  }
  errorLabelsClose() {
    // this.errorOders = [];
    // this.successOders = [];
    if(this.tab == 'error_labels'){
      $('#error-labels1').modal('hide');
    } else {
      $('#error-labels').modal('hide');
    }


  }
}
