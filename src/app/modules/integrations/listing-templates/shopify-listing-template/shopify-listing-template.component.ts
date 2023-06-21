import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ListingService } from '../../services/listing.service';
import { ShopifyModel } from '../../models/shopify.model';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
declare var $: any;

@Component({
  selector: 'app-shopify-listing-template',
  templateUrl: './shopify-listing-template.component.html',
  styleUrls: ['./shopify-listing-template.component.scss']
})
export class ShopifyListingTemplateComponent implements OnInit {
  @Input() channelId: any;
  newTemplate = false;
  templates = [];
  templateModel: ShopifyModel;
  loading = false;
  isEditTemplate = false;
  categoriesList: any = [];
  selectedFirstCategory: any;
  selectedSecond: any;
  selectedThird: any;
  categoryID: any;

  constructor(public listingService: ListingService, public datasharingService: DatasharingService,
    private toasterService: ToasterService) { }

  categories() {
    $('#footer2modal').modal('show');
  }
  ngOnInit(): void {
    this.getAllListingTemplates();
    this.getshopifyCategories();
  }

  newTemplateObj() {
    this.newTemplate = true;
    this.templateModel = new ShopifyModel();
  }

  setCategory() {
    $('#categorywindow').modal('hide');
    this.templateModel.storeCategoryId = this.categoryID;
  }
  openetsCategories() {
    $('#categorywindow').modal('show');
  }


  getAllListingTemplates() {
    this.loading = true;
    this.listingService.getAllchannels(this.channelId).subscribe((result: any) => {
      this.templates = result;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'Shopify load templates', 'failed');
    });
  }

  editTemplate(item) {
    this.loading = true;
    this.listingService.getSelectedTemplate(this.channelId, item.id).subscribe((result: any) => {
      this.templateModel = result.shopifyTemplate;
      this.templateModel.id = item.id;
      this.isEditTemplate = true;
      this.loading = false;
      //console.log(result);
    }, error => {
      this.templateModel.id = null;
      this.loading = false;

      this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
    });
  }

  removeTemplate(item) {
    this.loading = true;
    this.listingService.deleteSelectedTemplate(this.channelId, item.id).subscribe((result: any) => {
      //console.log(result);
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'Shopify Removed', 'success');
    },
      error => {
        this.loading = false;
        if (error.error.text === 'Succeessfully removed the template') {
          this.toasterService.openToastMessage(ToastTypes.success, error.error.text, 'success');
          this.templates = this.templates.filter(template => template.id != item.id)
        } else {
          this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
        }
      });
  }
  saveshopifyTemplate() {
    this.loading = true;
    let obj = { "shopifyTemplate": this.templateModel }
    //console.log(this.templateModel);
    this.listingService.saveEtsyTemplate(obj, this.channelId).subscribe((result: any) => {
      //console.log(result);
      this.loading = false;
      this.newTemplate = false;
      this.isEditTemplate = false;
      this.getAllListingTemplates();
      this.toasterService.openToastMessage(ToastTypes.success, 'Shopify Saved', 'success');
    }, error => {
      this.loading = false;
      if (error.error.text === 'Channel template created successfully') {
        this.toasterService.openToastMessage(ToastTypes.success, error.error.text, 'success');
        this.getAllListingTemplates();
        this.newTemplate = false;
        this.isEditTemplate = false;
      } else {
        this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
      }
    });
  }
  updatehopifyTemplate() {
    this.loading = true;
    let obj = { "shopifyTemplate": this.templateModel }
    //console.log(this.templateModel);
    this.listingService.updateEtsyTemplate(obj, this.channelId).subscribe((result: any) => {
      //console.log(result);
      this.loading = false;
      this.newTemplate = false;
      this.isEditTemplate = false;
      this.getAllListingTemplates();
      this.toasterService.openToastMessage(ToastTypes.success, 'Shopify updated', 'success');
    }, error => {
      this.loading = false;
      if (error.error.text === 'Channel template updated successfully') {
        this.toasterService.openToastMessage(ToastTypes.success, error.error.text, 'success');
        this.getAllListingTemplates();
        this.newTemplate = false;
        this.isEditTemplate = false;
      } else {
        this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
      }
    });
  }

  updateTemplate() {
    if (this.templateModel.id) {
      this.updatehopifyTemplate();
    } else {
      this.saveshopifyTemplate();
    }
  }

  close() {
    this.datasharingService.closeIntegrationTab();
  }


  getshopifyCategories() {
    this.loading = true;
    this.listingService.shopifyCategories(this.channelId).subscribe((result: any) => {
      this.categoriesList = result.categories;
      //console.log(result);
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
    });
  }
}
