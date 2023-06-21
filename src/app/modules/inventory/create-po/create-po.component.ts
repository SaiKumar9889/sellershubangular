import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import Stepper from 'bs-stepper';
import { map, Subscription } from 'rxjs';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { SupplierService } from '../../suppliers/services/supplier.service';
import { WarehouseService } from '../../warehouse/services/warehouse.service';
import { PurchaseOrdersService } from '../services/purchase-orders.service';
declare var $: any;
import { jsPDF } from "jspdf";
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { SalsesOrdersService } from '../../orders/services/salses-orders.service';
import { ProductsService } from '../services/products.service';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { ProductSuppliers } from 'src/app/_models/product-suppliers';
const jspdf = new jsPDF();
@Component({
  selector: 'app-create-po',
  templateUrl: './create-po.component.html',
  styleUrls: ['./create-po.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreatePoComponent implements OnInit, OnDestroy {
  private stepper: Stepper;
  loading: boolean = false;
  isEdit: boolean = false;
  dropdownSettings_suppliers: any;
  allSuppliers: any = [];
  selectedSupplier: any = [];
  display:boolean=true;
  dropdownSettings_warehouses: any;
  allWareHouses: any = [];
  selectedWareHouse: any = [];
  dropdownSettings: any;
  allFilters: any = [];
  selectedFilter: any = [];
  dropdownSettings_currency: any = {};
  curencies: any = [];
  selectedCurrency: any = [{ id: 'GBP', name: 'GBP' }];

  poid: any;
  PONumber: any;
  refnumber: any;
  taxper: any=0;
  messagetosupplier: any;
  stockrequiredDate: any;
  selectedDate: NgbDateStruct;

  page: number = 0;
  collectionsize = 0;
  pageSize = environment.defaultPaginationValue;
  total = environment.defaultTotalValue;
  searchValue: any = '';
  searchBy: any = 0;
  searchFrom: any = '';
  searchTo: any = '';
  channelType: any = 'all';
  fliter: any = '0';
  showParentProducts:boolean=false;
  showZeroProducts:boolean=true;
  searchname: any = '0';
  searchValue2: any = '';
  allSupplier:any=[];
  supplier='all_supplier';
  po_subscrption:Subscription;


  constructor(private appTrackingService:AppTrackingService, private router: Router, private dbService: NgxIndexedDBService, private toasterService: ToasterService,
    private warehouseService: WarehouseService, private purchaseOrdersService: PurchaseOrdersService,private dataSharing:DatasharingService,
    private supplierService: SupplierService, private salsesOrdersService: SalsesOrdersService, private productService: ProductsService) {
      let ip:usertrackInput={menu:TrackMenus.INVENTORY,submenu:subMenus.PURCHASEORDERS,page:pages.CREATEPOPAGE,function:"",descrption:"Create PO page loaded"};
    this.appTrackingService.trackUserActivity(ip);
    }
    ngOnDestroy(): void {
      this.po_subscrption.unsubscribe();
    }


  ngOnInit(): void {
    this.display=false;
    this.isEdit = false ;
    this.dropdownSettings = {
      singleSelection: true,
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
    // this.allFilters.push({ key: 'All', value: 'all' });
    this.allFilters.push({ key: 'Pending', value: 'pending' });
    this.allFilters.push({ key: 'Ordering', value: 'ordering' });
    this.allFilters.push({ key: 'Shipping', value: 'shipping' });
    this.allFilters.push({ key: 'Receiving', value: 'receiving' });
    this.allFilters.push({ key: 'Completed', value: 'completed' });
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });
    this.dropdownSettings_suppliers = {
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
    this.dropdownSettings_currency = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 1,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true
    };
    this.dropdownSettings_warehouses = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 1,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true
    };
    this.init();
  }
  async init() {
    await this.getListOfSellers();
    await this.getListOfWareHouses();
    this.curencies.push({ 'id': 'USD', name: 'USD' });
    this.curencies.push({ 'id': 'GBP', name: 'GBP' });
    this.curencies.push({ 'id': 'CAD', name: 'CAD' });
    this.curencies.push({ 'id': 'EUR', name: 'EUR' });
    this.curencies.push({ 'id': 'CNY', name: 'CNY' });
    this.curencies.push({ 'id': 'INR', name: 'INR' });
    this.curencies.push({ 'id': 'AUD', name: 'AUD' });
    this.curencies.push({ 'id': 'SGD', name: 'SGD' });
    this.curencies.push({ 'id': 'THB', name: 'THB' });
    this.curencies.push({ 'id': 'MYR', name: 'MYR' });
    await this.getSuppliers();
    this.po_subscrption=this.dataSharing.po_details.subscribe((res:any)=>{
      //console.log(res);
      if(res.id){
        this.editPODetails(res.id);
        this.poid = res?.id;
      } else {
        this.createPODetails();
      }


    });


    this.stockrequiredDate = new Date().getDate() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getFullYear();
    // this.stockrequiredDate='25-01-22'
    this.selectedDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  }

  pevious() {
    this.stepper.previous();
  }

  next(type: any) {
    if (type === 'savepodetails') {
      this.savePo_header();
      this.stepper.next();
    }
    else if (type === 'products') {
      this.stepper.next();
      this.savepo_products();
      this.print_po();
    } else {
      this.stepper.next();
    }
  }

  async savePo_header() {
    this.isEdit = true ;
    if (this.selectedSupplier.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Select Supplier');
      return false;
    }
    if (this.selectedWareHouse.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Select Warehouse');
      return false;
    }
    if (this.PONumber == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Enter PO Number');
      return false;
    }
    if (this.selectedCurrency.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Select Currency');
      return false;
    }
    if (this.refnumber == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Enter Reference');
      return false;
    }
    // if (this.taxper == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Enter Tax(%)');
    //   return false;
    // }
    if (this.stockrequiredDate == '' || this.stockrequiredDate == null || this.stockrequiredDate == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Select Stock Required Date');
      return false;
    }
    if (this.messagetosupplier == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Enter Message To Supplier');
      return false;
    }
    let selectedwarehouse = this.allWareHouses.find(wr => wr.id == this.selectedWareHouse[0].id);
    let addr1 = selectedwarehouse?.addressline1;
    let addr3 = selectedwarehouse?.addressline3;
    let state = selectedwarehouse?.state;
    let country = selectedwarehouse?.country;
    let postalcode = selectedwarehouse?.postcode;
    let name = selectedwarehouse?.contactname;
    //console.log(selectedwarehouse);
    let qparam = 'id=' + this.poid + '&poId=' + this.PONumber + '&supplierId=' + this.selectedSupplier[0].id + '&warehouseId=' + this.selectedWareHouse[0].id + '&taxPercentage=' + this.taxper + '&shipToAddressName=' + name + '&shiptoAddressLine1=' + addr1 + '&shiptoAddressLine3=' + addr3 + '&shipToState=' + state + '&shipToPostCode=' + postalcode + '&shipToCountry=' + country + '&messageToSupplier=' + this.messagetosupplier + '&expectedReceiveDate=' + this.stockrequiredDate;
    this.purchaseOrdersService.savePo_header(qparam).subscribe((res) => {
      //console.log(res);
      this.toasterService.openToastMessage(ToastTypes.success, 'Create PO', 'PO details saved');
      this.savepo_products()
      this.print_po();
      return true;
    })
  }

   savepo_products() {
    if (this.selectedSupplier.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Select Supplier');
      return false;
    }
    if (this.selectedWareHouse.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Select Warehouse');
      return false;
    }
    if (this.PONumber == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Enter PO Number');
      return false;
    }
    if (this.selectedCurrency.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Select Currency');
      return false;
    }
    if (this.refnumber == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Enter Reference');
      return false;
    }
    // if (this.taxper == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Enter Tax(%)');
    //   return false;
    // }
    if (this.stockrequiredDate == '' || this.stockrequiredDate == null || this.stockrequiredDate == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Select Stock Required Date');
      return false;
    }
    if (this.messagetosupplier == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Enter Message To Supplier');
      return false;
    }
    if (this.selectedFilter.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Select Status');
      return false;
    }
    let selectedwarehouse = this.allWareHouses.find(wr => wr.id == this.selectedWareHouse[0].id);
    //console.log(selectedwarehouse);
    let qparam = 'id=' + this.poid + '&poId=' + this.PONumber + '&supplierId=' + this.selectedSupplier[0].id + '&warehouseId=' + this.selectedWareHouse[0].id + '&taxPercentage=' + this.taxper + '&shipToAddressName=&&shiptoAddressLine1=&shiptoAddressLine3=&shipToState=&shipToPostCode=&shipToCountry=&messageToSupplier=' + this.messagetosupplier + '&expectedReceiveDate=' + this.stockrequiredDate;
    let status = 'id=' + this.poid + '&supplierId=' + this.selectedSupplier[0].id + '&orderstatus=' + this.selectedFilter[0]?.key;

    let ids = [];
    let qty = [];
    let tax = [];
    let price = [];
    this.selectedProducts?.forEach(sp => {
      ids.push(sp.khubProductId);
      qty.push(sp.qty);
      tax.push(sp.taxPercentage);
      price.push(sp.supplierDetails.costPrice);

    });
    qparam = qparam + '&ids=' + ids;
    qparam = qparam + '&qty=' + qty;
    qparam = qparam + '&tax=' + tax;
    qparam = qparam + '&price=' +price;

    status = status + '&ids=' + ids;
    status = status + '&qty=' + qty;
    status = status + '&tax=' + tax;
    status = status + '&price=' + price;



    this.purchaseOrdersService.savepurchaseorderlines(status).subscribe((res) => {
      this.purchaseOrdersService.savePo(qparam).subscribe((res) => {
        this.toasterService.openToastMessage(ToastTypes.success, 'Create PO', 'PO details saved');

        return true;
      });

    });

  }

  savePoHeader() {

  }

  stockRequiredDate(event: any) {
    this.stockrequiredDate = event.day + '-' + event.month + '-' + event.year;
  }

  async openProductsModal() {
    this.selectedSupplierFilter =  JSON.parse(JSON.stringify(this.selectedSupplier));
    await this.getChannelRegistration();
    this.getDisplayProducts();
    $('#search-modal').modal('show');
  }
  onSupplierSelect(event){
    console.log(event);
    this.supplier = event.id;

  }
  channels: any = [];
  async getChannelRegistration() {
    this.salsesOrdersService.getChannelRegistration().subscribe(res => {
      // ////console.log(res);
      this.channels = res;
    }, error => {
      this.loading = false;
    })
  }

  changespage(page: any) {
    this.getDisplayProducts();
  }
  refresh() {
    this.getDisplayProducts();
  }
  reset() {
    this.fliter = '0';
    this.channelType = 'all';
    this.searchname = '0';
    this.searchValue2 = '';
    this.getDisplayProducts();
  }


  modalclosed() {
    this.isDefaultSupplier = false;
    this.selectedSupplierFilter = [];
    this.supplier ='all_supplier';
    $('#search-modal').modal('hide');
  }

  editPODetails(id = -1) {
    this.loading=true;
    this.purchaseOrdersService.editPo(id).subscribe(res => {
      console.log(res);
      this.loading=false;
       this.PONumber='PO_'+this.poid;
      if(res?.purchaseOrderHeader?.supplierId){
        let sup= this.allSuppliers.find(sup=>sup.id==res?.purchaseOrderHeader?.supplierId);
        this.selectedSupplier=[{"id":res?.purchaseOrderHeader?.supplierId,"firstName":sup?.firstName}];
        this.supplier = res?.purchaseOrderHeader?.supplierId;
      }

      let war= this.allWareHouses.find(war=>war.id==res?.purchaseOrderHeader?.warehouseId)

       this.selectedWareHouse=[{"id":res?.purchaseOrderHeader?.warehouseId,"name":war?.name}];
      this.messagetosupplier=res?.purchaseOrderHeader?.messageToSupplier;
      this.PONumber=res?.purchaseOrderHeader?.poId;
      this.refnumber=res?.purchaseOrderHeader?.referenceNumber;
      this.taxper=res?.purchaseOrderHeader?.taxPercentage;
      if(res?.purchaseOrderHeader?.expectedReceiveDate){
        this.selectedDate = { year: new Date(res?.purchaseOrderHeader?.expectedReceiveDate).getFullYear(), month: new Date(res?.purchaseOrderHeader?.expectedReceiveDate).getMonth() + 1, day: new Date(res?.purchaseOrderHeader?.expectedReceiveDate).getDate() };

      } else{
        this.selectedDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };

      }
      this.selectedFilter = [{ key: res.status, value: res.status.toLowerCase() }];
      this.selectedProducts = [];
      res?.orderLines?.forEach(prod=>{
       // let prod=this.allProducts.find(pro=>pro.id==or.id);
         const sp = new ProductSuppliers();
         sp.id = prod.id;
         sp.imageUrl = prod.khubImageURL;
         sp.khubProductId = prod.khubProductId;
         sp.sku = prod.khubProductSKU;
         sp.title = prod.khubProductTitle;
         sp.lineTotalPrice = prod.lineTotalPrice;
         sp.maxValue = prod.maxValue;
         sp.minValue = prod.minValue;
         sp.orderHeaderId = prod.orderHeaderId;
         sp.orderLineStatus = prod.orderLineStatus;
         sp.qty = prod.orderedQty;
         sp.costPrice = prod.price;
         sp.supplierCode = this.selectedSupplier
         sp['supplierDetails'] = {};
         sp['supplierDetails']['costPrice'] =  prod.price;
         sp.productLineDetailsJSON = prod.productLineDetailsJSON;
         sp.receivedQty = prod.receivedQty;
         sp.remarks = prod.remarks;
         sp.stockReceivedDate = prod.stockReceivedDate;
         sp.taxPercentage = prod.taxPercentage;
         sp.taxPrice = (prod.orderedQty *  prod.price * prod.taxPercentage)/ 100;
         this.selectedProducts.push(sp);

      });
      this.totalprice = res.grandTotal;
    let skuString = this.selectedProducts.map(i => i.sku).join(',');
    this.supplierService.getProductSupplierById(skuString,this.selectedSupplier[0].id).subscribe((res: any) => {
      this.selectedProducts.forEach(prod => {
       const prodSupp = res[prod.sku];
       if(prodSupp){
        prod['supplierDetails'] = prodSupp;
       } else {
        prod['supplierDetails'] =new ProductSuppliers();
       }
       prod['supplierDetails']['costPrice'] = prod.costPrice;
     });
      console.log(res)
    })
     // this.saveSelectedProd(1);
      this.print_po(id);

    });
  }



  createPODetails() {
    this.purchaseOrdersService.createPo().subscribe((res: any) => {
      //console.log(res);
      this.poid = res?.id;
      this.PONumber = 'PO_' + this.poid;
    });
  }

  allProducts: any[] = [];
  allProducts_m: any[] = [];
  isDefaultSupplier = false;

  getDisplayProducts() {
    this.loading = true;
    this.productService.getProducts(this.page, this.collectionsize, this.pageSize, this.channelType, this.fliter, this.searchname, this.searchValue2, 'all', 'all', this.supplier, this.showParentProducts, false, this.showZeroProducts,
    this.isDefaultSupplier ).subscribe((res: any) => {
      this.collectionsize = res?.page?.totalResults;
      this.allProducts = res?.products;
      this.allProducts_m = res?.products;
      this.allProducts.map(ap => ap.selected = false);
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
    // this.purchaseOrdersService.getLisTofProducts().subscribe((res: any) => {
    //   //console.log(res);

    // })
  }
  changesSelected(prod: any) {
    prod.selected = !prod.selected;
  }
  isSelectAll: boolean = false;
  checkAll() {
    this.isSelectAll = !this.isSelectAll;
    this.allProducts.map(ap => ap.selected = this.isSelectAll);
  }
  selectedProducts: any = [];
  saveSelectedProd(type = -1) {
   // this.selectedProducts = this.allProducts.filter(ap => ap.selected == true);
   //this.selectedProducts.forEach(i => { i.qty = 0;});
   let skus = [];
   this.allProducts.filter(ap => ap.selected == true).forEach(prod => {
     if(!this.selectedProducts.find(p => p.khubProductId == prod.id)){
      let p =JSON.parse(JSON.stringify(prod));
      p.khubProductId = prod.id;
      p.id = null;
      this.selectedProducts.push(p);
      skus.push({index: this.selectedProducts.length-1, sku:prod.sku});
     }
   })
    //Object.assign(this.selectedProducts, this.allProducts.filter(ap => ap.selected == true));
    let skuString = skus.map(i => i.sku).join(',');
    this.supplierService.getProductSupplierById(skuString,this.selectedSupplier[0].id).subscribe((res: any) => {
      skus.forEach(val => {
        let prod = this.selectedProducts[val.index];
        const prodSupp = res[prod.sku];
        if(prodSupp){
         prod['supplierDetails'] = prodSupp;
        } else {
         prod['supplierDetails'] =new ProductSuppliers();
        }
        if(type == -1){
         prod.taxPercentage = this.taxper;
         this.calculateTotal(prod);

        }else{
         this.totalprice = 0;
         this.selectedProducts.forEach(element => {
           this.totalprice+=element.lineTotalPrice;
         });
        }
      })

      console.log(res)
    })
  }
  calculateTotal(prod){
    try {
      if(prod.qty != null && prod.qty != undefined && prod.supplierDetails){
        prod.lineTotalPrice = (prod.qty * prod.supplierDetails.costPrice  ) + ((prod.qty * prod.supplierDetails.costPrice * prod.taxPercentage)/ 100)
        prod.taxPrice = (prod.qty * prod.supplierDetails.costPrice * prod.taxPercentage)/ 100;
      }
    } catch (error) {
      prod.lineTotalPrice = 0;
      prod.taxPrice = 0;
    }
    this.totalprice = 0.0;
    this.selectedProducts.forEach(element => {
      this.totalprice = this.totalprice+ element.lineTotalPrice;
    });

  }
  remove(prod: any) {
    if(prod.id){
      this.purchaseOrdersService.deletepurchaseorderlines(prod.id).subscribe((res) => {
          this.toasterService.openToastMessage(ToastTypes.success, 'Create PO', 'OrderLine removed');
          this.selectedProducts = this.selectedProducts.filter(p => p.khubProductId != prod.khubProductId);
      }, error=>{
        this.toasterService.openToastMessage(ToastTypes.error, 'Create PO', 'Error');
      });

    } else {
      this.selectedProducts = this.selectedProducts.filter(p => p.khubProductId != prod.khubProductId);
    }
  }
  async getListOfSellers() {
    this.supplierService.getSupplier().subscribe((res: any) => {
      this.allSuppliers = res?.suppliers;
      this.allSuppliers.map(supplier => supplier.name = supplier.firstName);
      return;
    })
  }
  async getListOfWareHouses() {
    this.warehouseService.getWarehouse().subscribe((res: any) => {
      this.allWareHouses = res;
      return;
    })
  }

  close() {
    this.dataSharing.closeCreateCreatePoTab();
  }

  emailDetails: any;
  async sendEmail() {


    //$('#email-modal').modal('show');
    this.purchaseOrdersService.emailGetPo(this.poid).subscribe((res: any) => {
      //console.log(res);
      this.emailDetails = res;
      if( res.orderheader.supplierEmailId){
        this.purchaseOrdersService.sendEmail(this.poid, res.defaultsettings, 'Purchase Order', res.orderheader.supplierEmailId).subscribe((res: any) => {
          //console.log(res);
          this.emailDetails = res;
          this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Email sent successfully');

        });
      }

    });
  }
  async sunbmitPO(){
    if(await this.savePo_header()){
      if( await this.savepo_products()){
        this.print_po();
      }
    }

  }

  sendEmailtouser() {
    this.purchaseOrdersService.sendEmailGetPo(this.poid, '', '').subscribe((res: any) => {
      //console.log(res);
      this.emailDetails = res;
    });
  }

  print() {
    // var w = window.open();
    // var html = $("#printableArea").html();
    // $(w.document.body).html(html);
    // const printContents = document.getElementById("printableArea").innerHTML;
    // const originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    // window.print();
    // w.print();
    // jspdf.fromHtml($('#printableArea').get(0), 10, 10, {
    //   'width': 180
    // });
    let link = environment.ui_base_url + 'printpo';
    this.router.navigate([]).then(result => { window.open(link, '_blank'); });

  }

  printPo: any;
  totalprice: number = 0;
  async print_po(id = -1) {
    this.loading = true;
    this.dbService.clear('shub').subscribe((successDeleted) => {
      //console.log('success? ', successDeleted);
    });

    this.purchaseOrdersService.printpo(this.poid).subscribe((res: any) => {
      //console.log(res);
      this.printPo = res;
      this.loading = false;
      this.dbService
        .add('shub', {
          key: 'printpo',
          value: JSON.stringify(this.printPo),
        })
        .subscribe((key) => {
          //console.log('key: ', key);
        });
        this.selectedProducts.forEach(pr=>{
          if(id == -1){
            this.totalprice=Number(this.totalprice)+Number(pr.costPrice);
          }
        });
      this.dbService
        .add('shub', {
          key: 'printpoProd',
          value: JSON.stringify(this.selectedProducts),
        })
        .subscribe((key) => {
          //console.log('key: ', key);
        });


    }, error => {
      console.log(error)
      this.loading = false;
    });

  }

  emailmodalclosed() {
    $('#email-modal').modal('hide');
  }

  onItemSelect(event: any) {
    // this.getPurchaseOrders(this.selectedFilter[0]?.value?this.selectedFilter[0]?.value:'all');
  }
  searchcontent: any = '';
  filterProduct(event: any) {
    //  console.log(event.target.value);
    if (this.searchcontent == '') {
      this.allProducts = this.allProducts_m;
    } else {
      // console.log(1);
      this.allProducts = this.allProducts_m.filter(prod => prod.title.toLowerCase().includes(event.target.value.toLowerCase()));
    }
  }
  async getSuppliers(){
    this.supplierService.getSupplier().subscribe((res:any)=>{
      this.allSupplier=res?.suppliers;
      return;
    });
  }
  selectedSupplierFilter : any = [];
  onItemSupplier(event:any){
    console.log(event);
    if(event.length > 0){
      this.supplier=event[0].id;
      this.getDisplayProducts();
    } else {
      this.supplier = 'all_supplier';
    }
  }
}
