import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import Swal from 'sweetalert2';
import { EtsyService } from '../services/etsy.service';
import Stepper from 'bs-stepper';
import { DatePipe } from '@angular/common';
import { ShippingRulesService } from '../../settings/services/shipping-rules.service';
import { SpliRulesService } from '../../shared/services/spli-rules.service';
import { ChannelIntegrationService } from '../services/channel-integration.service';
@Component({
  selector: 'app-etsy-inte',
  templateUrl: './etsy-inte.component.html',
  styleUrls: ['./etsy-inte.component.css']
})
export class EtsyInteComponent implements OnInit, OnChanges {
  private stepper: Stepper;
  @Input() isNewIntegration = false;
  @Input() channelId = 0;
  listing = false;
  integration = true;
  loading: boolean = false;
  emailInte = false;
  ordersIsChecked: boolean = false;
  catLogIsChecked: boolean = false;
  outofStockItems: boolean = false;
  maxListed: any;
  updateInventory: any;
  stockPercentage: any;
  priceChange: any;
  endWhen: any;
  downloadStart: any;
  lastUpdatetime: any;
  lastOrderDownloadTime: any;
  skuEndOfTitle: boolean = false;
  enabled: boolean = false;
  mapping = false;
  locationMap = false;
  searchname: any = '0';
  searchValue2: any = '';
  tocken: string = '';
  channelName: string = '';
  defaultLanguage: string = 'en';
  apiKey: any;
  emailConf = false;
  @Input() apiData: any;
  st: any = [];
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
  autoSplit = false;
  selectedChannlesForsave(event: any) {
    this.st = event;
  }
  catlogChanged(selected: any) {
    switch (selected) {
      case 'a':
        this.catLogIsChecked = !this.catLogIsChecked;
        break;
      case 'b':
        this.ordersIsChecked = !this.ordersIsChecked;
        break;
      case 'c':
        this.outofStockItems = !this.outofStockItems;
        break;
      case 'd':
        this.skuEndOfTitle = !this.skuEndOfTitle;
        break;
      case 'e':
        this.enabled = !this.enabled;
        break;
      default:
        break;
    }
  }

  constructor(private datasharingService: DatasharingService, private etsyService: EtsyService, private toasterService: ToasterService, private shipService: ShippingRulesService, private splitserv: SpliRulesService, private channelintegrationService: ChannelIntegrationService) { }
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
  ngOnInit(): void {
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
      "type": "etsy",
      "name": this.channelName,
      "apiKey": this.apiKey,
      "apipassword": this.tocken,
      "downloadInventory": this.catLogIsChecked,
      "downloadOrders": this.ordersIsChecked,
      "enableoutofstock": this.outofStockItems,
      "enable": this.enabled,
      "skuInTitle": this.skuEndOfTitle,
      "id": this.channelId,
      "tocken": this.tocken,
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

    this.etsyService.updateIntegratedData(data).subscribe((res: any) => {
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
  ngOnChanges(changes: SimpleChanges): void {
    ////console.log(changes.isNewIntegration.currentValue);
    ////console.log(changes.channelId.currentValue);
    this.datasharingService.getCountries();
    if (!this.isNewIntegration) {
      this.getExistingDetails(this.channelId);
      this.getSpliRulz();
    }
    //this.countriesWithAmazon=this.datasharingService.getCountriesForAmazonInte();
  }
  generateTocken() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to generate token !",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then(async (result) => {
      ////console.log(result);
      if (result?.value) {
        this.etsyService.generateTockent(this.channelId).subscribe((res: any) => {
          //console.log(res);
          // (window as any).open(sUrl, "_blank");


          let url = res.data;
          (window as any).open(url, "_blank");
          Swal.fire(
            'Token !',
            'Token generated. ',
            'success'
          )
        }, error => {
          console.log(error);
        });
      }
    });
  }


