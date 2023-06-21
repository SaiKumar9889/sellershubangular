import { Component, Input, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import Swal from 'sweetalert2';
import { AmazonShippingService } from '../../services/amazon-shipping.service';
import { RoyalIntiService } from '../../services/royal-inti.service';

@Component({
  selector: 'app-amazon-shipping',
  templateUrl: './amazon-shipping.component.html',
  styleUrls: ['./amazon-shipping.component.scss']
})
export class AmazonShippingComponent implements OnInit {
  @Input() courrierDetails;
  loading: boolean = false;

  shippingaccountid: any = '';

  fromname: any = '';
  addressline1: any = '';
  addressline2: any = '';
  addressline3: any = '';
  companyname: any = '';
  state: any = '';
  picktown: any = '';
  pickpostcode: any = '';
  // contactphonenumber: any = '';

  return: any = '';
  return_addressline1: any = '';
  return_addressline2: any = '';
  return_addressline3: any = '';
  return_companyname: any = '';
  return_state: any = '';
  return_picktown: any = '';
  return_pickpostcode: any = '';
  // return_contactphonenumber: any = '';


  monday_st: any = '';
  monday_et: any = '';
  tuesday_st: any = '';
  tuesday_et: any = '';
  wednesday_st: any = '';
  wednesday_et: any = '';
  thursday_st: any = '';
  thursday_et: any = '';
  friday_st: any = '';
  friday_et: any = '';

  isEnabled: boolean = false;

  dropdownSettings_country: any;
  allCountries: any = [];
  selecte_country: any = [];
  selecte_country_return: any = [];
  constructor(private datasharingService: DatasharingService, private amazonShippingService: AmazonShippingService, private toasterService: ToasterService) { }

  ngOnInit(): void {
    //console.log(this.courrierDetails);
    this.isEnabled = this.courrierDetails?.enable;
    this.getIntegrateDetails();
    this.allCountries = this.datasharingService.getCountries();
    this.dropdownSettings_country = {
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
  }
  save() {

    if (this.shippingaccountid == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Shipping  Integration', 'Please enter account id');
      return;
    }
    if (this.fromname == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Shipping  Integration', 'Please enter accountnumber');
      return;
    }
    if (this.addressline1 == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Shipping  Integration', 'Please enter api user name');
      return;
    }
    if (this.addressline2 == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Shipping  Integration', 'Please enter api password');
      return;
    }
    if (this.addressline3 == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Shipping  Integration', 'Please enter international username');
      return;
    }
    if (this.companyname == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Shipping  Integration', 'Please enter international password');
      return;
    }
    if (this.state == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Shipping  Integration', 'Please enter contact name');
      return;
    }
    if (this.companyname == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Shipping  Integration', 'Please enter company name');
      return;
    }
    if (this.picktown == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Shipping  Integration', 'Please enter streetname');
      return;
    }
    if (this.selecte_country.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Shipping  Integration', 'Please select country');
      return;
    }
    if (this.pickpostcode == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Shipping  Integration', 'Please enter pickup town');
      return;
    }


    if (this.return == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Shipping  Integration', 'Please enter pickup postcode');
      return;
    }
    if (this.return_addressline1 == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Shipping  Integration', 'Please enter contact phone number');
      return;
    }
    if (this.return_addressline2 == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Shipping  Integration', 'Please enter entry number');
      return;
    }
    if (this.return_addressline3 == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Shipping  Integration', 'Please enter certificate number');
      return;
    }
    if (this.return_companyname == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Shipping  Integration', 'Please enter client code');
      return;
    }
    if (this.return_state == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Shipping  Integration', 'Please enter vat number');
      return;
    }
    if (this.selecte_country_return.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Shipping  Integration', 'Please select country');
      return;
    }
    if (this.return_picktown == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Shipping  Integration', 'Please enter export type');
      return;
    }



    let body = {

      "courierId": 1,
      "inputList": {
        "allowedHighestPercentage": 0,
        "allowedLowestPercentage": 0,
        "channelId": 0,
        "cvalue1": [],
        "cvalue2": [],
        "cvalue3": [
          0
        ],
        "cvalue4": [
          0
        ],
        "enable": true,
        "filter": "string",
        "highPercen": 0,
        "id1": 0,
        "id2": 0,
        "id3": 0,
        "lowPercen": 0,
        "lvalue1": [
          0
        ],
        "name": "string",
        "notIn": "string",
        "orderIds": [
          0
        ],
        "searchChannelId": "",
        "searchName": "",
        "searchText": "",
        "val1": "",
        "val2": "",
        "value1": [],
        "value2": [
          " "
        ],
        "value3": [
          ""
        ],
        "value4": [
          ""
        ],
        "value5": [
          ""
        ],
        "value6": [
          ""
        ],
        "valueId": [
          0
        ]
      },
      "rules": {
        "amazonShippingClientDetails": {
          "amazonShippingAccountId": this.shippingaccountid,
          "amazonShippingFromName": this.fromname,
          "amazonShippingFromAddressLine1": this.addressline1,
          "amazonShippingFromAddressLine2": this.addressline2,
          "amazonShippingFromAddressLine3": this.addressline3,
          "amazonShippingFromCompanyName": this.companyname,
          "amazonShippingFromStateOrRegion": this.state,
          "amazonShippingFromCity": this.picktown,
          "amazonShippingFromCountryCode": this.selecte_country[0].country_code,
          "amazonShippingFromPostalCode": this.pickpostcode,
          "amazonShippingReturnName": this.return,
          "amazonShippingReturnAddressLine1": this.return_addressline1,
          "amazonShippingReturnAddressLine2": this.return_addressline2,
          "amazonShippingReturnAddressLine3": this.return_addressline3,
          "amazonShippingReturnCompanyName": this.return_companyname,
          "amazonShippingReturnStateOrRegion": this.return_state,
          "amazonShippingReturnCity": this.return_picktown,
          "amazonShippingReturnCountryCode": this.selecte_country_return[0].country_code,
          "amazonShippingReturnPostalCode": this.return_pickpostcode,
          "amazonShippingMondayStartTime": this.monday_st,
          "amazonShippingMondayEndTime": this.monday_et,
          "amazonShippingTuesdayStartTime": this.thursday_st,
          "amazonShippingTuesdayEndTime": this.thursday_et,
          "amazonShippingWednesdayStartTime": this.wednesday_st,
          "amazonShippingWednesdayEndTime": this.wednesday_et,
          "amazonShippingThursdayStartTime": this.thursday_et,
          "amazonShippingThursdayEndTime": this.thursday_et,
          "amazonShippingFridayStartTime": this.friday_st,
          "amazonShippingFridayEndTime": this.friday_et
        },
        "serviceFormatList": this.selectedShippingServices
      },

    };
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
        this.amazonShippingService.saveIntegrationDetials(body).subscribe(res => {
          // this.clear();
          Swal.fire(
            'Shippingcourier is integrated!',
            'Amazon Shipping Service Integration done.',
            'success'
          )
        });
      }
    });

  }

  clear() {
    this.fromname = '';
    this.addressline1 = '';
    this.addressline2 = '';
    this.addressline3 = '';
    this.companyname = '';
    this.state = '';
    this.picktown = '';
    this.pickpostcode = '';
    this.return = '';
    this.return_addressline1 = '';
    this.return_addressline2 = '';
    this.return_addressline3 = '';
    this.return_companyname = '';
    this.return_state = '';
    this.return_picktown = '';
    this.return_pickpostcode = '';
    this.monday_st = '';
    this.monday_et = '';
    this.tuesday_st = '';
    this.tuesday_et = '';
    this.wednesday_st = '';
    this.wednesday_et = '';
    this.thursday_st = '';
    this.thursday_et = '';
    this.friday_st = '';
    this.friday_et = '';
  }


  getIntegrateDetails() {
    this.loading = true;
    this.amazonShippingService.getIntegrateDetails(this.courrierDetails.id).subscribe((res: any) => {

      this.shippingaccountid = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingAccountId;
      this.fromname = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingFromName;
      this.addressline1 = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingFromAddressLine1;
      this.addressline2 = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingFromAddressLine2;
      this.addressline3 = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingFromAddressLine3;
      this.companyname = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingFromCompanyName;
      this.state = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingFromStateOrRegion;
      this.picktown = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingFromCity;
      this.pickpostcode = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingFromPostalCode;
      this.selecte_country = this.allCountries.filter(s => s.country_code == res?.shippingRules?.amazonShippingClientDetails?.amazonShippingFromCountryCode);

      this.return = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingReturnName;
      this.return_addressline1 = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingReturnAddressLine1;
      this.return_addressline2 = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingReturnAddressLine2;
      this.return_addressline3 = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingReturnAddressLine3;
      this.return_companyname = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingReturnCompanyName;
      this.return_state = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingReturnStateOrRegion;
      this.return_picktown = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingReturnCity;
      this.return_pickpostcode = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingReturnPostalCode;
      this.selecte_country_return = this.allCountries.filter(s => s.country_code == res?.shippingRules?.amazonShippingClientDetails?.amazonShippingReturnCountryCode);

      this.monday_st = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingMondayStartTime;
      this.monday_et = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingMondayEndTime;
      this.tuesday_st = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingTuesdayStartTime;
      this.tuesday_et = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingTuesdayEndTime;
      this.wednesday_st = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingWednesdayStartTime;
      this.wednesday_et = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingWednesdayEndTime;
      this.thursday_st = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingThursdayStartTime;
      this.thursday_et = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingThursdayEndTime;
      this.friday_st = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingFridayStartTime;
      this.friday_et = res?.shippingRules?.amazonShippingClientDetails?.amazonShippingFridayEndTime;
      // this.selectedShippingServices=res?.shippingRules?.serviceFormatList.map(sr=>sr.code && sr.name);
      res?.shippingRules?.serviceFormatList.forEach(sr =>
        this.selectedShippingServices.push({
          "code": sr.code,
          "name": sr.name
        }));

      console.log(this.selectedShippingServices)
      // this.selectedShippingServices=res?.shippingRules?.serviceFormatList.map(sr=>sr.name);
      this.loading = false;
    });
  }

  shownetdespatchform() {

  }
  getCheckStatus(code: any, name: any) {
    // let chkst = this.selectedShippingServices.find(sl => sl.code == name);
    if (this.selectedShippingServices.find(s=> s.code == code))
      return true;
    else
      return false;
  }
  selectedShippingServices: any = [];
  selectedShippingName: any;
  selectedShippingCode: any;
  appendData(event: any) {
    this.selectedShippingCode = event.target.value;
    this.selectedShippingName = event.target.name;
    this.selectedShippingServices.push({
      "code": this.selectedShippingCode,
      "name": this.selectedShippingName
    })
    // let val = event.target.value;
    // if (this.selectedShippingServices.includes(event.target.value)) {
    //   this.selectedShippingServices = this.selectedShippingServices.filter(ss => ss != val)
    // } else {
    //   this.selectedShippingServices.push(val);
    // }
  }
}
