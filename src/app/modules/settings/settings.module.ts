import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralsettingsComponent } from './generalsettings/generalsettings.component';
import { ProductAttributesComponent } from './product-attributes/product-attributes.component';
import { BulkActionsComponent } from './bulk-actions/bulk-actions.component';
import { BarcodeManagementComponent } from './barcode-management/barcode-management.component';
import { InventorySyncronizeComponent } from './inventory-syncronize/inventory-syncronize.component';
import { ShippingrilesComponent } from './shippingriles/shippingriles.component';
import { EmailSettingsComponent } from './email-settings/email-settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SettingsTabsComponent } from './settings-tabs/settings-tabs.component';
import { CustomcomponentsModule } from 'src/app/customcomponents/customcomponents.module';
import { GeneralsettingTaxComponent } from './generalsetting-tax/generalsetting-tax.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductAttributeTabComponent } from './product-attributes/product-attribute-tab/product-attribute-tab.component';
import { AttributeSetComponent } from './product-attributes/attribute-set/attribute-set.component';
import { BulkActionTabsComponent } from './bulk-actions/bulk-action-tabs/bulk-action-tabs.component';
import { BulkExportComponent } from './bulk-actions/bulk-export/bulk-export.component';
import { BarcodeTabsComponent } from './barcode-management/barcode-tabs/barcode-tabs.component';
import { BarcodeUsedComponent } from './barcode-management/barcode-used/barcode-used.component';
import { BarcodeConvertToSkuComponent } from './barcode-management/barcode-convert-to-sku/barcode-convert-to-sku.component';
import { InventrySyncTabsComponent } from './inventory-syncronize/inventry-sync-tabs/inventry-sync-tabs.component';
import { InventrySyncExcludeComponent } from './inventory-syncronize/inventry-sync-exclude/inventry-sync-exclude.component';
import { OrdersSettingComponent } from './orders-setting/orders-setting.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CurrencySettingsComponent } from './currency-settings/currency-settings.component';
import { DirectivesModule } from 'src/app/_directives/directives/directives.module';
import { AutomationsComponent } from './automations/automations.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VirtualPrinterComponent } from './virtual-printer/virtual-printer.component';



@NgModule({
  declarations: [GeneralsettingsComponent, ProductAttributesComponent, BulkActionsComponent, BarcodeManagementComponent, InventorySyncronizeComponent, ShippingrilesComponent, EmailSettingsComponent, NotificationsComponent, SettingsTabsComponent, GeneralsettingTaxComponent, ProductAttributeTabComponent, AttributeSetComponent, BulkActionTabsComponent, BulkExportComponent, BarcodeTabsComponent, BarcodeUsedComponent, BarcodeConvertToSkuComponent, InventrySyncTabsComponent, InventrySyncExcludeComponent, OrdersSettingComponent, CurrencySettingsComponent, AutomationsComponent, VirtualPrinterComponent],
  exports:[GeneralsettingsComponent, ProductAttributesComponent, BulkActionsComponent, BarcodeManagementComponent, InventorySyncronizeComponent, ShippingrilesComponent, EmailSettingsComponent, NotificationsComponent, SettingsTabsComponent, GeneralsettingTaxComponent, ProductAttributeTabComponent, AttributeSetComponent, BulkActionTabsComponent, BulkExportComponent, BarcodeTabsComponent, BarcodeUsedComponent, BarcodeConvertToSkuComponent, InventrySyncTabsComponent, InventrySyncExcludeComponent, OrdersSettingComponent, CurrencySettingsComponent, AutomationsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    CustomcomponentsModule,
    DirectivesModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class SettingsModule { }
