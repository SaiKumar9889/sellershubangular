import { Component, Input, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import Swal from 'sweetalert2';
import { DpdIntiService } from '../../services/dpd-inti.service';

@Component({
  selector: 'app-click-drop',
  templateUrl: './click-drop.component.html',
  styleUrls: ['./click-drop.component.css']
})
export class ClickDropComponent implements OnInit {

  @Input() courrierDetails;
  accesstocken:any='';
  loading:boolean=false;
  constructor( private intiService: DpdIntiService,private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.intiService.getIntegrationDetials(8).subscribe((res:any) => {
      try {
        this.accesstocken =res?.shippingRules?.royalMailToken;
      } catch (e) {
        console.error(e);
      }

      //console.log(res)
    }, error => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Click & Drop ', 'Error occured');
    });
  }

  save(){

    if (this.accesstocken == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Click & Drop Integration', 'Please royal mail access token');
      return;
    }

    let body = {
      "courierId": 8,
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

        royalMailToken: this.accesstocken
      }
    }
    this.intiService.saveIntegrationDetials(body).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Click & Drop ', 'Successfully saved');
    }, error => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Click & Drop ', 'Error occured');
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
