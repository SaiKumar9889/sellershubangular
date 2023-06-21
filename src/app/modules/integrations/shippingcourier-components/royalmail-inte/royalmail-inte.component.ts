import { Component, Input, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import Swal from 'sweetalert2';
import { RoyalIntiService } from '../../services/royal-inti.service';
declare var $: any;

@Component({
  selector: 'app-royalmail-inte',
  templateUrl: './royalmail-inte.component.html',
  styleUrls: ['./royalmail-inte.component.css']
})
export class RoyalmailInteComponent implements OnInit {
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
  constructor(private dpdIntiService: RoyalIntiService, private toasterService: ToasterService) { }

  ngOnInit(): void {
    //console.log(this.courrierDetails);
    this.isEnabled=this.courrierDetails?.enable;
    this.getIntegrateDetails();
  }
  royalmailDoc(){
    $('#royalmail-modal').modal('show');
  }
  royalmailDocclosed(){
    $('#royalmail-modal').modal('hide');
  }
  save() {
    if (this.accountnumber == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Royalmail Integration', 'Please enter accountnumber');
      return;
    }
    if (this.apiusername == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Royalmail Integration', 'Please enter api user name');
      return;
    }
    if (this.apipassword == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Royalmail Integration', 'Please enter api password');
      return;
    }
    if (this.internationalapiusername == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Royalmail Integration', 'Please enter international username');
      return;
    }
    if (this.internationpassword == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Royalmail Integration', 'Please enter international password');
      return;
    }
    if (this.contactname == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Royalmail Integration', 'Please enter contact name');
      return;
    }
    if (this.companyname == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Royalmail Integration', 'Please enter company name');
      return;
    }
    if (this.streetname == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Royalmail Integration', 'Please enter streetname');
      return;
    }
    if (this.picktown == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Royalmail Integration', 'Please enter pickup town');
      return;
    }
    if (this.pickpostcode == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Royalmail Integration', 'Please enter pickup postcode');
      return;
    }
    if (this.contactphonenumber == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Royalmail Integration', 'Please enter contact phone number');
      return;
    }
    // if (this.exportEntrynumber == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Royalmail Integration', 'Please enter entry number');
    //   return;
    // }
    // if (this.certificatenumber == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Royalmail Integration', 'Please enter certificate number');
    //   return;
    // }
    // if (this.clientcode == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Royalmail Integration', 'Please enter client code');
    //   return;
    // }
    // if (this.vatnumber == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Royalmail Integration', 'Please enter vat number');
    //   return;
    // }
    // if (this.exporttype == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Royalmail Integration', 'Please enter export type');
    //   return;
    // }
    // if (this.tariffcode == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Royalmail Integration', 'Please enter tariffcode');
    //   return;
    // }

    // if (this.deliveryinstruction_1 == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Royalmail Integration', 'Please select delivery instruction');
    //   return;
    // }


    let body = {
      "courierId": 4,
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
        "rmAccountNumber": this.accountnumber,
        "rmNDAccountUsername": this.apiusername,
        "rmNDAccountPassword":this.apipassword,
        "rmNDAccountUsernameInternational": this.internationalapiusername,
        "rmNDAccountPasswordInternational": this.internationpassword,
        "cn23ExportEntryNumber": this.exportEntrynumber,
        "cn23LicenseCertificateNumber": this.certificatenumber,
        "cn23CustomClientCode": this.clientcode,
        "cn23ConsigneeVatNumber": this.vatnumber,
        "cn23DescriptionOfExportType": this.exporttype,
        "hsTariffCode": this.tariffcode,
        "rmNDPickupCompany": this.companyname,
        "rmNDPickupStreet": this.streetname,
        "rmNDPickupTown": this.picktown,
        "rmNDPickupZip": this.pickpostcode,
        "rmNDPickupName": this.contactname,
        // "rmNDPickupCountry": this.p,
        "rmNDPickupPhone": this.contactphonenumber,
        "royalmailnondeliveryinstruction": this.deliveryinstruction_1
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
          //this.clear();
          Swal.fire(
            'Successfully saved!',
            '',
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


  getIntegrateDetails() {
    this.dpdIntiService.getIntegrateDetails(this.courrierDetails.id).subscribe((res: any) => {
      // console.log(res);
      this.accountnumber =  res?.shippingRules?.rmAccountNumber;
      this.apiusername =  res?.shippingRules?.rmNDAccountUsername;
      this.apipassword =  res?.shippingRules?.rmNDAccountPassword;
      this.internationalapiusername = res?.shippingRules?.rmNDAccountUsernameInternational;
      this.internationpassword = res?.shippingRules?.rmNDAccountPasswordInternational;

      this.contactname =  res?.shippingRules?.rmNDPickupName;
      this.companyname =  res?.shippingRules?.rmNDPickupCompany;
      this.streetname =  res?.shippingRules?.rmNDPickupStreet;
      this.picktown =  res?.shippingRules?.rmNDPickupTown;
      this.pickpostcode =  res?.shippingRules?.rmNDPickupZip;

      this.contactphonenumber =  res?.shippingRules?.rmNDPickupPhone;

      this.exportEntrynumber =  res?.shippingRules?.cn23ExportEntryNumber;
      this.certificatenumber =  res?.shippingRules?.cn23LicenseCertificateNumber;
      this.clientcode =  res?.shippingRules?.cn23CustomClientCode;
      this.vatnumber =  res?.shippingRules?.cn23ConsigneeVatNumber;
      this.exporttype =  res?.shippingRules?.cn23DescriptionOfExportType;
      this.tariffcode =  res?.shippingRules?.hsTariffCode;
      this.deliveryinstruction_1 =  res?.shippingRules?.royalmailnondeliveryinstruction;
      this.selectedShippingServices = res?.shippingRules?.labelServiceClassDMList.map(i => i.code);
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
