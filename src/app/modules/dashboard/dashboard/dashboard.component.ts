import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
declare var $: any;
import { Chart } from 'chart.js';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { ToastTypes } from 'src/app/_models/_toaster';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { ManageUsersService } from '../../user-manage/services/manage-users.service';
import { DashboardService } from '../services/dashboard.service';
declare var Morris: any;
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { OrderSummaryService } from '../../orders/services/order-summary.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  allOrders: any = [];
  @Input() plandetails: any;
  @Output() paymentStatus = new EventEmitter<any>();;
  planid: any;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: 'Poppins',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en-GB'
  };

  stripeTest: FormGroup;
  canvas: any;
  ctx: any;
  revenue = 0;
  salesorders = 0;
  lowstock = 0;
  unitsslod = 0;

  recentOrders: any = [];
  lowStockProducts: any = [];
  loading: boolean = false;
  allSubscriptions: any = []; customerSubscriptions: any = []; selectedSubscriptionIndex = -1;
  expiringDays: any = ''; date: any = new Date();
  constructor(private appTrackingService: AppTrackingService, private dashboardService: DashboardService, private datasharingService: DatasharingService, private userService: ManageUsersService, private toasterService: ToasterService, private fb: FormBuilder, private stripeService: StripeService, private orderSummaryService: OrderSummaryService) {
    let ip: usertrackInput = { menu: TrackMenus.DASHBOARD, submenu: subMenus.OTHERS, page: pages.DASHBOARDPAGE, function: "", descrption: "Dashboard page loaded" };
    this.appTrackingService.trackUserActivity(ip);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.plandetails);
    this.planid = this.plandetails?.subscription?.subscriptionid;
    let price = this.plandetails?.priceWithTaxOnly;
    this.stripeTest?.controls['amount'].setValue(price);
  }
  endDate: any;
  ngOnInit(): void {
    // this.stripeTest = this.fb.group({
    //   name: ['', [Validators.required]],
    //   amount: ['', [Validators.required]],
    // });
    this.loading = true;
    // this.userService.getAllSubscription().subscribe((res: any) => {
    //   this.selectedSubscriptionIndex = -1;
    //   this.allSubscriptions = res;
    //   // console.log(this.allSubscriptions)
    //   this.customerSubscriptions = res?.customerSubscriptions;
    //   this.customerSubscriptions.filter(s => this.endDate = (s.endDate))
    //   // console.log(this.endDate)
    //   if (this.allSubscriptions.trialSubscriber == true && this.customerSubscriptions[0].endDate >= this.date) {
    //     this.planDetails();
    //   }
    //   else {
        this.getDashBoedCount();
        this.showdata();
        this.salesByChannels();
        this.getListOfLowStock();
        this.getCountryWiseData();
        this.loadOrderHis();
        this.getOrders();
        this.loading = false;
    //   }
    // }, error => {
    //   console.log(error)
    // });

  }

  createToken(): void {
    if (!this.stripeTest.valid) {
      this.toasterService.openToastMessage(ToastTypes.warning, "Payment Details", 'Please Enter name');
      return;
    }
    const name = this.stripeTest.get('name').value;
    let ref = this;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);

          ref.userService.chargeCard(result.token.id, ref.planid, null).subscribe((res) => {
            ref.paymentStatus.emit(res);
            $('#paymentModel-modal').modal('hide');
            this.getDashBoedCount();
            this.showdata();
            this.salesByChannels();
            this.getListOfLowStock();
            this.getCountryWiseData();
            this.loadOrderHis();
            this.loading = false;
          }, error => {
            console.log(error);
          });

        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
          this.toasterService.openToastMessage(ToastTypes.error, "Payment Details", result.error.message);
          return;
        }
      });
  }
  sort_by_key(array, key) {
    return array.sort(function (a, b) {
      var x = Number(a[key]); var y = Number(b[key]);
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
  valuePay: any; isAgree: boolean = false; paymentRequestDetails: any; plandetials: any = '';
  setValueForPay(pay: any) {
    this.valuePay = pay;
  }
  closeplanDetailsModal() {
    $('#changePlan-modal').modal('hide');
  }
  closePaymentModal() {
    $('#paymentModel-modal').modal('hide');
    $('#paymentMetthod-modal').modal('show');
  }
  closePaymentMetthodModal() {
    $('#paymentMetthod-modal').modal('hide');
    $('#changePlan-modal').modal('show');
  }

  selectedPaymentMethod: any; price: any;
  paymentMethods(index) {
    this.selectedPaymentMethod = index;
    this.userService.getPaymentMethods(index.subscriptionid).subscribe(res => {
      this.paymentRequestDetails = res;
      this.price = (this.paymentRequestDetails?.subscription?.price)
      // console.log(this.price)
      // this.paymentRequestDetails.filter(s=>console.log(s?.subscription?.price))
    })
    this.closeplanDetailsModal();
    $('#paymentMetthod-modal').modal('show');
  }
  openPaymentModal() {
    $('#paymentModel-modal').modal('show');
  }
  selectdPay: any;
  savePaymentDetails() {
    // console.log(this.paymentRequestDetails);
    this.plandetials = 'Plan Detils : ' + this.paymentRequestDetails?.subscription?.name + ' [' + this.paymentRequestDetails?.priceWithTaxOnly + ' ' + this.paymentRequestDetails?.subscription?.currencycode + ']';
    this.openPaymentModal();
    $('#paymentMetthod-modal').modal('hide');
    //this.makePayment(Number(this.paymentRequestDetails?.priceWithTaxOnly), this.selectedPaymentMethod?.name, this.selectedPaymentMethod?.currencycode, this.selectedPaymentMethod?.subscriptionid);
  }
  selectedSubscrption: any;
  allpriceplans: any[] = [];
  planDetails() {
    let sub: any;
    this.loading = true;
    let upgrade = true;
    this.customerSubscriptions.filter(s => {
      sub = s;
    })
    // console.log(sub)
    this.selectedSubscrption = sub;
    if (sub.displayStatus == 'Subscribed')
      upgrade = true;
    else
      upgrade = false;

    this.userService.getPricePlans(upgrade, 'GBP').subscribe((res: any) => {
      this.allpriceplans = res?.subscriptions;
      this.allpriceplans = this.sort_by_key(this.allpriceplans, 'price');
      // console.log(this.allpriceplans);
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      $('#changePlan-modal').modal('show');
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
    // ////console.log("planDetails::::", invoiceDetails);

  }
  loadMarkers(markers: any) {
    // $('#world-map-markers').vectorMap().destroy();
    $('#world-map-markers').vectorMap(
      {
        map: 'world_mill_en',
        backgroundColor: 'transparent',
        borderColor: '#818181',
        borderOpacity: 0.25,
        borderWidth: 1,
        zoomOnScroll: false,
        color: '#00000',
        regionStyle: {
          initial: {
            fill: '#041A41'
          }
        },
        markerStyle: {
          initial: {
            r: 9,
            'fill': '#fec107',
            'fill-opacity': 1,
            'stroke': '#fec107',
            'stroke-width': 5,
            'stroke-opacity': 0.4
          },
        },
        enableZoom: true,
        hoverColor: '#009efb',
        markers: markers,
        hoverOpacity: null,
        normalizeFunction: 'linear',
        scaleColors: ['#b6d6ff', '#005ace'],
        selectedColor: '#c9dfaf',
        selectedRegions: [],
        showTooltip: true,
        onRegionClick: function (element, code, region) {
          var message = 'You clicked "'
            + region
            + '" which has the code: '
            + code.toUpperCase();

          alert(message);
        }
      });
  }
  loadOrderHis() {
    this.dashboardService.getLoadorderhistory().subscribe((res: any) => {
      ////console.log(res);
      let chartData = [];
      res.dataList.forEach(dt => {
        let dA = dt.date.split('-');
        chartData.push({ "count": dt.count, "date": dA[2] + '-' + dA[1] + '-' + dA[0] });
      })
      if (chartData.length > 0)
        this.orderHistoryChart(chartData);
    })
  }
  getCountryWiseData() {
    this.dashboardService.getLoadsalebycountry().subscribe((res: any) => {
      ////console.log(res);      
      let marker = [];
      res?.dataList?.forEach(dt => {
        // chartData.push(dt.count);
        // chartLables.push(dt.country);
        // colors.push(dt.color);
        if (dt.country != '' && dt.shipCountryCode != null && dt.count != 0) {
          if (dt.shipCountryCode.toUpperCase() == 'GB')
            dt.shipCountryCode = 'UK';
          var latlng = this.datasharingService.getCountries().find(country => country.country_code.toUpperCase() === dt.shipCountryCode.toUpperCase())?.latlng;
          // ////console.log(latlng);
          // colors.push(dt.color);
          marker.push({
            latLng: latlng,
            name: dt.country + ":" + dt.count
          });
        }
      });
      this.loadMarkers(marker);
      // this.loadCountrywiseData(chartData, chartLables, colors);
    });
  }

  getDashBoedCount() {
    this.dashboardService.getDashboard().subscribe((res: any) => {
      // ////console.log(res);
      this.lowstock = res?.totallowstock;
      this.revenue = res?.totalRevenue == null ? 0 : res?.totalRevenue;
      this.salesorders = res?.totalorders;
      this.unitsslod = res?.totalunits;
    })
  }

  showdata() {
    this.dashboardService.getListRecentOrders().subscribe((recentorders: any) => {
      ////console.log(recentorders);
      this.recentOrders = recentorders?.orderSummary;
    });
  }
  chartData: any = [];
  salesByChannels() {
    // getLoadorderhistory
    this.dashboardService.getSalesbychannel().subscribe((salebychannel: any) => {
      ////console.log(salebychannel);
      let total = 0;
      salebychannel.dataList.forEach((element: any) => {
        this.chartData.push({ label: element.channel, value: element.value });
        total = parseInt(element.value) + total;
      });
      if (this.chartData.length > 0)
        this.loadMorisChart(this.chartData, total);
    });
  }

  getListOfLowStock() {
    this.dashboardService.getListLowStock().subscribe((res: any) => {
      this.lowStockProducts = res?.lowStock;
    });
  }
  draftTotal: any = 0;
  cancTotal: any = 0;
  shipTotal: any = 0;
  unshipTotal: any = 0;
  pendingTotal: any = 0;
  PartiallyShipped: any = 0;
getOrders(){
  this.orderSummaryService.getOrderSummary().subscribe((res: any) => {
    ////console.log(res);
    this.allOrders = res;
    let draft: any = [], draftcount: any,
        cancelled: any = [], cancelcount: any,
        shipped: any = [], shipcount: any,
        unshipped: any = [], unshipcount: any,
        pending: any = [], pendingcount: any,
        PartiallyShipped: any = [], PartiallyShippedcount: any;
        draft = this.allOrders.filter(s => s.status == "Draft")
      cancelled = this.allOrders.filter(s => s.status == "Canceled")
      shipped = this.allOrders.filter(s => s.status == "Shipped")
      unshipped = this.allOrders.filter(s => s.status == "Unshipped")
      pending = this.allOrders.filter(s => s.status == "Pending")
      PartiallyShipped = this.allOrders.filter(s => s.status == "PartiallyShipped")
      draft.forEach(element => {
        draftcount = +(element.count);
        this.draftTotal += (draftcount)
      });
      cancelled.forEach(element => {
        cancelcount = +(element.count);
        this.cancTotal += (cancelcount)
      });
      shipped.forEach(element => {
        shipcount = +(element.count);
        this.shipTotal += (shipcount)
      });
      unshipped.forEach(element => {
        unshipcount = +(element.count);
        this.unshipTotal += (unshipcount)
      });
      pending.forEach(element => {
        pendingcount = +(element.count);
        this.pendingTotal += (pendingcount)
      });
      PartiallyShipped.forEach(element => {
        PartiallyShippedcount = +(element.count);
        this.PartiallyShipped += (PartiallyShippedcount)
      });
  })
}
  loadMorisChart(loadMorisChart: any, total: any) {
    // Dashboard 1 Morris-chart
    loadMorisChart = loadMorisChart.filter(s=>s.label != null);
    console.log(loadMorisChart)
    $("#morris-donut-chart").empty();
    $(function () {
      "use strict";
      // Morris donut chart
      var $arrColors = ['#009efb', '#55ce63', '#FF8C00','#DA70D6', '#FF6347',  '#FFFF00', '#40E0D0'];

      Morris.Bar({
        element: 'morris-donut-chart',
        data: loadMorisChart,
        resize: true,
        xkey: 'label',
        ykeys: ['value'],
        labels: ['value'],
        barColors: function (row, series, type) {
          return $arrColors[row.x];
      }, 
        barSizeRatio: '0.15',
        hideHover: 'auto'
      });

    });
  }

  loadCountrywiseData(chartData: any, chartLables: any, color: any) {
    // new Chart(document.getElementById("chart2"),
    //   {
    //     "type": "bar",
    //     "data": {
    //       "labels": chartLables,
    //       "datasets": [{
    //         "label": "Count",
    //         "data": chartData,
    //         "fill": false,
    //         "backgroundColor": color,
    //         "borderColor": color,
    //         "borderWidth": 1
    //       }
    //       ]
    //     },
    //     "options": {
    //       "plugins": {
    //         legend: {
    //           display: false,
    //           labels: {
    //             color: 'rgb(255, 99, 132)'
    //           }
    //         },
    //         title: {
    //           display: false,
    //           text: 'Custom Chart Title'
    //         }
    //       },
    //       "scales": {
    //         "yAxes": [{
    //           "ticks": { "beginAtZero": true },
    //           "gridLines": {
    //             display: false
    //           }
    //         }],
    //         "xAxes": [{
    //           "gridLines": {
    //             display: false
    //           }
    //         }],
    //       }
    //     }
    //   });
  }

  orderHistoryChart(data: any) {
    ////console.log(data);
    $("#morris-line-chart").empty();
    $(function () {
      "use strict";
      var line = new Morris.Line({
        element: 'morris-line-chart',
        resize: true,
        data: data,
        xkey: 'date',
        ykeys: ['count'],
        labels: ['Count'],
        gridLineColor: '#eef0f2',
        lineColors: ['#009efb'],
        lineWidth: 1,
        hideHover: 'auto',
        dataLabels: false
      });
    });

  }

  generateRandomColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
  }
}
