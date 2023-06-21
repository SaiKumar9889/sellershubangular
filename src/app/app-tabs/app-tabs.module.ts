import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomcomponentsModule } from '../customcomponents/customcomponents.module';
import { BetaTestModule } from '../modules/beta-test/beta-test.module';
import { CustomersModule } from '../modules/customers/customers.module';
import { DashboardModule } from '../modules/dashboard/dashboard.module';
import { IntegrationsModule } from '../modules/integrations/integrations.module';
import { InventoryModule } from '../modules/inventory/inventory.module';
import { ListingModule } from '../modules/listing/listing.module';
import { OrdersModule } from '../modules/orders/orders.module';
import { ReportsModule } from '../modules/reports/reports.module';
import { SettingsModule } from '../modules/settings/settings.module';
import { SuppliersModule } from '../modules/suppliers/suppliers.module';
import { TemplateDesignersModule } from '../modules/template-designers/template-designers.module';
import { UserManageModule } from '../modules/user-manage/user-manage.module';
import { WarehouseModule } from '../modules/warehouse/warehouse.module';
import { AppTabsComponent } from './app-tabs.component';
import { PrintComponent } from './print/print.component';
import { PrintLabelsComponent } from './print-labels/print-labels.component';
import { PrintPicklistComponent } from './print-picklist/print-picklist.component';
import { PrintPacklistComponent } from './print-packlist/print-packlist.component';
import { PrintPoComponent } from './print-po/print-po.component';
import { PrintPackslipComponent } from './print-packslip/print-packslip.component';
import { AnnouncmentsModule } from '../announcments/announcments.module';
import { NgxBarcodeModule } from 'ngx-barcode';
import { ShippingModule } from '../modules/shipping/shipping.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  },
  {
    path: 'app',
    component: AppTabsComponent
  },
  {
    path: 'printinvoice',
    component: PrintComponent
  },
  {
    path: 'printpackslip',
    component: PrintPackslipComponent
  },
  {
    path: 'printlabels',
    component: PrintLabelsComponent
  },
  {
    path: 'printpacklist',
    component: PrintPacklistComponent
  },
  {
    path: 'printpicklist',
    component: PrintPicklistComponent
  },
  {
    path: 'printpo',
    component: PrintPoComponent
  },
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    CustomcomponentsModule,
    NgbModule,
    DashboardModule,
    ReportsModule,
    OrdersModule,
    InventoryModule,
    WarehouseModule,
    SuppliersModule,
    CustomersModule,
    IntegrationsModule,
    BetaTestModule,
    ListingModule,
    SettingsModule,
    TemplateDesignersModule,
    UserManageModule,
    AnnouncmentsModule,
    NgxBarcodeModule,
    ShippingModule
  ],
  exports: [
    AppTabsComponent
  ],
  declarations: [AppTabsComponent, PrintComponent, PrintLabelsComponent, PrintPicklistComponent, PrintPacklistComponent, PrintPoComponent, PrintPackslipComponent]
})

export class AppTabsModule { }
