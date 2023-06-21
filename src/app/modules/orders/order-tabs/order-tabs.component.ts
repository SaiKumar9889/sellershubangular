import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tabs } from 'src/app/_models/Tabs';
import { DatasharingService } from 'src/app/_service/datasharing.service';

@Component({
  selector: 'app-order-tabs',
  templateUrl: './order-tabs.component.html',
  styleUrls: ['./order-tabs.component.css']
})
export class OrderTabsComponent implements OnInit {
  selectedTabs: Tabs[] = [];
  subscription: Subscription;
  constructor(private datasharingService: DatasharingService) {
    // this.subscription = this.datasharingService.allOrderTabs.subscribe((data) => {
    //   ////console.log('In Order Tabs',data);
    //   this.selectedTabs = data;
    // });
  }

  ngOnInit(): void {
  }
  closeTab(tab: Tabs) {
    this.selectedTabs = this.selectedTabs.filter(t => t.id != tab.id);
    //this.datasharingService.selectedOrderTabs=this.selectedTabs;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
