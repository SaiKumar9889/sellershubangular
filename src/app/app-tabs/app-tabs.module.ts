import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppTabsComponent } from "./app-tabs.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "app",
    pathMatch: "full",
  },
  {
    path: "app",
    component: AppTabsComponent,
  },
];

@NgModule({
  exports: [AppTabsComponent],
  declarations: [AppTabsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AppTabsModule {}