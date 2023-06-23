import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StockOverviewComponent } from "./stock-overview/stock-overview.component";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [StockOverviewComponent],
  exports: [StockOverviewComponent],
  imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule],
})
export class InventoryModule {}
