import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import Swal from 'sweetalert2';
import { XcartInteService } from '../services/xcart-inte.service';

@Component({
  selector: 'app-xcart',
  templateUrl: './xcart.component.html',
  styleUrls: ['./xcart.component.scss']
})
export class XcartComponent implements OnInit {
  @Input() isNewIntegration = false;
  @Input() channelId: any;
  loading: boolean = false;
  catLogIsChecked: boolean = false;
  ordersIsChecked: boolean = false;
  name: string = '';
  apisecret: string = '';
  url: string = '';
  apikey: string = '';
  constructor(private datasharingService: DatasharingService, private XcartInteService: XcartInteService, private toasterService: ToasterService) { }

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
    this.XcartInteService.getAllreadyIntegratedData(channelId).subscribe((res: any) => {
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
  saveOpencartData() {
    if (this.name == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Opencart Integration', 'Please enter name');
      return;
    }
    if (this.apikey == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Opencart Integration', 'Please enter api key');
      return;
    }
    if (this.url == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Opencart Integration', 'Please enter url');
      return;
    }
    // if (this.productType == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Shopify Integration', 'Please enter default product type');
    //   return;
    // }


    let aData = {
      "id": localStorage.getItem("userId"),
      "name": this.name,
      "type": "xcart",
      "apiKey": this.apikey,
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
        this.XcartInteService.createIntegratedData(aData).subscribe((res: any) => {
          // console.log(res);
          this.channelId = res.id;
          this.isNewIntegration = false;
        }, error => {
          ////console.log(error);
        });
        Swal.fire(
          'Marketplace Store is integrated!',
          'Opencart integration done.',
          'success'
        )
      }
    });
  }
  updateOpencartData() {
    if (this.name == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Opencart Integration', 'Please enter name');
      return;
    }
    if (this.apikey == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Opencart Integration', 'Please enter api key');
      return;
    }
    if (this.url == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Opencart Integration', 'Please enter url');
      return;
    }
    // if (this.productType == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Shopify Integration', 'Please enter default product type');
    //   return;
    // }


    let aData = {
      "id": localStorage.getItem("userId"),
      "name": this.name,
      "type": "xcart",
      "apiKey": this.apikey,
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
        this.XcartInteService.updateIntegratedData(aData).subscribe((res: any) => {
          // console.log(res);
          this.channelId = res.id;
          this.isNewIntegration = false;
        }, error => {
          ////console.log(error);
        });
        Swal.fire(
          'Marketplace Store is integrated!',
          'Opencart integration done.',
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
        this.XcartInteService.testConnection(this.channelId).subscribe((res: any) => {
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
        this.XcartInteService.downloadAllProducts(this.channelId).subscribe(res => {
          ////console.log(res)
        }, error => {
          //console.log(error?.error);
          });
        Swal.fire(
          'Opencart integration!',
          'Download Products Request Done.',
          'success'
        )
      }
    });
  }
  deleteOpencartAccount() {
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
        this.XcartInteService.deleteAmazonAccount(this.channelId).subscribe(res => {
          ////console.log(res)
        });
        Swal.fire(
          'Opencart integration!',
          'Opencart account is removed.',
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
