import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { ToastTypes } from 'src/app/_models/_toaster';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { ProductAttributeService } from '../services/product-attribute.service';
declare var $: any;

@Component({
  selector: 'app-product-attributes',
  templateUrl: './product-attributes.component.html',
  styleUrls: ['./product-attributes.component.css']
})
export class ProductAttributesComponent implements OnInit {
  loading:boolean=false;
  selectedId = -1;
  constructor(private appTrackingService:AppTrackingService, private toasterService: ToasterService, private attributeService: ProductAttributeService ) {
    let ip:usertrackInput={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.PRODUCTATTRIBUTESETTINGSPAGE,function:"",descrption:"Product attribute settings page loaded"};
    this.appTrackingService.trackUserActivity(ip);
   }
  allAttribute:any=[];
  chandisplayName;
  sellersdisplayname;
  defaultvalue;
  value1;
  value2;
  value3;
  value4;
  value5;
  value6;
  value7;
  val1;
  val2;
  val3;
  val4;
  val5;
  val6;
  val7;
  value: [];
  result: any;
  resultValue: any = [];
  ngOnInit(): void {
    this.getAttribute();
  }

  auditTrack(type:any){
    let ip:usertrackInput;
    if(type==1)
    ip={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.PRODUCTATTRIBUTESETTINGSPAGE,function:"",descrption:"New Attribute button is clicked"};
    if(type==2)
    ip={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.PRODUCTATTRIBUTESETTINGSPAGE,function:"",descrption:"Refresh button is clicked"};
    if(type==3)
    ip={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.PRODUCTATTRIBUTESETTINGSPAGE,function:"",descrption:"Edit button is clicked"};
    if(type==4)
    ip={menu:TrackMenus.SETTINGS,submenu:subMenus.OTHERS,page:pages.PRODUCTATTRIBUTESETTINGSPAGE,function:"",descrption:"Remove button is clicked"};
    this.appTrackingService.trackUserActivity(ip);
  }
  getAttribute() {
    this.loading=true;
    // $('#printabletable').DataTable().destroy();
    this.attributeService.getSettingattribute().subscribe((res: any) => {
      ////console.log(res);
      this.allAttribute = res?.attributes || [];;
      // this.collectionsize = res?.page?.totalResults;
      // this.page = res?.page?.currentPageNumber;
      this.loading = false;
      // if(this.allAttribute.length>0)
      // this.productTitle= this.allAttribute[0].title;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      // this.loadTablePagenation();
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };


  // openModalPopup(modalName: string) {
  //   switch (modalName) {
  //     case "Attribute":
  //       $('#attribute-modal').modal('show');
  //       this.getEditAttribute(-1);
  //       break;
  //     default:
  //       break;
  //   }
  // }

  modalclosed() {
    $('#notify_3-modal').modal('hide');
  }

  getEditAttribute(id){
    this.loading=true;
    this.selectedId = id;
    $('#attribute-modal').modal('show');
    this.attributeService.getEditattribute(id).subscribe((res: any) => {
      ////console.log(res);

      this.result = res?.attribute || [];
      this.chandisplayName = this.result['name'];
      this.sellersdisplayname = this.result['value1'];
      this.defaultvalue = this.result['value2'];
      this.value1 = this.result['value3'];
      this.value2 = this.result['value4'];
      this.value3 = this.result['value5'];
      this.value4 = this.result['value6'];
      this.value5 = this.result['value7'];
      this.value6 = this.result['value8'];
      this.value7 = this.result['value9'];
      this.resultValue = res?.attributeValues;
      console.log(this.resultValue);
      this.loading = false;
    })
  }

  saveAttribute(){
    this.val1 = {'value':this.value1};
    this.val2 = {'value':this.value2};
    this.val3 = {'value':this.value3};
    this.val4 = {'value':this.value4};
    this.val5 = {'value':this.value5};
    this.val6 = {'value':this.value6};
    this.val7 = {'value':this.value7};
    if(this.resultValue.length == 0){
      this.resultValue.push(this.val1,this.val2,this.val3,this.val4,this.val5,this.val6,this.val7)
      
    }
      console.log(this.resultValue);
      //console.log(this.value);
    const data = {
      "id": this.selectedId,
      "name": this.chandisplayName,
      "values": this.resultValue.map(i => i.value),
      "value1":this.sellersdisplayname,
      "value2":this.defaultvalue,
      "value3":this.value1,
      "value4":this.value2,
      "value5":this.value3,
      "value6":this.value4,
      "value7":this.value5,
      "value8":this.value6,
      "value9":this.value7
    }
    this.attributeService.postAttribute(data).subscribe((res: any) => {
      this.allAttribute = res?.attributeSets || [];;
      this.getAttribute()
      this.toasterService.openToastMessage(ToastTypes.success, 'Attribute', "Succefully saved");
    }, error => {
      this.getAttribute()
      this.toasterService.openToastMessage(ToastTypes.error, 'Attribute', "Not saved");

    });
  }

  removeAttribute(id){
    ////console.log(this.value);
    this.attributeService.postRemoveattributeset(id).subscribe((res: any) => {
      ////console.log(res);
      this.allAttribute = res?.attributeSets || [];
    });
  }

}
