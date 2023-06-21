import { Component, Input, OnInit } from '@angular/core';
import { AllMenuTabs } from 'src/app/_models/Tabs';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { ProductsService } from '../../inventory/services/products.service';
import { ListedProductsService } from '../../listing/services/listed-products.service';
import { AmazonInteService } from '../services/amazon-inte.service';
declare let $: any;
@Component({
  selector: 'app-sku-mapping',
  templateUrl: './sku-mapping.component.html',
  styleUrls: ['./sku-mapping.component.scss']
})
export class SkuMappingComponent implements OnInit {

  @Input() channelId = '';

  pageSize = 100;
  pagesize = environment.defaultPaginationValue;
  total = environment.defaultTotalValue;
  collectionsize = 0;
  collectionSize = 0;
  allProducts: any[] = [];
  channelProducts: any[] = [];
  searchValue: any = '';
  searchBy: any = 0;
  searchFrom: any = '';
  searchTo: any = '';
  topsalepercent: any = 0;
  topproductpercent: any = 0;
  topsaleValue: any = 0;
  topproductunits: any = 0;
  productIsSelected: boolean = false;
  page: number = 1;
  Page: number = 1;
  loading: boolean = false;
  searchName: any = '0';
  fbaProductId: any = '000';
  searchname: any = '0';
  searchValue2: any = '';
  test = '';
  fliter: any = '0';
  showParentProducts: boolean = false;
  showZeroProducts: boolean = true;
  supplier = 'all_supplier';
  selectedLinkProduct: any;
  channel: any;
  allStores: any = [];
  constructor(private amazonInteService: AmazonInteService, private productService: ProductsService, private datasharingService: DatasharingService, private toasterService: ToasterService, private listedService: ListedProductsService) {

  }

