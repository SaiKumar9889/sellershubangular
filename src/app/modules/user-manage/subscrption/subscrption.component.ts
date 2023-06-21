import { Component, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ManageUsersService } from '../services/manage-users.service';
declare var $: any;
import { loadStripe } from '@stripe/stripe-js';
import subscrptions from '../../../../assets/config/Price.json';
import { ConditionalExpr } from '@angular/compiler';


@Component({
  selector: 'app-subscrption',
  templateUrl: './subscrption.component.html',
  styleUrls: ['./subscrption.component.css']
})
export class SubscrptionComponent implements OnInit {
  loading: boolean = false;
  plandetials:any='';
  kartzhubUser: any
  constructor(private toasterService: ToasterService, private userService: ManageUsersService) { }

  ngOnInit(): void {
    this.getSubscriptions();
   // this.invokeStripe();
  }
  closePaymentModal(){
    $('#paymentModel-modal').modal('hide');
  }
  openPaymentModal(){
    $('#paymentModel-modal').modal('show');
  }
  pageSize = environment.defaultPaginationValue;
  total = environment.defaultTotalValue;
  collectionsize = 0;
  allSubscriptions: any[] = [];
  allinvoices: any[] = [];
  searchValue: any = '';
  searchBy: any = 0;
  searchFrom: any = '';
  searchTo: any = '';
  productTitle: string = '';
  page: number = 0;
  page2 = 1;
  currentPage = 3;
  disablepage = 3;

  allpriceplans: any[] = [];
  accountStatus: any = '';
  paymentRecdDate: any = '';
  description: any = '';
  qty: any = '';
  unitPrice: any = '';
  subtotal: any = '';
  invoiceId: any = '';
  invoiceTotalamount: any = '';
  currency: any = '';
  taxAmount: any = '';
  totalAmount: any = '';
  taxRate: any = '';
  membercreatedDate: any = '';

  selectedSubscriptionIndex = -1;

  subState = true;

  changespage(page: any) {
    this.getSubscriptions();
  }

  changePageSize() {
    this.getSubscriptions();
  }

  getPriceDetails(type:any,field:any){
    console.log(subscrptions);
    console.log(type);
    let identified=subscrptions.filter(sub=>sub?.type.toUpperCase()===type?.toUpperCase());
    console.log(identified);
    if(field=='key1')
     return identified[0]?.key1;
    if(field=='key2')
    return identified[0]?.key2;
    if(field=='key3')
    return identified[0]?.key3;
    if(field=='key4')
    return identified[0]?.key4;
    if(field=='key5')
    return identified[0]?.key5;
     return "...."
  }

  getSubscriptions() {
    this.loading = true ;
    this.userService.getAllSubscription().subscribe((res: any) => {
      this.selectedSubscriptionIndex = -1;
      this.accountStatus = res.accountStatus;
      this.membercreatedDate = res.kartzhubUser.createdDate;
      this.kartzhubUser = res.kartzhubUser;
      ////console.log("getAllSubscription::", res);
      this.allSubscriptions = res?.customerSubscriptions;
      this.allinvoices = res?.invoices;
      this.subState =  !this.allSubscriptions.find(i => i.displayStatus == "Subscribed");
      // this.collectionsize = res?.page?.totalResults;
      // this.page = res?.page?.currentPageNumber;
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'Please Wait...', 'Subscriptions loading..');
    }, eoor => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };


  invoiceDetails(invoiceDetails: any) {
    ////console.log("invoiceDetails::::", invoiceDetails);
    this.invoiceId = invoiceDetails.invoiceId;
    this.paymentRecdDate = invoiceDetails.paymentRecdDate;
    this.description = invoiceDetails.description;
    this.qty = invoiceDetails.qty;
    this.unitPrice = invoiceDetails.unitPrice;
    this.subtotal = invoiceDetails.subtotal;
    this.invoiceTotalamount = (this.qty * this.unitPrice);
    this.currency = invoiceDetails.currency;
    this.taxAmount = invoiceDetails.taxAmount;
    this.totalAmount = invoiceDetails.totalAmount;
    this.taxRate = invoiceDetails.taxRate;

    $('#invoiceDetails-modal').modal('show');
  }

  closeinvoiceDetailsModal() {
    $('#invoiceDetails-modal').modal('hide');
  }

  selectedSubscrption: any;

