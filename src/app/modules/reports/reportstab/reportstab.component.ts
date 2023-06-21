import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tabs } from 'src/app/_models/Tabs';
import { DatasharingService } from 'src/app/_service/datasharing.service';

@Component({
  selector: 'app-reportstab',
  templateUrl: './reportstab.component.html',
  styleUrls: ['./reportstab.component.css']
})
export class ReportstabComponent implements OnInit {

  selectedTabs:Tabs[]=[];
  subscription: Subscription;
  constructor(private datasharingService: DatasharingService) {
    this.subscription = this.datasharingService.allReportsTabs.subscribe((data) => {
      ////console.log('In Report Tabs',data);
      this.selectedTabs = data;
    });
   }

  ngOnInit(): void {
  }
  closeTab(tab:Tabs){
    this.selectedTabs=this.selectedTabs.filter(t=>t.id!=tab.id);
    this.datasharingService.selectedReportsTabs=this.selectedTabs;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
