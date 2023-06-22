import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Menu } from "../_models/Menu";
import { AllMenuTabs, Tabs } from "../_models/Tabs";
// import CountriesJson from '../../assets/config/countries.json';
// import  CountryJson  from '../../assets/config/country.json';
import { environment } from "src/environments/environment";
import { Country } from "../_models/country";
declare var $: any;
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DatasharingService {
  isLeftmenuhide: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  activeMenu: BehaviorSubject<string> = new BehaviorSubject<string>("");
  isRightSideMenuOpened: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  activeTheme: BehaviorSubject<string> = new BehaviorSubject<string>(
    "skin-megna"
  );

  allAllMenuTabs: BehaviorSubject<Tabs[]> = new BehaviorSubject<Tabs[]>([]);
  selectedAllMenuTabs: Tabs[] = [];

  allReportsTabs: BehaviorSubject<Tabs[]> = new BehaviorSubject<Tabs[]>([]);
  selectedReportsTabs: Tabs[] = [];

  salesHubTabs: BehaviorSubject<Tabs[]> = new BehaviorSubject<Tabs[]>([]);
  selectedMenuTabs: Tabs[] | any = [];

  salesPageRefresh = false;

  maxNumberOfTabsAllowed: number = environment.maxNumberOfTabsAllowed - 1;
  productPageRefresh: boolean = false;
  parentTab = "";
  previousMenu: AllMenuTabs = AllMenuTabs.sales_orders;

  // allWarehouseTabs: BehaviorSubject<Tabs[]> = new BehaviorSubject<Tabs[]>([]);
  // selectedWareHouseTabs: Tabs[] = [];

  constructor(private router: Router, private http: HttpClient) {}
  togglesidemenu() {
    if (this.isLeftmenuhide.value) {
      this.isLeftmenuhide.next(false);
    } else {
      this.isLeftmenuhide.next(true);
    }
  }

  toggleRightsidemenu() {
    if (this.isRightSideMenuOpened.value) {
      this.isRightSideMenuOpened.next(false);
    } else {
      this.isRightSideMenuOpened.next(true);
    }
  }

  getCountries() {
    // let countries: Country[] = CountriesJson;
    // return countries;
    return this.http.get("../../assets/config/countries.json");
  }
  getCountry() {
    // let countries: Country[] = CountryJson;
    // return countries;
  }
  getCountriesForAmazonInte() {
    // let countries: Country[] = CountriesJson;
    // return countries.filter(country => country.amazonurl != '');
  }

  changeActiveMenu(activeMenu: string) {
    this.activeMenu.next(activeMenu);
  }

  addtoTab(selectedMenu: Menu) {
    // this.router.navigate(['/sellershub/app']);
    if (this.selectedMenuTabs.length > this.maxNumberOfTabsAllowed) {
      Swal.fire(
        "Here's a message!",
        "Max allowed number of tabs are " + environment.maxNumberOfTabsAllowed
      );
      return;
    }

    let i = this.selectedMenuTabs.findIndex(
      (t: any) => t.id == selectedMenu.tab
    );
    ////console.log('Index', i);
    if (i == -1) {
      switch (selectedMenu.tab) {
        case AllMenuTabs.dashboard:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.dashboard,
            id: AllMenuTabs.dashboard,
            titlename: "Dashboard",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.order_summary:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.order_summary,
            id: AllMenuTabs.order_summary,
            titlename: "Order Summary",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.sales_orders:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.sales_orders,
            id: AllMenuTabs.sales_orders,
            titlename: "Sales Orders",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.click_collect:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.click_collect,
            id: AllMenuTabs.click_collect,
            titlename: "Click and Collect",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.ready_to_shipment:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.ready_to_shipment,
            id: AllMenuTabs.ready_to_shipment,
            titlename: "Ready To Shipment",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.error_labels:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.error_labels,
            id: AllMenuTabs.error_labels,
            titlename: "Error Labels",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.mcf_Orders:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.mcf_Orders,
            id: AllMenuTabs.mcf_Orders,
            titlename: "MCF Orders",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.shipped_Orders:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.shipped_Orders,
            id: AllMenuTabs.shipped_Orders,
            titlename: "Shipped Orders",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.return_orders:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.return_orders,
            id: AllMenuTabs.return_orders,
            titlename: "Return Orders",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.cancelled_Orders:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.cancelled_Orders,
            id: AllMenuTabs.cancelled_Orders,
            titlename: "Cancelled Orders",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.mange_Orders:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.mange_Orders,
            id: AllMenuTabs.mange_Orders,
            titlename: "Manage Orders",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.sales_by_prod:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.sales_by_prod,
            id: AllMenuTabs.sales_by_prod,
            titlename: "Sales By Product",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.low_stock:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.low_stock,
            id: AllMenuTabs.low_stock,
            titlename: "Low Stock",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.stock_value_repo:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.stock_value_repo,
            id: AllMenuTabs.stock_value_repo,
            titlename: "Stock value Report",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.order_history:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.order_history,
            id: AllMenuTabs.order_history,
            titlename: "Order History",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.products:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.products,
            id: AllMenuTabs.products,
            titlename: "Products",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.channel_products:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.channel_products,
            id: AllMenuTabs.channel_products,
            titlename: "Channel Products",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.stock_view:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.stock_view,
            id: AllMenuTabs.stock_view,
            titlename: "Stock View",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.purchanse_orders:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.purchanse_orders,
            id: AllMenuTabs.purchanse_orders,
            titlename: "Purchase Ordes",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.wareHouses:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.wareHouses,
            id: AllMenuTabs.wareHouses,
            titlename: "Warehouses ",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.stocksummary:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.stocksummary,
            id: AllMenuTabs.stocksummary,
            titlename: "Stock Summary ",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.transfers:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.transfers,
            id: AllMenuTabs.transfers,
            titlename: "Transfers ",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.customers:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.customers,
            id: AllMenuTabs.customers,
            titlename: "Customers ",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.shipping_integration:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.shipping_integration,
            id: AllMenuTabs.shipping_integration,
            titlename: "Integration",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.shipping_manifests:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.shipping_manifests,
            id: AllMenuTabs.shipping_manifests,
            titlename: "Shipping manifests",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.filed_manifests:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.filed_manifests,
            id: AllMenuTabs.filed_manifests,
            titlename: "Filed manifests",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.channel_integration:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.channel_integration,
            id: AllMenuTabs.channel_integration,
            titlename: "Channel Integration",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.shipping_courier_setup:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.shipping_courier_setup,
            id: AllMenuTabs.shipping_courier_setup,
            titlename: "Shipping Courier Setup",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.waiting_to_list:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.waiting_to_list,
            id: AllMenuTabs.waiting_to_list,
            titlename: "Waiting to List ",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.list_errors:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.list_errors,
            id: AllMenuTabs.list_errors,
            titlename: "Listed Errors ",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.listed_products:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.listed_products,
            id: AllMenuTabs.listed_products,
            titlename: "Listed Products",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.closed_products:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.closed_products,
            id: AllMenuTabs.closed_products,
            titlename: "Closed Products ",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.channel_sceduled_listing:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.channel_sceduled_listing,
            id: AllMenuTabs.channel_sceduled_listing,
            titlename: "Channel Scheduled listing ",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.manage_fba:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.manage_fba,
            id: AllMenuTabs.manage_fba,
            titlename: "Manage FBA",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.create_products_to_fba:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.create_products_to_fba,
            id: AllMenuTabs.create_products_to_fba,
            titlename: "Create Products to FBA",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.send_products_to_fba:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.send_products_to_fba,
            id: AllMenuTabs.send_products_to_fba,
            titlename: "Send Products to FBA",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.products_in_fba:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.products_in_fba,
            id: AllMenuTabs.products_in_fba,
            titlename: "Products In FBA",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.suppliers:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.suppliers,
            id: AllMenuTabs.suppliers,
            titlename: "Suppliers",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.my_account:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.my_account,
            id: AllMenuTabs.my_account,
            titlename: "My Account",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.announcements:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.announcements,
            id: AllMenuTabs.announcements,
            titlename: "Announcements",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.releases:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.releases,
            id: AllMenuTabs.releases,
            titlename: "Releases",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.dispatch_console:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.dispatch_console,
            id: AllMenuTabs.dispatch_console,
            titlename: "Dispatch Console",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.user_management:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.user_management,
            id: AllMenuTabs.user_management,
            titlename: "User Management",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.suscrption:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.suscrption,
            id: AllMenuTabs.suscrption,
            titlename: "Subscription",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.reedem_coupon:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.reedem_coupon,
            id: AllMenuTabs.reedem_coupon,
            titlename: "Reedem Coupons",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.user_guide:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.user_guide,
            id: AllMenuTabs.user_guide,
            titlename: "User Guide",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.created_order:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.created_order,
            id: AllMenuTabs.created_order,
            titlename: "Create Order",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.view_order:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.view_order,
            id: AllMenuTabs.view_order,
            titlename: "View Order Details",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.edit_order:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.edit_order,
            id: AllMenuTabs.edit_order,
            titlename: "Edit Order Details",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.user_settings:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.user_settings,
            id: AllMenuTabs.user_settings,
            titlename: "User Settings",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        //Nedd to cross check
        case AllMenuTabs.ebay_inte:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.ebay_inte,
            id: AllMenuTabs.ebay_inte,
            titlename: "Ebay Integration",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.channel_inte:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.channel_inte,
            id: AllMenuTabs.channel_inte,
            titlename: "Marketplace Integration",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.create_product:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.create_product,
            id: AllMenuTabs.create_product,
            titlename: "Create Product",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.ecom_inte:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.ecom_inte,
            id: AllMenuTabs.ecom_inte,
            titlename: "eCom Integration",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.accounting_inte:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.accounting_inte,
            id: AllMenuTabs.accounting_inte,
            titlename: "Accouting Integration",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.accounting_info:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.accounting_info,
            id: AllMenuTabs.accounting_info,
            titlename: "Accouting",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.template_desines:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.template_desines,
            id: AllMenuTabs.template_desines,
            titlename: "Template Designs ",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.automations:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.automations,
            id: AllMenuTabs.automations,
            titlename: "Automations",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.edit_product:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.edit_product,
            id: AllMenuTabs.edit_product,
            titlename: "Edit Product",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.amazon_stock_repricer:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.amazon_stock_repricer,
            id: AllMenuTabs.amazon_stock_repricer,
            titlename: "Amazon Stock Repricer",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.repricing_settings:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.repricing_settings,
            id: AllMenuTabs.repricing_settings,
            titlename: "Repricing Settings",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.create_po:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.create_po,
            id: AllMenuTabs.create_po,
            titlename: selectedMenu.menuname,
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.create_bundle_product:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.create_bundle_product,
            id: AllMenuTabs.create_bundle_product,
            titlename: "Create Bundel Product",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.ai_dashboard:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.ai_dashboard,
            id: AllMenuTabs.ai_dashboard,
            titlename: "AI Orders Dashboard",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.ai_product_dashboard:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.ai_product_dashboard,
            id: AllMenuTabs.ai_product_dashboard,
            titlename: "AI Products Dashboard",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.ai_user_dashboard:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.ai_user_dashboard,
            id: AllMenuTabs.ai_user_dashboard,
            titlename: "AI Users Dashboard",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.ai_subscription_dashboard:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.ai_subscription_dashboard,
            id: AllMenuTabs.ai_subscription_dashboard,
            titlename: "AI Subscription Dashboard",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.ai_subscriptionplans_dashboard:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.ai_subscriptionplans_dashboard,
            id: AllMenuTabs.ai_subscriptionplans_dashboard,
            titlename: "AI SubscriptionPlans Dashboard",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.ai_channelorderdownloader_dashboard:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.ai_channelorderdownloader_dashboard,
            id: AllMenuTabs.ai_channelorderdownloader_dashboard,
            titlename: "AI Channel Order Downloader Dashboard",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.edit_po:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.edit_po,
            id: AllMenuTabs.edit_po,
            titlename: "Edit PO",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.duplicateOrder:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.duplicateOrder,
            id: AllMenuTabs.duplicateOrder,
            titlename: "Duplicate Order",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.customer_replies:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.customer_replies,
            id: AllMenuTabs.customer_replies,
            titlename: "Customer Replies",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.fba_calculator:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.fba_calculator,
            id: AllMenuTabs.fba_calculator,
            titlename: "Profit Calculator",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        case AllMenuTabs.category:
          this.selectedMenuTabs.map((x: any) => (x.active = false));
          this.selectedMenuTabs.splice(0, 0, {
            tab: AllMenuTabs.category,
            id: AllMenuTabs.category,
            titlename: "category",
            active: true,
            pMenu: selectedMenu.pmenu,
          });
          break;
        // case AllMenuTabs.bulk_actions:
        //   this.selectedMenuTabs.map(x => x.active = false);
        //   this.selectedMenuTabs.splice(0, 0, { tab: AllMenuTabs.bulk_actions, id: AllMenuTabs.bulk_actions, titlename: 'User Settings', active: true, pMenu: selectedMenu.pmenu });
        //   break;
        // case AllMenuTabs.barcode_management:
        //   this.selectedMenuTabs.map(x => x.active = false);
        //   this.selectedMenuTabs.splice(0, 0, { tab: AllMenuTabs.barcode_management, id: AllMenuTabs.barcode_management, titlename: 'User Settings', active: true, pMenu: selectedMenu.pmenu });
        //   break;
        // case AllMenuTabs.inventory_Sync:
        //   this.selectedMenuTabs.map(x => x.active = false);
        //   this.selectedMenuTabs.splice(0, 0, { tab: AllMenuTabs.inventory_Sync, id: AllMenuTabs.inventory_Sync, titlename: 'User Settings', active: true, pMenu: selectedMenu.pmenu });
        //   break;
        // case AllMenuTabs.shipping_rules:
        //   this.selectedMenuTabs.map(x => x.active = false);
        //   this.selectedMenuTabs.splice(0, 0, { tab: AllMenuTabs.shipping_rules, id: AllMenuTabs.shipping_rules, titlename: 'Shipping', active: true, pMenu: selectedMenu.pmenu });
        //   break;
        default:
          break;
      }
    } else {
      this.selectedMenuTabs.map((x: any) => (x.active = false));
      let sA: any = (this.selectedMenuTabs.find(
        (rt: any) => rt.id == selectedMenu.tab
      ).active = true);
    }
    this.salesHubTabs.next(this.selectedMenuTabs);
  }

  clearTabs() {
    this.selectedMenuTabs = [];
    this.salesHubTabs.next(this.selectedMenuTabs);
  }

  changeTheme(theme: string) {
    this.activeTheme.next(theme);
  }

  activeOrderDetails: BehaviorSubject<any> = new BehaviorSubject<any>(
    undefined
  );

  changeActiveOrder(activeOrderDetails: any) {
    this.activeOrderDetails.next(activeOrderDetails);
  }

  activeIntrgrationType: BehaviorSubject<any> = new BehaviorSubject<any>(
    undefined
  );

  changeActiveIntegration(activeIntrgrationType: any) {
    this.activeIntrgrationType.next(activeIntrgrationType);
  }

  isNewMarketCreation: BehaviorSubject<boolean> = new BehaviorSubject<any>(
    false
  );

  changeNewIntegration(isNewMarketCreation: any) {
    this.isNewMarketCreation.next(isNewMarketCreation);
  }

  activeIntrgrationType_ecom: BehaviorSubject<any> = new BehaviorSubject<any>(
    undefined
  );

  changeActiveIntegration_ecom(activeIntrgrationType: any) {
    this.activeIntrgrationType_ecom.next(activeIntrgrationType);
  }

  isNewMarketCreation_ecom: BehaviorSubject<boolean> = new BehaviorSubject<any>(
    false
  );

  changeNewIntegration_ecom(isNewMarketCreation: any) {
    this.isNewMarketCreation_ecom.next(isNewMarketCreation);
  }

  edit_productDetails: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  changeEditProductDetails(edit_productDetails: any) {
    this.edit_productDetails.next(edit_productDetails);
  }

  removeTab(sTab: AllMenuTabs) {
    this.selectedMenuTabs = this.selectedMenuTabs.filter(
      (sT: any) => sT.id != sTab
    );
    this.salesHubTabs.next(this.selectedMenuTabs);
  }

  closeIntegrationTab() {
    this.selectedMenuTabs = this.selectedMenuTabs.filter(
      (sT: any) => sT.id != AllMenuTabs.channel_inte
    );
    this.selectedMenuTabs = this.selectedMenuTabs.filter(
      (sT: any) => sT.id != AllMenuTabs.ecom_inte
    );
    //console.log(this.selectedMenuTabs);
    this.salesHubTabs.next(this.selectedMenuTabs);
    let menu = {
      icon: "",
      pmenu: "",
      menuname: "",
      routerLink: "",
      haschildrens: false,
      tab: AllMenuTabs.channel_integration,
    };
    this.addtoTab(menu);
  }
  closeAccIntegrationTab() {
    this.selectedMenuTabs = this.selectedMenuTabs.filter(
      (sT: any) => sT.id != AllMenuTabs.accounting_inte
    );
    //console.log(this.selectedMenuTabs);
    this.salesHubTabs.next(this.selectedMenuTabs);
    let menu = {
      icon: "",
      pmenu: "",
      menuname: "",
      routerLink: "",
      haschildrens: false,
      tab: AllMenuTabs.accounting_info,
    };
    this.addtoTab(menu);
  }

  closeNewEditOrderTab(type: any) {
    let tab: any =
      type === "edit" ? AllMenuTabs.edit_order : AllMenuTabs.created_order;
    this.selectedMenuTabs = this.selectedMenuTabs.filter(
      (sT: any) => sT.id != tab
    );
    //console.log(this.selectedMenuTabs);
    this.salesHubTabs.next(this.selectedMenuTabs);
    this.salesPageRefresh = true;
    let menu = {
      icon: "",
      pmenu: "",
      menuname: "",
      routerLink: "",
      haschildrens: false,
      tab: this.previousMenu,
    };
    this.addtoTab(menu);
  }

  closeDiplicateOrderTab(type: any) {
    // let tab: any = type === 'edit' ? AllMenuTabs.edit_order : AllMenuTabs.created_order;
    this.selectedMenuTabs = this.selectedMenuTabs.filter(
      (sT: any) => sT.id != AllMenuTabs.duplicateOrder
    );
    //console.log(this.selectedMenuTabs);
    this.salesHubTabs.next(this.selectedMenuTabs);
    this.salesPageRefresh = true;
    let menu = {
      icon: "",
      pmenu: "",
      menuname: "",
      routerLink: "",
      haschildrens: false,
      tab: AllMenuTabs.sales_orders,
    };
    this.addtoTab(menu);
  }

  closeCreateorEditTab(type: any) {
    let tab: any =
      type === "create" ? AllMenuTabs.create_product : AllMenuTabs.edit_product;
    this.selectedMenuTabs = this.selectedMenuTabs.filter(
      (sT: any) => sT.id != tab
    );
    //console.log(this.selectedMenuTabs);
    this.productPageRefresh = true;
    this.salesHubTabs.next(this.selectedMenuTabs);
    let menu = {
      icon: "",
      pmenu: "",
      menuname: "",
      routerLink: "",
      haschildrens: false,
      tab: AllMenuTabs.products,
    };
    this.addtoTab(menu);
  }

  closeCreateProductTab() {
    this.selectedMenuTabs = this.selectedMenuTabs.filter(
      (sT: any) => sT.id != AllMenuTabs.create_product
    );
    //console.log(this.selectedMenuTabs);
    this.salesHubTabs.next(this.selectedMenuTabs);
    let menu = {
      icon: "",
      pmenu: "",
      menuname: "",
      routerLink: "",
      haschildrens: false,
      tab: AllMenuTabs.products,
    };
    this.addtoTab(menu);
  }

  closeCreateCreatePoTab() {
    this.selectedMenuTabs = this.selectedMenuTabs.filter(
      (sT: any) => sT.id != AllMenuTabs.create_po
    );
    //console.log(this.selectedMenuTabs);
    this.salesHubTabs.next(this.selectedMenuTabs);
    let menu = {
      icon: "",
      pmenu: "",
      menuname: "",
      routerLink: "",
      haschildrens: false,
      tab: AllMenuTabs.purchanse_orders,
    };
    this.addtoTab(menu);
  }

  closeCreateEditedPoTab() {
    this.selectedMenuTabs = this.selectedMenuTabs.filter(
      (sT: any) => sT.id != AllMenuTabs.edit_po
    );
    //console.log(this.selectedMenuTabs);
    this.salesHubTabs.next(this.selectedMenuTabs);
    let menu = {
      icon: "",
      pmenu: "",
      menuname: "",
      routerLink: "",
      haschildrens: false,
      tab: AllMenuTabs.purchanse_orders,
    };
    this.addtoTab(menu);
  }

  editormodal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  changeEditorModal(editormodal: any) {
    this.editormodal.next(editormodal);
  }

  editormodal_ip: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  changeEditorModalInput(editormodal_ip: any) {
    this.editormodal.next(editormodal_ip);
  }

  printOrdersData: any;
  changeOrderDetails(printOrdersData: any) {
    // this.printOrdersData.next(printOrdersData);
    this.printOrdersData = printOrdersData;
  }

  bundle_productDetails: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  changeBundleProductDetails(bundle_productDetails: any) {
    this.bundle_productDetails.next(bundle_productDetails);
  }

  po_details: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  changePoDetails(po_details: any) {
    this.po_details.next(po_details);
  }

  duplicateOrderDetails: BehaviorSubject<any> = new BehaviorSubject<any>(
    undefined
  );

  changeDuplicateOrderDetails(duplicateOrderDetails: any) {
    this.duplicateOrderDetails.next(duplicateOrderDetails);
  }
}
