import { Component, OnInit } from '@angular/core';
import { AmazonStockService } from '../services/amazon-stock.service';
import { environment } from 'src/environments/environment';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
declare let $: any;
@Component({
  selector: 'app-amazon-stock-repricer',
  templateUrl: './amazon-stock-repricer.component.html',
  styleUrls: ['./amazon-stock-repricer.component.scss']
})
export class AmazonStockRepricerComponent implements OnInit {

  loading = false;
  allItemsPage = true;
  itemToRepairPage = false;
  itemNotResetPage = false;

  products = [];
  stockRepricerItems = [];
  notReseterItems = [];
  page =1;
  // pageSize = 1;
  collectionsize = environment.defaultTotalValue;
  pageSize = environment.defaultPaginationValue;
  constructor(private appTrackingService:AppTrackingService,public amazonStockService: AmazonStockService) {
    let ip:usertrackInput={menu:TrackMenus.AMAZONSTOCKREPRICER,submenu:subMenus.OTHERS,page:pages.AMAZONSTOCKREPRICERPAGE,function:"",descrption:"Amazon stock repricer page loaded"};
    this.appTrackingService.trackUserActivity(ip);
   }

  ngOnInit(): void {
    // this.loading = true;
    this.stockfindAllItems();
  }


  showPage(all, page, reset){
  this.allItemsPage = all;
  this.itemToRepairPage = page;
  this.itemNotResetPage = reset;
  }

  stockfindAllItems(){
     this.loading = true;
    this.amazonStockService.stockfindAllItems(this.page,this.collectionsize).subscribe((result:any)=>{
      console.log(result);
      this.page = result?.page?.currentPageNumber;
      this.collectionsize = result?.page?.totalResults;
      this.products = result?.products;
      this.loading = false;
    }, error=>{
       this.loading = false;
      console.log(error);
    })
  }

  findStockRepriceItems(){
     this.loading = true;
    this.amazonStockService.findStockRepriceItems(this.page,this.collectionsize).subscribe((result:any)=>{
      console.log(result);
        this.page = result?.page?.currentPageNumber;
        this.collectionsize = result?.page?.totalResults;
        this.stockRepricerItems = result?.repricingproducts;
        this.loading = false;
    }, error=>{
      console.log(error);
    })
  }


  findNotReseterItems(){
    this.amazonStockService.findNotReseterItems(this.page, this.collectionsize).subscribe((result:any)=>{
      console.log(result);
        this.page = result?.page?.currentPageNumber;
        this.collectionsize = result?.page?.totalResults;
        this.notReseterItems = result?.notrepricingproducts;
        this.loading = false;
    }, error=>{
      console.log(error);
    })
  }


  clearPagination(){
    this.collectionsize = 0;
    this.page = 1;
    this.pageSize = environment.defaultPaginationValue;
  }

  changespage(event){
    this.page = event;
    this.stockfindAllItems()
  }

  changesItempage(event){
     this.page = event;
   this.findStockRepriceItems();
  }

  changesResetpage(event){
  this.page = event;
  this.findNotReseterItems()
  }
  onBulkupdate(){
    $('#bulk-update-modal').modal('show');
  }
  modalclosed(){
    $('#bulk-update-modal').modal('hide');
  }
  findallitems(s, r){}

  findnotresetitems(a, f){}

  findstockrepriceritems(se,s){

  }
  checkallitems(){

  }
  checkallrepriceritems(){

  }
  updatesallproducts(){

  }
  checkallnotrepriceritems(){

  }

}
