import { Component, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { SupplierService } from '../services/supplier.service';
import { FeedService } from '../services/feed.service';
declare var $: any;
import Stepper from 'bs-stepper';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { Country } from 'src/app/_models/country';
import { Supplier } from '../models/suppliers';
import Swal from 'sweetalert2';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  isStepCreate: boolean = false;
  dropdownSettings: any = {};
  countries: Country[] = [];

  name: string = '';
  code: string = '';
  email: string = '';
  phone: string = '';
  state: string = '';
  address1: string = '';
  address2: string = '';
  address3: string = '';
  city: string = '';
  postcode: string = '';
  accountnumber: string = '';
  isEdit: boolean = false;
  isDescEnables = false;

  constructor(private appTrackingService: AppTrackingService, private datasharingService: DatasharingService, private toasterService: ToasterService, private suplService: SupplierService, private feedService: FeedService) {
    this.dropdownSettings = {
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

    this.countries = this.datasharingService.getCountries();
    let ip: usertrackInput = { menu: TrackMenus.WAREHOUSEMANAGEMENT, submenu: subMenus.SUPPLIERS, page: pages.SUPPLIERSPAGE, function: "", descrption: "Suppliers page loaded" };
    this.appTrackingService.trackUserActivity(ip);
  }
  auditTrack(type: any) {
    let ip: usertrackInput;
    if (type == 1)
      ip = { menu: TrackMenus.WAREHOUSEMANAGEMENT, submenu: subMenus.SUPPLIERS, page: pages.SUPPLIERSPAGE, function: "", descrption: "Add New Supplier button is clicked" };
    if (type == 2)
      ip = { menu: TrackMenus.WAREHOUSEMANAGEMENT, submenu: subMenus.SUPPLIERS, page: pages.SUPPLIERSPAGE, function: "", descrption: "Edit button is clicked" };
    if (type == 3)
      ip = { menu: TrackMenus.WAREHOUSEMANAGEMENT, submenu: subMenus.SUPPLIERS, page: pages.SUPPLIERSPAGE, function: "", descrption: "Remove button is clicked" };
    this.appTrackingService.trackUserActivity(ip);
  }
  private stepper: Stepper;
  next() {
    // debugger;
    this.stepper.next();
  }
  selectedCountry = [{ country_code: "GB", name: "United Kingdom" }];
  onSubmit() {
    // debugger;
    return false;
  }
  onItemSelect(event: any) {
    // debugger;
  }
  async saveOrUpdateUser() {
    // debugger;
    if (this.name == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Supplier', 'Please enter name');
      return;
    }
    if (this.isEdit) {
      if (this.code == '') {
        this.toasterService.openToastMessage(ToastTypes.warning, 'Supplier', 'Please enter code');
        return;
      }
    }
    let regexpNumber = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
    ////console.log(regexpNumber.test(this.email));
    if (this.email == '' || !regexpNumber.test(this.email)) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Supplier', 'Please enter valid email');
      return;
    }
    if (this.phone == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Supplier', 'Please enter phone number');
      return;
    }
    if (this.address1 == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Supplier', 'Please enter address1');

      return;
    }
    if (this.address2 == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Supplier', 'Please enter address2');
      return;
    }
    // if(this.city==''){
    //   this.toasterService.openToastMessage(ToastTypes.success, 'Supplier', 'Please enter name');
    // }
    if (this.postcode == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Supplier', 'Please enter postcode');
      return;
    }
    if (this.selectedCountry == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Supplier', 'Please select country');
      return;
    }
    let id = -1;


    let res = await this.suplService.editSupplier(id);
    id = res.supplier.id;
    this.code = res.supplier.code;
    let suppliers: Supplier = {
      addressline1: this.address1,
      addressline2: this.address2,
      addressline3: this.address3,
      phone: this.phone,
      accountNumber: this.accountnumber,
      city: this.city,
      code: this.code,
      country: this.selectedCountry[0].name ? this.selectedCountry[0]?.name : '',
      countryCode: this.selectedCountry[0].country_code ? this.selectedCountry[0]?.country_code : '',
      email: this.email,
      firstName: this.name,
      id: id,
      postcode: this.postcode,
      state: this.state,
      notes: this.accountnumber

    };
    this.loading = true;
    this.suplService.addSupplier(suppliers, id).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, 'Supplier', 'Supplier Created');
      this.loading = false;
      this.modalclosed();

    }, error => {
      this.loading = false;
    });
  }
  updateUser() {
    // debugger;
    let id = this.selectedSupplier?.id;
    if (this.name == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Supplier', 'Please enter name');
      return;
    }
    if (this.isEdit) {
      if (this.code == '') {
        this.toasterService.openToastMessage(ToastTypes.warning, 'Supplier', 'Please enter code');
        return;
      }
    }

    let regexpNumber = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
    ////console.log(regexpNumber.test(this.email));
    if (this.email == '' || !regexpNumber.test(this.email)) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Supplier', 'Please enter valid email');
      return;
    }
    if (this.phone == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Supplier', 'Please enter phone number');
      return;
    }
    if (this.address1 == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Supplier', 'Please enter address1');

      return;
    }
    if (this.address2 == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Supplier', 'Please enter address2');
      return;
    }
    // if(this.city==''){
    //   this.toasterService.openToastMessage(ToastTypes.success, 'Supplier', 'Please enter name');
    // }
    if (this.postcode == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Supplier', 'Please enter postcode');
      return;
    }
    if (this.selectedCountry == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Supplier', 'Please select country');
      return;
    }

    let suppliers: Supplier = {
      addressline1: this.address1,
      addressline2: this.address2,
      addressline3: this.address3,
      phone: this.phone,
      city: this.city,
      code: this.code,
      country: this.selectedCountry[0].name ? this.selectedCountry[0]?.name : '',
      countryCode: this.selectedCountry[0].country_code ? this.selectedCountry[0]?.country_code : '',
      email: this.email,
      firstName: this.name, id: id,
      postcode: this.postcode,
      state: this.state,
      accountNumber: this.accountnumber

    };
    this.loading = true;

    this.suplService.addSupplier(suppliers, id).subscribe(res => {
      ////console.log(res);
      this.toasterService.openToastMessage(ToastTypes.success, 'Supplier', 'Supplier Details Updated');
      this.modalclosed();
      this.clear();
      this.loading = false;

    }, error => {
      this.loading = false;
    });
  }
  clear() {
    this.selectedSupplier = undefined;
    this.name = '';
    this.code = '';
    this.email = '';
    this.phone = '';
    this.state = '';
    this.address1 = '';
    this.address2 = '';
    this.address3 = '';
    this.city = '';
    this.postcode = '';
  }
  ngOnInit(): void {
    this.getSupplier();
    this.getFeed();
    // this.stepper = new Stepper(document.querySelector('#stepper1'), {
    //   linear: false,
    //   animation: true
    // })
  }
  pageSize = environment.defaultPaginationValue;
  total = environment.defaultTotalValue;
  collectionsize = 0;
  allSupl: any[] = [];
  allFeed: any[] = [];
  feedURL: any;
  feedURLEdit: any
  feedFormat: any;
  feedStatus: any;
  searchValue: any = '';
  searchChannel: any = 'all';
  searchName: any = '0';
  productIsSelected: boolean = false;
  page: number = 0;
  loading: boolean = false;
  variations;
  disVariation;

  modalclosed() {
    $('#search-modal').modal('hide');
    this.clear();
    this.getSupplier();
  }
  changespage(page: any) {
    this.getSupplier();
    this.getFeed();
  }
  loadTablePagenation() {
    $(function () {
      $('#printabletable').DataTable({
        responsive: true,
        pagingType: "simple_numbers",
        pageLength: 10,
        lengthChange: true,
        dom: 'Bfrtip',
        buttons: [
          'copy', 'csv', 'pdf', 'print'
        ]
      });
      $('.buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel').addClass('btn btn-primary mr-1');
    });
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async getSupplier() {
    $('#printabletable').DataTable().destroy();
    await this.delay(1000);
    this.loading = true;
    this.suplService.getSupplier().subscribe((res: any) => {
      ////console.log(res);
      this.allSupl = res?.suppliers?.sort((a, b) => a.id > b.id ? -1 : 1);
      this.loadTablePagenation();
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };


  getFeed() {
    this.loading = true;
    this.feedService.getFeed().subscribe((res_feed: any) => {
      ////console.log(res_feed);
      this.allFeed = res_feed;
      this.feedURL = res_feed['feedUrl'];
      this.feedFormat = res_feed['format'];
      if (res_feed['feedStatus'] == null) {
        this.feedStatus = 'INACTIVE';
      }
      else {
        this.feedStatus = res_feed['feedStatus'];
      }
      this.collectionsize = res_feed?.page?.totalResults;
      this.page = res_feed?.page?.currentPageNumber;
      this.loading = false;
      if (this.allSupl.length > 0)
        this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      this.loading = false;
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };
  createSupplier() {
    this.isStepCreate = true;
  }
  addsupplier() {
    this.isEdit = false;
  }
  editFeed() {

  }
  removeSuppliers(selectedSupplier: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result?.value) {
        this.suplService.removeSupplier(selectedSupplier.id).subscribe(res => {
          ////console.log(res);
          this.toasterService.openToastMessage(ToastTypes.warning, 'Supplier', 'Supplier Removed successfully');
          this.getSupplier();
        }, (error) => {
          console.log(error)
          this.toasterService.openToastMessage(ToastTypes.warning, '', error.error.message);
        });

      }
    });

  }
  selectedSupplier: any;
  editSupplier(selectedSupplier: any) {
    ////console.log(selectedSupplier)
    this.isEdit = true;
    this.selectedSupplier = selectedSupplier;
    this.name = this.selectedSupplier.firstName;
    this.code = this.selectedSupplier.code;
    this.email = this.selectedSupplier.email;
    this.phone = this.selectedSupplier.phone;
    this.state = this.selectedSupplier.state;

    this.address1 = this.selectedSupplier.addressline1;
    this.address2 = this.selectedSupplier.addressline2;
    this.address3 = this.selectedSupplier.addressline3;
    this.accountnumber = this.selectedSupplier.accountNumber;
    this.city = this.selectedSupplier.city;
    this.postcode = this.selectedSupplier.postcode;
    //this.country=this.selectedSupplier.country;
    let sc = this.countries.find(country => country.name == this.selectedSupplier.country);
    if (sc != null)
      this.selectedCountry = [{ name: sc?.name, country_code: sc?.country_code }];
    else
      this.selectedCountry = [{ country_code: "GB", name: "United Kingdom" }];

    $('#search-modal').modal('show');
  }
  toggleDesc() {
    this.isDescEnables = !this.isDescEnables;
  }
}
