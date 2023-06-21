import { Component, OnInit } from '@angular/core';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { ToastTypes } from 'src/app/_models/_toaster';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { BarcodeManagementService } from '../services/barcode-management.service';
declare var $: any;

@Component({
  selector: 'app-barcode-management',
  templateUrl: './barcode-management.component.html',
  styleUrls: ['./barcode-management.component.css']
})
export class BarcodeManagementComponent implements OnInit {
  loading:boolean=false;
  constructor(private appTrackingService:AppTrackingService, private toasterService: ToasterService, private barcodeService: BarcodeManagementService ) {
    let ip:usertrackInput={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.BARCODEMANAGEMENTPAGE,function:"",descrption:"Barcode management page loaded"};
    this.appTrackingService.trackUserActivity(ip);
   }
  allCodes:any=[];
  toSearchtext = '';collectionsize:any=[];pageSize = 100;page: number = 1;
  ngOnInit(): void {
    this.getUnusedbarcode();
  }
  changespage(page: any) {
    this.getUnusedbarcode(page);
  }
  getUnusedbarcode(pagenum: number = 1) {
    this.loading=true;
    ////console.log(this.toSearchtext);
    // $('#printabletable').DataTable().destroy();
    this.barcodeService.getSettingunusedbarcode(pagenum, this.toSearchtext).subscribe((res: any) => {
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

  // findUnusedbarcode(pagenum: number = 1) {
  //   this.loading=true;
  //   // $('#printabletable').DataTable().destroy();
  //   this.barcodeService.getSettingunusedbarcode(pagenum, this.toSearchtext).subscribe((res: any) => {
  //     ////console.log(res);
  //     this.allCodes = res?.barcodes || [];;
  //     // this.collectionsize = res?.page?.totalResults;
  //     // this.page = res?.page?.currentPageNumber;
  //     this.loading = false;
  //     // if(this.allCodes.length>0)
  //     // this.productTitle= this.allCodes[0].title;
  //     this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
  //     // this.loadTablePagenation();
  //   }, eoor => {
  //     this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
  //   });
  // };

 
}
