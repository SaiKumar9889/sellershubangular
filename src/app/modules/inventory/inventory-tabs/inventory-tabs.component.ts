import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tabs } from 'src/app/_models/Tabs';
import { DatasharingService } from 'src/app/_service/datasharing.service';

@Component({
  selector: 'app-inventory-tabs',
  templateUrl: './inventory-tabs.component.html',
  styleUrls: ['./inventory-tabs.component.css']
})
export class InventoryTabsComponent implements OnInit {

  selectedTabs:Tabs[]=[];
  subscription: Subscription;
  constructor(private datasharingService: DatasharingService) {
    // this.subscription = this.datasharingService.allInventoryTabs.subscribe((data) => {
    //   ////console.log('In Inventory Tabs',data);
    //   this.selectedTabs = data;
    // });
   }

  ngOnInit(): void {
  }
  closeTab(tab:Tabs){
    this.selectedTabs=this.selectedTabs.filter(t=>t.id!=tab.id);
   // this.datasharingService.selectedInventoryTabs=this.selectedTabs;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
