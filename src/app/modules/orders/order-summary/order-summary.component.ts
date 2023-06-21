import { Component, OnInit } from '@angular/core';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { ToastTypes } from 'src/app/_models/_toaster';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { OrderSummaryService } from '../services/order-summary.service';
declare var $: any;

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  loading: boolean = false;
  constructor(private appTrackingService: AppTrackingService, private toasterService: ToasterService, private orderSummaryService: OrderSummaryService) {
    let ip: usertrackInput = { menu: TrackMenus.ORDERS, submenu: subMenus.ORDERSSUMMARY, page: pages.ORDERSSUMMARYPAGE, function: "", descrption: "Order summary page loaded" };
    this.appTrackingService.trackUserActivity(ip);
  }
  allOrders: any = [];
  ngOnInit(): void {
    this.getProducts();
  }
  loadTablePagenation() {
    $(function () {
      // $('#printabletable').DataTable();
      $('#printabletable').DataTable({
        responsive: true,
        fixedHeader: true,
        pagingType: "simple_numbers",
        pageLength: 10,
        lengthChange: true,
        dom: 'Bfrtip',
        buttons: [
          'copy', 'csv', 'pdf', 'print'
        ],
        columnDefs: [
          {
            "targets": 2, // your case first column
            "className": "text-center"
          },
          {
            "targets": 3, // your case first column
            "className": "text-center"
          }
        ]
      });
      $('.buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel').addClass('btn btn-primary mr-1');
    });
  }
  ebaydraftTotal: any = 0;
  ebaycancTotal: any = 0;
  ebayshipTotal: any = 0;
  ebayunshipTotal: any = 0;
  ebaypendingTotal: any = 0;
  ebayPartiallyShipped: any = 0;
  amazondraftTotal: any = 0;
  amazoncancTotal: any = 0;
  amazonshipTotal: any = 0;
  amazonunshipTotal: any = 0;
  amazonpendingTotal: any = 0;
  amazonPartiallyShipped: any = 0;
  telesaledraftTotal: any = 0;
  telesalecancTotal: any = 0;
  telesaleshipTotal: any = 0;
  telesaleunshipTotal: any = 0;
  telesalependingTotal: any = 0;
  telesalePartiallyShipped: any = 0;
  prestadraftTotal: any = 0;
  prestacancTotal: any = 0;
  prestashipTotal: any = 0;
  prestaunshipTotal: any = 0;
  prestapendingTotal: any = 0;
  prestaPartiallyShipped: any = 0;
  shopifydraftTotal: any = 0;
  shopifycancTotal: any = 0;
  shopifyshipTotal: any = 0;
  shopifyunshipTotal: any = 0;
  shopifypendingTotal: any = 0;
  shopifyPartiallyShipped: any = 0;
  magentodraftTotal: any = 0;
  magentocancTotal: any = 0;
  magentoshipTotal: any = 0;
  magentounshipTotal: any = 0;
  magentopendingTotal: any = 0;
  magentoPartiallyShipped: any = 0;
  ebayOrders: any;
  amazonOrders: any;
  telesaleOrders: any;
  prestaOrders: any;
  shopifyOrders: any;
  magentoOrders: any;
  unique = [];
  getProducts() {
    this.loading = true;
    $('#printabletable').DataTable().destroy();
    this.orderSummaryService.getOrderSummary().subscribe((res: any) => {
      ////console.log(res);
      this.allOrders = res;
      let type:any = [];
     this.allOrders.forEach(s => type.push(s.channelType))
     
        type.forEach(element => {
            if (!this.unique.includes(element)) {
                this.unique.push(element);
            }
          })
      this.ebayOrders = this.allOrders.filter(s => s.channelType == "EBAY");
      this.amazonOrders = this.allOrders.filter(s => s.channelType == "AMAZON");
      this.telesaleOrders = this.allOrders.filter(s => s.channelType == "TELESALE");
      this.prestaOrders = this.allOrders.filter(s => s.channelType == "PRESTASHOP");
      this.shopifyOrders = this.allOrders.filter(s => s.channelType == "SHOPIFY");
      this.magentoOrders = this.allOrders.filter(s => s.channelType == "MAGENTO2");
      let ebaydraft: any = [], ebaydraftcount: any,
        ebaycancelled: any = [], ebaycancelcount: any,
        ebayshipped: any = [], ebayshipcount: any,
        ebayunshipped: any = [], ebayunshipcount: any,
        ebaypending: any = [], ebaypendingcount: any,
        ebayPartiallyShipped: any = [], ebayPartiallyShippedcount: any,
        amazondraft: any = [], amazondraftcount: any,
        amazoncancelled: any = [], amazoncancelcount: any,
        amazonshipped: any = [], amazonshipcount: any,
        amazonunshipped: any = [], amazonunshipcount: any,
        amazonpending: any = [], amazonpendingcount: any,
        amazonPartiallyShipped: any = [], amazonPartiallyShippedcount: any,
        telesaledraft: any = [], telesaledraftcount: any,
        telesalecancelled: any = [], telesalecancelcount: any,
        telesaleshipped: any = [], telesaleshipcount: any,
        telesaleunshipped: any = [], telesaleunshipcount: any,
        telesalepending: any = [], telesalependingcount: any,
        telesalePartiallyShipped: any = [], telesalePartiallyShippedcount: any,
        prestadraft: any = [], prestadraftcount: any,
        prestacancelled: any = [], prestacancelcount: any,
        prestashipped: any = [], prestashipcount: any,
        prestaunshipped: any = [], prestaunshipcount: any,
        prestapending: any = [], prestapendingcount: any,
        prestaPartiallyShipped: any = [], prestaPartiallyShippedcount: any,
        shopifydraft: any = [], shopifydraftcount: any,
        shopifycancelled: any = [], shopifycancelcount: any,
        shopifyshipped: any = [], shopifyshipcount: any,
        shopifyunshipped: any = [], shopifyunshipcount: any,
        shopifypending: any = [], shopifypendingcount: any,
        shopifyPartiallyShipped: any = [], shopifyPartiallyShippedcount: any,
        magentodraft: any = [], magentodraftcount: any,
        magentocancelled: any = [], magentocancelcount: any,
        magentoshipped: any = [], magentoshipcount: any,
        magentounshipped: any = [], magentounshipcount: any,
        magentopending: any = [], magentopendingcount: any,
        magentoPartiallyShipped: any = [], magentoPartiallyShippedcount: any;
      ebaydraft = this.ebayOrders.filter(s => s.status == "Draft")
      ebaycancelled = this.ebayOrders.filter(s => s.status == "Canceled")
      ebayshipped = this.ebayOrders.filter(s => s.status == "Shipped")
      ebayunshipped = this.ebayOrders.filter(s => s.status == "Unshipped")
      ebaypending = this.ebayOrders.filter(s => s.status == "Pending")
      ebayPartiallyShipped = this.ebayOrders.filter(s => s.status == "PartiallyShipped")
      ebaydraft.forEach(element => {
        ebaydraftcount = +(element.count);
        this.ebaydraftTotal += (ebaydraftcount)
      });
      ebaycancelled.forEach(element => {
        ebaycancelcount = +(element.count);
        this.ebaycancTotal += (ebaycancelcount)
      });
      ebayshipped.forEach(element => {
        ebayshipcount = +(element.count);
        this.ebayshipTotal += (ebayshipcount)
      });
      ebayunshipped.forEach(element => {
        ebayunshipcount = +(element.count);
        this.ebayunshipTotal += (ebayunshipcount)
      });
      ebaypending.forEach(element => {
        ebaypendingcount = +(element.count);
        this.ebaypendingTotal += (ebaypendingcount)
      });
      ebayPartiallyShipped.forEach(element => {
        ebayPartiallyShippedcount = +(element.count);
        this.ebayPartiallyShipped += (ebayPartiallyShippedcount)
      });
      amazondraft = this.amazonOrders.filter(s => s.status == "Draft")
      amazoncancelled = this.amazonOrders.filter(s => s.status == "Canceled")
      amazonshipped = this.amazonOrders.filter(s => s.status == "Shipped")
      amazonunshipped = this.amazonOrders.filter(s => s.status == "Unshipped")
      amazonpending = this.amazonOrders.filter(s => s.status == "Pending")
      amazonPartiallyShipped = this.amazonOrders.filter(s => s.status == "PartiallyShipped")
      amazondraft.forEach(element => {
        amazondraftcount = +(element.count);
        this.amazondraftTotal += (amazondraftcount)
      });
      amazoncancelled.forEach(element => {
        amazoncancelcount = +(element.count);
        this.amazoncancTotal += (amazoncancelcount)
      });
      amazonshipped.forEach(element => {
        amazonshipcount = +(element.count);
        this.amazonshipTotal += (amazonshipcount)
      });
      amazonunshipped.forEach(element => {
        amazonunshipcount = +(element.count);
        this.amazonunshipTotal += (amazonunshipcount)
      });
      amazonpending.forEach(element => {
        amazonpendingcount = +(element.count);
        this.amazonpendingTotal += (amazonpendingcount)
      });
      amazonPartiallyShipped.forEach(element => {
        amazonPartiallyShippedcount = +(element.count);
        this.amazonPartiallyShipped += (amazonPartiallyShippedcount)
      });
      prestadraft = this.prestaOrders.filter(s => s.status == "Draft")
      prestacancelled = this.prestaOrders.filter(s => s.status == "Canceled")
      prestashipped = this.prestaOrders.filter(s => s.status == "Shipped")
      prestaunshipped = this.prestaOrders.filter(s => s.status == "Unshipped")
      prestapending = this.prestaOrders.filter(s => s.status == "Pending")
      prestaPartiallyShipped = this.prestaOrders.filter(s => s.status == "PartiallyShipped")
      prestadraft.forEach(element => {
        prestadraftcount = +(element.count);
        this.prestadraftTotal += (prestadraftcount)
      });
      prestacancelled.forEach(element => {
        prestacancelcount = +(element.count);
        this.prestacancTotal += (prestacancelcount)
      });
      prestashipped.forEach(element => {
        prestashipcount = +(element.count);
        this.prestashipTotal += (prestashipcount)
      });
      prestaunshipped.forEach(element => {
        prestaunshipcount = +(element.count);
        this.prestaunshipTotal += (prestaunshipcount)
      });
      prestapending.forEach(element => {
        prestapendingcount = +(element.count);
        this.prestapendingTotal += (prestapendingcount)
      });
      prestaPartiallyShipped.forEach(element => {
        prestaPartiallyShippedcount = +(element.count);
        this.prestaPartiallyShipped += (prestaPartiallyShippedcount)
      });
      telesaledraft = this.telesaleOrders.filter(s => s.status == "Draft")
      telesalecancelled = this.telesaleOrders.filter(s => s.status == "Canceled")
      telesaleshipped = this.telesaleOrders.filter(s => s.status == "Shipped")
      telesaleunshipped = this.telesaleOrders.filter(s => s.status == "Unshipped")
      telesalepending = this.telesaleOrders.filter(s => s.status == "Pending")
      telesalePartiallyShipped = this.telesaleOrders.filter(s => s.status == "PartiallyShipped")
      telesaledraft.forEach(element => {
        telesaledraftcount = +(element.count);
        this.telesaledraftTotal += (telesaledraftcount)
      });
      telesalecancelled.forEach(element => {
        telesalecancelcount = +(element.count);
        this.telesalecancTotal += (telesalecancelcount)
      });
      telesaleshipped.forEach(element => {
        telesaleshipcount = +(element.count);
        this.telesaleshipTotal += (telesaleshipcount)
      });
      telesaleunshipped.forEach(element => {
        telesaleunshipcount = +(element.count);
        this.telesaleunshipTotal += (telesaleunshipcount)
      });
      telesalepending.forEach(element => {
        telesalependingcount = +(element.count);
        this.telesalependingTotal += (telesalependingcount)
      });
      telesalePartiallyShipped.forEach(element => {
        telesalePartiallyShippedcount = +(element.count);
        this.telesalePartiallyShipped += (telesalePartiallyShippedcount)
      });
      shopifydraft = this.shopifyOrders.filter(s => s.status == "Draft")
      shopifycancelled = this.shopifyOrders.filter(s => s.status == "Canceled")
      shopifyshipped = this.shopifyOrders.filter(s => s.status == "Shipped")
      shopifyunshipped = this.shopifyOrders.filter(s => s.status == "Unshipped")
      shopifypending = this.shopifyOrders.filter(s => s.status == "Pending")
      shopifyPartiallyShipped = this.shopifyOrders.filter(s => s.status == "PartiallyShipped")
      shopifydraft.forEach(element => {
        shopifydraftcount = +(element.count);
        this.shopifydraftTotal += (shopifydraftcount)
      });
      shopifycancelled.forEach(element => {
        shopifycancelcount = +(element.count);
        this.shopifycancTotal += (shopifycancelcount)
      });
      shopifyshipped.forEach(element => {
        shopifyshipcount = +(element.count);
        this.shopifyshipTotal += (shopifyshipcount)
      });
      shopifyunshipped.forEach(element => {
        shopifyunshipcount = +(element.count);
        this.shopifyunshipTotal += (shopifyunshipcount)
      });
      shopifypending.forEach(element => {
        shopifypendingcount = +(element.count);
        this.shopifypendingTotal += (shopifypendingcount)
      });
      shopifyPartiallyShipped.forEach(element => {
        shopifyPartiallyShippedcount = +(element.count);
        this.shopifyPartiallyShipped += (shopifyPartiallyShippedcount)
      });
      magentodraft = this.magentoOrders.filter(s => s.status == "Draft")
      magentocancelled = this.magentoOrders.filter(s => s.status == "Canceled")
      magentoshipped = this.magentoOrders.filter(s => s.status == "Shipped")
      magentounshipped = this.magentoOrders.filter(s => s.status == "Unshipped")
      magentopending = this.magentoOrders.filter(s => s.status == "Pending")
      magentoPartiallyShipped = this.magentoOrders.filter(s => s.status == "PartiallyShipped")
      magentodraft.forEach(element => {
        magentodraftcount = +(element.count);
        this.magentodraftTotal += (magentodraftcount)
      });
      magentocancelled.forEach(element => {
        magentocancelcount = +(element.count);
        this.magentocancTotal += (magentocancelcount)
      });
      magentoshipped.forEach(element => {
        magentoshipcount = +(element.count);
        this.magentoshipTotal += (magentoshipcount)
      });
      magentounshipped.forEach(element => {
        magentounshipcount = +(element.count);
        this.magentounshipTotal += (magentounshipcount)
      });
      magentopending.forEach(element => {
        magentopendingcount = +(element.count);
        this.magentopendingTotal += (magentopendingcount)
      });
      magentoPartiallyShipped.forEach(element => {
        magentoPartiallyShippedcount = +(element.count);
        this.magentoPartiallyShipped += (magentoPartiallyShippedcount)
      });
      // this.collectionsize = res?.page?.totalResults;
      // this.page = res?.page?.currentPageNumber;
      this.loading = false;
      // if(this.allOrders.length>0)
      // this.productTitle= this.allOrders[0].title;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      this.loadTablePagenation();
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };


}
