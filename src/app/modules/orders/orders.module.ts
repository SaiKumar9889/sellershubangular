import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CancelledOrdersComponent } from './cancelled-orders/cancelled-orders.component';
import { ManageReturnsComponent } from './manage-returns/manage-returns.component';
import { McfOrdersComponent } from './mcf-orders/mcf-orders.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ReturnOrdersComponent } from './return-orders/return-orders.component';
import { ShippedOrdersComponent } from './shipped-orders/shipped-orders.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderTabsComponent } from './order-tabs/order-tabs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomcomponentsModule } from 'src/app/customcomponents/customcomponents.module';
import { CreateOrderComponent } from './create-order/create-order.component';
// import { ContextMenuModule } from 'ngx-contextmenu';
import { OrderViewComponent } from './order-view/order-view.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ViewOrderComponent } from './view-order/view-order.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DirectivesModule } from 'src/app/_directives/directives/directives.module';
import { DynamicTempModule } from '../template-designers/dynamic-temp/dynamic-temp.module';
import { SalesOrdersComponent } from './sales-orders/sales-orders.component';
import { PrintSalesordersComponent } from './print-components/print-salesorders/print-salesorders.component';
import { SharedModule } from '../shared/shared.module';
import { DuplicateOrderComponent } from './duplicate-order/duplicate-order.component';
import { PrintPackingSlipComponent } from './print-components/print-packing-slip/print-packing-slip.component';
import { ReadyToShipmentComponent } from './ready-to-shipment/ready-to-shipment.component';
import { ErrorLabelsComponent } from './error-labels/error-labels.component';
import { ClickAndCollectComponent } from './click-and-collect/click-and-collect.component';
import { DispatchConsoleComponent } from './dispatch-console/dispatch-console.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'printinvoice',
    pathMatch: 'full'
  },

];

@NgModule({
  declarations: [OrderSummaryComponent, SalesOrdersComponent, McfOrdersComponent, ShippedOrdersComponent, ReturnOrdersComponent, CancelledOrdersComponent, ManageReturnsComponent, OrderTabsComponent, CreateOrderComponent, OrderViewComponent, ViewOrderComponent, PrintSalesordersComponent, DuplicateOrderComponent, PrintPackingSlipComponent, ReadyToShipmentComponent, ErrorLabelsComponent, ClickAndCollectComponent, DispatchConsoleComponent],
  exports: [OrderSummaryComponent, DuplicateOrderComponent, SalesOrdersComponent, McfOrdersComponent, ShippedOrdersComponent, ReturnOrdersComponent, CancelledOrdersComponent, ManageReturnsComponent, OrderTabsComponent, CreateOrderComponent, OrderViewComponent, ViewOrderComponent, PrintSalesordersComponent, PrintPackingSlipComponent, ReadyToShipmentComponent,ErrorLabelsComponent,ClickAndCollectComponent,DispatchConsoleComponent],
  imports: [
    CommonModule,
    FormsModule,
    CustomcomponentsModule,
    ReactiveFormsModule,
    NgbModule,
    DirectivesModule,
    DynamicTempModule,
    SharedModule,
    // ContextMenuModule.forRoot({
    //   useBootstrap4: true,
    // }),
    // RouterModule.forChild(routes),
    PipesModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [DatePipe]
})
export class OrdersModule { }
