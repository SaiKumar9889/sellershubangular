import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Tabs } from "../_models/Tabs";
import { DatasharingService } from "../_service/datasharing.service";

@Component({
  selector: "app-app-tabs",
  templateUrl: "./app-tabs.component.html",
  styleUrls: ["./app-tabs.component.css"],
})
export class AppTabsComponent implements OnInit {
  loading: boolean = false;

  selectedTabs: Tabs[] = [];
  hidedTabs: Tabs[] = [];
  allSubscribedTabs: Tabs[] = [];
  subscription: Subscription;
  subscribedTabs: any;
  constructor(private datasharingService: DatasharingService) {
    console.log("In");
    this.subscription = this.datasharingService.salesHubTabs.subscribe(
      (data) => {
        console.log("In App Tabs", data);
        // this.selectedTabs = data;
        this.allSubscribedTabs = data;
        this.tabsArrangmentI(this.allSubscribedTabs);
      }
    );
  }

  tabsArrangmentI(data: any) {
    if (data.length > 5) {
      this.selectedTabs = data.slice(0, 5);
      this.hidedTabs = data.slice(5, this.allSubscribedTabs.length);
      console.log(this.selectedTabs);
    } else {
      this.selectedTabs = data;
      console.log(this.selectedTabs);
    }
  }

  ngOnInit(): void {}
  closeTab(tab: Tabs) {
    this.loading = true;
    // this.selectedTabs = this.selectedTabs.filter(t => t.id != tab.id);
    this.allSubscribedTabs = this.allSubscribedTabs.filter(
      (stab) => stab.id != tab.id
    );
    this.allSubscribedTabs.map((stab, index) => {
      if (index == 0) stab.active = true;
    });
    this.datasharingService.selectedMenuTabs = this.allSubscribedTabs;
    this.tabsArrangmentI(this.allSubscribedTabs);
    this.loading = false;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  rewriteTab(tab: Tabs) {
    this.loading = true;
    this.allSubscribedTabs.map((stab) => (stab.active = false));
    tab.active = true;
    this.allSubscribedTabs = this.allSubscribedTabs.filter(
      (stab) => stab.id != tab.id
    );
    this.allSubscribedTabs.splice(0, 0, tab);
    this.tabsArrangmentI(this.allSubscribedTabs);
    this.loading = false;
  }
  makeActive(tab: Tabs) {
    this.allSubscribedTabs.map((stab) => (stab.active = false));
    this.datasharingService.changeActiveMenu(tab.pMenu);
    this.subscribedTabs = this.allSubscribedTabs.find((stab) => {
      stab.id === tab.id;
    });
    this.subscribedTabs.active = true;
  }
}
