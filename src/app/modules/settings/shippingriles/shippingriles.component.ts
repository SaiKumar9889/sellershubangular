import { Component, OnInit } from "@angular/core";
import { ToastTypes } from "src/app/_models/_toaster";
import { ToasterService } from "src/app/_service/toaster.service";
import { ShippingRulesService } from "../services/shipping-rules.service";
import { DatasharingService } from "src/app/_service/datasharing.service";
import Swal from "sweetalert2";
import { AppTrackingService } from "src/app/_service/app-tracking.service";
import { TrackMenus } from "src/app/_models/menuForTrack";
import { pages } from "src/app/_models/pages";
import { subMenus } from "src/app/_models/subMenuTrack";
import { usertrackInput } from "src/app/_models/usertrackInput";
import { WarehouseService } from "../../warehouse/services/warehouse.service";
import { SalsesOrdersService } from "../../orders/services/salses-orders.service";
import { ChannelIntegrationService } from "../../integrations/services/channel-integration.service";
declare var $: any;

@Component({
  selector: "app-shippingriles",
  templateUrl: "./shippingriles.component.html",
  styleUrls: ["./shippingriles.component.css"],
})
export class ShippingrilesComponent implements OnInit {
  loading: boolean = false;
  isEdit: boolean = false;
  maxShippingCharge: any;
  minShippingCharge: any;
  itemcountval1: any;
  itemcountval2: any;
  maxLength: any;
  minLength: any;
  minHeight: any;
  maxHeight: any;
  minWidth: any;
  maxWidth: any;
  constructor(private salsesOrdersService: SalsesOrdersService,
    private appTrackingService: AppTrackingService,
    private dataSharingService: DatasharingService,
    private toasterService: ToasterService,
    private shipService: ShippingRulesService, private warehouseService: WarehouseService, private channelintegrationService: ChannelIntegrationService
  ) {
    let ip: usertrackInput = { menu: TrackMenus.SETTINGS, submenu: subMenus.OTHERS, page: pages.SHIPPINGRULESPAGE, function: "", descrption: "Shipping rules page loaded" };
    this.appTrackingService.trackUserActivity(ip);
  }
  allShip: any = [];
  result: any;
  toSearchtext = "";
  shippostcode = "";
  shipsaleservice = "";
  shipapplyruleto = "";
  totalordervalue1 = "";
  totalordervalue2 = "";
  weight1 = "";
  weight2 = "";
  rulename = "";
  enableservice = "";
  splitOrder
  ruleid = "";
  serviceformat = "";
  countries = "";
  postcodes = "";
  services = "";
  fromordervalue = "";
  toordervalue = "";
  fromshippingcharge = "";
  toshippingcharge = "";
  fromweight = "";
  toweight = "";
  fromlength = "";
  tolength = "";
  fromwidth = "";
  towidth = "";
  fromheight = "";
  toheight = "";
  channel = "";
  sku = "";
  allWarehouses: any = [];
  dropdownSettings_channel: any;
  allChannels: any = [];
  allChannel: any = [];
  selectedChannel: any = '';
  selectedCountries= [{ country_code: "GB", name: "United Kingdom" }];
  selectedItems: any = "";
  deselectedItems: any = "";
  shipcarrier: any = "allcarriers";
  carrierOption = "";
  shippingcarrier = "";
  shippingservice = "";
  warehouseLocation = "";
  splitorder = "";
  itemCondition = "";
  itemCount: any = '';
  weightCondition = "";
  weightValue: any = '';
  shippingServices = "";
  shippingMethods: any = "";
  rule = true;
  split = false;
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

  ngOnInit(): void {
    this.isEdit = false;
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
    this.getShippingRules();
    this.getmethods();
    this.getWarehouses();
    this.getChannelRegistration()
    //this.getSkuList();
  }

