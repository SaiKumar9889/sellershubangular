import { Component, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { ChannelScheduledListingService } from '../services/channel-scheduled-listing.service';
declare var $: any;

@Component({
  selector: 'app-channel-scheduled-listing',
  templateUrl: './channel-scheduled-listing.component.html',
  styleUrls: ['./channel-scheduled-listing.component.css']
})
export class ChannelScheduledListingComponent implements OnInit {
  constructor( private toasterService: ToasterService, private scheduleService: ChannelScheduledListingService ) { }

  ngOnInit(): void {
    this.getProducts();
  }
  pageSize = environment.defaultPaginationValue;
  total = environment.defaultTotalValue;
  collectionsize = 0;
  allProducts: any[] = [];
  searchValue: any = '';
  searchChannel: any = 'all';
  searchName: any = '0';
  productTitle:string=''; 
  productIsSelected: boolean = false;
  page:number=0;
  loading:boolean=false;
  variations;
  disVariation;
  
  modalclosed() {
    $('#search-modal').modal('hide');
  }
  changespage(page: any) {
    this.getProducts();
  }

  getProducts() {
    this.loading=true;
    this.scheduleService.getSchedulelisting().subscribe((res: any) => {
      ////console.log(res);
      this.allProducts = res?.scheduleListing;
      this.collectionsize = res?.page?.totalResults;
      this.page = res?.page?.currentPageNumber;
      this.loading = false;
      if(this.allProducts.length>0)
      this.productTitle= this.allProducts[0].title;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      this.loading=false;
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };

  isAllChecked: boolean = false;

  selectall(event: any) {
    ////console.log("selectall", event.target.value);
    this.isAllChecked = !this.isAllChecked;
    this.allProducts.map((i: any) => i.selected = this.isAllChecked);
    ////console.log(this.allProducts);
    let selectedItems = this.allProducts.filter(sale => sale.selected == true);
    if (selectedItems.length > 0) {
      this.productIsSelected = true;
    } else {
      this.productIsSelected = false;
    }
  }

  individualselection(event: any) {
    // ////console.log(event.target.value);
    this.allProducts.find(sale => sale.id == event.id).selected = !this.allProducts.find(sale => sale.id == event.id).selected;
    let selectedItems = this.allProducts.filter(sale => sale.selected == true);
    if (selectedItems.length > 0) {
      this.productIsSelected = true;
    } else {
      this.productIsSelected = false;
    }
  }
  // modalclosed() {
  //   $('#search-modal').modal('hide');
  // }
  
  
}
