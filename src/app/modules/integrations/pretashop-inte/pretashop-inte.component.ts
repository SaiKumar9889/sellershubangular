import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import Swal from 'sweetalert2';
import { PrestaShopService } from '../services/presta-shop.service';
import Stepper from 'bs-stepper';
import { DatePipe } from '@angular/common';
import { ChannelIntegrationService } from '../services/channel-integration.service';
import { SpliRulesService } from '../../shared/services/spli-rules.service';
import { ShippingRulesService } from '../../settings/services/shipping-rules.service';
@Component({
  selector: 'app-pretashop-inte',
  templateUrl: './pretashop-inte.component.html',
  styleUrls: ['./pretashop-inte.component.css']
})
export class PretashopInteComponent implements OnInit {

  private stepper: Stepper;
  @Input() isNewIntegration = false;
  @Input() channelId = false;
  loading: boolean = false;
  ordersIsChecked: boolean = false;
  catLogIsChecked: boolean = false;
  mapping = false;
  locationMap = false;
  integration = true;
  apipassword: string = '';
  url: string = '';
  name: string = '';
  maxListed: any;
  updateInventory: any;
  stockPercentage: any;
  priceChange: any;
  endWhen: any;
  downloadStart: any;
  lastUpdatetime: any;
  lastOrderDownloadTime: any;
  isclear: boolean = false;
  searchFrom: any = '';
  emailConf = false;
  sDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
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
  autoSplit = false;
  constructor(private datasharingService: DatasharingService, private prestaShopService: PrestaShopService, private toasterService: ToasterService, private shipService: ShippingRulesService, private splitserv: SpliRulesService, private channelintegrationService: ChannelIntegrationService) { }
  ngAfterViewInit(): void {
    if (!this.emailConf && !this.locationMap && !this.mapping && !this.autoSplit) {
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
      "type": "prestashop",
      "name": this.name,
      "token": this.tocken,
      "apipassword": this.apipassword,
      "apiUrl": this.url,
      "downloadInventory": this.catLogIsChecked,
      "downloadOrders": this.ordersIsChecked,
      "id": this.channelId,
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

    this.prestaShopService.updateIntegratedData(data).subscribe((res: any) => {
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
  getExistingDetails(channelId: any) {
    this.prestaShopService.getAllreadyIntegratedData(channelId).subscribe((res: any) => {
      ////console.log(res);
      this.apipassword = res?.apipassword;
      this.url = res?.apiUrl;
      this.name = res?.name;
      this.tocken = res?.token;
      this.ordersIsChecked = res?.downloadOrders;
      this.catLogIsChecked = res?.downloadInventory;
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

  saveShopifyData() {
    if (this.name == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Prestashop Integration', 'Please enter name');
      return;
    }
    if (this.url == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Prestashop Integration', 'Please enter Prestashop url');
      return;
    }
    if (this.apipassword == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Prestashop Integration', 'Please enter api password');
      return;
    }
    // if (this.productType == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Shopify Integration', 'Please enter default product type');
    //   return;
    // }


    let aData = {
      "type": "prestashop",
      "name": this.name,

      "apipassword": this.apipassword,
      "apiUrl": this.url,
      "downloadInventory": this.catLogIsChecked,
      "downloadOrders": this.ordersIsChecked,
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
        this.prestaShopService.createIntegratedData(aData).subscribe((res: any) => {
          ////console.log(res);
          this.channelId = res.id;
          this.isNewIntegration = false;
          if (res == "Channel Integration created successfully") {
            Swal.fire(
              'Prestashop integration!',
              'Prestashop details are saved.',
              'success'
            )
            this.isNewIntegration = false;
          } else {
            Swal.fire(res);
          }
          }, error => {
            ////console.log(error);
            if (error?.error?.text == "Channel Integration created successfully") {
              Swal.fire(
                'Prestashop integration!',
                'Prestashop details are saved.',
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
  tocken: any = '';
  updateShopifyData() {
    if (this.name == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Prestashop Integration', 'Please enter name');
      return;
    }
    if (this.url == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Prestashop Integration', 'Please enter Prestashop url');
      return;
    }
    if (this.apipassword == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Prestashop Integration', 'Please enter api password');
      return;
    }

    let aData = {
      "type": "prestashop",
      "name": this.name,
      "token": this.tocken,
      "apipassword": this.apipassword,
      "apiUrl": this.url,
      "downloadInventory": this.catLogIsChecked,
      "downloadOrders": this.ordersIsChecked,
      "id": this.channelId,
      "maxListed": this.maxListed,
      "updateInventory": this.updateInventory,
      "stockPercentage": this.stockPercentage,
      "priceChange": this.priceChange,
      "endWhen": this.endWhen

    }

    Swal.fire({
      title: 'Are you sure?',
      text: "Please wait while testing the connection? Successfully connected",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then(async (result) => {
      ////console.log(result);
      if (result?.value) {
        this.prestaShopService.updateIntegratedData(aData).subscribe(res => {
          ////console.log(res);
          if (res == "Channel Integration updated successfully") {
          Swal.fire(
            'Prestashop integration!',
            'Prestashop details are updated.',
            'success'
          )
        } else {
          Swal.fire(res);
        }
        }, error => {
          ////console.log(error);
          if (error?.error?.text == "Channel Integration updated successfully") {
            Swal.fire(
              'Prestashop integration!',
              'Prestashop details are updated.',
              'success'
            )
          } else {
            Swal.fire(error?.error?.text);
          }
        });
      }
    });

  }

  deleteShopifyAccount() {
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
        this.prestaShopService.deleteAmazonAccount(this.channelId).subscribe(res => {
          ////console.log(res)
        });
        Swal.fire(
          'Prestashop integration!',
          'Prestashop account is removed.',
          'success'
        )
      }
    });

  }

  catlogChanged(selected: any) {
    switch (selected) {
      case 'a':
        this.catLogIsChecked = !this.catLogIsChecked;
        break;
      case 'b':
        this.ordersIsChecked = !this.ordersIsChecked;
        break;
      default:
        break;
    }
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
        this.prestaShopService.testConnection(this.channelId).subscribe((res: any) => {
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
    this.prestaShopService.testConnection(this.channelId).subscribe((res: any) => {
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
            this.prestaShopService.downloadAllProducts(this.channelId).subscribe(res => {
              ////console.log(res)
              Swal.fire(
                'PrestaShop integration!',
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
            this.prestaShopService.downloadAllProducts(this.channelId).subscribe(res => {
              ////console.log(res)
              Swal.fire(
                'PrestaShop integration!',
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
}
