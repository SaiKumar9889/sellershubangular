import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { GridType, CompactType, DisplayGrid } from 'angular-gridster2';

@Component({
  selector: 'app-print-packingslip-2',
  templateUrl: './print-packingslip.component.html',
  styleUrls: ['./print-packingslip.component.scss']
})
export class PrintPackingslipComponent implements OnInit {

 
  loading: boolean = false;
  options: any;
  ordersItems:any=[];
  taxAmount:any=0;
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

    this.currencyCode=this.ordersItems[0].currencyCode;


    this.taxAmount=this.printTemplate?.taxAmount;
    this.total=this.printTemplate?.total;
    this.vat=this.printTemplate?.vat;

    this.dashboard = template;

    console.log(this.dashboard);
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
      minCols: 2,
      maxCols: 2,
      minRows: 8,
      maxRows: 8,
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

  }
}
