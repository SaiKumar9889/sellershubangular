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
  selector: 'app-generalsettings',
  templateUrl: './generalsettings.component.html',
  styleUrls: ['./generalsettings.component.css']
})
export class GeneralsettingsComponent implements OnInit {
  loading:boolean=false;
  constructor(private appTrackingService:AppTrackingService, private toasterService: ToasterService, private generalService: GeneralSettingsService ) {
    let ip:usertrackInput={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.GENERALSETTINGSPAGE,function:"",descrption:"General settings page loaded"};
    this.appTrackingService.trackUserActivity(ip);
   }
  showCurrency:any=[];
  isCur: any;
  showGeneralSetting: any;
  weightKg: any;
  weightLb: any;
  lengths: any;
  heights: any;
  dimensionUnit: any;
  widths: any;
  currency: any;
  isAytomerge:any=false;;
  ngOnInit(): void {
    this.getCurrency();
    this.getDefaultSetting();
  }
  getDefaultSetting() {
    this.loading=true;
    // $('#printabletable').DataTable().destroy();
    this.generalService.getGeneralSetting().subscribe((res: any) => {
      ////console.log(res);
      this.showGeneralSetting = res['defaultsetting'];
      ////console.log('general',this.showGeneralSetting);
      if (this.showGeneralSetting.weightKg == null){
        //this.weightKg = 0;
      }
      else{
        this.weightKg = this.showGeneralSetting.weightKg;
      }

      if(this.showGeneralSetting.weightLb == null){
        //this.weightLb = 0;
      }
      else{
        this.weightLb = this.showGeneralSetting.weightLb;
      }

      if(this.showGeneralSetting.length == null){
        //this.lengths  = 0;
      }
      else{
        this.lengths  = this.showGeneralSetting.length;
      }

      if(this.showGeneralSetting.height == null){
        //this.heights  = 0;
      }
      else{
        this.heights  = this.showGeneralSetting.height;
      }

      if(this.showGeneralSetting.width == null){
        //this.widths   = 0;
      }
      else{
        this.widths   = this.showGeneralSetting.width;
      }
      this.dimensionUnit = this.showGeneralSetting.dimensionUnit;
      this.isCur = res.defaultCurrency;
      this.loading = false;
      this.isAytomerge=this.showGeneralSetting.automerge;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      // this.loadTablePagenation();
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };
  updateAutomerge(){
    this.isAytomerge=!this.isAytomerge;
  }
  getCurrency() {
    this.loading=true;
    $('#printabletable').DataTable().destroy();
    this.generalService.getGeneralSetting().subscribe((res: any) => {
      ////console.log(res);
      this.showCurrency = res['currencyList'];
      // this.collectionsize = res?.page?.totalResults;
      // this.page = res?.page?.currentPageNumber;
      this.loading = false;
      // if(this.showCurrency.length>0)
      // this.productTitle= this.showCurrency[0].title;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      // this.loadTablePagenation();
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };

  onCurrencychange(){
    // this.loading = true;
    this.isCur
    this.generalService.getsaveCurrency(this.isCur).subscribe((res: any) => {
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', res.error.text);
      // this.loading = false;
    })
    ////console.log(this.isCur);
  }

  getUnit(){
    ////console.log(this.dimensionUnit);
  }

  saveDefaultSetting(){
    this.loading = true;
    const data = {
      "weightLb": this.weightLb,
      "weightKg": this.weightKg,
      "length": this.lengths,
      "width": this.widths,
      "height": this.heights,
      "dimensionUnit": this.dimensionUnit,
      "automerge":this.isAytomerge
    };
    this.generalService.postSaveDefaultSetting(data).subscribe((res: string) => {
      ////console.log("result",res)
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', res);
      this.loading = false;
    });
  }
}
