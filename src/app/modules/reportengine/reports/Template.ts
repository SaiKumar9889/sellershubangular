export interface ReportTemplate{
  totalpages?:number;
  templatename?:string;
  createddate?:string;
  createdby?:string;
  pages?:Page[];
}
export interface UIItems {
  pageno: number;
  divposition: number;
  divid: string;
  UIelements: any[];
}
export interface Page {
  pageno: number;
  divs: UIItems[];
}