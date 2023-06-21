import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GridType, CompactType, DisplayGrid } from 'angular-gridster2';
declare var $: any;
@Component({
  selector: 'app-template-view',
  templateUrl: './template-view.component.html',
  styleUrls: ['./template-view.component.scss']
})
export class TemplateViewComponent implements OnInit, OnChanges {
  loading: boolean = false;
  options: any;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
  }

  @Input() dashboard;

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
    //     this.dashboard = [
    //       {
    //           "cols": 1,
    //           "rows": 1,
    //           "y": 0,
    //           "x": 0,
    //           "id": 1,
    //           "childrens": [],
    //           "childs": []
    //       },
    //       {
    //           "cols": 1,
    //           "rows": 1,
    //           "y": 0,
    //           "x": 1,
    //           "id": 2,
    //           "childrens": [],
    //           "type": "Badge",
    //           "childs": []
    //       },
    //       {
    //           "cols": 1,
    //           "rows": 1,
    //           "y": 1,
    //           "x": 2,
    //           "id": 3,
    //           "childrens": [],
    //           "type": "Invoice Info",
    //           "childs": [
    //               {
    //                   "type": "field",
    //                   "text": "Invoice Number",
    //                   "key": "invoicenumber"
    //               },
    //               {
    //                   "type": "field",
    //                   "text": "Invoice Date",
    //                   "key": "date"
    //               }
    //           ]
    //       },
    //       {
    //           "cols": 1,
    //           "rows": 2,
    //           "y": 2,
    //           "x": 0,
    //           "id": 4,
    //           "childrens": [],
    //           "type": "From Info",
    //           "childs": [
    //               {
    //                   "type": "field",
    //                   "text": "Name",
    //                   "key": "fromname"
    //               },
    //               {
    //                   "type": "field",
    //                   "text": "Address 1",
    //                   "key": "address1"
    //               },
    //               {
    //                   "type": "field",
    //                   "text": "Address 2",
    //                   "key": "address2"
    //               }
    //           ]
    //       },
    //       {
    //           "cols": 1,
    //           "rows": 2,
    //           "y": 2,
    //           "x": 1,
    //           "id": 5,
    //           "childrens": [],
    //           "childs": []
    //       },
    //       {
    //           "cols": 1,
    //           "rows": 2,
    //           "y": 2,
    //           "x": 2,
    //           "id": 6,
    //           "childrens": [],
    //           "type": "To Info",
    //           "childs": [
    //               {
    //                   "type": "field",
    //                   "text": "Name",
    //                   "key": "fromname"
    //               },
    //               {
    //                   "type": "field",
    //                   "text": "Address 1",
    //                   "key": "address1"
    //               },
    //               {
    //                   "type": "field",
    //                   "text": "Address 2",
    //                   "key": "address2"
    //               }
    //           ]
    //       },
    //       {
    //           "cols": 3,
    //           "rows": 4,
    //           "y": 4,
    //           "x": 0,
    //           "id": 7,
    //           "childrens": [],
    //           "type": "Item Details",
    //           "childs": [
    //               {
    //                   "type": "table",
    //                   "headers": [
    //                       "Column 1",
    //                       "Column 2",
    //                       "Column 3"
    //                   ]
    //               }
    //           ]
    //       },
    //       {
    //           "cols": 3,
    //           "rows": 1,
    //           "y": 8,
    //           "x": 0,
    //           "id": 8,
    //           "childrens": [],
    //           "type": "Total Details",
    //           "childs": [
    //               {
    //                   "type": "itemlabes",
    //                   "text": "Total",
    //                   "key": "totalcost"
    //               },
    //               {
    //                   "type": "itemlabes",
    //                   "text": "Subtotal",
    //                   "key": "subtotal"
    //               },
    //               {
    //                   "type": "itemlabes",
    //                   "text": "Vat (%)",
    //                   "key": "vat"
    //               }
    //           ]
    //       }
    //   ];
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
    window.print();

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
