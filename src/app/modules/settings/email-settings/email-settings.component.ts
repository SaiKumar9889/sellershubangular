import { Component, OnInit } from '@angular/core';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { ToastTypes } from 'src/app/_models/_toaster';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { EmailSettingService } from '../services/email-setting.service';
declare var $: any;

@Component({
  selector: 'app-email-settings',
  templateUrl: './email-settings.component.html',
  styleUrls: ['./email-settings.component.css']
})
export class EmailSettingsComponent implements OnInit {
  loading:boolean=false;
  constructor(private appTrackingService:AppTrackingService, private toasterService: ToasterService, private emailService: EmailSettingService ) { 
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

  mailSetting;
  showSetting;

  smtHost;
  mailPort;
  smtpName;
  smtpPass;
  mailFrom;
  ngOnInit(): void {
    this.getEmailSetting();
  }
  auditTrack(type:any){
    let ip:usertrackInput;
    if(type==1)
    ip={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.GENERALSETTINGSPAGE,function:"",descrption:"Save button is clicked"};
    if(type==2)
    ip={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.GENERALSETTINGSPAGE,function:"",descrption:"Test Connection button is clicked"};
    if(type==3)
    ip={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.GENERALSETTINGSPAGE,function:"",descrption:"Remove Settings button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }
  getEmailSetting() {
    this.loading=true;
    $('#printabletable').DataTable().destroy();

    this.emailService.getMailSetting().subscribe((res: any) => {
      ////console.log(res);
      this.showSetting = res['setting'];
      this.smtHost  = this.showSetting?.smtpHost;
      this.mailPort = this.showSetting?.smtpPort;
      this.smtpName = this.showSetting?.smtpUserName;
      this.smtpPass = this.showSetting?.smtpPassword;
      this.mailFrom = this.showSetting?.fromEmail;
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      // this.loadTablePagenation();
    }, (error) => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };

  resetForm(){
    this.emailService.getRemovesmtp().subscribe((res: any) => {
      ////console.log(res);
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', res);
      this.getEmailSetting();

    }, (error) => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
    // this.smtHost  = undefined
    // this.mailPort = undefined
    // this.smtpName = undefined
    // this.smtpPass = undefined
    // this.mailFrom = undefined
  }

  testconnection(){
    this.loading=true;
    this.emailService.getTestsmptcon().subscribe(() => {},(testcon:any) => {
      // ////console.log("id", editatt);
        ////console.log("msg", testcon.error.text);
        this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', testcon.error.text);
        this.loading = false;
    });
  }

  saveConnection(){
    this.emailService.getSavesmptcon(this.smtHost,this.mailPort,this.smtpName,this.smtpPass,this.mailFrom).subscribe((res:any) => {
      // ////console.log("id", editatt);

        ////console.log("msg", res);
        this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', res);
    });
  }
}
