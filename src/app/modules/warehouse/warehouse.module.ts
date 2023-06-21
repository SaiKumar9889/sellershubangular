import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehousesComponent } from './warehouses/warehouses.component';
import { StocksummaryComponent } from './stocksummary/stocksummary.component';
import { TransfersComponent } from './transfers/transfers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomcomponentsModule } from 'src/app/customcomponents/customcomponents.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [WarehousesComponent, StocksummaryComponent, TransfersComponent],
  exports: [WarehousesComponent, StocksummaryComponent, TransfersComponent],
  imports: [
    CommonModule,
    FormsModule,
    CustomcomponentsModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    SharedModule
  ]
})
export class WarehouseModule { }
