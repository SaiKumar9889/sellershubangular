import { OnDestroy } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";
import { DatasharingService } from "../_service/datasharing.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit, OnDestroy {
  isLeftsidemenuhide: boolean = false;
  subscription: Subscription;
  themesubscription: Subscription;
  activeTheme: string = "skin-megna";
  constructor(private datasharingService: DatasharingService) {
    this.subscription = this.datasharingService.isLeftmenuhide.subscribe(
      (data) => {
        this.isLeftsidemenuhide = data;
      }
    );
    this.themesubscription = this.datasharingService.activeTheme.subscribe(
      (data) => {
        this.activeTheme = data;
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.themesubscription.unsubscribe();
  }

  ngOnInit(): void {}
  // '{{activeTheme}} fixed-layout mini-sidebar'
  getTheme() {
    if (this.isLeftsidemenuhide)
      return this.activeTheme + " fixed-layout mini-sidebar";
    else return this.activeTheme + " fixed-layout";
  }
}
