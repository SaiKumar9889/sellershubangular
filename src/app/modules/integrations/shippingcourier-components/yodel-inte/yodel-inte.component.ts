import { Component, Input, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import Swal from 'sweetalert2';
import { DxIntiService } from '../../services/dx-inti.service';
import { YodalInteService } from '../../services/yodal-inte.service';

@Component({
  selector: 'app-yodel-inte',
  templateUrl: './yodel-inte.component.html',
  styleUrls: ['./yodel-inte.component.css']
})
export class YodelInteComponent implements OnInit {
  @Input() courrierDetails;
  loading:boolean=false;
  accountnumber: any = '';
  username: any = '';
  password: any = '';
  contactname: any = '';
  companyname: any = '';
  streetname: any = '';
  picktown: any = '';
  pickpostcode: any = '';
  pickphonenumber: any = '';
  isEnabled:boolean=false;
  constructor(private dpdIntiService: YodalInteService, private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.isEnabled=this.courrierDetails?.enable;
    this.getIntegrateDetails();
  }
  save() {
    if (this.accountnumber == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Yodel Integration', 'Please enter accountnumber');
      return;
    }
    if (this.username == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Yodel Integration', 'Please enter username');
      return;
    }
    if (this.password == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Yodel Integration', 'Please enter password');
      return;
    }
    if (this.contactname == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Yodel Integration', 'Please enter contactname');
      return;
    }
    if (this.companyname == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Yodel Integration', 'Please enter companyname');
      return;
    }
    if (this.streetname == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Yodel Integration', 'Please enter streetname');
      return;
    }
    if (this.picktown == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Yodel Integration', 'Please enter picktown');
      return;
    }
    if (this.pickpostcode == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Yodel Integration', 'Please enter pickpostcode');
      return;
    }
    if (this.pickphonenumber == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Yodel Integration', 'Please enter pickphonenumber');
      return;
    }


    let body = {
      "courierId": 12,
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
        "rmAccountNumber": this.accountnumber,
        "rmNDAccountUsername": this.username,
        "rmNDAccountPassword": this.password,

        "rmNDPickupCompany": this.companyname,
        "rmNDPickupStreet": this.streetname,
        "rmNDPickupTown": this.picktown,
        "rmNDPickupZip": this.pickpostcode,
        "rmNDPickupName": this.contactname,
        // "rmNDPickupCountry": this.p,
        "rmNDPickupPhone": this.pickphonenumber,
        "royalmailnondeliveryinstruction": "NONE"
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
            'Yodel Integration done.',
            'success'
          )
        });
      }
    });

  }

  clear() {
    this.accountnumber = '';
    this.username = '';
    this.password = '';
    this.contactname = '';
    this.companyname = '';
    this.streetname = '';
    this.picktown = '';
    this.pickpostcode = '';
    this.pickphonenumber = '';
  }

  selectedLabels: any = [];

  getIntegrateDetails() {
    this.dpdIntiService.getIntegrateDetails(this.courrierDetails.id).subscribe((res: any) => {
      ////console.log(res);
      this.accountnumber = res?.shippingRules?.rmAccountNumber;
      this.username = res?.shippingRules?.rmNDAccountUsername;
      this.password = res?.shippingRules?.rmNDAccountPassword;
      this.contactname = res?.shippingRules?.rmNDPickupName;
      this.companyname = res?.shippingRules?.rmNDPickupCompany;
      this.streetname = res?.shippingRules?.rmNDPickupStreet;
      this.picktown = res?.shippingRules?.rmNDPickupTown;
      this.pickpostcode = res?.shippingRules?.rmNDPickupZip;
      this.pickphonenumber = res?.shippingRules?.rmNDPickupPhone;
      //console.log(res?.labelServiceClassDMList);
      this.selectedLabels = res?.labelServiceClassDMList != undefined ? res?.labelServiceClassDMList : [];
      this.selectedLabels = this.selectedLabels.map(sl=>sl.code);
      const ids = this.selectedLabels.map(sl => sl.code);
      //console.log(this.selectedLabels);
    });
  }

  getCheckStatus(name: any) {
    // let chkst = this.selectedLabels.find(sl => sl.code == name);
    if (this.selectedLabels.includes(name))
      return true;
    else
      return false;
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
