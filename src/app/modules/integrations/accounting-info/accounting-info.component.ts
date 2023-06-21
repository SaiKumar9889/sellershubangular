import { Component, OnInit } from '@angular/core';
import { AllMenuTabs } from 'src/app/_models/Tabs';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import accountingJson from '../../../../assets/config/accounting.json';
import { ChannelIntegrationService } from '../services/channel-integration.service';
@Component({
  selector: 'app-accounting-info',
  templateUrl: './accounting-info.component.html',
  styleUrls: ['./accounting-info.component.scss']
})
export class AccountingInfoComponent implements OnInit {
  accounting: any[] = accountingJson;
  loading: boolean = false;
  constructor(private channelintegrationService: ChannelIntegrationService,private toasterService: ToasterService, private datasharingService: DatasharingService) { }

  ngOnInit(): void {
    this.getIndex();
  }
  individualselection(acc: any) {
    acc.selected = !acc.selected;
    console.log(acc.selected);
    this.accounting.map(mp => {
      // ////console.log(mp);
      if (mp.channel_id === acc.channel_id) {
        mp.selected = true;
        //////console.log(row.channel_id);
      }
      else
        mp.selected = false;
    });
  }
  getIndex(){
    this.loading = true;
    this.channelintegrationService.getIndex().subscribe((res: any) => {
      if(res.accountingUser != null){
      this.accounting.map(mp => {
        // ////console.log(mp);
        if (mp.channel_title === res.accountingUser.type) {
          mp.selected = true;
          //////console.log(row.channel_id);
        }
        else
          mp.selected = false;
      });
    }else{
      this.accounting.map(mp => {
          mp.selected = false;
          //////console.log(row.channel_id);
      });
    }
      this.loading = false;
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  }
  openAccountingplace(account: any) {
    this.channelintegrationService.enableAccounting(account.channel_title,account.selected).subscribe((res: any) => {
      this.loading = false;
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
    this.datasharingService.changeActiveIntegration([account]);
    this.datasharingService.changeNewIntegration(true);
    this.accountingInteTab();
  }

  accountingInteTab() {
    let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.accounting_inte };
    this.datasharingService.addtoTab(menu);
  }
}
