import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GridType, CompactType, DisplayGrid } from 'angular-gridster2';
declare var $: any;

@Component({
  selector: 'app-print-orders',
  templateUrl: './print-orders.component.html',
  styleUrls: ['./print-orders.component.scss']
})
export class PrintOrdersComponent implements OnInit, OnChanges {

  loading: boolean = false;
  options: any;
  ordersItems:any=[];
  taxAmount:any=0;
  shippingPrice:any=0;
  total:any=0;
  vat:any=0;
  currencyCode:any='GBP';
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    //console.log(this.printTemplate);
    let temp = this.printTemplate?.invoiceBodyText;
    temp = temp.replace('<p>', '');
    temp = temp.replace('</p>', '');
    let template = JSON.parse(temp);
    this.ordersItems=this.printTemplate?.order?.channelSales;

    this.currencyCode=this.ordersItems[0].currencyCode == 'GBP'? '£':this.ordersItems[0].currencyCode;


    this.taxAmount=this.printTemplate?.order?.subTotal;
    this.shippingPrice=this.printTemplate?.shippingPrice;
    this.total=this.printTemplate?.order?.totalPrice;
    this.vat=this.printTemplate?.vat;

    // template?.forEach(gd=>{
    //   gd?.childs?.forEach(ch=>{
    //     if(ch.type=='field'){
    //       if(ch.key=='${shippingname!}')
    //       ch.text=this.printTemplate?.order?.shipName;
    //       if(ch.key=='${address_line1!}')
    //       ch.text=this.printTemplate?.order?.shipAddress1;
    //       if(ch.key=='${address_line2!}')
    //       ch.text=this.printTemplate?.order?.shipAddress2;
    //       if(ch.key=='${address_line3!}')
    //       ch.text=this.printTemplate?.order?.shipAddress3;
    //       if(ch.key=='${city!}')
    //       ch.text=this.printTemplate?.order?.shipCity;
    //       if(ch.key=='${state!}')
    //       ch.text=this.printTemplate?.order?.shipState;
    //       if(ch.key=='${postcode!}')
    //       ch.text=this.printTemplate?.order?.shipPostalCode;
    //       if(ch.key=='${country!}')
    //       ch.text=this.printTemplate?.order?.shipCountry;
    //       if(ch.key=='${ebay_record_number!}')
    //       ch.text=this.printTemplate?.order?.buyerName;
    //       if(ch.key=='${total_price!}')
    //       ch.text=this.printTemplate?.order?.totalPrice;
    //       if(ch.key=='${qty_sku_list!}')
    //       ch.text=this.printTemplate?.order?.buyerName;
    //       if(ch.key=='${shipping_charge!}')
    //       ch.text=this.printTemplate?.order?.shippingPrice;
    //       if(ch.key=='${order_id!}')
    //       ch.text=this.printTemplate?.order?.orderId;
    //       if(ch.key=='${royalmail_ppi!}')
    //       ch.text=this.printTemplate?.order?.buyerName;
    //       if(ch.key=='${checkout_message!}')
    //       ch.text=this.printTemplate?.order?.buyerName;
    //       if(ch.key=='${buyer_username!}')
    //       ch.text=this.printTemplate?.order?.buyerName;
    //       if(ch.key=='${order_notes!}')
    //       ch.text=this.printTemplate?.order?.buyerName;
    //       if(ch.key=='${invoice_no!}')
    //       ch.text=this.printTemplate?.order?.id;
    //       if(ch.key=='${order_date!}')
    //       ch.text=this.printTemplate?.order?.buyerName;
    //       if(ch.key=='${shipping_method!}')
    //       ch.text=this.printTemplate?.order?.buyerName;
    //     }
    //   })
    // });
    //console.log(template);

    this.dashboard = template;
  }

  @Input() printTemplate;
  dashboard: any[] = [];

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      margin: 0,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      minCols: 3,
      maxCols: 10,
      minRows: 8,
      maxRows: 20,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 250,
      fixedRowHeight: 100,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: false,
      },
      resizable: {
        enabled: false,
      },
      swap: false,
      pushItems: false,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: { north: true, east: true, south: true, west: true },
      pushResizeItems: false,
      displayGrid: DisplayGrid.None,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
    };
    console.log(this.printTemplate)

  }
  print() {
    // var mode = 'iframe'; //popup
    // var close = mode == "popup";
    // var options = {
    //   mode: mode,
    //   popClose: close
    // };
    // $("div.printableArea").printArea(options);

    const printContents = document.getElementById("section-to-print").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
   // window.print();

    // var winPrint = window.open('', '', '');

    // winPrint.document.write(document.body.innerHTML);
    // winPrint.document.close();
    // winPrint.focus();
    // winPrint.print();
    // winPrint.close();

    // var css = '@page { size: landscape; }',
    //   head = document.head || document.getElementsByTagName('head')[0],
    //   style:any = document.createElement('style');

    // style.type = 'text/css';
    // style.media = 'print';

    // if (style.styleSheet) {
    //   style.styleSheet.cssText = css;
    // } else {
    //   style.appendChild(document.createTextNode(css));
    // }

    // head.appendChild(style);
    // const printContents = document.getElementById("section-to-print").innerHTML;
    // document.body.innerHTML = printContents;
    // window.print();
    //    document.body.innerHTML = originalContents;
  }

}
