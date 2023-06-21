import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { Utill } from './_utills';
import { ReportUtill } from './reports/ReportUtill';
import { Page, UIItems } from './reports/Template';
export class Report{
  reportid: number;
  reportName: string;
  reportQuery: string;
  reportDesc: string;
  createdbyid: number;
  createdbyrid: number;
  createdbyDate: string;
  active: number;
  updatedbyId: number;
  updatedbyRid: number;
  updateddtm: string;
  columns: Column[];
}
export class Column{
  mappingid: number;
  reportid: string;
  columnname: string;
  columnDisplayname: string;
  createdbyid: number;
  createdbyrid: number;
  createdbyDate: string;
  active: number;
  updatedbyId: number;
  updatedbyRid: number;
  updateddtm: string;
  datatype:string;
};
declare var $: any;
@Component({
  selector: 'app-reportengine',
  templateUrl: './reportengine.component.html',
  styleUrls: ['./reportengine.component.css']
})
export class ReportengineComponent implements OnInit {
  // Transfer Items Between Lists
  dragableItems = ['Text Field', 'Text Area', 'Image', 'Table'];
  draggetItems: any = [];
  template: any = { createdby: 'venkat', totalpages: 1, templatename: 'User Report', pages: [] };
  allreports: Report[] = [];
  selectedReport: Report;
  constructor( private toast: ToasterService) {
    this.IntializeReport();
  }

  ngOnInit(): void {
    this.getReports();
  }
  saveReport() {
    // let rep: TemplateDb = { createdDtm: Utill.getDateAndTime(), createdbyid: 1, createdbyrid: 1, reportname: this.template.templatename, report: JSON.stringify(this.template), isActive: 1 };
    // this.engine.saveReport(rep).subscribe(res => {
    //   //////console.log();
    //   this.toast.openToastMessage(ToastTypes.success, 'VSQC', 'Template Created Successfully');
    //   this.template = { createdby: 'venkat', totalpages: 1, templatename: 'User Report', pages: [] };
    //   this.IntializeReport();
    // });
    //////console.log(this.template);
  }
  IntializeReport() {
    this.template.pages = [];
    let div = [];
    for (let i = 0; i < ReportUtill.minNumberOfDivByDefault; i++) {
      div.push(this.createDiv(1));
    }
    let page: Page = { pageno: 1, divs: div };
    this.template.pages.push(page);
    //////console.log(this.template);
  }
  createDiv(pagenumber: number) {
    let divposition = ReportUtill.divnumber++;
    let div: UIItems = { pageno: pagenumber, divid: 'div-' + divposition, divposition: divposition, UIelements: [] };
    return div;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.dragableItems, event.previousIndex, event.currentIndex);
    }
  }
  drop1(event: CdkDragDrop<string[]>, divnumber: number, pagenumber: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.draggetItems, event.previousIndex, event.currentIndex);
    } else {
      //////console.log('divnumber:::' + divnumber);
      //////console.log('pagenumber:::' + pagenumber);
      //////console.log(event.item.data);
      //////console.log(event.currentIndex);
      //////console.log(event.previousIndex);
      //////console.log(event.container.data);
      //////console.log(event.previousContainer.data);
      let page = this.template.pages.find(item => item.pageno == pagenumber);
      let div = page.divs.find(item => item.divposition == divnumber);
      // //////console.log(page);
      // //////console.log(div);
      if(event.item.data!=undefined){
        div.UIelements.splice(div.UIelements.length, 0, ReportUtill.getUIObject(event.item.data, div.divposition, div.pageno));
        // div.UIelements=this.draggetItems;     
        //////console.log(div);
      }      
    }
  }
  array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
  };
  moveTop(divs:any,i){
    //////console.log(divs);
    //////console.log(i);
    divs=this.array_move(divs,i,i-1);
  }
  movedown(divs:any,i){
    //////console.log(divs);
    //////console.log(i);
    divs=this.array_move(divs,i,i+1);
  }
  getReports() {
    // this.engine.loadReportMetaData().subscribe(res => {
    //   this.allreports = res;
    // });
  }
  getId(div: number, page: number) {
    return 'dragaable-' + page + '-' + div;
  }
  loadColumns(event: any) {
    //////console.log(event.target.value);
    this.selectedReport = this.allreports.find(item => item.reportid === Number(event.target.value));
    //////console.log(this.selectedReport);
    ReportUtill.selectedReport = this.selectedReport;
  }
  addpage() {
    let div = [];
    let pagenum = ReportUtill.pagenumber++;
    div.push(this.createDiv(pagenum));
    let page: Page = { pageno: pagenum, divs: div };
    this.template.pages.push(page);
  }
  addDiv(page: Page) {
    //////console.log(page.pageno);
    page.divs.push(this.createDiv(page.pageno));
  }
  removeDragDrop(div: UIItems) {
    let page = this.template.pages.find(item => item.pageno == div.pageno);
    page.divs = page.divs.filter(item => item.divposition != div.divposition);
  }
  getStyleObj(ui) {
    // //////console.log(ui);
    if (ui.hasOwnProperty('styles')) {
      return {
        'font-weight': ui.styles.font_weight,
        'font-size': ui.styles.fontsize + 'px',
        'color': ui.styles.color,
        'background-color': ui.styles.backgroud_color
      };
    }
  }
  getImagePreview(id: string) {
    return 'preview-' + id;
  }
  getposition(ui) {
    var files = ui.file;
    // //////console.log(files);
    $('#' + this.getImagePreview(ui.id)).css({ "background-image": "url(" + files + ")" });
    return ui.position + '%'
  }
  getTableReportPreview() {
    // alert('Hai');
    //////console.log(this.template.pages);
    this.template.pages.forEach(page => {
      page.divs.forEach(div => {
        div.UIelements.forEach(sui => {

          if (sui.type === 'Table') {
            // this.engine.fetchReportData(sui.query).subscribe(res => {
            //   //////console.log(sui.hasOwnProperty('response'));
            //   if (sui.hasOwnProperty('response')) {
            //     sui.response = res;
            //   } else {
            //     sui["response"] = res;
            //   }
            // });
          }
        })
      })
    });
  }
  movetoPage(number) {
    //////console.log(number);
    $('body').scrollspy({
      target: "#Page-" + number, offset: 50
    });
  }
  getTableIds() {
    return ReportUtill.tableIds;
  }
}
