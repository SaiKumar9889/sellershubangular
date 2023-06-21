import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Utills } from 'src/app/utills/Utills';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ProductsService } from '../../inventory/services/products.service';
import { CreateOrdersService } from '../services/create-orders.service';
import { ViewOrderService } from '../services/view-order.service';
declare var $: any;

@Component({
  selector: 'app-duplicate-order',
  templateUrl: './duplicate-order.component.html',
  styleUrls: ['./duplicate-order.component.scss']
})
export class DuplicateOrderComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  dropdownSettings_channel: any = {};
  dropdownSettings_country: any = {};
  dropdownSettings_currency: any = {};
  allChannels: any = [];
  selectedChannle: any;
  allCountries: any = [];
  selectedCountry: any;
  selectedCountry_s: any;
  AllProducts: any = [];
  Products: any = [];
  AllSales: any = [];
  detailsSub: Subscription;
  activeOrderInfo: any;
  id: any;
  weightkg: any = '';
  heightkg: any = '';
  depth: any = '';
  width: any = '';
  constructor(private viewOrderService: ViewOrderService, private datePipe: DatePipe,
    private datasharingService: DatasharingService, private toasterService: ToasterService,
    private createOrdersService: CreateOrdersService, private productService: ProductsService) {
    this.detailsSub = this.datasharingService.duplicateOrderDetails.subscribe(res => {
      ////console.log(res);
      if (res != undefined && res != null) {
        this.activeOrderInfo = res;
        this.channelId=res?.channelUserId;
        this.getOrdeDetails(res.channelOrderId);
      }
    });
  }

  ngOnDestroy(): void {
    this.detailsSub.unsubscribe();
  }

  ngOnInit(): void {
   
    this.getAllChannels();
    this.createOrder()
    this.dropdownSettings_channel = {
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

    this.dropdownSettings_country = {
      singleSelection: true,
      idField: 'country_code',
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
      idField: 'code',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 1,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true
    };
    this.allCountries = this.datasharingService.getCountries();
    
  }
prodId: any;
  addedProducts: any = [];
  getOrdeDetails(orderid: any) {
    this.loading = true;
    this.viewOrderService.editOrderInfo(orderid).subscribe((res: any) => {
      ////console.log(res);
      // this.orderDetails = res;
      this.curencies = res.currencyCodeList;
      $('#productstable').DataTable().destroy();
      $('#customerTable').DataTable().destroy();
      // this.curencies=res.channelUsers;
      // this.allChannels = res.channelUsers;
      this.existingCustomers = res.customers;
      this.existingCustomers.map(cust => cust.selected = false);
      this.allChannels.map(ch => ch.display = ch.type + "-" + (ch.name == null ? '' : ch.name));
      this.AllProducts = res.products;
      this.AllSales = res.sales;
      this.getProducts()
      this.AllProducts.map(prod => prod.selected = false);
      this.AllProducts.map(prod => prod.userQuantity = 1);
      // this.orderDetails = res?.order;
      //this.orderid = res?.order?.orderId;
      this.orderStatus = 'Unshipped';
      this.orderStatusd = 'Unshipped';
      this.Channel = res?.order?.channel;

      this.addedProducts = res?.sales;
      this.addedProducts.forEach(pr => {
        ////console.log(pr.orderItemId);
        const item = this.AllProducts.find(ap => ap.id == pr.orderItemId);
        if (item) {
          item.selected = false;
        }
        if (pr.weight == null || pr.weight == "null" || pr.weight == ""){
          pr.weight = 0;
        }
        if (pr.width == null || pr.width == "null" || pr.width == ""){
          pr.width = 0;
        }
        if (pr.length == null || pr.length == "null" || pr.length == ""){
          pr.length = 0;
        }
        if (pr.depth == null || pr.depth == "null" || pr.depth == ""){
          pr.depth = 0;
        }
        ////console.log(this.AllProducts.find(ap => ap.id==pr.orderItemId));
      })
      this.addedProductsSnapChat = JSON.parse(JSON.stringify(res?.sales));
      // this.orderDate = this.datePipe.transform(res?.order?.purchaseDate, Utills.UK_DATE);
      this.orderDate = res?.order?.purchaseDate;
      this.loadcustomerTablePagenation();
      this.selectedCountry = [{ country_code: res.order.billingCountryCode, name: res.order.billingAddressCountry }];
      this.selectedCountry_s = [{ country_code: res.order.shipCountryCode, name: res.order.shipCountry }];
      const curObj = this.curencies.find(i => i.code == res.order.currencyCode);
      if (curObj) {
        this.selectedCurrency = [{ code: curObj.code, name: curObj.name }];
      }

      if (this.allChannels && this.allChannels.length > 0) {
        let schan = this.allChannels.find(ch => ch.type.toLowerCase() == this.Channel.toLowerCase());
        //console.log(schan);
        this.selectedChannle = [{ display: schan.display, id: schan.id }];
      }


      // this.addedProducts.forEach(pr => {
      //   ////console.log(pr.orderItemId);
      //   const item = this.AllProducts.find(ap =>ap.id==pr.orderItemId);
      //   if(item){
      //     item.selected = true;
      //   }

      //   ////console.log(this.AllProducts.find(ap => ap.id==pr.orderItemId));
      // })
      // this.selectedChannle = [{ id: schan.id, display: schan.type }];
      this.customerName = res?.order?.buyerName;
      this.customerEmail = res?.order?.buyerEmail;
      this.customerPhone = res?.order?.shipPhoneNumber;
      this.b_address_1 = res?.order?.billingAddressLine1;
      this.b_address_2 = res?.order?.billingAddressline2;
      this.b_address_3 = res?.order?.billingAddressline3;
      this.b_city = res?.order?.billingAddressCity;
      this.b_state_country = res?.order?.billingAddressState;
      this.b_postcode = res?.order?.billingAddressPostcode;
      this.b_country = res?.order?.billingAddressCountry;
      this.s_address_1 = res?.order?.shipAddress1;
      this.s_address_2 = res?.order?.shipAddress2;
      this.s_address_3 = res?.order?.shipAddress3;
      this.s_city = res?.order?.shipCity;
      this.s_state_country = res?.order?.shipState;
      this.s_postcode = res?.order?.shipPostalCode;
      this.s_country = res?.order?.shipCountry;
      this.shippingcharges = res?.order?.shippingPrice;
      this.subtotal = res?.order?.subTotal;
      this.total = res?.order?.totalPrice;
      this.paymentMethod = res?.order?.paymentMethod ? res?.order?.paymentMethod : '';
      if (['', 'card', 'cash'].indexOf(this.paymentMethod) == -1) {
        this.paymentMethod = 'other'
      }
      this.shippingcharges = (res?.order?.shippingPrice == "" || res?.order?.shippingPrice == null) ? 0 : res?.order?.shippingPrice;
      this.shippingService = res?.order?.shippingMethod;

      this.paymentStatus = res?.order?.paymentsStatus;
      if(res?.order?.billingAddressLine1 == null || res?.order?.billingAddressLine1 == ''){
        this.b_address_1 = this.s_address_1 ;
      }
      if(res?.order?.shipAddress1 == null || res?.order?.shipAddress1 == ''){
        this.s_address_1 = this.b_address_1 ;
      }
      if(res?.order?.billingAddressLine2 == null || res?.order?.billingAddressLine2 == ''){
        this.b_address_2 = this.s_address_2 ;
      }
      if(res?.order?.shipAddress2 == null || res?.order?.shipAddress2 == ''){
        this.s_address_2 = this.b_address_2 ;
      }
      if(res?.order?.billingAddressLine3 == null || res?.order?.billingAddressLine3 == ''){
        this.b_address_3 = this.s_address_3 ;
      }
      if(res?.order?.shipAddress3 == null || res?.order?.shipAddress3 == ''){
        this.s_address_3 = this.b_address_3 ;
      }
      if(res?.order?.billingAddressCity == null || res?.order?.billingAddressCity == ''){
        this.b_city = this.s_city ;
      }
      if(res?.order?.shipCity == null || res?.order?.shipCity == ''){
        this.s_city = this.b_city ;
      }
      if(res?.order?.billingAddressState == null || res?.order?.billingAddressState == ''){
        this.b_state_country = this.s_state_country ;
      }
      if(res?.order?.shipState == null || res?.order?.shipState == ''){
        this.s_state_country = this.b_state_country ;
      }
      if(res?.order?.billingAddressPostcode == null || res?.order?.billingAddressPostcode == ''){
        this.b_postcode = this.s_postcode ;
      }
      if(res?.order?.shipPostalCode == null || res?.order?.shipPostalCode == ''){
        this.s_postcode = this.b_postcode ;
      }
      if(res?.order?.billingAddressCountry == null || res?.order?.billingAddressCountry == ''){
        this.selectedCountry = this.allCountries.filter(s => s.country_code == res?.order?.shipCountryCode);
      }
      if(res?.order?.shipCountry == null || res?.order?.shipCountry == ''){
        this.selectedCountry_s = this.allCountries.filter(s => s.name == this.s_country);
      }
      // this.addToUserOrder();
      this.caluculateTotal();
      this.loading = false;
    }, error => {
      this.loading = false;
    });
    
  }
  individualselection(event: any) {
    this.AllProducts.find(prod => prod.id == event.id).selected = !this.AllProducts.find(prod => prod.id == event.id).selected;
  }
  selectedProducts: any = [];
  addToUserOrder() {
    this.addedProducts.forEach(pr => {
      ////console.log(pr.orderItemId);
      const item = this.AllProducts.find(ap => ap.id == pr.orderItemId);
      if (item) {
        item.selected = false;
      }
      if (pr.weight == null || pr.weight == "null" || pr.weight == ""){
        pr.weightKg = 0;
      }
      if (pr.width == null || pr.width == "null" || pr.width == ""){
        pr.width = 0;
      }
      if (pr.length == null || pr.length == "null" || pr.length == ""){
        pr.length = 0;
      }
      if (pr.depth == null || pr.depth == "null" || pr.depth == ""){
        pr.depth = 0;
      }
      ////console.log(this.AllProducts.find(ap => ap.id==pr.orderItemId));
    })
    this.AllProducts.filter(sp => sp.selected == true).forEach(prod => {
      prod['itemPrice'] = prod.sellingPrice;
      prod['quantityPurchased'] = prod.userQuantity ? prod.userQuantity : 1;
      prod['weight'] = prod.weightKg;
      prod['length'] = prod.length;
      prod['depth'] = prod.depth;
      prod['width'] = prod.width;
      //console.log(prod);
      this.addedProducts.push(prod)
    });
    this.AllProducts.map(p => p.selected = false);
    this.caluculateTotal();
  }

  isOrderGenerated: boolean = false;
  createOrderByChannel() {
    // this.createOrder();
    this.isOrderGenerated = true;
    this.selectedCountry = [{ country_code: "GB", name: "United Kingdom" }];
    this.selectedCountry_s = [{ country_code: "GB", name: "United Kingdom" }];
    this.selectedCurrency = [{ code: 'GBP', name: 'Sterling Pound' }];
  }

  removeOrder(orders: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result) {
        this.createOrdersService.removeOrderFromDraft(orders.id).subscribe(res => {
          this.toasterService.openToastMessage(ToastTypes.info, 'Create Order', 'Removed Successfully');
        })
        Swal.fire(
          'Remove Order From Draft Orders!',
          'Your order has deleted.',
          'success'
        )
      }
    });
  }

  getAllChannels() {
    this.createOrdersService.getChannelRegistration().subscribe(res => {
      this.allChannels = res;
      this.allChannels.map(ch => ch.display = ch.type + "-" + ch.name);
    }, error => {
      this.loading = false;
    });
  }

  pageSize = environment.defaultPaginationValue;
  collectionsize = 0;
  page: number = 1;

  addnewItem() {
    // this.getProducts(1);
    $('#products-modal').modal('show');
  };
  getProducts() {
    this.AllSales.forEach(s=> {
      this.productService.getProducts(this.page, this.collectionsize, this.pageSize, 'all', 0, '1', s.sku, 'all', 'all', 'all_supplier', false, false, true, false).subscribe((res: any) => {
        
        this.Products = res?.products;
        this.Products.forEach(s=>this.prodId=s.id)
      }, error => {
        this.loading = false;
        this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
      });
    })
  }
  changespage(page: any) {
    this.getProducts();
  }
  productsModalClose() {
    $('#products-modal').modal('hide');
  }
  loadProductsPagenation() {
    $(function () {
      // $('#productstable').DataTable();
      $('#productstable').DataTable({
        responsive: true,
        pagingType: "simple_numbers",
        pageLength: 10,
        lengthChange: true,
        dom: 'Bfrtip',
        buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        columnDefs: [
          {
            "targets": 2, // your case first column
            "className": "text-center"
          },
          {
            "targets": 3, // your case first column
            "className": "text-center"
          }
        ]
      });
      $('.buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel').addClass('btn btn-primary mr-1');
    });
  }
  loadcustomerTablePagenation() {
    $(function () {
      // $('#customerTable').DataTable();
      $('#customerTable').DataTable({
        responsive: true,
        pagingType: "simple_numbers",
        pageLength: 10,
        lengthChange: true,
        dom: 'Bfrtip',
        buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        columnDefs: [
          {
            "targets": 2, // your case first column
            "className": "text-center"
          },
          {
            "targets": 3, // your case first column
            "className": "text-center"
          }
        ]
      });
      $('.buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel').addClass('btn btn-primary mr-1');
    });
  }

  curencies: any = [];
  existingCustomers: any = [];
  selectedCurrency: any;
  orderDetails: any;
  channelId: any;
  createOrder() {
    this.loading = true;
    this.createOrdersService.createOrder(this.channelId == null ? -1 : this.channelId).subscribe((res: any) => {
      ////console.log(res);
      // this.curencies = res.list;
      // $('#productstable').DataTable().destroy();
      // $('#customerTable').DataTable().destroy();
      // // this.curencies=res.channelUsers;
      // this.allChannels = res.channelUsers;
      // this.existingCustomers = res.customers;
      // this.existingCustomers.map(cust => cust.selected = false);
      // this.allChannels.map(ch => ch.display = ch.type + "-" + (ch.name == null ? '' : ch.name));
      // this.AllProducts = res.products;
      // this.AllProducts.map(prod => prod.selected = false);
      // this.AllProducts.map(prod => prod.userQuantity = 1);
      // this.AllProducts.map(prod => prod.sprice=1);
      this.orderDetails = res?.order;
      this.orderid = res?.order?.orderId;
      // this.orderStatus = res?.order?.orderStatus;
      // this.Channel = res?.order?.channel;
      // this.orderDate = this.datePipe.transform(res?.order?.purchaseDate, Utills.UK_DATE);
      this.loadProductsPagenation();
      // this.loadcustomerTablePagenation();
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onItemSelect(item: any) {
    ////console.log(item);
    let channels = this.allChannels.find(ch => ch.id == item.id);
    this.Channel = channels.type;
    this.channelId = channels.id
  }

  onItemSelectCountry(item: any) {
    ////console.log(item);
    this.s_countrycode = item.country_code;
    this.s_country = item.name;
  }
  onItemSelectCountryBil(item: any) {
    ////console.log(item);
    this.b_country_code = item.country_code;
    this.b_country = item.name;
  }
  onItemSelectCurrency(item: any) {
    ////console.log(item);
    this.currency = item.code;
  }
  orderid: any = '';
  Channel: any = '';
  orderStatus: any;
  orderDate = this.datePipe.transform(new Date(), Utills.UK_DATE);
  customerName: any = '';
  customerEmail: any = '';
  customerPhone: any = '';
  b_address_1 = '';
  b_address_2 = '';
  b_address_3 = '';
  b_city = '';
  b_state_country = '';
  b_postcode = '';
  b_country = '';
  s_address_1 = '';
  s_address_2 = '';
  s_address_3 = '';
  s_city = '';
  s_state_country = '';
  s_postcode = '';
  s_country = '';
  currency: any = "GBP";
  shippingcharges: number = 0;
  shippingService: any = '';

  paymentMethod: any = '';

  total: number = 0;
  shippingchaeges: number = 0;
  subtotal: number = 0;
  orderStatusd: any = '';
  s_countrycode: any;
  b_country_code: any;
  findByUserName(event: any) {
    ////console.log(event.target.value);
  }
  openCustomerModal() {
    $('#customer-modal').modal('show');
  }
  customerModalClose() {
    $('#customer-modal').modal('hide');
  }
  selectedCustomer: any;
  individualselectionCustomer(event: any) {
    this.existingCustomers.find(cust => {
      if (cust.id == event.id) {
        cust.selected = true;
        this.selectedCustomer = event;
      } else {
        cust.selected = false;
      }
    })
  }
  addTocustomer() {
    this.customerName = this.selectedCustomer?.firstName;
    this.customerEmail = this.selectedCustomer?.email;
    this.customerPhone = this.selectedCustomer?.phone;
    this.b_address_1 = this.selectedCustomer?.billingAddressline1;
    this.b_address_2 = this.selectedCustomer?.billingAddressline2;
    this.b_address_3 = this.selectedCustomer?.billingAddressline3;
    this.b_city = this.selectedCustomer?.billingCity;
    this.b_state_country = this.selectedCustomer?.billingState;
    this.b_postcode = this.selectedCustomer?.billingPostcode;
    this.b_country = this.selectedCustomer?.billingCountry;
    this.s_address_1 = this.selectedCustomer?.addressline1;
    this.s_address_2 = this.selectedCustomer?.addressline2;
    this.s_address_3 = this.selectedCustomer?.addressline3;
    this.s_city = this.selectedCustomer?.city;
    this.s_state_country = this.selectedCustomer?.state;
    this.s_postcode = this.selectedCustomer?.postcode;
    this.s_country = this.selectedCustomer?.country;
    this.selectedCountry = this.allCountries.find(cou => cou.name.toLowerCase() == this.b_country?.toLowerCase());
    this.selectedCountry_s = this.allCountries.find(cou => cou.name.toLowerCase() == this.s_country?.toLowerCase());
    ////console.log(this.selectedCountry);
    ////console.log(this.selectedCountry_s);

  }
  isSameAsBilling: boolean = true;
  sameAsBilling(event: any) {
    this.isSameAsBilling = !this.isSameAsBilling;
    if (this.isSameAsBilling) {
      this.s_address_1 = this.b_address_1;
      this.s_address_2 = this.b_address_2;
      this.s_address_3 = this.b_address_3;
      this.s_city = this.b_city;
      this.s_state_country = this.b_state_country;
      this.s_postcode = this.b_postcode;
      this.s_country = this.b_country;
      this.selectedCountry_s = this.selectedCountry;
    } else {
      this.s_address_1 = "";
      this.s_address_2 = "";
      this.s_address_3 = "";
      this.s_city = "";
      this.s_state_country = "";
      this.s_postcode = "";
      this.s_country = "";
      this.selectedCountry_s = null;
    }
  }
  sameAsBillingCopy() {
    if (this.isSameAsBilling) {
      this.s_address_1 = this.b_address_1;
      this.s_address_2 = this.b_address_2;
      this.s_address_3 = this.b_address_3;
      this.s_city = this.b_city;
      this.s_state_country = this.b_state_country;
      this.s_postcode = this.b_postcode;
      this.s_country = this.b_country;
      this.selectedCountry_s = this.selectedCountry;
    }
  }

  isSameAsShipping: boolean = false;
  sameAsShipping(event: any) {
    this.isSameAsShipping = !this.isSameAsShipping;
    if (this.isSameAsShipping) {
      this.b_address_1 = this.s_address_1;
      this.b_address_2 = this.s_address_2;
      this.b_address_3 = this.s_address_3;
      this.b_city = this.s_city;
      this.b_state_country = this.s_state_country;
      this.b_country = this.s_country;
      this.b_postcode = this.s_postcode;
      this.selectedCountry = this.selectedCountry_s;
    } else {
      this.b_address_1 = "";
      this.b_address_2 = "";
      this.b_address_3 = "";
      this.b_city = "";
      this.b_state_country = "";
      this.s_postcode = "";
      this.selectedCountry = null;
    }
  }
  sameAsShippingCopy() {
    if (this.isSameAsShipping) {
      this.b_address_1 = this.s_address_1;
      this.b_address_2 = this.s_address_2;
      this.b_address_3 = this.s_address_3;
      this.b_city = this.s_city;
      this.b_state_country = this.s_state_country;
      this.b_country = this.s_country;
      this.b_postcode = this.s_postcode;
      this.selectedCountry = this.selectedCountry_s;
    }
  }

  deleteProduct(prod: any) {
    // const item = this.AllProducts.find(sp => sp.id == prod.id);
    // if(item){
    //   item.selected = false
    // }
    //console.log(this.selectedChannle);
    this.createOrdersService.remove(prod.channelOrderId, prod.id).subscribe(res => {
      ////console.log(res);
      this.toasterService.openToastMessage(ToastTypes.info, 'Create Order', 'Product Removed Successfully');
      this.addedProducts = this.addedProducts.filter(aprod => aprod.id != prod.id);
      this.addToUserOrder();
    }, error => {
      this.loading = false;
    });
  }
  // caluculateTotal() {
  //   this.selectedProducts.forEach(sp => {
  //     if (sp.sellingPrice != null && sp.userQuantity != null && sp.userQuantity != '' && sp.sellingPrice != '')
  //       this.subtotal = sp?.sellingPrice * sp.userQuantity + this.subtotal;
  //   });
  //   this.total = this.subtotal + Number(this.shippingcharges);
  // }
  caluculateTotal() {
    this.subtotal = 0;
    this.addedProducts.forEach(sp => {
      if (sp.itemPrice != null && sp.quantityPurchased != null && sp.quantityPurchased != '' && sp.itemPrice != '')
        this.subtotal = sp?.itemPrice * sp.quantityPurchased + this.subtotal;
    });
    this.total = this.subtotal + Number(this.shippingcharges);
  }
  async saveProduct(prod: any, addedProd = null, exist:boolean,existid:any) {
    //console.log(prod)
    let id ;
    if(exist){
      id= existid;
    } else{
      id = prod.id;
    }
    await this.createOrdersService.saveProductItem(prod.id, this.orderDetails.id, prod.itemPrice, prod.sku, prod.quantityPurchased,prod.weight,prod.length,prod.width,prod.depth);
  }
  async addProduct(id: any) {
    await this.createOrdersService.addProductToOrder(this.orderDetails.id, id);
  }
  paymentStatus: any = '';
  changePaymentStatus(event: any) {
    ////console.log(event.target.value);
    this.paymentStatus = event.target.value;
  }

  addedProductsSnapChat: any = [];
  updateOrders() {
    if(this.s_city =='' || this.s_city == ""){
      this.s_city = null
    }
    if(this.s_address_1 =='' || this.s_address_1 == ""){
      this.s_address_1 = null
    }
    if(this.s_address_2 =='' || this.s_address_2 == ""){
      this.s_address_2 = null
    }
    if(this.s_address_3 =='' || this.s_address_3 == ""){
      this.s_address_3 = null
    }
    if(this.s_postcode =='' || this.s_postcode == ""){
      this.s_postcode = null
    }
    if(this.s_state_country =='' || this.s_state_country == ""){
      this.s_state_country = null
    }
    if(this.b_city =='' || this.b_city == ""){
      this.s_city = null
    }
    if(this.b_address_1 =='' || this.b_address_1 == ""){
      this.b_address_1 = null
    }
    if(this.b_address_2 =='' || this.b_address_2 == ""){
      this.b_address_2 = null
    }
    if(this.b_address_3 =='' || this.b_address_3 == ""){
      this.b_address_3 = null
    }
    if(this.b_postcode =='' || this.b_postcode == ""){
      this.b_postcode = null
    }
    if(this.b_state_country =='' || this.b_state_country == ""){
      this.b_state_country = null
    }
    if(this.customerEmail =='' || this.customerEmail == ""){
      this.customerEmail = null
    }
    if(this.customerName =='' || this.customerName == ""){
      this.customerName = null
    }
    if(this.customerPhone =='' || this.customerPhone == ""){
      this.customerPhone = null
    }
    if(this.paymentStatus =='' || this.paymentStatus == ""){
      this.paymentStatus = null
    }
    if(this.paymentMethod =='' || this.paymentMethod == ""){
      this.paymentMethod = null
    }
    if (this.orderStatus == null || this.orderStatus == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Order', 'Please select order status');
    } else if (this.currency == null || this.currency == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Order', 'Please select currency');
    }
    else if (this.customerName == null || this.customerName == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Order', 'Please enter cutomer name');
    } else  if (this.customerEmail == null || this.customerEmail == undefined || this.customerEmail == '' ) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Order', 'Please select customer email');
    } else  if (this.customerPhone == null || this.customerPhone == undefined || this.customerPhone == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Order', 'Please select buyer phone number');
    }

    else if (this.s_address_1 == null || this.s_address_1 == '' || this.s_address_1 == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Order', 'Please select shipping address1');
    }
    else if (this.s_city == null || this.s_city == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Order', 'Please select shipping city');
    }

    else if (this.selectedCountry_s[0]['name'] == null || this.selectedCountry_s[0]['name'] == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Order', 'Please select shipping country');
    }
    else if (this.orderStatusd == null || this.orderStatusd == '' || this.orderStatusd == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Order', 'Please select order status');
    }
    else if (this.addedProducts == [] || this.addedProducts.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Order', 'Please select Products');
    }
    else {

      let channel = this.allChannels.find(ch => ch.type == this.Channel);
      let address = {
        "billingAddressCity": this.s_city,
        "billingAddressCountry": this.selectedCountry[0]['name'],
        "billingAddressCountryCode": this.selectedCountry[0]['country_code'],
        "billingAddressLine1": this.s_address_1,
        "billingAddressLine2": this.s_address_2,
        "billingAddressLine3": this.s_address_3,
        "billingAddressPostcode": this.s_postcode,
        "billingAddressState": this.s_state_country,
        "buyerEmail": this.customerEmail,
        "buyerName": this.customerName,
        "buyerPhoneNumber": this.customerPhone,
        "channel": this.Channel,
        "channelUserId": channel.id,
        "customerId": 0,
        "currencyCode": this.selectedCurrency[0]['code'],
        "id": 0,
        "numberOfItemsShipped": 0,
        "numberOfItemsUnshipped": 0,
        "orderId": this.orderDetails.id,
        "orderStatus": this.orderStatusd,
        "paymentsStatus": this.paymentStatus,
        "paymentMethod": this.paymentMethod,
        "shipAddress1": this.s_address_1,
        "shipAddress2": this.s_address_2,
        "shipAddress3": this.s_address_3,
        "shipCity": this.s_city,
        "shipCountry": this.selectedCountry_s[0]['name'],
        "shipCountryCode": this.selectedCountry_s[0]['country_code'],
        "shipName": this.customerName,
        "shipPhoneNumber": this.customerPhone,
        "shipPostalCode": this.s_postcode,
        "shipState": this.s_state_country,
        "shipStatus": this.orderStatusd,
        "shippingMethod":this.shippingService,
        "shippingPrice": this.shippingcharges,
        "site": channel.site
      }


      ////console.log(address);
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to edit order !",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, do it!'
      }).then(async (result) => {
        ////console.log(result);
        if (result?.value) {
          this.loading = true;
          for (let i = 0; i < this.Products.length; i++) {                      
            // const prod = await this.addProduct(this.addedProducts[i].orderItemId);
            
            const prod =await this.createOrdersService.addProductToOrder(this.orderDetails.id, this.Products[i].id)
            // console.log(prod);
            let channelSale: any;
            channelSale=prod.channelSales;
            for (let i = 0; i < channelSale.length; i++) {
            await this.saveProduct(channelSale[i], prod, false,null);
          }
            
          }
          this.createOrdersService.saveOrderDetails(this.orderDetails.id, this.isSameAsBilling, address).subscribe(res => {
            this.loading = false;
            this.toasterService.openToastMessage(ToastTypes.info, 'Edit order', 'Order details updated Successfully');

            // this.clearProperties();
          }, error => {
            this.loading = false;
          })
          Swal.fire(
            'Order!',
            'Your order details updated.',
            'success'
          ).then(async (result) => {
            this.closeOrder();
          });
        }
      });
    }



  }
  updatePaymentMethodForOrder(paymentMethod) {
    this.createOrdersService.updatePaymentMethodForOrder(this.id, paymentMethod, this.paymentStatus).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.info, 'Update Payment Method', ' Payment Method Updated Successfully');
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  deleteOrder() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.createOrdersService.removeOrderFromDraft(this.orderDetails.id).subscribe(res => {
          this.toasterService.openToastMessage(ToastTypes.info, 'Create Order', 'Removed Successfully');

        })
        Swal.fire(
          'Remove Order From Draft Orders!',
          'Your order has deleted.',
          'success'
        )
      }
    });
  }

  closeOrder() {
    this.datasharingService.closeDiplicateOrderTab('edit');
  }

  clearProperties() {
    this.customerName = null;
    this.customerEmail = null;
    this.customerPhone = null;
    this.b_address_1 = null;
    this.b_address_2 = null;
    this.b_address_3 = null;
    this.b_city = null;
    this.b_state_country = null;
    this.b_postcode = null;
    this.b_country = null;
    this.s_address_1 = null;
    this.s_address_2 = null;
    this.s_address_3 = null;
    this.s_city = null;
    this.s_state_country = null;
    this.s_postcode = null;
    this.s_country = null;
    this.orderStatus = null;
    this.total = null;
    this.subtotal = null;
    this.shippingcharges = null;
    this.isOrderGenerated = false;
    this.orderid = '';
    this.orderStatus = '';
    this.Channel = '';
    this.selectedChannle = null;
  }
}
