import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import Swal from 'sweetalert2';
import { ChannelIntegrationService } from '../../services/channel-integration.service';
import { XeroInteService } from '../../services/xero-inte.service';

@Component({
  selector: 'app-xero',
  templateUrl: './xero.component.html',
  styleUrls: ['./xero.component.scss']
})
export class XeroComponent implements OnInit {
  loading: boolean = false;
  allChannel: any[] = [];
  type: any = "XERO";
  accountingUser: any;
  templates: any;
  TrackingCategories: any = [];
  taxRates: any = [];
  accounts: any = [];
  paymentTypes: any = [];
  paymentType: any = [];
  account: any = [];
  taxType: any = [];
  trackingCategory: any = [];
  InvoiceStatus: any = "AUTHORIZED";
  @Input() isNewIntegration = false;
  constructor(private toasterService: ToasterService, private channelintegrationService: ChannelIntegrationService, private XeroInteService: XeroInteService, private datasharingService: DatasharingService) { }
  ngOnChanges(changes: SimpleChanges): void {
    ////console.log(changes.isNewIntegration.currentValue);
    ////console.log(changes.channelId.currentValue);

    if (!this.isNewIntegration) {
      this.getAccountingInfo();
    }
  }
  ngOnInit(): void {
    this.getAccountingInfo();
  }
  getAccountingInfo() {
    this.loading = true;
    this.XeroInteService.getAccountingInfo(this.type).subscribe((res: any) => {
      console.log(res);
      this.accountingUser = res.accountingUser;
      this.allChannel = res.channelUsers;
      if (this.accountingUser != null) {
        if (this.accountingUser.accessToken != null) {
          this.isNewIntegration = false;
        }
      if (this.accountingUser.displayTemplates != null) {
        res.channelUsers.forEach(i => {
          i.selected = i?.enable;
          i.PaymentID = i?.channelRulesJSON?.xeroPayment;
          if (i?.channelRulesJSON?.xeroPayment != null) {
            this.paymentType.push(i.PaymentID);
          }
          this.paymentTypes = this.paymentTypes.filter(wh => wh.Code == i.PaymentID);
          i.Code = i?.channelRulesJSON?.xeroAccount;
          this.accounts = this.accounts.filter(wh => wh.Code == i.Code);
          if (i?.channelRulesJSON?.xeroAccount != null) {
            this.account.push(i.Code);
          }
          i.TaxType = i?.channelRulesJSON?.xeroTax;
          if (i?.channelRulesJSON?.xeroTax != null) {
            this.taxType.push(i.TaxType);
          }
          this.taxRates = this.taxRates.filter(wh => wh.TaxType == i.TaxType);
          i.TrackingOptionID = i?.channelRulesJSON?.xeroTracking;
          if (i?.channelRulesJSON?.xeroTracking != null) {
            this.trackingCategory.push(i.TrackingOptionID);
          }
          this.TrackingCategories = this.TrackingCategories.filter(wh => wh.TrackingOptionID == i.TrackingOptionID);
          if (!i.PaymentID) {
            i.PaymentID = '';
          }
          if (!i.Code) {
            i.Code = '';
          }
          if (!i.TaxType) {
            i.TaxType = '';
          }
          if (!i.TrackingOptionID) {
            i.TrackingOptionID = '';
          }
        })
        this.templates = JSON.parse(this.accountingUser.displayTemplates);
        this.templates.TrackingCategories.forEach(wh =>this.TrackingCategories = wh.Options);
        // this.TrackingCategories = this.templates.TrackingCategories.Options;
        this.taxRates = this.templates.taxRates;
        this.accounts = this.templates.accounts;
        this.paymentTypes = this.templates.accounts;
        this.TrackingCategories = this.TrackingCategories.filter(wh => wh.Status == "ACTIVE");
        this.taxRates = this.taxRates.filter(wh => wh.Status == "ACTIVE");
        this.accounts = this.accounts.filter(wh => wh.Status == "ACTIVE" && wh.Type != "REVENUE");
        this.paymentTypes = this.paymentTypes.filter(wh => wh.Status == "ACTIVE" && wh.Type == "REVENUE");
        console.log(this.templates);
      }
    }
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }
  connectToxero() {
    this.loading = true;
    this.XeroInteService.createIntegratedData(this.type).subscribe((res: any) => {
      console.log(res);
      let data = res?.data;
      let url = data.replace('redirect:', '');

      (window as any).open(url, "_blank");
      this.isNewIntegration = false;
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }
  downloadOrders() {
    this.XeroInteService.downloadOrders(this.accountingUser.id, this.accountingUser.kartzhubUserId).subscribe((res: any) => {
      console.log(res);
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }
  individualselection(channel) {
    this.loading = true;
    channel.selected = !channel.selected;
    console.log(channel);
    this.XeroInteService.enableChannel(this.type, channel.selected, channel.id).subscribe((res: any) => {
      console.log(res);
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }
  uploadToXero() {
    this.loading = true;
    this.XeroInteService.uploadToXero().subscribe((res: any) => {
      console.log(res);
      this.loading = false;
    }, error => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', error);
    });
  }
  testconnection() {
    this.loading = true
    this.XeroInteService.testConnection(this.type).subscribe((res: any) => {
      console.log(res);
      if (res.message == 'Success') {
        Swal.fire('Test Connection Successful');
      } else {
        Swal.fire('Please Check Credentials');
      }
      this.loading = false;
    }, error => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', error);
    });
  }
  onSelectPayment(e) {
    this.paymentType = [];
    this.allChannel.forEach(i => {
      if (i?.PaymentID) {
        this.paymentType.push(i.PaymentID);
      }
    })
    // this.paymentType.push(e);
    console.log(this.paymentType);
  }
  onSelectAccount(e) {
    this.account = [];
    this.allChannel.forEach(i => {
      if (i?.Code) {
        this.account.push(i.Code);
      }
    })
    // this.account.push(e);
    console.log(this.account);
  }
  onSelectTax(e) {
    this.taxType = [];
    this.allChannel.forEach(i => {
      if (i?.TaxType) {
        this.taxType.push(i.TaxType);
      }
    })
    // this.taxType.push(e);
    console.log(this.taxType);
  }
  onSelectTrackingCategories(e) {
    this.trackingCategory = [];
    this.allChannel.forEach(i => {
      if (i?.TrackingOptionID) {
        this.trackingCategory.push(i.TrackingOptionID);
      }
    })
    // this.trackingCategory.push(e);
    console.log(this.trackingCategory);
  }
  onSelectInvoice(e) {
    this.InvoiceStatus = e;
  }
  savexero() {
    this.loading = true;
    let selectedItems = this.allChannel.filter(sale => sale.selected == true);
    const ids = selectedItems.map(ord => ord.id);
    let aData = {
      "channelId": this.accountingUser.id,
      "type": this.type,
      "lvalue1": ids,
      "value1": this.paymentType,
      "value2": this.taxType,
      "value3": this.account,
      "value4": this.trackingCategory,
      "invoicestatus": this.InvoiceStatus
    }
    this.XeroInteService.saveToXero(aData).subscribe((res: any) => {
      console.log(res);
      this.loading = false;
    }, error => {
      console.log(error)
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', error);
    });
  }
  onDisconnect() {
    this.paymentType = [];
    this.account = [];
    this.taxType = [];
    this.trackingCategory = [];
    this.allChannel.forEach(i => {
      i.PaymentID = '';
      i.Code = '';
      i.TaxType = '';
      i.TrackingOptionID = '';
    })
  }
  onReconnect() {
    this.loading = true;
    this.XeroInteService.createIntegratedData(this.type).subscribe((res: any) => {
      console.log(res);
      let data = res?.data;
      let url = data.replace('redirect:', '');

      (window as any).open(url, "_blank");
      this.isNewIntegration = false;
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }
  closeIntegration() {
    this.datasharingService.closeAccIntegrationTab();
  }
}
