import { Column, Report } from "../_services/report-engine.service";
import { Table, TextAreaModal, TextModal ,Image} from "./_TextModal";

export class ReportUtill {
  static generateQuery(columns: any,norec:number) {
    let query='select TOP('+norec+') ';
    columns.forEach((cl,index)=>{
     let col:Column= this.selectedReport.columns.find(column=>column.columnDisplayname===cl);
     if(index==(columns.length-1)){
      query=query+col.columnname;
     }else{
      query=query+col.columnname+',';
     }    
    });
    query=query+' from '+this.selectedReport.reportQuery;
    //////console.log(query);    
    return query
  }
  static pagenumber:number=2;
  static divnumber:number=1;
  static dgUniqueId:number=1;
  static minNumberOfDivByDefault:number=4;
  static tableIds=[];
  static selectedReport:Report;
  static getUIObject(uielement: string,divnumber:number,pagenumber:number) {
    let obj:any;
    switch (uielement) {
      case 'Text Field':
        let txtf:TextModal={name:'venk',id:'textfield-'+ ++this.dgUniqueId,placeholder:'Please Enter text',type:"Text Field",lable:'Text Field',div:divnumber,page:pagenumber};
        obj=txtf;
        break;
      case 'Text Area':
        let tarea:TextAreaModal={name:'venk',id:'textarea-'+ ++this.dgUniqueId,placeholder:'Please Enter text',rows:3,type:"Text Area",lable:'Text Area',div:divnumber,page:pagenumber};
        obj=tarea;
        break;
      case 'Image':
        let img:Image={name:'venk',id:'image-'+ ++this.dgUniqueId,type:"Image",div:divnumber,page:pagenumber};
        obj=img;        
        break;
      case 'Table':
        let sid= ++this.dgUniqueId;
        let id='tableList-table-'+sid ;
        let tid='table-'+ sid;
        this.tableIds.push(id);
        let tab:Table={name:'venk',id:tid,type:"Table",div:divnumber,page:pagenumber,columns:['Column 1'],noOfrows:3,noOfRecords:20};
        obj=tab;
        break;
    }
    return obj;
  }
}
