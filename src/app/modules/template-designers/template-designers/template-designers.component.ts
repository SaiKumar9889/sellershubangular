import { Component, OnInit } from '@angular/core';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { InvoiceTemplatesService } from '../services/invoice-templates.service';

@Component({
  selector: 'app-template-designers',
  templateUrl: './template-designers.component.html',
  styleUrls: ['./template-designers.component.css']
})
export class TemplateDesignersComponent implements OnInit {

  loading: boolean = false;
  isEditInvoice: boolean = false;
  constructor(private appTrackingService:AppTrackingService,private invoiceTemplatesService: InvoiceTemplatesService) {
    let ip:usertrackInput={menu:TrackMenus.TEMPLATEDESIGNER,submenu:subMenus.OTHERS,page:pages.INVOICETEMPLATEDESIGNPAGE,function:"",descrption:"Invoice template design page loaded"};
    this.appTrackingService.trackUserActivity(ip);
   }

  ngOnInit(): void {
    this.loading = true;
    this.getInvoiceTemplates();
  }

  auditTrack(type:any){
    let ip:usertrackInput;
    if(type==1)
    ip={menu:TrackMenus.TEMPLATEDESIGNER,submenu:subMenus.OTHERS,page:pages.INVOICETEMPLATEDESIGNPAGE,function:"",descrption:"Create Invoice button is clicked"};
    if(type==2)
    ip={menu:TrackMenus.TEMPLATEDESIGNER,submenu:subMenus.OTHERS,page:pages.INVOICETEMPLATEDESIGNPAGE,function:"",descrption:"Back To Listing button is clicked"};
    if(type==3)
    ip={menu:TrackMenus.TEMPLATEDESIGNER,submenu:subMenus.OTHERS,page:pages.INVOICETEMPLATEDESIGNPAGE,function:"",descrption:"Edit Invoice button is clicked"};
    if(type==4)
    ip={menu:TrackMenus.TEMPLATEDESIGNER,submenu:subMenus.OTHERS,page:pages.INVOICETEMPLATEDESIGNPAGE,function:"",descrption:"Edit Packing Slip button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }
  allInvoiceTemplates: any = [];
 
  getInvoiceTemplates() {
    this.loading = true;
    this.invoiceTemplatesService.getInvoiceTemplates().subscribe(res => {
      this.allInvoiceTemplates = res;
      this.loading = false;
      console.log(this.allInvoiceTemplates)
    
    })
  }
  dashboard: any;
  isEditInvoiceI: boolean = false;
  isEditLable: boolean = false;
  isEditPackingSlip: boolean = false;
  editInvoice(template: any) {
    this.isEditInvoice = true;
    this.isEditInvoiceI = true;
    this.isEditLable = false;
    // //console.log(template?.invoiceBodyText);
    // let temp=template?.invoiceBodyText.replace('<p>','');
    // temp= temp.replace('</p>','');
    this.dashboard = template;
    console.log(template)

  }
  editPackingSlip(template: any){
    this.isEditInvoice = false;
    this.isEditInvoiceI = true;
    this.isEditLable = false;
    this.isEditPackingSlip=true;
    this.dashboard = template;
  }
  editLabels(template: any) {
    this.isEditLable = true;
    this.isEditInvoice = true;
  }

  enableTemplateCreation() {
    this.isEditInvoice = true;
    this.isEditInvoiceI = false;
    this.isEditLable = false;
  }
  backToListing() {
    this.isEditInvoice = false;
    this.isEditInvoiceI = false;
    this.isEditLable = false;
    this.getInvoiceTemplates();
  }

  createPacklist(){

  }
  createPicklist(){
    
  }
}
