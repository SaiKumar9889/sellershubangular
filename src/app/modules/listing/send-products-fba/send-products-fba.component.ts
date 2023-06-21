import { Component, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { SendProductsInFbaService } from '../services/send-products-in-fba.service';
declare var $: any;

@Component({
  selector: 'app-send-products-fba',
  templateUrl: './send-products-fba.component.html',
  styleUrls: ['./send-products-fba.component.css']
})
export class SendProductsFbaComponent implements OnInit {
  constructor(private toasterService: ToasterService, private sendproducttoFBAService: SendProductsInFbaService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  pageSize = environment.defaultPaginationValue;
  total = environment.defaultTotalValue;
  collectionsize = environment.defaultTotalValue;
  allProducts: any[] = [];
  allSelectedProducts: any[] = [];
  searchValue: any = '';
  searchChannel: any = 'all';
  searchName: any = '0';
  productTitle: string = '';
  productIsSelected: boolean = false;
  page: number = 0;
  loading: boolean = false;
  variations;
  disVariation;

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
    this.loading = true;
    this.sendproducttoFBAService.getSendProductstoFBA(this.page, this.pageSize, this.collectionsize, this.searchName, this.searchValue).subscribe((res: any) => {
      ////console.log(res);
      this.allProducts = res;
      this.collectionsize = res?.page?.totalResults;
      // this.page = res?.page?.currentPageNumber;
      this.loading = false;
      if (this.allProducts.length > 0)
        this.productTitle = this.allProducts[0].title;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      this.loading = false;
    },
      eoor => {
        this.loading = false;
        ////console.log("in error send products to fbs page");
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
  shipmentId: any = '';

  openProductsModal(prod: any) {
    this.shipmentId = prod.shipmentId;
    // this.shipmentId = "FBA15FHBMPGG";

    this.loading = true;
    this.sendproducttoFBAService.getshipmentitems(this.shipmentId).subscribe((res: any) => {

      ////console.log("send products::::", res);
      // this.finalselectedOrders = selectedOrders;
      this.allSelectedProducts = res;
      this.loading = false;
    },
      error => {
        this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
        this.loading = false;
      });
    $('#showProducts-modal').modal('show');
  }

  closeProductsModal() {
    // this.templateName = "";
    $('#showProducts-modal').modal('hide');
  }
}
