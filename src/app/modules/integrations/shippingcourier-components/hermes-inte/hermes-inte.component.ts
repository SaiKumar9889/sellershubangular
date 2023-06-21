import { Component, Input, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import Swal from 'sweetalert2';
import { HermsIntiService } from '../../services/herms-inti.service';

@Component({
  selector: 'app-hermes-inte',
  templateUrl: './hermes-inte.component.html',
  styleUrls: ['./hermes-inte.component.scss']
})
export class HermesInteComponent implements OnInit {
  loading = false;
  @Input() courrierDetails;
  isEnabled = false;

  nickname;
  clientid;
  clientsecret;
  accesscode;
  labelFormat = 'a4';
  labelType = 'pdf';
  accountType = 'businessAccount';

  constructor(private hermsService: HermsIntiService, private toasterService: ToasterService) { }
  selectedShippingServices: any = [];
  ngOnInit(): void {
    // //console.log(this.courrierDetails);
    this.isEnabled = this.courrierDetails?.enable;
    this.getIntegrateDetails();
  }
  getIntegrateDetails() {
    // this.courrierDetails.id
    this.hermsService.getIntegrationDetials(9).subscribe((res: any) => {
      this.nickname = res?.shippingRules?.webshippername;
      this.clientid = res?.shippingRules?.webshippercompany;
      this.clientsecret = res?.shippingRules?.webshipperpassword;
      this.accesscode = res?.shippingRules?.webshipperemail;
      this.labelFormat = res?.shippingRules?.webshippercity;
      this.labelType = res?.shippingRules?.webshipperusername;
      this.accountType = res?.shippingRules?.webshippershopname;

      this.selectedShippingServices = res?.dpdCourierResponse?.services.map(sr => sr.code);
    });
  }

  save() {
    if (this.nickname == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Hermes Integration', 'Please enter nickname');
      return;
    }
    if (this.clientid == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Hermes Integration', 'Please enter client id');
      return;
    }
    if (this.clientsecret == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Hermes Integration', 'Please enter clientscecret');
      return;
    }
    if (this.accesscode == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Hermes Integration', 'Please enter accesscode');
      return;
    }


    let body = {
      "courierId": 9,
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
        "value1": this.selectedShippingServices,
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
        "webshippername": this.nickname,
        "webshippercompany": this.clientid,
        "webshipperstreet1": "",
        "webshippercity": this.labelFormat,
        "webshipperstate": "",
        "webshipperzip": "",
        "webshippercountry": "",
        "webshipperphone": "",
        "webshipperemail": this.accesscode,
        "webshippershopname": this.accountType,
        "webshipperusername": this.labelType,
        "webshipperpassword": this.clientsecret
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
        this.hermsService.saveIntegrationDetials(body).subscribe(res => {
          this.loading = false;
          this.clear();
          Swal.fire(
            'Shippingcourier is integrated!',
            'Herms integration done.',
            'success'
          )
        });
      }
    });
  }

  connect() {

  }

  clear() {

  }

}
