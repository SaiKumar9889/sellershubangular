import { Component, OnInit } from '@angular/core';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { ToastTypes } from 'src/app/_models/_toaster';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { GeneralSettingsService } from '../services/general-settings.service';
declare var $: any;

@Component({
  selector: 'app-generalsetting-tax',
  templateUrl: './generalsetting-tax.component.html',
  styleUrls: ['./generalsetting-tax.component.css']
})
export class GeneralsettingTaxComponent implements OnInit {
  loading:boolean=false;
  constructor(private appTrackingService:AppTrackingService, private toasterService: ToasterService, private taxService: GeneralSettingsService ) {
    let ip:usertrackInput={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.GENERALSETTINGSPAGE,function:"",descrption:"General settings page loaded"};
    this.appTrackingService.trackUserActivity(ip);
   }
  allTax:any=[];
  taxname: any;
  taxrate: any;
  taxid: any;
  ngOnInit(): void {
    this.getSettingTax();
  }

  auditTrack(type:any){
    let ip:usertrackInput;
    if(type==1)
    ip={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.GENERALSETTINGSPAGE,function:"",descrption:"New button is clicked"};
    if(type==2)
    ip={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.GENERALSETTINGSPAGE,function:"",descrption:"Edit  button is clicked"};
    if(type==3)
    ip={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.GENERALSETTINGSPAGE,function:"",descrption:"Remove button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }
  getSettingTax() {
    this.loading=true;
    $('#printabletable').DataTable().destroy();
    this.taxService.getGeneralSetting().subscribe((res: any) => {
      ////console.log(res);
      this.allTax = res['taxRates'];
      // this.collectionsize = res?.page?.totalResults;
      // this.page = res?.page?.currentPageNumber;
      this.loading = false;
      // if(this.allTax.length>0)
      // this.productTitle= this.allTax[0].title;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      // this.loadTablePagenation();
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };

  modalclosed() {
    $('#taxrate-modal').modal('hide');
  }

  getEdittaxrate(id){

    this.taxid = id;
    $('#taxrate-modal').modal('show');
    if(id> -1){
      this.loading=true;
      this.taxService.geteditTaxrate(id).subscribe((res: any) => {
        this.taxname = res['name'];
        this.taxrate = res['rate'];
        this.taxid = res['id'];
        this.loading = false;
      });
    }

  }

  savetaxrate(id){
    const data = {
      "name": this.taxname,
      "rate": Number(this.taxrate)
    }
    this.taxService.geteditTaxrate(id).subscribe((res: any) => {
      this.taxService.postSaveTaxrate(data,res.id).subscribe((res: any) => {
        this.getSettingTax();
        this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', res.error.text);  
      });
    });
  }

  removetaxrate(id){
    this.taxService.getremoveTaxrate(id).subscribe((res: any) => {
      ////console.log(res);
      this.allTax = res;
    })
  }

}
