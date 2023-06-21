import { Component, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { GeneralSettingsService } from '../services/general-settings.service';
declare var $: any;

@Component({
  selector: 'app-virtual-printer',
  templateUrl: './virtual-printer.component.html',
  styleUrls: ['./virtual-printer.component.scss']
})
export class VirtualPrinterComponent implements OnInit {
  allPrinters : any = [];
  loading:boolean=false;
  constructor(private generalService: GeneralSettingsService, private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.getPrinters();
  }
  getPrinters(){
      this.loading = true;
      this.generalService.getPrinters().subscribe((res: any) => {
      console.log(res);
      this.allPrinters = res ;
      // if(this.showCurrency.length>0)
      // this.productTitle= this.showCurrency[0].title;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Printers Retrieved');
      this.loading = false;
      // this.loadTablePagenation();
    }, error => {
      this.loading = false;
      console.log(error);
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  }
  downloadForMac(){

  }
  downloadForWindows(){}
  deletePrinter(){
    $('#delete-printer-modal').modal('show');
  }
  modalclosed() {
    $('#delete-printer-modal').modal('hide');
  }
}
