import { Component, OnInit } from '@angular/core';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { ToastTypes } from 'src/app/_models/_toaster';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { CreateFBA } from '../models/createfba';
import { CreateProductsToFbaService } from '../services/create-products-to-fba.service';
import Stepper from 'bs-stepper';
import { ListedProductsService } from '../services/listed-products.service';
import { SalsesOrdersService } from '../../orders/services/salses-orders.service';
import { WarehouseService } from '../../warehouse/services/warehouse.service';
import { ChannelIntegrationService } from '../../integrations/services/channel-integration.service';
import { ProductsService } from '../../inventory/services/products.service';
import { CreateInboundShipmentPlanRequest } from '../models/CreateInboundShipmentPlanRequest';
import { InboundShipmentPlanRequestItem } from '../models/InboundShipmentPlanRequestItem';
declare var $: any;

@Component({
  selector: 'app-create-products-to-fba',
  templateUrl: './create-products-to-fba.component.html',
  styleUrls: ['./create-products-to-fba.component.css']
})
export class CreateProductsToFbaComponent implements OnInit {
  private stepper: Stepper;
  allWH: any = [];
  selectedWareHouse = 0;
  selectedChannel = 0;
  isIndividualProducts = false;
  isCasePackedProducts = false;

  fbaState = "PREP_INSTRUCTIONS";
  inboundShipmentPlans: any = [];
  selectedFbaPlan: any;

  constructor(private productService: ProductsService,private appTrackingService:AppTrackingService,private channelintegrationService: ChannelIntegrationService,private toasterService: ToasterService, private warehouseService: WarehouseService, private createproducttoFBAService: CreateProductsToFbaService,private salsesOrdersService: SalsesOrdersService,private listedService: ListedProductsService) {
    let ip:usertrackInput={menu:TrackMenus.LISTINGS,submenu:subMenus.CREATEPRODUCTSTOFBA,page:pages.CREATEPRODUCTSTOFBAPAGE,function:"",descrption:"Create products to FBA page loaded"};
    this.appTrackingService.trackUserActivity(ip);
   }

