import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import Swal from 'sweetalert2';
import { BigcommerceInteService } from '../../services/bigcommerce-inte.service';
import { ShopwiredInteService } from '../../services/shopwired-inte.service';

@Component({
  selector: 'app-bigcommerce',
  templateUrl: './bigcommerce.component.html',
  styleUrls: ['./bigcommerce.component.scss']
})
export class BigcommerceComponent implements OnInit {
  @Input() isNewIntegration = false;
  @Input() channelId: any;
  listing = false;
  newTemplate = false;
  ordersIsChecked: boolean = false;
  userId: any = '';
  catLogIsChecked: boolean = false;
  loading: boolean = false;
  clientid: any = '';
  name: string = '';
  apipath: any = '';
  secret: any = '';
  token: any = '';
  url: any = '';
  constructor(private datasharingService: DatasharingService, private BigcommerceInteService: BigcommerceInteService, private toasterService: ToasterService) { }

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
    this.BigcommerceInteService.getAllreadyIntegratedData(channelId).subscribe((res: any) => {
      // console.log(res);
      // this.name = res?.name;
      // this.apikey = res?.apiusername;
      // this.apisecret = res?.apipassword;
      this.ordersIsChecked = res?.downloadOrders;
      this.catLogIsChecked = res?.downloadInventory;
      // this.importToShopwired=res?.importShopwiredorder;
      this.loading = false;
    });
  }
  saveShopwiredData() {
    // if (this.name == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Shopwired Integration', 'Please enter name');
    //   return;
    // }
    // if (this.apikey == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Shopwired Integration', 'Please enter api key');
    //   return;
    // }
    // if (this.apisecret == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Shopwired Integration', 'Please enter api password');
    //   return;
    // }
    // if (this.productType == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Shopwired Integration', 'Please enter default product type');
    //   return;
    // }


    let aData = {
      // "kartzhubUserId": localStorage.getItem("userId"),
      // "type": "shopwired",
      // "name": this.name,
      // "apiusername": this.apikey,
      // "apipassword": this.apisecret,

      // "downloadInventory": this.catLogIsChecked,
      // "downloadOrders": this.ordersIsChecked

      "id": localStorage.getItem("userId"),
      "type": "bigcommerce",
      "apiusername": this.clientid,
      "apipassword": this.secret,
      "apiKey": this.token,
      "name": this.name,
      "apiUrl": this.apipath,
      "code": '',
      "storeview": '',
      "apiversion": '',
      "rootcategoryid": '',
      "attributesetid": '',
      "downloadInventory": this.catLogIsChecked,
      "downloadOrders": this.ordersIsChecked,
      "downloadnewitemsonly": false,
      "overrideinventory": false,
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
        this.BigcommerceInteService.createIntegratedData(aData).subscribe((res: any) => {
          // console.log(res);
          this.channelId = res.id;
          this.isNewIntegration = false;
        }, error => {
          console.log(error);

        });
        Swal.fire(
          'eCom Store is integrated!',
          'Shopwired integration done.',
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
        this.BigcommerceInteService.testConnection(this.channelId).subscribe((res: any) => {
          console.log(res);
          Swal.fire(JSON.stringify(res));
        }, error => {
          console.log(error?.error);
          Swal.fire(error?.error?.text);
        });
      }
    });
  }
  updateShopwiredData() { 
    // if (this.name == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Shopwired Integration', 'Please enter name');
    //   return;
    // }
    // if (this.apikey == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Shopwired Integration', 'Please enter api key');
    //   return;
    // }
    // if (this.apisecret == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Shopwired Integration', 'Please enter api password');
    //   return;
    // }
   
 let aData = {
      // "kartzhubUserId": localStorage.getItem("userId"),
      // "type": "shopwired",
      // "name": this.name,
      // "apiusername": this.apikey,
      // "apipassword": this.apisecret,

      // "downloadInventory": this.catLogIsChecked,
      // "downloadOrders": this.ordersIsChecked,
      // "id": this.channelId
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You want to update details !",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then(async (result) => {
      ////console.log(result);
      if (result?.value) {
        this.BigcommerceInteService.updateIntegratedData(aData).subscribe(res => {
          console.log(res);
        }, error => {
          console.log(error);
        });
        Swal.fire(
          'Shopwired integration!',
          'Shopwired details are updated.',
          'success'
        )
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
        this.BigcommerceInteService.downloadAllProducts(this.channelId).subscribe(res => {
          console.log(res);
        }, error => {
          // console.log(error);

        });
        Swal.fire(
          'Shopwired integration!',
          'Download Products Request Done.',
          'success'
        )
      }
    });
  }
  deleteShopwiredAccount() { 
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
        this.BigcommerceInteService.deleteShopWiredAccount(this.channelId).subscribe(res => {
          console.log(res)
        }, error => {
          // console.log(error);

        });
        Swal.fire(
          'Shopwired integration!',
          'Shopwired account is removed.',
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
