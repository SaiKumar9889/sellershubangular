import { CdkDragDrop, CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InvoiceTemplatesService } from '../../services/invoice-templates.service';
import picklist from '../../../../../assets/config/picklist.json';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
declare var $:any;
@Component({
  selector: 'app-picklist-template',
  templateUrl: './picklist-template.component.html',
  styleUrls: ['./picklist-template.component.scss']
})
export class PicklistTemplateComponent implements OnInit,OnChanges {
  previousIndex: number;
  constructor(private appTrackingService:AppTrackingService,private invoiceTemplatesService: InvoiceTemplatesService) {
    let ip:usertrackInput={menu:TrackMenus.TEMPLATEDESIGNER,submenu:subMenus.OTHERS,page:pages.PICKLISTTEMPLATEDESIGNPAGE,function:"",descrption:"Picklist template design page loaded"};
    this.appTrackingService.trackUserActivity(ip);
   }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.allInvoiceTemplates[0]?.labelHeaderText!=null&&this.allInvoiceTemplates[0]?.labelHeaderText!='')
    this.selectedColumns=JSON.parse(this.allInvoiceTemplates[0]?.labelHeaderText);
    if(this.allInvoiceTemplates[0]?.id)
    this.invoiceTemplatesService.getShiplabels(this.allInvoiceTemplates[0]?.id).subscribe(res=>{
      //console.log(res);
    });
  }
  dropdownSettings_template:any;
  selectedColumns:any=[];
  loading:boolean=false;
  @Input()allInvoiceTemplates:any;
  ngOnInit(): void {
    this.dropdownSettings_template = {
      singleSelection: false,
      idField: 'key',
      textField: 'displaycolumn',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 100,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true
    };
   
  }
  auditTrack(type:any){
    let ip:usertrackInput;
    if(type==1)
    ip={menu:TrackMenus.TEMPLATEDESIGNER,submenu:subMenus.OTHERS,page:pages.PICKLISTTEMPLATEDESIGNPAGE,function:"",descrption:"Save Picklist button is clicked"};
    if(type==2)
    ip={menu:TrackMenus.TEMPLATEDESIGNER,submenu:subMenus.OTHERS,page:pages.PICKLISTTEMPLATEDESIGNPAGE,function:"",descrption:"Add Columns button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }
  dragStarted(event: CdkDragStart, index: number) {
    this.previousIndex = index;
  }
  columns: any[] = picklist;

  
  drop(event: CdkDragDrop<any[]>) {
    ////console.log(event);
    moveItemInArray(this.selectedColumns, event.previousIndex, event.currentIndex);
  }

  addcolumns(){
    $('#savepicklist-modal').modal('show');
  }

  saveColumns(){
    this.hidemodal();
  }

  hidemodal(){
    $('#savepicklist-modal').modal('hide');
  }

  savePackList(){
    this.allInvoiceTemplates.forEach(tem => {
      this.saveTemplate(tem);
    });
  }
  saveTemplate(tem) {
    // tem.invoiceHeaderText = JSON.stringify(this.selectedColumns);
    this.loading = true;
    tem.labelHeaderText=  JSON.stringify(this.selectedColumns);
    let body = {
      "channelId": tem.id,
      "invoiceAddressText": tem.invoiceAddressText,
      "invoiceBodyText": tem.invoiceBodyText,
      "invoiceFooterText": tem.invoiceFooterText,
      "invoiceHeaderText": tem.invoiceHeaderText,
      "invoicePrinter": tem.invoicePrinter,
      "labelFooterText": tem.labelFooterText,
      "labelHeaderText":  JSON.stringify(this.selectedColumns),
      "labelHeight": 0,
      "labelPrinter": tem.labelPrinter,
      "labelWidth": 0,
      "numberofLabelsPerSheet": tem.numberofLabelsPerSheet,
      "showTaxAmount": true,
      "showimage": true,
      "showitem": true,
      "showsku": true,
      "showvariations": true,
      "taxAmount": 0
    }
    this.invoiceTemplatesService.saveLabel(body).subscribe((res: any) => {
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
}
