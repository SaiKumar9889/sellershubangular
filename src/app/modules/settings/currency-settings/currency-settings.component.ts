import { Component, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { GeneralSettingsService } from '../services/general-settings.service';

@Component({
  selector: 'app-currency-settings',
  templateUrl: './currency-settings.component.html',
  styleUrls: ['./currency-settings.component.css']
})
export class CurrencySettingsComponent implements OnInit {

  loading = false;
  isCur: any;
  showCurrency:any=[];

  constructor( private toasterService: ToasterService, private generalService: GeneralSettingsService ) { }


  ngOnInit(): void {
  }
  onCurrencychange(){
    // this.loading = true;
    this.isCur
    this.generalService.getsaveCurrency(this.isCur).subscribe((res: any) => {
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', res.error.text);
      // this.loading = false;
    })
    ////console.log(this.isCur);
  }
  getCurrency() {
    this.loading=true;

    this.generalService.getGeneralSetting().subscribe((res: any) => {
      ////console.log(res);
      this.showCurrency = res['currencyList'];
      // this.collectionsize = res?.page?.totalResults;
      // this.page = res?.page?.currentPageNumber;
      this.loading = false;
      // if(this.showCurrency.length>0)
      // this.productTitle= this.showCurrency[0].title;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
      // this.loadTablePagenation();
    }, eoor => {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };

}
