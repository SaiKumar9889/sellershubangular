import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { AllMenuTabs } from 'src/app/_models/Tabs';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { SupplierService } from '../../suppliers/services/supplier.service';
import { PurchaseOrdersService } from '../services/purchase-orders.service';
declare var $: any;

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.css']
})
export class PurchaseOrdersComponent implements OnInit {
  loading: boolean = false;
  dropdownSettings: any;
  supldropdownSettings: any;
  allFilters: any = [];
  selectedFilter: any=[];
  page = 0;
  collectionsize = environment.defaultTotalValue;
  pageSize = environment.defaultPaginationValue;
  channel: any = 'all';
  status: any = 'all';
  searchname: any = '4';
  searchvalue: any = '';

  channelType: any = 0;
  fliter: any = '0';

  constructor(private appTrackingService:AppTrackingService,private purchaseOrdersService: PurchaseOrdersService,private datasharingService:DatasharingService, private suplService: SupplierService) {
    let ip:usertrackInput={menu:TrackMenus.INVENTORY,submenu:subMenus.PURCHASEORDERS,page:pages.PURCHASEORDERSPAGE,function:"",descrption:"Purchase orders page loaded"};
    this.appTrackingService.trackUserActivity(ip);
   }
  ngOnInit(): void {
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
    this.supldropdownSettings = {
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
    this.allFilters.push({ key: 'All', value: 'all' });
    this.allFilters.push({ key: 'Pending', value: 'pending' });
    this.allFilters.push({ key: 'Ordering', value: 'ordering' });
    this.allFilters.push({ key: 'Shipping', value: 'shipping' });
    this.allFilters.push({ key: 'Receiving', value: 'receiving' });
    this.allFilters.push({ key: 'Completed', value: 'completed' });
this.getOrders();
this.getSupplier();
  }
  auditTrack(type:any){
    let ip:usertrackInput;
    if(type==1)
    ip={menu:TrackMenus.INVENTORY,submenu:subMenus.PURCHASEORDERS,page:pages.PURCHASEORDERSPAGE,function:"",descrption:"Create Purchase Order button is clicked"};
    if(type==2)
    ip={menu:TrackMenus.INVENTORY,submenu:subMenus.PURCHASEORDERS,page:pages.PURCHASEORDERSPAGE,function:"",descrption:"Edit button is clicked"};
    if(type==3)
    ip={menu:TrackMenus.INVENTORY,submenu:subMenus.PURCHASEORDERS,page:pages.PURCHASEORDERSPAGE,function:"",descrption:"Delete button is clicked"};
    if(type==4)
    ip={menu:TrackMenus.INVENTORY,submenu:subMenus.PURCHASEORDERS,page:pages.PURCHASEORDERSPAGE,function:"",descrption:"View order button is clicked"};
    if(type==5)
    ip={menu:TrackMenus.INVENTORY,submenu:subMenus.PURCHASEORDERS,page:pages.PURCHASEORDERSPAGE,function:"",descrption:"View order button is clicked"};
    if(type==6)
    ip={menu:TrackMenus.INVENTORY,submenu:subMenus.PURCHASEORDERS,page:pages.PURCHASEORDERSPAGE,function:"",descrption:"Resend button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }
  getOrders(){
    this.getPurchaseOrders(this.selectedFilter[0]?.value?this.selectedFilter[0]?.value:'all');
  }

  modalclosed() {
    $('#search-modal').modal('hide');
  }

  changespage(event: any) {
    this.getPurchaseOrders(this.selectedFilter[0]?.value?this.selectedFilter[0]?.value:'all');
  }

  onItemSelect(event: any) {
    this.getPurchaseOrders(this.selectedFilter[0]?.value?this.selectedFilter[0]?.value:'all');
  }
  onSuplSelect(event: any){
    console.log(event);
    console.log(this.allPurchaseOrders.supplierId)
    // this.getPurchaseOrders(this.selectedFilter[0]?.value?this.selectedFilter[0]?.value:'all');
  }
  allPurchaseOrders: any = [];

  getPurchaseOrders(status) {
    this.loading = true;
    this.purchaseOrdersService.getPurchaseOrders(this.page, this.collectionsize, this.pageSize, this.channel, this.searchname,status,this.searchvalue).subscribe((res:any) => {
      ////console.log(res);
      this.allPurchaseOrders = res?.sales || [];
    //  this.allSales.map((i: any) => i.selected = false);
      // this.page = res?.page?.currentPageNumber;
      this.collectionsize = res?.page?.totalResults;
      this.loading = false;
    })
  }
  allSupl: any[] = [];
  async getSupplier() {
  
    this.loading = true;
    this.suplService.getSupplier().subscribe((res: any) => {
      ////console.log(res);
      this.allSupl = res?.suppliers;
   
      this.loading = false;
     
    }, eoor => {
      
    });
  };
  changePageSize() {
    this.getPurchaseOrders(this.selectedFilter[0]?.value?this.selectedFilter[0]?.value:'all');
  }

  createPO() {
    this.datasharingService.changePoDetails({});

    let menu = { icon: '', pmenu: '', menuname: 'Create PO', routerLink: '', haschildrens: false, tab: AllMenuTabs.create_po };
    this.datasharingService.addtoTab(menu);
  }

  deletePo(pr:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete PO !",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then(async (result) => {
      ////console.log(result);
      if (result?.value) {
        this.purchaseOrdersService.deletePo(pr.id).subscribe(res => {
          Swal.fire(
            'Products!',
            'PO is removed.',
            'success'
          )
          this.getPurchaseOrders(this.selectedFilter[0]?.value?this.selectedFilter[0]?.value:'all');
        });
      }
    });
  }

  reset(){
    this.searchname = '0';
    this.searchvalue = '';
    this.selectedFilter[0].value='all';
    this.selectedFilter=[]
    this.getOrders()
  }

  editPO(po:any){
    this.datasharingService.changePoDetails(po);
    let menu = { icon: '', pmenu: '', menuname: 'Edit PO', routerLink: '', haschildrens: false, tab: AllMenuTabs.create_po };
    this.datasharingService.addtoTab(menu);
  }
}
