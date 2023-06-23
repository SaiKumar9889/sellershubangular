import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Menu } from "../_models/Menu";
import { AllMenuTabs } from "../_models/Tabs";
import { Roles } from "../_models/_roles";
import { ToastTypes } from "../_models/_toaster";
import { DatasharingService } from "../_service/datasharing.service";
import { ToasterService } from "../_service/toaster.service";
// declare var $: any;
import * as $ from "jquery";
import { MatSidenav } from "@angular/material/sidenav";
@Component({
  selector: "app-leftsidemenu",
  templateUrl: "./leftsidemenu.component.html",
  styleUrls: ["./leftsidemenu.component.css"],
})
export class LeftsidemenuComponent implements OnInit, OnDestroy, AfterViewInit {
  loggedinusername: string = "venkat";
  loggedinRole: string = "";
  selectedMenuName: any;
  allMenus: Menu[] = [];
  panelOpenState = false;
  isLeftsidemenuhide: boolean = false;
  subscription: Subscription = new Subscription();
  mSubscription: Subscription = new Subscription();
  href: any;
  @ViewChild("sidenav") sidenav!: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(
    private datasharingService: DatasharingService,
    private router: Router,
    private toasterService: ToasterService
  ) {}
  ngAfterViewInit(): void {
    this.subscription = this.datasharingService.isLeftmenuhide.subscribe(
      (data) => {
        //////console.log(data);
        this.isLeftsidemenuhide = data;
      }
    );

    this.mSubscription = this.datasharingService.activeMenu.subscribe(
      (data) => {
        //////console.log(data);

        if (data != "") {
          this.selectedMenuName = data;
        }
      }
    );

    if (
      localStorage.getItem("userLoginName") === "pankaj@sellershub.io" ||
      localStorage.getItem("userLoginName") === "2617@kartzhub.com"
    ) {
      var aidash: Menu[] = [];
      if (
        localStorage.getItem("userLoginName") === "pankaj@sellershub.io" ||
        localStorage.getItem("userLoginName") === "2617@kartzhub.com"
      ) {
        aidash.push({
          icon: "left-icons-color icons-Dashboard",
          pmenu: "AI Dashboard ",
          menuname: "Users ",
          routerLink: "selleshub",
          haschildrens: false,
          tab: AllMenuTabs.ai_user_dashboard,
          isPremium: false,
          isComingSoon: false,
        });
        aidash.push({
          icon: "left-icons-color icons-Dashboard",
          pmenu: "AI Dashboard ",
          menuname: "Subscriptions ",
          routerLink: "selleshub",
          haschildrens: false,
          tab: AllMenuTabs.ai_subscription_dashboard,
          isPremium: false,
          isComingSoon: false,
        });
        aidash.push({
          icon: "left-icons-color icons-Dashboard",
          pmenu: "AI Dashboard ",
          menuname: "OrderDownloadStats ",
          routerLink: "selleshub",
          haschildrens: false,
          tab: AllMenuTabs.ai_channelorderdownloader_dashboard,
          isPremium: false,
          isComingSoon: false,
        });
        aidash.push({
          icon: "left-icons-color icons-Dashboard",
          pmenu: "AI Dashboard ",
          menuname: "SubscriptionPlans ",
          routerLink: "selleshub",
          haschildrens: false,
          tab: AllMenuTabs.ai_subscriptionplans_dashboard,
          isPremium: false,
          isComingSoon: false,
        });
      }
      this.allMenus.push({
        icon: "left-icons-color icons-Dashboard",
        pmenu: "AI Dashboard",
        menuname: "AI Dashboards",
        routerLink: "selleshub",
        haschildrens: true,
        tab: AllMenuTabs.dashboard,
        chaildrens: aidash,
        isPremium: true,
        isComingSoon: false,
      });
    } else {
      this.allMenus.push({
        icon: "left-icons-color icons-Dashboard",
        pmenu: "Dashboard",
        menuname: "Dashboard",
        routerLink: "selleshub",
        haschildrens: false,
        tab: AllMenuTabs.dashboard,
        isPremium: false,
        isComingSoon: false,
      });

      var aidash: Menu[] = [];
      aidash.push({
        icon: "left-icons-color icons-Dashboard",
        pmenu: "AI Dashboard ",
        menuname: "Orders ",
        routerLink: "selleshub",
        haschildrens: false,
        tab: AllMenuTabs.ai_dashboard,
        isPremium: false,
        isComingSoon: false,
      });
      aidash.push({
        icon: "left-icons-color icons-Dashboard",
        pmenu: "AI Dashboard ",
        menuname: "Products ",
        routerLink: "selleshub",
        haschildrens: false,
        tab: AllMenuTabs.ai_product_dashboard,
        isPremium: false,
        isComingSoon: false,
      });
      if (
        localStorage.getItem("userLoginName") === "pankaj@sellershub.io" ||
        localStorage.getItem("userLoginName") === "2617@kartzhub.com"
      ) {
        aidash.push({
          icon: "left-icons-color icons-Dashboard",
          pmenu: "AI Dashboard ",
          menuname: "Users ",
          routerLink: "selleshub",
          haschildrens: false,
          tab: AllMenuTabs.ai_user_dashboard,
          isPremium: false,
          isComingSoon: false,
        });
        aidash.push({
          icon: "left-icons-color icons-Dashboard",
          pmenu: "AI Dashboard ",
          menuname: "Subscriptions ",
          routerLink: "selleshub",
          haschildrens: false,
          tab: AllMenuTabs.ai_subscription_dashboard,
          isPremium: false,
          isComingSoon: false,
        });
        aidash.push({
          icon: "left-icons-color icons-Dashboard",
          pmenu: "AI Dashboard ",
          menuname: "OrderDownloadStats ",
          routerLink: "selleshub",
          haschildrens: false,
          tab: AllMenuTabs.ai_channelorderdownloader_dashboard,
          isPremium: false,
          isComingSoon: false,
        });
        aidash.push({
          icon: "left-icons-color icons-Dashboard",
          pmenu: "AI Dashboard ",
          menuname: "SubscriptionPlans ",
          routerLink: "selleshub",
          haschildrens: false,
          tab: AllMenuTabs.ai_subscriptionplans_dashboard,
          isPremium: false,
          isComingSoon: false,
        });
      }
      this.allMenus.push({
        icon: "left-icons-color icons-Dashboard",
        pmenu: "AI Dashboard",
        menuname: "AI Dashboards",
        routerLink: "selleshub",
        haschildrens: true,
        tab: AllMenuTabs.dashboard,
        chaildrens: aidash,
        isPremium: true,
        isComingSoon: false,
      });

      var reports: Menu[] = [];
      reports.push({
        icon: "",
        pmenu: "Reports",
        menuname: "Sales By Product",
        routerLink: "/selleshub",
        haschildrens: false,
        tab: AllMenuTabs.sales_by_prod,
        isPremium: false,
        isComingSoon: false,
      });
      reports.push({
        icon: "",
        pmenu: "Reports",
        menuname: "Low Stock",
        routerLink: "/selleshub",
        haschildrens: false,
        tab: AllMenuTabs.low_stock,
        isPremium: false,
        isComingSoon: false,
      });
      reports.push({
        icon: "",
        pmenu: "Reports",
        menuname: "Stock value Report",
        routerLink: "/selleshub",
        haschildrens: false,
        tab: AllMenuTabs.stock_value_repo,
        isPremium: false,
        isComingSoon: false,
      });
      reports.push({
        icon: "",
        pmenu: "Reports",
        menuname: "Order History",
        routerLink: "/selleshub",
        haschildrens: false,
        tab: AllMenuTabs.order_history,
        isPremium: false,
        isComingSoon: false,
      });
      this.allMenus.push({
        icon: "left-icons-color icons-Bar-Chart",
        pmenu: "Reports",
        menuname: "Reports",
        routerLink: "/selleshub",
        haschildrens: true,
        chaildrens: reports,
        isPremium: false,
        isComingSoon: false,
      });

      var orders: Menu[] = [];
      orders.push({
        icon: "",
        pmenu: "Orders",
        menuname: "Orders Summary",
        routerLink: "/selleshub",
        haschildrens: false,
        tab: AllMenuTabs.order_summary,
        isPremium: false,
        isComingSoon: false,
      });
      orders.push({
        icon: "",
        pmenu: "Orders",
        menuname: "Sales Orders",
        routerLink: "/selleshub",
        haschildrens: false,
        tab: AllMenuTabs.sales_orders,
        isPremium: false,
        isComingSoon: false,
      });
      orders.push({
        icon: "",
        pmenu: "Orders",
        menuname: "Click and Collect",
        routerLink: "/selleshub",
        haschildrens: false,
        tab: AllMenuTabs.click_collect,
        isPremium: false,
        isComingSoon: false,
        isBeta: true,
      });
      orders.push({
        icon: "",
        pmenu: "Orders",
        menuname: "Ready To Shipment",
        routerLink: "/selleshub",
        haschildrens: false,
        tab: AllMenuTabs.ready_to_shipment,
        isPremium: false,
        isComingSoon: false,
      });
      orders.push({
        icon: "",
        pmenu: "Orders",
        menuname: "Error Labels",
        routerLink: "/selleshub",
        haschildrens: false,
        tab: AllMenuTabs.error_labels,
        isPremium: false,
        isComingSoon: false,
      });
      orders.push({
        icon: "",
        pmenu: "Orders",
        menuname: "FBA Orders",
        routerLink: "/selleshub",
        haschildrens: false,
        tab: AllMenuTabs.mcf_Orders,
        isPremium: false,
        isComingSoon: false,
      });
      orders.push({
        icon: "",
        pmenu: "Orders",
        menuname: "Shipped Orders",
        routerLink: "/selleshub",
        haschildrens: false,
        tab: AllMenuTabs.shipped_Orders,
        isPremium: false,
        isComingSoon: false,
      });
      orders.push({
        icon: "",
        pmenu: "Orders",
        menuname: "Returned orders",
        routerLink: "/selleshub",
        haschildrens: false,
        tab: AllMenuTabs.return_orders,
        isPremium: false,
        isComingSoon: false,
      });
      orders.push({
        icon: "",
        pmenu: "Orders",
        menuname: "Cancelled Orders",
        routerLink: "/selleshub",
        haschildrens: false,
        tab: AllMenuTabs.cancelled_Orders,
        isPremium: false,
        isComingSoon: false,
      });
      // orders.push({ icon: '', pmenu: 'Orders', menuname: 'Manage Returns', routerLink: '/selleshub', haschildrens: false,tab:AllMenuTabs.mange_Orders });

      this.allMenus.push({
        icon: "left-icons-color icons-Add-Cart",
        pmenu: "Orders",
        menuname: "Orders",
        routerLink: "/orders",
        haschildrens: true,
        chaildrens: orders,
        isPremium: false,
        isComingSoon: false,
      });

      var inventory: Menu[] = [];
      inventory.push({
        icon: "",
        pmenu: "Inventory",
        menuname: "Products",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.products,
        isPremium: false,
        isComingSoon: false,
      });
      inventory.push({
        icon: "",
        pmenu: "Inventory",
        menuname: "Categories",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.category,
        isPremium: false,
        isComingSoon: false,
      });
      inventory.push({
        icon: "",
        pmenu: "Inventory",
        menuname: "Channel Products",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.channel_products,
        isPremium: false,
        isComingSoon: false,
      });
      inventory.push({
        icon: "",
        pmenu: "Inventory",
        menuname: "Stock View",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.stock_view,
        isPremium: false,
        isComingSoon: false,
      });
      inventory.push({
        icon: "",
        pmenu: "Inventory",
        menuname: "Purchase Orders",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.purchanse_orders,
        isPremium: false,
        isComingSoon: false,
      });

      this.allMenus.push({
        icon: "left-icons-color icons-Folder-Bookmark",
        pmenu: "Inventory",
        menuname: "Inventory",
        routerLink: "",
        haschildrens: true,
        chaildrens: inventory,
        isPremium: false,
        isComingSoon: false,
      });

      var listing: Menu[] = [];
      listing.push({
        icon: "",
        pmenu: "Listings",
        menuname: "Waiting to List ",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.waiting_to_list,
        isPremium: false,
        isComingSoon: false,
      });
      listing.push({
        icon: "",
        pmenu: "Listings",
        menuname: "Listing Errors",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.list_errors,
        isPremium: false,
        isComingSoon: false,
      });
      listing.push({
        icon: "",
        pmenu: "Listings",
        menuname: "Listed Products",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.listed_products,
        isPremium: false,
        isComingSoon: false,
      });
      listing.push({
        icon: "",
        pmenu: "Listings",
        menuname: "Closed Products ",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.closed_products,
        isPremium: false,
        isComingSoon: false,
      });
      // listing.push({ icon: '', pmenu: 'Listings', menuname: 'Channel Scheduled Listing ', routerLink: '', haschildrens: false,tab:AllMenuTabs.channel_sceduled_listing  });
      listing.push({
        icon: "",
        pmenu: "Listings",
        menuname: "Manage FBA",
        routerLink: "",
        haschildrens: false,
        isPremium: false,
        isComingSoon: false,
      });
      listing.push({
        icon: "",
        pmenu: "Listings",
        menuname: "Send Products to FBA",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.create_products_to_fba,
        isPremium: false,
        isComingSoon: false,
      });
      // listing.push({ icon: '', pmenu: 'Listings', menuname: 'Send Products to FBA', routerLink: '', haschildrens: false,tab:AllMenuTabs.send_products_to_fba  });
      listing.push({
        icon: "",
        pmenu: "Listings",
        menuname: "Products in FBA",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.products_in_fba,
        isPremium: false,
        isComingSoon: false,
      });

      var fba: Menu[] = [];

      this.allMenus.push({
        icon: "left-icons-color icons-Bulleted-List",
        pmenu: "Listings",
        menuname: "Listings",
        routerLink: "",
        haschildrens: true,
        chaildrens: listing,
      });

      var warehouse: Menu[] = [];
      warehouse.push({
        icon: "",
        pmenu: "Warehouse Management",
        menuname: "WareHouses ",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.wareHouses,
      });
      warehouse.push({
        icon: "",
        pmenu: "Warehouse Management",
        menuname: "Stock Summary ",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.stocksummary,
      });
      warehouse.push({
        icon: "",
        pmenu: "Warehouse Management",
        menuname: "Stock Transfers ",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.transfers,
      });
      warehouse.push({
        icon: "",
        pmenu: "Suppliers",
        menuname: "Suppliers",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.suppliers,
      });

      this.allMenus.push({
        icon: "left-icons-color icons-Warehouse",
        pmenu: "Warehouse Management",
        menuname: "Warehouse Management",
        routerLink: "",
        haschildrens: true,
        chaildrens: warehouse,
        isPremium: false,
        isComingSoon: false,
      });
      this.allMenus.push({
        icon: "left-icons-color icons-Add-UserStar",
        pmenu: "Customers",
        menuname: "Customers",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.customers,
        isPremium: false,
        isComingSoon: false,
      });

      // var settings: Menu[] = [];
      // settings.push({ icon: '', pmenu: 'Settings', menuname: 'General Settings', routerLink: '', haschildrens: false ,tab:AllMenuTabs.user_settings  });
      // settings.push({ icon: '', pmenu: 'Settings', menuname: 'BUlk Actions', routerLink: '', haschildrens: false,tab:AllMenuTabs.bulk_actions  });
      // settings.push({ icon: '', pmenu: 'Settings', menuname: 'Barcode Management', routerLink: '', haschildrens: false,tab:AllMenuTabs.barcode_management  });
      // settings.push({ icon: '', pmenu: 'Settings', menuname: 'Inventory Syncronize', routerLink: '', haschildrens: false,tab:AllMenuTabs.inventory_Sync  });
      // settings.push({ icon: '', pmenu: 'Settings', menuname: 'Shipping Rules', routerLink: '', haschildrens: false,tab:AllMenuTabs.shipping_rules  });

      this.allMenus.push({
        icon: " left-icons-color icons-Gear",
        pmenu: "Settings",
        menuname: "Settings",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.user_settings,
        isPremium: false,
        isComingSoon: false,
      });
      var shipping: Menu[] = [];
      // shipping.push({ icon: '', pmenu: 'Shipping', menuname: 'Integrations', routerLink: '', haschildrens: false, tab: AllMenuTabs.shipping_integration });
      shipping.push({
        icon: "",
        pmenu: "Shipping",
        menuname: "Shipping Courier Setup",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.shipping_courier_setup,
        isPremium: false,
        isComingSoon: false,
      });
      shipping.push({
        icon: "",
        pmenu: "Shipping",
        menuname: "Shipping manifests",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.shipping_manifests,
      });
      shipping.push({
        icon: "",
        pmenu: "Shipping",
        menuname: "Filed manifests",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.filed_manifests,
      });

      this.allMenus.push({
        icon: "left-icons-color icons-Add-Cart",
        pmenu: "Shipping",
        menuname: "Shipping",
        routerLink: "",
        haschildrens: true,
        chaildrens: shipping,
        isPremium: false,
        isComingSoon: false,
      });
      var integrations: Menu[] = [];
      integrations.push({
        icon: "",
        pmenu: "Integration",
        menuname: "Channel Integration",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.channel_integration,
        isPremium: false,
        isComingSoon: false,
      });

      integrations.push({
        icon: "",
        pmenu: "Integration",
        menuname: "Accounting",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.accounting_info,
        isPremium: false,
        isComingSoon: false,
      });

      this.allMenus.push({
        icon: "left-icons-color icons-Wrench",
        pmenu: "Integration",
        menuname: "Integration",
        routerLink: "",
        haschildrens: true,
        chaildrens: integrations,
        isPremium: false,
        isComingSoon: false,
      });
      this.allMenus.push({
        icon: "left-icons-color icons-File-HTML",
        pmenu: "Template designer ",
        menuname: "Template designer",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.template_desines,
        isPremium: false,
        isComingSoon: false,
      });
      // this.allMenus.push({ icon: 'left-icons-color icons-Testimonal', pmenu: 'Beta Test', menuname: 'Beta Test', routerLink: '', haschildrens: false });

      this.allMenus.push({
        icon: "left-icons-color icons-Testimonal",
        pmenu: "Automations",
        menuname: "Automations",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.automations,
        isPremium: false,
        isComingSoon: false,
      });
      // this.allMenus.push({ icon: 'left-icons-color icons-Testimonal', pmenu: 'amazon_stock_repricer', menuname: 'Amazon Stock Repricer', routerLink: '', haschildrens: false, tab: AllMenuTabs.amazon_stock_repricer, isPremium: false, isComingSoon: true });
      this.allMenus.push({
        icon: "left-icons-color icons-Testimonal",
        pmenu: "customer_replies",
        menuname: "Customer Replies",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.customer_replies,
        isPremium: false,
        isComingSoon: false,
        isBeta: true,
      });
      this.allMenus.push({
        icon: "left-icons-color icons-Testimonal",
        pmenu: "fba_calculator",
        menuname: "Profit Calculator",
        routerLink: "",
        haschildrens: false,
        tab: AllMenuTabs.fba_calculator,
        isPremium: false,
        isComingSoon: false,
        isBeta: true,
      });

      // var stkreprices: Menu[] = [];
      //stkreprices.push({ icon: '', pmenu: 'Amazon Stock Repricer', menuname: 'Repricing Items', routerLink: '', haschildrens: false, tab: AllMenuTabs.amazon_stock_repricer });
      //stkreprices.push({ icon: '', pmenu: 'Amazon Stock Repricer', menuname: 'Settings', routerLink: '', haschildrens: false, tab: AllMenuTabs.repricing_settings });

      // this.allMenus.push({ icon: 'ti-shopping-cart', pmenu: 'Amazon Stock Repricer', menuname: 'Amazon Stock Repricer', routerLink: '', haschildrens: true, chaildrens: stkreprices, tab: AllMenuTabs.amazon_stock_repricer });
      // this.allMenus.push({ icon: 'left-icons-color icons-Testimonal', pmenu: 'Automations', menuname: 'Automations', routerLink: '', haschildrens: false });
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.mSubscription.unsubscribe();
  }

  status: any;
  ngOnInit(): void {
    // ////console.log(this.router.url);
    this.status = localStorage.getItem("userSubscribe");
    if (
      this.status == "ACTIVE" ||
      this.status == "active" ||
      this.status == "Active"
    ) {
      this.datasharingService.addtoTab({
        icon: "left-icons-color icons-Dashboard",
        pmenu: "Dashboard",
        menuname: "Dashboard",
        routerLink: "selleshub",
        haschildrens: false,
        tab: AllMenuTabs.dashboard,
        isPremium: false,
        isComingSoon: false,
      });
    } else if (this.status == "End Of Trial" || this.status == "Cancelled") {
      this.datasharingService.addtoTab({
        icon: "",
        pmenu: "Subscription",
        menuname: "Subscription",
        routerLink: "selleshub",
        haschildrens: false,
        tab: AllMenuTabs.suscrption,
        isPremium: false,
        isComingSoon: false,
      });
      this.toasterService.openToastMessage(
        ToastTypes.warning,
        "User",
        "Please Subscribe"
      );
    }
    //  this.datasharingService.addtoTab({ icon: '', pmenu: 'Orders', menuname: 'Sales Orders', routerLink: '/selleshub', haschildrens: false ,tab:AllMenuTabs.sales_orders});
    let mn = this.allMenus.filter((m) => m.routerLink == this.router.url);
    ////console.log(mn);
    if (mn) {
      this.allMenus.forEach((mn) => {
        if (mn.haschildrens) {
          mn.chaildrens?.forEach((ch) => {
            if (ch.routerLink == this.router.url) {
              this.selectedMenuName = ch.pmenu;
            }
          });
        }
      });
    }
    this.loadSideNavbarJs();
  }
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  //   Side Nav Bar JS Functionality
  loadSideNavbarJs() {
    $(() => {
      var url = window.location;
      var element = $("ul#sidebarnav a")
        .filter(() => {
          return this.href == url;
        })
        .addClass("active")
        .parent()
        .addClass("active");
      while (true) {
        if (element.is("li")) {
          element = element
            .parent()
            .addClass("in")
            .parent()
            .addClass("active")
            .children("a")
            .addClass("active");
        } else {
          break;
        }
      }
      $("#sidebarnav a").on("click", (e: any) => {
        if (!$(this).hasClass("active")) {
          // hide any open menus and remove all other classes
          $("ul", $(this).parents("ul:first")).removeClass("in");
          $("a", $(this).parents("ul:first")).removeClass("active");
          // $(this).parents("ul:first").find('ul').removeClass("in");
          // $(this).parents("ul:first").find('a').removeClass("active");

          // open our new menu and add the open class
          $(this).next("ul").addClass("in");
          $(this).addClass("active");
        } else if ($(this).hasClass("active")) {
          $(this).removeClass("active");
          $(this).parents("ul:first").removeClass("active");
          $(this).next("ul").removeClass("in");
        }
      });
      $("#sidebarnav >li >a.has-arrow").on("click", function (e: any) {
        e.preventDefault();
      });

      // $(".scroll-sidebar").perfectScrollbar();

      // const ps = new PerfectScrollbar('#container');
    });
  }

  setMenuName(mName: Menu) {
    if (mName.pmenu == "Beta Test") {
      this.router.navigate(["/rep/template"]);
    } else {
      this.router.navigate(["/sellershub"]);
      if (
        this.status == "ACTIVE" ||
        this.status == "active" ||
        this.status == "Active"
      ) {
        this.selectedMenuName = mName.pmenu;

        this.datasharingService.addtoTab(mName);
      }
      // let roles =  JSON.parse(localStorage.getItem("userRoles"));
      // if(roles){
      //   roles= roles.roles;
      // }
      // this.selectedMenuName = mName.pmenu;
      // if(roles && roles.length > 0 && roles != "null" ){
      //   let status = false;
      //   if(roles.filter(i => i.role == Roles.ADMIN)[0].enable){
      //     status = true;
      //   } else {
      //     switch (mName.pmenu) {
      //       case 'Reports':
      //           if(roles.filter(i => i.role == Roles.REPORTS)[0].enable){
      //             status = true;
      //           }
      //         break;
      //       case 'Dashboard':
      //         if(roles.filter(i => i.role == Roles.DASHBOARD)[0].enable){
      //           status = true;
      //         }
      //         break;
      //       case 'Orders':
      //         if(roles.filter(i => i.role == Roles.ORDER)[0].enable){
      //           status = true;
      //         }
      //         break;
      //       case 'Inventory':
      //         if(roles.filter(i => i.role == Roles.INVENTORY)[0].enable){
      //           status = true;
      //         }
      //         break;
      //       case 'Listings':
      //           status = true;
      //         break;
      //       case 'Suppliers':
      //           status = true;
      //         break;
      //       case 'Warehouse Management':
      //           status = true;
      //         break;
      //       case 'Customers':
      //         if(roles.filter(i => i.role == Roles.CUSTOMER)[0].enable){
      //           status = true;
      //         }
      //         break;
      //       case 'Settings':
      //       case 'Integration':
      //       case 'Template designer ':
      //       case 'Automations':
      //           status = true;
      //         break;
      //       default:
      //         break;
      //     }
      //   }

      //   if(!status){
      //     this.toasterService.openToastMessage(ToastTypes.error, 'Unauthorised', 'You are not authorised to access this area, Please speak to your admin access representative.');
      //   } else {
      //     this.datasharingService.addtoTab(mName);
      //   }
      // } else {
      //   this.datasharingService.addtoTab(mName);
      // }
    }
  }
  getFontclass() {
    if (!this.isLeftsidemenuhide) {
      return "font-white";
    } else {
      return "font-blue";
    }
  }
}
