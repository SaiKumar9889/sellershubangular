import { Component, Input, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import Swal from 'sweetalert2';
import { DpdIntiService } from '../../services/dpd-inti.service';

@Component({
  selector: 'app-dpd-inte',
  templateUrl: './dpd-inte.component.html',
  styleUrls: ['./dpd-inte.component.css']
})
export class DpdInteComponent implements OnInit {
  @Input() courrierDetails;
  loading:boolean=false;
  customerid: any = '';
  userid: any = '';
  password: any = '';
  labelformat: any = '';
  pickContactname: any = '';
  pickphonenum: any = '';
  pickbuilding: any = '';
  picstreet: any = '';
  picklocality: any = '';
  picktown: any = '';
  pickpostcode: any = '';
  pickcountry: any = '';
  pickcountrycode: any = '';

  isEnabled:boolean=false;
  constructor(private dpdIntiService: DpdIntiService, private toasterService: ToasterService) { }

  ngOnInit(): void {
    // //console.log(this.courrierDetails);
    this.isEnabled=this.courrierDetails?.enable;
    this.getIntegrateDetails();
  }
  save() {
    if (this.customerid == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'DPD Integration', 'Please enter customer id');
      return;
    }
    if (this.userid == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'DPD Integration', 'Please enter user id');
      return;
    }
    if (this.password == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'DPD Integration', 'Please enter password');
      return;
    }
    if (this.labelformat == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'DPD Integration', 'Please enter label format');
      return;
    }
    if (this.pickContactname == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'DPD Integration', 'Please enter pickup contact name');
      return;
    }
    if (this.pickphonenum == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'DPD Integration', 'Please enter pickup phone number');
      return;
    }
    if (this.pickbuilding == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'DPD Integration', 'Please enter pickup building');
      return;
    }
    if (this.picstreet == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'DPD Integration', 'Please enter pickup street');
      return;
    }
    if (this.picklocality == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'DPD Integration', 'Please enter pickup locality');
      return;
    }
    if (this.picktown == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'DPD Integration', 'Please enter pickup town');
      return;
    }
    if (this.pickcountry == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'DPD Integration', 'Please enter country name');
      return;
    }
    if (this.pickcountrycode == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'DPD Integration', 'Please enter countrycode');
      return;
    }

    let body = {
      "courierId": 3,
      "inputList": {
        "allowedHighestPercentage": 0,
        "allowedLowestPercentage": 0,
        "channelId": 0,
        "cvalue1": [
          0
        ],
        "cvalue2": [
          0
        ],
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
        "searchChannelId": "string",
        "searchName": "string",
        "searchText": "string",
        "val1": "string",
        "val2": "string",
        "value1":this.selectedShippingServices,
        "value2": [
          "string"
        ],
        "value3": [
          "string"
        ],
        "value4": [
          "string"
        ],
        "value5": [
          "string"
        ],
        "value6": [
          "string"
        ],
        "valueId": [
          0
        ]
      },
      "rules": {
        "dpdDetails": {
          "dpdCustomerId": this.customerid,
          "dpdLabelFormat": this.labelformat,
          "dpdPassword": this.password,
          "dpdPickPhone": this.pickphonenum,
          "dpdPickupBuilding": this.pickbuilding,
          "dpdPickupContactName": this.pickContactname,
          "dpdPickupCountry": this.pickcountry,
          "dpdPickupCountryCode": this.pickcountrycode,
          "dpdPickupLocality": this.picklocality,
          "dpdPickupStreet": this.picstreet,
          "dpdPickupTown": this.picktown,
          "dpdPickupZip": this.pickpostcode,
          "dpdUserName": this.userid,
        },
        "shippingTemplate": 'shippingTemplate'
      }
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
        this.loading=true;
        this.dpdIntiService.saveIntegrationDetials(body).subscribe(res => {
          this.loading=false;
          this.clear();
          this.getIntegrateDetails();
          Swal.fire(
            'Shippingcourier is integrated!',
            'DPD integration done.',
            'success'
          )
        });
      }
    });

  }

  clear() {
    this.customerid = '';
    this.userid = '';
    this.password = '';
    this.labelformat = '';
    this.pickContactname = '';
    this.pickphonenum = '';
    this.pickbuilding = '';
    this.picstreet = '';
    this.picklocality = '';
    this.picktown = '';
    this.pickpostcode = '';
    this.pickcountry = '';
    this.pickcountrycode = '';
  }

  getCheckStatus(name: any) {
    // let chkst = this.selectedShippingServices.find(sl => sl.code == name);
    if (this.selectedShippingServices.includes(name))
      return true;
    else
      return false;
  }


  getIntegrateDetails() {
    this.dpdIntiService.getIntegrateDetails(this.courrierDetails.id).subscribe((res: any) => {

       this.customerid =res?.shippingRules?.dpdDetails?.dpdCustomerId;
      this.userid = res?.shippingRules?.dpdDetails?.dpdUserName;
      this.password = res?.shippingRules?.dpdDetails?.dpdPassword;
      this.labelformat = res?.shippingRules?.dpdDetails?.dpdLabelFormat;
      this.pickContactname = res?.shippingRules?.dpdDetails?.dpdPickupContactName;
      this.pickphonenum = res?.shippingRules?.dpdDetails?.dpdPickPhone;
      this.pickbuilding = res?.shippingRules?.dpdDetails?.dpdPickupBuilding;
      this.picstreet = res?.shippingRules?.dpdDetails?.dpdPickupStreet;
      this. picklocality = res?.shippingRules?.dpdDetails?.dpdPickupLocality;
      this.picktown = res?.shippingRules?.dpdDetails?.dpdPickupTown;
      this.pickpostcode = res?.shippingRules?.dpdDetails?.dpdPickupZip;
      this.pickcountry = res?.shippingRules?.dpdDetails?.dpdPickupCountry;
      this.pickcountrycode = res?.shippingRules?.dpdDetails?.dpdPickupCountryCode;
      this.selectedShippingServices=res?.dpdCourierResponse?.services.map(sr=>sr.code);
    });
  }

  selectedShippingServices: any = [];
  appendData(event: any) {
    //////console.log(event.target.value);
    let val = event.target.value;
    if (this.selectedShippingServices.includes(event.target.value)) {
      this.selectedShippingServices = this.selectedShippingServices.filter(ss => ss != val)
    } else {
      this.selectedShippingServices.push(val);
    }
  }
}
