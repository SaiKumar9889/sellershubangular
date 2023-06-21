import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import Swal from 'sweetalert2';
import { VolusionInteService } from '../../services/volusion-inte.service';
import { WalmartInteService } from '../../services/walmart-inte.service';
@Component({
  selector: 'app-volusion',
  templateUrl: './volusion.component.html',
  styleUrls: ['./volusion.component.scss']
})
export class VolusionComponent implements OnInit {
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
  constructor(private datasharingService: DatasharingService, private VolusionInteService: VolusionInteService,  private toasterService: ToasterService) { }

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
    this.VolusionInteService.getAllreadyIntegratedData(channelId).subscribe((res: any) => {
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
  savewalmartData() {
    if (this.name == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'walmart Integration', 'Please enter name');
      return;
    }
    if (this.apisecret == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'walmart Integration', 'Please enter api secret');
      return;
    }
    if (this.url == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'walmart Integration', 'Please enter url');
      return;
    }
    // if (this.productType == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Shopify Integration', 'Please enter default product type');
    //   return;
    // }


    let aData = {
      "id": localStorage.getItem("userId"),
      "name": this.name,
      "type": "opencart",
      "secretKey": this.apisecret,
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
        this.VolusionInteService.createIntegratedData(aData).subscribe((res: any) => {
          // console.log(res);
          this.channelId = res.id;
          this.isNewIntegration = false;
        }, error => {
          ////console.log(error);
        });
        Swal.fire(
          'Marketplace Store is integrated!',
          'walmart integration done.',
          'success'
        )
      }
    });
  }
  updatewalmartData() {
    if (this.name == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'walmart Integration', 'Please enter name');
      return;
    }
    if (this.apisecret == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'walmart Integration', 'Please enter api secret');
      return;
    }
    if (this.url == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'walmart Integration', 'Please enter url');
      return;
    }
    // if (this.productType == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Shopify Integration', 'Please enter default product type');
    //   return;
    // }


    let aData = {
      "id": localStorage.getItem("userId"),
      "name": this.name,
      "type": "opencart",
      "secretKey": this.apisecret,
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
        this.VolusionInteService.updateIntegratedData(aData).subscribe((res: any) => {
          // console.log(res);
          this.channelId = res.id;
          this.isNewIntegration = false;
        }, error => {
          ////console.log(error);
        });
        Swal.fire(
          'Marketplace Store is integrated!',
          'walmart integration done.',
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
        this.VolusionInteService.testConnection(this.channelId).subscribe((res: any) => {
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
        this.VolusionInteService.downloadAllProducts(this.channelId).subscribe(res => {
          ////console.log(res)
        }, error => {
          //console.log(error?.error);
          });
        Swal.fire(
          'walmart integration!',
          'Download Products Request Done.',
          'success'
        )
      }
    });
  }
  deletewalmartAccount() {
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
        this.VolusionInteService.deleteAmazonAccount(this.channelId).subscribe(res => {
          ////console.log(res)
        });
        Swal.fire(
          'walmart integration!',
          'walmart account is removed.',
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
