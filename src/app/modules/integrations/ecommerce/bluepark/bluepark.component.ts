import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import Swal from 'sweetalert2';
import { BlueparkInteService } from '../../services/bluepark-inte.service';
@Component({
  selector: 'app-bluepark',
  templateUrl: './bluepark.component.html',
  styleUrls: ['./bluepark.component.scss']
})
export class BlueparkComponent implements OnInit {
  listing = false;
  newTemplate = false;
  @Input() isNewIntegration = false;
  @Input() channelId: any;
  loading: boolean = false;
  catLogIsChecked: boolean = false;
  ordersIsChecked: boolean = false;
  name: string = '';
  apisecret: string = '';
  url: string = '';
  apiuser: string = '';
  apikey: string = ''
  constructor(private datasharingService: DatasharingService, private BlueparkInteService: BlueparkInteService, private toasterService: ToasterService) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    ////console.log(changes.isNewIntegration.currentValue);
    ////console.log(changes.channelId.currentValue);

    if (!this.isNewIntegration) {
      this.getExistingDetails(this.channelId);
    }
  }
  getExistingDetails(channelId: any) {
    this.loading = true;
    this.BlueparkInteService.getAllreadyIntegratedData(channelId).subscribe((res: any) => {
      console.log(res);
      // this.apipassword = res?.apiKey;
      // this.url = res?.apiUrl;
      this.name = res?.name;
      this.apisecret = res?.secretKey;
      this.url=res?.apiUrl;
      this.ordersIsChecked = res?.downloadOrders;
      this.catLogIsChecked = res?.downloadInventory;
      // this.importToshopify = res?.importshopifyorder;
      this.loading = false;
    });
  }
  saveBlueparkData() {
    if (this.name == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Bluepark Integration', 'Please enter name');
      return;
    }
    if (this.apikey == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Bluepark Integration', 'Please enter api key');
      return;
    }
    if (this.url == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Bluepark Integration', 'Please enter url');
      return;
    }
    if (this.apiuser == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Shopify Integration', 'Please enter api user');
      return;
    }


    let aData = {
      "id": localStorage.getItem("userId"),
      "name": this.name,
      "type": "bluepark",
      "apiusername": this.apiuser,
      "apipassword": this.apikey,
      "apiUrl": this.url,
      "downloadInventory": this.catLogIsChecked,
      "downloadOrders": this.ordersIsChecked,
  
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
        this.BlueparkInteService.createIntegratedData(aData).subscribe((res: any) => {
          // console.log(res);
          this.channelId = res.id;
          this.isNewIntegration = false;
        }, error => {
          ////console.log(error);
        });
        Swal.fire(
          'Marketplace Store is integrated!',
          'Bluepark integration done.',
          'success'
        )
      }
    });
  }
  updateBlueparkData() {
    if (this.name == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Bluepark Integration', 'Please enter name');
      return;
    }
    if (this.apikey == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Bluepark Integration', 'Please enter api key');
      return;
    }
    if (this.url == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Bluepark Integration', 'Please enter url');
      return;
    }
    if (this.apiuser == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Shopify Integration', 'Please enter api user');
      return;
    }


    let aData = {
      "id": localStorage.getItem("userId"),
      "name": this.name,
      "type": "bluepark",
      "apiusername": this.apiuser,
      "apipassword": this.apikey,
      "apiUrl": this.url,
      "downloadInventory": this.catLogIsChecked,
      "downloadOrders": this.ordersIsChecked,
  
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
        this.BlueparkInteService.updateIntegratedData(aData).subscribe((res: any) => {
          // console.log(res);
          this.channelId = res.id;
          this.isNewIntegration = false;
        }, error => {
          ////console.log(error);
        });
        Swal.fire(
          'Marketplace Store is integrated!',
          'Bluepark integration done.',
          'success'
        )
      }
    });
  }
  testConnection() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to test connection !",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then(async (result) => {
      //////console.log(result);
      if (result?.value) {
        this.BlueparkInteService.testConnection(this.channelId).subscribe((res: any) => {
          //console.log(res);
          Swal.fire(JSON.stringify(res));
        }, error => {
          //console.log(error?.error);
          Swal.fire(error?.error?.text);
        });
      }
    });
  }
  downloadOrders() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to download products !",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then(async (result) => {
      ////console.log(result);
      if (result?.value) {
        this.BlueparkInteService.downloadAllProducts(this.channelId).subscribe(res => {
          ////console.log(res)
        }, error => {
          //console.log(error?.error);
          });
        Swal.fire(
          'Bluepark integration!',
          'Download Products Request Done.',
          'success'
        )
      }
    });
  }
  deleteBlueparkAccount() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete integration !",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then(async (result) => {
      ////console.log(result);
      if (result?.value) {
        this.BlueparkInteService.deleteAmazonAccount(this.channelId).subscribe(res => {
          ////console.log(res)
        });
        Swal.fire(
          'Bluepark integration!',
          'Bluepark account is removed.',
          'success'
        )
      }
    });
  }
  catlogChanged(selected: any) {
    switch (selected) {
      case 'a':
        this.catLogIsChecked = !this.catLogIsChecked;
        break;
      case 'b':
        this.ordersIsChecked = !this.ordersIsChecked;
        break;
      default:
        break;
    }
  }
  closeIntegration() {
    this.datasharingService.closeIntegrationTab();
  }
}