  planDetails(sub: any) {
    this.loading = true;
    let upgrade = true;
    this.selectedSubscrption = sub;
    if (sub.displayStatus == 'Subscribed')
      upgrade = true;
    else
      upgrade = false;

    this.userService.getPricePlans(upgrade,  'GBP').subscribe((res: any) => {
      this.allpriceplans = res?.subscriptions;
      this.allpriceplans=this.sort_by_key(this.allpriceplans,'price');
      console.log(this.allpriceplans);
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      $('#changePlan-modal').modal('show');
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
    // ////console.log("planDetails::::", invoiceDetails);

  }
  selectedPaymentMethod: any;
  paymentRequestDetails: any;
  paymentMethods(index) {
    this.selectedPaymentMethod = index;
    this.userService.getPaymentMethods(index.subscriptionid).subscribe(res => {
      this.paymentRequestDetails = res;
    })
    this.closeplanDetailsModal();
    $('#paymentMetthod-modal').modal('show');
  }

  sort_by_key(array, key) {
    return array.sort(function (a, b) {
      var x = Number(a[key]); var y =Number(b[key]);
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  GetSortOrder(prop) {
    return function(a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}

  closeplanDetailsModal() {
    $('#changePlan-modal').modal('hide');
  }

  cancelSubscrption() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete !",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then(async (result) => {
      ////console.log(result);
      if (result?.value) {
        let val = this.isProceisHign ? 'Pricing is high' : this.isDificultTouse ? 'Difficult to use' : this.missingfunctionality ? 'Missing functionality' : this.usingotherprod ? 'Using other products' : this.notinanymore ? ' Not in use anymore' : 'Other';
        this.userService.deleteSubscrption(this.subDet.id, val, this.feedback).subscribe((res) => {
          Swal.fire(res);
          this.closeDeleteModal();
        });
      }
    });

  }

  subDet: any;
  cancelSubscrptionv1(sub: any) {
    this.subDet = sub;
    $('#cancel-subscrption-modal').modal('show');
  }

  closeDeleteModal() {
    $('#cancel-subscrption-modal').modal('hide');
  }
  isProceisHign: boolean = false;
  isDificultTouse: boolean = false;
  missingfunctionality: boolean = false;
  usingotherprod: boolean = false;
  notinanymore: boolean = false;
  othre: boolean = false;
  feedback: any = '';
  checkboxStatus(id: any) {
    switch (id) {
      case 1:
        this.isProceisHign = !this.isProceisHign;
        this.isDificultTouse = false;
        this.missingfunctionality = false;
        this.missingfunctionality = false;
        this.usingotherprod = false;
        this.notinanymore = false;
        this.othre = false;
        break;
      case 2:
        this.isDificultTouse = !this.isDificultTouse;
        this.isProceisHign = false;
        this.missingfunctionality = false;
        this.usingotherprod = false;
        this.notinanymore = false;
        this.othre = false;
        break;
      case 3:
        this.missingfunctionality = !this.missingfunctionality;
        this.isProceisHign = false;
        this.isDificultTouse = false;
        this.usingotherprod = false;
        this.notinanymore = false;
        this.othre = false;
        break;
      case 4:
        this.usingotherprod = !this.usingotherprod;
        this.isProceisHign = false;
        this.isDificultTouse = false;
        this.missingfunctionality = false;
        this.notinanymore = false;
        this.othre = false;
        break;
      case 5:
        this.notinanymore = !this.notinanymore;
        this.isProceisHign = false;
        this.isDificultTouse = false;
        this.missingfunctionality = false;
        this.usingotherprod = false;
        this.othre = false;
        break;
      case 6:
        this.othre = !this.othre;
        this.isProceisHign = false;
        this.isDificultTouse = false;
        this.missingfunctionality = false;
        this.usingotherprod = false;
        this.notinanymore = false;
        break;
    }
  }
  selectdPay: any;
  savePaymentDetails() {
    console.log(this.paymentRequestDetails);
    this.plandetials= 'Plan Detils : '+this.paymentRequestDetails?.subscription?.name+' ['+this.paymentRequestDetails?.priceWithTaxOnly+' '+this.paymentRequestDetails?.subscription?.currencycode+']';
    this.openPaymentModal();
    $('#paymentMetthod-modal').modal('hide');
    //this.makePayment(Number(this.paymentRequestDetails?.priceWithTaxOnly), this.selectedPaymentMethod?.name, this.selectedPaymentMethod?.currencycode, this.selectedPaymentMethod?.subscriptionid);
  }
  paymentStatus(event:any){
    console.log(event);
    $('#paymentModel-modal').modal('hide');
    this.getSubscriptions();
  }
  selectpay() {

  }
  valuePay: any;
  setValueForPay(pay: any) {
    this.valuePay = pay;
  }

  paymentHandler: any = null;
  isAgree: boolean = false;
  makePayment(amount: any, planName: any, currencycode: any, planid: any) {
    console.log(amount, planName, currencycode, planid);
    let ref = this;
    const paymentHandler = (<any>window).StripeCheckout
      .configure({
        key: 'pk_live_PS3leXwKaiJx2UKyMvk2MpGM',
        locale: 'auto',
        currency: currencycode,
        token: function (stripeToken: any) {
          console.log(stripeToken);
          // alert('Stripe token generated!');
         
        },
      });
    paymentHandler.open({
      name: 'sellerhub.io',
      description: planName + '[' + amount + ']',
      amount: amount * 100,
    });
  }
  getData(data: any, position: any) {
    console.log(data);
    let dataArray = data?.split('$');
    if (dataArray.length > position)
      dataArray[position];
    else
      return '';
  }

  // invokeStripe() {
  //   if (!window.document.getElementById('stripe-script')) {
  //     const script = window.document.createElement('script');
  //     script.id = 'stripe-script';
  //     script.type = 'text/javascript';
  //     script.src = 'https://checkout.stripe.com/checkout.js';
  //     script.onload = () => {
  //       this.paymentHandler = (<any>window).StripeCheckout.configure({
  //         key: 'pk_live_PS3leXwKaiJx2UKyMvk2MpGM',
  //         locale: 'auto',
  //         token: function (stripeToken: any) {
  //           //console.log(stripeToken);
  //           // alert('Payment has been successfull!'+stripeToken);
  //         },
  //       });
  //     };
  //     window.document.body.appendChild(script);
  //   }
  // }
}
