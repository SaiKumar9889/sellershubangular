import { Component, OnInit } from '@angular/core';
import { FormGroup, Validator, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { RegistrationService } from 'src/app/_service/registration.service';
import { ToasterService } from 'src/app/_service/toaster.service';
declare var $: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  // email:string='188@kartzhub.com';
  // password:string='fd3fgdf237D2fsdLdfd%&5fs4346';
  ipaddress: string;
  loading: boolean = false;
  loginform: FormGroup;

  name: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  country: string = '';
  phonenumber: string = '';
  countryList: any = [];
  other1: any = '';
  other2: any = '';
  orders: number;
  sku: number;
  promotioncode: any = '';
  isAmazon: any = '';
  isEbay: any = '';
  isEtsy: any = '';
  isShopify: any = '';
  isRoyalmail: any = '';
  isDpd: any = '';
  isYodel: any = '';
  isAmazonlog: any = '';
  companyname: any = '';
  vat: any = '';
  dropdownSettings_channel: any = {};
  allChannels: any = [];
  selectedChannle : any;
  dropdownSettings_courier: any = {};
  allCourier: any = [];
  selectedCourier : any;
  selectedChannel: any;
  selectCourier: any;

  selectedItems: any = null;
  deselectedItems: any = null;


  constructor(private dataSharingService: DatasharingService, private toasterService: ToasterService, private router: Router, private urlApi: RegistrationService) {

  }
  ngOnInit(): void {
    this.dropdownSettings_channel = {
      singleSelection: false,
      idField: 'id',
      textField: 'display',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 1,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true
    };

    this.dropdownSettings_courier = {
      singleSelection: false,
      idField: 'id',
      textField: 'display',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 1,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true
    };
    if (localStorage.getItem('userToken') != null && localStorage.getItem('userLoginEmail') != null)
      this.router.navigate(['/sellershub']);
    this.getCountryData();

    this.getChannel();

    this.getCourier();

    // let channel = this.selectedChannle.map(ch => ch.display).toString();
    // let courier = this.selectedCourier.map(ch => ch.display).toString(); 
    // this.selectCourier = channel;
    // this.selectedChannel = courier;
  }

  getChannel(){
    this.allChannels = [
      { id: 1, display: 'Amazon' },
      { id: 2, display: 'Ebay' },
      { id: 3, display: 'Etsy' },
      { id: 4, display: 'Shopify' }
  ];

    // this.allChannels.map(ch => ch.display = ch.type + "-" + ch.name == null ? '' : ch.name);
  }

  getCourier(){
    this.allCourier = [
      { id: 1, display: 'Royalmail' },
      { id: 2, display: 'DPD' },
      { id: 3, display: 'Yodel' },
      { id: 4, display: 'Amazon Logistics' }
  ];
  }

  onItemSelected(){
    // ////console.log(this.selectedChannle.map(ch => ch.display).toString());
    // ////console.log(this.selectedCourier.map(ch => ch.display).toString());
  }

  onItemSelect(e){
    this.selectedItems = e;
    ////console.log(this.selectedItems);
    ////console.log(this.deselectedItems);
  }

  onItemSelectCourior(e){
    ////console.log(e);
  }

  selecteChan = [];
  selectedChannels(e) {
    this.selecteChan.push(e.target.value);
  }

  toAmazon(e) {
    this.isAmazon = e.target.value;
    //(this.isAmazon);
  }

  toEbay(e) {
    this.isEbay = e.target.value;
    //(this.isEbay);
  }

  toEtsy(e) {
    this.isEtsy = e.target.value;
    //(this.isEtsy);
  }

  toShopify(e) {
    this.isShopify = e.target.value;
    //(this.isShopify);
  }

  toRoyalmail(e) {
    this.isRoyalmail = e.target.value;
    //(this.isRoyalmail);
  }

  toDpd(e) {
    this.isDpd = e.target.value;
    //(this.isDpd);
  }

  toYodel(e) {
    this.isYodel = e.target.value;
    //(this.isYodel);
  }

  toAmazonlog(e) {
    this.isAmazonlog = e.target.value;
    //(this.isAmazonlog);
  }

  gotoDashboard() {
    // this.router.navigate(['/admin']);
    this.registerNewUser();
  }

  onCountryChange() {
    // debugger
    //  this.country;
    //(this.country);
  }

  registerNewUser() {
    this.loading=true;
    // alert(this.selectedChannle.map(ch => ch.display).toString());
    // alert(this.selectedCourier.map(ch => ch.display).toString());
    if (this.name == "" || this.name == undefined) {
      // ////console.log(this.name);
      this.toasterService.openToastMessage(ToastTypes.warning, "Sign up", "Please enter Name");
      this.loading = false;
    } else if (this.email == "" || this.email == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, "Sign up", "Please enter Email Address");
      this.loading = false;
    } else if (this.password == "" || this.password == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, "Sign up", "Please enter Password");
      this.loading = false;
    } else if (this.phonenumber == "" || this.phonenumber == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, "Sign up", "Please enter Phone Number");
      this.loading = false;
    } else if (this.country == "" || this.country == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, "Sign up", "Please enter Country");
      this.loading = false;
    } else if (this.orders == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, "Sign up", "Please enter No. of Orders");
      this.loading = false;
    } else if (this.sku == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, "Sign up", "Please enter No. of SKU");
      this.loading = false;
    }
    //  else if (this.other1 == "" || this.other1 == undefined) {
    //   this.toasterService.openToastMessage(ToastTypes.warning, "Sign up", "Please enter Channel Other");
    // } 
    // else if (this.other2 == "" || this.other2 == undefined) {
    //   this.toasterService.openToastMessage(ToastTypes.warning, "Sign up", "Please enter Couriers Other");
    // }
    else if (this.phonenumber == "" || this.phonenumber == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, "Sign up", "Please enter your phone number");
      this.loading = false;
    } else {
      // localStorage.setItem("userLoginName", this.name);
      // localStorage.setItem("userLoginLastName", this.lastname);
      // localStorage.setItem("userLoginEmail", this.email);
      // localStorage.setItem("userLoginPass", this.password);
      // localStorage.setItem("userLoginCountry", this.country);
      // localStorage.setItem("userloginPhone", this.phonenumber);
      const data = {
        "code": this.promotioncode,
        "companyName": this.companyname,
        "VATNumber":this.vat,
        "country": this.country,
        "emailAddress": this.email,
        "firstName": this.name,
        "lastName": this.lastname,
        "password": this.password,
        "resellerid": 0,
        "telephone": this.phonenumber,
        "channels": this.selectedChannle.map(ch => ch.display).toString() + ',' + this.other1.toString(),
        "couriers": this.selectedCourier.map(ch => ch.display).toString() + ',' + this.other2.toString(),
        "countOfOrders": Number(this.orders),
        "countOfSkus": Number(this.sku),
      };
      this.urlApi.postRegistration(data).subscribe((successData: any) => {
        // if (successData['errorMessage'] == 'Email/password/telephone number should not be empty' || 'Email address already exists. Please try with a new email address or use forget password to recover the credentials' || 'We are sorry. We are unable to register at this time. Could you contact support team at support@kartzhub.com') {
        //   // window.location.reload();
          this.toasterService.openToastMessage(ToastTypes.success, "Sign up", successData['errorMessage']);
          this.loading = false;
        // }
        // else
         if(successData['errorMessage'] == 'Registered successfully, please check your mail'){
          this.loading = false;
          setTimeout(() => {
            $('#search-modal').modal('show');
          }, 1000);
        }
      });
    }
  }


  modalclosed() {
    $('#search-modal').modal('show');
  }


  getCountryData() {
    this.countryList = this.dataSharingService.getCountries();
  }

  gotToSignIn() {
    this.router.navigate(['/login']);
  }

}
