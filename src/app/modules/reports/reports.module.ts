import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchByProdComponent } from './search-by-prod/search-by-prod.component';
import { LowstockComponent } from './lowstock/lowstock.component';
import { StockValueRepoComponent } from './stock-value-repo/stock-value-repo.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReportstabComponent } from './reportstab/reportstab.component';
import { FormsModule } from '@angular/forms';
import { CustomcomponentsModule } from 'src/app/customcomponents/customcomponents.module';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'reports',
    pathMatch: 'full'    
  },
  {
    path: 'reports',
    component: ReportstabComponent
  },
];

@NgModule({
  declarations: [ReportstabComponent,SearchByProdComponent, LowstockComponent, StockValueRepoComponent, OrderHistoryComponent],
  exports: [ReportstabComponent,SearchByProdComponent, LowstockComponent, StockValueRepoComponent, OrderHistoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    CustomcomponentsModule,
    NgbModule
  ]
})
export class ReportsModule { }
