import { Component, OnInit, Output , EventEmitter, Input } from '@angular/core';
import { ListingService } from 'src/app/modules/integrations/services/listing.service';
import { ChannelProductsService } from 'src/app/modules/inventory/services/channel-products.service';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
declare var $:any;

@Component({
  selector: 'app-shopify-channel',
  templateUrl: './shopify-channel.component.html',
  styleUrls: ['./shopify-channel.component.scss']
})
export class ShopifyChannelComponent implements OnInit {

  @Input()
  channelProduct:any;
  @Input() channelId:any;
  @Input()
  productImages:any;

  @Input()
  templates:any;

  categoryID:any;


  @Input()
  product:any;

  @Output() closeEvent :EventEmitter<any> = new EventEmitter<any>();
  loading: boolean;
  categoriesList: any;
  constructor(public toasterService: ToasterService, public listingService: ListingService, public channelProductsService: ChannelProductsService) { }



  ngOnInit(): void {
    this.channelProduct = this.product.channelproduct;
    this.productImages = this.product.productimages;
    this.templates = this.product.templates;

  }
  close(){
    this.closeEvent.emit(false);
  }

  removeitemfromchannel(x){}
  closechannelproduct(x){}


  shopifycategories(){
    this.loading = true;
    this.listingService.shopifyCategories(this.channelProduct.channelUser.id).subscribe((result: any) => {
      this.categoriesList = result.categories;
      $('#categorywindow').modal('show');
      //console.log(result);
    }, error=>{
      this.loading = false;
      // this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
    });
  }
  setCategory(){

  }

  removevariationtheme(x){}
  managechannelvariationtheme(x){}
  addchannelvariation(x, s){}


  updatetochannel(){
    this.loading = true;
    //this.channelProduct['ids']= [ this.channelId ];
    this.channelProductsService.listNow({'ids': [this.channelProduct['id']]}).subscribe(result=>{
      //console.log(result);
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'message: Changes will be sent to the selected channels', 'success');

    }, error=>{
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'failed', 'failed');

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
     this.toasterService.openToastMessage(ToastTypes.warning, 'failed', 'failed');
   })

  }

}
