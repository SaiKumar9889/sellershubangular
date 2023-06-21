import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-print-po',
  templateUrl: './print-po.component.html',
  styleUrls: ['./print-po.component.scss']
})
export class PrintPoComponent implements OnInit {
  printPo:any;
  printpoProd:any;
  totalprice:any=0;
  constructor(private dbService: NgxIndexedDBService) { }
  loading:boolean=false;
  ngOnInit(): void {
    this.dbService.getAll('shub').subscribe(async (peoples: any) => {
      // console.log(peoples);
      this.printPo = peoples.find(pp => pp.key == 'printpo')?.value;
      this.printpoProd = peoples.find(pp => pp.key == 'printpoProd')?.value;
     
      this.printPo = JSON.parse(this.printPo);
      this.printpoProd = JSON.parse(this.printpoProd);
 
     
      // this.selectedOrderData_res.forEach(order => {
      //   this.header = JSON.parse(order.channelUser.labelFooterText);
      //   order.channelSales.forEach(co => {
      //     co.warehouseLocations = order?.kartzhubProduct?.warehouseLocations;
      //     co.shipPostalCode=order.shipPostalCode;
      //     this.selectedOrderData.push(co);
      //   });
      // })
      // this.printPo= res;
      this.printpoProd.forEach(pr=>{
     
        this.totalprice=Number(this.totalprice)+Number(pr.lineTotalPrice);
      })
      // localStorage.removeItem('printpacklist');
      await this.delay(100);
      const printContents = document.getElementById("printOnly").innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      this.loading = false;
      window.print();
    });
  }
 
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
