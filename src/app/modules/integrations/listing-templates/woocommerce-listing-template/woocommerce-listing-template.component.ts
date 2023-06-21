import { Component, Input, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { WooCommerceModel } from '../../models/woo-commerce.model';
import { ListingService } from '../../services/listing.service';

@Component({
  selector: 'app-woocommerce-listing-template',
  templateUrl: './woocommerce-listing-template.component.html',
  styleUrls: ['./woocommerce-listing-template.component.scss']
})
export class WoocommerceListingTemplateComponent implements OnInit {
  isEditTemplate = false;newTemplate = false;
  templateModel: WooCommerceModel;
  templates = [];loading = false;
  @Input() channelId: any;
  categoriesList: any = [];
  categoryID: any;
  categoryIndex = 0;
  constructor(public listingService: ListingService,public datasharingService: DatasharingService,
    private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.getAllListingTemplates();
  }
  newTemplateObj() {
    this.newTemplate = true;
    this.templateModel = new WooCommerceModel();
  }
  close() {
    this.datasharingService.closeIntegrationTab();
  }
  updateTemplate() {
    if (this.templateModel.id) {
      this.updateWooCommerceTemplate();
    } else {
      this.saveWooCommerceTemplate();
    }
  }
  getAllListingTemplates() {
    this.loading = true;
    this.listingService.getAllchannels(this.channelId).subscribe((result: any) => {
      this.templates = result;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'WooCommerce load templates', 'failed');
    });
  }
  updateWooCommerceTemplate() {
    this.loading = true;
    let obj = { "woocommerceTemplate": this.templateModel }
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
  editTemplate(item) {
    this.loading = true;
    this.listingService.getSelectedTemplate(this.channelId, item.id).subscribe((result: any) => {
      this.templateModel = result.woocommerceTemplate;
      this.templateModel.id = item.id;
      this.templateModel.templateName=item.templateName;
      this.templateModel.pricingRule=item.pricingRule;
      this.templateModel.shippingclass=item.shippingclass;
      this.templateModel.categoryIds=item.categoryid;
      this.isEditTemplate = true;
      this.loading = false;
      // console.log(result);
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
      this.toasterService.openToastMessage(ToastTypes.success, 'WooCommerce Removed', 'success');
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
  setCategory() {
    // $('#categorywindow').modal('hide');
    // this.templateModel.storeCategoryId = this.categoryID;
  }
  saveWooCommerceTemplate(){
    this.loading = true;
    let obj = { "woocommerceTemplate": this.templateModel }
    //console.log(this.templateModel);
    this.listingService.saveEtsyTemplate(obj, this.channelId).subscribe((result: any) => {
      //console.log(result);
      this.loading = false;
      this.newTemplate = false;
      this.isEditTemplate = false;
      this.getAllListingTemplates();
      this.toasterService.openToastMessage(ToastTypes.success, 'WooCommerce Saved', 'success');
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
  openCategories(){}
}
