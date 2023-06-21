import { Component, OnInit } from '@angular/core';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { ToastTypes } from 'src/app/_models/_toaster';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { BulkActionsService } from '../services/bulk-actions.service';
declare var $: any;

@Component({
  selector: 'app-bulk-actions',
  templateUrl: './bulk-actions.component.html',
  styleUrls: ['./bulk-actions.component.css']
})
export class BulkActionsComponent implements OnInit {
  loading:boolean=false;
  constructor(private appTrackingService:AppTrackingService, private toasterService: ToasterService, private bulkService: BulkActionsService ) { 
    let ip:usertrackInput={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.BULKACTIONSPAGE,function:"",descrption:"Bulk actions page loaded"};
    this.appTrackingService.trackUserActivity(ip);
  }
  allBulk:any=[];
  toType: any;
  fileList: any = [];
  fileType;
  fileformat: any;
  sampleFile: any;

  ngOnInit(): void {
    this.getBulkimport();
  }
  auditTrack(type:any){
    let ip:usertrackInput;
    if(type==1)
    ip={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.BULKACTIONSPAGE,function:"",descrption:"Upload button is clicked"};
    if(type==2)
    ip={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.BULKACTIONSPAGE,function:"",descrption:"Download button is clicked"};
    if(type==3)
    ip={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.BULKACTIONSPAGE,function:"",descrption:"Remove All Files button is clicked"};
    if(type==4)
    ip={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.BULKACTIONSPAGE,function:"",descrption:"Remove button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }
  getBulkimport() {
    this.loading=true;
    // $('#printabletable').DataTable().destroy();
    this.bulkService.getSettingbulkaction(this.toType,'','').subscribe((res: any) => {
      ////console.log(res);
      this.allBulk = res?.importfiles || [];;
      // this.collectionsize = res?.page?.totalResults;
      // this.page = res?.page?.currentPageNumber;
      this.loading = false;
      // if(this.allBulk.length>0)
      // this.productTitle= this.allBulk[0].title;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      // this.loadTablePagenation();
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };

  modalclosed() {
    $('#download-modal').modal('hide');
  }

  selectFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    this.fileList = element.files;
  }

  onSearchByFileType(){
    this.fileType = this.fileformat;
    ////console.log(this.fileType);
  }

  uploadFile() {
    if (this.fileList.length) {
      this.bulkService.postBulkimport(this.fileType, this.fileList[0])
        .subscribe((settingbulkexport) => {
          ////console.log(settingbulkexport);
          this.getBulkimport();
          // this.subject_new$.next(settingbulkexport);
        });
    }
  }

  removeBulkimport(id){
    this.loading=true;
    this.bulkService.getRemoveBulkimportfile(id).subscribe((res: any) => {
      ////console.log(res);
      this.allBulk = res?.importfiles || [];
      this.loading = false;
    });

  }

  csvfile(){
    $('#download-modal').modal('show');
    this.sampleFile = [
      {
        "channel_id": "1",
        "file_type": "General Product CSV File Format",
        "description": "This is a general file format specific to Sellershub Platform. Use this file to import your inventory in bulk to Sellershub. If you use an existing SKUs in Sellershub inventory,those products will be updated.",
        "file_link": "https://s3-us-west-2.amazonaws.com/khubbulkactions/SampleKartzhubProductImportFile.csv"
      },
      {
        "channel_id": "2",
        "file_type": "Order CSV File Format",
        "description": "This is the order import file format specific to Sellershub Platform. Use this file to import your orders in bulk to Sellershub",
        "file_link": "https://s3-us-west-2.amazonaws.com/khubbulkactions/SampleKartzhubOrderImportFile.csv"
      },
      {
        "channel_id": "3",
        "file_type": "SKU Quantity Update File Format",
        "description": "This is a simple CSV file to update quantities for a given list of SKUs. Please note that this will update quantities for all matching(by SKU) marketplace items as well.",
        "file_link": "https://s3-us-west-2.amazonaws.com/khubbulkactions/QTYSKU.csv"
      },
      {
        "channel_id": "4",
        "file_type": "Price Update File Format",
        "description": "This is a simple CSV file to update prices for all channels for a given list of SKUs. Please note that this will update prices for all matching(by SKU) marketplace items as well. Inventory synchronization must be switched on for marketplace and e-commerce store updates.",
        "file_link": "https://s3-us-west-2.amazonaws.com/khubbulkactions/kartzhubcsvbulkpriceupdate.xlsx"
      },
      {
        "channel_id": "5",
        "file_type": "Barcode Import File",
        "description": "This is a simple CSV file to bulk import barcodes to the inventory. This import can be used to bulk update barcodes for given SKUs and also to import unused barcodes to use with automatic assigning of barcodes.",
        "file_link": "https://s3-us-west-2.amazonaws.com/khubbulkactions/kartzhubcsvbarcodeimportfile.csv"
      },
      {
        "channel_id": "6",
        "file_type": "SKU Linking File",
        "description": "This is a simple CSV file to link SKUs in the inventory. This import can be used to link multiple SKUs into a common SKU.",
        "file_link": "https://s3-us-west-2.amazonaws.com/khubbulkactions/kartzhubcsvlinkskuimportfile.csv"
      },
      {
        "channel_id": "7",
        "file_type": "SKU Merge File",
        "description": "This is a simple CSV file to Merge SKUs in the inventory. This import can be used to merge multiple SKUs into a common SKU.",
        "file_link": "https://s3-us-west-2.amazonaws.com/khubbulkactions/kartzhubcsvmergeskuimportfile.csv"
      },
      {
        "channel_id": "8",
        "file_type": "Warehouse Locations",
        "description": "This is a simple CSV file to import warehouse locations into Sellershub system.",
        "file_link": "https://s3-us-west-2.amazonaws.com/khubbulkactions/warehousebulkactions.csv"
      },
      {
        "channel_id": "9",
        "file_type": "SKU Locations",
        "description": "This is a simple CSV file to assign SKUs to locations.",
        "file_link": "https://s3-us-west-2.amazonaws.com/khubbulkactions/skuwarehouselocations.csv"
      },
      {
        "channel_id": "10",
        "file_type": "Assign suppliers to Products",
        "description": "This is a simple CSV file to assign suppliers to products. Each product can have more than one supplier.",
        "file_link": "https://s3-us-west-2.amazonaws.com/khubbulkactions/supplierskusamplefile.csv"
      },
    ]
  }
}
