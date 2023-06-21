import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { AllMenuTabs } from 'src/app/_models/Tabs';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { ToastTypes } from 'src/app/_models/_toaster';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { ProductsService } from '../../inventory/services/products.service';
import { Warehouse } from '../models/Warehouse';
import { WarehouseLocation } from '../models/WarehouseLocation';
import { WarehouseService } from '../services/warehouse.service';
declare var $: any;

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  createWarehouse: boolean = false;
  assignedProds: any;
  emailConfigModel: boolean = false;
  constructor(private appTrackingService: AppTrackingService, private toasterService: ToasterService, private warehouseService: WarehouseService, private datasharingService: DatasharingService, private productService: ProductsService) {
    let ip: usertrackInput = { menu: TrackMenus.WAREHOUSEMANAGEMENT, submenu: subMenus.WAREHOUSES, page: pages.WAREHOUSESPAGE, function: "", descrption: "Warehouses page loaded" };
    this.appTrackingService.trackUserActivity(ip);
  }
  ngOnDestroy(): void {
    this.datasharingService.parentTab = '';
  }

  ngOnInit(): void {
    this.getProducts();
    this.country = this.datasharingService.getCountries();
  }

  pageSize = 50;
  pagesize = 25;
  collectionsize = 0;
  collectionSize = 0;
  allProds: any[] = [];
  searchValue: any = '';
  searchBy: any = 0;
  searchFrom: any = '';
  searchTo: any = '';
  topsalepercent: any = 0;
  topproductpercent: any = 0;
  topsaleValue: any = 0;
  topproductunits: any = 0;
  productTitle: string = '';
  page = 1;
  Page = 0;
  page2 = 1;
  currentPage = 3;
  disablepage = 3;
  isDisabled = true;
  productIsSelected: boolean = false;
  isAllChecked: boolean = false;

  id: number = 0;
  name: string = '';
  code: string = '';
  email: string = '';
  contactname: string = '';
  addressline1: string = '';
  addressline2: string = '';
  addressline3: string = '';
  city: string = '';
  state: string = '';
  // country: string = '';
  country: any[] = [];
  selectedCountryvalue: string = '';
  postcode: string = '';
  defaultWarehouse: boolean = false;
  createdDate: string = '';
  isEdit: boolean = false;
  removeWareHouseId: number = 0;


  allwarehouseLocations: any[] = [];
  aisle: string = '';
  aisleList: any[] = [];
  bay: string = '';
  bayList: any[] = [];
  shelf: string = '';
  shelfList: any[] = [];
  bin: string = '';
  binList: any[] = [];
  defaultLocation: boolean = false;
  selectedaisleListvalue: string = '';
  selectedbayListvalue: string = '';
  selectedshelfListvalue: string = '';
  selectedbinListvalue: string = '';

  emailConfigWarehouse: number;

  auditTrack(type: any) {
    let ip: usertrackInput;
    if (type == 1)
      ip = { menu: TrackMenus.WAREHOUSEMANAGEMENT, submenu: subMenus.WAREHOUSES, page: pages.WAREHOUSESPAGE, function: "", descrption: "New button is clicked" };
    if (type == 2)
      ip = { menu: TrackMenus.WAREHOUSEMANAGEMENT, submenu: subMenus.WAREHOUSES, page: pages.WAREHOUSESPAGE, function: "", descrption: "Email Configuration button is clicked" };
    this.appTrackingService.trackUserActivity(ip);
  }
  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  changespage(page: any) {
    this.getProducts();
  }

  getProducts() {
    this.loading = true;
    this.warehouseService.getWarehouse().subscribe((res: any) => {
      ////console.log("warehouse:::", res);
      this.allProds = res;
      this.collectionsize = res?.page?.totalResults;
      this.page = res?.page?.currentPageNumber;
      this.loading = false;
      if (this.allProds.length > 0)
        this.productTitle = this.allProds[0].title;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
    }, eoor => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };



  selectall(event: any) {
    ////console.log("selectall", event.target.value);
    this.isAllChecked = !this.isAllChecked;
    this.allProds.map((i: any) => i.selected = this.isAllChecked);
    ////console.log(this.allProds);
    let selectedItems = this.allProds.filter(sale => sale.selected == true);
    if (selectedItems.length > 0) {
      this.productIsSelected = true;
    } else {
      this.productIsSelected = false;
    }
  }

  individualselection(event: any) {
    // ////console.log(event.target.value);
    this.allProds.find(sale => sale.id == event.id).selected = !this.allProds.find(sale => sale.id == event.id).selected;
    let selectedItems = this.allProds.filter(sale => sale.selected == true);
    if (selectedItems.length > 0) {
      this.productIsSelected = true;
    } else {
      this.productIsSelected = false;
    }
  }

  changePageSize() {
    this.getProducts();
  }


  removewarehouseModal(prod: any) {
    this.loading = true;
    ////console.log("details:::", prod);
    this.removeWareHouseId = prod.id;
    $('#removewarehouse-modal').modal('show');
    // this.removeWareHouse();
    this.loading = false;
  }

  closewarehouseModal() {
    $('#removewarehouse-modal').modal('hide');
    this.getProducts();
  }

  removeWareHouse() {

    this.loading = true;
    this.warehouseService.removewarehouse(this.removeWareHouseId).subscribe((res: any) => {
      this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', "Remove Warehouse success");
      this.loading = false;
      this.closewarehouseModal();
    },
      error => {
        this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
        this.loading = false;
        this.closewarehouseModal();
      });
    this.getProducts();
  }


  editwarehouseModal(prod: any) {
    ////console.log("editdetails:::", prod);
    $('#editwarehouse-modal').modal('show');
  }

  closeeditwarehouseModal() {
    $('#editwarehouse-modal').modal('hide');
  }

  closeCreateFBAShipmentModal() {
    $('#create-newwarehouse-modal').modal('hide');
  }



  modalclosed() {
    $('#create-newwarehouse-modal').modal('hide');
    this.isEdit = false;
    this.createWarehouse = false;
    this.clear();
    this.getProducts();
  }
  closeEmailConfigModal() {

    $('#email-config-modal').modal('hide');
    this.emailConfigModel = false;
  }

  clear() {
    this.name = '';
    this.code = '';
    this.email = '';
    this.contactname = '';
    this.addressline1 = '';
    this.addressline2 = '';
    this.addressline3 = '';
    this.city = '';
    this.state = '';
    // this.country = '';
    this.country = this.datasharingService.getCountries();
    this.postcode = '';
    this.defaultWarehouse = false;
  }

  locationclear() {
    this.name = '';
    this.aisle = '';
    this.aisleList = [];
    this.bay = '';
    this.bayList = [];
    this.shelf = '';
    this.shelfList = [];
    this.bin = '';
    this.binList = [];
    this.defaultLocation = false;
  }


  addwarehouse() {
    this.isEdit = false;
    this.createWarehouse = true;
  }
  newwarehouseId: number = -1;
  async saveOrUpdatewarehouse() {
    if (this.name == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter name');
      return;
    }
    // if (this.isEdit) {
    if (this.code == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter code');
      return;
    }
    // }
    let regexpNumber = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
    ////console.log(regexpNumber.test(this.email));
    if (this.email == '' || !regexpNumber.test(this.email)) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter valid email');
      return;
    }

    if (this.contactname == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter contact name');
      return;
    }
    if (this.addressline1 == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter address line1');
      return;
    }
    if (this.addressline2 == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter address line2');
      return;
    }
    if (this.addressline3 == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter address line3');
      return;
    }
    if (this.city == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter city');
      return;
    }
    if (this.state == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter state');
      return;
    }
    // if (this.country == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter country');
    //   return;
    // }
    if (this.selectedCountryvalue == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Account', 'Please select country');
      return;
    }
    if (this.postcode == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter postCode');
      return;
    }
    // if (this.defaultWarehouse == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter default Warehouse');
    //   return;
    // }

    let id = -1;

    let res = await this.warehouseService.editwarehouse(id);

    id = res.warehouse.id;
    this.newwarehouseId = id;

    let addWarehouse: Warehouse = {
      name: this.name,
      code: this.code,
      email: this.email,
      contactname: this.contactname,
      addressline1: this.addressline1,
      addressline2: this.addressline2,
      addressline3: this.addressline3,
      city: this.city,
      state: this.state,
      country: this.selectedCountryvalue,
      postcode: this.postcode,
      defaultWarehouse: this.defaultWarehouse,
      // createdDate: "2021-12-20T08:35:24.945Z",
    };
    this.selectedWarehouseid = this.newwarehouseId;
    this.getwarehouselocations(this.selectedWarehouseid);



    this.loading = true;
    this.warehouseService.addWarehouse(addWarehouse, id).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Warehouse', 'Warehouse Created success');
      // this.modalclosed();
      // this.clear();
      this.loading = false;
      ////console.log("warehouse saved");
      this.isEdit = true;
    },
      error => {
        ////console.log("Error saving");
        this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
        this.loading = false;
      });

  }
  AllProducts: any = [];
  individualProdselection(event: any) {
    this.AllProducts.find(prod => prod.id == event.id).selected = !this.AllProducts.find(prod => prod.id == event.id).selected;
    this.title = event.title;
    this.prodId = event.id;
    this.qty = event.qty;
    this.isskuSelected = true;
  }
  getwarehouselocations(id: any) {
    this.loading = true;
    this.warehouseService.getwarehouselocations(id).subscribe((res: any) => {
      ////console.log("inside warehouselocations:::", res.locations);
      this.allwarehouseLocations = res.locations;
      this.collectionsize = res.locations?.page?.totalResults;
      this.page = res.locations?.page?.currentPageNumber;
      this.loading = false;

      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');

    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  }


  selectedWarehouseid: any;
  editWarehouse(selectedWarehouse: any) {
    ////console.log(selectedWarehouse)

    this.selectedWarehouseid = selectedWarehouse.id,
      this.id = selectedWarehouse.id,
      this.name = selectedWarehouse.name,
      this.code = selectedWarehouse.code,
      this.email = selectedWarehouse.email,
      this.contactname = selectedWarehouse.contactname,
      this.addressline1 = selectedWarehouse.addressline1,
      this.addressline2 = selectedWarehouse.addressline2,
      this.addressline3 = selectedWarehouse.addressline3,
      this.city = selectedWarehouse.city,
      this.state = selectedWarehouse.state,
      this.selectedCountryvalue = selectedWarehouse.country,
      this.postcode = selectedWarehouse.postcode,
      this.defaultWarehouse = selectedWarehouse.defaultWarehouse,
      this.createdDate = selectedWarehouse.createdDate// new Date().toLocaleDateString(),
    this.isEdit = true;
    this.getwarehouselocations(this.id);

    $('#create-newwarehouse-modal').modal('show');

  }

  updateWarehouse() {
    let id = this.selectedWarehouseid;

    if (this.name == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter name');
      return;
    }
    // if (this.isEdit) {
    if (this.code == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter code');
      return;
    }
    // }
    let regexpNumber = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
    ////console.log(regexpNumber.test(this.email));
    if (this.email == '' || !regexpNumber.test(this.email)) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter valid email');
      return;
    }

    if (this.contactname == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter contact name');
      return;
    }
    if (this.addressline1 == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter address line1');
      return;
    }
    if (this.addressline2 == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter address line2');
      return;
    }
    if (this.addressline3 == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter address line3');
      return;
    }
    if (this.city == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter city');
      return;
    }
    if (this.state == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter state');
      return;
    }
    // if (this.country == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter country');
    //   return;
    // }
    if (this.selectedCountryvalue == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Account', 'Please select country');
      return;
    }
    if (this.postcode == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter postCode');
      return;
    }
    // if (this.defaultWarehouse == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter default Warehouse');
    //   return;
    // }

    let addWarehouse: Warehouse = {
      name: this.name,
      code: this.code,
      email: this.email,
      contactname: this.contactname,
      addressline1: this.addressline1,
      addressline2: this.addressline2,
      addressline3: this.addressline3,
      city: this.city,
      state: this.state,
      country: this.selectedCountryvalue,
      postcode: this.postcode,
      defaultWarehouse: this.defaultWarehouse,
      // createdDate: "2021-12-20T08:35:24.945Z", //new Date().toLocaleDateString(),

    };

    this.loading = true;
    this.warehouseService.addWarehouse(addWarehouse, id).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Warehouse', 'Warehouse Updated success');
      // this.clear();
      this.loading = false;
      ////console.log("warehouse Updated");
    },
      error => {
        ////console.log("Error updating");
        this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
        this.loading = false;
      });
    // this.getProducts();
  }


  aisleListChangeHandler(event: any) {
    this.selectedaisleListvalue = event.target.value;
  }
  bayListChangeHandler(event: any) {
    this.selectedbayListvalue = event.target.value;
  }

  shelfListChangeHandler(event: any) {
    this.selectedshelfListvalue = event.target.value;
  }

  binListChangeHandler(event: any) {
    this.selectedbinListvalue = event.target.value;
  }

  newlocationID: number = 0;

  async addNewLocation(id = -1) {
    let warehouseid = this.selectedWarehouseid;
    let res = await this.warehouseService.editwarehouselocation(id, warehouseid);

    ////console.log("NewLocationID:", res);
    this.newlocationID = res.warehouseLocation.id;
    this.aisleList = res?.warehouseLocation?.aisleList;
    this.bayList = res?.warehouseLocation?.bayList;
    this.shelfList = res?.warehouseLocation?.shelfList;
    this.binList = res?.warehouseLocation?.binList;
    this.aisle = res?.warehouseLocation?.aisle ? res?.warehouseLocation?.aisle : '';
    this.bay = res?.warehouseLocation?.aisle ? res?.warehouseLocation?.bay : '';
    this.shelf = res?.warehouseLocation?.aisle ? res?.warehouseLocation?.shelf : '';
    this.bin = res?.warehouseLocation?.aisle ? res?.warehouseLocation?.bin : '';

    $('#create-newlocation-modal').modal('show');
  }

  async saveOrUpdatewarehouseLocation() {
    let warehouseid = this.selectedWarehouseid;
    if (this.aisle == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter aisle');
      return;
    }
    if (this.bay == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter bay');
      return;
    }
    if (this.shelf == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter shelf');
      return;
    }
    if (this.bin == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter bin');
      return;
    }

    if (this.selectedaisleListvalue == "") {
      this.selectedaisleListvalue = null;
    }

    if (this.selectedbayListvalue == "") {
      this.selectedbayListvalue = null;
    }

    if (this.selectedshelfListvalue == "") {
      this.selectedshelfListvalue = null;
    }

    if (this.selectedbinListvalue == "") {
      this.selectedbinListvalue = null;
    }

    let WarehouseLocations: WarehouseLocation = {
      id: this.newlocationID,
      warehouseId: warehouseid,
      aisle: this.aisle,
      aisleList: this.selectedaisleListvalue,
      bay: this.bay,
      bayList: this.selectedbayListvalue,
      shelf: this.shelf,
      shelfList: this.selectedshelfListvalue,
      bin: this.bin,
      binList: this.selectedbinListvalue,
      defaultLocation: this.defaultLocation
    };



    this.loading = true;
    this.warehouseService.addNewLocationData(this.newlocationID, WarehouseLocations).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Warehouse', 'Warehouse Location Created success');
      // this.modalclosed();
      this.locationclear();
      this.loading = false;
      ////console.log("warehouse Locationsaved");
      $('#create-newlocation-modal').modal('hide');
      $('#create-newwarehouse-modal').modal('hide');
      this.getwarehouselocations(warehouseid);
    },
      error => {
        ////console.log("Error warehouse Location saving");
        this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
        this.loading = false;
      });
    //after location save.

  }

  editWarehouseLocation(allLocations) {
    this.addNewLocation(allLocations.id);
  }

  removeWarehouseLocation(allLocations) {
    this.warehouseService.removeWarehouseLocation(allLocations.id, this.selectedWarehouseid).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Warehouse', 'Warehouse Location removed');
      // this.modalclosed();
      this.locationclear();
      this.loading = false;
      ////console.log("warehouse Locationsaved");
      $('#create-newlocation-modal').modal('hide');
      $('#create-newwarehouse-modal').modal('hide');
      this.getwarehouselocations(this.selectedWarehouseid);
    },
      error => {
        ////console.log("Error warehouse Location saving");
        this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
        this.loading = false;
      });
  }

  closenewLocationModal() {
    $('#create-newlocation-modal').modal('hide');
  }
  closeshowProductsModal() {
    this.assignedProds = null;
    $('#SHOW-assigndproduct').modal('hide');
  }

  selectedProductvalue: string = '';
  productDetails: any;
  locationId: any;
  qty: any;
  title: any;
  isskuSelected: boolean = false;
  prodId: any;
  channelType: any = 'all';
  fliter: any = '0';searchname: any = '0';
  searchValue2: any = '';showParentProducts: boolean = false;
  showZeroProducts: boolean = true;
  supplier = 'all_supplier';  isDefaultSupplier = false;
  assignproduct(locationdetails) {
    ////console.log("locationdetails:::", locationdetails);
    this.locationId = locationdetails.id;

    this.loading = true;
    // this.productDetails = this.warehouseService.getProductsNew();
    this.warehouseService.getProductsNew().subscribe(res => {
      ////console.log("getProductsNew:::", res);
      this.productDetails = res;
      this.productDetails.forEach(prod => {
        prod.display = prod.sku + ' [' + prod.title + ']';
      });
      this.loading = false;
      $('#create-assignproduct-modal').modal('show');
    },
      error => {
        ////console.log("Error updating");
        this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
        this.loading = false;
      });
      // this.productService.getProducts(this.Page, this.collectionSize, this.pagesize, this.channelType, this.fliter, this.searchname, this.searchValue2, 'all', 'all', this.supplier, this.showParentProducts, false, this.showZeroProducts, false,
      // this.isDefaultSupplier).subscribe((res: any) => {
      //   ////console.log(res);
      //   this.AllProducts = res?.products;
      //   // if (this.variations != null) {
      //   //   this.disVariation = 'CONFIGURABLE';
      //   // }
      //   // else {
      //   //   this.disVariation = 'SIMPLE';
      //   // }
      //   this.collectionSize = res?.page?.totalResults;
      //   // this.page = res?.page?.currentPageNumber;
      //   this.loading = false;
      //   $('#create-assignproduct-modal').modal('show');
      // }, error => {
      //   this.loading = false;
      //   this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
      // });
  }
  showproduct(locationdetails: any) {
    ////console.log("locationdetails:::", locationdetails);
    this.locationId = locationdetails.id;

    this.loading = true;
    // this.productDetails = this.warehouseService.getProductsNew();
    this.warehouseService.showProducts(locationdetails.id).subscribe(res => {
      ////console.log("getProductsNew:::", res);
      this.assignedProds = res;
      this.loading = false;
      $('#SHOW-assigndproduct').modal('show');
    },
      error => {
        ////console.log("Error updating");
        this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
        this.loading = false;
      });
  }

  closeassignproductModal() {
    this.assignprodqtyclear();
    $('#create-assignproduct-modal').modal('hide');
  }
  closeShowproductModal() {
    this.assignprodqtyclear();
    $('#show-assignproduct-modal').modal('hide');
  }

  // qty: any;
  assignprodqtyclear() {
    this.isskuSelected = false;
    this.qty = '';
    this.title = '';
    this.prodId = '';
    // this.selectedProductvalue = '';
    // this.productDetails = '';
    // this.loading = false;
  }


  save() {
    if (this.qty == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please enter quantity');
      return;
    }
    this.loading = true;
    this.warehouseService.assignproducts(this.locationId, this.title, this.prodId, this.qty).subscribe(res => {
      this.loading = false;
      this.closeassignproductModal();
    },
      error => {
        ////console.log("Error updating");
        this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
        this.loading = false;
      });
  }
  openUploadTab() {
    this.datasharingService.parentTab = 'warehouse';
    this.datasharingService.addtoTab({ icon: ' left-icons-color icons-Gear', pmenu: 'Settings', menuname: 'Settings', routerLink: '#wareHouse', haschildrens: false, tab: AllMenuTabs.user_settings });
  }
  openEmailConfiguration(wid) {
    this.emailConfigWarehouse = wid;
    this.emailConfigModel = true;
    $('#email-config-modal').modal('show');
  }

  dropdownSettings_channel = {
    singleSelection: true,
    idField: 'id',
    textField: 'display',
    selectAllText: 'Select All',
    unSelectAllText: 'Deselect all',
    itemsShowLimit: 1,
    enableCheckAll: true,
    allowSearchFilter: true,
    clearSearchFilter: true,
    closeDropDownOnSelection: true
  };
  selectedSKU: any = [];

  onItemSelect(event) {
    this.ok();
  }

  ok() {
    if (this.selectedSKU.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Warehouse', 'Please select Product SKU');
      return;
    }
    let selectedvalue = this.productDetails.find(prod => prod.id == this.selectedSKU[0].id);
    this.title = selectedvalue.title;
    this.prodId = selectedvalue.id;
    this.qty = selectedvalue.qty;
    this.isskuSelected = true;

    // let selectedvalue = this.selectedProductvalue;
    // var values = selectedvalue.split("---");
    // this.title = values[0];

  }
  pageChange(page){
    // this.assignproduct()
  }
}