  auditTrack(type: any) {
    let ip: usertrackInput;
    if (type == 1)
      ip = { menu: TrackMenus.SETTINGS, submenu: subMenus.OTHERS, page: pages.SHIPPINGRULESPAGE, function: "", descrption: "Add Rules button is clicked" };
    if (type == 2)
      ip = { menu: TrackMenus.SETTINGS, submenu: subMenus.OTHERS, page: pages.SHIPPINGRULESPAGE, function: "", descrption: "Edit button is clicked" };
    if (type == 3)
      ip = { menu: TrackMenus.SETTINGS, submenu: subMenus.OTHERS, page: pages.SHIPPINGRULESPAGE, function: "", descrption: "Remove button is clicked" };
    this.appTrackingService.trackUserActivity(ip);
  }
  getChannelRegistration() {
    this.loading = true;
    this.channelintegrationService.getChannelRegistration().subscribe((res: any) => {
      ////console.log(res);
      this.allChannel = res;
      this.loading = false;
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };
  getWarehouses() {
    this.warehouseService.getWarehouse().subscribe((res: any) => {
      ////console.log("warehouse:::", res);
      this.allWarehouses = res;
    }, eoor => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };
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
  onItemSelect(e) {
    this.selectedItems = e;
    ////console.log(this.selectedCountries.map(ch => ch.name));
    ////console.log(this.deselectedItems);
    // this.selectedCountries = this.selectedCountries.map(ch => ch.name).toString();
  }

  onCarrierChange(e) {
    this.carrierOption = e.target.value;
    this.shippingcarrier = e;
    this.shippingMethods['carrierOption'] = this.shippingMethods[this.shippingcarrier]
    console.log(this.carrierOption);
  }

  onServiceChange(e) {
    this.shippingservice = e.target.value;
    ////console.log(this.shippingservice);
  }
  onWarehouseChange(e) {
    this.warehouseLocation = e.target.value;
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
  getChannel() {
    this.allChannels = this.dataSharingService.getCountries();
  }

  getsaleschannel(e) {
    ////console.log(e.target.value);
    this.shipapplyruleto = e.target.value;
  }
  getchannel(e) {
    ////console.log(e.target.value);
    this.selectedChannel = e.target.value;
  }
  getShippingRules() {
    this.loading = true;
    // $('#printabletable').DataTable().destroy();
    this.shipService.getShippingrules().subscribe(
      (res: any) => {
        ////console.log(res);
        this.allShip = res?.shippingRulesList || [];
        // this.collectionsize = res?.page?.totalResults;
        // this.page = res?.page?.currentPageNumber;
        this.loading = false;
        // if(this.allShip.length>0)
        // this.productTitle= this.allShip[0].title;
        this.toasterService.openToastMessage(
          ToastTypes.success,
          "SellersHub",
          "Please Wait"
        );
        // this.loadTablePagenation();
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

  removeRule(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete the rule !",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then(async (result) => {
      ////console.log(result);
      if (result?.value) {
        this.shipService.getRemoveRule(id).subscribe((res: any) => {
          this.toasterService.openToastMessage(
            ToastTypes.success,
            "SellersHub",
            "Rules Removed Successfully"
          );
          this.allShip = res?.shippingRules || [];
          this.getShippingRules();
        });
        Swal.fire("Shipping Rule!", "Rule is Deleted.", "success");
      }
    });
  }

  openRule() {
    $("#ship-modal").modal("show");
  }

  editRule(id) {
    this.loading = true;
    this.isEdit = true;
    $("#ship-modal").modal("show");
    this.shipService.getEditShippingrules(id).subscribe((res: any) => {
      this.result = res?.shippingRulesList || [];
      this.selectedCountries = this.allChannels.filter(
        (i) => i.name == res.countries[0]
      );
      (this.shippostcode = res.postcodes),
        (this.shipapplyruleto = res.srcObj.channels[0]
          ? res.srcObj.channels[0]
          : -1),
        (this.sku = res.srcObj.skus[0] ? res.srcObj.skus[0] : '-1'),
        (this.selectedSku = this.sku != '-1' ? [{ idField: this.sku, textField: this.sku }] : [
          {
            idField: "Select Sku",
            textField: "Select Sku",
          }
        ]);
      (this.totalordervalue1 = res.srcObj.minOrderValue),
        (this.totalordervalue2 = res.srcObj.maxOrderValue),
        (this.maxShippingCharge = res.srcObj.maxShippingCharge),
        (this.minShippingCharge = res.srcObj.minShippingCharge),
        (this.enableservice = this.result["status"]),
        (this.weight2 = res.srcObj.maxWeight),
        (this.weight1 = res.srcObj.minWeight),
        (this.minLength = res.srcObj.minLength),
        (this.maxLength = res.srcObj.maxLength),
        (this.minHeight = res.srcObj.minHeight),
        (this.maxHeight = res.srcObj.maxHeight),
        (this.minWidth = res.srcObj.minWidth),
        (this.maxWidth = res.srcObj.maxWidth),
        (this.warehouseLocation = res.srcObj.wareHouse),
        this.splitorder = res.srcObj.splitType,
        this.itemCondition = res.srcObj.itemCondition,
        this.itemCount = res.srcObj.itemCount,
        this.weightCondition = res.srcObj.weightCondition,
        this.weightValue = res.srcObj.weightValue,
        (this.ruleid = res.shippingRules["id"]);
      this.rulename = res.shippingRules["ruleName"];
      this.carrierOption = res.shippingRules["carrier"];
      this.shipcarrier = res.shippingRules["carrier"];
      this.shippingservice = res.shippingRules.service
        ? res.shippingRules.service
        : "";
      this.serviceformat = res.shippingRules["format"]
        ? res.shippingRules["format"]
        : "";
      this.enableservice = res.shippingRules["status"]
        ? res.shippingRules["status"]
        : false;
      this.loading = false;
    });
  }

  saveRule() {
    ////console.log(this.shipapplyruleto );
    this.loading = true;
    let data = {
      status: this.enableservice,
      splitOrder: this.splitOrder == true ? 1 : 0,
      ruleid: this.ruleid,
      rulename: this.rulename,
      splitType: this.splitorder,
      channelUserId: this.selectedChannel,
      itemCondition: this.itemCondition,
      itemCount: this.itemCount,
      weightCondition: this.weightCondition,
      weightValue: this.weightValue,
      shippingcarrier: this.shipcarrier,
      shippingservice: this.shippingservice,
      shippingServices: this.shippingServices,
      wareHouse: this.warehouseLocation,
      serviceformat: this.serviceformat,
      countries: [this.selectedCountries[0]["name"]
        ? this.selectedCountries[0]["name"]
        : ""],
      postcodes: this.shippostcode,
      services: this.shipsaleservice ? this.shipsaleservice : "",
      fromordervalue: this.totalordervalue1 ? this.totalordervalue1 : "",
      toordervalue: this.totalordervalue2 ? this.totalordervalue2 : "",
      fromshippingcharge: this.minShippingCharge ? this.minShippingCharge : "",
      toshippingcharge: this.maxShippingCharge ? this.maxShippingCharge : "",
      fromweight: this.weight1 ? this.weight1 : "",
      toweight: this.weight2 ? this.weight2 : "",
      fromlength: this.minLength ? this.minLength : "",
      tolength: this.maxLength ? this.maxLength : "",
      fromwidth: this.minWidth ? this.minWidth : "",
      towidth: this.maxWidth ? this.maxWidth : "",
      fromheight: this.minHeight ? this.minHeight : "",
      toheight: this.maxHeight ? this.maxHeight : "",
      channel: this.shipapplyruleto,
      sku: this.selectedSku.length > 0 ? this.selectedSku[0]["idField"] : "",
    };
    this.shipService.postSaveRule(data).subscribe(
      (res: any) => {
        ////console.log(res);
        this.modalclosed();
        this.loading = false;
        this.toasterService.openToastMessage(
          ToastTypes.success,
          "Shipping Rules",
          "Shipping rules created successfully.."
        );
        this.getShippingRules();
      },
      (error) => {
        this.toasterService.openToastMessage(
          ToastTypes.error,
          "Shipping Rules",
          "Error occured.."
        );

        this.loading = false;
      }
    );
  }

  modalclosed() {
    this.enableservice = "";
    this.ruleid = "";
    this.rulename = "";
    this.shipcarrier = "";
    this.shippingservice = "";
    this.serviceformat = "";
    this.selectedCountries = [{ country_code: "GB", name: "United Kingdom" }];
    this.shippostcode = "";
    this.shipsaleservice = "";
    this.totalordervalue1 = "";
    this.totalordervalue2 = "";
    this.minShippingCharge = "";
    this.maxShippingCharge = "";
    this.weight1 = "";
    this.weight2 = "";
    this.minLength = "";
    this.maxLength = "";
    this.minWidth = "";
    this.maxWidth = "";
    this.minHeight = "";
    this.maxHeight = "";
    this.shipapplyruleto = "";
    this.selectedSku = [];
    $("#ship-modal").modal("hide");
  }

  getmethods() {
    this.shippingMethods = {
      royalmail: [
        { name: "Please Select a Service?", code: "-1" },
        {
          name: "TRACKED 48 SIGNATURE-TRACKED 48 SIGNATURE/TPSS",
          code: "TRACKED 48 SIGNATURE",
        },
        {
          name: "TRACKED 48 NO SIGNATURE-TRACKED 48 NO SIGNATURE/TPSN",
          code: "TRACKED 48 NO SIGNATURE",
        },
        {
          name: "TRACKED 24 SIGNATURE-TRACKED 24 SIGNATURE/TPNS",
          code: "TRACKED 24 SIGNATURE",
        },
        {
          name: "TRACKED 24 NO SIGNATURE-TRACKED 24 NO SIGNATURE/TPNN",
          code: "TRACKED 24 NO SIGNATURE",
        },
        {
          name:
            "INTL BUS PARCELS GB TRACKED & SIGNED-INTL BUS PARCELS GB TRACKED & SIGNED/MTAS",
          code: "INTL BUS PARCELS GB TRACKED & SIGNED",
        },
        {
          name:
            "INTL BUS PARCELS TRACKD & SIGND ZONE SRT-INTL BUS PARCELS TRACKD & SIGND ZONE SRT/MTA",
          code: "INTL BUS PARCELS TRACKD & SIGND ZONE SRT",
        },
        {
          name:
            "INTL BUS PRCL TRCKD SGND XTR CMP ZNE SRT-INTL BUS PRCL TRCKD SGND XTR CMP ZNE SRT/MTB",
          code: "INTL BUS PRCL TRCKD SGND XTR CMP ZNE SRT",
        },
        {
          name: "ROYAL MAIL FIRST CLASS-ROYAL MAIL FIRST CLASS/STL1",
          code: "ROYAL MAIL FIRST CLASS",
        },
        {
          name: "ROYAL MAIL SECOND CLASS-ROYAL MAIL SECOND CLASS/STL2",
          code: "ROYAL MAIL SECOND CLASS",
        },
        {
          name: "RM 1ST Signed P STL01-RM 1ST Signed P STL01/STL1PS",
          code: "RM 1ST Signed P STL01",
        },
        {
          name: "RM 1ST P STL01-RM 1ST P STL01/STL1PN",
          code: "RM 1ST P STL01",
        },
        {
          name: "RM 1ST Signed F STL01-RM 1ST Signed F STL01/STL1FS",
          code: "RM 1ST Signed F STL01",
        },
        {
          name: "RM 1ST Signed P STL01-RM 1ST Signed P STL01/STL1PS",
          code: "RM 1ST Signed P STL01",
        },
        {
          name: "SD GUARANTEED BY 1PM (£500)-SD GUARANTEED BY 1PM (£500)/SD1",
          code: "SD GUARANTEED BY 1PM (£500)",
        },
        {
          name:
            "SD GUARANTEED BY 1PM GB (£1000)-SD GUARANTEED BY 1PM GB (£1000)/SD2",
          code: "SD GUARANTEED BY 1PM GB (£1000)",
        },
        {
          name:
            "SD GUARANTEED BY 1PM GB (£2500)-SD GUARANTEED BY 1PM GB (£2500)/SD3",
          code: "SD GUARANTEED BY 1PM GB (£2500)",
        },
        {
          name:
            "SD SATURDAY GUARANTEED BY 1PM (£500)-SD SATURDAY GUARANTEED BY 1PM (£500)/SD1SG",
          code: "SD SATURDAY GUARANTEED BY 1PM (£500)",
        },
        {
          name:
            "SD SATURDAY GUARANTEED BY 1PM (£1000)-SD SATURDAY GUARANTEED BY 1PM (£1000)/SD2SG",
          code: "SD SATURDAY GUARANTEED BY 1PM (£1000)",
        },
        {
          name:
            "SD SATURDAY GUARANTEED BY 1PM (£2500)-SD SATURDAY GUARANTEED BY 1PM (£2500)/SD3SG",
          code: "SD SATURDAY GUARANTEED BY 1PM (£2500)",
        },
        {
          name: "SD GUARANTEED BY 9AM-SD GUARANTEED BY 9AM/SD4",
          code: "SD GUARANTEED BY 9AM",
        },
        {
          name:
            "SD GUARANTEED BY 9AM (£1000)-SD GUARANTEED BY 9AM (£1000)/SD5",
          code: "SD GUARANTEED BY 9AM (£1000)",
        },
        {
          name:
            "SD GUARANTEED BY 9AM (£2500)-SD GUARANTEED BY 9AM (£2500)/SD6",
          code: "SD GUARANTEED BY 9AM (£2500)",
        },
        {
          name: "INTL BUS PARCELS GB TRACKED-INTL BUS PARCELS GB TRACKED/MP1",
          code: "INTL BUS PARCELS GB TRACKED",
        },
        {
          name: "ROAYL MAIL 1st CLASS-ROAYL MAIL 1st CLASS/BPL1",
          code: "ROAYL MAIL 1st CLASS",
        },
        {
          name: "ROYAL MAIL 2nd CLASS-ROYAL MAIL 2nd CLASS/BPL2",
          code: "ROYAL MAIL 2nd CLASS",
        },
        {
          name:
            "ROYAL MAIL SIGNED 1ST GB CLASS-ROYAL MAIL SIGNED 1ST GB CLASS/BPR1",
          code: "ROYAL MAIL SIGNED 1ST GB CLASS",
        },
        {
          name:
            "ROYAL MAIL SIGNED 2ND GB CLASS-ROYAL MAIL SIGNED 2ND GB CLASS/BPR2",
          code: "ROYAL MAIL SIGNED 2ND GB CLASS",
        },
        {
          name:
            "INTL BUS PARCELS ZONE INTL SORT PRIORITY (INTERNATIONAL)-INTL BUS PARCELS ZONE INTL SORT PRIORITY (INTERNATIONAL)/IE1",
          code: "INTL BUS PARCELS ZONE INTL SORT PRIORITY (INTERNATIONAL)",
        },
        {
          name:
            "INTL BUS MAIL LRG LTR INTL ZONE SORT PRI (INTERNATIONAL)-INTL BUS MAIL LRG LTR INTL ZONE SORT PRI (INTERNATIONAL)/IG1",
          code: "INTL BUS MAIL LRG LTR INTL ZONE SORT PRI (INTERNATIONAL)",
        },
        {
          name:
            "INTL BUS PARCELS INTL TRACKED EXTRA COMP INTERNATIONAL TRACKED (INTERNATIONAL)-INTL BUS PARCELS INTL TRACKED EXTRA COMP INTERNATIONAL TRACKED (INTERNATIONAL)/MP4",
          code:
            "INTL BUS PARCELS INTL TRACKED EXTRA COMP INTERNATIONAL TRACKED (INTERNATIONAL)",
        },
        {
          name:
            "INTL BUS PARCELS SIGNED (INTERNATIONAL)-INTL BUS PARCELS SIGNED (INTERNATIONAL)/MP5",
          code: "INTL BUS PARCELS SIGNED (INTERNATIONAL)",
        },
        {
          name:
            "DW1-INTL BUS PARCELS PARCELS BESPOKE POSTAL-DW1-INTL BUS PARCELS PARCELS BESPOKE POSTAL/DW1",
          code: "DW1-INTL BUS PARCELS PARCELS BESPOKE POSTAL",
        },
        {
          name:
            "INTL BUS MAIL TRACKED & INTL SIGNED (INTERNATIONAL)-INTL BUS MAIL TRACKED & INTL SIGNED (INTERNATIONAL)/MTC",
          code: "INTL BUS MAIL TRACKED & INTL SIGNED (INTERNATIONAL)",
        },
        {
          name:
            "INT BUS MAIL TRCKD & SGND ZN SRT XTR CMP-INT BUS MAIL TRCKD & SGND ZN SRT XTR CMP/MTD",
          code: "INT BUS MAIL TRCKD & SGND ZN SRT XTR CMP",
        },
        {
          name:
            "INTL BUS PARCELS INTL TRACKED & SIGNED CTRY (INTERNATIONAL)-INTL BUS PARCELS INTL TRACKED & SIGNED CTRY (INTERNATIONAL)/MTE",
          code: "INTL BUS PARCELS INTL TRACKED & SIGNED CTRY (INTERNATIONAL)",
        },
        {
          name:
            "INTL BUS MAIL TRACKED (INTERNATIONAL)-INTL BUS MAIL TRACKED (INTERNATIONAL)/MTI",
          code: "INTL BUS MAIL TRACKED (INTERNATIONAL)",
        },
        {
          name:
            "INTL BUS MAIL SIGNED (INTERNATIONAL)-INTL BUS MAIL SIGNED (INTERNATIONAL)/MTM",
          code: "INTL BUS MAIL SIGNED (INTERNATIONAL)",
        },
        {
          name:
            "INTERNATIONAL STANDARD INTL ON ACCOUNT (INTERNATIONAL)-INTERNATIONAL STANDARD INTL ON ACCOUNT (INTERNATIONAL)/OLA",
          code: "INTERNATIONAL STANDARD INTL ON ACCOUNT (INTERNATIONAL)",
        },
        {
          name:
            "INTERNATIONAL SIGNED ON INTL ACCOUNT (INTERNATIONAL)-INTERNATIONAL SIGNED ON INTL ACCOUNT (INTERNATIONAL)/OSA",
          code: "INTERNATIONAL SIGNED ON INTL ACCOUNT (INTERNATIONAL)",
        },
        {
          name:
            "INTERNATIONAL SIGNED ON ACCOUNT EXTRA COMP-INTERNATIONAL SIGNED ON ACCOUNT EXTRA COMP/OSB",
          code: "INTERNATIONAL SIGNED ON ACCOUNT EXTRA COMP",
        },
        {
          name:
            "INTERNATIONAL TRACKED ON ACCOUNT-INTERNATIONAL TRACKED ON ACCOUNT/OTA",
          code: "INTERNATIONAL TRACKED ON ACCOUNT",
        },
        {
          name:
            "INTL TRACKED ON ACCOUNT EXTRA COMP-INTL TRACKED ON ACCOUNT EXTRA COMP/OTB",
          code: "INTL TRACKED ON ACCOUNT EXTRA COMP",
        },
        {
          name:
            "INTERNATIONAL TRACKED & SIGNED ON ACCT-INTERNATIONAL TRACKED & SIGNED ON ACCT/OTC",
          code: "INTERNATIONAL TRACKED & SIGNED ON ACCT",
        },
        {
          name:
            "INTL TRACKED & SIGNED ON ACCT EXTRA COMP-INTL TRACKED & SIGNED ON ACCT EXTRA COMP/OTD",
          code: "INTL TRACKED & SIGNED ON ACCT EXTRA COMP",
        },
        {
          name:
            "ROYAL MAIL 48 (LL) FLAT GB RATE-ROYAL MAIL 48 (LL) FLAT GB RATE/PK0",
          code: "ROYAL MAIL 48 (LL) FLAT GB RATE",
        },
        {
          name:
            "ROYAL MAIL 24 (SORT8) GB (LL\\P) DAILY RATE-ROYAL MAIL 24 (SORT8) GB (LL\\P) DAILY RATE/PK3",
          code: "ROYAL MAIL 24 (SORT8) GB (LL P) DAILY RATE",
        },
        {
          name:
            "ROYAL MAIL 48 (SORT8) GB (LL\\P) DAILY RATE-ROYAL MAIL 48 (SORT8) GB (LL\\P) DAILY RATE/PK4",
          code: "ROYAL MAIL 48 (SORT8) GB (LL P) DAILY RATE",
        },
        { name: "ROYAL MAIL 24-ROYAL MAIL 24/CRL1", code: "ROYAL MAIL 24" },
        { name: "ROYAL MAIL 48-ROYAL MAIL 48/CRL2", code: "ROYAL MAIL 48" },
        {
          name:
            "ROYAL MAIL 24 (SORT8) (LL) FLAT RATE-ROYAL MAIL 24 (SORT8) (LL) FLAT RATE/FS1",
          code: "ROYAL MAIL 24 (SORT8) (LL) FLAT RATE",
        },
        {
          name:
            "ROYAL MAIL 48 (SORT8) (LL) FLAT RATE-ROYAL MAIL 48 (SORT8) (LL) FLAT RATE/FS2",
          code: "ROYAL MAIL 48 (SORT8) (LL) FLAT RATE",
        },
        {
          name:
            "ROYAL MAIL 24 (PRESORTED) (LL)-ROYAL MAIL 24 (PRESORTED) (LL)/FS7",
          code: "ROYAL MAIL 24 (PRESORTED) (LL)",
        },
        {
          name:
            "ROYAL MAIL 48 (PRESORTED) (LL)-ROYAL MAIL 48 (PRESORTED) (LL)/FS8",
          code: "ROYAL MAIL 48 (PRESORTED) (LL)",
        },
        {
          name:
            "INTL BUS MAIL L LTR ZONE SRT ECONOMY MCH-INTL BUS MAIL L LTR ZONE SRT ECONOMY MCH/IG6",
          code: "INTL BUS MAIL L LTR ZONE SRT ECONOMY MCH",
        },
        {
          name: "SD GUARANTEED BY 1PM LA-SD GUARANTEED BY 1PM LA/LA1",
          code: "SD GUARANTEED BY 1PM LA",
        },
        {
          name:
            "SD GUARANTEED BY 1PM LA (£1000)-SD GUARANTEED BY 1PM LA (£1000)/LA2",
          code: "SD GUARANTEED BY 1PM LA (£1000)",
        },
        {
          name:
            "SD GUARANTEED BY 1PM LA (£2500)-SD GUARANTEED BY 1PM LA (£2500)/LA3",
          code: "SD GUARANTEED BY 1PM LA (£2500)",
        },
        {
          name: "SD GUARANTEED BY 9AM LA-SD GUARANTEED BY 9AM LA/LA4",
          code: "SD GUARANTEED BY 9AM LA",
        },
        {
          name:
            "SD GUARANTEED BY 9AM LA (£1000)-SD GUARANTEED BY 9AM LA (£1000)/LA5",
          code: "SD GUARANTEED BY 9AM LA (£1000)",
        },
        {
          name:
            "SD GUARANTEED BY 9AM LA (£2500)-SD GUARANTEED BY 9AM LA (£2500)/LA6",
          code: "SD GUARANTEED BY 9AM LA (£2500)",
        },
        {
          name:
            "INTL BUS PARCELS SIGNED EXTRA COMP CTRY-INTL BUS PARCELS SIGNED EXTRA COMP CTRY/MP0",
          code: "INTL BUS PARCELS SIGNED EXTRA COMP CTRY",
        },
        {
          name:
            "INTL BUS PARCELS SIGNED EXTRA COMP- INTL BUS PARCELS SIGNED EXTRA COMP/MP6",
          code: " INTL BUS PARCELS SIGNED EXTRA COMP",
        },
        {
          name:
            "INTL BUS PARCELS TRACKED COUNTRY PRICED-INTL BUS PARCELS TRACKED COUNTRY PRICED/MP7",
          code: "INTL BUS PARCELS TRACKED COUNTRY PRICED",
        },
        {
          name:
            "INTL BUS PARCELS TRACKED EXTRA COMP CTRY-INTL BUS PARCELS TRACKED EXTRA COMP CTRY/MP8",
          code: "INTL BUS PARCELS TRACKED EXTRA COMP CTRY",
        },
        {
          name:
            "INTL BUS PARCELS SIGNED COUNTRY PRICED-INTL BUS PARCELS SIGNED COUNTRY PRICED/MP9",
          code: "INTL BUS PARCELS SIGNED COUNTRY PRICED",
        },
        {
          name:
            "INTL BUS PARCEL TRACK BOX CTRY XTRA COMP-INTL BUS PARCEL TRACK BOX CTRY XTRA COMP/MPB",
          code: "INTL BUS PARCEL TRACK BOX CTRY XTRA COMP",
        },
        {
          name:
            "INTL BUS PARCEL TRACKED HIGH VOL-INTL BUS PARCEL TRACKED HIGH VOL/MPF",
          code: "INTL BUS PARCEL TRACKED HIGH VOL",
        },
        {
          name:
            "INTL BUS PARCEL TRACK & SIGN HIGH VOL-INTL BUS PARCEL TRACK & SIGN HIGH VOL/MPG",
          code: "INTL BUS PARCEL TRACK & SIGN HIGH VOL",
        },
        {
          name:
            "INTL BUS PARCEL SIGNED HIGH VOL-INTL BUS PARCEL SIGNED HIGH VOL/MPH",
          code: "INTL BUS PARCEL SIGNED HIGH VOL",
        },
        {
          name:
            "INTL BUS PARCELS TRACKED EXTRA COMP CTRY-INTL BUS PARCELS TRACKED EXTRA COMP CTRY/MPI",
          code: "INTL BUS PARCELS TRACKED EXTRA COMP CTRY",
        },
        {
          name:
            "INTL BUS PARCEL T&S HIGH VOL XTR COMP-INTL BUS PARCEL T&S HIGH VOL XTR COMP/MPJ",
          code: "INTL BUS PARCEL T&S HIGH VOL XTR COMP",
        },
        {
          name:
            "INTL BUS PARCEL SIGNED HIGH VOL XTR COMP-INTL BUS PARCEL SIGNED HIGH VOL XTR COMP/MPK",
          code: "INTL BUS PARCEL SIGNED HIGH VOL XTR COMP",
        },
        {
          name:
            "INTL BUS MAIL MIXED ZONE SORT PRIORITY-INTL BUS MAIL MIXED ZONE SORT PRIORITY/OZ1",
          code: "INTL BUS MAIL MIXED ZONE SORT PRIORITY",
        },
        {
          name:
            "INTERNATIONAL ECONOMY ON ACCOUNT-INTERNATIONAL ECONOMY ON ACCOUNT/OLS",
          code: "INTERNATIONAL ECONOMY ON ACCOUNT",
        },
        {
          name: "TRACKED RETURNS 48-TRACKED RETURNS 48/TSS",
          code: "TRACKED RETURNS 48",
        },
        {
          name: "TRACKED RETURNS 24-TRACKED RETURNS 24/TSN",
          code: "TRACKED RETURNS 24",
        },
        {
          name:
            "ROYAL MAIL TRACKED 48 (LBT) - Non Signature-ROYAL MAIL TRACKED 48 (LBT) - Non Signature/TRS",
          code: "ROYAL MAIL TRACKED 48 (LBT) - Non Signature",
        },
        {
          name:
            "ROYAL MAIL TRACKED 24 (LBT) - Non Signature-ROYAL MAIL TRACKED 24 (LBT) - Non Signature/TRN",
          code: "ROYAL MAIL TRACKED 24 (LBT) - Non Signature",
        },
        {
          name:
            "ROYAL MAIL TRACKED 24 (LBT) (HV) - Non Signature-ROYAL MAIL TRACKED 24 (LBT) (HV) - Non Signature/TRM",
          code: "ROYAL MAIL TRACKED 24 (LBT) (HV) - Non Signature",
        },
        {
          name:
            "ROYAL MAIL TRACKED 48 (LBT) (HV) - Non Signature-ROYAL MAIL TRACKED 48 (LBT) (HV) - Non Signature/TRL",
          code: "ROYAL MAIL TRACKED 48 (LBT) (HV) - Non Signature",
        },
        {
          name: "ROYAL MAIL 48 (P) FLAT RATE-ROYAL MAIL 48 (P) FLAT RATE/RM6",
          code: "ROYAL MAIL 48 (P) FLAT RATE",
        },
        {
          name: "ROYAL MAIL 24 (P) FLAT RATE-ROYAL MAIL 24 (P) FLAT RATE/RM5",
          code: "ROYAL MAIL 24 (P) FLAT RATE",
        },
        {
          name:
            "ROYAL MAIL 48 (P) DAILY RATE-ROYAL MAIL 48 (P) DAILY RATE/RM4",
          code: "ROYAL MAIL 48 (P) DAILY RATE",
        },
        {
          name:
            "ROYAL MAIL 48 (LL) DAILY RATE-ROYAL MAIL 48 (LL) DAILY RATE/RM3",
          code: "ROYAL MAIL 48 (LL) DAILY RATE",
        },
        { name: "HM FORCES-HM FORCES/BF1", code: "HM FORCES" },
        {
          name: "HM FORCES SIGNED FOR-HM FORCES SIGNED FOR/BF2",
          code: "HM FORCES SIGNED FOR",
        },
        {
          name: "HM FORCES SPECIAL DELIVERY-HM FORCES SPECIAL DELIVERY/BF7",
          code: "HM FORCES SPECIAL DELIVERY",
        },
        {
          name:
            "HM FORCES SPECIAL DELIVERY (£1000)-HM FORCES SPECIAL DELIVERY (£1000)/BF8",
          code: "HM FORCES SPECIAL DELIVERY (£1000)",
        },
        {
          name:
            "HM FORCES SPECIAL DELIVERY (£2500)-HM FORCES SPECIAL DELIVERY (£2500)/BF9",
          code: "HM FORCES SPECIAL DELIVERY (£2500)",
        },
        {
          name:
            "INTL BUS MAIL LARGE LETTER MAX SORT PRIORITY-INTL BUS MAIL LARGE LETTER MAX SORT PRIORITY/PS7",
          code: "INTL BUS MAIL LARGE LETTER MAX SORT PRIORITY",
        },
        {
          name:
            "INTL BUS PARCELS MAX SORT PRIORITY-INTL BUS PARCELS MAX SORT PRIORITY/PS9",
          code: "INTL BUS PARCELS MAX SORT PRIORITY",
        },
        {
          name: "ROYAL MAIL TRACKED 24 (AGE)-ROYAL MAIL TRACKED 24 (AGE)/TPC",
          code: "ROYAL MAIL TRACKED 24 (AGE)",
        },
        {
          name: "ROYAL MAIL TRACKED 48 (AGE)-ROYAL MAIL TRACKED 48 (AGE)/TPD",
          code: "ROYAL MAIL TRACKED 48 (AGE)",
        },
        { name: "UNH-UNH/UNH", code: "UNH" },
        { name: "UNG-UNG/UNG", code: "UNG" },
        {
          name:
            "INTL BUS MAIL LRG LTR MAX SORT RES PRI-INTL BUS MAIL LRG LTR MAX SORT RES PRI/BG1",
          code: "INTL BUS MAIL LRG LTR MAX SORT RES PRI",
        },
        {
          name:
            "INTL BUS MAIL LRG LTR MAX SORT RES STD-INTL BUS MAIL LRG LTR MAX SORT RES STD/BG2",
          code: "INTL BUS MAIL LRG LTR MAX SORT RES STD",
        },
        {
          name:
            "INTL BUS MAIL L LTR MAX SORT RES ECONOMY-INTL BUS MAIL L LTR MAX SORT RES ECONOMY/BG3",
          code: "INTL BUS MAIL L LTR MAX SORT RES ECONOMY",
        },
        {
          name:
            "INTL BUS MAIL LETTERS MAX SORT RES PRI-INTL BUS MAIL LETTERS MAX SORT RES PRI/BP1",
          code: "INTL BUS MAIL LETTERS MAX SORT RES PRI",
        },
        {
          name:
            "INTL BUS MAIL LETTERS MAX SORT RES STD-INTL BUS MAIL LETTERS MAX SORT RES STD/BP2",
          code: "INTL BUS MAIL LETTERS MAX SORT RES STD",
        },
        {
          name:
            "INTL BUS MAIL LTR MAX SORT RES ECONOMY-INTL BUS MAIL LTR MAX SORT RES ECONOMY/BP3",
          code: "INTL BUS MAIL LTR MAX SORT RES ECONOMY",
        },
        {
          name:
            "INTL BUS MAIL LTR CTRY SORT HI VOL PRI-INTL BUS MAIL LTR CTRY SORT HI VOL PRI/DP1",
          code: "INTL BUS MAIL LTR CTRY SORT HI VOL PRI",
        },
        {
          name:
            "INTL BUS MAIL LTR CTRY SORT HI VOL ECON-INTL BUS MAIL LTR CTRY SORT HI VOL ECON/DP3",
          code: "INTL BUS MAIL LTR CTRY SORT HI VOL ECON",
        },
        {
          name:
            "INTL BUS MAIL LTR CTRY SORT LO VOL PRI-INTL BUS MAIL LTR CTRY SORT LO VOL PRI/DP4",
          code: "INTL BUS MAIL LTR CTRY SORT LO VOL PRI",
        },
        {
          name:
            "INTL BUS MAIL LTR CTRY SORT LO VOL ECON-INTL BUS MAIL LTR CTRY SORT LO VOL ECON/DP6",
          code: "INTL BUS MAIL LTR CTRY SORT LO VOL ECON",
        },
        {
          name:
            "INTL BUS PARCELS BESPOKE POSTAL-INTL BUS PARCELS BESPOKE POSTAL/DW1",
          code: "INTL BUS PARCELS BESPOKE POSTAL",
        },
        {
          name: "CUSTOMER NESTED MAXSORT-CUSTOMER NESTED MAXSORT/DW2",
          code: "CUSTOMER NESTED MAXSORT",
        },
        {
          name:
            "INTL BUS MAIL LTR ZONE SORT PRI-INTL BUS MAIL LTR ZONE SORT PRI/IP1",
          code: "INTL BUS MAIL LTR ZONE SORT PRI",
        },
        {
          name:
            "INTL BUS MAIL LTR ZONE SORT ECONOMY-INTL BUS MAIL LTR ZONE SORT ECONOMY/IP3",
          code: "INTL BUS MAIL LTR ZONE SORT ECONOMY",
        },
        {
          name:
            "INTL BUS MAIL LETTERS ZONE SORT PRI MCH-INTL BUS MAIL LETTERS ZONE SORT PRI MCH/IP4",
          code: "INTL BUS MAIL LETTERS ZONE SORT PRI MCH",
        },
        {
          name:
            "INTL BUS MAIL LTR ZONE SRT ECONOMY MCH-INTL BUS MAIL LTR ZONE SRT ECONOMY MCH/IP6",
          code: "INTL BUS MAIL LTR ZONE SRT ECONOMY MCH",
        },
        {
          name:
            "Import DE Tracked 48 Parcels (TPL) - Non Signature-Import DE Tracked 48 Parcels (TPL) - Non Signature/ITLN",
          code: "Import DE Tracked 48 Parcels (TPL) - Non Signature",
        },
        {
          name:
            "Import DE Tracked 48 Parcels (TPL) - Signature-Import DE Tracked 48 Parcels (TPL) - Signature/ITLS",
          code: "Import DE Tracked 48 Parcels (TPL) - Signature",
        },
        {
          name:
            "Import DE Tracked 24 Parcels (TPM) - No Signature-Import DE Tracked 24 Parcels (TPM) - No Signature/ITMN",
          code: "Import DE Tracked 24 Parcels (TPM) - No Signature",
        },
        {
          name:
            "Import DE tracked 24 Parcels (TPM) - Signature-Import DE tracked 24 Parcels (TPM) - Signature/ITMS",
          code: "Import DE tracked 24 Parcels (TPM) - Signature",
        },
        {
          name:
            "Import DE tracked 24 Parcels (TPM) - Signature-Import DE tracked 24 Parcels (TPM) - Signature/ITMS",
          code: "Import DE tracked 24 Parcels (TPM) - Signature",
        },
        {
          name: "QM/10 Option 2 over 500g-QM/10 Option 2 over 500g/TC1",
          code: "QM/10 Option 2 over 500g",
        },
        {
          name: "QM/10 Option 2 Mixed Mail-QM/10 Option 2 Mixed Mail/TC2",
          code: "QM/10 Option 2 Mixed Mail",
        },
        {
          name:
            "Royal Mail Tracked 24 (HV) - With Signature (AGE)-Royal Mail Tracked 24 (HV) - With Signature (AGE)/TPA",
          code: "Royal Mail Tracked 24 (HV) - With Signature (AGE)",
        },
        {
          name:
            "Royal Mail Tracked 48 (HV) - With Signature (AGE)-Royal Mail Tracked 48 (HV) - With Signature (AGE)/TPB",
          code: "Royal Mail Tracked 48 (HV) - With Signature (AGE)",
        },
        {
          name:
            "Royal Mail Tracked 24 - With Signature (AGE)-Royal Mail Tracked 24 - With Signature (AGE)/TPC",
          code: "Royal Mail Tracked 24 - With Signature (AGE)",
        },
        {
          name:
            "Royal Mail Tracked 48 - With Signature (AGE)-Royal Mail Tracked 48 - With Signature (AGE)/TPD",
          code: "Royal Mail Tracked 48 - With Signature (AGE)",
        },
        {
          name:
            "ROYAL MAIL TRACKED 48 (HV) NO SIGNATURE-ROYAL MAIL TRACKED 48 (HV) NO SIGNATURE/TPLN",
          code: "ROYAL MAIL TRACKED 48 (HV) NO SIGNATURE",
        },
        {
          name:
            "ROYAL MAIL TRACKED 48 (HV) SIGNATURE-ROYAL MAIL TRACKED 48 (HV) SIGNATURE/TPLS",
          code: "ROYAL MAIL TRACKED 48 (HV) SIGNATURE",
        },
        {
          name:
            "ROYAL MAIL TRACKED 24 (HV) NO SIGNATURE-ROYAL MAIL TRACKED 24 (HV) NO SIGNATURE/TPMN",
          code: "ROYAL MAIL TRACKED 24 (HV) NO SIGNATURE",
        },
        {
          name:
            "ROYAL MAIL TRACKED 24 (HV) SIGNATURE-ROYAL MAIL TRACKED 24 (HV) SIGNATURE/TPMS",
          code: "ROYAL MAIL TRACKED 24 (HV) SIGNATURE",
        },
        {
          name:
            "INTL BUS MAIL LETTERS ZERO SORT PRIORITY-INTL BUS MAIL LETTERS ZERO SORT PRIORITY/WP1",
          code: "INTL BUS MAIL LETTERS ZERO SORT PRIORITY",
        },
        {
          name:
            "INTL BUS MAIL LETTERS ZERO SORT ECONOMY-INTL BUS MAIL LETTERS ZERO SORT ECONOMY/WP3",
          code: "INTL BUS MAIL LETTERS ZERO SORT ECONOMY",
        },
        {
          name:
            "INTL BUS MAIL LETTERS ZERO SORT PRI MCH-INTL BUS MAIL LETTERS ZERO SORT PRI MCH/WP4",
          code: "INTL BUS MAIL LETTERS ZERO SORT PRI MCH",
        },
        {
          name:
            "INT BUS PARCELS ZERO SORT LO VOL PRIORITY-INT BUS PARCELS ZERO SORT LO VOL PRIORITY/DE4",
          code: "INT BUS PARCELS ZERO SORT LO VOL PRIORITY",
        },
      ],
      dpd: [
        { name: "Please Select a Service?", code: "-1" },
        { name: "PARCEL Sunday-1^01", code: "PARCEL Sunday-1*01" },
        {
          name: "FREIGHT PARCEL Sunday-1^06",
          code: "FREIGHT PARCEL Sunday-1*06",
        },
        { name: "PALLET Sunday-1^08", code: "PALLET Sunday-1*08" },
        { name: "EXPRESSPAK Sunday-1^09", code: "EXPRESSPAK Sunday-1*09" },
        { name: "PARCEL Two Day-1^11", code: "PARCEL Two Day-1*11" },
        { name: "PARCEL Next Day-1^12", code: "PARCEL Next Day-1*12" },
        { name: "PARCEL Before 12-1^13", code: "PARCEL Before 12-1*13" },
        { name: "PARCEL Before 10-1^14", code: "PARCEL Before 10-1*14" },
        { name: "PARCEL Saturday-1^16", code: "PARCEL Saturday-1*16" },
        { name: "PARCEL Sat by 12-1^17", code: "PARCEL Sat by 12-1*17" },
        { name: "PARCEL TSat by 10-1^18", code: "PARCEL TSat by 10-1*18" },
        {
          name: "Parcel - DPD Classic (2 to 3 days) INTERNATIONAL-1^19",
          code: "Parcel - DPD Classic (2 to 3 days) INTERNATIONAL-1*19",
        },
        { name: "Home EVE-1^21", code: "Home EVE-1*21" },
        {
          name: "PARCEL RETURN TO SHOP-1^22",
          code: "PARCEL RETURN TO SHOP-1*22",
        },
        { name: "Home AM-1^23", code: "Home AM-1*23" },
        { name: "Home PM-1^25", code: "Home PM-1*25" },
        {
          name: "PARCEL Sunday 12:00-1^29",
          code: "PARCEL Sunday 12:00-1*29",
        },
        {
          name: "FREIGHT PARCEL Sunday 12:00-1^31",
          code: "FREIGHT PARCEL Sunday 12:00-1*31",
        },
        {
          name: "ExpressPak Next Day-1^32",
          code: "ExpressPak Next Day-1*32",
        },
        {
          name: "ExpressPak Before 12-1^33",
          code: "ExpressPak Before 12-1*33",
        },
        {
          name: "ExpressPak Before 10-1^34",
          code: "ExpressPak Before 10-1*34",
        },
        {
          name: "ExpressPak Saturday-1^36",
          code: "ExpressPak Saturday-1*36",
        },
        {
          name: "ExpressPak Sat by 12-1^37",
          code: "ExpressPak Sat by 12-1*37",
        },
        {
          name: "ExpressPak Sat by 10-1^38",
          code: "ExpressPak Sat by 10-1*38",
        },
        {
          name: "Expresspak - DPD Classic (2 to 3 days) INTERNATIONAL-1^39",
          code: "Expresspak - DPD Classic (2 to 3 days) INTERNATIONAL-1*39",
        },
        { name: "Swapit Two Day-1^41", code: "Swapit Two Day-1*41" },
        { name: "Swapit Next Day-1^42", code: "Swapit Next Day-1*42" },
        { name: "Swapit Before 12-1^43", code: "Swapit Before 12-1*43" },
        { name: "Swapit Before 10-1^44", code: "Swapit Before 10-1*44" },
        { name: "Swapit Saturday-1^46", code: "Swapit Saturday-1*46" },
        { name: "Swapit Sat by 12-1^47", code: "Swapit Sat by 12-1*47" },
        { name: "Swapit Sat by 10-1^48", code: "Swapit Sat by 10-1*48" },
        {
          name: "Air Express (2 days) INTERNATIONAL-1^50",
          code: "Air Express (2 days) INTERNATIONAL-1*50",
        },
        {
          name: "EXPRESSPAK Sunday 12:00-1^51",
          code: "EXPRESSPAK Sunday 12:00-1*51",
        },
        { name: "Homecall-1^59", code: "Homecall-1*59" },
        {
          name: "Air Classic (3 to 4 days) INTERNATIONAL-1^60",
          code: "Air Classic (3 to 4 days) INTERNATIONAL-1*60",
        },
        {
          name: "PALLET Sunday 12:00-1^69",
          code: "PALLET Sunday 12:00-1*69",
        },
        { name: "Pallet Two Day-1^71", code: "Pallet Two Day-1*71" },
        { name: "Pallet Next Day-1^72", code: "Pallet Next Day-1*72" },
        { name: "Pallet Before 12-1^73", code: "Pallet Before 12-1*73" },
        { name: "Pallet Before 10-1^74", code: "Pallet Before 10-1*74" },
        { name: "Pallet Saturday-1^76", code: "Pallet Saturday-1*76" },
        { name: "Pallet Sat by 12-1^77", code: "Pallet Sat by 12-1*77" },
        { name: "Pallet Sat by 10-1^78", code: "Pallet Sat by 10-1*78" },
        {
          name: "Pallet - DPD Classic (2 to 3 days) INTERNATIONAL-1^79",
          code: "Pallet - DPD Classic (2 to 3 days) INTERNATIONAL-1*79",
        },
        { name: "Freight Two Day-1^81", code: "Freight Two Day-1*81" },
        { name: "Freight Next Day-1^82", code: "Freight Next Day-1*82" },
        { name: "Freight Before 12-1^83", code: "Freight Before 12-1*83" },
        { name: "Freight Before 10-1^84", code: "Freight Before 10-1*84" },
        { name: "Freight Saturday-1^86", code: "Freight Saturday-1*86" },
        { name: "Freight Sat by 12-1^87", code: "Freight Sat by 12-1*87" },
        { name: "Freight Sat by 10-1^88", code: "Freight Sat by 10-1*88" },
        {
          name: "Freight Parcel - DPD Classic (2 to 3 days)-1^89",
          code: "Freight Parcel - DPD Classic (2 to 3 days)-1*89",
        },
        {
          name: "Contract Pak Two Day-1^91",
          code: "Contract Pak Two Day-1*91",
        },
        {
          name: "Contract Pak Next Day-1^92",
          code: "Contract Pak Next Day-1*92",
        },
        {
          name: "Contract Pak Before 12-1^93",
          code: "Contract Pak Before 12-1*93",
        },
        {
          name: "Contract Pak Before 10-1^94",
          code: "Contract Pak Before 10-1*94",
        },
        {
          name: "Contract Pak Saturday-1^96",
          code: "Contract Pak Saturday-1*96",
        },
        {
          name: "Contract Pak Sat by 12-1^97",
          code: "Contract Pak Sat by 12-1*97",
        },
        {
          name: "Expak - Pickup Classic (2 to 3 days) INTERNATIONAL-1^98",
          code: "Expak - Pickup Classic (2 to 3 days) INTERNATIONAL-1*98",
        },
        {
          name: "Parcel - Pickup Classic (2 to 3 days) INTERNATIONAL-1^99",
          code: "Parcel - Pickup Classic (2 to 3 days) INTERNATIONAL-1*99",
        },
      ],

      yodel: [
        { name: "Please Select a Service?", code: "-1" },
        { name: "XPRESS 24 NON POD-1CN", code: "XPRESS 24 NON POD-1CN" },
        { name: "XPRESS 24 POD-1CP", code: "XPRESS 24 POD-1CP" },
        {
          name: "XPRESS MINI 48 NON POD-2CMN",
          code: "XPRESS MINI 48 NON POD-2CMN",
        },
        { name: "XPRESS 48 NON POD-2CN", code: "XPRESS 48 NON POD-2CN" },
        { name: "XPRESS 48 POD-2CP", code: "XPRESS 48 POD-2CP" },
        {
          name: "XPECT 48 XL NON POD-2VLN",
          code: "XPECT 48 XL NON POD-2VLN",
        },
        { name: "XPECT 48 XL POD-2VLP", code: "XPECT 48 XL POD-2VLP" },
        { name: "XPECT 48 NON POD-2VN", code: ">XPECT 48 NON POD-2VN" },
        { name: "XPECT 48 POD-2VP", code: "XPECT 48 POD-2VP" },
        { name: "XPRESS 24 NON POD-1CNNI", code: "XPRESS 24 NON POD-1CNNI" },
        { name: "XPRESS 24 POD-1CPNI", code: "XPRESS 24 POD-1CPNI" },
        {
          name: "XPRESS MINI 48 NON POD-2CMNNI",
          code: "XPRESS MINI 48 NON POD-2CMNNI",
        },
        { name: "XPRESS 48 NON POD-2CNNI", code: "XPRESS 48 NON POD-2CNNI" },
        { name: "XPRESS 48 POD-2CPNI", code: "XPRESS 48 POD-2CPNI" },
        {
          name: "XPECT 48 XL NON POD-2VLNNI",
          code: "XPECT 48 XL NON POD-2VLNNI",
        },
        { name: "XPECT 48 XL POD-2VLPNI", code: "XPECT 48 XL POD-2VLPNI" },
        { name: "XPECT 48 NON POD-2VNNI", code: "XPECT 48 NON POD-2VNNI" },
        { name: "XPECT 48 POD-2VPNI", code: "XPECT 48 POD-2VPNI" },
        { name: "Priority 10:00 (10)-DIA", code: "Priority 10:00 (10)-DIA" },
        {
          name: "Priority 12:00 (12)-NOON",
          code: "Priority 12:00 (12)-NOON",
        },
        {
          name: "Saturday 12:00 (12S)-SAT",
          code: "Saturday 12:00 (12S)-SAT",
        },
        {
          name: "UK Expect 24 POD (1EXP)-1EXP",
          code: "UK Expect 24 POD (1EXP)-1EXP",
        },
        {
          name: "UK Express (Isle) (ISLE)-ISLE",
          code: "UK Express (Isle) (ISLE)-ISLE",
        },
        { name: "UK Express 24 (1E)-STD", code: "UK Express 24 (1E)-STD" },
        {
          name: "UK Express 24 NI INT (1EB)-1EB",
          code: "UK Express 24 NI INT (1EB)-1EB",
        },
        {
          name: "UK Express 24 UK (1EU)-1EU",
          code: "UK Express 24 UK (1EU)-1EU",
        },
        { name: "UK Express 48 (ECO)-ECO", code: "UK Express 48 (ECO)-ECO" },
        {
          name: "UK Express 48 NI (2EN)-NIS",
          code: "UK Express 48 NI (2EN)-NIS",
        },
        {
          name: "UK Express Saturday 12 (1ES)-STSA",
          code: "UK Express Saturday 12 (1ES)-STSA",
        },
        {
          name: "UK Home Delivery 24 (1H)-HDN",
          code: "UK Home Delivery 24 (1H)-HDN",
        },
        {
          name: "UK Home Delivery 24 BT (1HB)-1HB",
          code: "UK Home Delivery 24 BT (1HB)-1HB",
        },
        {
          name: "UK Home Delivery 48 (HECO)-HECO",
          code: "UK Home Delivery 48 (HECO)-HECO",
        },
        {
          name: "UK Home Delivery 48 BT (2HB)-2HB",
          code: "UK Home Delivery 48 BT (2HB)-2HB",
        },
        {
          name: "UK Home Delivery 48 (NI)-2HN",
          code: "UK Home Delivery 48 (NI)-2HN",
        },
        {
          name: "UK Home Delivery 72 (3H)-HDPA",
          code: "UK Home Delivery 72 (3H)-HDPA",
        },
        {
          name: "UK Home Delivery 72 NI (3HN)-HIPA",
          code: "UK Home Delivery 72 NI (3HN)-HIPA",
        },
        {
          name: "UK Home Delivery Catalogue (5HCT)-5HCT",
          code: "UK Home Delivery Catalogue (5HCT)-5HCT",
        },
        {
          name: "UK Home Delivery Saturday (HSAT)-HSAT",
          code: "UK Home Delivery Saturday (HSAT)-HSAT",
        },
        {
          name: "UK Packet Service (3HPA)-PACK",
          code: "UK Packet Service (3HPA)-PACK",
        },
      ],
      amazon: [

      ],
      'RM Click & Drop': [
        { name: "ROAYL MAIL 1st CLASS", code: "BPL1" },
        { name: "ROYAL MAIL 2nd CLASS", code: "BPL2" },
        { name: "ROYAL MAIL 24", code: "CRL24" },
        { name: "ROYAL MAIL 48", code: "CRL48" },
        { name: "ROYAL MAIL TRACKED 48 ", code: "TRS48" },
        { name: "ROYAL MAIL TRACKED 24", code: "TRN24" },
        { name: "TRACKED 24 ", code: "TPN24" },
        { name: "TRACKED 48 ", code: "TPN48" },
        { name: "OLP1SF-Royal Mail Signed For 1st Class", code: "OLP1SF" },
        { name: "OLP2-Royal Mail 2nd Class", code: "OLP2" },
        { name: "OLP1-Royal Mail 1st Class", code: "OLP1" },
        { name: "OLP2SF-Royal Mail Signed For 2nd Class", code: "OLP2SF" },
        { name: "SD1OLP-Royal Mail Special Delivery Guaranteed by 1pm - £500 Compensation", code: "SD1OLP" },
        { name: "SD2OLP-Royal Mail Special Delivery Guaranteed by 1pm - £1000 Compensation ", code: "SD2OLP" },
        { name: "SD3OLP-Royal Mail Special Delivery Guaranteed by 1pm - £2500 Compensation ", code: "SD3OLP" },
        { name: "TOLP24-TOLP24", code: "TOLP24" },
        { name: "TOLP24SF-TOLP24SF", code: "TOLP24SF" },
        { name: "TOLP48-TOLP48", code: "TOLP48" },
        { name: "TOLP48SF-TOLP48SF", code: "TOLP48SF" },
        { name: "IEOLP-International Economy", code: "IEOLP" },
        { name: "ISOLP-International Standard", code: "ISOLP" },
        { name: "ISIOLP-International Signed - £250 Compensation", code: "ISIOLP" },
        { name: "ITROLP-International Tracked - £250 Compensation", code: "ITROLP" },
        { name: "ITSOLP-International Tracked & Signed - £250 Compensation ", code: "ITSOLP" },
        { name: "MTO-International Signed", code: "MTO" },
        { name: "MTK-International Tracked", code: "MTK" },
        { name: "MTG-International Tracked & Signed", code: "MTG" },
        { name: "MP9-International Signed", code: "MP9" },
        { name: "MP7-International Tracked", code: "MP7" },
        { name: "MTE-International Tracked & Signed", code: "MTE" },
        { name: "TPN-ROYAL MAIL TRACKED 24 ", code: "TPN" },
        { name: "TPS-ROYAL MAIL TRACKED 48 ", code: "TPS" },
        { name: "TRL-ROYAL MAIL TRACKED 48 (LBT) (HV) ", code: "TRL" },
        { name: "TRM-ROYAL MAIL TRACKED 24 (LBT) (HV) ", code: "TRM" },
        { name: "TRN-ROYAL MAIL TRACKED 24 (LBT) ", code: "TRN" },
        { name: "TRS-ROYAL MAIL TRACKED 48 (LBT) ", code: "TRS" },
        { name: "CRL-ROYAL MAIL 24/48 ", code: "CRL" }
      ]
    };
    this.salsesOrdersService.getIntegrateDetails(1).subscribe((res: any) => {
      //  ////console.log(res?.shippingRules.labelServiceClassDMList);
      this.shippingMethods['amazon'] = res?.shippingRules.serviceFormatList;
    }, error => {
      this.loading = false;
    })
  }
}
