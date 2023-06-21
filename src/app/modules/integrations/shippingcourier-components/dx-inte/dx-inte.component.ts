import { Component, Input, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import Swal from 'sweetalert2';
import { DxIntiService } from '../../services/dx-inti.service';

@Component({
  selector: 'app-dx-inte',
  templateUrl: './dx-inte.component.html',
  styleUrls: ['./dx-inte.component.css']
})
export class DXInteComponent implements OnInit {
  @Input() courrierDetails;

  customerid: any = '';
  userid: any = '';
  password: any = '';
  pickphonenum: any = '';
  pickuptown: any = '';
  picstreet: any = '';
  picklocality: any = '';
  pickupbuilding: any = '';
  pickContactname: any = '';
  pickpostcode: any = '';

  loading: boolean = false; 
  isEnabled: boolean = false; 
  constructor(private dpdIntiService: DxIntiService, private toasterService: ToasterService) { }

  ngOnInit(): void {
    //console.log(this.courrierDetails);
    this.isEnabled=this.courrierDetails?.enable;
    this.getIntegrateDetails();
  }
  save() {
    if (this.customerid == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'DX Integration', 'Please enter customer id');
      return;
    }
    if (this.userid == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'DX Integration', 'Please enter userid');
      return;
    }
    if (this.password == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'DX Integration', 'Please enter password');
      return;
    }
    if (this.pickphonenum == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'DX Integration', 'Please enter pickup number');
      return;
    }
    if (this.pickuptown == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'DX Integration', 'Please enter pickup town');
      return;
    }
    if (this.picstreet == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'DX Integration', 'Please enter pickup street');
      return;
    }
    if (this.picklocality == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'DX Integration', 'Please enter pickup locality');
      return;
    }
    if (this.pickupbuilding == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'DX Integration', 'Please enter pickup building');
      return;
    }
    if (this.pickContactname == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'DX Integration', 'Please enter pickup contact name');
      return;
    }
    if (this.pickpostcode == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'DX Integration', 'Please enter postcode');
      return;
    }

    let body = {
      "courierId": 7,
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
        "dxCustomerId": this.customerid,
        "dxPassword": this.password,
        "dxPickPhone": this.pickphonenum,
        "dxPickupBuilding": this.pickupbuilding,
        "dxPickupContactName": this.pickContactname,
        "dxPickupLocality": this.picklocality,
        "dxPickupStreet": this.picstreet,
        "dxPickupTown": this.pickuptown,
        "dxPickupZip": this.pickpostcode,
        "dxUserId": this.userid
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
        this.loading=true;
        this.dpdIntiService.saveIntegrationDetials(body).subscribe(res => {
         
          this.loading=false;
          Swal.fire(
            'Shippingcourier is integrated!',
            'DX Integration done.',
            'success'
          )
          this.clear();
        },error=>{
          this.loading=false;
          Swal.fire(
            'Shippingcourier is integrated!',
            'DX Integration done.',
            'success'
          );
          this.getIntegrateDetails();
        });
      }
    });
  }

  

  clear() {
    this.customerid = '';
    this.userid = '';
    this.password = '';
    this.pickphonenum = '';
    this.pickuptown = '';
    this.picstreet = '';
    this.picklocality = '';
    this.pickupbuilding = '';
    this.pickContactname = '';
    this.pickpostcode = '';
  }


  existingLabels:any=[];

  getIntegrateDetails() {
    this.dpdIntiService.getIntegrateDetails(this.courrierDetails.id).subscribe((res: any) => {
      ////console.log(res);
      this.customerid = res?.shippingRules?.dxCustomerId;
      this.userid = res?.shippingRules?.dxUserId;
      this.password = res?.shippingRules?.dxPassword;
      this.pickphonenum = res?.shippingRules?.dxPickPhone;
      this.pickuptown = res?.shippingRules?.dxPickupTown;
      this.picstreet = res?.shippingRules?.dxPickupStreet;
      this.picklocality = res?.shippingRules?.dxPickupLocality;
      this.pickupbuilding = res?.shippingRules?.dxPickupBuilding;
      this.pickContactname = res?.shippingRules?.dxPickupContactName;
      this.pickpostcode = res?.shippingRules?.dxPickupZip;
      this.existingLabels.concat(res?.royalMailCourierResponse?.dailyrates24);
      this.existingLabels.concat(res?.royalMailCourierResponse?.dailyrates48);
      this.existingLabels.concat(res?.royalMailCourierResponse?.flatrates24);
      this.existingLabels.concat(res?.royalMailCourierResponse?.flatrates48);
      this.existingLabels.concat(res?.royalMailCourierResponse?.internationalRates);
      this.existingLabels.concat(res?.royalMailCourierResponse?.intshippingmethods);
      this.existingLabels.concat(res?.royalMailCourierResponse?.otherlist);
      this.existingLabels.concat(res?.royalMailCourierResponse?.shippingmethods);
      this.existingLabels.concat(res?.royalMailCourierResponse?.specialdelivery);
      this.existingLabels.concat(res?.royalMailCourierResponse?.tracked24);
      this.existingLabels.concat(res?.royalMailCourierResponse?.tracked48);
      this.existingLabels.concat(res?.royalMailCourierResponse?.tracked48HV);
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
