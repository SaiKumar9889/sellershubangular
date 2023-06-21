import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GridType, CompactType, DisplayGrid } from 'angular-gridster2';

@Component({
  selector: 'app-package-slip-view',
  templateUrl: './package-slip-view.component.html',
  styleUrls: ['./package-slip-view.component.scss']
})
export class PackageSlipViewComponent implements OnInit, OnChanges {

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
