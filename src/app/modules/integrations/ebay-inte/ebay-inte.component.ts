import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { EbayInteService } from '../services/ebay-inte.service';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { AllMenuTabs } from 'src/app/_models/Tabs';
import { DatePipe } from '@angular/common';
import { ToasterService } from 'src/app/_service/toaster.service';
import { ToastTypes } from 'src/app/_models/_toaster';
import { SharedService } from '../shared/shared.service';
import Swal from 'sweetalert2';
import { Utills } from 'src/app/utills/Utills';
import Stepper from 'bs-stepper';
import { ShippingRulesService } from '../../settings/services/shipping-rules.service';
import { SpliRulesService } from '../../shared/services/spli-rules.service';
import { ChannelIntegrationService } from '../services/channel-integration.service';
declare var $: any;

@Component({
  selector: 'app-ebay-inte',
  templateUrl: './ebay-inte.component.html',
  styleUrls: ['./ebay-inte.component.css']
})
export class EbayInteComponent implements OnInit, OnChanges, AfterViewInit {
  private stepper: Stepper;
  maxListed: any;
  updateInventory: any;
  stockPercentage: any;
  priceChange: any;
  endWhen: any;
  downloadStart: any;
  lastUpdatetime: any;
  lastOrderDownloadTime: any;
  autoSplit = false;
  constructor(private route: ActivatedRoute, private ebayServcie: EbayInteService, private datasharingService: DatasharingService, private toasterService: ToasterService, private shared: SharedService, private shipService: ShippingRulesService, private splitserv: SpliRulesService, private channelintegrationService: ChannelIntegrationService) { }
  ngAfterViewInit(): void {
    if (!this.listing && !this.emailConf && !this.emailInte && !this.locationMap && !this.mapping && !this.autoSplit) {
      this.stepper = new Stepper(document.querySelector('#stepper1'), {
        linear: false,
        animation: true,
      });

    }

  }
  setStepper(state = false) {
    if (state) {
      setTimeout(() => {
        this.stepper = new Stepper(document.querySelector('#stepper1'), {
          linear: false,
          animation: true,
        });
      }, 1000);

    } {
      this.stepper.destroy();
    }

  }


  @Input() isNewIntegration = false;
  @Input() channelId = 0;
  listing = false;
  integration = true;
  username: string = 'ebay';
  tknexp: string;
  ebayname: string;
  producttime: any;
  outStock: any;
  downOrders: any;
  downInven: any;
  ebayMember: any;
  kartid: any;
  chanid: any;
  id: any = '';
  testconresult;
  allprodresult;
  recentprodresult;
  result;
  loading: boolean = false;
  isclear: boolean = false;
  searchFrom: any = '';

  isDescEnables: boolean = false;
  isDescEn: boolean = false;
  mapping = false;
  locationMap = false;
  emailConf = false;
  emailInte = false;
  searchname: any = '0';
  searchValue2: any = '';
  @Input() apiData: any;
  splitRule = {
    ruleType: 'SINGLE_ITEM',
    minValue: 0,
    maxValue: 0
  }
  selectedChannel: any = '';
  allChannel: any = [];
  selectedItems: any = "";
  dropdownSettings_channel: any;
  allChannels: any = [];
  dropdownSettings_supplier = {
    singleSelection: true,
    idField: "idField",
    textField: "textField",
    selectAllText: "Select All",
    unSelectAllText: "Deselect all",
    itemsShowLimit: 1,
    enableCheckAll: true,
    allowSearchFilter: true,
    clearSearchFilter: true,
    closeDropDownOnSelection: true,
  };
  skuList = [
    {
      idField: "Select Sku",
      textField: "Select Sku",
    },
  ];
  selectedSku = [
    {
      idField: "Select Sku",
      textField: "Select Sku",
    }
  ];
  sku = "";
  totalordervalue1 = "";
  totalordervalue2 = "";
  weight1 = "";
  weight2 = "";
  itemCondition = "1";
  itemCount: any = '';
  weightCondition = "1";
  weightValue: any = '';
  rulename = "";
  enableservice = "";
  splitOrder: boolean = false;
  splitorder = "2";
  @Input()
  channel: any;
  selectedCountries = [{ country_code: "GB", name: "United Kingdom" }];
  tocken: any = '';
  st: any = [];
  selectedChannlesForsave(event: any) {
    this.st = event;
  }
  toggleDesc() {
    this.isDescEnables = !this.isDescEnables;
  }

  togDesc() {
    this.isDescEn = !this.isDescEn;
  }

  sDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };

  selectedFormDate(date: any) {
    this.searchFrom = date.year + '/' + date.month + '/' + date.day;
    ////console.log(this.searchFrom);
  }

  ngOnChanges(changes: SimpleChanges): void {
    ////console.log(changes.isNewIntegration.currentValue);
    ////console.log(changes.channelId.currentValue);

    if (!this.isNewIntegration) {
      this.getExistingDetails(this.channelId);
      this.getSpliRulz();
    }
  }

  getExistingDetails(channelId) {
    this.ebayServcie.getEbay(channelId).subscribe((res: any) => {
      ////console.log(res);
      this.result = res;
      this.loading = false;
      // this.type ="ebay";
      this.kartid = res['kartzhubUserId'];
      this.ebayname = res['name'];
      this.username = res['username'];
      this.tknexp = new DatePipe('en-US').transform(res['expiryDate'], Utills.UK_DATE);
      this.producttime = res['downloadTime'];
      this.outStock = res['enableoutofstock'];
      this.downOrders = res['downloadOrders'];
      this.downInven = res['downloadInventory'];
      this.tocken = res['token'];
      //if (this.ebayMember != null)
      this.ebayMember = new DatePipe('en-US').transform(res['syncSince'], Utills.UK_DATE);
      ////console.log(this.ebayMember);
      if (this.ebayMember != null)
        this.sDate = { year: new Date(this.ebayMember).getFullYear(), month: new Date(this.ebayMember).getMonth() + 1, day: new Date(this.ebayMember).getDate() };
      // ////console.log(new DatePipe('en-US').transform(res['lastUpdateTimeForOrders'], 'yyyy-MM-dd'));
      // ////console.log(new DatePipe('en-US').transform(res['syncSince'], 'yyyy-MM-dd'));
      // ////console.log(new DatePipe('en-US').transform(res['lastUpdatetime'], 'yyyy-MM-dd'));
      // ////console.log(new DatePipe('en-US').transform(res['lastPendingOrderDownloadTime'], 'yyyy-MM-dd'));
      // ////console.log(new DatePipe('en-US').transform(res['lastIncompleteOrderDownloadTime'], 'yyyy-MM-dd'));
      // ////console.log(new DatePipe('en-US').transform(res['lastDispatchOrderDownloadTime'], 'yyyy-MM-dd'));
      // ////console.log(new DatePipe('en-US').transform(res['downloadTime'], 'yyyy-MM-dd'));
      this.maxListed = res?.maxListed;
      this.updateInventory = res?.updateInventory;
      this.stockPercentage = res?.stockPercentage;
      this.priceChange = res?.priceChange;
      this.endWhen = res?.endWhen;
      this.selectedChannel = res?.name;
      if(res?.itemCondition == null || res?.itemCondition == ''){
        this.itemCondition = "1" ;
        }else{
          this.itemCondition = res?.itemCondition ;
        }
        this.itemCount = res?.itemCount;
        if(res?.weightCondition == null || res?.weightCondition == ''){
          this.weightCondition = "1" ;
          }else{
            this.weightCondition = res?.weightCondition ;
          }
        this.weightValue = res?.weightValue;
        if(res?.splitType == null || res?.splitType == ''){
          this.splitorder = "2" ;
          }else{
            this.splitorder = res?.splitType ;
          }
      this.splitOrder = res?.splitOrder;
      this.downloadStart = new DatePipe('en-US').transform(res['downloadTime']);
      this.lastUpdatetime = new DatePipe('en-US').transform(res['lastUpdatetime']);
      this.lastOrderDownloadTime = new DatePipe('en-US').transform(res['lastOrderDownloadTime']);
    });
  }
  updateEbay() {
    this.channelCreatedSuccessfully = false;
    this.loading = true;
    const data = {
      "kartzhubUserId": this.kartid,
      "name": this.ebayname,
      "type": "ebay",
      "downloadInventory": true,
      "downloadOrders": this.downOrders,
      "enableoutofstock": this.outStock,
      "syncSinceDate": this.ebayMember,
      "id": this.channelId,
      "username": this.username,
      "token": this.tocken,
      "maxListed": this.maxListed,
      "updateInventory": this.updateInventory,
      "stockPercentage": this.stockPercentage,
      "priceChange": this.priceChange,
      "endWhen": this.endWhen

    }

    this.ebayServcie.putEbay(data).subscribe((res: any) => {
      ////console.log(res);
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Ebay updated successfully');
      this.channelCreatedSuccessfully = true;

      // this.channelId = res.id;
      this.isNewIntegration = false;
      // this.openModalPopup('Ebay Token');
      // this.showPortal = true;
    }, error => {
      ////console.log(error);
    });
  }
  refreshData() {
    this.getExistingDetails(this.channelId);
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.username = params["username"];
      this.tknexp = params["tknexp"];
    });
    this.dropdownSettings_channel = {
      singleSelection: false,
      idField: "country_code",
      textField: "name",
      selectAllText: "Select All",
      unSelectAllText: "Deselect all",
      itemsShowLimit: 1,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true,
    };
    this.getChannel();
    this.getChannelRegistration()
  }
  getChannel() {
    this.allChannels = this.datasharingService.getCountries();
  }
  getSpliRulz() {
    this.loading = true;
    this.splitserv.getChannel(this.channelId).subscribe((resp: any) => {
      this.channel = resp;
      this.loading = false;
    })
  }
  onitemCountChange(e) {
    this.itemCondition = e.target.value;
  }
  onweightConditionChange(e) {
    this.weightCondition = e.target.value;
  }
  onsplitorderChange(e) {
    this.splitorder = e.target.value;
  }
  getSkuList(event) {
    this.shipService.getSkuList(event).subscribe(
      (res: any) => {
        if (res.length == 0) {
          this.skuList = [
            {
              idField: "Select Sku",
              textField: "Select Sku",
            },
          ];
        } else {
          this.skuList = res.map((i) => {
            return { idField: i, textField: i };
          });
        }
      },
      (eoor) => {
        this.toasterService.openToastMessage(
          ToastTypes.warning,
          "SellersHub",
          "Error"
        );
      }
    );
  }
  setSelectedSku(event, selectedSku) {
    console.log(selectedSku);
    if (event.idField != "Select Sku") {
      this.sku = event.idField;
    }
  }
  updateSpliRulz() {
    this.loading = true;

    const data = {
      "kartzhubUserId": this.kartid,
      "name": this.ebayname,
      "type": "ebay",
      "downloadInventory": true,
      "downloadOrders": this.downOrders,
      "enableoutofstock": this.outStock,
      "syncSinceDate": this.ebayMember,
      "id": this.channelId,
      "username": this.username,
      "token": this.tocken,
      "maxListed": this.maxListed,
      "updateInventory": this.updateInventory,
      "stockPercentage": this.stockPercentage,
      "priceChange": this.priceChange,
      "endWhen": this.endWhen,
      "itemCondition": this.itemCondition,
      "itemCount": this.itemCount,
      "weightCondition": this.weightCondition,
      "weightValue": this.weightValue,
      "splitType": this.splitorder,
      "splitOrder": this.splitOrder
    }

    this.ebayServcie.putEbay(data).subscribe((res: any) => {
      console.log(res);
      this.loading = false;
    }, error => {
      console.log(error);
    });

  }
  getchannel(e) {
    ////console.log(e.target.value);
    this.selectedChannel = e.target.value;
  }
  getChannelRegistration() {
    // this.loading = true;
    this.channelintegrationService.getChannelRegistration().subscribe((res: any) => {
      ////console.log(res);
      this.allChannel = res;
      this.loading = false;
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };
  onItemSelect(e) {
    this.selectedItems = e;
    ////console.log(this.selectedCountries.map(ch => ch.name));
    ////console.log(this.deselectedItems);
    // this.selectedCountries = this.selectedCountries.map(ch => ch.name).toString();
  }
  next(type: any) {
    if (type == 'inventory') {
      this.saveInventory();


    }
    if (type == 'order') {
      this.stepper.next();

    }
    if (type == 'fba') {
      this.stepper.next();
    }
    if (type == 'listings') {
      this.stepper.next();
    }
    if (type == 'priceUpdate') {
      this.stepper.next();
    }
  }
  saveInventory() {
    this.stepper.next();
  }
  pevious() {
    this.stepper.previous();
  }
  modalclosed() {
    $('#market-places-modal').modal('hide');
  }

  // openModel(){
  //   $('ebay-token-modal').modal('show');
  // }

  // receiveID($channelid){
  //   this.chanid = $channelid;
  // }

  openModalPopup(modalName: string) {
    switch (modalName) {
      case "Ebay Token":
        $('#ebay-token-modal').modal('show');
        break;
      case "Ebay Test Connection":
        $('#ebay-testcon-modal').modal('show');
        this.testconnection();
        break;
      case "Ebay All Products":
        $('#ebay-allproduct-modal').modal('show');
        this.allProducts();
        break;
      case "Ebay Recent Products":
        $('#ebay-recentproduct-modal').modal('show');
        this.recentProducts();
        break;
      default:
        break;
    }
  }

  generatetoken() {
    this.ebayServcie.getEbayToken(this.channelId).subscribe(() => { }, (token: any) => {
      ////console.log(token);
      this.result = token;
      const w: any = window;
      ////console.log(token.error);
      (window as any).open(token.error.text, "_blank");
    });
  }

  testconnection() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to test connection !",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then(async (result) => {
      //////console.log(result);
      if (result?.value) {
        this.ebayServcie.getEbayTestCon(this.channelId).subscribe((res: any) => {
          //  console.log(res);
          if (res == 'Channel Integration tested successfully') {
            Swal.fire(res);
          } else {
            Swal.fire(res);
          }
        }, error => {
          // console.log(error?.error?.text);
          if (error?.error?.text == 'Channel Integration tested successfully') {
            Swal.fire(error?.error?.text);
          } else {
            Swal.fire(error?.error?.text);
          }
        });
      }
    });

  }

  allProducts() {
    this.ebayServcie.getEbayTestCon(this.channelId).subscribe((res: any) => {
      console.log(res);
      if (res == 'Channel Integration tested successfully') {
        Swal.fire({
          title: 'Are you sure?',
          text: "You want to download products !",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, do it!'
        }).then(async (result) => {
          ////console.log(result);
          if (result?.value) {
            this.ebayServcie.getAllProducts(this.channelId).subscribe(res => {
              ////console.log(res)
              Swal.fire(
                'Ebay integration!',
                'Download Products Request Done.',
                'success'
              )
            });
          }
        });
      } else {
        Swal.fire(res);
      }
    }, error => {
      console.log(error?.error);
      if (error?.error?.text == 'Channel Integration tested successfully') {
        Swal.fire({
          title: 'Are you sure?',
          text: "You want to download products !",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, do it!'
        }).then(async (result) => {
          ////console.log(result);
          if (result?.value) {
            this.ebayServcie.getAllProducts(this.channelId).subscribe(res => {
              ////console.log(res)
              Swal.fire(
                'Ebay integration!',
                'Download Products Request Done.',
                'success'
              )
            });
          }
        });
      } else {
        Swal.fire(error?.error?.text);
      }
    });

  }

  recentProducts() {
    this.loading = true;
    this.ebayServcie.getRecentProducts(this.channelId).subscribe(() => { }, (res: any) => {
      // debugger;
      ////console.log(res);
      this.recentprodresult = res.error.text;
      this.loading = false;
      // debugger;
      // const w: any = window;
      ////console.log(res.error);
    });
  }

  deleteEbay() {
    this.loading = true;
    this.ebayServcie.deleteEbay(this.channelId).subscribe(() => { }, (res: any) => {
      // debugger;
      ////console.log(res);
      this.recentprodresult = res.error.text;
      this.loading = false;
      // debugger;
      // const w: any = window;
      ////console.log(res.error);
    });
  }


  channelCreatedSuccessfully: boolean = false;

  saveEbay() {

    this.channelCreatedSuccessfully = false;
    this.loading = true;
    const data = {
      "kartzhubUserId": this.kartid,
      "name": this.ebayname,
      "type": "ebay",
      "downloadInventory": true,
      "downloadOrders": this.downOrders,
      "enableoutofstock": this.outStock,
      "syncSinceDate": this.ebayMember,
      "maxListed": this.maxListed,
      "updateInventory": this.updateInventory,
      "stockPercentage": this.stockPercentage,
      "priceChange": this.priceChange,
      "endWhen": this.endWhen
    }

    this.ebayServcie.postEbay(data).subscribe((res: any) => {
      ////console.log(res);
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Ebay created successfully');
      this.channelCreatedSuccessfully = true;

      this.channelId = res.id;
      this.isNewIntegration = false;
      this.openModalPopup('Ebay Token');
      // this.showPortal = true;
    }, error => {
      ////console.log(error);
    });
  }
  showPortal: boolean = false;

  channelInteTab() {
    // this.datasharingService.removeTab(AllMenuTabs.stocksummary);
    // let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.channel_integration };
    // this.datasharingService.addtoTab(menu);
    this.datasharingService.closeIntegrationTab();
  }

  // redirecturl: string = 'https://www.google.com';
  modalstatus(event: any) {
    ////console.log(event);
    this.showPortal = false;
  }
}
