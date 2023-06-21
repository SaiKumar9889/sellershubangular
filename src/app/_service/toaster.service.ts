import { Injectable } from '@angular/core';
import { ToastTypes } from '../_models/_toaster';
import { ToastrService } from 'ngx-toastr';
// declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) { }

  openToastMessage(type:ToastTypes,heading:string,text:string){  
  //  this.toastr.clear();
    switch(type){
      case ToastTypes.info:
       this.toastr.info(heading, text);
      break;
      case ToastTypes.success:
       this.toastr.success(heading, text);
      break;
      case ToastTypes.warning:
       this.toastr.warning(heading, text);
      break;
      case ToastTypes.error:
       this.toastr.error(heading, text);
      break;
   }

    // this.myToast = $.toast({
    //   heading: heading,
    //   text: text,
    //   autoDismiss:true,
    //   allowToastClose : true,
    //   position: 'top-right',
    //   loaderBg:'#ff6849',
    //   icon: icon,
    //   hideAfter: 2000, 
    //   timeOut: 1000,
    //   stack: 5
    // });

    // toastr
  }
}
