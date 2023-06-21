import { Component, Input, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { Magento2 } from '../../models/magento2.model';
import { ListingService } from '../../services/listing.service';
declare var $:any;

@Component({
  selector: 'app-magento2-listing-template',
  templateUrl: './magento2-listing-template.component.html',
  styleUrls: ['./magento2-listing-template.component.scss']
})
export class Magento2ListingTemplateComponent implements OnInit {
  @Input() channelId:any;
  templates: any[];
  newTemplate = false;
  loading = false;
  isEditTemplate = false;
  templateModel: Magento2 = new Magento2();

  constructor(public listingService: ListingService, public datasharingService: DatasharingService,
    private toasterService: ToasterService) { }

  ngOnInit(): void {
    //console.log(this.channelId);
    this.getAllListingTemplates();
  }

  categories(){
    $('#editattributemodal').modal('show');
  }

  newTemplateObj(){
    this.newTemplate = true;

  }
  close() {
    this.datasharingService.closeIntegrationTab();
  }
  
  
  getAllListingTemplates(){
    this.loading = true;
    this.listingService.getAllchannels(this.channelId).subscribe((result: any) => {
      this.templates = result;
      this.newTemplate = false;
      this.loading = false;
    }, 
    error=>{
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'Magento2 load templates', 'failed');
    });
  }


  editTemplate(item){
    this.loading = true;
    this.listingService.getSelectedTemplate(this.channelId, item.id).subscribe((result: any) => {
      this.templateModel = result.magento2Template;
      this.newTemplate = false;
      this.loading = false;
      this.isEditTemplate = true;
      //console.log(result);
    },
     error=>{
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
    });
  }
  
  removeTemplate(item){
    this.listingService.deleteSelectedTemplate(this.channelId, item.id).subscribe((result: any) => {
      //console.log(result);
      this.toasterService.openToastMessage(ToastTypes.success, 'Magento2 Removed', 'success');
    },
    error=>{
      //console.log(error);
      if(error.error.text === 'Succeessfully removed the template'){
        this.toasterService.openToastMessage(ToastTypes.success, error.error.text, 'success');
        this.templates = this.templates.filter(template=>template.id != item.id)
      } else{
        this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
      }
    }
    );
  }

  saveMagento(){
    this.loading = true;
    let obj = { "magento2Template": this.templateModel};
    //console.log(obj);
    this.listingService.saveEtsyTemplate(obj, this.channelId).subscribe((result: any) => {
      //console.log(result); 
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'Magento2 Saved', 'success');
      this.getAllListingTemplates();
    }, 
    error=>{
      this.loading = false;
      if(error.error.text === 'Channel template created successfully'){
        this.toasterService.openToastMessage(ToastTypes.success, error.error.text, 'success');
        this.getAllListingTemplates();
      } else{
        this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
      }
    });
  }

  updateTemplate(){
    this.saveMagento();
  }

}
