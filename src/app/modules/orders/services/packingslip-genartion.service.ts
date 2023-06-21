import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { environment } from 'src/environments/environment';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class PackingslipGenartionService {

  constructor(private http: HttpClient) { }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

 

  getOrderIteDetailsPackingBarcode(selectedOrder: any) {

    let tbody = [];
    selectedOrder.channelSales.forEach(ch => {
      tbody.push([
        {
          text: ch?.title,
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          alignment: 'left',
          fontSize: 10,
        },
        {
          border: [false, false, false, true],
          text: ch.quantityPurchased,
          fillColor: '#f5f5f5',
          alignment: 'right',
          margin: [0, 5, 0, 5],
          fontSize: 10,
        },
      ]);
    });
    // console.log(tbody);
    return tbody;

  }
  // blobToBase64 = blob => new Promise((resolve, reject) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(blob);
  //   reader.onload = () => resolve(reader.result);
  //   reader.onerror = error => reject(error);
  // });
}
