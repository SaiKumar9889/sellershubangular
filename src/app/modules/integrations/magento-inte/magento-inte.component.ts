import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import Swal from 'sweetalert2';
import { MagnetoInteService } from '../services/magneto-inte.service';
@Component({
  selector: 'app-magento-inte',
  templateUrl: './magento-inte.component.html',
  styleUrls: ['./magento-inte.component.scss']
})
export class MagentoInteComponent implements OnInit {
  listing = false;
  newTemplate = false;
  @Input() isNewIntegration = false;
  @Input() channelId: any;
  loading: boolean = false;
  catLogIsChecked: boolean = false;
  ordersIsChecked: boolean = false;
  name: string = '';
  username:string = '';
  password:string = '';apiversion: string = '';attributesetid: string = '';
  apiUrl: string = '';code: string = '';storeview: string = '';rootcategoryid: string = '';
  constructor(private datasharingService: DatasharingService, private MagnetoInteService: MagnetoInteService, private toasterService: ToasterService) { }

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
    this.MagnetoInteService.getAllreadyIntegratedData(channelId).subscribe((res: any) => {
      console.log(res);
      // this.apipassword = res?.apiKey;
      // this.url = res?.apiUrl;
      this.name = res?.name;
      // this.apisecret = res?.secretKey;
      // this.url=res?.apiUrl;
      this.ordersIsChecked = res?.downloadOrders;
      this.catLogIsChecked = res?.downloadInventory;
      // this.importToshopify = res?.importshopifyorder;
      this.loading = false;
    });
  }
  saveMagentoData() {
    if (this.name == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Magento Integration', 'Please enter name');
      return;
    }
    if (this.username == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Magento Integration', 'Please enter username');
      return;
    }
    if (this.apiUrl == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Magento Integration', 'Please enter url');
      return;
    }
    if (this.code == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Magento Integration', 'Please enter code');
      return;
    }
    if (this.rootcategoryid == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Magento Integration', 'Please enter root category id');
      return;
    }
    if (this.storeview == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Magento Integration', 'Please enter store view');
      return;
    }
    if (this.attributesetid == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Magento Integration', 'Please enter attribute set id');
      return;
    }
    if (this.apiversion == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Magento Integration', 'Please enter api version');
      return;
    }
    if (this.password == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Magento Integration', 'Please enter password');
      return;
    }


    let aData = {
      "id": localStorage.getItem("userId"),
      "type": "magento",
      "downloadInventory": this.catLogIsChecked,
      "downloadOrders": this.ordersIsChecked,
      "username": this.username,
      "password": this.password,
      "name": this.name,
      "apiUrl": this.apiUrl,
      "code": this.code,
      "storeview": this.storeview,
      "apiversion": this.apiversion,
      "rootcategoryid": this.rootcategoryid,
      "attributesetid": this.attributesetid
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
        this.MagnetoInteService.createIntegratedData(aData).subscribe((res: any) => {
          // console.log(res);
          this.channelId = res.id;
          this.isNewIntegration = false;
        }, error => {
          ////console.log(error);
        });
        Swal.fire(
          'Marketplace Store is integrated!',
          'Magento integration done.',
          'success'
        )
      }
    });
  }
  updateMagentoData() {
    if (this.name == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Magento Integration', 'Please enter name');
      return;
    }
    if (this.username == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Magento Integration', 'Please enter username');
      return;
    }
    if (this.apiUrl == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Magento Integration', 'Please enter url');
      return;
    }
    if (this.code == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Magento Integration', 'Please enter code');
      return;
    }
    if (this.rootcategoryid == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Magento Integration', 'Please enter root category id');
      return;
    }
    if (this.storeview == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Magento Integration', 'Please enter store view');
      return;
    }
    if (this.attributesetid == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Magento Integration', 'Please enter attribute set id');
      return;
    }
    if (this.apiversion == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Magento Integration', 'Please enter api version');
      return;
    }
    if (this.password == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Magento Integration', 'Please enter password');
      return;
    }



    let aData = {
      "id": localStorage.getItem("userId"),
      "type": "magento",
      "downloadInventory": this.catLogIsChecked,
      "downloadOrders": this.ordersIsChecked,
      "username": this.username,
      "password": this.password,
      "name": this.name,
      "apiUrl": this.apiUrl,
      "code": this.code,
      "storeview": this.storeview,
      "apiversion": this.apiversion,
      "rootcategoryid": this.rootcategoryid,
      "attributesetid": this.attributesetid
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
        this.MagnetoInteService.updateIntegratedData(aData).subscribe((res: any) => {
          // console.log(res);
          this.channelId = res.id;
          this.isNewIntegration = false;
        }, error => {
          ////console.log(error);
        });
        Swal.fire(
          'Marketplace Store is integrated!',
          'Magento integration done.',
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
        this.MagnetoInteService.testConnection(this.channelId).subscribe((res: any) => {
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
        this.MagnetoInteService.downloadAllProducts(this.channelId).subscribe(res => {
          ////console.log(res)
        }, error => {
          //console.log(error?.error);
          });
        Swal.fire(
          'Magento integration!',
          'Download Products Request Done.',
          'success'
        )
      }
    });
  }
  deleteMagentoAccount() {
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
        this.MagnetoInteService.deleteAmazonAccount(this.channelId).subscribe(res => {
          ////console.log(res)
        });
        Swal.fire(
          'Magento integration!',
          'Magento account is removed.',
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
