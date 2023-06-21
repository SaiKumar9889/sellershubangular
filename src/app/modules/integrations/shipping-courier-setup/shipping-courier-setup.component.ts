import { Component, OnInit } from '@angular/core';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { ToastTypes } from 'src/app/_models/_toaster';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { ShippingCourierSetupService } from '../services/shipping-courier-setup.service';
declare var $: any;

@Component({
  selector: 'app-shipping-courier-setup',
  templateUrl: './shipping-courier-setup.component.html',
  styleUrls: ['./shipping-courier-setup.component.css']
})
export class ShippingCourierSetupComponent implements OnInit {
  editLabelTemplate: boolean = false;
  constructor(private appTrackingService: AppTrackingService, private toasterService: ToasterService, private shippingService: ShippingCourierSetupService) {
    let ip: usertrackInput = { menu: TrackMenus.INTEGRATION, submenu: subMenus.SHIPPINGCOURIERSETUP, page: pages.SHIPPINGCOURIERSETUPPAGE, function: "", descrption: "Shipping courier setup page loaded" };
    this.appTrackingService.trackUserActivity(ip);
  }

  ngOnInit(): void {
    this.getShippingCourier();
  }

  auditTrack(type: any) {
    let ip: usertrackInput;
    if (type == 1)
      ip = { menu: TrackMenus.INTEGRATION, submenu: subMenus.SHIPPINGCOURIERSETUP, page: pages.SHIPPINGCOURIERSETUPPAGE, function: "", descrption: "Edit button is clicked" };
    if (type == 2)
      ip = { menu: TrackMenus.INTEGRATION, submenu: subMenus.SHIPPINGCOURIERSETUP, page: pages.SHIPPINGCOURIERSETUPPAGE, function: "", descrption: "Integrate button is clicked" };
    if (type == 3)
      ip = { menu: TrackMenus.INTEGRATION, submenu: subMenus.SHIPPINGCOURIERSETUP, page: pages.SHIPPINGCOURIERSETUPPAGE, function: "", descrption: "Back To List button is clicked" };
    this.appTrackingService.trackUserActivity(ip);
  }

  pageSize = environment.defaultPaginationValue;
  total = environment.defaultTotalValue;
  collectionsize = 0;
  allShip: any[] = [];
  productIsSelected: boolean = false;
  page: number = 0;
  loading: boolean = false;
  variations;
  disVariation;

  modalclosed() {
    $('#search-modal').modal('hide');
  }
  changespage(page: any) {
    this.getShippingCourier();
  }
  remove(ship: any) {

  }
  getShippingCourier() {
    this.loading = true;
    this.shippingService.getShippingCourier().subscribe((res: any) => {
      ////console.log(res);
      this.allShip = res;
      this.collectionsize = res?.page?.totalResults;
      this.page = res?.page?.currentPageNumber;
      this.loading = false;
      //if (this.allShip.length > 0)
      // this.productTitle= this.allShip[0].title;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      this.loading = false;
    }, error => {
      this.loading = false;
      //console.log(error);
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error::' + error?.error?.message);
    });
  };

  selectedShipment: any;
  individualselection(ship: any) {
    ////console.log(ship);
  }
  isEdited: boolean = false;
  backtolist() {
    this.isEdited = false;
    this.editLabelTemplate = false;
    this.getShippingCourier();
  }

  editSettings(ship: any) {
    this.isEdited = true;
    console.log(ship);
    this.selectedShipment = ship;
  }

  editLabel(ship) {
    this.selectedShipment = ship;
    console.log(ship)
    this.editLabelTemplate = true;
  }
}
