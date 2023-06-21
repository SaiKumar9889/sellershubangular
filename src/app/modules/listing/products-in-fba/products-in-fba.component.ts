import { Component, OnInit } from '@angular/core';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { ToastTypes } from 'src/app/_models/_toaster';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { ProductsInFbaService } from '../services/products-in-fba.service';
declare var $: any;

@Component({
  selector: 'app-products-in-fba',
  templateUrl: './products-in-fba.component.html',
  styleUrls: ['./products-in-fba.component.css']
})
export class ProductsInFbaComponent implements OnInit {
  constructor(private appTrackingService:AppTrackingService, private toasterService: ToasterService, private producttoFBAService: ProductsInFbaService ) {
    let ip:usertrackInput={menu:TrackMenus.LISTINGS,submenu:subMenus.PRODUCTSINFBA,page:pages.PRODUCTSINFBAPAGE,function:"",descrption:"Products in FBA page loaded"};
    this.appTrackingService.trackUserActivity(ip);
   }

  ngOnInit(): void {
    this.getProducts();
  }
  pageSize = environment.defaultPaginationValue;
  total = environment.defaultTotalValue;
  collectionsize = environment.defaultTotalValue;
  allProducts: any[] = [];
  searchValue: any = '';
  searchChannel: any = 'all';
  searchName: any = '0';
  orderBy: any = '';
  productTitle:string='';
  productIsSelected: boolean = false;
  page:number=0;
  loading:boolean=false;
  variations;
  disVariation;
  auditTrack(type:any){
    let ip:usertrackInput;
    if(type==1)
    ip={menu:TrackMenus.LISTINGS,submenu:subMenus.PRODUCTSINFBA,page:pages.PRODUCTSINFBAPAGE,function:"",descrption:"Search button is clicked"};
    if(type==2)
    ip={menu:TrackMenus.LISTINGS,submenu:subMenus.PRODUCTSINFBA,page:pages.PRODUCTSINFBAPAGE,function:"",descrption:"Reset button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }
  modalclosed() {
    $('#search-modal').modal('hide');
  }
  changespage(page: any) {
    this.getProducts();
  }
  reset(){
    this.searchName = '0';
    this.searchValue = '';
    this.getProducts();
  }
  getProducts() {
    this.loading=true;
    this.producttoFBAService.getProductstoFBA(this.page,this.pageSize,this.collectionsize, this.searchValue).subscribe((res: any) => {
      ////console.log(res);
      this.allProducts = res?.products;
      this.collectionsize = res?.page?.totalResults;
      // this.page = res?.page?.currentPageNumber;
      this.loading = false;
      if(this.allProducts.length>0)
      this.productTitle= this.allProducts[0].title;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      this.loading=false;
    }, eoor => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };

  isAllChecked: boolean = true;

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
