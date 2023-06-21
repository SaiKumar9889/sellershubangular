import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { SalsesOrdersService } from '../../services/salses-orders.service';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import html2canvas from 'html2canvas';
declare var $: any;
@Component({
  selector: 'app-print-packing-slip',
  templateUrl: './print-packing-slip.component.html',
  styleUrls: ['./print-packing-slip.component.scss']
})
export class PrintPackingSlipComponent implements OnInit {
  doc = new jsPDF();
  @ViewChild('pdfTable') pdfTable: ElementRef;
  selectedOrderData: any;
  //  subs:Subscription;
  constructor(private dbService: NgxIndexedDBService, private salsesOrdersService: SalsesOrdersService, private datasharingService: DatasharingService) {

  }
  ngOnDestroy(): void {
    // this.subs.unsubscribe();
  }

  content = [];
  async ngOnInit(): Promise<void> {
    this.dbService.getAll('shub').subscribe(async (peoples: any) => {
      console.log(peoples);
      this.selectedOrderData = peoples.find(pp => pp.key == 'printData')?.value;
      this.selectedOrderData = JSON.parse(this.selectedOrderData);
      console.log(this.selectedOrderData);
      // localStorage.removeItem('printDate');
      // await this.delay(200);
      // const printContents = document.getElementById("printOnly").innerHTML;
      // const originalContents = document.body.innerHTML;
      // document.body.innerHTML = printContents;    
      this.dbService.clear('shub').subscribe((successDeleted) => {
        //console.log('success? ', successDeleted);
      });

      this.selectedOrderData?.forEach(so => {
        console.log(so);
        let tbody = this.getOrderIteDetails(so);
        this.itemsInfo = {
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
        this.content = this.getContent(so);
        console.log(this.content);
      });
      this.delay(1000 * 20);
      this.downloadAsPDF();
    });

  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  base64: any = [];
  imgSrc: any;
  public downloadAsPDF() {
    var dd = {
      content: this.content,
      pageSize: 'A6',
      pageOrientation: 'portrait',
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
    pdfMake.createPdf(dd).open();
  }
  itemsInfo: any;
  getContent(slectedOrders: any) {
    let btext = JSON.parse(slectedOrders?.invoiceBodyText)?.find(tx => tx?.type == 'Image').childs[0].text;
    console.log(btext);
    // .childs[0].text
    let content = [
      {
        columns: [
          {
            image: btext,
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
                      text: slectedOrders?.order?.channelSales?.channelOrderId,
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
                      text: 'June 01, 2016',
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
            text: slectedOrders?.order?.shipAddress1 + ',' + slectedOrders?.order?.shipAddress2 + ',' + slectedOrders?.order?.shipAddress3 + '\n' + slectedOrders?.order?.shipCity + ' \n ' + slectedOrders?.order?.shipCountry + ' \n  ' + slectedOrders?.order?.shipPostalCode,
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
            text: slectedOrders?.order?.shippingMethod,
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
      // {
      //   columns: [
      //     {
      //       text:  slectedOrders?.order?.shipAddress1+','+ slectedOrders?.order?.shipAddress2+','+ slectedOrders?.order?.shipAddress3,
      //       style: 'invoiceBillingAddress',
      //       fontSize: 6,
      //     },
      //     {
      //       text: slectedOrders?.order?.shipAddress1+','+ slectedOrders?.order?.shipAddress2+','+ slectedOrders?.order?.shipAddress3+'\n'+slectedOrders?.order?.shipCity +' \n '+slectedOrders?.order?.shipCountry+' \n  '+slectedOrders?.order?.shipPostalCode,
      //       style: 'invoiceBillingAddress',
      //       fontSize: 6,
      //     },
      //   ],
      // },
      // {
      //   width: '100%',
      //   alignment: 'center',
      //   text: 'Invoice No. 123',
      //   bold: true,
      //   margin: [0, 0, 0, 0],
      //   fontSize: 8,
      // },
      '\n',
      this.itemsInfo,
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
                text: slectedOrders?.order?.shippingPrice,
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
      '\n',
      {
        text: 'NOTES',
        style: 'notesTitle',
      },
      {
        text: 'Some notes goes here Notes second line',
        style: 'notesText',
      }];
    return content;
  }

  getOrderIteDetails(selectedOrder) {
    let tbody = [[
      {
        text: 'Product SKU',
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
          text: ch.title,
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
}
