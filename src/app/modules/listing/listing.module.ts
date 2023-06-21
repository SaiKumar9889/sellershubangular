import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingToListComponent } from './waiting-to-list/waiting-to-list.component';
import { ListingErrorsComponent } from './listing-errors/listing-errors.component';
import { ListedProductsComponent } from './listed-products/listed-products.component';
import { ClosedProductsComponent } from './closed-products/closed-products.component';
import { ChannelScheduledListingComponent } from './channel-scheduled-listing/channel-scheduled-listing.component';
import { CreateProductsToFbaComponent } from './create-products-to-fba/create-products-to-fba.component';
import { ManageFbaComponent } from './manage-fba/manage-fba.component';
import { SendProductsFbaComponent } from './send-products-fba/send-products-fba.component';
import { ProductsInFbaComponent } from './products-in-fba/products-in-fba.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CustomcomponentsModule } from 'src/app/customcomponents/customcomponents.module';
import { EbayChannelComponent } from './listed-products/edit-channel/ebay-channel/ebay-channel.component';
import { SharedModule } from '../shared/shared.module';
import { OnbuyComponent } from './listed-products/edit-channel/onbuy/onbuy.component';
import { AmazonChannelComponent } from './listed-products/edit-channel/amazon-channel/amazon-channel.component';
import { EtsyChannelComponent } from './listed-products/edit-channel/etsy-channel/etsy-channel.component';
import { ShopifyChannelComponent } from './listed-products/edit-channel/shopify-channel/shopify-channel.component';

@NgModule({
  declarations: [WaitingToListComponent, ListingErrorsComponent, ListedProductsComponent, ClosedProductsComponent, ChannelScheduledListingComponent, CreateProductsToFbaComponent, ManageFbaComponent, SendProductsFbaComponent, ProductsInFbaComponent, EbayChannelComponent, OnbuyComponent, AmazonChannelComponent, EtsyChannelComponent, ShopifyChannelComponent],
  exports: [WaitingToListComponent, ListingErrorsComponent, ListedProductsComponent, ClosedProductsComponent, ChannelScheduledListingComponent, CreateProductsToFbaComponent, ManageFbaComponent, SendProductsFbaComponent, ProductsInFbaComponent, EbayChannelComponent, OnbuyComponent, AmazonChannelComponent, EtsyChannelComponent, ShopifyChannelComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    CustomcomponentsModule,
    SharedModule
  ]
})
export class ListingModule { }
