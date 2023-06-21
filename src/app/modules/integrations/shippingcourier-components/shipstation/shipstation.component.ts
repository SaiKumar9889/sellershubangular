import { Component, Input, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import Swal from 'sweetalert2';
import { DpdIntiService } from '../../services/dpd-inti.service';

@Component({
  selector: 'app-shipstation',
  templateUrl: './shipstation.component.html',
  styleUrls: ['./shipstation.component.scss']
})
export class ShipstationComponent implements OnInit {
  @Input() courrierDetails;
  apikey: any;
  apisecret: any;
  name: any;
  company: any;
  city: any;
  street: any;
  mail: any;
  state: any;
  zip: any; loading: boolean = false;
  phone: any; fedexselect: any; upsselect: any; dhlselect: any; shipwireselect: any; royalmailselect: any; amazonshippingselect: any;
  constructor(private datasharingService: DatasharingService, private dpdIntiService: DpdIntiService, private toasterService: ToasterService) { }
  isEnabled: boolean = false; dropdownSettings_country: any; allCountries: any = []; selecte_country: any = [];
  ngOnInit(): void {
    this.allCountries = this.datasharingService.getCountries();
    this.isEnabled = this.courrierDetails?.enable;
    this.getIntegrateDetails()
    this.dropdownSettings_country = {
      singleSelection: true,
      idField: 'country_code',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 100,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true
    };
  }
  getIntegrateDetails() {
    this.dpdIntiService.getIntegrationDetials(5).subscribe((res: any) => {
      console.log(res);
      this.apikey = res?.shippingRules?.shipstationApiKey;
      this.apisecret = res?.shippingRules?.shipstationApiSecret;
      this.name = res?.shippingRules?.shipstationname;
      this.company = res?.shippingRules?.shipstationcompany;
      this.city = res?.shippingRules?.shipstationcity;
      this.street = res?.shippingRules?.shipstationstreet1;
      this.mail = res?.shippingRules?.shipstationemail;
      this.state = res?.shippingRules?.shipstationstate;
      this.zip = res?.shippingRules?.shipstationzip;
      this.phone = res?.shippingRules?.shipstationphone;
      this.fedexselect = res?.shippingRules?.shipstationFEDEX;
      this.upsselect = res?.shippingRules?.shipstationUPS;
      this.dhlselect = res?.shippingRules?.shipstationDHL;
      this.shipwireselect = res?.shippingRules?.shipstationSHIPWIRE;
      this.royalmailselect = res?.shippingRules?.shipstationROYALMAIL;
      this.amazonshippingselect = res?.shippingRules?.shipstationAMAZONSHIPPING;
      this.selecte_country = res?.shippingRules?.shipstationcountry
    });
  }
  save() {
    if (this.apikey == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'ShipStation Integration', 'Please enter apikey');
      return;
    }
    if (this.apisecret == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'ShipStation Integration', 'Please enter apisecret');
      return;
    }
    if (this.name == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'ShipStation Integration', 'Please enter name');
      return;
    }
    if (this.company == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'ShipStation Integration', 'Please enter company');
      return;
    }
    if (this.city == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'ShipStation Integration', 'Please enter city');
      return;
    }
    if (this.street == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'ShipStation Integration', 'Please enter street');
      return;
    }
    if (this.mail == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'ShipStation Integration', 'Please enter mail');
      return;
    }
    if (this.state == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'ShipStation Integration', 'Please enter state');
      return;
    }
    if (this.zip == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'ShipStation Integration', 'Please enter zip');
      return;
    }
    if (this.phone == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'ShipStation Integration', 'Please enter phone');
      return;
    }
    if (this.selecte_country.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'ShipStation  Integration', 'Please select country');
      return;
    }

    let body = {
      "courierId": 5,
      "inputList": {
        "allowedHighestPercentage": 0,
        "allowedLowestPercentage": 0,
        "channelId": 0,
        "cvalue1": [
        ],
        "cvalue2": [
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
        "value1": this.selectedShippingServices,
        "value2": [
          " "
        ],
        "value3": [
          ""
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
        shipstationApiKey: this.apikey,
        shipstationApiSecret: this.apisecret,
        shipstationROYALMAIL: this.royalmailselect,
        shipstationFEDEX: this.fedexselect,
        shipstationUPS: this.upsselect,
        shipstationDHL: this.dhlselect,
        shipstationSHIPWIRE: this.shipwireselect,
        shipstationemail: this.mail,
        shipstationphone: this.phone,
        shipstationcountry: this.selecte_country,
        shipstationzip: this.zip,
        shipstationstate: this.state,
        shipstationcity: this.city,
        shipstationstreet1: this.street,
        shipstationcompany: this.company,
        shipstationname: this.name,
        shipstationAMAZONSHIPPING: this.amazonshippingselect
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
        this.loading = true;
        this.dpdIntiService.saveIntegrationDetials(body).subscribe(res => {
          this.loading = false;
          // this.clear();
          this.getIntegrateDetails();
          Swal.fire(
            'Shippingcourier is integrated!',
            'ShipStation integration done.',
            'success'
          )
        });
      }
    });

  }
  selectashippinglabel(type: any) { }
  testconnection() { }
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
