export interface ToasterModel{
  heading:string;
  text:string;
  position:string;
  loaderBg:string;
  icon:string;
  hideAfter:number;
  stack:number;
}

export enum ToastTypes{
    info='info',
    warning='warning',
    error='error',
    success='success',
}