  ngOnInit(): void {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
   this.getChannelRegistration();
    this.getWareHouses();
  }
  getWareHouses() {
    this.loading = true;
    this.warehouseService.getWarehouse().subscribe((res: any) => {
      ////console.log("warehouse:::", res);
      this.allWH = res;

      this.loading = false;

      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
    }, eoor => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });  }

    allChannel = [];
    getChannelRegistration() {
      this.loading = true;
      this.channelintegrationService.getChannelRegistration().subscribe((res: any) => {
        ////console.log(res);
        this.allChannel = res?.filter(i => i.type == 'amazon' && i.fba == true);
        console.log(this.allChannel)

        this.loading = false;
      }, eoor => {
        this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
      });
    };
  pageSize = environment.defaultPaginationValue;
  total = environment.defaultTotalValue;
  collectionsize = 100;
  searchValue: any = '';
  searchChannel: any = 'all';
  searchName: any = '0';
  productTitle: string = '';
  productIsSelected: boolean = false;
  page: number = 0;
  pageNo: number = 1;
  loading: boolean = false;
  variations;
  disVariation;
  fliter: any = '0';
  shipmentName: string = '';
  sourceAddressName: string = '';
  address1: string = '';
  city: string = '';
  state: string = '';
  postalCode: string = '';
  country: string = '';
  isEdit: boolean = false;
  channelProductIds: any[] = [];
  fbaProductId: any = '000';
  auditTrack(type:any){
    let ip:usertrackInput;
    if(type==1)
    ip={menu:TrackMenus.LISTINGS,submenu:subMenus.CREATEPRODUCTSTOFBA,page:pages.CREATEPRODUCTSTOFBAPAGE,function:"",descrption:"Search button is clicked"};
    if(type==2)
    ip={menu:TrackMenus.LISTINGS,submenu:subMenus.CREATEPRODUCTSTOFBA,page:pages.CREATEPRODUCTSTOFBAPAGE,function:"",descrption:"Reset button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }
  changespage(page: any) {
   // this.getProducts();
  }

  next(type: any) {
    if (type == 'shippingDetails') {
      this.getChannelProducts();


    }
    if (type == 'products') {
      if(this.fbaState == 'PREP_INSTRUCTIONS'){
        this.getPrepInstructions();
      }
      if(this.fbaState == 'GET_INBOUND_PLANS'){
        this.getFbaPlans();
      }
      if(this.fbaState == 'CREATE_INBOUND'){
        this.sendProductsToFBA();
      }



    }
    if (type == 'labelProducts') {
      this.stepper.next();
    }

  }
  getPrepInstructions(){
    this.loading = true;
    let obj = {
      countryCode : 'GB',
      skuList: [],
      asinList: []

    }
    let selectedItems = this.channelProducts.filter(sale => sale.selected == true);
    selectedItems.forEach(item => {
      obj.skuList.push(item.sku);
      obj.asinList.push(item.asin);
    });

    this.productService.prepInstructions(obj, this.selectedChannel).subscribe((response:any)=>{
      response.payload?.SKUPrepInstructionsList.forEach(instruct => {
        const prod = this.channelProducts.find(i => i.asin == instruct.ASIN);
        if(prod){
          prod['instructions'] = instruct;
          prod['validSku'] = true;
        }
      });
      response.payload?.InvalidSKUList.forEach(invalidSku => {
        const prod = this.channelProducts.find(i => i.sku == invalidSku);
        if(prod){
          prod['validSku'] = false;
        }
      })
      this.fbaState = 'GET_INBOUND_PLANS';
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }
  getFbaPlans() {
    this.loading = true;
    let warehouse = this.allWH.find(i => i.id == this.selectedWareHouse);
    let data = new CreateInboundShipmentPlanRequest();

    let selectedItems = this.channelProducts.filter(sale => sale.selected == true);
    console.log(selectedItems)
    data.LabelPrepPreference = 'SELLER_LABEL';
    data.ShipToCountryCode = 'GB';
  //  data.ShipToCountrySubdivisionCode = 'GB';
    data.ShipFromAddress = {
      AddressLine1: warehouse.addressline1,
      City: warehouse.city,
      CountryCode: 'GB',
      Name: warehouse.name,
      PostalCode: warehouse.postcode,
      StateOrProvinceCode: warehouse.state,
      AddressLine2: warehouse.addressline2,
      DistrictOrCounty: warehouse.country
    }
    data.ShipToCountryCode = 'GB';
   // data.ShipToCountrySubdivisionCode = 'SELLER_LABEL';
    selectedItems.forEach(item => {
      const reqItem = new InboundShipmentPlanRequestItem();
      reqItem.ASIN = item.asin;
      reqItem.Condition = "NewItem";
      reqItem.Quantity = item.qtyToSend;
      reqItem.SellerSKU = item.sku;
      reqItem.QuantityInCase = 1;

      reqItem.PrepDetailsList = [];
      // reqItem.prepDetailsList.push({
      //   prepInstruction: {
      //       value: 'LABELING'
      //   },
      //   prepOwner: {
      //       value: 'SELLER'
      //   }
      // });
      data.InboundShipmentPlanRequestItems.push(reqItem);
    });
    this.productService.fbaPlans(data, this.selectedChannel).subscribe((response:any)=>{
      console.log(response);
      console.log(this.channelProducts)
      this.inboundShipmentPlans = response.payload?.InboundShipmentPlans;
      this.inboundShipmentPlans.forEach(plan => {
        plan['selected']= false;
      });
      this.shipmentName = '';
      $('#fba-plans-modal').modal('show');

      //this.stepper.next();
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }
  sendProductsToFBA(){
    let warehouse = this.allWH.find(i => i.id == this.selectedWareHouse);
    let selectedItems = this.channelProducts.filter(sale => sale.selected == true);
    let channel = this.allChannel.find(i => i.id == this.selectedChannel);
    let InboundShipmentItems = [];
    selectedItems.forEach(item => {
      InboundShipmentItems.push({
        QuantityShipped: item.qtyToSend,
        SellerSKU: item.sku,
        ShipmentId: this.selectedFbaPlan.ShipmentId,
        FulfillmentNetworkSKU: this.selectedFbaPlan.Items.find( i => i.SellerSKU == item.sku).FulfillmentNetworkSKU
        // QuantityReceived: 31569590,
        // QuantityInCase: 99673778,
        // ReleaseDate: "2000-09-22",
        // PrepDetailsList: [

        // ]
    });
    })
    let obj = {
        InboundShipmentHeader: {
            DestinationFulfillmentCenterId: this.selectedFbaPlan.DestinationFulfillmentCenterId,
            LabelPrepPreference: this.selectedFbaPlan.LabelPrepType,
            ShipFromAddress : {
              AddressLine1: warehouse.addressline1,
              City: warehouse.city,
              CountryCode: 'GB',
              Name: warehouse.name,
              PostalCode: warehouse.postcode,
              StateOrProvinceCode: warehouse.state,
              AddressLine2: warehouse.addressline2,
              DistrictOrCounty: warehouse.country
            },
            ShipmentName: this.shipmentName,
            ShipmentStatus: "WORKING",
            AreCasesRequired: false,
            IntendedBoxContentsSource: "FEED"
        },
        InboundShipmentItems: InboundShipmentItems,
        MarketplaceId: channel['marketplaceId']
      }
    console.log(obj);
    this.productService.createInbound(obj, this.selectedChannel,this.selectedFbaPlan.ShipmentId).subscribe((response:any)=>{
      console.log(response);
      console.log(this.channelProducts)
      if(response.successful){
        this.toasterService.openToastMessage(ToastTypes.success, 'FBA', 'Products FBA Successfull');

      }

      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }




  channelProducts = [];
  isAllCheckedDown: boolean = false;

  getChannelProducts() {
    this.loading = true;

    this.productService.getChannelProducts(this.pageNo, this.collectionsize , this.pageSize, this.selectedChannel,  this.searchName, this.searchValue,).subscribe((res: any) => {
        console.log(res);
        this.channelProducts = res?.channelProducts ? res?.channelProducts : [];
        this.collectionsize = res?.page?.totalResults;
        this.channelProducts.map(prod => prod.selected = false);
        this.stepper.next();
        this.loading = false;
      }, (error) => {
        this.loading = false;
      });

  }
  pevious() {
    this.stepper.previous();
  }
  goBacktoProducts() {
  }
  refresh(){
  //  this.getProducts();
  }
  reset(){
    this.fliter = '0';
    this.searchName = '0';
    this.searchValue = '';
    this.searchChannel = 'all';
   // this.getProducts();
  }
  channel:any=[];
  onAddItem(){

   this.channel= this.channels.filter(s=>(s.type== "amazon"));
  // this.getProducts()
    $('#add-newitems-modal').modal('show');
  }
  getProducts() {
    this.loading = true;

  };
  channels: any = [];
  isAllChecked: boolean = true;

  selectall(event: any) {
    ////console.log("selectall", event.target.value);
    this.isAllChecked = !this.isAllChecked;
    this.channelProducts.map((i: any) => i.selected = this.isAllChecked);
    ////console.log(this.channelProducts);
    let selectedItems = this.channelProducts.filter(sale => sale.selected == true);
    if (selectedItems.length > 0) {
      this.productIsSelected = true;
    } else {
      this.productIsSelected = false;
    }
  }
  closeModal() {
    $('#add-newitems-modal').modal('hide');
  }
  individualselection(event: any) {
    // ////console.log(event.target.value);
    this.channelProducts.find(sale => sale.id == event.id).selected = !this.channelProducts.find(sale => sale.id == event.id).selected;
    let selectedItems = this.channelProducts.filter(sale => sale.selected == true);
    if (selectedItems.length > 0) {
      this.productIsSelected = true;
    } else {
      this.productIsSelected = false;
    }
  }

  selectUnselectPlan(event, plan){
    if(event.target.checked){
      this.selectedFbaPlan = plan;
    }
  }

  saveFbaPlan(){
    if(!this.shipmentName){
      this.toasterService.openToastMessage(ToastTypes.warning, 'Shipment', 'Shipment Name Required');
      return;
    }
    this.fbaState = 'CREATE_INBOUND';
    $('#fba-plans-modal').modal('hide');
  }

  // modalclosed() {
  //   $('#search-modal').modal('hide');
  // }

  modalclosed() {
    $('#create-fbashipment-modal').modal('hide');
    this.clear();
  }

  clear() {
    this.shipmentName = '';
    this.sourceAddressName = '';
    this.address1 = '';
    this.city = '';
    this.state = '';
    this.postalCode = '';
    this.country = '';
  }




  openCreateFBAShipmentModal() {
    let selectedOrders = this.channelProducts.filter(down => down.selected == true);
    // debugger;
    this.channelProductIds = selectedOrders.map(ord => ord.id);

    if (this.channelProductIds.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Products', 'Please select one product atleast');
      return;
    }
    else {
      $('#create-fbashipment-modal').modal('show');
    }
  }

  closeCreateFBAShipmentModal() {
    $('#create-fbashipment-modal').modal('hide');
  }


  setFeeForProd(prod){
    if(prod.instruction){
      let fees = prod.instructions?.AmazonPrepFeesDetailsList?.find(i => i.PrepInstruction == prod.instruction);
      if(fees){
        prod['FeePerUnit'] = fees?.FeePerUnit?.Value;
      }
    }
  }


  async saveOrUpdateUser() {
    let selectedOrders = this.channelProducts.filter(down => down.selected == true);
    // debugger;
    const channelProductIds = selectedOrders.map(ord => ord.id);

    if (channelProductIds.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Products', 'Please select one product atleast');
      return;
    }
    else {
      // debugger;
      if (this.shipmentName == '') {
        this.toasterService.openToastMessage(ToastTypes.warning, 'Products', 'Please enter shipment name');
        return;
      }

      if (this.sourceAddressName == '') {
        this.toasterService.openToastMessage(ToastTypes.warning, 'Products', 'Please enter source Address Name');
        return;
      }
      if (this.address1 == '') {
        this.toasterService.openToastMessage(ToastTypes.warning, 'Products', 'Please enter address');

        return;
      }

      if (this.postalCode == '') {
        this.toasterService.openToastMessage(ToastTypes.warning, 'Products', 'Please enter postal code');
        return;
      }
      if (this.country == '') { //undefined) {
        this.toasterService.openToastMessage(ToastTypes.warning, 'Products', 'Please select country');
        return;
      }
      // let id = -1;
      let ids = channelProductIds.toString();
      // debugger;
      this.createproducttoFBAService.inboundshipment(ids, this.shipmentName, this.sourceAddressName, this.address1, this.city, this.state, this.postalCode, this.country).subscribe(res => {
        this.toasterService.openToastMessage(ToastTypes.success, 'Products', 'FBA Created');
        this.modalclosed();

      });
    }
  }

}
