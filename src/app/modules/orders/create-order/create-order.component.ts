import { Component, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import Swal from 'sweetalert2';
import { CreateOrdersService } from '../services/create-orders.service';
declare var $: any;
import CountriesJson from '../../../../assets/config/countries.json';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { DatePipe } from '@angular/common';
import { AllMenuTabs } from 'src/app/_models/Tabs';
import { Utills } from 'src/app/utills/Utills';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  loading: boolean = false;
  dropdownSettings_channel: any = {};
  dropdownSettings_country: any = {};
  dropdownSettings_currency: any = {};
  allChannels: any = [];
  selectedChannle: any;
  allDraftOrders: any = [];
  isOrderCreationEnabled: boolean = false;
  allCountries: any = [];
  selectedCountry: any;
  selectedCountry_s: any;
  AllProducts: any = [];
  id: any;
  weightkg: any = '';
  heightkg: any = '';
  depth: any = '';
  width: any = '';
  constructor(private appTrackingService: AppTrackingService, private datePipe: DatePipe, private datasharingService: DatasharingService, private toasterService: ToasterService, private createOrdersService: CreateOrdersService) {
    let ip: usertrackInput = { menu: TrackMenus.ORDERS, submenu: subMenus.SALESORDERS, page: pages.SOCREATEORDERPAGE, function: "", descrption: "Create order page loaded" };
    this.appTrackingService.trackUserActivity(ip);
  }

  ngOnInit(): void {
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
    Object.assign(this.allCountries, this.datasharingService.getCountries());
    let uk = this.allCountries.find(i => i.country_code == "UK");
    if (uk) {
      uk.country_code = 'GB';
    }
    this.getDraftOrders();
    this.getAllChannels();
    // this.getAllProducts()
  }
  // getAllProducts() {
  //   $('#productstable').DataTable().destroy();
  //   this.createOrdersService.getLisTofProducts().subscribe(res => {
  //     ////console.log(res);
  //     this.AllProducts = res;
  //     this.AllProducts.map(prod => prod.selected = false);
  //     this.loadProductsPagenation();
  //   });
  // }

  individualselection(event: any) {
    this.AllProducts.find(prod => prod.id == event.id).selected = !this.AllProducts.find(prod => prod.id == event.id).selected;
  }

  getDraftOrders() {
    this.loading = true;
    $('#printabletable').DataTable().destroy();
    this.createOrdersService.getDraftOrders().subscribe((res: any) => {
      ////console.log(res);
      this.allDraftOrders = res.channelOrderResponse;
      this.loadTablePagenation();
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  loadTablePagenation() {
    $(function () {
      // $('#printabletable').DataTable();
      $('#printabletable').DataTable({
        responsive: true,
        pagingType: "simple_numbers",
        pageLength: 10,
        lengthChange: true,
        dom: 'Bfrtip',
        // buttons: [
        //   'copy', 'csv', 'excel', 'pdf', 'print'
        // ],
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
  editOrder(orders: any) {
    ////console.log(orders);
    this.editOrderTab(orders);

  }
  selectedProducts: any = [];
  addToUserOrder() {
    this.selectedProducts = this.AllProducts.filter(sp => sp.selected == true);
    this.selectedProducts.forEach(sp => {
      if (sp.weightKg == null || sp.weightKg == "null" || sp.weightKg == ""){
        sp.weightKg = 0;
      }
      if (sp.width == null || sp.width == "null" || sp.width == ""){
        sp.width = 0;
      }
      if (sp.length == null || sp.length == "null" || sp.length == ""){
        sp.length = 0;
      }
      if (sp.depth == null || sp.depth == "null" || sp.depth == ""){
        sp.depth = 0;
      }
        
    });
    this.caluculateTotal();
  }
  createOrderTab() {
    this.isOrderCreationEnabled = true;

  }
  isOrderGenerated: boolean = false;
  createOrderByChannel() {
    this.createOrder();
    this.isOrderGenerated = true;
    this.selectedCountry = [{ country_code: "GB", name: "United Kingdom" }];
    this.selectedCountry_s = [{ country_code: "GB", name: "United Kingdom" }];
    this.selectedCurrency = [{ code: 'GBP', name: 'Sterling Pound' }];
  }
  backToOrderDrafts() {
    this.isOrderCreationEnabled = false;
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
          this.getDraftOrders();
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
    });
  }
  addnewItem() {
    $('#products-modal').modal('show');
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
      this.curencies = res.list;
      $('#productstable').DataTable().destroy();
      $('#customerTable').DataTable().destroy();
      // this.curencies=res.channelUsers;
      this.allChannels = res.channelUsers;
      this.existingCustomers = res.customers;
      this.existingCustomers.map(cust => cust.selected = false);
      this.allChannels.map(ch => ch.display = ch.type + "-" + (ch.name == null ? '' : ch.name));
      this.AllProducts = res.products;
      this.AllProducts.map(prod => prod.selected = false);
      this.AllProducts.map(prod => prod.userQuantity = 1);
      // this.AllProducts.map(prod => prod.sprice=1);
      this.orderDetails = res?.order;
      this.orderid = res?.order?.orderId;
      this.id = res?.order?.id;
      this.orderStatus = res?.order?.orderStatus;
      this.Channel = res?.order?.channel;
      // this.orderDate = this.datePipe.transform(res?.order?.purchaseDate, Utills.UK_DATE);
      this.orderDate = res?.order?.purchaseDate;
      this.createOrdersService.getShippingService(this.id).subscribe((res: any) => {
        this.allShippingServices = res.shippingoptions;
      })
      this.loadProductsPagenation();
      this.loadcustomerTablePagenation();
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
  allShippingServices = [];
  paymentMethod: any = '';

  total: number = 0;
  shippingchaeges: number = 0;
  subtotal: number = 0;
  orderStatusd: any = 'Unshipped';
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

  sameAsShippingCopy(event: any) {
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
    // this.createOrdersService.remove(prod.id, prod.id).subscribe(res => {
    //   ////console.log(res);
    //   this.toasterService.openToastMessage(ToastTypes.info, 'Create Order', 'Product Removed Successfully');
    // });
    this.AllProducts.find(sp => sp.id == prod.id).selected = false;
    this.selectedProducts = this.selectedProducts.filter(aprod => aprod.id != prod.id);
    this.caluculateTotal();
  }
  caluculateTotal() {
    this.subtotal = 0;
    this.selectedProducts.forEach(sp => {
      if (sp.sellingPrice != null && sp.userQuantity != null && sp.userQuantity != '' && sp.sellingPrice != '')
        this.subtotal = sp?.sellingPrice * sp.userQuantity + this.subtotal;
    });
    this.total = this.subtotal + Number(this.shippingcharges);
  }
  async saveProduct(prod: any, addedProd = null, index = -1) {
    //console.log(prod)
    let id;
    if (index > -1) {
      id = addedProd.channelSales[index].id;
    } else {
      id = prod.id;
    }
    await this.createOrdersService.saveProductItem(id, this.orderDetails.id, prod.sellingPrice, prod.sku, prod.userQuantity,prod.weightKg,prod.length,prod.width,prod.depth);
  }
  async addProduct(id: any) {
    return await this.createOrdersService.addProductToOrder(this.orderDetails.id, id);
  }
  paymentStatus: any = '';
  changePaymentStatus(event: any) {
    ////console.log(event.target.value);
    this.paymentStatus = event.target.value;
  }
  updatePaymentMethodForOrder(paymentMethod) {
    this.createOrdersService.updatePaymentMethodForOrder(this.id, paymentMethod, this.paymentStatus).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.info, 'Update Payment Method', ' Payment Method Updated Successfully');

    })
  }
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
    } else if (this.customerEmail == null || this.customerEmail == undefined || this.customerEmail == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Order', 'Please select customer email');
    // } else if (this.customerPhone == null || this.customerPhone == undefined || this.customerPhone == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'Create Order', 'Please select buyer phone number');
    } else if (this.currency == null || this.currency == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Order', 'Please select currency');
    } else if (this.customerName == null || this.customerName == undefined || this.customerName == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Order', 'Please enter cutomer name');
    } else if (this.s_address_1 == null || this.s_address_1 == '' || this.s_address_1 == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Order', 'Please select shipping address1');
    }

    else if (this.s_country == null || this.s_country == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Order', 'Please select shipping country');
    }
    else if (this.orderStatusd == null || this.orderStatusd == '' || this.orderStatusd == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Order', 'Please select order status');
    }
    else if (this.selectedProducts == [] || this.selectedProducts.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Create Order', 'Please select Products');
    }
    else {
      this.orderStatusd = this.orderStatusd == undefined ? 'Unshipped' : this.orderStatusd;
      let channel = this.allChannels.find(ch => ch.type == this.Channel);
      let address = {
        "billingAddressCity": this.s_city,
        "billingAddressCountry": this.selectedCountry_s[0]['name'],
        "billingAddressCountryCode": this.selectedCountry_s[0]['country_code'],
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
        "id": this.orderDetails.id,
        "numberOfItemsShipped": 0,
        "numberOfItemsUnshipped": 0,
        "orderId": this.orderDetails.orderId,
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
        "shippingMethod": this.shippingService,
        "shippingPrice": this.shippingcharges,
        "site": channel.site
      }
      ////console.log(address);
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to create order !",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, do it!'
      }).then(async (result) => {
        ////console.log(result);
        this.loading = true;
        if (result?.value) {
          for (let i = 0; i < this.selectedProducts.length; i++) {
            const prod = await this.addProduct(this.selectedProducts[i].id);
            await this.saveProduct(this.selectedProducts[i], prod, i);
          }
          this.createOrdersService.saveOrderDetails(this.orderDetails.id, this.isSameAsBilling, address).subscribe(res => {
            this.loading = false;
            this.toasterService.openToastMessage(ToastTypes.info, 'Create Order', 'Order Created Successfully');
            this.getDraftOrders();
            // this.closeOrder();
            // this.clearProperties();
            this.isOrderCreationEnabled = false;
            Swal.fire(
              'Order creation!',
              'Order created successfully.',
              'success'
            ).then(async (result) => {
              this.closeOrder();
            });
          })

        } else {
          this.loading = false;
        }
      });
    }
  }

  closeOrder() {
    this.datasharingService.closeNewEditOrderTab('new');
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
      if (result) {
        this.createOrdersService.removeOrderFromDraft(this.orderDetails.id).subscribe(res => {
          this.toasterService.openToastMessage(ToastTypes.info, 'Delete Order', 'Removed Successfully');
          this.getDraftOrders();
          this.isOrderCreationEnabled = false;
        })
        // Swal.fire(
        //   'Remove Order From Draft Orders!',
        //   'Your order has deleted.',
        //   'success'
        // )
      }
    });
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

  editOrderTab(orders) {
    let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.edit_order };
    this.datasharingService.addtoTab(menu);
    let selectedItems = [orders];
    this.datasharingService.changeActiveOrder(selectedItems);
  }
}
