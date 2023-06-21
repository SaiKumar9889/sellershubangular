import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Utills } from 'src/app/utills/Utills';
import { Country } from 'src/app/_models/country';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import Swal from 'sweetalert2';
import { AmazonInteService } from '../services/amazon-inte.service';
import Stepper from 'bs-stepper';
import { SpliRulesService } from '../../shared/services/spli-rules.service';
import { ChannelIntegrationService } from '../services/channel-integration.service';
import { ShippingRulesService } from '../../settings/services/shipping-rules.service';
declare var $: any;
@Component({
  selector: 'app-amazon-inte',
  templateUrl: './amazon-inte.component.html',
  styleUrls: ['./amazon-inte.component.css']
})
export class AmazonInteComponent implements OnInit, OnChanges {

  private stepper: Stepper;
  @Input() isNewIntegration = false;
  @Input() channelId = false;
  loading: boolean = false;
  public isCollapsed = true;
  public cssisCollapsed = true;
  public ohbdisCollapsed = true;
  public htisCollapsed = true;
  public rlisCollapsed = true;
  public dcisCollapsed = true;
  public pcisCollapsed = true;
  maxListed: any;
  updateInventory: any;
  stockPercentage: any;
  priceChange: any;
  endWhen: any;
  downloadStart: any;
  lastUpdatetime: any;
  lastOrderDownloadTime: any;
  accountName: string = '';
  amazonSite: any = 'GB';
  sellerId: any = '';
  marketPlaceID: any = 'A1F83G8C2ARO7P';
  kdevid: any = '1800-9274-1682';
  authtocken: any = '';
  assosiatetag: any = '';
  invvalue: any = '';
  invtimeUnit: any = '';
  contimeUnit: any = '';
  convalue: any = '';
  delvalue: any = '';
  deltimeUnit: any = '';
  pickemail: any = '';
  pickphone: any = '';
  pickthroughputUnit: any = '';
  pickthroughputCap: any = '';
  delthroughputUnit: any = '';
  delthroughputCap: any = '';
  delphone: any = '';
  delemail: any = '';
  supportIsChecked: boolean = false;
  delsupportIsChecked: boolean = false;
  pickupsupportIsChecked: boolean = false;
  catLogIsChecked: boolean = false;
  ordersIsChecked: boolean = false;
  stockRepairChecked: boolean = false;
  fbaItemsChecked: boolean = false;
  countriesWithAmazon: Country[] = [];
  detailsSub: any;
  kartzhubUserId = '';
  listing = false; integration = true;
  emailInte = false;
  emailConf = false;
  mapping = false;
  locationMap = false;
  searchname: any = '0';
  searchValue2: any = '';
  usshtvalue: string = '';
  picktimeUnit
  pickvalue
  mussendTime: string = '';
  mussstartTime: string = '';
  tussendTime: string = '';
  tussstartTime: string = '';
  wussendTime: string = '';
  wussstartTime: string = '';
  thussendTime: string = '';
  thussstartTime: string = '';
  fussendTime: string = '';
  fussstartTime: string = '';
  satussendTime: string = '';
  satussstartTime: string = '';
  sunussendTime: string = '';
  sunussstartTime: string = '';
  mconendTime: string = '';
  mconstartTime: string = '';
  tconendTime: string = '';
  tconstartTime: string = '';
  wconendTime: string = '';
  wconstartTime: string = '';
  thconendTime: string = '';
  thconstartTime: string = '';
  fconendTime: string = '';
  fconstartTime: string = '';
  satconendTime: string = '';
  satconstartTime: string = '';
  sunconendTime: string = '';
  sunconstartTime: string = '';
  mdelendTime: string = '';
  mdelstartTime: string = '';
  tdelendTime: string = '';
  tdelstartTime: string = '';
  wdelendTime: string = '';
  wdelstartTime: string = '';
  thdelendTime: string = '';
  thdelstartTime: string = '';
  fdelendTime: string = '';
  fdelstartTime: string = '';
  satdelendTime: string = '';
  satdelstartTime: string = '';
  sundelendTime: string = '';
  sundelstartTime: string = '';
  mpickendTime: string = '';
  mpickstartTime: string = '';
  tpickendTime: string = '';
  tpickstartTime: string = '';
  wpickendTime: string = '';
  wpickstartTime: string = '';
  thpickendTime: string = '';
  thpickstartTime: string = '';
  fpickendTime: string = '';
  fpickstartTime: string = '';
  satpickendTime: string = '';
  satpickstartTime: string = '';
  sunpickendTime: string = '';
  sunpickstartTime: string = '';
  csscity: string = '';
  cssstateOrRegion: string = '';
  // country: string = '';
  country: any[] = [];
  cssaddress1: string = '';
  csscounty: string = '';
  ussemail: string = '';
  conemail: string = '';
  retemail: string = '';
  retphone: string = '';
  selectedCountryvalue: string = '';
  csspostcode: string = '';
  cssalias: string = '';
  cssname: string = '';
  csssupplySourceCode: string = '';
  usshttimeUnit: string = '';
  cssphone: string = '';
  ussphone: string = '';
  conphone: string = '';
  ussthroughputCap: string = '';
  ussthroughputUnit: string = '';
  retname: string = '';
  retaddress1: string = '';
  retaddress2: string = '';
  retaddress3: string = '';
  retcity: string = '';
  retcounty: string = '';
  retstateOrRegion: string = '';
  retdistrict: string = '';
  retpostcode: string = '';
  retadphone: string = '';
  dropdownSettings: any = {};
  countries: Country[] = [];
  timezones: any = [];
  timezone: any = '';
  selectedCountry = [{ country_code: "GB", name: "United Kingdom" }];
  retselectedCountry = [{ country_code: "GB", name: "United Kingdom" }];
  isEdit: boolean = false;
  allStores: any = [];
  supplySourceId: any;
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
  constructor(private amazonInteService: AmazonInteService, private toasterService: ToasterService, private datasharingService: DatasharingService, private shipService: ShippingRulesService, private splitserv: SpliRulesService, private channelintegrationService: ChannelIntegrationService) { }
  ngOnChanges(changes: SimpleChanges): void {
    ////console.log(changes.isNewIntegration.currentValue);
    ////console.log(changes.channelId.currentValue);

    if (!this.isNewIntegration) {
      this.getExistingDetails(this.channelId);
      this.getSpliRulz();
    }
    this.countriesWithAmazon = this.datasharingService.getCountriesForAmazonInte();
  }
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
    if (type == 'click') {
      this.stepper.next();
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
    this.country = this.datasharingService.getCountries();
    this.countries = this.datasharingService.getCountries();
    let coun: any;
    coun = this.countries.filter(wh => wh.name == "United Kingdom");
    coun.forEach(s => this.timezones = s.timezones)
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'country_code',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 1,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true
    };
    this.getAllStores();
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
    this.splitserv.getChannel(this.channelId ).subscribe((resp: any) => {
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
      "kartzhubUserId": this.kartzhubUserId,
      "name": this.accountName,
      "site": this.amazonSite,  //sellerId
      "type": "amazon",
      "merchantIdentifier": this.sellerId,
      "marketplaceId": this.marketPlaceID,// kdevid
      "awsAccessKey": this.kdevid, //assosiatetag
      "secretKey": this.authtocken,
      "downloadInventory": this.catLogIsChecked,
      "downloadOrders": this.ordersIsChecked,
      "fba": this.fbaItemsChecked,
      "stockRepricerEnable": this.stockRepairChecked,
      "syncSince": this.memberSince_dt,
      "id": this.channelId,
      "token": this.tocken,
      "maxListed": this.maxListed,
      "updateInventory": this.updateInventory,
      "stockPercentage": this.stockPercentage,
      "priceChange": this.priceChange,
      "endWhen": this.endWhen,
      "itemCondition": this.itemCondition,
      "itemCount": this.itemCount,
      "weightCondition": this.weightCondition,
      "weightValue": this.weightValue ,
      "splitType": this.splitorder,
      "splitOrder": this.splitOrder 
    }

    this.amazonInteService.updateIntegratedData(data).subscribe((res: any) => {
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
  // onItemSelect(e) {
  //   this.selectedItems = e;
  //   ////console.log(this.selectedCountries.map(ch => ch.name));
  //   ////console.log(this.deselectedItems);
  //   // this.selectedCountries = this.selectedCountries.map(ch => ch.name).toString();
  // }
  getMarketPlaceId() {
    let sAmazon: Country = this.countriesWithAmazon.find(cu => cu.country_code == this.amazonSite);
    //console.log(sAmazon);
    this.marketPlaceID = sAmazon?.mkpid;
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
        this.stockRepairChecked = !this.stockRepairChecked;
        break;
      case 'd':
        this.fbaItemsChecked = !this.fbaItemsChecked;
        break;
      default:
        break;
    }
  }
  tocken: any = '';
  getExistingDetails(channelId: any) {
    this.amazonInteService.getAllreadyIntegratedData(channelId).subscribe((res: any) => {
      ////console.log(res);
      this.marketPlaceID = res?.marketplaceId;
      this.kartzhubUserId = res?.kartzhubUserId;
      // this.kdevid = res?.awsAccessKey;
      this.accountName = res?.name;
      this.authtocken = res?.secretKey;
      this.amazonSite = res?.site;
      this.sellerId = res?.merchantIdentifier;
      this.catLogIsChecked = res?.downloadInventory;
      this.ordersIsChecked = res?.downloadOrders;
      this.stockRepairChecked = res?.stockRepricerEnable;
      this.fbaItemsChecked = res?.fba;
      this.tocken = res?.token;
      var datePipe = new DatePipe(Utills.UK_DATE);
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
      // this.memberSince_dt = datePipe.transform(res?.syncSince, 'yyyy-MM-dd');
      // this.memberSince_dt = res?.syncSince;
    });
  }
  getAllStores() {
    this.loading = true;
    this.amazonInteService.getAllStores().subscribe((res: any) => {
      console.log(res);
      if(res.allSupplySourcesResponse != null){
      this.allStores = res.allSupplySourcesResponse;
      this.allStores.forEach(s=>s.status = res.allSupplySourcesResponse.status)
      }
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }
  removeStore(store) {
    let aData = {
      "supplySourceId": store.supplySourceId
    }
    this.loading = true;
    this.amazonInteService.deleteStores(aData).subscribe((res: any) => {
      console.log(res);
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }
  editStore(store) {
    this.isEdit = true;
    this.supplySourceId = store.supplySourceId;
    let aData = {
      "supplySourceId": store.supplySourceId
    }
    let coun: any;
    this.loading = true;
    this.amazonInteService.getStoreById(aData).subscribe((res: any) => {
      console.log(res);
      this.csssupplySourceCode = res?.amazonSupplySourceResponse?.supplySourceCode,
        this.cssalias = res?.amazonSupplySourceResponse?.alias, this.cssname = res?.amazonSupplySourceResponse?.address?.name,
        this.cssaddress1 = res?.amazonSupplySourceResponse?.address?.addressLine1,
        this.csscity = res?.amazonSupplySourceResponse?.address?.city,
        this.csscounty = res?.amazonSupplySourceResponse?.address?.county,
        this.cssstateOrRegion = res?.amazonSupplySourceResponse?.address?.stateOrRegion,
        this.csspostcode = res?.amazonSupplySourceResponse?.address?.postalCode,
        this.selectedCountry = this.countries.filter(s => s.country_code == res?.amazonSupplySourceResponse?.address?.countryCode),

        coun = this.countries.filter(wh => wh.country_code == res?.amazonSupplySourceResponse?.address?.countryCode);
      coun.forEach(s => this.timezones = s.timezones)
      this.cssphone = res?.amazonSupplySourceResponse?.address?.phone,
        this.ussemail = res?.amazonSupplySourceResponse?.configuration?.operationalConfiguration?.contactDetails?.primary?.email,
        this.ussphone = res?.amazonSupplySourceResponse?.configuration?.operationalConfiguration?.contactDetails?.primary?.phone
      res?.amazonSupplySourceResponse?.configuration?.operationalConfiguration?.operatingHoursByDay?.monday.filter(s => {
        this.mussstartTime = s.startTime;
        this.mussendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.configuration?.operationalConfiguration?.operatingHoursByDay?.tuesday.filter(s => {
        this.tussstartTime = s.startTime;
        this.tussendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.configuration?.operationalConfiguration?.operatingHoursByDay?.wednesday.filter(s => {
        this.wussstartTime = s.startTime;
        this.wussendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.configuration?.operationalConfiguration?.operatingHoursByDay?.thursday.filter(s => {
        this.thussstartTime = s.startTime;
        this.thussendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.configuration?.operationalConfiguration?.operatingHoursByDay?.friday.filter(s => {
        this.fussstartTime = s.startTime;
        this.fussendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.configuration?.operationalConfiguration?.operatingHoursByDay?.saturday.filter(s => {
        this.satussstartTime = s.startTime;
        this.satussendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.configuration?.operationalConfiguration?.operatingHoursByDay?.sunday.filter(s => {
        this.sunussstartTime = s.startTime;
        this.sunussendTime = s.endTime;
      })

      this.timezone = res?.amazonSupplySourceResponse?.configuration?.timezone,
        console.log(this.timezone)
      this.usshtvalue = res?.amazonSupplySourceResponse?.configuration?.handlingTime?.value,
        this.usshttimeUnit = res?.amazonSupplySourceResponse?.configuration?.handlingTime?.timeUnit
      this.supportIsChecked = res?.amazonSupplySourceResponse?.capabilities?.outbound?.isSupported,
        this.conemail = res?.amazonSupplySourceResponse?.capabilities?.outbound?.operationalConfiguration?.contactDetails?.primary?.email,
        this.conphone = res?.amazonSupplySourceResponse?.capabilities?.outbound?.operationalConfiguration?.contactDetails?.primary?.phone
      res?.amazonSupplySourceResponse?.capabilities?.outbound?.operationalConfiguration?.operatingHoursByDay?.monday.filter(s => {
        this.mconstartTime = s.startTime;
        this.mconendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.capabilities?.outbound?.operationalConfiguration?.operatingHoursByDay?.tuesday.filter(s => {
        this.tconstartTime = s.startTime;
        this.tconendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.capabilities?.outbound?.operationalConfiguration?.operatingHoursByDay?.wednesday.filter(s => {
        this.wconstartTime = s.startTime;
        this.wconendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.capabilities?.outbound?.operationalConfiguration?.operatingHoursByDay?.thursday.filter(s => {
        this.thconstartTime = s.startTime;
        this.thconendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.capabilities?.outbound?.operationalConfiguration?.operatingHoursByDay?.friday.filter(s => {
        this.fconstartTime = s.startTime;
        this.fconendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.capabilities?.outbound?.operationalConfiguration?.operatingHoursByDay?.saturday.filter(s => {
        this.satconstartTime = s.startTime;
        this.satconendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.capabilities?.outbound?.operationalConfiguration?.operatingHoursByDay?.sunday.filter(s => {
        this.sunconstartTime = s.startTime;
        this.sunconendTime = s.endTime;
      })
      // "throughputCap": {
      //   "value": this.convalue,
      //   "timeUnit": this.contimeUnit
      // },
      this.ussthroughputUnit = res?.amazonSupplySourceResponse?.capabilities?.outbound?.operationalConfiguration?.throughputConfig?.throughputUnit


      this.retemail = res?.amazonSupplySourceResponse?.capabilities?.outbound?.returnLocation?.addressWithContact?.contactDetails?.primary?.email,
        this.retphone = res?.amazonSupplySourceResponse?.capabilities?.outbound?.returnLocation?.addressWithContact?.contactDetails?.primary?.phone
      this.retname = res?.amazonSupplySourceResponse?.capabilities?.outbound?.returnLocation?.addressWithContact?.address?.name,
        this.retaddress1 = res?.amazonSupplySourceResponse?.capabilities?.outbound?.returnLocation?.addressWithContact?.address?.addressLine1,
        this.retselectedCountry = this.countries.filter(s => s.country_code == res?.amazonSupplySourceResponse?.capabilities?.outbound?.returnLocation?.addressWithContact?.address?.countryCode),
        this.retstateOrRegion = res?.amazonSupplySourceResponse?.capabilities?.outbound?.returnLocation?.addressWithContact?.address?.stateOrRegion,
        this.retaddress2 = res?.amazonSupplySourceResponse?.capabilities?.outbound?.returnLocation?.addressWithContact?.address?.addressLine2,
        this.retaddress3 = res?.amazonSupplySourceResponse?.capabilities?.outbound?.returnLocation?.addressWithContact?.address?.addressLine3,
        this.retcity = res?.amazonSupplySourceResponse?.capabilities?.outbound?.returnLocation?.addressWithContact?.address?.city,
        this.retcounty = res?.amazonSupplySourceResponse?.capabilities?.outbound?.returnLocation?.addressWithContact?.address?.county,
        this.retdistrict = res?.amazonSupplySourceResponse?.capabilities?.outbound?.returnLocation?.addressWithContact?.address?.district,
        this.retpostcode = res?.amazonSupplySourceResponse?.capabilities?.outbound?.returnLocation?.addressWithContact?.contactDetails?.postalCode,
        this.retadphone = res?.amazonSupplySourceResponse?.capabilities?.outbound?.returnLocation?.addressWithContact?.address?.phone



      this.delsupportIsChecked = res?.amazonSupplySourceResponse?.capabilities?.outbound?.deliveryChannel?.isSupported,
        this.delemail = res?.amazonSupplySourceResponse?.capabilities?.outbound?.deliveryChannel?.operationalConfiguration?.contactDetails?.primary?.email,
        this.delphone = res?.amazonSupplySourceResponse?.capabilities?.outbound?.deliveryChannel?.operationalConfiguration?.contactDetails?.primary?.phone
      res?.amazonSupplySourceResponse?.capabilities?.outbound?.deliveryChannel?.operationalConfiguration?.operatingHoursByDay?.monday.filter(s => {
        this.mdelstartTime = s.startTime;
        this.mdelendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.capabilities?.outbound?.deliveryChannel?.operationalConfiguration?.operatingHoursByDay?.tuesday.filter(s => {
        this.tdelstartTime = s.startTime;
        this.tdelendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.capabilities?.outbound?.deliveryChannel?.operationalConfiguration?.operatingHoursByDay?.wednesday.filter(s => {
        this.wdelstartTime = s.startTime;
        this.wdelendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.capabilities?.outbound?.deliveryChannel?.operationalConfiguration?.operatingHoursByDay?.thursday.filter(s => {
        this.thdelstartTime = s.startTime;
        this.thdelendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.capabilities?.outbound?.deliveryChannel?.operationalConfiguration?.operatingHoursByDay?.friday.filter(s => {
        this.fdelstartTime = s.startTime;
        this.fdelendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.capabilities?.outbound?.deliveryChannel?.operationalConfiguration?.operatingHoursByDay?.saturday.filter(s => {
        this.satdelstartTime = s.startTime;
        this.satdelendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.capabilities?.outbound?.deliveryChannel?.operationalConfiguration?.operatingHoursByDay?.sunday.filter(s => {
        this.sundelstartTime = s.startTime;
        this.sundelendTime = s.endTime;
      })
      // "throughputCap": {
      //   "value": this.delvalue,
      //   "timeUnit": this.deltimeUnit
      // },
      this.delthroughputUnit = res?.amazonSupplySourceResponse?.capabilities?.outbound?.deliveryChannel?.operationalConfiguration?.throughputConfig?.throughputUnit



      this.pickupsupportIsChecked = res?.amazonSupplySourceResponse?.capabilities?.outbound?.pickupChannel?.isSupported,
        this.invvalue = res?.amazonSupplySourceResponse?.capabilities?.outbound?.pickupChannel?.inventoryHoldPeriod?.value,
        this.invtimeUnit = res?.amazonSupplySourceResponse?.capabilities?.outbound?.pickupChannel?.inventoryHoldPeriod?.timeUnit,
        this.pickemail = res?.amazonSupplySourceResponse?.capabilities?.outbound?.pickupChannel?.operationalConfiguration?.contactDetails?.primary?.email,
        this.pickphone = res?.amazonSupplySourceResponse?.capabilities?.outbound?.pickupChannel?.operationalConfiguration?.contactDetails?.primary?.phone

      res?.amazonSupplySourceResponse?.capabilities?.outbound?.pickupChannel?.operationalConfiguration?.operatingHoursByDay?.monday.filter(s => {
        this.mpickstartTime = s.startTime;
        this.mpickendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.capabilities?.outbound?.pickupChannel?.operationalConfiguration?.operatingHoursByDay?.tuesday.filter(s => {
        this.tpickstartTime = s.startTime;
        this.tpickendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.capabilities?.outbound?.pickupChannel?.operationalConfiguration?.operatingHoursByDay?.wednesday.filter(s => {
        this.wpickstartTime = s.startTime;
        this.wpickendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.capabilities?.outbound?.pickupChannel?.operationalConfiguration?.operatingHoursByDay?.thursday.filter(s => {
        this.thpickstartTime = s.startTime;
        this.thpickendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.capabilities?.outbound?.pickupChannel?.operationalConfiguration?.operatingHoursByDay?.friday.filter(s => {
        this.fpickstartTime = s.startTime;
        this.fpickendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.capabilities?.outbound?.pickupChannel?.operationalConfiguration?.operatingHoursByDay?.saturday.filter(s => {
        this.satpickstartTime = s.startTime;
        this.satpickendTime = s.endTime;
      })
      res?.amazonSupplySourceResponse?.capabilities?.outbound?.pickupChannel?.operationalConfiguration?.operatingHoursByDay?.sunday.filter(s => {
        this.sunpickstartTime = s.startTime;
        this.sunpickendTime = s.endTime;
      })
      //   "throughputConfig": {
      //     "throughputCap": {
      //       "value": this.pickvalue,
      //       "timeUnit": this.picktimeUnit
      //     },
      //     "throughputUnit": this.pickthroughputUnit = res?.amazonSupplySourceResponse?.capabilities?.outbound?.pickupChannel?.operationalConfiguration?.operatingHoursByDay?.throughputConfig?.throughputUnit
      //   }
      // }



      this.loading = false;
      $('#search-modal').modal('show');
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }
  saveAmazonData() {
    if (this.accountName == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please enter account name');
      return;
    }
    if (this.amazonSite == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please select site');
      return;
    }
    if (this.sellerId == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please enter seller id');
      return;
    }
    if (this.kdevid == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please enter Sellershub user id');
      return;
    }
    if (this.authtocken == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please enter auth token');
      return;
    }
    // if (this.assosiatetag == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please enter tag name');
    //   return;
    // }

    let aData = {
      "kartzhubUserId": this.kartzhubUserId,
      "name": this.accountName,
      "site": this.amazonSite,  //sellerId
      "type": "amazon",
      "merchantIdentifier": this.sellerId,
      "marketplaceId": this.marketPlaceID,// kdevid
      "awsAccessKey": this.kdevid, //assosiatetag
      "secretKey": this.authtocken,
      "downloadInventory": this.catLogIsChecked,
      "downloadOrders": this.ordersIsChecked,
      "fba": this.fbaItemsChecked,
      "stockRepricerEnable": this.stockRepairChecked,
      "syncSince": this.memberSince_dt,
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
        this.amazonInteService.createIntegratedData(aData).subscribe((res: any) => {
          ////console.log(res);
          this.channelId = res?.id;
          this.kartzhubUserId = res?.kartzhubUserId;
          this.isNewIntegration = false;
          let sUrl: string = this.countriesWithAmazon.find(cu => cu.country_code == this.amazonSite)?.amazonurl;
          sUrl = sUrl.replace('=example', '=' + this.kartzhubUserId + '_' + this.channelId);
          (window as any).open(sUrl, "_blank");
        }, error => {
          ////console.log(error);
        });
        Swal.fire(
          'Store details are saved successfully'
        )
      }
    });

  }

  updateAmazonData() {
    if (this.accountName == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please enter account name');
      return;
    }
    if (this.amazonSite == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please select site');
      return;
    }
    if (this.sellerId == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please enter seller id');
      return;
    }
    if (this.kdevid == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please enter Sellershub user id');
      return;
    }
    if (this.authtocken == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please enter auth token');
      return;
    }
    // if (this.assosiatetag == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please enter tag name');
    //   return;
    // }

    let aData = {
      "kartzhubUserId": this.kartzhubUserId,
      "name": this.accountName,
      "site": this.amazonSite,  //sellerId
      "type": "amazon",
      "merchantIdentifier": this.sellerId,
      "marketplaceId": this.marketPlaceID,// kdevid
      "awsAccessKey": this.kdevid, //assosiatetag
      "secretKey": this.authtocken,
      "downloadInventory": this.catLogIsChecked,
      "downloadOrders": this.ordersIsChecked,
      "fba": this.fbaItemsChecked,
      "stockRepricerEnable": this.stockRepairChecked,
      "syncSince": this.memberSince_dt,
      "id": this.channelId,
      "token": this.tocken,
      "maxListed": this.maxListed,
      "updateInventory": this.updateInventory,
      "stockPercentage": this.stockPercentage,
      "priceChange": this.priceChange,
      "endWhen": this.endWhen
    }
    //console.log(aData);
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to update details !",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then(async (result) => {
      ////console.log(result);
      if (result?.value) {
        this.amazonInteService.updateIntegratedData(aData).subscribe(res => {
          ////console.log(res);
          Swal.fire(
            'Amazon integration!',
            'Amazon details are updated.',
            'success'
          )
          let sUrl: string = this.countriesWithAmazon.find(cu => cu.country_code == this.amazonSite)?.amazonurl;
          sUrl = sUrl.replace('=example', '=' + this.kartzhubUserId + '_' + this.channelId);
          (window as any).open(sUrl, "_blank");
        }, error => {
          ////console.log(error);
          Swal.fire(
            'Amazon integration!',
            'Please complete all the details. We couldn\'t verify the amazon seller central account with the given details',
            'warning'
          )
        });

      }
    });
  }

  deleteAmazonAccount() {
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
        this.amazonInteService.deleteAmazonAccount(this.channelId).subscribe(res => {
          ////console.log(res)
        });
        Swal.fire(
          'Amazon integration!',
          'Amazon account is removed.',
          'success'
        )
      }
    });

  }

  memberSince_dt: any = '';
  memberSince(event: any) {
    ////console.log(event);
    this.memberSince_dt = event.year + '-' + event.month + '-' + event.day;
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
        this.amazonInteService.testConnection(this.channelId).subscribe((res: any) => {
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
    this.amazonInteService.testConnection(this.channelId).subscribe((res: any) => {
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
            this.amazonInteService.downloadAllProducts(this.channelId).subscribe(res => {
              ////console.log(res)
              Swal.fire(
                'Amazon integration!',
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
            this.amazonInteService.downloadAllProducts(this.channelId).subscribe(res => {
              ////console.log(res)
              Swal.fire(
                'Amazon integration!',
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
  addStore() {
    this.isEdit = false;
  }
  modalclosed() {
    $('#search-modal').modal('hide');
    this.isEdit = true;
    // this.clear();
  }
  saveStoreDetails() {
    let aData = {
      "cssRequest": {
        "supplySourceCode": this.csssupplySourceCode,
        "alias": this.cssalias,
        "address": {
          "name": this.cssname,
          "addressLine1": this.cssaddress1,
          "city": this.csscity,
          "county": this.csscounty,
          "stateOrRegion": this.cssstateOrRegion,
          "postalCode": this.csspostcode,
          "countryCode": this.selectedCountry[0].country_code,
          "phone": this.cssphone
        }
      },
      "ussRequest": {
        "alias": this.cssalias,
        "configuration": {
          "operationalConfiguration": {
            "contactDetails": {
              "primary": {
                "email": this.ussemail,
                "phone": this.ussphone
              }
            },
            "operatingHoursByDay": {
              "monday": [
                {
                  "startTime": this.mussstartTime,
                  "endTime": this.mussendTime
                }
              ],
              "tuesday": [
                {
                  "startTime": this.tussstartTime,
                  "endTime": this.tussendTime
                }
              ],
              "wednesday": [
                {
                  "startTime": this.wussstartTime,
                  "endTime": this.wussendTime
                }
              ],
              "thursday": [
                {
                  "startTime": this.thussstartTime,
                  "endTime": this.thussendTime
                }
              ],
              "friday": [
                {
                  "startTime": this.fussstartTime,
                  "endTime": this.fussendTime
                }
              ],
              "saturday": [
                {
                  "startTime": this.satussstartTime,
                  "endTime": this.satussendTime
                }
              ],
              "sunday": [
                {
                  "startTime": this.sunussstartTime,
                  "endTime": this.sunussendTime
                }
              ]
            }
          },
          "timezone": this.timezone,
          "handlingTime": {
            "value": this.usshtvalue,
            "timeUnit": this.usshttimeUnit
          }
        },
        "capabilities": {
          "outbound": {
            "isSupported": this.supportIsChecked,
            "operationalConfiguration": {
              "contactDetails": {
                "primary": {
                  "email": this.conemail,
                  "phone": this.conphone
                }
              },
              "operatingHoursByDay": {
                "monday": [
                  {
                    "startTime": this.mconstartTime,
                    "endTime": this.mconendTime
                  }
                ],
                "tuesday": [
                  {
                    "startTime": this.tconstartTime,
                    "endTime": this.tconendTime
                  }
                ],
                "wednesday": [
                  {
                    "startTime": this.wconstartTime,
                    "endTime": this.wconendTime
                  }
                ],
                "thursday": [
                  {
                    "startTime": this.thconstartTime,
                    "endTime": this.thconendTime
                  }
                ],
                "friday": [
                  {
                    "startTime": this.fconstartTime,
                    "endTime": this.fconendTime
                  }
                ],
                "saturday": [
                  {
                    "startTime": this.satconstartTime,
                    "endTime": this.satconendTime
                  }
                ],
                "sunday": [
                  {
                    "startTime": this.sunconstartTime,
                    "endTime": this.sunconendTime
                  }
                ]
              },
              "throughputConfig": {
                "throughputCap": {
                  "value": this.convalue,
                  "timeUnit": this.contimeUnit
                },
                "throughputUnit": this.ussthroughputUnit
              }
            },
            "returnLocation": {
              "addressWithContact": {
                "contactDetails": {
                  "primary": {
                    "email": this.retemail,
                    "phone": this.retphone
                  }
                },
                "address": {
                  "name": this.retname,
                  "addressLine1": this.retaddress1,
                  "countryCode": this.retselectedCountry[0].country_code,
                  "stateOrRegion": this.retstateOrRegion,
                  "addressLine2": this.retaddress2,
                  "addressLine3": this.retaddress3,
                  "city": this.retcity,
                  "county": this.retcounty,
                  "district": this.retdistrict,
                  "postalCode": this.retpostcode,
                  "phone": this.retadphone
                }
              }
            },
            "deliveryChannel": {
              "isSupported": this.delsupportIsChecked,
              "operationalConfiguration": {
                "contactDetails": {
                  "primary": {
                    "email": this.delemail,
                    "phone": this.delphone
                  }
                },
                "operatingHoursByDay": {
                  "monday": [
                    {
                      "startTime": this.mdelstartTime,
                      "endTime": this.mdelendTime
                    }
                  ],
                  "tuesday": [
                    {
                      "startTime": this.tdelstartTime,
                      "endTime": this.tdelendTime
                    }
                  ],
                  "wednesday": [
                    {
                      "startTime": this.wdelstartTime,
                      "endTime": this.wdelendTime
                    }
                  ],
                  "thursday": [
                    {
                      "startTime": this.thdelstartTime,
                      "endTime": this.thdelendTime
                    }
                  ],
                  "friday": [
                    {
                      "startTime": this.fdelstartTime,
                      "endTime": this.fdelendTime
                    }
                  ],
                  "saturday": [
                    {
                      "startTime": this.satdelstartTime,
                      "endTime": this.satdelendTime
                    }
                  ],
                  "sunday": [
                    {
                      "startTime": this.sundelstartTime,
                      "endTime": this.sundelstartTime
                    }
                  ]
                },
                "throughputConfig": {
                  "throughputCap": {
                    "value": this.delvalue,
                    "timeUnit": this.deltimeUnit
                  },
                  "throughputUnit": this.delthroughputUnit
                }
              }
            },
            "pickupChannel": {
              "isSupported": this.pickupsupportIsChecked,
              "inventoryHoldPeriod": {
                "value": this.invvalue,
                "timeUnit": this.invtimeUnit
              },
              "operationalConfiguration": {
                "contactDetails": {
                  "primary": {
                    "email": this.pickemail,
                    "phone": this.pickphone
                  }
                },
                "operatingHoursByDay": {
                  "monday": [
                    {
                      "startTime": this.mpickstartTime,
                      "endTime": this.mpickendTime
                    }
                  ],
                  "tuesday": [
                    {
                      "startTime": this.tpickstartTime,
                      "endTime": this.tpickendTime
                    }
                  ],
                  "wednesday": [
                    {
                      "startTime": this.wpickstartTime,
                      "endTime": this.wpickendTime
                    }
                  ],
                  "thursday": [
                    {
                      "startTime": this.thpickstartTime,
                      "endTime": this.thpickendTime
                    }
                  ],
                  "friday": [
                    {
                      "startTime": this.fpickstartTime,
                      "endTime": this.fpickendTime
                    }
                  ],
                  "saturday": [
                    {
                      "startTime": this.satpickstartTime,
                      "endTime": this.satpickendTime
                    }
                  ],
                  "sunday": [
                    {
                      "startTime": this.sunpickstartTime,
                      "endTime": this.sunpickendTime
                    }
                  ],
                  "throughputConfig": {
                    "throughputCap": {
                      "value": this.pickvalue,
                      "timeUnit": this.picktimeUnit
                    },
                    "throughputUnit": this.pickthroughputUnit
                  }
                }
              }
            }
          }
        }
      }

    }
    // console.log(aData);
    this.amazonInteService.createStores(aData).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }
  updateStoreDetails() {
    let aData = {
      "supplySourceId": this.supplySourceId,
      "ussRequest": {
        "alias": this.cssalias,
        "configuration": {
          "operationalConfiguration": {
            "contactDetails": {
              "primary": {
                "email": this.ussemail,
                "phone": this.ussphone
              }
            },
            "operatingHoursByDay": {
              "monday": [
                {
                  "startTime": this.mussstartTime,
                  "endTime": this.mussendTime
                }
              ],
              "tuesday": [
                {
                  "startTime": this.tussstartTime,
                  "endTime": this.tussendTime
                }
              ],
              "wednesday": [
                {
                  "startTime": this.wussstartTime,
                  "endTime": this.wussendTime
                }
              ],
              "thursday": [
                {
                  "startTime": this.thussstartTime,
                  "endTime": this.thussendTime
                }
              ],
              "friday": [
                {
                  "startTime": this.fussstartTime,
                  "endTime": this.fussendTime
                }
              ],
              "saturday": [
                {
                  "startTime": this.satussstartTime,
                  "endTime": this.satussendTime
                }
              ],
              "sunday": [
                {
                  "startTime": this.sunussstartTime,
                  "endTime": this.sunussendTime
                }
              ]
            }
          },
          "timezone": this.timezone,
          "handlingTime": {
            "value": this.usshtvalue,
            "timeUnit": this.usshttimeUnit
          }
        },
        "capabilities": {
          "outbound": {
            "isSupported": this.supportIsChecked,
            "operationalConfiguration": {
              "contactDetails": {
                "primary": {
                  "email": this.conemail,
                  "phone": this.conphone
                }
              },
              "operatingHoursByDay": {
                "monday": [
                  {
                    "startTime": this.mconstartTime,
                    "endTime": this.mconendTime
                  }
                ],
                "tuesday": [
                  {
                    "startTime": this.tconstartTime,
                    "endTime": this.tconendTime
                  }
                ],
                "wednesday": [
                  {
                    "startTime": this.wconstartTime,
                    "endTime": this.wconendTime
                  }
                ],
                "thursday": [
                  {
                    "startTime": this.thconstartTime,
                    "endTime": this.thconendTime
                  }
                ],
                "friday": [
                  {
                    "startTime": this.fconstartTime,
                    "endTime": this.fconendTime
                  }
                ],
                "saturday": [
                  {
                    "startTime": this.satconstartTime,
                    "endTime": this.satconendTime
                  }
                ],
                "sunday": [
                  {
                    "startTime": this.sunconstartTime,
                    "endTime": this.sunconendTime
                  }
                ]
              },
              "throughputConfig": {
                "throughputCap": {
                  "value": this.convalue,
                  "timeUnit": this.contimeUnit
                },
                "throughputUnit": this.ussthroughputUnit
              }
            },
            "returnLocation": {
              "addressWithContact": {
                "contactDetails": {
                  "primary": {
                    "email": this.retemail,
                    "phone": this.retphone
                  }
                },
                "address": {
                  "name": this.retname,
                  "addressLine1": this.retaddress1,
                  "countryCode": this.retselectedCountry[0].country_code,
                  "stateOrRegion": this.retstateOrRegion,
                  "addressLine2": this.retaddress2,
                  "addressLine3": this.retaddress3,
                  "city": this.retcity,
                  "county": this.retcounty,
                  "district": this.retdistrict,
                  "postalCode": this.retpostcode,
                  "phone": this.retadphone
                }
              }
            },
            "deliveryChannel": {
              "isSupported": this.delsupportIsChecked,
              "operationalConfiguration": {
                "contactDetails": {
                  "primary": {
                    "email": this.delemail,
                    "phone": this.delphone
                  }
                },
                "operatingHoursByDay": {
                  "monday": [
                    {
                      "startTime": this.mdelstartTime,
                      "endTime": this.mdelendTime
                    }
                  ],
                  "tuesday": [
                    {
                      "startTime": this.tdelstartTime,
                      "endTime": this.tdelendTime
                    }
                  ],
                  "wednesday": [
                    {
                      "startTime": this.wdelstartTime,
                      "endTime": this.wdelendTime
                    }
                  ],
                  "thursday": [
                    {
                      "startTime": this.thdelstartTime,
                      "endTime": this.thdelendTime
                    }
                  ],
                  "friday": [
                    {
                      "startTime": this.fdelstartTime,
                      "endTime": this.fdelendTime
                    }
                  ],
                  "saturday": [
                    {
                      "startTime": this.satdelstartTime,
                      "endTime": this.satdelendTime
                    }
                  ],
                  "sunday": [
                    {
                      "startTime": this.sundelstartTime,
                      "endTime": this.sundelstartTime
                    }
                  ]
                },
                "throughputConfig": {
                  "throughputCap": {
                    "value": this.delvalue,
                    "timeUnit": this.deltimeUnit
                  },
                  "throughputUnit": this.delthroughputUnit
                }
              }
            },
            "pickupChannel": {
              "isSupported": this.pickupsupportIsChecked,
              "inventoryHoldPeriod": {
                "value": this.invvalue,
                "timeUnit": this.invtimeUnit
              },
              "operationalConfiguration": {
                "contactDetails": {
                  "primary": {
                    "email": this.pickemail,
                    "phone": this.pickphone
                  }
                },
                "operatingHoursByDay": {
                  "monday": [
                    {
                      "startTime": this.mpickstartTime,
                      "endTime": this.mpickendTime
                    }
                  ],
                  "tuesday": [
                    {
                      "startTime": this.tpickstartTime,
                      "endTime": this.tpickendTime
                    }
                  ],
                  "wednesday": [
                    {
                      "startTime": this.wpickstartTime,
                      "endTime": this.wpickendTime
                    }
                  ],
                  "thursday": [
                    {
                      "startTime": this.thpickstartTime,
                      "endTime": this.thpickendTime
                    }
                  ],
                  "friday": [
                    {
                      "startTime": this.fpickstartTime,
                      "endTime": this.fpickendTime
                    }
                  ],
                  "saturday": [
                    {
                      "startTime": this.satpickstartTime,
                      "endTime": this.satpickendTime
                    }
                  ],
                  "sunday": [
                    {
                      "startTime": this.sunpickstartTime,
                      "endTime": this.sunpickendTime
                    }
                  ],
                  "throughputConfig": {
                    "throughputCap": {
                      "value": this.pickvalue,
                      "timeUnit": this.picktimeUnit
                    },
                    "throughputUnit": this.pickthroughputUnit
                  }
                }
              }
            }
          }
        }
      }

    }
    // console.log(aData);
    this.amazonInteService.updateStores(aData).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }
  onItemSelect(event: any) {
    let coun: any;
    coun = this.countries.filter(wh => wh.name == event.name);
    coun.forEach(s => this.timezones = s.timezones)
    // debugger;
  }
  onRetItemSelect(event: any) {
    console.log(event)
    // debugger;
  }
  onSelectTimezone(event: any) {
    console.log(event)
    // debugger;
  }
  supportIsCheckedChanged() {
    this.supportIsChecked = !this.supportIsChecked;
  }
  delsupportIsCheckedChanged() {
    this.delsupportIsChecked = !this.delsupportIsChecked;
  }
  pickupsupportIsCheckedChanged() {
    this.pickupsupportIsChecked = !this.pickupsupportIsChecked;
  }
  activateStore(store) {
    store.status = !store.status;
    let aData = {
      "supplySourceId": store.supplySourceId,
      "supplySourceStatus": store.status == true ? "Active" : "Inactive"
    }
    this.loading = true;
    this.amazonInteService.updateStoreStatus(aData).subscribe((res: any) => {
      console.log(res);
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }
}
