import { Component, Inject, Input, OnInit } from '@angular/core';
import { EmailConfig } from 'src/app/_models/email-config';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { EmailConfigService } from '../services/email-config.service';

@Component({
  selector: 'app-email-config',
  templateUrl: './email-config.component.html',
  styleUrls: ['./email-config.component.scss']
})
export class EmailConfigComponent implements OnInit {

  //channelId
  @Input()
  channelId: number;

  //channelId
  @Input()
  id: number;

  //purchase Order Id
  @Input()
  poId: number;

  //purchase Order Id
  @Input()
  type: string;



  emailConfig: EmailConfig;

  emailConfigs: Array<EmailConfig> = [];
  loader: boolean = false;

  constructor(private emailConfServ: EmailConfigService, private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.getEmailConfig();
  }
  getEmailConfig() {
    this.loader = true;
    this.emailConfServ.getEmailConfig(this.id ? this.id.toString() : '', this.channelId ? this.channelId.toString() : '', this.type ? this.type.toString() : '').subscribe((resp: any) => {
      this.emailConfigs = resp.filter(i => i.enable);
      this.emailConfig = null;
      this.loader = false;
    })
  }

  testEmailConfig(id) {
    this.emailConfServ.testEmailConfig(id ? id.toString() : '').subscribe((resp: any) => {
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Successfully tested');
      this.emailConfigs = resp;
    })
  }
  removeEmailConfig(id) {
    this.emailConfServ.removeEmailConfig(id ? id.toString() : '').subscribe((resp: any) => {
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Smtp configuration removed');
      this.getEmailConfig();
    })
  }

  updateView(emailConfig: EmailConfig) {
    if (!this.emailConfig) {
      this.emailConfig = new EmailConfig();
    }
    Object.assign(this.emailConfig, emailConfig);
  }
  activateEmailConfig(emailConfig) {
    this.loader = true;
    this.emailConfigs.forEach(config => {
      if (config.id == emailConfig.id) {
        config.enable = true;
      } else {
        config.enable = false;
      }
    });

    this.emailConfServ.activateEmailConfig(this.emailConfigs).subscribe((resp: any) => {
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Smtp configuration saved successfully..');
      this.getEmailConfig();
      this.loader = false;
    }, error => {
      this.getEmailConfig();
      this.loader = false;
    })
  }

  closeEmailConfig() {
    this.emailConfig = null;
  }
  saveEmailConfig() {
    this.loader = true;
    this.emailConfServ.saveEmailConfig(this.emailConfig).subscribe((resp: any) => {
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Smtp configuration saved successfully..');
      this.getEmailConfig();
      this.loader = false;
    }, error => {
      this.loader = false;
    })
  }
  newTemplateOpen() {
    this.emailConfig = new EmailConfig();
    this.emailConfig.channelId = this.channelId;
    this.emailConfig.type = this.type.toUpperCase();
  }

}
