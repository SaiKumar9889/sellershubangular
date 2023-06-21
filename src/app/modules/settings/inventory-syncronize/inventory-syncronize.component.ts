import { Component, OnInit } from '@angular/core';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { ToastTypes } from 'src/app/_models/_toaster';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { InventorySyncService } from '../services/inventory-sync.service';
declare var $: any;

@Component({
  selector: 'app-inventory-syncronize',
  templateUrl: './inventory-syncronize.component.html',
  styleUrls: ['./inventory-syncronize.component.css']
})
export class InventorySyncronizeComponent implements OnInit {
  loading:boolean=false;
  constructor(private appTrackingService:AppTrackingService, private toasterService: ToasterService, private syncService: InventorySyncService ) { 
    let ip:usertrackInput={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.INVENTORYSYNCRONIZEPAGE,function:"",descrption:"Inventory syncronize page loaded"};
    this.appTrackingService.trackUserActivity(ip);
  }
  allSync:any=[];
  toSearchtext = '';
  syncnew;
  ngOnInit(): void {
    this.inventorysync();
  }
  
  auditTrack(type:any){
    let ip:usertrackInput;
    if(type==1)
    ip={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.INVENTORYSYNCRONIZEPAGE,function:"",descrption:"Save Syncronize Settings button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }
  inventorysync(pagenum: number = 1) {
    this.loading=true;
    // $('#printabletable').DataTable().destroy();
    this.syncService.getSettingsyncchannel().subscribe((res: any) => {
      ////console.log(res);
      this.allSync = res?.channelUsersall || [];;
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

  syncid=[];
  saveSync(e,sync){
    // this.syncnew = e.target.value;
    //console.log(sync,e.target.value);
    sync.synchronizeInventory=!sync.synchronizeInventory;
    // sync.synchronizeInventory=sync;
    // if(syncs)
    // this.syncid.push(sync.id);
   
  }

  saveSyncSettings(){
    let qparam='?synchronize=true';
    console.log(this.allSync);
    let syncFields=this.allSync.filter(sync=>sync.synchronizeInventory==true);
    console.log(syncFields);
    syncFields.forEach(id=>{
      qparam=qparam+'&channeluserid='+id.id;
    })
    this.syncService.savesaveSync(qparam).subscribe((res: any) => {
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Succesfully Saved');
    },error=>{
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Succesfully Saved');
    })
  }
}
