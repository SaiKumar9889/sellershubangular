import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatasharingService } from 'src/app/_service/datasharing.service';

@Component({
  selector: 'app-settings-tabs',
  templateUrl: './settings-tabs.component.html',
  styleUrls: ['./settings-tabs.component.css']
})
export class SettingsTabsComponent implements OnInit, OnDestroy {


  generalSetting = true;
  productAttribute = false;
  bulkActions = false;
  barcode = false;  
  inventary = false;
  shippingRules = false;
  virtualPrinter = false;

  constructor(public datasharingService: DatasharingService) { }
  ngOnDestroy(): void {
    this.datasharingService.parentTab = '';
  }
  ngOnInit(): void {

  }

  changeLabels(general, product, bulk, bar, inventary, shipping,printer){
    this.generalSetting = general;
    this.productAttribute = product;
    this.bulkActions = bulk;
    this.barcode = bar;  
    this.inventary = inventary;
    this.shippingRules = shipping;
    this.virtualPrinter = printer;
  }



}
