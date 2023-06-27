import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StockOverviewComponent } from "./stock-overview/stock-overview.component";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CategoryComponent } from "./category/category.component";
// import { CategoryModalComponent } from './category-modal/category-modal.component';

@NgModule({
  declarations: [StockOverviewComponent, CategoryComponent],
  exports: [StockOverviewComponent, CategoryComponent],
  imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule],
})
export class InventoryModule {}
