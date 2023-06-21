
export interface TextModal{
  name?:string;
  lable?:string;
  placeholder?:string;
  id?:string;
  value?:string;
  type?:string;
  div?:number;
  page?:number;
  styles?:styles;
}

export interface TextAreaModal{
  name?:string;
  lable?:string;
  placeholder?:string;
  id?:string;
  value?:string;
  rows?:number;
  type?:string;
  div?:number;
  page?:number;
  styles?:styles;
}

export interface Table{
  name?:string;
  lable?:string;
  id?:string;
  type?:string;
  div?:number;
  page?:number;
  styles?:styles;
  columns?:string[];
  noOfrows?:number;
  query?:string;
  noOfRecords?:number;
  response?:any[];
}

export interface Image{
  name?:string;
  lable?:string;
  id?:string;
  type?:string;
  file?:any;
  div?:number;
  page?:number;
  position?:number;
  styles?:styles;
}

export class styles{
  fontsize:any=14;
  color:string='black';
  font_weight:string='400';
  backgroud_color:string='white';
  font_family:string;
  position:string;
}

