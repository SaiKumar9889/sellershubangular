import { Component, OnInit, EventEmitter, Output, Input, Inject } from '@angular/core';
import { EbayList } from 'src/app/modules/integrations/models/ebay.model';
import { EbayListService } from 'src/app/modules/integrations/services/ebay-list.service';
import { ListingService } from 'src/app/modules/integrations/services/listing.service';
import { ChannelProductsService } from 'src/app/modules/inventory/services/channel-products.service';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
declare var $: any;

@Component({
  selector: 'app-ebay-channel',
  templateUrl: './ebay-channel.component.html',
  styleUrls: ['./ebay-channel.component.scss']
})
export class EbayChannelComponent implements OnInit {

  channelProduct: any;

  productImages: any;
  templateId: any;
  templates: any;

  @Input()
  channelId: any;

  @Input()
  product: any;

  content = "";
  config = {
    // extraPlugins: "autogrow",
    // resize_enabled: false,
    // autoGrow_maxHeight: 200,
    // autoGrow_maxWidth: 200,
    // removePlugins: "resize"
  };
  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();
  loading: boolean;
  itemSpecs: any;
  constructor(public toasterService: ToasterService,
    public listingService: ListingService,
    public channelProductsService: ChannelProductsService,
    public ebayListService: EbayListService) { }


  ngOnInit(): void {
    this.channelProduct = this.product.channelproduct;
    this.productImages = this.product.productimages;
    this.templates = this.product.templates;
  }
  close() {
    this.closeEvent.emit(false);
  }
  siteCheck = 'UK'; categoriesOpen: boolean; categoryIndex = 0;
  openCategories() {
    // let temp = this.templates.find(supl => supl.id == this.templateId);
    // this.ebayList=temp;
    this.loading = true;
    if (this.categoryIndex < 3) {
      this.ebayListService.getCategories('', this.siteCheck).subscribe((result: any) => {
        console.log(result);
        this.categoriesOpen = true;
        this.loading = false;
        this.openSubCategories(result.categoryid, this.siteCheck);
      }, error => {
        this.loading = false;
        this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
      })
    } else {
      this.loadEbayStoreCategories('', this.channelId, '%23');
    }

  }
  onItemSelect(event: any) {
    // this.templateId=(event.target.value);
  }
  categoriesData: any; treeUpdate = false;
  openSubCategories(id, site) {
    this.loading = true;
    this.ebayListService.getSubCategories(id, site, '').subscribe((result: any) => {
      // console.log(result);
      result.map(item => { item['expand'] = false, item['level'] = 0 });
      this.categoriesData = result;
      console.log(this.categoriesData)
      this.treeUpdate = true;
      $('#openCategories').modal('show');
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
    })
  }
  loadEbayStoreCategories(id, channeluserid, parenttag = '') {
    this.loading = true;
    this.ebayListService.loadEbayStoreCategories(id, channeluserid, parenttag).subscribe((result: any) => {
      console.log(result);
      result.map(item => { item['expand'] = false, item['level'] = 0 });
      this.categoriesData = result;
      this.treeUpdate = true;
      $('#openCategories').modal('show');
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
    })
  }
  categoryID: any; ebayList: EbayList = new EbayList();
  getItemValue(event) {
    console.log(event);
    this.categoryID = event.id;
  }
  closeJsTree() {
    this.treeUpdate = false;
    if (this.categoryID) {
      if (this.categoryIndex == 1) {
        this.ebayList.ebayCategoryId = this.categoryID;
      } else if (this.categoryIndex == 2) {
        this.ebayList.ebayCategoryId2 = this.categoryID;
      } else if (this.categoryIndex == 3) {
        this.ebayList.ebayStoreCategoryId = this.categoryID;
      } else if (this.categoryIndex == 4) {
        this.ebayList.ebayStoreCategory2Id = this.categoryID;
      }

    }

    $('#openCategories').modal('hide');
  }

  updatetochannel() {
    this.loading = true;
    this.channelProduct['ids'] = [this.channelId];
    this.channelProductsService.listNow(this.channelProduct).subscribe(result => {
      //console.log(result);
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'message: Changes will be sent to the selected channels', 'success');

    }, error => {
      this.loading = false;

    })
  }


  save() {
    this.loading = true;
    let obj = {

      "title": this.channelProduct.title,
      "description": this.channelProduct.description,
      "sellingPrice": this.channelProduct.sellingPrice,
      "listingQty": this.channelProduct.qty,
    }
    this.channelProductsService.savechannelproduct(obj, this.channelId).subscribe(result => {
      //console.log(result);
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'Success', 'success');
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'failed', 'failed');
    })

  }

  openItemSpecs() {
    this.loading = true;
    this.ebayListService.getEbayItemSpecsForProduct(this.channelProduct.productId, this.product ? this.product.id : -1).subscribe((resp: any) => {
      this.itemSpecs = resp;
      $('#editattributemodal').modal('show');
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error)
    })


  }
  saveattributes() {
    let obj = {
      name: [],
      value: []
    }
    this.itemSpecs.attributes.forEach(attr => {
      obj.name.push(attr.name);
      obj.value.push(attr.value);
    });
    this.loading = true;
    this.ebayListService.saveEbayItemSpecs(this.channelProduct.id, obj).subscribe((resp: any) => {

      $('#editattributemodal').modal('hide');
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error)
    })

  }
}
