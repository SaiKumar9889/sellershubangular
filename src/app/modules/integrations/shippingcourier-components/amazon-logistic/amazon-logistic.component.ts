import { Component, Input, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import Swal from 'sweetalert2';
import { RoyalIntiService } from '../../services/royal-inti.service';

@Component({
  selector: 'app-amazon-logistic',
  templateUrl: './amazon-logistic.component.html',
  styleUrls: ['./amazon-logistic.component.scss']
})
export class AmazonLogisticComponent implements OnInit {
  @Input() courrierDetails;
  loading:boolean=false;
  accountnumber: any = '';
  apiusername: any = '';
  apipassword: any = '';
  internationalapiusername: any = '';
  internationpassword: any = '';
  contactname: any = '';
  companyname: any = '';
  streetname: any = '';
  picktown: any = '';
  pickpostcode: any = '';
  contactphonenumber: any = '';
  exportEntrynumber: any = '';
  certificatenumber: any = '';
  clientcode: any = '';
  vatnumber: any = '';
  exporttype: any = '';
  tariffcode: any = '';
  deliveryinstruction_1: any = '';
  isEnabled:boolean=false;
  amazonShippingClientDetails: any;

  selectedCountry =  [{ country_code: "GB", name: "United Kingdom" }];
  allCountries: any = [];
  dropdownSettings_country: any = {};



  constructor(private dpdIntiService: RoyalIntiService, private toasterService: ToasterService, private datasharingService: DatasharingService) {
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

  ngOnInit(): void {
    //console.log(this.courrierDetails);
    this.isEnabled=this.courrierDetails?.enable;
    Object.assign(this.allCountries, this.datasharingService.getCountries());
    let uk = this.allCountries.find(i => i.country_code == "UK");
    if (uk) {
      uk.country_code = 'GB';
    }
    this.getIntegrateDetails();
  }
  save() {
    if (!this.amazonShippingClientDetails.amazonShippingAccountId ) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon buy shipping', 'Please enter accountnumber');
      return;
    }

    if (!this.amazonShippingClientDetails.amazonShippingFromName ) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon buy shipping', 'Please enter contact name');
      return;
    }
    if (!this.amazonShippingClientDetails.amazonShippingFromCompanyName ) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon buy shipping', 'Please enter company name');
      return;
    }
    if (!this.amazonShippingClientDetails.amazonShippingFromAddressLine1) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon buy shipping', 'Please enter streetname');
      return;
    }
    if (!this.amazonShippingClientDetails.amazonShippingFromCity) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon buy shipping', 'Please enter pickup town');
      return;
    }
    if (!this.amazonShippingClientDetails.amazonShippingFromPostalCode) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon buy shipping', 'Please enter pickup postcode');
      return;
    }

    let body = {
      "courierId": 2,
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
        "value1":this.selectedShippingServices,
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
        amazonShippingClientDetails :this.amazonShippingClientDetails
      }
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
        this.dpdIntiService.saveIntegrationDetials(body).subscribe(res => {
          this.clear();
          Swal.fire(
            'Shippingcourier is integrated!',
            'Amazon buy shipping done.',
            'success'
          )
        });
      }
    });

  }

  clear() {
    this.accountnumber = '';
    this.apiusername = '';
    this.apipassword = '';
    this.internationalapiusername = '';
    this.internationpassword = '';
    this.contactname = '';
    this.companyname = '';
    this.streetname = '';
    this.picktown = '';
    this.pickpostcode = '';
    this.contactphonenumber = '';
    this.exportEntrynumber = '';
    this.certificatenumber = '';
    this.clientcode = '';
    this.vatnumber = '';
    this.exporttype = '';
    this.tariffcode = '';
    this.deliveryinstruction_1 = '';
  }

  onItemSelectCountryBil(item: any) {
    ////console.log(item);
    this.amazonShippingClientDetails.amazonShippingFromCountryCode = item.country_code;
  }

  getIntegrateDetails() {
    this.dpdIntiService.getIntegrateDetails(this.courrierDetails.id).subscribe((res: any) => {
      ////console.log(res);
      this.amazonShippingClientDetails =  res?.shippingRules?.amazonShippingClientDetails ;
      if(!this.amazonShippingClientDetails){
        this.amazonShippingClientDetails ={};
      }
      this.selectedCountry = this.allCountries.find(cou => cou.country_code.toLowerCase() == this.amazonShippingClientDetails?.amazonShippingFromCountryCode?.toLowerCase());
    });
  }

  shownetdespatchform() {

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