  saveOnbuyDetails() {
    if (this.channelName == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Onbuy Integration', 'Please enter channelName');
      return;
    }

    let aData = {
      "type": "etsy",
      "name": this.channelName,
      "apipassword": this.tocken,
      "downloadInventory": this.catLogIsChecked,
      "downloadOrders": this.ordersIsChecked,
      "enableoutofstock": this.outofStockItems,
      "enable": this.enabled,
      "skuInTitle": this.skuEndOfTitle,
      "maxListed": this.maxListed,
      "updateInventory": this.updateInventory,
      "stockPercentage": this.stockPercentage,
      "priceChange": this.priceChange,
      "endWhen": this.endWhen
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You want to integrate !",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then(async (result) => {
      ////console.log(result);
      if (result?.value) {
        this.etsyService.createIntegratedData(aData).subscribe((res: any) => {
          ////console.log(res);
          this.channelId = res.id;
          if (res == "Channel Integration created successfully") {
            Swal.fire(
              'Marketplace Store is integrated!',
              'Etsy integration done.',
              'success'
            )
            this.isNewIntegration = false;
          } else {
            Swal.fire(res);
          }
        }, error => {
          console.log(error?.error?.text);
          if (error?.error?.text == "Channel Integration created successfully") {
            Swal.fire(
              'Marketplace Store is integrated!',
              'Etsy integration done.',
              'success'
            )
            this.isNewIntegration = false;
          } else {
            Swal.fire(error?.error?.text);
          }
        });
      }
    });
  }

  updateOnbuyDetails() {
    if (this.channelName == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Onbuy Integration', 'Please enter channelName');
      return;
    }

    let aData = {
      "type": "etsy",
      "name": this.channelName,
      "apiKey": this.apiKey,
      "apipassword": this.tocken,
      "downloadInventory": this.catLogIsChecked,
      "downloadOrders": this.ordersIsChecked,
      "enableoutofstock": this.outofStockItems,
      "enable": this.enabled,
      "skuInTitle": this.skuEndOfTitle,
      "id": this.channelId,
      "tocken": this.tocken,
      "maxListed": this.maxListed,
      "updateInventory": this.updateInventory,
      "stockPercentage": this.stockPercentage,
      "priceChange": this.priceChange,
      "endWhen": this.endWhen
    }


    Swal.fire({
      title: 'Are you sure?',
      text: "You want to integrate !",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then(async (result) => {
      ////console.log(result);
      if (result?.value) {
        this.etsyService.updateIntegratedData(aData).subscribe(res => {
          ////console.log(res);
          if (res == "Channel Integration updated successfully") {
            Swal.fire(
              'Etsy integration!',
              'Etsy details are updated.',
              'success'
            )
          } else {
            Swal.fire(res);
          }
        }, error => {
          console.log(error?.error?.text);
          if (error?.error?.text == "Channel Integration updated successfully") {
            Swal.fire(
              'Etsy integration!',
              'Etsy details are updated.',
              'success'
            )
          } else {
            Swal.fire(error?.error?.text);
          }
        });
      }
    });
  }

  deleteOnbuyAccount() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete integration !",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then(async (result) => {
      ////console.log(result);
      if (result?.value) {
        this.etsyService.deleteAmazonAccount(this.channelId).subscribe(res => {
          ////console.log(res)
        });
        Swal.fire(
          'Etsy integration!',
          'Etsy account is removed.',
          'success'
        )
      }
    });

  }


  testConnection() {
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
        this.etsyService.testConnection(this.channelId).subscribe((res: any) => {
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

  downloadOrders() {
    this.etsyService.testConnection(this.channelId).subscribe((res: any) => {
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
            this.etsyService.downloadAllProducts(this.channelId).subscribe(res => {
              ////console.log(res)
              Swal.fire(
                'Etsy integration!',
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
            this.etsyService.downloadAllProducts(this.channelId).subscribe(res => {
              ////console.log(res)
              Swal.fire(
                'Etsy integration!',
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


  closeIntegration() {
    this.datasharingService.closeIntegrationTab();
  }

  getExistingDetails(channelId: any) {
    this.etsyService.getAllreadyIntegratedData(channelId).subscribe((res: any) => {
      ////console.log(res);
      this.catLogIsChecked = res?.downloadInventory;
      this.ordersIsChecked = res?.downloadOrders;
      this.outofStockItems = res?.enableoutofstock;
      this.skuEndOfTitle = res?.skuInTitle;
      this.enabled = res?.enable;
      this.tocken = res?.apipassword;
      this.channelName = res?.name;
      this.defaultLanguage = 'en';
      this.apiKey = res?.apiKey;
      this.maxListed = res?.maxListed;
      this.updateInventory = res?.updateInventory;
      this.stockPercentage = res?.stockPercentage;
      this.priceChange = res?.priceChange;
      this.endWhen = res?.endWhen;
      this.selectedChannel = res?.name;
      if (res?.itemCondition == null || res?.itemCondition == '') {
        this.itemCondition = "1";
      } else {
        this.itemCondition = res?.itemCondition;
      }
      this.itemCount = res?.itemCount;
      if (res?.weightCondition == null || res?.weightCondition == '') {
        this.weightCondition = "1";
      } else {
        this.weightCondition = res?.weightCondition;
      }
      this.weightValue = res?.weightValue;
      if (res?.splitType == null || res?.splitType == '') {
        this.splitorder = "2";
      } else {
        this.splitorder = res?.splitType;
      }
      this.splitOrder = res?.splitOrder;
      this.downloadStart = new DatePipe('en-US').transform(res['downloadTime']);
      this.lastUpdatetime = new DatePipe('en-US').transform(res['lastUpdatetime']);
      this.lastOrderDownloadTime = new DatePipe('en-US').transform(res['lastOrderDownloadTime']);
      // this.tocken=res?.tocken;

    });
  }
}
