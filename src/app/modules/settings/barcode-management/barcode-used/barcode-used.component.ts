import { Component, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { BarcodeManagementService } from 'src/app/modules/settings/services/barcode-management.service';
declare var $: any;

@Component({
  selector: 'app-barcode-used',
  templateUrl: './barcode-used.component.html',
  styleUrls: ['./barcode-used.component.css']
})
export class BarcodeUsedComponent implements OnInit {
  loading:boolean=false;
  constructor( private toasterService: ToasterService, private barcodeService: BarcodeManagementService ) { }
  allCodes:any=[];collectionsize:any=[];page: number = 1;pageSize = 100;
  Barcode = '';
  ngOnInit(): void {
    this.getUsedbarcode();
  }
  changespage(page: any) {
    this.getUsedbarcode(page);
  }
  getUsedbarcode(pagenum: number = 1) {
    this.loading=true;
    // $('#printabletable').DataTable().destroy();
    this.barcodeService.getSettingusedbarcode(pagenum, this.Barcode).subscribe((res: any) => {
      ////console.log(res);
      this.allCodes = res?.barcodes || [];
      this.collectionsize = res?.page?.totalResults;
      // this.page = res?.page?.currentPageNumber;
      this.loading = false;
      // if(this.allCodes.length>0)
      // this.productTitle= this.allCodes[0].title;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      // this.loadTablePagenation();
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };

 
}
