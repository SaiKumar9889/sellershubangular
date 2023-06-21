import { Component, OnDestroy, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { map, Subscription } from 'rxjs';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { SupplierService } from '../../suppliers/services/supplier.service';
import { WarehouseService } from '../../warehouse/services/warehouse.service';
import { PurchaseOrdersService } from '../services/purchase-orders.service';
declare var $: any;
import { jsPDF } from "jspdf";
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
const jspdf = new jsPDF();
@Component({
  selector: 'app-edit-po',
  templateUrl: './edit-po.component.html',
  styleUrls: ['./edit-po.component.scss']
})
export class EditPoComponent implements OnInit,OnDestroy {

  private stepper: Stepper;
  loading: boolean = false;
  dropdownSettings_suppliers: any;
  allSuppliers: any = [];
  selectedSupplier: any = [];

  dropdownSettings_warehouses: any;
  allWareHouses: any = [];
  selectedWareHouse: any = [];

  dropdownSettings_currency: any = {};
  curencies: any = [];
  selectedCurrency: any = [{id:'GBP',name:'GBP'}];

  display:boolean=true;
  poid: any;
  PONumber: any;
  refnumber: any;
  taxper: any=0;
  messagetosupplier: any;
  stockrequiredDate: any;
  po_subscrption:Subscription;
  dropdownSettings: any;
  allFilters: any = [];
  selectedFilter:any=[];
  constructor( private dbService: NgxIndexedDBService,private dataSharing:DatasharingService,private router: Router,private datasharingService:DatasharingService,private toasterService: ToasterService, private warehouseService: WarehouseService, private purchaseOrdersService: PurchaseOrdersService, private supplierService: SupplierService) { }
  ngOnDestroy(): void {
    this.po_subscrption.unsubscribe();
  }

  ngOnInit(): void {
    this.display=false;
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
      textField: 'name',
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
    this.getListOfSellers();
    this.getListOfWareHouses();
    this.getDisplayProducts();
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
    this.po_subscrption=this.datasharingService.po_details.subscribe((res:any)=>{
      //console.log(res);
      this.editPODetails(res.id);
      this.poid = res?.id;

    });
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

  savePo_header() {

    if(this.selectedSupplier.length==0){
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Select Supplier');
      return;
    }
    if(this.selectedWareHouse.length==0){
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Select Warehouse');
      return;
    }
    if(this.PONumber==''){
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Enter PO Number');
      return;
    }
    if(this.selectedCurrency.length==0){
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Select Currency');
      return;
    }
    if(this.refnumber==''){
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Enter Reference');
      return;
    }
    if(this.taxper==''){
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Enter Tax(%)');
      return;
    }
    if(this.stockrequiredDate==''||this.stockrequiredDate==null||this.stockrequiredDate==undefined){
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Select Stock Required Date');
      return;
    }
    if(this.messagetosupplier==''){
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Enter Message To Supplier');
      return;
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
    })
  }

  savepo_products() {
    if(this.selectedSupplier.length==0){
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Select Supplier');
      return;
    }
    if(this.selectedWareHouse.length==0){
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Select Warehouse');
      return;
    }
    if(this.PONumber==''){
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Enter PO Number');
      return;
    }
    if(this.selectedCurrency.length==0){
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Select Currency');
      return;
    }
    if(this.refnumber==''){
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Enter Reference');
      return;
    }
    if(this.taxper==''){
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Enter Tax(%)');
      return;
    }
    if(this.stockrequiredDate==''||this.stockrequiredDate==null||this.stockrequiredDate==undefined){
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Select Stock Required Date');
      return;
    }
    if(this.messagetosupplier==''){
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Enter Message To Supplier');
      return;
    }
    if(this.selectedFilter.length==0){
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create PO', 'Please Select Status');
      return;
    }
    let selectedwarehouse = this.allWareHouses.find(wr => wr.id == this.selectedWareHouse[0].id);
    //console.log(selectedwarehouse);
    let qparam = 'id=' + this.poid + '&poId=' + this.PONumber + '&supplierId=' + this.selectedSupplier[0].id + '&warehouseId=' + this.selectedWareHouse[0].id + '&taxPercentage=' + this.taxper + '&shipToAddressName=&&shiptoAddressLine1=&shiptoAddressLine3=&shipToState=&shipToPostCode=&shipToCountry=&messageToSupplier=' + this.messagetosupplier + '&expectedReceiveDate=' + this.stockrequiredDate;
    let status = 'id=' + this.poid + '&supplierId=' + this.selectedSupplier[0].id + '&orderstatus=' + this.selectedFilter[0]?.key ;

    this.selectedProducts?.forEach(sp => {
      qparam = qparam + '&ids=' + sp.id;
      qparam = qparam + '&qty=' + sp.qty;
      qparam = qparam + '&tax=' + sp.taxRate;
      qparam = qparam + '&price=' + sp.costPrice;

      status = status + '&ids=' + sp.id;
      status = status + '&qty=' + sp.qty;
      status = status + '&tax=' + sp.taxRate;
      status = status + '&price=' + sp.costPrice;
    });


    //console.log(this.selectedProducts);
    this.purchaseOrdersService.savePo(qparam).subscribe((res) => {
      //console.log(res);
      this.toasterService.openToastMessage(ToastTypes.success, 'Create PO', 'PO details saved');
    });
    this.purchaseOrdersService.savepurchaseorderlines(status).subscribe((res) => {
      //console.log(res);
     // this.toasterService.openToastMessage(ToastTypes.success, 'Create PO', 'PO details saved');
    });
  }

  savePoHeader() {

  }

  stockRequiredDate(event: any) {
    this.stockrequiredDate = event.day + '-' + event.month + '-' + event.year;
  }

  openProductsModal() {
    $('#search-modal').modal('show');
    this.getDisplayProducts();
  }

  modalclosed() {
    $('#search-modal').modal('hide');
  }

  editPODetails(poid:any) {
    this.loading=true;
    this.purchaseOrdersService.editPo(poid).subscribe(res => {
      console.log(res);
      this.loading=false;
      // this.PONumber='PO_'+this.poid;
      if(res?.purchaseOrderHeader?.supplierId){
        let sup= this.allSuppliers.find(sup=>sup.id==res?.purchaseOrderHeader?.supplierId);
        this.selectedSupplier=[{"id":res?.purchaseOrderHeader?.supplierId,"name":sup?.name}];
      }

    //  let war= this.allWareHouses.find(war=>war.id==res?.purchaseOrderHeader?.supplierId)

      // this.selectedWareHouse=[{"id":res?.purchaseOrderHeader?.supplierId,"name":war?.name}];
      this.messagetosupplier=res?.purchaseOrderHeader?.messageToSupplier;
      this.PONumber=res?.purchaseOrderHeader?.poId;
      this.refnumber=res?.purchaseOrderHeader?.referenceNumber;
      this.taxper=res?.purchaseOrderHeader?.taxPercentage;
      if(res?.purchaseOrderHeader?.expectedReceiveDate){
        this.selectedDate = { year: new Date(res?.purchaseOrderHeader?.expectedReceiveDate).getFullYear(), month: new Date(res?.purchaseOrderHeader?.expectedReceiveDate).getMonth() + 1, day: new Date(res?.purchaseOrderHeader?.expectedReceiveDate).getDate() };

      } else{
        this.selectedDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };

      }

      res?.orderLines?.forEach(or=>{
        let prod=this.allProducts.find(pro=>pro.id==or.id);
        // this.selectedProducts.push(prod);

        this.selectedProducts.push( {id:or.id,"sku":or.khubProductSKU,"imageUrl":or.khubImageURL,"title":or.khubProductTitle,"costPrice":or.price,"qty":or.orderedQty,"taxRate":or.taxPercentage,"total":or.lineTotalPrice});

      });
console.log(this.selectedProducts);
    });
  }



  createPODetails(poid:any) {
    this.purchaseOrdersService.createPo().subscribe((res: any) => {
      //console.log(res);
      this.poid = res?.id;
      this.PONumber='PO_'+this.poid;
    });
  }

  allProducts: any[] = [];
  allProducts_m: any[] = [];

  getDisplayProducts() {
    this.loading = true;
    this.purchaseOrdersService.getLisTofProducts().subscribe((res: any) => {
      //console.log(res);
      this.allProducts = res;
      this.allProducts_m = res;
      this.allProducts.map(ap => ap.selected = false);
      this.loading = false;
    })
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
  saveSelectedProd() {
    this.selectedProducts = this.allProducts.filter(ap => ap.selected == true);
  }
  remove(prod: any) {
    this.selectedProducts = this.selectedProducts.filter(prods => prods.id != prod.id);
  }
  getListOfSellers() {
    this.supplierService.getSupplier().subscribe((res: any) => {
      this.allSuppliers = res?.suppliers;
      this.allSuppliers.map(supplier => supplier.name = supplier.firstName);
    })
  }
  getListOfWareHouses() {
    this.warehouseService.getWarehouse().subscribe((res: any) => {
      this.allWareHouses = res;
    })
  }
  close() {
    this.dataSharing.closeCreateEditedPoTab();
  }


  emailDetails:any;
  sendEmail() {
    let obj ={
       attachelabel :true,
       dontshowprice :true,
       confirmationcallbackurl :true,
       invoiceonly :true
    }


    //$('#email-modal').modal('show');
    this.purchaseOrdersService.sendEmail(this.poid,obj).subscribe((res: any) => {
      //console.log(res);
      this.emailDetails=res;
    });
  }

  sendEmailtouser(){
    this.purchaseOrdersService.sendEmailGetPo(this.poid,'','').subscribe((res: any) => {
      //console.log(res);
      this.emailDetails=res;
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

  printPo:any;
  totalprice:any=0;
  print_po() {
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
          this.totalprice=Number(this.totalprice)+Number(pr.costPrice);
        });
      this.dbService
        .add('shub', {
          key: 'printpoProd',
          value: JSON.stringify(this.selectedProducts),
        })
        .subscribe((key) => {
          //console.log('key: ', key);
        });


    });

  }


  emailmodalclosed(){
    $('#email-modal').modal('hide');
  }

  onItemSelect(event: any) {
    // this.getPurchaseOrders(this.selectedFilter[0]?.value?this.selectedFilter[0]?.value:'all');
   }

   searchcontent:any='';
   filterProduct(event:any){
     console.log(event.target.value);
     if(this.searchcontent==''){
       this.allProducts=this.allProducts_m;
     }else{
      console.log(1);
       this.allProducts=this.allProducts_m.filter(prod=>prod.title.toLowerCase().includes(event.target.value.toLowerCase()));
     }
   }
   supplier='all_supplier';

   onSupplierSelect(event){
    console.log(event);
    this.supplier = event.id;

  }
  selectedDate: NgbDateStruct;


}
