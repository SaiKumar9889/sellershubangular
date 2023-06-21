import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { ChannelIntegrationService } from '../services/channel-integration.service';
declare var $: any;
import marketPlacesJson from '../../../../assets/config/marketPlaces.json';
import accountingJson from '../../../../assets/config/accounting.json';
import appStoreJson from '../../../../assets/config/appStore.json';
import channelCRM from '../../../../assets/config/channelCRM.json';
import channelEpos from '../../../../assets/config/channelEpos.json';
import channelOthers from '../../../../assets/config/channelOther.json';
import eComStores from '../../../../assets/config/ecomStores.json';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { AllMenuTabs } from 'src/app/_models/Tabs';
import { SharedService } from '../shared/shared.service';
import Swal from 'sweetalert2';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';


@Component({
  selector: 'app-channel-integration',
  templateUrl: './channel-integration.component.html',
  styleUrls: ['./channel-integration.component.css']
})
export class ChannelIntegrationComponent implements OnInit {
  constructor(private appTrackingService:AppTrackingService,private toasterService: ToasterService, private channelintegrationService: ChannelIntegrationService, private datasharingService: DatasharingService, private shared: SharedService) {
    let ip:usertrackInput={menu:TrackMenus.INTEGRATION,submenu:subMenus.CHANNELINTEGRATION,page:pages.CHANNELINTEGRATIONPAGE,function:"",descrption:"Channel integration page loaded"};
    this.appTrackingService.trackUserActivity(ip);
   }

  @Output() channelid = new EventEmitter<any>();

  ngOnInit(): void {
    this.isEdit = false ;
    this.getChannelRegistration();
    this.marketplace.map(mp => mp.selected = false);
    this.eComstores.map(mp => mp.selected = false);
    this.accounting.map(mp => mp.selected = false);
    this.channelCrm.map(mp => mp.selected = false);
    this.channelEpos.map(mp => mp.selected = false);
    this.channelOther.map(mp => mp.selected = false);
  }

