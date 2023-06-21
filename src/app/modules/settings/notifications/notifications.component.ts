import { Component, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { NotificationService } from "../services/notification.service";
declare var $: any;

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  loading:boolean=false;
  constructor( private toasterService: ToasterService, private notifyService: NotificationService ) { }
  showCurrency:any=[];
  isCur: any;
  showGeneralSetting: any;
  mailSetting;
  showSetting;
  allChannel: any;
  allSMSnotify: any;
  minimumstocklevelid;
  lowstockeamilid;
  enable;
  type;

  ngOnInit(): void {
    // this.getNotification();
  }

  modalclosed() {
    $('#notify_1-modal').modal('hide');
  }

  notify1Model(){
    this.type = 'lowstock';
    this.loading=true;
    this.notifyService.getNotification(this.type).subscribe((res: any) => {
      ////console.log(res);
      this.showSetting = res?.notification || []
      this.lowstockeamilid  = this.showSetting['email'];
      this.minimumstocklevelid  = this.showSetting['lowstockValue'];
      this.enable  = this.showSetting['enable'];
      if(this.showSetting['enable'] == true){
        this.enable = 'checked';
      }else{
        this.enable = '';
      }
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      // this.loadTablePagenation();
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
    $('#notify_1-modal').modal('show');
  }

  notify2Model() {
    this.loading=true;
    this.type = 'newordernotificationseller';
    this.notifyService.getNotification(this.type).subscribe((res: any) => {
      ////console.log(res);
      this.allChannel = res?.channelUsersall || [];
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      // this.loadTablePagenation();
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });

    $('#notify_2-modal').modal('show');
  };

  notify3Model() {
    this.loading=true;
    this.type = 'newordersmsnotification';
    this.notifyService.getNotification(this.type).subscribe((res: any) => {
      ////console.log(res);
      this.allSMSnotify = res?.channelUsersall || [];
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      // this.loadTablePagenation();
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });

    $('#notify_3-modal').modal('show');
  };
}
