import { Component, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { BarcodeManagementService } from 'src/app/modules/settings/services/barcode-management.service';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-barcode-convert-to-sku',
  templateUrl: './barcode-convert-to-sku.component.html',
  styleUrls: ['./barcode-convert-to-sku.component.css']
})
export class BarcodeConvertToSkuComponent implements OnInit {
  loading:boolean=false;
  constructor( private toasterService: ToasterService, private barcodeService: BarcodeManagementService ) { }
  allCodes:any=[];collectionsize:any=[];page: number = 1;pageSize = 100;
  toValue = 'view';
  toTotal = environment.defaultTotalValue;
  ngOnInit(): void {
    this.getAttribute();
  }
  changespage(page: any) {
    this.getAttribute(page);
  }
  getAttribute(pagenum: number = 1) {
    this.loading=true;
    // $('#printabletable').DataTable().destroy();
    this.barcodeService.getSettingskubarcode(pagenum, this.toTotal, this.toValue).subscribe((res: any) => {
      ////console.log(res);
      this.allCodes = res?.barcodes || [];;
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
