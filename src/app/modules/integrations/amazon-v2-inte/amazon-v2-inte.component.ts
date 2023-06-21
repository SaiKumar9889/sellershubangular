import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Utills } from 'src/app/utills/Utills';
import { Country } from 'src/app/_models/country';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import Swal from 'sweetalert2';
import { AmazonInteService } from '../services/amazon-inte.service';

@Component({
  selector: 'app-amazon-v2-inte',
  templateUrl: './amazon-v2-inte.component.html',
  styleUrls: ['./amazon-v2-inte.component.scss']
})
export class AmazonV2InteComponent implements OnInit, OnChanges {


  @Input() isNewIntegration = false;
  @Input() channelId = false;


  emailConf = false
  accountName: string = '';
  amazonSite: any = 'GB';
  sellerId: any = '';
  marketPlaceID: any = '';
  kdevid: any = '';
  authtocken: any = '';
  assosiatetag: any = '';

  catLogIsChecked: boolean = false;
  ordersIsChecked: boolean = false;
  stockRepairChecked: boolean = false;
  fbaItemsChecked: boolean = false;

  detailsSub: any;
  kartzhubUserId = '';
  countriesWithAmazon:Country[]=[];
  constructor(private amazonInteService: AmazonInteService, private toasterService: ToasterService, private datasharingService: DatasharingService) { }
  ngOnChanges(changes: SimpleChanges): void {
    ////console.log(changes.isNewIntegration.currentValue);
    ////console.log(changes.channelId.currentValue);
    this.datasharingService.getCountries();
    if (!this.isNewIntegration) {
      this.getExistingDetails(this.channelId);
    }
    this.countriesWithAmazon=this.datasharingService.getCountriesForAmazonInte();
  }
  @Input() apiData: any;
  st: any = [];
  selectedChannlesForsave(event: any) {
    this.st = event;
  }
  ngOnInit(): void {

  }

  catlogChanged(selected: any) {
    switch (selected) {
      case 'a':
        this.catLogIsChecked = !this.catLogIsChecked;
        break;
      case 'b':
        this.ordersIsChecked = !this.ordersIsChecked;
        break;
      case 'c':
        this.stockRepairChecked = !this.stockRepairChecked;
        break;
      case 'd':
        this.fbaItemsChecked = !this.fbaItemsChecked;
        break;
      default:
        break;
    }
  }

