import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { SalsesOrdersService } from '../../services/salses-orders.service';
import html2canvas from 'html2canvas';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
declare var $: any;
import domtoimage from 'dom-to-image';
@Component({
  selector: 'app-print-salesorders',
  templateUrl: './print-salesorders.component.html',
  styleUrls: ['./print-salesorders.component.scss']
})
export class PrintSalesordersComponent implements OnInit, OnDestroy {
  selectedOrderData: any;
  //  subs:Subscription;
  constructor(private dbService: NgxIndexedDBService, private salsesOrdersService: SalsesOrdersService, private datasharingService: DatasharingService) {

  }
  ngOnDestroy(): void {
    // this.subs.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
    //this.selectedOrderData=JSON.parse(localStorage.getItem('printDate'));
    this.dbService.getAll('shub').subscribe(async (peoples: any) => {
      //console.log(peoples);
      this.selectedOrderData = peoples.find(pp => pp.key == 'printData')?.value;
      this.selectedOrderData = JSON.parse(this.selectedOrderData);
      this.selectedOrderData?.forEach(so => {
        this.updatePrintInvoiceUpdatedSTatus(so.id);
      });
      //console.log(this.selectedOrderData);
      localStorage.removeItem('printDate');
      await this.delay(200);
      const printContents = document.getElementById("printOnly").innerHTML;
      // const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      //this.loading = false;
      window.resizeTo(1748,1240);
      window
      window.print();
      // this.dbService.clear('shub').subscribe((successDeleted) => {
      //   //console.log('success? ', successDeleted);
      // });
    });

    // this.selectedOrderData?.forEach(so=>{
    //   this.updatePrintInvoiceUpdatedSTatus(so.id);
    // })

    // ////console.log(this.selectedOrderData);
    // localStorage.removeItem('printDate');
    // await this.delay(500);    
    // const printContents = document.getElementById("printOnly").innerHTML;
    // const originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    // //this.loading = false;
    // window.print();
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  updatePrintInvoiceUpdatedSTatus(id) {
    this.salsesOrdersService.updatePrintInvoiceUpdatedSTatus(id).subscribe(res => {

    }, error => {
      //  this.loading = false;
    });
  }

  base64: any = [];
  content: any = [];
  imgSrc: any;
  public downloadAsPDF() {
    let ref = this;
    // this.selectedOrderData.forEach((dt, i) => {
    //   let ref=this;

    // });

    // html2canvas(document.querySelector("#printOnly"), { logging: true, useCORS: true, width: 1000, height: 1000, allowTaint: false, foreignObjectRendering: true }).then(canvas => {
    //   console.log(canvas);
    //   const base64Canvas = canvas.toDataURL("image/jpeg");
    //   this.imgSrc = base64Canvas;
    // });

    //   console.log(base64Canvas);
    //   // const pdfTable = this.pdfTable.nativeElement;
    //   // var html = htmlToPdfmake(pdfTable.innerHTML);


    //     //  var docDefinition = {
    //     //   content: ref.content,
    //     //   // a string or { width: number, height: number }
    //     //   pageSize: 'A6',
    //     //   // pageMargins: pageMargin,
    //     //   // by default we use portrait, you can change it to landscape if you wish
    //     //   pageOrientation: 'portrait',

    //     //   // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
    //     //   // pageMargins: [ 40, 60, 40, 60 ],
    //     // };
    //     // pdfMake.createPdf(docDefinition).print();



    //   // const docDefinition = { content: html };
    //   // pdfMake.createPdf(documentDefinition).open();
    //   // pdfMake.createPdf(documentDefinition).download();

    //   // pdfMake.createPdf(documentDefinition).open();


    // });
  }
}