  auditTrack(type:any){
    let ip:usertrackInput;
    if(type==1)
    ip={menu:TrackMenus.INTEGRATION,submenu:subMenus.CHANNELINTEGRATION,page:pages.CHANNELINTEGRATIONPAGE,function:"",descrption:"Refresh button is clicked"};
    if(type==2)
    ip={menu:TrackMenus.INTEGRATION,submenu:subMenus.CHANNELINTEGRATION,page:pages.CHANNELINTEGRATIONPAGE,function:"",descrption:"Edit button is clicked"};
    if(type==3)
    ip={menu:TrackMenus.INTEGRATION,submenu:subMenus.CHANNELINTEGRATION,page:pages.CHANNELINTEGRATIONPAGE,function:"",descrption:"Remove button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }
  refreshData() {
    this.getChannelRegistration();
    this.marketplace.map(mp => mp.selected = false);
    this.eComstores.map(mp => mp.selected = false);
    this.accounting.map(mp => mp.selected = false);
    this.channelCrm.map(mp => mp.selected = false);
    this.channelEpos.map(mp => mp.selected = false);
    this.channelOther.map(mp => mp.selected = false);
  }
  pageSize = environment.defaultPaginationValue;
  total = environment.defaultTotalValue;
  collectionsize = 0;
  allChannel: any[] = [];
  marketplace: any[] = marketPlacesJson.filter(mp=>mp.enable==true);
  eComstores: any[] = eComStores.filter(mp=>mp.enable==true);
  accounting: any[] = accountingJson;
  channelCrm: any[] = channelCRM;
  channelEpos: any[] = channelEpos;
  appStore: any[] = appStoreJson;
  channelOther: any[] = channelOthers;
  isAllCheckedDown: boolean = false;
  isAllChecked: boolean = false;
  productIsSelected: boolean = false;
  page: number = 0;
  loading: boolean = false;
  isEdit: boolean = false;
  variations;
  disVariation;
  allSales: any;
  orederIsSelected: boolean = false;
  seletedMP: any;

  modalclosed() {
    $('#search-modal').modal('hide');
  }
  changespage(page: any) {
    this.getChannelRegistration();
  }
  // channel_id
  getChannelTypeByName(name) {
    return this.marketplace.find(mp => mp.channel_title.toLowerCase() == name.toLowerCase());
  }
  getChannelTypeByNameFromEcom(name) {
    return this.eComstores.find(mp => mp.channel_title.toLowerCase() == name.toLowerCase());
  }

  editIntegration(id: any) {
    ////console.log(id);
    let mchaid = this.getChannelTypeByName(id.type);
    ////console.log(mchaid);
    let ecomchaid = this.getChannelTypeByNameFromEcom(id.type);
    ////console.log(ecomchaid);
    if (mchaid != undefined) {
      id.channel_id = mchaid.channel_id;
      this.datasharingService.changeActiveIntegration([id]);
      this.datasharingService.changeNewIntegration(false);
      this.ebayInteTab();
    } else {
      id.channel_id = ecomchaid.channel_id;
      this.datasharingService.changeActiveIntegration_ecom([id]);
      this.datasharingService.changeNewIntegration_ecom(false);
      this.eComInte();
    }

  }

  selectall(event: any) {
    ////console.log("selectall", event.target.value);
    this.isAllChecked = !this.isAllChecked;
    this.allSales.map((i: any) => i.selected = this.isAllChecked);
    ////console.log(this.allSales);
    let selectedItems = this.allSales.filter(sale => sale.selected == true);
    if (selectedItems.length > 0) {
      this.orederIsSelected = true;
    } else {
      this.orederIsSelected = false;
    }
  }

  getChannelRegistration() {
    this.loading = true;
    this.channelintegrationService.getChannelRegistration().subscribe((res: any) => {
      ////console.log(res);
      this.allChannel = res;
      this.collectionsize = res?.page?.totalResults;
      this.page = res?.page?.currentPageNumber;
      this.loading = false;
      if (this.allChannel.length > 0)
        // this.productTitle= this.allChannel[0].title;
        this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      this.loading = false;
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };

  selectedItemsLength: any;
  individualselection(acc: any) {
    // ////console.log(row);
    this.accounting.map(mp => {
      // ////console.log(mp);
      if (mp.channel_id === acc.channel_id) {
        mp.selected = true;
        this.seletedMP = acc.channel_id;
        //////console.log(row.channel_id);
      }
      else
        mp.selected = false;
    });
  }
  openModalPopup(modalName: string) {
    switch (modalName) {
      case "Add Market Place":
        $('#market-places-modal').modal('show');
        break;
      case "Add eCom Stores":
        $('#ecom-places-modal').modal('show');
        break;
      case "Add Accounting":
        this.getIndex();
        break;
      case "Add CRM":
        $('#crm-modal').modal('show');
        break;
      case "ePOS System":
        $('#epos-modal').modal('show');
        break;
      case "App Store":
        $('#appStore-modal').modal('show');
        break;
      case "Others":
        $('#other-modal').modal('show');
        break;
      default:
        break;
    }

  }
  getIndex(){
    this.isEdit = true ;
    this.loading = true;
    this.channelintegrationService.getIndex().subscribe((res: any) => {
      this.accounting.map(mp => {
        // ////console.log(mp);
        if (mp.channel_title === res.accountingUser.type) {
          mp.selected = true;
          //////console.log(row.channel_id);
        }
        else
          mp.selected = false;
      });
      this.loading = false;
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
    $('#account-modal').modal('show');
  }
  removeMarketPlace(channel: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to Delete integration !",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then(async (result) => {
      ////console.log(result);
      if (result?.value) {
        this.channelintegrationService.deleteChannelId(channel.id).subscribe(res => {
          this.getChannelRegistration();
        }, error => {
          this.getChannelRegistration();
          // console.log(error);

        });
        Swal.fire(
          'Channel integration!',
          'Integration Deleted.',
          'success'
        )
      }
    });

  }

  openMarketplace(market: any) {
    // let selectedMarked = this.marketplace.filter(mp => mp.selected == true);
    // if (selectedMarked.length == 0) {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Channel Integration', 'Please Select market wich you want to integrate');
    //   return;
    // } else {

    // }
    this.datasharingService.changeActiveIntegration([market]);
    this.datasharingService.changeNewIntegration(true);
    this.ebayInteTab();
  }

  ebayInteTab() {
    let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.channel_inte };
    this.datasharingService.addtoTab(menu);
  }

  openAccountingplace(account: any) {
    this.channelintegrationService.enableAccounting(account.channel_title,account.selected).subscribe((res: any) => {
      this.loading = false;
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
    $('#account-modal').modal('hide');
    this.datasharingService.changeActiveIntegration([account]);
    this.datasharingService.changeNewIntegration(true);
    this.accountingInteTab();
  }

  accountingInteTab() {
    let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.accounting_inte };
    this.datasharingService.addtoTab(menu);
  }

  individualselectionEcom(row: any) {
    //   ////console.log(row);
    this.eComstores.map(mp => {
      if (mp.channel_id === row.channel_id) {
        mp.selected = true;
        this.seletedMP = row.channel_id;
        //  ////console.log(row.channel_id);
      }
      else
        mp.selected = false;
    });
  }
  addEcomData(row:any) {
    // let selectedMarked = this.eComstores.filter(mp => mp.selected == true);
    // if (selectedMarked.length == 0) {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Channel Integration', 'Please Select eCom Store wich you want to integrate');
    //   return;
    // } else {
    //   this.datasharingService.changeActiveIntegration_ecom([row]);
    //   this.datasharingService.changeNewIntegration_ecom(true);
    //   this.eComInte();
    // }
    this.datasharingService.changeActiveIntegration_ecom([row]);
    this.datasharingService.changeNewIntegration_ecom(true);
    this.eComInte();
  }
  eComInte() {
    let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.ecom_inte };
    this.datasharingService.addtoTab(menu);
  }

  filterMarketPlace(event:any){
    // ////console.log(event.target.value);
    this.marketplace=marketPlacesJson;
    if(event.target.value=='')
    this.marketplace=marketPlacesJson;
    else
    this.marketplace=this.marketplace.filter(mp=>mp.channel_title.includes(event.target.value));
  }

  filterEcom(event:any){
    // ////console.log(event.target.value);
    this.eComstores=eComStores;
    if(event.target.value=='')
    this.eComstores=eComStores;
    else
    this.eComstores=this.eComstores.filter(mp=>mp.channel_title.includes(event.target.value));
  }
}
