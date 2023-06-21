import { Component, Input, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { EtsyModel } from '../../models/etsy.model';
import { ListingService } from '../../services/listing.service';
declare var $:any;

@Component({
  selector: 'app-etsy-listing-template',
  templateUrl: './etsy-listing-template.component.html',
  styleUrls: ['./etsy-listing-template.component.scss']
})
export class EtsyListingTemplateComponent implements OnInit {
  templates = [];
  @Input() channelId: any;
  newTemplate  = false;
  templateModel:EtsyModel = new EtsyModel();
  loading = false;
  isEditTemplate = false;  
  categories = [];
  selectedFirstCategory:any = -1;
  selectedSecond:any = -1;
  selectedThird:any = -1;
  latestCategoryObj = -1;

  constructor( public etsyService: ListingService, 
    public datasharingService: DatasharingService,
    private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.getAllListingTemplates();
    this.getEtsyCategories(this.channelId);
  }
 
  newTemplateObj(){
    this.newTemplate = true;
    this.templateModel = new EtsyModel();
  }

  
  getAllListingTemplates(){
    this.loading = true;
    this.newTemplate = false;
    this.etsyService.getAllchannels(this.channelId).subscribe((result: any) => {
      this.templates = result;
      this.loading = false;
    }, error=>{
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'Etsy Load Templates', 'failed');
    });
  }


  editTemplate(item){
    this.loading = true;
    this.etsyService.getSelectedTemplate(this.channelId, item.id).subscribe((result: any) => {
      this.templateModel = result.etsyTemplate;
      this.newTemplate = false;
      this.loading = false;
      this.isEditTemplate = true;
      //console.log(result);
    }, error=>{
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
    });
  }
  
  removeTemplate(item){
    this.loading = true;
    this.etsyService.deleteSelectedTemplate(this.channelId, item.id).subscribe((result: any) => {
      //console.log(result);
      this.loading = false;
    },
    error=>{
      this.loading = false;
      //console.log(error);
      if(error.error.text === 'Succeessfully removed the template'){
        this.toasterService.openToastMessage(ToastTypes.success, 'Succeessfully removed the template', 'success');
        this.templates = this.templates.filter(template=>template.id != item.id)
      }else{
        this.toasterService.openToastMessage(ToastTypes.warning, 'Remove', 'failed');
      }
    });
  }

  saveEtsyTemplate(){
    this.loading = true;
    //console.log(this.templateModel);
    let etsySave = {
      "etsyTemplate" : {
        "shippingProfileId": this.templateModel.shippingProfileId,
        "shippingProfileName": this.templateModel.shippingProfileName,
        "name": this.templateModel.name,
        "who_made": this.templateModel.who_made,
        "when_made": this.templateModel.when_made,
        "what_is_it": this.templateModel.what_is_it,
        "categoryId": this.templateModel.categoryId,
        "storeCategoryId": "",
        "automaticallyrenew": this.templateModel.automaticallyrenew,
        "appendSku": this.templateModel.appendSku,
        "makeiteminactive": this.templateModel.makeiteminactive
      }
    }

    this.etsyService.saveEtsyTemplate(etsySave, this.channelId).subscribe((result: any) => {
      //console.log(result);
      this.loading = false;
      this.getAllListingTemplates();
      this.newTemplate = false;
      this.isEditTemplate = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'Etsy save Templates', 'success');
    }, error=>{
      this.loading = false;
      //console.log(error.error.text);

      if(error.error.text === 'Channel template created successfully'){
        this.toasterService.openToastMessage(ToastTypes.success, error.error.text, 'success');
        this.getAllListingTemplates();
        this.newTemplate = false;
        this.isEditTemplate = false;
      } else{
        this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
      }
    });
  }

  update(){
    this.saveEtsyTemplate();
  }
 
  clearValues(){
    this.selectedFirstCategory = -1;
    this.selectedSecond = -1;
    this.latestCategoryObj = -1;
  }
 
  close() {
    this.datasharingService.closeIntegrationTab();
  }

 openCategories(){
  $('#categorywindow2').modal('show');
 }
 openetsCategories(){
   this.clearValues();
  $('#categorywindow').modal('show');
 }
 updateValue(event){
   //console.log(event)
 }
 setCategory(){
  $('#categorywindow').modal('hide');
  //console.log(this.latestCategoryObj);
   this.templateModel.categoryId = this.latestCategoryObj['id']; 
}

 getEtsyCategories(item){
  this.loading = true;
  this.etsyService.etsyCategories(this.channelId).subscribe((result: any) => {
     this.categories = result.cats;

    //console.log(result);
  }, error=>{
    this.loading = false;
    this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
  });
}

}
