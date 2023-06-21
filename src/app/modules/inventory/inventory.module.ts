import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ChannelProductsComponent } from './channel-products/channel-products.component';
import { StockOverviewComponent } from './stock-overview/stock-overview.component';
import { PurchaseOrdersComponent } from './purchase-orders/purchase-orders.component';
import { RouterModule, Routes } from '@angular/router';
import { InventoryTabsComponent } from './inventory-tabs/inventory-tabs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomcomponentsModule } from 'src/app/customcomponents/customcomponents.module';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CreateProductComponent } from './create-product/create-product.component';
import { DirectivesModule } from 'src/app/_directives/directives/directives.module';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CreatePoComponent } from './create-po/create-po.component';
import { BundleProductComponent } from './bundle-product/bundle-product.component';
import { SharedModule } from '../shared/shared.module';
import { ListingModule } from '../listing/listing.module';
import { EditPoComponent } from './edit-po/edit-po.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CategoryComponent } from './category/category.component';
import { ProductTrackingComponent } from './product-tracking/product-tracking.component';
import { CompositionProductsComponent } from './composition-products/composition-products.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'inventorytabs',
    pathMatch: 'full'
  },
  {
    path: 'inventorytabs',
    component: InventoryTabsComponent
  },
];

@NgModule({
  declarations: [InventoryTabsComponent,ProductsComponent, ChannelProductsComponent, StockOverviewComponent, PurchaseOrdersComponent, CreateProductComponent, EditProductComponent, CreatePoComponent, BundleProductComponent, EditPoComponent, CategoryComponent, ProductTrackingComponent, CompositionProductsComponent],
  exports: [InventoryTabsComponent,ProductsComponent, ChannelProductsComponent, StockOverviewComponent, PurchaseOrdersComponent,CreateProductComponent,EditProductComponent,CreatePoComponent,BundleProductComponent,EditPoComponent,CategoryComponent],
  imports: [
    CommonModule,
    NgbModule,
    CustomcomponentsModule,
    FormsModule,
    DirectivesModule,
    SharedModule,
    ListingModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularEditorModule
  ]
})
export class InventoryModule { }
