import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppTabsComponent } from "./app-tabs.component";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../material.module";
import { InventoryModule } from "../modules/inventory/inventory.module";
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
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    InventoryModule,
  ],
})
export class AppTabsModule {}