  getExistingDetails(channelId: any) {
    this.amazonInteService.getAllreadyIntegratedData(channelId).subscribe((res: any) => {
      ////console.log(res);
      this.marketPlaceID = res?.marketplaceId;
      this.kartzhubUserId = res?.kartzhubUserId;
      this.kdevid = res?.awsAccessKey;
      this.accountName = res?.name;
      this.authtocken = res?.secretKey;
      this.amazonSite = res?.site;
      this.sellerId = res?.merchantIdentifier;
      this.catLogIsChecked = res?.downloadInventory;
      this.ordersIsChecked = res?.downloadOrders;
      this.stockRepairChecked = res?.stockRepricerEnable;
      this.fbaItemsChecked = res?.fba;
      var datePipe = new DatePipe(Utills.UK_DATE);
      this.tocken=res?.token;
      // this.memberSince_dt = datePipe.transform(res?.syncSince, 'yyyy-MM-dd');
      // this.memberSince_dt = res?.syncSince;
    });
  }
  saveAmazonData() {
    if (this.accountName == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please enter account name');
      return;
    }
    if (this.amazonSite == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please select site');
      return;
    }
    // if (this.sellerId == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please enter seller id');
    //   return;
    // }
    // if (this.kdevid == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please enter Sellershub user id');
    //   return;
    // }
    // if (this.authtocken == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please enter auth tocken');
    //   return;
    // }
    // if (this.assosiatetag == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please enter tag name');
    //   return;
    // }

    let aData = {
      "kartzhubUserId": this.kartzhubUserId,
      "name": this.accountName,
      "site": this.amazonSite,  //sellerId
      "type": "amazon",
      "merchantIdentifier": this.sellerId,
      "marketplaceId": this.marketPlaceID,// kdevid
      "awsAccessKey": this.kdevid, //assosiatetag
      "secretKey": this.authtocken,
      "downloadInventory": this.catLogIsChecked,
      "downloadOrders": this.ordersIsChecked,
      "fba": this.fbaItemsChecked,
      "stockRepricerEnable": this.stockRepairChecked,
      "syncSince": this.memberSince_dt
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
        this.amazonInteService.createIntegratedData(aData).subscribe((res: any) => {
          //console.log(res);
          this.channelId = res?.id;
          this.kartzhubUserId = res?.kartzhubUserId;
          this.isNewIntegration = false;
          let sUrl:string=this.countriesWithAmazon.find(cu=>cu.country_code==this.amazonSite)?.amazonurl;
          sUrl=sUrl.replace('=example', '='+ this.kartzhubUserId+'_'+ this.channelId);
          (window as any).open(sUrl, "_blank");
          console.log(this.countriesWithAmazon)
          console.log(sUrl)
        }, error => {
          ////console.log(error);
        });
        Swal.fire(
          'Store details are saved successfully'
        )
      }
    });

  }
  tocken:any='';
  updateAmazonData() {
    if (this.accountName == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please enter account name');
      return;
    }
    if (this.amazonSite == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please select site');
      return;
    }
    if (this.sellerId == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please enter seller id');
      return;
    }
    if (this.kdevid == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please enter Sellershub user id');
      return;
    }
    if (this.authtocken == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please enter auth token');
      return;
    }
    // if (this.assosiatetag == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Amazon Integration', 'Please enter tag name');
    //   return;
    // }

    let aData = {
      "kartzhubUserId": this.kartzhubUserId,
      "name": this.accountName,
      "site": this.amazonSite,  //sellerId
      "type": "amazon",
      "merchantIdentifier": this.sellerId,
      "marketplaceId": this.marketPlaceID,// kdevid
      "awsAccessKey": this.kdevid, //assosiatetag
      "secretKey": this.authtocken,
      "downloadInventory": this.catLogIsChecked,
      "downloadOrders": this.ordersIsChecked,
      "fba": this.fbaItemsChecked,
      "stockRepricerEnable": this.stockRepairChecked,
      "syncSince": this.memberSince_dt,
      "token": this.tocken
    }
    //console.log(aData);
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
        this.amazonInteService.updateIntegratedData(aData).subscribe(res => {
          ////console.log(res);
          Swal.fire(
            'Amazon integration!',
            'Amazon details are updated.',
            'success'
          )
          let sUrl: string = this.countriesWithAmazon.find(cu => cu.country_code == this.amazonSite)?.amazonurl;
          sUrl = sUrl.replace('=example', '=' + this.kartzhubUserId + '_' + this.channelId);
          (window as any).open(sUrl, "_blank");
        }, error => {
          ////console.log(error);
          Swal.fire(
            'Amazon integration!',
            'Please complete all the details. We couldn\'t verify the amazon seller central account with the given details',
            'warning'
          )
        });

      }
    });

  }

  deleteAmazonAccount() {
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
        this.amazonInteService.deleteAmazonAccount(this.channelId).subscribe(res => {
          ////console.log(res)
        });
        Swal.fire(
          'Amazon integration!',
          'Amazon account is removed.',
          'success'
        )
      }
    });

  }

  memberSince_dt: any = '';
  memberSince(event: any) {
    ////console.log(event);
    this.memberSince_dt = event.year + '-' + event.month + '-' + event.day;
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
        this.amazonInteService.testConnection(this.channelId).subscribe((res: any) => {
          //  console.log(res);
          if (res == 'Channel Integration tested successfully') {
            Swal.fire(res);
          } else {
            Swal.fire('Please Check Credentials');
          }     
        }, error => {
          // console.log(error?.error?.text);
          if (error?.error?.text == 'Channel Integration tested successfully') {
            Swal.fire(error?.error?.text);
          } else {
            Swal.fire('Please Check Credentials');
          }
        });
      }
    });

  }

  downloadOrders() {
    this.amazonInteService.testConnection(this.channelId).subscribe((res: any) => {
      console.log(res);
      if (res == 'Channel Integration tested successfully') {
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
            this.amazonInteService.downloadAllProducts(this.channelId).subscribe(res => {
              ////console.log(res)
              Swal.fire(
                'Amazon integration!',
                'Download Products Request Done.',
                'success'
              )
            });
          }
        });
      } else {
        Swal.fire('Please Check Credentials');
      }
    }, error => {
      console.log(error?.error);
      if (error?.error?.text == 'Channel Integration tested successfully') {
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
            this.amazonInteService.downloadAllProducts(this.channelId).subscribe(res => {
              ////console.log(res)
              Swal.fire(
                'Amazon integration!',
                'Download Products Request Done.',
                'success'
              )
            });
          }
        });
      } else {
        Swal.fire('Please Check Credentials');
      }
    });

    
  }

  closeIntegration() {
    this.datasharingService.closeIntegrationTab();
  }

}
