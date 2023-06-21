import { Component, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { InventorySyncService } from 'src/app/modules/settings/services/inventory-sync.service';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
declare var $: any;

@Component({
  selector: 'app-inventry-sync-exclude',
  templateUrl: './inventry-sync-exclude.component.html',
  styleUrls: ['./inventry-sync-exclude.component.css']
})
export class InventrySyncExcludeComponent implements OnInit {
  loading:boolean=false;
  constructor(private appTrackingService:AppTrackingService, private toasterService: ToasterService, private syncService: InventorySyncService ) {
    let ip:usertrackInput={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.INVENTORYSYNCRONIZEPAGE,function:"",descrption:"Inventory syncronize page loaded"};
    this.appTrackingService.trackUserActivity(ip);
   }
  allSync:any=[];
  toSearchtext = '';
  selectedIndexes = [];
  ngOnInit(): void {
    this.getAttribute();
  }

  auditTrack(type:any){
    let ip:usertrackInput;
    if(type==1)
    ip={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.INVENTORYSYNCRONIZEPAGE,function:"",descrption:"Save button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }
  getAttribute(pagenum: number = 1) {
    this.loading=true;
    // $('#printabletable').DataTable().destroy();
    this.syncService.getSettingsyncchannel().subscribe((res: any) => {
      ////console.log(res);
      this.allSync = res?.listOfSku || [];;
      // this.collectionsize = res?.page?.totalResults;
      // this.page = res?.page?.currentPageNumber;
      this.loading = false;
      // if(this.allSync.length>0)
      // this.productTitle= this.allSync[0].title;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      // this.loadTablePagenation();
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };

  removeProductsFromInventory(){
    let skuArr = []
    this.selectedIndexes.forEach(i => {
      skuArr.push('sku='+this.allSync[i]['sku']);
    });
    this.syncService.excludeSync(skuArr).subscribe((res: any) => {
      ////console.log(res);
      this.allSync = this.allSync.filter((d,i) => this.selectedIndexes.indexOf(i) < 0);
      this.selectedIndexes = [];
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Successfully Removed Products');
      // this.loadTablePagenation();
    }, (error) => {
      console.error(error)
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  }

  selectOrUnSelectProducts(event,i){
    if(event.target.checked && this.selectedIndexes.indexOf(i)< 0){
      this.selectedIndexes.push(i);
    } else {
      this.selectedIndexes = this.selectedIndexes.filter(n => n!= i)
    }
  }


}
