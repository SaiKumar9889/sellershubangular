import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { PdftoblobService } from 'src/app/_service/pdftoblob.service';
@Component({
  selector: 'app-print-labels',
  templateUrl: './print-labels.component.html',
  styleUrls: ['./print-labels.component.scss']
})
export class PrintLabelsComponent implements OnInit, AfterViewInit {
  pdfDoc: PDFDocument;
  constructor(private http: HttpClient, private pdftoblobService: PdftoblobService) { }


  async ngOnInit(): Promise<void> {

  }

  async ngAfterViewInit(): Promise<void> {
    this.pdfDoc = await PDFDocument.create();
    //et firstDoc = await PDFDocument.load(arrayB); 
    let urls: any[] = JSON.parse(localStorage.getItem('pdf'));
    let fnames = [];

    for (var i = 0; i < urls.length; i++) {
      let ur = urls[i];
      console.log(ur);
      let lablePDF = ur.labelPdfs[0];
      let fileName = lablePDF.split("/");
      fnames.push(fileName[(fileName.length - 1)]);

    }
    console.log(fnames);
    let blob = await this.pdftoblobService.getBlob(fnames);
    let file = new Blob([blob], { type: 'application/pdf' });
    let fileURL = URL.createObjectURL(file);
    window.open(fileURL);
    // urls.forEach(async ur => {
    //   ur.labelPdfs.forEach(async lablePDF => {
    //   let fileName=lablePDF.split("/");
    //   let blob=await this.pdftoblobService.getBlob(fileName[(fileName.length-1)]);
    //   // let file = new Blob([blob], { type: 'application/pdf' });
    //   // let fileURL = URL.createObjectURL(file);
    //   // window.open(fileURL);



    //   const firstDoc = await PDFDocument.load(blob);
    //   const firstPage = await this.pdfDoc.copyPages(firstDoc, firstDoc.getPageIndices());
    //   firstPage.forEach((page) => this.pdfDoc.addPage(page));
    //   // const pdfBytes = await this.pdfDoc.save();

    //   //  this.pdftoblobService.getBlob(fileName[(fileName.length-1)]).subscribe(async (res:any)=>{
    //   //    console.log(res);
    //   //   //  const firstPdfBytes = res.arrayBuffer();
    //   //   //  const firstDoc = await PDFDocument.load(firstPdfBytes);
    //   //   //  const firstPage = await this.pdfDoc.copyPages(firstDoc, firstDoc.getPageIndices());
    //   //   //  firstPage.forEach((page) => this.pdfDoc.addPage(page));
    //   //   //  const pdfBytes = await this.pdfDoc.save();
    //   //    let file = new Blob([res], { type: 'application/pdf' });
    //   //    let fileURL = URL.createObjectURL(file);
    //   //    window.open(fileURL);
    //   //  },async (error)=>{
    //   //   console.log(error);
    //   //   console.log(error.error.text);
    //   //   let blob = new Blob([error.error.text], { type: 'application/pdf' });
    //   //   var blobUrl = URL.createObjectURL(blob);
    //   //   // const firstPdfBytes = blob.arrayBuffer();
    //   //   // const firstDoc = await PDFDocument.load(await firstPdfBytes);
    //   //   // const firstPage = await this.pdfDoc.copyPages(firstDoc, firstDoc.getPageIndices());
    //   //   // firstPage.forEach((page) => this.pdfDoc.addPage(page));
    //   //   // const pdfBytes = await this.pdfDoc.save();
    //   //   // let file = new Blob([pdfBytes], { type: 'application/pdf' });
    //   //   // let fileURL = URL.createObjectURL(file);
    //   //   window.open(blobUrl);
    //   //  })
    //     // https://pre.sellershub.io:8080/new/blob?url=7761258e-b7c7-4d51-99d3-091c1bb637bb.pdf
    //     // const firstPdfBytes = await fetch(lablePDF, {
    //     //   method: "GET",
    //     //   headers: {
    //     //     "Content-Type": "text/plain",
    //     //     'access-control-allow-origin': 'true',
    //     //   }
    //     // }).then(res => res.arrayBuffer());
    //     // const firstDoc = await PDFDocument.load(firstPdfBytes);
    //     // const firstPage = await this.pdfDoc.copyPages(firstDoc, firstDoc.getPageIndices());
    //     // firstPage.forEach((page) => this.pdfDoc.addPage(page));
    //     // let headers = new HttpHeaders();
    //     // headers = headers.set('Accept', 'application/pdf').set('access-control-allow-origin', '*');
    //     // ref.http.get(lablePDF).subscribe(res=>{
    //     //   console.log(res);
    //     // },error=>{
    //     //   console.log(error);
    //     // });
    //   });

    //  const pdfBytes = await this.pdfDoc.save();
    //  let file = new Blob([pdfBytes], { type: 'application/pdf' });
    //  let fileURL = URL.createObjectURL(file);
    //  window.open(fileURL);
  };

  // const firstPdfBytes = await fetch("assets/images/sample.pdf").then(res => res.arrayBuffer());
  // const firstDoc = await PDFDocument.load(firstPdfBytes);
  // const firstPage = await this.pdfDoc.copyPages(firstDoc, firstDoc.getPageIndices());
  // firstPage.forEach((page) => this.pdfDoc.addPage(page));
  // const secondPdfBytes = await fetch("assets/images/sample.pdf").then(res => res.arrayBuffer());
  // const secondDoc = await PDFDocument.load(secondPdfBytes);
  // const secondPage = await this.pdfDoc.copyPages(secondDoc, secondDoc.getPageIndices());
  // secondPage.forEach((page) => this.pdfDoc.addPage(page));
  // const pdfBytes = await this.pdfDoc.save();
  // let file = new Blob([pdfBytes], { type: 'application/pdf' });
  // let fileURL = URL.createObjectURL(file);
  // window.open(fileURL);


}
