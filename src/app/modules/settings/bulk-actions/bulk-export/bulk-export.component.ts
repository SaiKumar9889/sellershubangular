import { Component, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { BulkActionsService } from 'src/app/modules/settings/services/bulk-actions.service';
declare var $: any;

@Component({
  selector: 'app-bulk-export',
  templateUrl: './bulk-export.component.html',
  styleUrls: ['./bulk-export.component.css']
})
export class BulkExportComponent implements OnInit {
  loading:boolean=false;
  constructor( private toasterService: ToasterService, private bulkService: BulkActionsService ) { }
  allBulk:any=[];
  toType: any;
  fileType;
  fileformat: any;
  ngOnInit(): void {
    this.getBulkexport();
  }
  getBulkexport() {
    this.loading=true;
    // $('#printabletable').DataTable().destroy();
    this.bulkService.getSettingbulkaction(this.toType,'','').subscribe((res: any) => {
      ////console.log(res);
      this.allBulk = res?.exportfiles || [];;
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

  onSearchByFileType(){
    this.fileType
    ////console.log(this.fileType);
  }

  removeBulkexport(id){
    this.loading=true;
    this.bulkService.getRemoveBulkexportfile(id).subscribe((res: any) => {
      ////console.log(res);
      this.allBulk = res?.exportfiles || [];
      this.loading = false;
    });

  }

  export(){
    
    if (this.fileformat == '' || this.fileformat == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Export', 'Please select file format');
      return;
    } 
    this.loading=true;
    this.bulkService.postBulkExport(this.fileformat,'export').subscribe((res: any) => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Export', 'export initiated');
      ////console.log(res);
      this.allBulk = res?.exportfiles || [];
      this.loading = false;

    });
  }


}
