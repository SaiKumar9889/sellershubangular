import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ListingService } from 'src/app/modules/integrations/services/listing.service';
import { ChannelProductsService } from 'src/app/modules/inventory/services/channel-products.service';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
declare var $:any;

@Component({
  selector: 'app-etsy-channel',
  templateUrl: './etsy-channel.component.html',
  styleUrls: ['./etsy-channel.component.scss']
})
export class EtsyChannelComponent implements OnInit {

  @Input()
  channelProduct:any;

  @Input() channelId:any;

  @Input()
  productImages:any;

  @Input()
  templates:any;


  @Input()
  product:any;

  @Output() closeEvent :EventEmitter<any> = new EventEmitter<any>();
  loading: boolean;
  categories = [];
  selectedFirstCategory:any = -1;
  selectedSecond:any = -1;
  selectedThird:any = -1;
  latestCategoryObj:any = -1;
  constructor(public toasterService: ToasterService,public etsyService: ListingService, public channelProductsService: ChannelProductsService) { }

  ngOnInit(): void {
    this.channelProduct = this.product.channelproduct;
    this.productImages = this.product.productimages;
    this.templates = this.product.templates;
  }
  close(){
    this.closeEvent.emit(false);
  }

  removeitemfromchannel(v){
  }
  showcategories(v){}
  showstorecategories(v){}
  editchannelvariationkartzhubproduct(v,c){}

  removevariationtheme(v){}
  managechannelvariationtheme(v){}

  addchannelvariation(v, s){ }

  setCategory(){
    this.channelProduct.channelCategory = this.latestCategoryObj.id;
    $('#categorywindow').modal('hide');
  }

  getEtsyCategories(item){
    this.loading = true;
    this.etsyService.etsyCategories(this.channelProduct.channelId).subscribe((result: any) => {
       this.categories = result.cats;
       this.loading = false;
       $('#categorywindow').modal('show');
      //console.log(result);
    }, error=>{
      this.loading = false;
      // this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
    });
  }



  updatetochannel(){
    this.loading = true;
    this.channelProduct['ids']= [ this.channelId ];
    this.channelProductsService.listNow(this.channelProduct).subscribe(result=>{
      //console.log(result);
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'message: Changes will be sent to the selected channels', 'success');
    }, error=>{
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'Failed', 'Failed');
    })
  }

  savechannelproduct(){
    this.loading = true;
    let obj = {
      "title": this.channelProduct.title,
      "description":  this.channelProduct.description,
      "sellingPrice":  this.channelProduct.sellingPrice,
      "listingQty": this.channelProduct.qty,
      id : this.channelProduct.id,
      templateId:this.channelProduct.templateId,
      channelCategory: this.channelProduct.channelCategory
  }
   this.channelProductsService.savechannelproduct(obj, this.channelProduct.id).subscribe(result=>{
    //console.log(result);
    this.loading = false;
    this.toasterService.openToastMessage(ToastTypes.success, 'Success', 'success');
   }, error=>{
     this.loading = false;
    this.toasterService.openToastMessage(ToastTypes.warning, 'Failed', 'Failed');
   })

  }

}
