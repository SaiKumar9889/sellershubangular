import { Component, Input, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { AmazonModel } from '../../models/amazon.model';
import { AmazonInteService } from '../../services/amazon-inte.service';
declare var $: any;
@Component({
  selector: 'app-amazon-listing-template',
  templateUrl: './amazon-listing-template.component.html',
  styleUrls: ['./amazon-listing-template.component.scss']
})
export class AmazonListingTemplateComponent implements OnInit {
  templateModel: AmazonModel= new AmazonModel();
  newTemplate = false;
  isEditTemplate = false;
  loading: boolean= false;
  templates: any;
  @Input() channelId: any;
  allCountries: any = [];
  constructor(public amazonservice: AmazonInteService, public datasharingService: DatasharingService,
    private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.allCountries = this.datasharingService.getCountry();
    this.getAllListingTemplates();
  }
  newTemplateObj() {
    this.loading = true;
    this.amazonservice.getSelectedTemplate(this.channelId, -1).subscribe((result: any) => {
     console.log(result);
     this.templateModel = result.amazonListingTemplate;
      this.newTemplate = true;
      
      console.log(this.templateModel)
      this.loading = false;
  }, error => {
    this.loading = false;
    console.log(error)
  });
  }
  closeEbay() {
    this.datasharingService.closeIntegrationTab();
  }
  closeListing() {
    this.newTemplate = false;
    this.isEditTemplate = false;
    this.templateModel = new AmazonModel();

  }
  subcategories:any=[];site='UK';browserNodes:any=[];page: number = 1;;total=1;search='';pages:any=[];node:any='';
  collectionsize = environment.defaultTotalValue;
  pageSize = 50;
  onSelectCategory(e){
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
  onSearch(){
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
  openBrowserNode(){
    $('#amazonbrowsernodedivmodal1').modal('show');
  }
  openBrowserNodes(){
    $('#amazonbrowsernodedivmodal1').modal('show');
  }
  getAllListingTemplates() {
    this.loading = true;
    this.amazonservice.getAllchannels(this.channelId).subscribe((result: any) => {
      this.templates = result;
      this.loading = false;
      console.log(result);
    }, error => {
      this.loading = false;
    });
  }
  node1:boolean=false;
  applyamazonbrowsernode(list){
    this.node1=true;
    this.templateModel.browserNode1=list.nodeId;
console.log(list);
$('#amazonbrowsernodedivmodal1').modal('hide');
  }
  applyamazonbrowsernode2(list){
    this.node1=false;
    this.templateModel.browserNode2=list.nodeId;
console.log(list);
$('#amazonbrowsernodedivmodal1').modal('hide');
  }
  editTemplate(item = null) {
    this.loading = true;
    this.amazonservice.getSelectedTemplate(this.channelId, item ? item.id : -1).subscribe((result: any) => {
      ////console.log(token);
      // console.log(result);
      this.templateModel=result.amazonListingTemplate;
      this.newTemplate = false;
      this.isEditTemplate = true;


      this.loading = false;
    }, error => {
      
      this.loading = false;

      this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
    });
  }

  removeTemplate(item) {
    this.loading = true;
    this.amazonservice.deleteSelectedTemplate(this.channelId, item.id).subscribe((result: any) => {
      //console.log(result);
      this.loading = false;
      this.getAllListingTemplates();
      this.toasterService.openToastMessage(ToastTypes.success, 'Amazon Removed', 'success');
    },
      error => {
        //console.log(error);
        this.loading = false;
        if (error.error.text === 'Succeessfully removed the template') {
          this.toasterService.openToastMessage(ToastTypes.success, error.error.text, 'success');
          this.templates = this.templates.filter(template => template.id != item.id)
        } else {
          this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
        }
      }
    );
  }
  
  saveTemplate() {
    this.loading = true;
    // let obj = { "amazonListingTemplate": this.templateModel };
    //console.log(obj);
    let data = new AmazonModel();
    Object.assign(data, this.templateModel);
    this.amazonservice.saveEtsyTemplate(this.templateModel, this.channelId).subscribe((result: any) => {
      console.log(result); 
      this.loading = false;
      this.newTemplate = false;
      this.isEditTemplate = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'Ebay Saved', 'success');
      this.getAllListingTemplates();
    },
      error => {
        this.loading = false;
        console.log(error)
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
  close() {
    this.datasharingService.closeIntegrationTab();
  }

}
