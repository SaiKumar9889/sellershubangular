import { Component, OnInit } from '@angular/core';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { ToastTypes } from 'src/app/_models/_toaster';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { GeneralSettingsService } from '../services/general-settings.service';

@Component({
  selector: 'app-automations',
  templateUrl: './automations.component.html',
  styleUrls: ['./automations.component.scss']
})
export class AutomationsComponent implements OnInit {
  isAytoSplit: boolean = false;

  constructor(private appTrackingService:AppTrackingService, private toasterService: ToasterService,private generalService: GeneralSettingsService) {
    let ip:usertrackInput={menu:TrackMenus.AUTOMATIONS,submenu:subMenus.OTHERS,page:pages.AUTOMATIONSPAGE,function:"",descrption:"Automations page loaded"};
    this.appTrackingService.trackUserActivity(ip);
   }
  isAytomerge:boolean=false;
  showGeneralSetting:any;
  ngOnInit(): void {
    this.getDefaultSetting();
  }
  getDefaultSetting() {
    // $('#printabletable').DataTable().destroy();
    this.generalService.getGeneralSetting().subscribe((res: any) => {
      ////console.log(res);
      this.showGeneralSetting = res['defaultsetting'];
      this.isAytomerge=this.showGeneralSetting.automerge;
      this.isAytoSplit=this.showGeneralSetting.autosplit;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };

  saveDefaultSetting(){
    const data = {
      "automerge":this.isAytomerge,
      "autosplit":this.isAytoSplit
    };
    this.generalService.postSaveDefaultSetting(data).subscribe((res: string) => {
      ////console.log("result",res)
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', res);
    });
  }

  updateAutomerge(){
    this.isAytomerge=!this.isAytomerge;
    this.saveDefaultSetting();
  }
  updateAutoSplit(){
    this.isAytoSplit=!this.isAytoSplit;
    this.saveDefaultSetting();
  }

}
