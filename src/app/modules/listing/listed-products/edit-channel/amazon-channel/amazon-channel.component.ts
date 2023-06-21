import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AmazonInteService } from 'src/app/modules/integrations/services/amazon-inte.service';
import { ChannelProductsService } from 'src/app/modules/inventory/services/channel-products.service';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
declare let $ : any ;
@Component({
  selector: 'app-amazon-channel',
  templateUrl: './amazon-channel.component.html',
  styleUrls: ['./amazon-channel.component.scss']
})
export class AmazonChannelComponent implements OnInit {
  loading: boolean = false;
  @Input()
  channelProduct:any;
  @Input() channelId:any;

  @Input()
  productImages:any;

  @Input()
  templates:any;
@Input() variations:any;variationTheme:any;channelVariationListJson:any;channelVariations:any=[];values:any=[];
  @Output() closeEvent :EventEmitter<any> = new EventEmitter<any>();
  constructor(private channelproductService: ChannelProductsService,public amazonservice: AmazonInteService,public toasterService: ToasterService,public channelProductsService: ChannelProductsService) { }
  stockrequiredDate: any;selectedDate: NgbDateStruct;
  ngOnInit(): void {
    console.log(this.variations);
    this.variations.filter(s=>this.channelVariationListJson=s.channelVariationListJson)
    this.variationTheme =this.channelVariationListJson.variationThemeValueForAmazon;
    this.channelVariations =this.channelVariationListJson.channelVariations;
  this.channelVariations.filter(s=>this.values=(s.values))
    console.log(this.values)
    this.selectedDate= this.channelProduct.saleStartDate;
  }
  close(){
    this.closeEvent.emit(false);
  }
  stockRequiredDate(event: any) {
    this.stockrequiredDate = event.day + '-' + event.month + '-' + event.year;
  }
  openBrowserNode(){
    $('#amazonbrowsernodedivmodal1').modal('show');
  }
  openBrowserNodes(){
    $('#amazonbrowsernodedivmodal1').modal('show');
  }
  subcategories:any=[]; site='UK';browserNodes:any=[];page: number = 1;;total=1;search='';pages:any=[];node:any='';
  collectionsize = environment.defaultTotalValue;
  pageSize = 50;category:boolean=false;
  onSelectCategory(e){
    this.category=true;
    this.amazonservice.getSubCategory(this.site,e).subscribe((res: any) => {
      // console.log(res)
      this.subcategories = res.subcategories;
      // console.log(this.subcategories);
    });
  }
  onCategorySelect(e){
    this.node=e;
    this.amazonservice.getBrowserNodes(this.page,this.collectionsize,this.search,this.site,this.node).subscribe((res: any) => {
      // console.log(res)
      this.browserNodes = res.browsercategories;
      this.pages=res.page;
      this.collectionsize=this.pages.totalResults;
     
      // console.log(this.browserNodes);
    });
  }
  changespage(page: any) {
    this.onCategorySelect(this.node);
  }
  onSearch(){
    this.amazonservice.getBrowserNodes(this.page,this.collectionsize,this.search,this.site,this.node).subscribe((res: any) => {
      // console.log(res)
      this.browserNodes = res.browsercategories;
      this.pages=res.page;
      this.collectionsize=this.pages.totalResults;
      // console.log(this.browserNodes);
    });
  }
  node1:boolean=false;
  applyamazonbrowsernode(list){
    this.node1=true;
    this.channelProduct.storeCategoryIdOne=list.nodeId;
console.log(list);
$('#amazonbrowsernodedivmodal1').modal('hide');
  }
  applyamazonbrowsernode2(list){
    this.node1=false;
    this.channelProduct.storeCategoryIdTwo=list.nodeId;
console.log(list);
$('#amazonbrowsernodedivmodal1').modal('hide');
  }
  saveApi(){
    let obj = {
        "title": this.channelProduct.title,
        "description":  this.channelProduct.description,
        "sellingPrice":  this.channelProduct.sellingPrice,
        "listingQty": this.channelProduct.qty,
        templateId:this.channelProduct.templateId,
        templateName:this.channelProduct.templateName,
    }
    this.channelProductsService.savechannelproduct(obj, this.channelId).subscribe(result=>{
     //console.log(result);
    })

   }
   channelDet: any; listfullQuantity: boolean = true;relistClosedItems: boolean = true;
   updateqtylistingskuinput: any[]=[];
   updateqtylistingqtyinput: any[]=[];
   variationsku: any[]=[];
   variationqty: any[]=[];
   variationqtyselected: any[]=[];
   getChannelEditDetails(sku: any) {
     this.channelproductService.getChannelproducts_Single(sku).subscribe((res:any) => {
       //console.log(res);
       this.channelDet = res;
       this.toasterService.openToastMessage(ToastTypes.warning, 'Listed Products', res.data);
       this.channelDet?.child?.map(chi=>{
         chi.variationSelected=true;
       });
     })
   }
   changListFull() {
    this.listfullQuantity = !this.listfullQuantity;
  }
  changeRelist() {
    this.relistClosedItems = !this.relistClosedItems;
  }
   editQuantity(){
    $('#editqty-modal-listing').modal('show');
    this.getChannelEditDetails(this.channelProduct?.sku);
    this.channelDet = undefined;
   }
   closeChannelProductModal() {
    $('#editqty-modal-listing').modal('hide');
  }
  getImage(img: string) {
    return 'https://s3-us-west-1.amazonaws.com/khubweb/web/kartzhub' + img + '.png';
  }
  updateProductQty() {
    this.loading=true;
    this.updateqtylistingskuinput=[];
    this.updateqtylistingqtyinput=[];
    this.variationsku=[];
    this.variationqty=[];
    this.variationqtyselected=[];
    var sku = this.channelProduct?.sku;
    var qty = this.channelDet.kartzhubproduct.qty;
    var price = this.channelDet.kartzhubproduct.sellingPrice;
    var listfullqty = this.listfullQuantity;
    var relist = this.relistClosedItems;

    this.channelDet?.products?.forEach(pr => {
      this.updateqtylistingskuinput.push(pr.id);
      this.updateqtylistingqtyinput.push(pr.listingQty);
    });

    this.channelDet?.child?.forEach(pr => {
      this.variationsku.push(pr.sku);
      this.variationqty.push(pr.qty);
      this.variationqtyselected.push(pr.variationSelected);
    })

    this.channelproductService.updateProductQtyV2(sku, qty, price, listfullqty, relist, this.updateqtylistingskuinput, this.updateqtylistingqtyinput, this.variationsku, this.variationqty, this.variationqtyselected).subscribe(res => {
      //console.log(res);
      this.loading=false;
      this.channelProduct.qty = this.channelDet.kartzhubproduct.qty;
      this.toasterService.openToastMessage(ToastTypes.success, 'Listed Products', 'Price Details Updated');
      // this.getProducts();
      this.closeChannelProductModal();
    });

  }
  //  editChannelProduct(editedProductDetails: any) {
    
  //   $('#editqty-modal-listing').modal('show');
  //   this.editedProductDetails = editedProductDetails;
  //   this.loading = false;
  //   //console.log(editedProductDetails);
  //   this.channelDet = undefined;
  //   this.getChannelEditDetails(channelProduct?.sku);
  // }
  updateToAmazon(){
    this.channelProduct['ids']= [ this.channelId ];
    this.channelProductsService.listNow(this.channelProduct).subscribe(result=>{
      //console.log(result);
      this.toasterService.openToastMessage(ToastTypes.success, 'Success', 'success');
    }, error=>{

    })
  }
  manageAttributes(){
    $('#manage-attributes-modal').modal('show');
    this.amazonservice.getProductAttributes(this.channelId,this.channelProduct.channelCategory,this.channelProduct.channelSecondaryCategory).subscribe((res: any) => {
      console.log(res)
      
     
      // console.log(this.browserNodes);
    });
  }
  onSave(){

  }
  closeModal(){
    $('#manage-attributes-modal').modal('hide');
  }
  manageVariations(){
    $('#manage-variations-modal').modal('show');
  }
  closeVariationsModal(){
    $('#manage-variations-modal').modal('hide');
  }
  onSaveVariations(){

  }
}
