import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'src/app/_service/toaster.service';
import { ReportTemplate } from '../reports/Template';
import { TemplateDb } from '../reports/_TemplatesDB';
import { Utill } from '../_utills';
declare var $: any;
@Component({
  selector: 'app-reportview',
  templateUrl: './reportview.component.html',
  styleUrls: ['./reportview.component.css']
})
export class ReportviewComponent implements OnInit {
  isSingleSelected: boolean = false;
  allreports: TemplateDb[] = [];
  selectedRep: ReportTemplate;
  constructor(private toast: ToasterService) { }

  ngOnInit(): void {
    this.getAllRreports();
  }
  generatePageID(page:any){
    return 'page-'+page.pageno;
  }
  backtolist(){
    this.isSingleSelected=false;
  }
  loadTablePagenation() {
    $(function () {
      // $('#printabletable').DataTable();
      $('#printabletable').DataTable({
        responsive: true,
        pagingType: "simple_numbers",
        pageLength: 50,
        lengthChange: false,
        columnDefs: [
          {
            "targets": 2, // your case first column
            "className": "text-center"
          },
          {
            "targets": 3, // your case first column
            "className": "text-center"
          },
          {
            "targets": 4, // your case first column
            "className": "text-center"
          },
          {
            "targets": 0, // your case first column
            "className": "text-center"
          },
          {
            "targets": 1, // your case first column
            "className": "text-center"
          }
        ]
      });
      // $('.buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel').addClass('btn btn-primary mr-1');
    });
  }

  openModal(selected: TemplateDb) {
    this.isSingleSelected = true;
    this.selectedRep = JSON.parse(selected.report);
    this.selectedRep.pages.forEach(page => {
      page.divs.forEach(div => {
        div.UIelements.forEach(sui => {
          //  //////console.log(sui.type);
          if (sui.type === 'Table') {
            // this.engine.fetchReportData(sui.query).subscribe(res => {
            //   // //////console.log(sui.hasOwnProperty('response'));
            //   if (sui.hasOwnProperty('response')) {
            //     sui.esponse = res;
            //   } else {
            //     sui["response"] = res;
            //   }
            // });
          }
        })
      })
    });
    //////console.log(this.selectedRep);
  }
  exportToPDF() {
    // this.loading = true;
    // const doc = new jsPDF({
    //   orientation: "portrait",
    //   unit: "mm",
    //   format: 'a4'
    // });
    // // Optional - set properties on the document
    // doc.setProperties({
    //   title: this.selectedRep.templatename,
    //   subject: 'This is the subject',
    //   author: 'Venkat',
    //   keywords: 'generated, javascript, web 2.0, ajax',
    //   creator: 'Venkat'
    // });    
    this.selectedRep.pages.forEach((item,index)=>{
      // var mdata = $('#Page-1');
      //////console.log('Page:::::::::::'+index);
      var mdata = document.getElementById('Page-'+index);
      //////console.log(mdata);
      // html2canvas(mdata).then(canvas => {
      //   var ctx: any = canvas.getContext('2d');
      //   //////console.log(canvas.height + "  " + canvas.width);
      //   ctx.webkitImageSmoothingEnabled = false;
      //   ctx.mozImageSmoothingEnabled = false;
      //   ctx.imageSmoothingEnabled = false;
      //   var imgData = canvas.toDataURL('image/jpeg', 1.0);
      //   var imgWidth = 190;
      //   var pageHeight = 255;
      //   var imgHeight = canvas.height * imgWidth / canvas.width;
      //   var heightLeft = imgHeight;
      //   var position = 0;
      //   doc.addImage(imgData, 'JPEG', 10, position + 10, imgWidth, imgHeight);
      //   doc.addPage();
      // });
    });    
  //  doc.save(this.selectedRep.templatename + '.pdf'); // Generated PDF        
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
  getposition(ui) {
    var files = ui.file;
    // //////console.log(files);
    $('#' + ui.id).css({ "background-image": "url(" + files + ")" });
    return ui.position + '%'
  }
  getAllRreports() {
    // this.engine.getTemplates().subscribe(res => {
    //   this.allreports = res;
    //   this.loadTablePagenation();
    // });
  }
  getReportBy(report: TemplateDb) {
    let tempalte: ReportTemplate = JSON.parse(report.report);
    return tempalte.createdby;
  }
  getReportDate(report: TemplateDb) {
    let tempalte: ReportTemplate = JSON.parse(report.report);
    return tempalte.createddate;
  }
  getDateTime(data: string) {
    if(data==null){
      return '--';
     }else{
    return Utill.getDateAndMonthName(data);
     }
  }
  previewFile(fileI: any) {
    alert(fileI);
    //////console.log(fileI);
    const preview: any = document.querySelector('img');
    const file: File = fileI.file;
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      preview.src = reader.result;
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  generateReport(query: string) {
    // this.engine.fetchReportData(query).subscribe(res => {
    //   //////console.log(res);
    //   return res;
    // })
  }
}
