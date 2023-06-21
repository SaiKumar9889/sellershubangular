import { Component, OnInit } from '@angular/core';
import { AmazonStockService } from '../services/amazon-stock.service';
import { ChannelIntegrationService } from '../services/channel-integration.service';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';

@Component({
  selector: 'app-amazon-stock-repricer-settings',
  templateUrl: './amazon-stock-repricer-settings.component.html',
  styleUrls: ['./amazon-stock-repricer-settings.component.scss']
})
export class AmazonStockRepricerSettingsComponent implements OnInit {

  constructor(public amazonStockService: AmazonStockService,  private toasterService: ToasterService,
    private channelintegrationService: ChannelIntegrationService,) { }
  listPage = true;
  editSettings = false;
  channelId:any;
  decrevalue:any;
  loading = false;
  allChannel = [];
  collectionsize = 100;
  pageSize =10;
  page =1; 
  ngOnInit(): void {
    this.getChannelRegistration();
  }

  getChannelRegistration() {
    this.loading = true;
    this.channelintegrationService.getChannelRegistration().subscribe((res: any) => {
      this.collectionsize = res?.page?.totalResults;
      this.page = res?.page?.currentPageNumber;
      console.log(this.allChannel); 
      this.allChannel = res.filter(item=>item.type === 'amazon');
      // if (this.allChannel.length > 0)
        // this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      this.loading = false;
    }, error => {
      this.loading = false;
      console.error(error);
      // this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };

  changespage(){

  }

  updateStockrepricer(){
    this.loading = true;
    this.amazonStockService.updateRepricerRules(this.channelId, this.decrevalue).subscribe(result=>{
      console.log(result);
      this.listPage = true;
      this.editSettings = false;
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'Amazon Stockpricer setting', 'success');
    }, error=>{
      console.log(error);
    })
  }

  getAmazonRepriceRules(id){
    this.editSettings = true;
    this.loading = true;
    this.listPage = false;
    this.amazonStockService.getAmazonRepriceRules(this.channelId).subscribe(result=>{
      console.log(result);
      this.loading = false;
    }, error=>{
      this.loading = false;
      console.log(error);
    })
  }


  removeMarketPlace(event){

  }

  editIntegration(event){

  }
  
}
