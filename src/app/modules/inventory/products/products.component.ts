import { Component, OnInit } from '@angular/core';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { AllMenuTabs } from 'src/app/_models/Tabs';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { ToastTypes } from 'src/app/_models/_toaster';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { SalsesOrdersService } from '../../orders/services/salses-orders.service';
import { SupplierService } from '../../suppliers/services/supplier.service';
import { ChannelProductsService } from '../services/channel-products.service';
import { ProductsService } from '../services/products.service';
declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private appTrackingService: AppTrackingService, private supplierService: SupplierService, private channelproductService: ChannelProductsService, private datasharingService: DatasharingService, private salsesOrdersService: SalsesOrdersService, private toasterService: ToasterService, private productService: ProductsService) {
    let ip: usertrackInput = { menu: TrackMenus.INVENTORY, submenu: subMenus.PRODUCTS, page: pages.PRODUCTSPAGE, function: "", descrption: "Products page loaded" };
    this.appTrackingService.trackUserActivity(ip);
  }


  pageSize = environment.defaultPaginationValue;
  total = environment.defaultTotalValue;
  collectionsize = 0;
  allProducts: any[] = [];
  channleUsers: any[] = [];
  searchValue: any = '';
  searchBy: any = 0;
  searchFrom: any = '';
  searchTo: any = '';
  topsalepercent: any = 0;
  topproductpercent: any = 0;
  topsaleValue: any = 0;
  topproductunits: any = 0;
  productTitle: string = '';
  productIsSelected: boolean = true;
  page: number = 0;
  loading: boolean = false;
  variations;
  disVariation;
  showChannelInfo: boolean = false;
  searchname: any = '0';
  freeFormSearch: string = '';
  searchValue2: any = '';
  dropdownSettings_fil = {
    singleSelection: false,
    idField: 'value',
    textField: 'key',
    selectAllText: 'Select All',
    unSelectAllText: 'Deselect all',
    itemsShowLimit: 1,
    enableCheckAll: true,
    allowSearchFilter: true,
    clearSearchFilter: true,
    closeDropDownOnSelection: true
  };
  filterData = [{ 'key': 'Show Parent Products', 'value': '1' }, { 'key': 'Including Zero Qty Products', 'value': '2' }];

  isDefaultSupplier = false;
  ngOnInit(): void {
    this.getProducts();
    this.getChannelRegistration();
    this.getSuppliers();
  }
  ngDoCheck(): void {
    if (this.datasharingService.productPageRefresh) {
      this.channelType = 'all';
      this.ngOnInit();
      this.datasharingService.productPageRefresh = false;
    }
  }
  auditTrack(type: any) {
    let ip: usertrackInput;
    if (type == 1)
      ip = { menu: TrackMenus.INVENTORY, submenu: subMenus.PRODUCTS, page: pages.PRODUCTSPAGE, function: "", descrption: " Apply Filter button is clicked" };
    if (type == 2)
      ip = { menu: TrackMenus.INVENTORY, submenu: subMenus.PRODUCTS, page: pages.PRODUCTSPAGE, function: "", descrption: "Reset button is clicked" };
    if (type == 3)
      ip = { menu: TrackMenus.INVENTORY, submenu: subMenus.PRODUCTS, page: pages.PRODUCTSPAGE, function: "", descrption: "Exclude SKU From Inventory button is clicked" };
    if (type == 4)
      ip = { menu: TrackMenus.INVENTORY, submenu: subMenus.PRODUCTS, page: pages.PRODUCTSPAGE, function: "", descrption: "Add to channel button is clicked" };
    if (type == 5)
      ip = { menu: TrackMenus.INVENTORY, submenu: subMenus.PRODUCTS, page: pages.PRODUCTSPAGE, function: "", descrption: "Remove Products button is clicked" };
    if (type == 6)
      ip = { menu: TrackMenus.INVENTORY, submenu: subMenus.PRODUCTS, page: pages.PRODUCTSPAGE, function: "", descrption: "Add Product button is clicked" };
    if (type == 7)
      ip = { menu: TrackMenus.INVENTORY, submenu: subMenus.PRODUCTS, page: pages.PRODUCTSPAGE, function: "", descrption: "Save button is clicked" };
    if (type == 8)
      ip = { menu: TrackMenus.INVENTORY, submenu: subMenus.PRODUCTS, page: pages.PRODUCTSPAGE, function: "", descrption: "Unlink Products button is clicked" };
    if (type == 9)
      ip = { menu: TrackMenus.INVENTORY, submenu: subMenus.PRODUCTS, page: pages.PRODUCTSPAGE, function: "", descrption: "Link Products button is clicked" };
    if (type == 10)
      ip = { menu: TrackMenus.INVENTORY, submenu: subMenus.PRODUCTS, page: pages.PRODUCTSPAGE, function: "", descrption: "Close button is clicked" };
    if (type == 11)
      ip = { menu: TrackMenus.INVENTORY, submenu: subMenus.PRODUCTS, page: pages.PRODUCTSPAGE, function: "", descrption: "Unlink Products button is clicked" };
    if (type == 12)
      ip = { menu: TrackMenus.INVENTORY, submenu: subMenus.PRODUCTS, page: pages.PRODUCTSPAGE, function: "", descrption: "Close button is clicked" };
    if (type == 13)
      ip = { menu: TrackMenus.INVENTORY, submenu: subMenus.PRODUCTS, page: pages.PRODUCTSPAGE, function: "", descrption: "Apply Filter button is clicked" };
    this.appTrackingService.trackUserActivity(ip);
  }
  modalclosed() {
    $('#search-modal').modal('hide');
  }
  changespage(page: any) {
    this.getProducts();
  }
  showParentProducts: boolean = false;
  showZeroProducts: boolean = true;
  supplier = 'all_supplier';
  getProducts() {
    this.loading = true;
    this.productService.getProducts(this.page, this.collectionsize, this.pageSize, this.channelType, this.fliter, this.searchname, this.searchValue2, 'all', 'all', this.supplier, this.showParentProducts, false, this.showZeroProducts, false,
      this.selectedSupplier?.length > 0 ? this.isDefaultSupplier : false, this.freeFormSearch).subscribe((res: any) => {
        ////console.log(res);
        this.allProducts = res?.products;
        this.channleUsers = res?.channelUsers;
        this.variations = res?.products['variations'];
        // if (this.variations != null) {
        //   this.disVariation = 'CONFIGURABLE';
        // }
        // else {
        //   this.disVariation = 'SIMPLE';
        // }
        this.collectionsize = res?.page?.totalResults;
        // this.page = res?.page?.currentPageNumber;
        this.loading = false;
        if (this.allProducts.length > 0)
          this.productTitle = this.allProducts[0].title;
        this.allProducts.forEach(prod => {
          prod.selected = false;
          if (prod.channelNames)
            prod.channelNames = [...new Set(prod.channelNames.split(','))];

        });
        this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Products retrived');
        this.loading = false;
      }, error => {
        this.loading = false;
        this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
      });
  } removeDuplicates(arg0: any): any {
    throw new Error('Method not implemented.');
  }
  ;

  isAllChecked: boolean = true;
  selectedItemsLength: any;
  selectall(event: any) {
    ////console.log("selectall", this.isAllChecked);
    this.isAllChecked = !this.isAllChecked;
    ////console.log("selectall", this.isAllChecked);
    this.allProducts.map((i: any) => i.selected = this.isAllChecked);
    ////console.log(this.allProducts);
    let selectedItems = this.allProducts.filter(sale => sale.selected == true);
    this.selectedItemsLength = selectedItems.length;
    if (selectedItems.length > 0) {
      this.productIsSelected = true;
    } else {
      this.productIsSelected = false;
    }
  }
  select(event: any) {
    this.showChannelInfo = !this.showChannelInfo
  }
  individualselection(event: any) {
    // ////console.log(event.target.value);
    this.allProducts.find(sale => sale.id == event.id).selected = !this.allProducts.find(sale => sale.id == event.id).selected;
    let selectedItems = this.allProducts.filter(sale => sale.selected == true);
    this.selectedItemsLength = selectedItems.length;
    if (selectedItems.length > 0) {
      this.productIsSelected = true;
    } else {
      this.productIsSelected = false;
    }
  }

  removeProducts() {
    let selectedOrders = this.allProducts.filter(down => down.selected == true);
    const ids = selectedOrders.map(ord => ord.id);
    if (ids.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Products', 'Please select one product atleast');
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result?.value) {
        this.productService.removeProduct(ids, true).subscribe(res => {
          //this.getProducts();
          ids.forEach(element => {
            this.allProducts = this.allProducts.filter(item => item.id != element);
          });
          if (this.allProducts.length === 0) {
            this.getProducts();
          }
        });
        Swal.fire(
          'Product !',
          'Your product has removed.',
          'success'
        )
      }
    });
  }

  excludeSKUFromInven() {
    let selectedOrders = this.allProducts.filter(down => down.selected == true);
    const ids = selectedOrders.map(ord => ord.id);

    if (ids.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Products', 'Please select one product atleast?');
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "you want to exclude selected Products from Inventory Sync?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      ////console.log(result);
      if (result?.value == true) {

        this.productService.excludeInventoryFromSku(ids, true).subscribe(res => {
        });
        Swal.fire(
          'Product !',
          'Selected products has excluded from inventory.',
          'success'
        );
        this.getProducts();
      }
    });
  }


  addTochannelList = [];
  addToChannel() {
    let selectedOrders = this.allProducts.filter(down => down.selected == true);
    const ids = selectedOrders.map(ord => ord.id);

    if (ids.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Products', 'Please select one product atleast');
      return;
    }
    this.loading = true;
    this.productService.startAddToChannel(ids).subscribe(res => {
      this.addTochannelList = res.filter(i => (i.type == 'ebay' || i.type == 'shopify' || i.type == 'etsy' || i.type == 'amazon'));
      this.addTochannelList.map(addch => addch.selectedTemplate = '');
      this.addTochannelList.map(addch => addch.selected = false);
      $('#channels-modal').modal('show');
      this.loading = false;

    });
  }
  changesCheckedStatus(prod: any) {
    prod.selected = !prod.selected;
  }
  saveTochannel() {
    let selectedChannels = this.addTochannelList.filter(addch => addch.selected == true);
    let templateSelected = selectedChannels.filter(addch => addch.selectedTemplate == '');
    if (selectedChannels.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Products', 'Please select Template');
      return;
    } else {
      let channelIds = [];
      let productIds = [];
      let templateIds = [];
      let type = [];
      let selectedOrders = this.allProducts.filter(down => down.selected == true);
      const ids = selectedOrders.map(ord => ord.id);
      selectedChannels.forEach(ch => {
        channelIds.push(ch.id);
        // productIds.push(ch.);
        templateIds.push(ch.selectedTemplate == '' ? ch.templates[0].id : ch.selectedTemplate);
        type.push(ch.type);
      });
      this.loading = true;
      let body = {
        "channelIds": channelIds,
        "productIds": ids,
        "templateIds": templateIds,
        "type": type
      }
      this.productService.addProductsTochannel(body).subscribe(res => {
        this.loading = false;
        this.toasterService.openToastMessage(ToastTypes.success, 'Products', 'Products added to channel successfully');
        this.closeChannelsModal();
        this.addTochannelList = [];
        // this.getProducts();
        this.addChannelproduct();

      });
    }
  }
  linkedProds: any = [];
  linkProducts() {
    this.linkedProds = [];
    let selectedOrders = this.allProducts.filter(down => down.selected == true);
    const ids = selectedOrders.map(ord => ord.id);

    if (ids.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Products', 'Please select one product atleast');
      return;
    }
    this.productService.linkProducts(ids).subscribe((res: any) => {
      ////console.log(res);
      this.linkedProds = res?.kartzhubProducts;
      $('#link-products-modal').modal('show');
    });
  }
  closeLinkProdModal() {
    $('#link-products-modal').modal('hide');
    this.getProducts();
  }
  closeChannelsModal() {
    $('#channels-modal').modal('hide');
  }

  createProduct() {
    let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.create_product };
    this.datasharingService.addtoTab(menu);
  }

  getChannelImage(type: any) {
    return 'https://s3-us-west-1.amazonaws.com/khubweb/web/kartzhub' + type + '.png';
  }

  editProduct() {

  }
  updateQty(prod: any) {
    ////console.log(prod);
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to update the qty !",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then(async (result) => {
      ////console.log(result);
      if (result?.value) {
        this.productService.updateProductQty(prod.sku, prod.qty, prod.sellingPrice ? prod.sellingPrice : 0.0).subscribe(res => {

          Swal.fire(
            'Products!',
            'update qty is done.',
            'success'
          )
        });
      }
    });
  }
  updateThqtystatus() {
    let selectedOrders = this.allProducts.filter(down => down.selected == true);
    const ids = selectedOrders.map(ord => ord.id);
    let qparam = '';
    ids.forEach((id, index) => {
      if (index == 0)
        qparam = qparam + 'productIds=' + id;
      else
        qparam = qparam + '&productIds=' + id;
    });
    this.productService.equalizeTheQty(qparam).subscribe((res: any) => {
      this.linkedProds = res;
      this.toasterService.openToastMessage(ToastTypes.success, 'Products', 'Equal Qty applied');
      return;
    })
  }
  confirmUnLinkProduct() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to unlink the products !",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then(async (result) => {
      ////console.log(result);
      if (result?.value) {
        let selectedOrders = this.allProducts.filter(down => down.selected == true);
        const ids = selectedOrders.map(ord => ord.id);
        this.productService.unlinkproducts(ids).subscribe(res => {
          ////console.log(res);
          this.closeLinkProdModal();
        });
        Swal.fire(
          'Products!',
          'unlink products is done.',
          'success'
        )
      }
    });
  }
  confirmLinkProduct() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to link the products !",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then(async (result) => {
      ////console.log(result);
      if (result?.value) {
        let selectedOrders = this.allProducts.filter(down => down.selected == true);
        const ids = selectedOrders.map(ord => ord.id);
        this.productService.confirmlinkProducts(ids).subscribe(res => {
          ////console.log(res);
          this.closeLinkProdModal();
        });
        Swal.fire(
          'Products!',
          'link products is done.',
          'success'
        )
      }
    });
  }
  linkedProdsInventory: any = [];
  getLinkedProductsInventory() {

  }

  linkProductsInv() {
    $('#link-products-inven-modal').modal('show');
  }

  linkProductsInvModalClose() {
    $('#link-products-inven-modal').modal('hide');
  }
  openProducts(prod: any) {
    $('#link-products-variation').modal('show');
    this.getChannelEditDetails(prod.sku);
  }

  channelDet: any;
  getChannelEditDetails(sku: any) {
    this.loading = true;
    this.channelproductService.getChannelproducts_Single(sku).subscribe((res: any) => {
      //console.log(res);
      this.channelDet = res?.child;
      // this.channelDet?.child?.map(chi => {
      //   chi.variationSelected = true;
      // });
      this.loading = false;
    })
  }

  channelType: any = 'all';
  fliter: any = '0';

  channels: any = [];
  getChannelRegistration() {
    this.salsesOrdersService.getChannelRegistration().subscribe(res => {
      // ////console.log(res);
      this.channels = res;
    }, error => {
      this.loading = false;
    })
  }
  refresh() {
    this.getProducts();
  }
  reset() {
    this.fliter = '0';
    this.channelType = 'all';
    this.searchname = '0';
    this.searchValue2 = '';
    this.freeFormSearch = '';
    this.getProducts();
  }


  openLinkInventory(id: any) {
    $('#link-products-inven-modal_v2').modal('show');
    this.linkProductsV2(id);
  }

  linkProductsInvModalClosev2() {
    $('#link-products-inven-modal_v2').modal('hide');
  }

  linkProductsV2(id: any) {
    this.linkedProds = [];
    this.loading = true;
    const ids = [id];
    this.productService.linkProducts(ids).subscribe((res: any) => {
      this.linkedProds = res?.kartzhubProducts;
      this.loading = false;
    });
  }


  confirmUnLinkProductV2() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to unlink the products !",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then(async (result) => {
      ////console.log(result);
      if (result?.value) {
        //let selectedOrders = this.allProducts.filter(down => down.selected == true);
        const ids = this.linkedProds.map(ord => ord.id);
        this.productService.unlinkproducts(ids).subscribe(res => {
          ////console.log(res);
          this.linkProductsInvModalClosev2();
          this.getProducts();
        });
        Swal.fire(
          'Products!',
          'unlink products is done.',
          'success'
        )
      }
    });
  }

  addChannelproduct() {
    // this.datasharingService.changeEditProductDetails({ product: prod, isChannelProduct: false });
    let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.channel_products };
    this.datasharingService.addtoTab(menu);
  }

  editproduct(prod: any) {
    this.datasharingService.changeEditProductDetails({ product: prod, isChannelProduct: false });
    let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.edit_product };
    this.datasharingService.addtoTab(menu);
  }

  createBundleProduct() {
    let selectedItems = this.allProducts.filter(sale => sale.selected == true);
    if (selectedItems.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Products', 'Please select one product atleast');
      return;
    }
    this.datasharingService.changeBundleProductDetails(selectedItems);
    let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.create_bundle_product };
    this.datasharingService.addtoTab(menu);
  }

  convertSimpleToone() {
    let selectedOrders = this.allProducts.filter(down => down.selected == true);
    const ids = selectedOrders.map(ord => ord.id);

    if (ids.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Products', 'Please select one product atleast');
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to convert simple to bundle !",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then(async (result) => {
      ////console.log(result);
      if (result?.value) {
        this.loading = true;
        this.productService.validatebundleproduct(ids).subscribe((res: any) => {
          this.loading = true;
          this.productService.updatebundleproduct(ids).subscribe((res: any) => {
            this.loading = false;
            this.toasterService.openToastMessage(ToastTypes.success, 'Products', 'Conversion Done');
            this.getProducts();
          })
        }, error => {
          this.loading = false;
        })
      }
    });
  }

  collectionsize_m: any = 100000;
  pageSize_m: any = 10;
  page_m: any = 0;
  sp_m: any;
  allProducts_b: any = [];
  addProductTobundle(prod: any) {
    this.sp_m = prod;
    $('#bundle-products-modal').modal('show');
    this.getbp(prod);
  }

  applFil() {
    this.getbp(this.sp_m);
  }
  bdmodalclose() {
    $('#bundle-products-modal').modal('hide');
  }

  title: any = '';
  skuip: any = '';
  getbp(prod: any) {
    this.loading = true;
    this.allProducts_b = [];
    this.productService.getBundleProdusModal(prod.id, this.page_m, this.pageSize_m, this.collectionsize_m, this.title, this.skuip).subscribe((res: any) => {
      //console.log(res);
      this.allProducts_b = res?.products;
      this.collectionsize = res?.page?.totalResults;
      this.loading = false;
    })
  }

  clearm() {
    this.collectionsize_m = 100000;
    this.pageSize_m = 10;
    this.page_m = 0;
    this.allProducts_b = [];
  }

  changespage_m(page: any) {
    // //console.log(page);
    this.page_m = page;
    if (this.sp_m)
      this.getbp(this.sp_m);
  }

  addtobundlev2(prod: any) {
    this.loading = true;
    this.productService.addToBundle(prod.id, this.sp_m.id).subscribe(res => {
      //console.log(res);
      this.toasterService.openToastMessage(ToastTypes.success, 'Products', 'Product added to bundle');
      this.bdmodalclose();
      this.loading = false;
      $('#bundle-products-qty_update_modal').modal('show');
      this.getProdsforqty(this.sp_m);
      this.clearm();
    });
  }

  openqtymodal(prod: any) {
    this.sp_m = prod;
    $('#bundle-products-qty_update_modal').modal('show');
    this.getProdsforqty(prod);
  }

  prod_for_update: any = [];
  getProdsforqty(prod: any) {
    this.loading = true;
    this.prod_for_update = [];
    this.productService.findBundleProductsforqty(prod.id).subscribe((res: any) => {
      //console.log(res);
      this.prod_for_update = res.products;

      this.loading = false;
      //this.prod_for_update.map(pr => pr.assignqty = 0);
      // this.toasterService.openToastMessage(ToastTypes.success, 'Products', 'Product added to bundle');
    });
  }

  closeModalbqty() {
    $('#bundle-products-qty_update_modal').modal('hide');
  }

  removeProductFromBundle(prod: any) {
    this.loading = true;
    this.productService.removeFromBundle(prod.childId, this.sp_m.id).subscribe((res: any) => {
      //console.log(res);
      this.getProdsforqty(this.sp_m);
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'Products', 'Product remove from bundle');
    });
  }

  saveQty(prod: any) {
    let body = {
      "productIds": [prod.childId],
      "qtyList": [prod.qty]
    }
    this.loading = true;
    this.productService.updateSaveBundleChailsItems(this.sp_m.id, body).subscribe((res: any) => {
      //console.log(res);
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'Products', 'Product qty updated');
      // this.closeModalbqty();
    });
  }

  updateQtyValue(prod) {
    this.loading = true;
    this.productService.updateProductQty(prod.sku, prod.qty, prod.sellingPrice ? prod.sellingPrice : 0.0).subscribe((res: any) => {
      //console.log(res);
      this.productService.updateChannelProductQtyForSku(prod.sku).subscribe((res: any) => {

      });
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'Products', 'Product qty updated');
    });
  }
  allSupplier: any = [];
  selectedSupplier: any = [];
  dropdownSettings_supplier = {
    singleSelection: true,
    idField: 'id',
    textField: 'firstName',
    selectAllText: 'Select All',
    unSelectAllText: 'Deselect all',
    itemsShowLimit: 1,
    enableCheckAll: true,
    allowSearchFilter: true,
    clearSearchFilter: true,
    closeDropDownOnSelection: true
  };
  onItemSupplier(event: any) {
    console.log(event);
    if (event) {
      this.supplier = event.id;
      this.getProducts();
    }
  }
  getSuppliers() {
    this.supplierService.getSupplier().subscribe((res: any) => {
      this.allSupplier = res?.suppliers;
    });
  }
  sku: any;
  openHisporyModal(prod: any) {
    console.log(prod);
    this.sku = prod.sku;
    $('#inventoryTrackingmodal').modal('show');
  }
  trackingmodalclose() {
    $('#inventoryTrackingmodal').modal('hide');
  }
  upadteTracking(prod) {
    prod.track = !prod.track ;
    this.loading = true ;
    this.productService.updateTracking(prod.id, prod.track).subscribe((res: any) => {
      console.log(res);
      this.getProducts();
      this.loading = false ;
    });
  }
  updateTrackingStatus() {
    let selectedOrders = this.allProducts.filter(down => down.selected == true);
    const ids = selectedOrders.map(ord => ord.id);
    this.productService.updateTracking(ids, true).subscribe((res: any) => {
      console.log(res);
      this.getProducts();
    });
  }
  untrackProducts() {
    let selectedOrders = this.allProducts.filter(down => down.selected == true);
    const ids = selectedOrders.map(ord => ord.id);
    this.productService.updateTracking(ids, false).subscribe((res: any) => {
      console.log(res);
      this.getProducts();
    });
  }
}