  ngOnInit(): void {
    this.getChannelProducts();
    this.getAllStores()
  }
  createProduct(prod: any) {
    this.loading = true;
    const data = [{ sku: prod.sku, listOfSellerhubSku: [], listOfChannelSku: [] }]
    this.productService.createMapLinkSku(data, 'createsku').subscribe((res: any) => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Sku mapping', 'Product Created Successfully');
      prod.updateInventory = true
      this.updateProd(prod);
      this.loading = false;
    }, (error) => {
      this.loading = false;
    });
  }
  updateProd(prod: any) {
    this.loading = true;
    prod.listOfChannelSku = [];
    prod.listOfSellerhubSku = [];
    const data = [prod]
    this.productService.createMapLinkSku(data, 'update').subscribe((res: any) => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Sku mapping', 'Product Updated Successfully');
      this.getChannelProducts();
      this.loading = false;
    }, (error) => {
      this.loading = false;
    });
  }
  unLinkProd(prod: any) {
    this.loading = true;
    const data = [{ sku: prod.sku, listOfSellerhubSku: [''], listOfChannelSku: [prod.sku] }]
    this.productService.createMapLinkSku(data, 'mapsku').subscribe((res: any) => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Sku mapping', 'Product Unlinked Successfully');
      prod.updateInventory = false;
      this.updateProd(prod);
      this.loading = false;
    }, (error) => {
      this.loading = false;
    });
  }
  LinkProduct(prod) {
    this.selectedLinkProduct = prod;
    $('#link-products-modal').modal('show');
    this.getProducts();
  }
  closeModal() {
    $('#link-products-modal').modal('hide');
  }
  onLinkProducts(prod) {
    this.loading = true;
    const data = [{ sku: prod.sku, listOfSellerhubSku: [prod.sku], listOfChannelSku: [this.selectedLinkProduct.sku] }]
    this.productService.createMapLinkSku(data, 'mapsku').subscribe((res: any) => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Sku mapping', 'Product Linked Successfully');
      this.selectedLinkProduct.updateInventory = true
      this.updateProd(this.selectedLinkProduct);
      $('#link-products-modal').modal('hide');
      this.loading = false;
    }, (error) => {
      this.loading = false;
    });
  }
  linkMappAllSkus() {
    this.loading = true;
    const data = [{ listOfSellerhubSku: this.allProducts.map(i => { return i.sku }), listOfChannelSku: this.channelProducts.map(i => { return i.sku }) }]
    this.productService.createMapLinkSku(data, 'mapsku').subscribe((res: any) => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Sku mapping', 'Product Linked Successfully');
      this.loading = false;
    }, (error) => {
      this.loading = false;
    });
  }
  // getProducts() {
  //   this.loading = true;
  //   this.productService.getKhubProducts().subscribe((res: any) => {
  //       console.log(res);
  //       this.allProducts = res?.products;

  //       this.collectionsize = res?.page?.totalResults;
  //       this.loading = false;
  //       this.allProducts.map(prod => prod.selected = false);
  //       this.loading = false;
  //     }, (error) => {
  //       this.loading = false;
  //     });
  // };
  changespage(page: any) {
    this.getChannelProducts();
  }
  changepage(page: any) {
    this.getProducts();
  }
  individualselection(event: any) {
    // ////console.log(event.target.value);
    this.products.find(sale => sale.id == event.id).selected = !this.products.find(sale => sale.id == event.id).selected;
    let selectedItems = this.products.filter(sale => sale.selected == true);
    if (selectedItems.length > 0) {
      this.productIsSelected = true;
    } else {
      this.productIsSelected = false;
    }
  }
  getProducts() {
    this.loading = true;
    this.productService.getProducts(this.Page, this.collectionSize, this.pageSize, 'all', this.fliter, this.searchname, this.searchValue2, 'all', 'all', this.supplier, this.showParentProducts, false, this.showZeroProducts, false,
      false).subscribe((res: any) => {
        ////console.log(res);
        this.allProducts = res?.products;

        this.collectionSize = res?.page?.totalResults;
        this.loading = false;
        this.allProducts.map(prod => prod.selected = false);
        this.loading = false;
      }, (error) => {
        this.loading = false;
      });
  };
  // getChannelProducts() {
  //   this.loading = true;
  //   this.productService.getChannelProducts(this.channelId).subscribe((res: any) => {
  //       console.log(res);
  //       this.channelProducts = res?.products;

  //       this.collectionsize = res?.page?.totalResults;
  //       this.loading = false;
  //       this.channelProducts.map(prod => prod.selected = false);
  //       this.loading = false;
  //     }, (error) => {
  //       this.loading = false;
  //     });
  // };
  getChannelProducts() {
    this.loading = true;
    // this.listedService.getListedproduct(this.page, this.pageSize, this.collectionsize, this.searchName, this.searchValue, this.channelId, this.fbaProductId, false, this.fliter).subscribe((res: any) => {
    //   ////console.log(res);
    //   this.channelProducts = res?.products;
    //   this.collectionsize = res?.page?.totalResults;
    //   this.channelProducts.map(prod => prod.selected = false);
    //   this.loading = false;

    //   this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
    //   this.loading = false;
    // }, eoor => {
    //   this.loading = false;
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    // });
    this.productService.getChannelProducts(this.page, this.collectionsize, this.pageSize, this.channelId, this.searchName, this.searchValue,).subscribe((res: any) => {
      console.log(res);
      this.channelProducts = res?.channelProducts ? res?.channelProducts : [];
      this.collectionsize = res?.page?.totalResults;
      this.channelProducts.map(prod => prod.selected = false);
      this.channelProducts.filter(s => this.channel = s.channel)
      console.log(this.channel)
      this.loading = false;
    }, (error) => {
      this.loading = false;
    });
  };
  refresh() {
    this.getChannelProducts();
  }
  reset() {
    this.fliter = '0';
    this.searchName = '0';
    this.searchValue = '';
    this.getChannelProducts();
  }
  refresh1() {
    this.getProducts();
  }
  reset1() {
    this.fliter = '0';
    this.searchname = '0';
    this.searchValue2 = '';
    this.getProducts();
  }
  isAllChecked: boolean = false;
  isAllProdChecked: boolean = false;
  products: any = [];
  selectall(event: any) {
    ////console.log("selectall", this.isAllChecked);
    this.isAllChecked = !this.isAllChecked;
    ////console.log("selectall", this.isAllChecked);
    this.channelProducts.map((i: any) => i.selected = this.isAllChecked);
    ////console.log(this.allProducts);
    let selectedItems = this.channelProducts.filter(sale => sale.selected == true);
    this.products = (selectedItems);
  }
  selectallProd(event: any) {
    ////console.log("selectall", this.isAllChecked);
    this.isAllProdChecked = !this.isAllProdChecked;
    ////console.log("selectall", this.isAllChecked);
    this.products.map((i: any) => i.selected = this.isAllProdChecked);
    ////console.log(this.allProducts);
    let selectedItems = this.products.filter(sale => sale.selected == true);
  }
  individualProdselection(event: any) {
    // ////console.log(event.target.value);
    this.channelProducts.find(sale => sale.id == event.id).selected = !this.channelProducts.find(sale => sale.id == event.id).selected;
    let selectedItems = this.channelProducts.filter(sale => sale.selected == true);
  }
  qty: any;
  updateClickAndCollect() {
    let selectedItems = this.channelProducts.filter(sale => sale.selected == true);
    this.products = (selectedItems);
    $('#update-store-modal').modal('show');
    this.products.forEach(s => {
      s.selected = false;
      s.storeName = '';
      s.storeId = '';
      this.qty = s.qty;
      console.log(this.qty)
    });
    console.log(this.products)
  }
  storeName: any;
  onSelectStore(e) {
    let selectedItems = this.products.filter(sale => sale.selected == true);
    this.storeName = this.allStores.find(s => s.supplySourceId == e)
    selectedItems.forEach(s => {
      s.storeName = this.storeName.alias;
      s.storeId = e;
      console.log(s)
    })
  }
  updateInventory() {
    let selectedItems = this.products.filter(sale => sale.selected == true);
    let qty: any, id: any;
    selectedItems.filter(s => {
      qty = s.qty;
      id = s.storeId
    })
    console.log(qty)
    console.log(id)
    let aData = {
      "inventoryData":
      {
        "skuStoreInventories":
        {
          "skuidString": [
            {
              "fulfillment_channel_code": id,
              "quantity": qty
            }
          ]
        }
      }
    }
    this.amazonInteService.updateInventory(aData).subscribe(res => {
      console.log(res)
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  getAllStores() {
    this.loading = true;
    this.amazonInteService.getAllStores().subscribe((res: any) => {
      console.log(res);
      this.allStores = res.allSupplySourcesResponse;
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }
  closeUpdateModal() {
    $('#update-store-modal').modal('hide');
  }
  updateQty(product) {
    if (product.qty > this.qty) {
      console.log('Qty is greater')
    }
  }
}
