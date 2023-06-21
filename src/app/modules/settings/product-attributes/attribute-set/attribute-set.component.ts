import { Component, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { ProductAttributeService } from 'src/app/modules/settings/services/product-attribute.service';
declare var $: any;

@Component({
  selector: 'app-attribute-set',
  templateUrl: './attribute-set.component.html',
  styleUrls: ['./attribute-set.component.css']
})
export class AttributeSetComponent implements OnInit {
  loading:boolean=false;
  selectedId: any;
  constructor( private toasterService: ToasterService, private attributeService: ProductAttributeService ) { }
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
  value: [];
  result: any;
  resultValue: any;
  ngOnInit(): void {
    this.getAttribute();
  }
  getAttribute() {
    this.loading=true;
    // $('#printabletable').DataTable().destroy();
    this.attributeService.getSettingattribute().subscribe((res: any) => {
      ////console.log(res);
      this.allAttribute = res?.attributeSets || [];;
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

  modalclosed() {
    $('#attributeset-modal').modal('hide');
  }

  getEditAttributeset(id){
    this.loading=true;
    $('#attributeset-modal').modal('show');
    this.attributeService.getEditattributeset(id).subscribe((res: any) => {
      ////console.log(res);
      this.result = res?.attributeSet || [];
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

      this.resultValue = res?.attributes || [];
      ////console.log(this.resultValue);
      this.loading = false;
    })
  }
  selectOrUnselectAttributes(event, id) {
    const attr = this.resultValue.find(i => i.id == id);
    if(attr){
      attr['selected']= event.target.checked;
    }
  }

  saveAttribute(){
    //console.log(this.value);
    const data = {
      "id": this.selectedId,
      "name": this.chandisplayName,
      "values": this.resultValue.filter(i => i.selected).map(i => i.attributeValuesJson)

    }
    this.attributeService.postAttributeSet(data).subscribe((res: any) => {
      this.allAttribute = res?.attributeSets || [];;
      this.toasterService.openToastMessage(ToastTypes.success, 'Attribute Set', "Succefully saved");
    }, error => {
      this.toasterService.openToastMessage(ToastTypes.error, 'Attribute Set', "Not saved");

    });
  }

  removeAttribute(id){
    ////console.log(this.value);
    this.attributeService.postRemoveattributeset(id).subscribe((res: any) => {
      ////console.log(res);
      this.allAttribute = res?.attributeSets || [];;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', res.error.text);
    });
  }


}
