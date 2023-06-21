import { Component, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { TransferStock } from '../models/TransferStock';
import { TransfersService } from '../services/transfers.service';
import { WarehouseService } from '../services/warehouse.service';
declare let $: any;

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css']
})
export class TransfersComponent implements OnInit {
  loading: boolean = false; shipfrom: string = ''; destwarehouse: string = ''; fliter: any = '';
  constructor(private toasterService: ToasterService, private tranferService: TransfersService, private warehouseService: WarehouseService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getAllWareHouses();
    // this.getwarehouselocations();
    this.dropdownSettings_Product = {
      singleSelection: false,
      idField: 'id',
      textField: 'title',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 1,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true
    };
  }
  openModal() {
    $('#create-newtransfers-modal').modal('show');
  }
  // openProductModal() {
  //   $('#create-newproducts-modal').modal('show');
  // }
  modalclose() {
    $('#create-newproducts-modal').modal('hide');
  }
  closeModal() {
    $('#create-newtransfers-modal').modal('hide');
    this.clear();
  }
  pageSize = environment.defaultPaginationValue;
  total = environment.defaultTotalValue;
  collectionsize = environment.defaultTotalValue;
  allProds: any[] = [];
  searchValue: any = '';
  searchBy: any = 0;
  searchFrom: any = '';
  searchTo: any = '';
  productTitle: string = '';
  page: number = 0;
  page2 = 1;
  currentPage = 3;
  disablepage = 3;
  isDisabled = true;
  dropdownSettings_Product: any = {};
  productIsSelected: boolean = false;


  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  modalclosed() {
    // $('#search-modal').modal('hide');
  }

  changespage(page: any) {
    this.getProducts();
  }

  getProducts() {
    this.loading = true;
    this.tranferService.getTransfer(this.page, this.collectionsize, this.pageSize).subscribe((res: any) => {
      ////console.log(res);
      this.allProds = res?.transfers;
      this.collectionsize = res?.page?.totalResults;
      this.page = res?.page?.currentPageNumber;
      this.loading = false;
      if (this.allProds.length > 0)
        this.productTitle = this.allProds[0].title;
        this.allProds.map(prod => 
          prod.selected = false
          );
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };
  
  isAllChecked: boolean = false;

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
  // modalclosed() {
  //   $('#search-modal').modal('hide');
  // }
  // changespage(pagenum: any) {
  //   ////console.log(pagenum);
  //   this.getDefaultData(pagenum);
  // }
  changePageSize() {
    this.getProducts();
  }
  allWareHouses: any = []; wareHouses: any = []; isWHSelected: boolean = false; isLocSelected: boolean = false;
  getAllWareHouses() {
    this.warehouseService.getWarehouse().subscribe((res: any) => {
      // console.log(res);
      this.allWareHouses = res;
    });
  };

  allwarehouseLocations: any = []; destloc: any='';
  onSelectWarehouse(e: any) {
    this.isWHSelected = true;
    this.wareHouses = this.allWareHouses.filter(wh => wh.id != e);
    // console.log(this.wareHouses);
    this.warehouseService.getwarehouselocations(e).subscribe((res: any) => {
      this.allwarehouseLocations = res.locations;
      // console.log(this.allwarehouseLocations);
    });

  }
  assignedProds: any = []; location: any=''; product: any = []; locations: any = [];
  products: any = []; selectedProduct: any = [];
  onSelectLocation(e: any) {
    this.isLocSelected = true;
    this.warehouseService.showProducts(e).subscribe((res: any) => {
      this.assignedProds = res.locations;
      // console.log(this.assignedProds);
    });
    this.locations = this.allwarehouseLocations.filter(loc =>
      loc.id != e
    );
    // console.log(this.locations);
  }
  onSelectProduct() {
    let selectedid = [];
    selectedid = this.selectedProduct.map(id => id.id);
    ////console.log(selectedid);
    this.products = this.assignedProds.filter(prod => selectedid.includes(prod.id));
    // console.log(this.products);
    this.products.map(pr => pr.aqty = pr.qty);
  }
  onTransfer() {
    if (this.shipfrom == '' || undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'StockTransfer', 'Please select Shipping Warehouse');
      return;
    }
    if (this.destwarehouse == '' || undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'StockTransfer', 'Please select Destination Warehouse');
      return;
    }

    if (this.location == '' || undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'StockTransfer', 'Please select Warehouse Location');
      return;
    }
    if (this.destloc == '' || undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'StockTransfer', 'Please select Destination Warehouse Location');
      return;
    }
    if (this.selectedProduct == '' || undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'StockTransfer', 'Please select Products');
      return;
    }
    // console.log(this.products);
    let transferstockData = [];
    this.products.forEach((s: any) => {
      // console.log(s);
      transferstockData.push({
        srclocationId: + this.location,
        status: "NEW",
        sku: s.sku,
        dstlocationId: + this.destloc,
        title: s.title,
        imageUrl: s.image,
        transferQuantity: + s.qty
      });
    });
    this.loading = true;
    this.warehouseService.updateTransfer(transferstockData).subscribe(res => {
      console.log(res);
      this.closeModal();
      this.getProducts();
      this.loading = false;
      },
      error => {
        ////console.log("Error updating");
        this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
        this.loading = false;
      });
  }
  
  onMarkComplete(pro){
    // console.log(this.allProds);
    // console.log(pro)
    let transferstockData = [];
      transferstockData.push({
        id:pro.id,
        srclocationId: + pro.srclocationId,
        status: "COMPLETE",
        sku: pro.sku,
        dstlocationId: + pro.dstlocationId,
        title: pro.title,
        imageUrl: pro.image,
        transferQuantity: + pro.transferQuantity
      });
    this.loading = true;
    this.warehouseService.updateTransfer(transferstockData).subscribe(res => {
      console.log(res);
      this.closeModal();
      this.getProducts();
      this.loading = false;
      },
      error => {
        ////console.log("Error updating");
        this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
        this.loading = false;
      });
  }
  onMarkInprogress(prod){
    let transferstockData = [];
    transferstockData.push({
      id:prod.id,
      srclocationId: + prod.srclocationId,
      status: "IN PROGRESS",
      sku: prod.sku,
      dstlocationId: + prod.dstlocationId,
      title: prod.title,
      imageUrl: prod.image,
      transferQuantity: + prod.transferQuantity
    });
  this.loading = true;
  this.warehouseService.updateTransfer(transferstockData).subscribe(res => {
    console.log(res);
    this.closeModal();
    this.getProducts();
    this.loading = false;
    },
    error => {
      ////console.log("Error updating");
      this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
      this.loading = false;
    });
  }
  onCancel(prod){
    let transferstockData = [];
    transferstockData.push({
      id:prod.id,
      srclocationId: + prod.srclocationId,
      status: "CANCELLED",
      sku: prod.sku,
      dstlocationId: + prod.dstlocationId,
      title: prod.title,
      imageUrl: prod.image,
      transferQuantity: + prod.transferQuantity
    });
  this.loading = true;
  this.warehouseService.updateTransfer(transferstockData).subscribe(res => {
    console.log(res);
    this.closeModal();
    this.getProducts();
    this.loading = false;
    },
    error => {
      ////console.log("Error updating");
      this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
      this.loading = false;
    });
  }
  mapData(){
   this.products.map(pr => pr.aqty = pr.aqty-pr.qty);
  }
  clear() {
    this.shipfrom = '';
    this.destloc = '';
    this.destwarehouse = '';
    this.location = '';
    this.selectedProduct = [];
    this.products = [];
    this.isWHSelected = false;
    this.isLocSelected = false;
  }
}
