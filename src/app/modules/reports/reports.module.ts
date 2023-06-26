import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchByProdComponent } from "./search-by-prod/search-by-prod.component";
import { Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CustomcomponentsModule } from "src/app/customcomponents/customcomponents.module";
import { StockValueRepoComponent } from "./stock-value-repo/stock-value-repo.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "reports",
    pathMatch: "full",
  },
  // {
  //   path: 'reports',
  //   component: ReportstabComponent
  // },
];

@NgModule({
  declarations: [SearchByProdComponent, StockValueRepoComponent],
  exports: [SearchByProdComponent, StockValueRepoComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    CustomcomponentsModule,
  ],
})
export class ReportsModule {}
