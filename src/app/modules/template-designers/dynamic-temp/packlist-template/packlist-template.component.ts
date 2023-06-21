import { CdkDragStart, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InvoiceTemplatesService } from '../../services/invoice-templates.service';
import picklist from '../../../../../assets/config/picklist.json';
import packlist from '../../../../../assets/config/packlist.json'
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
declare var $: any;
@Component({
  selector: 'app-packlist-template',
  templateUrl: './packlist-template.component.html',
  styleUrls: ['./packlist-template.component.scss']
})
export class PacklistTemplateComponent implements OnInit, OnChanges {
  previousIndex: number;
  constructor(private appTrackingService:AppTrackingService,private invoiceTemplatesService: InvoiceTemplatesService) { 
    let ip:usertrackInput={menu:TrackMenus.TEMPLATEDESIGNER,submenu:subMenus.OTHERS,page:pages.PACKLISTTEMPLATEDESIGNPAGE,function:"",descrption:"Packlist template design page loaded"};
    this.appTrackingService.trackUserActivity(ip);
  }
  dropdownSettings_template: any;
  selectedColumns: any = [];
  loading: boolean = false;
  ngOnChanges(changes: SimpleChanges): void {

    if (this.allInvoiceTemplates[0]?.labelFooterText != null && this.allInvoiceTemplates[0]?.labelFooterText != '')
      this.selectedColumns = JSON.parse(this.allInvoiceTemplates[0]?.labelFooterText);
    if (this.allInvoiceTemplates[0]?.id)
      this.invoiceTemplatesService.getShiplabels(this.allInvoiceTemplates[0]?.id).subscribe(res => {
        //console.log(res);
      });
  }
  @Input() allInvoiceTemplates: any;
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
    ip={menu:TrackMenus.TEMPLATEDESIGNER,submenu:subMenus.OTHERS,page:pages.PACKLISTTEMPLATEDESIGNPAGE,function:"",descrption:"Save Packlist button is clicked"};
    if(type==2)
    ip={menu:TrackMenus.TEMPLATEDESIGNER,submenu:subMenus.OTHERS,page:pages.PACKLISTTEMPLATEDESIGNPAGE,function:"",descrption:"Add Columns button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }
  dragStarted(event: CdkDragStart, index: number) {
    this.previousIndex = index;
  }
  columns: any[] = packlist;
  drop(event: CdkDragDrop<any[]>) {
    ////console.log(event);
    moveItemInArray(this.selectedColumns, event.previousIndex, event.currentIndex);
  }

  addcolumns() {
    $('#savepacklist-modal1').modal('show');
  }

  saveColumns() {
    this.hidemodal();
  }

  hidemodal() {
    $('#savepacklist-modal1').modal('hide');
  }
  savePackList() {
    this.allInvoiceTemplates.forEach(tem => {
      this.saveTemplate(tem);
    });
  }
  saveTemplate(tem) {
    // tem.invoiceHeaderText = JSON.stringify(this.selectedColumns);
    this.loading = true;
    tem.labelFooterText=  JSON.stringify(this.selectedColumns);
    let body = {
      "channelId": tem.id,
      "invoiceAddressText": tem.invoiceAddressText,
      "invoiceBodyText": tem.invoiceBodyText,
      "invoiceFooterText": tem.invoiceFooterText,
      "invoiceHeaderText": tem.invoiceHeaderText,
      "invoicePrinter": tem.invoicePrinter,
      "labelFooterText": JSON.stringify(this.selectedColumns),
      "labelHeaderText": '',
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


