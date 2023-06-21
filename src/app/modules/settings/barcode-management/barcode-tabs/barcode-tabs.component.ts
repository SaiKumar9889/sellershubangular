import { Component, OnInit } from '@angular/core';
import { BarcodeManagementService } from 'src/app/modules/settings/services/barcode-management.service';
import { environment } from 'src/environments/environment';
import { ToasterService } from 'src/app/_service/toaster.service';
import { ToastTypes } from 'src/app/_models/_toaster';

@Component({
  selector: 'app-barcode-tabs',
  templateUrl: './barcode-tabs.component.html',
  styleUrls: ['./barcode-tabs.component.css']
})
export class BarcodeTabsComponent implements OnInit {
  loading:boolean=false;
  addbarcode: boolean = true;
  constructor(private barcodeService: BarcodeManagementService, private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.addBarcode();
  }

  addBarcode(){
    this.loading=true;
    this.barcodeService.getSettingaddunusedbarcode(this.addbarcode).subscribe((res: any) => {
      if(res === true){
        this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Success');
        this.loading = false;
      }
      else{
        this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', res.error.text);
        this.loading = false;
      }
    })
  }

}
