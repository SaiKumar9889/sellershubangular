import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelIntegrationComponent } from './channel-integration/channel-integration.component';
import { ShippingCourierSetupComponent } from './shipping-courier-setup/shipping-courier-setup.component';
import { CustomcomponentsModule } from 'src/app/customcomponents/customcomponents.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateIntegrateComponent } from './create-integrate/create-integrate.component';
import { AmazonInteComponent } from './amazon-inte/amazon-inte.component';
import { EbayInteComponent } from './ebay-inte/ebay-inte.component';
import { EtsyInteComponent } from './etsy-inte/etsy-inte.component';
import { OnbuyInteComponent } from './onbuy-inte/onbuy-inte.component';
import { ShopifyIntiComponent } from './shopify-inti/shopify-inti.component';
import { CreateEcomIntegrateComponent } from './create-ecom-integrate/create-ecom-integrate.component';
import { WoocommerceInteComponent } from './woocommerce-inte/woocommerce-inte.component';
import { PretashopInteComponent } from './pretashop-inte/pretashop-inte.component';
import { DpdInteComponent } from './shippingcourier-components/dpd-inte/dpd-inte.component';
import { RoyalmailInteComponent } from './shippingcourier-components/royalmail-inte/royalmail-inte.component';
import { ClickDropComponent } from './shippingcourier-components/click-drop/click-drop.component';
import { DXInteComponent } from './shippingcourier-components/dx-inte/dx-inte.component';
import { YodelInteComponent } from './shippingcourier-components/yodel-inte/yodel-inte.component';
import { WindowComponent } from './window/window.component';

import { PortalModule } from '@angular/cdk/portal';
import { EbayListingTemplateComponent } from './listing-templates/ebay-listing-template/ebay-listing-template.component';
import { AmazonListingTemplateComponent } from './listing-templates/amazon-listing-template/amazon-listing-template.component';
import { EtsyListingTemplateComponent } from './listing-templates/etsy-listing-template/etsy-listing-template.component';
import { ShopifyListingTemplateComponent } from './listing-templates/shopify-listing-template/shopify-listing-template.component';
import { Magento2ListingTemplateComponent } from './listing-templates/magento2-listing-template/magento2-listing-template.component';
import { AmazonV2InteComponent } from './amazon-v2-inte/amazon-v2-inte.component';

import { HermesInteComponent } from './shippingcourier-components/hermes-inte/hermes-inte.component';
import { AmazonStockRepricerComponent } from './amazon-stock-repricer/amazon-stock-repricer.component';
import { OpencartComponent } from './opencart/opencart.component';
import { AmazonShippingComponent } from './shippingcourier-components/amazon-shipping/amazon-shipping.component';
import { AmazonLogisticComponent } from './shippingcourier-components/amazon-logistic/amazon-logistic.component';
import { MagentoInteComponent } from './magento-inte/magento-inte.component';
import { XcartComponent } from './xcart/xcart.component';
import { BigcommerceComponent } from './ecommerce/bigcommerce/bigcommerce.component';
import { BlueparkComponent } from './ecommerce/bluepark/bluepark.component';
import { EkmpowershopComponent } from './ecommerce/ekmpowershop/ekmpowershop.component';
import { ShopWiredComponent } from './ecommerce/shop-wired/shop-wired.component';
import { VolusionComponent } from './ecommerce/volusion/volusion.component';
import { Magento2InteComponent } from './magento2-inte/magento2-inte.component';
import { SearsComponent } from './marketplaces/sears/sears.component';
import { RakutenComponent } from './marketplaces/rakuten/rakuten.component';
import { FlubitComponent } from './marketplaces/flubit/flubit.component';
import { PriceministerComponent } from './marketplaces/priceminister/priceminister.component';
import { LazadaComponent } from './marketplaces/lazada/lazada.component';
import { CdiscountComponent } from './marketplaces/cdiscount/cdiscount.component';
import { WalmartComponent } from './marketplaces/walmart/walmart.component';
import { JetComponent } from './marketplaces/jet/jet.component';
import { StorenvyComponent } from './marketplaces/storenvy/storenvy.component';
import { IofferComponent } from './marketplaces/ioffer/ioffer.component';
import { OpenskyComponent } from './marketplaces/opensky/opensky.component';
import { SharedModule } from '../shared/shared.module';
import { DynamicTempModule } from '../template-designers/dynamic-temp/dynamic-temp.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CategoriesComponent } from './categories/categories.component';
import { AmazonStockRepricerSettingsComponent } from './amazon-stock-repricer-settings/amazon-stock-repricer-settings.component';
import { FruugoComponent } from './marketplaces/fruugo/fruugo.component';
import { TescoComponent } from './marketplaces/tesco/tesco.component';
import { ShopcluesComponent } from './marketplaces/shopclues/shopclues.component';
import { BolcomComponent } from './marketplaces/bolcom/bolcom.component';
import { FlipkartComponent } from './marketplaces/flipkart/flipkart.component';
import { GoogleComponent } from './marketplaces/google/google.component';
import { SnapdealComponent } from './marketplaces/snapdeal/snapdeal.component';
import { LelongComponent } from './marketplaces/lelong/lelong.component';
import { NeweggComponent } from './marketplaces/newegg/newegg.component';
import { BonanzaComponent } from './marketplaces/bonanza/bonanza.component';
import { BackmarketComponent } from './marketplaces/backmarket/backmarket.component';
import { ElevenstreetComponent } from './marketplaces/elevenstreet/elevenstreet.component';
import { ShipstationComponent } from './shippingcourier-components/shipstation/shipstation.component';
import { DhlComponent } from './shippingcourier-components/dhl/dhl.component';
import { FedexComponent } from './shippingcourier-components/fedex/fedex.component';
import { ParcelforceComponent } from './shippingcourier-components/parcelforce/parcelforce.component';
import { WebshipperComponent } from './shippingcourier-components/webshipper/webshipper.component';
import { UspostalserviceComponent } from './shippingcourier-components/uspostalservice/uspostalservice.component';
import { ShippoComponent } from './shippingcourier-components/shippo/shippo.component';
import { KashflowComponent } from './accounting/kashflow/kashflow.component';
import { QuickbooksComponent } from './accounting/quickbooks/quickbooks.component';
import { SageComponent } from './accounting/sage/sage.component';
import { XeroComponent } from './accounting/xero/xero.component';
import { AccountingInteComponent } from './accounting-inte/accounting-inte.component';
import { WoocommerceListingTemplateComponent } from './listing-templates/woocommerce-listing-template/woocommerce-listing-template.component';
import { ShopwiredListingTemplateComponent } from './listing-templates/shopwired-listing-template/shopwired-listing-template.component';
import { ShopeeComponent } from './marketplaces/shopee/shopee.component';
import { SkuMappingComponent } from './sku-mapping/sku-mapping.component';
import { AccountingInfoComponent } from './accounting-info/accounting-info.component';
// import { EmailEditorModule } from 'angular-email-editor';
@NgModule({
  declarations: [ChannelIntegrationComponent, ShippingCourierSetupComponent, CreateIntegrateComponent, AmazonInteComponent, EbayInteComponent, EtsyInteComponent, OnbuyInteComponent, ShopifyIntiComponent, CreateEcomIntegrateComponent, WoocommerceInteComponent, PretashopInteComponent,
    Magento2InteComponent, DpdInteComponent, RoyalmailInteComponent, ClickDropComponent, DXInteComponent, YodelInteComponent,
    WindowComponent, EbayListingTemplateComponent, AmazonListingTemplateComponent, EtsyListingTemplateComponent, ShopifyListingTemplateComponent, Magento2ListingTemplateComponent, AmazonV2InteComponent, HermesInteComponent,
    AmazonStockRepricerComponent, WoocommerceInteComponent, BigcommerceComponent, OpencartComponent, AmazonShippingComponent, AmazonLogisticComponent,  MagentoInteComponent, VolusionComponent,
    EkmpowershopComponent, XcartComponent, BlueparkComponent, ShopWiredComponent, SearsComponent, RakutenComponent, FlubitComponent, PriceministerComponent, LazadaComponent, CdiscountComponent, WalmartComponent, JetComponent, StorenvyComponent, IofferComponent, OpenskyComponent, CategoriesComponent, AmazonStockRepricerSettingsComponent, FruugoComponent, TescoComponent, ShopcluesComponent, BolcomComponent, FlipkartComponent, GoogleComponent, SnapdealComponent, LelongComponent, NeweggComponent, BonanzaComponent, BackmarketComponent, ElevenstreetComponent, ShipstationComponent, DhlComponent, FedexComponent, ParcelforceComponent, WebshipperComponent, UspostalserviceComponent, ShippoComponent, KashflowComponent, QuickbooksComponent, SageComponent, XeroComponent, AccountingInteComponent, WoocommerceListingTemplateComponent, ShopwiredListingTemplateComponent, ShopeeComponent, SkuMappingComponent, AccountingInfoComponent],
  exports: [ChannelIntegrationComponent, ShippingCourierSetupComponent, CreateIntegrateComponent, AmazonInteComponent, EbayInteComponent, EtsyInteComponent, OnbuyInteComponent, ShopifyIntiComponent, CreateEcomIntegrateComponent, WoocommerceInteComponent, PretashopInteComponent,
    Magento2InteComponent, DpdInteComponent, RoyalmailInteComponent, ClickDropComponent, DXInteComponent, YodelInteComponent,
    WindowComponent, EbayListingTemplateComponent, AmazonListingTemplateComponent, EtsyListingTemplateComponent, ShopifyListingTemplateComponent, Magento2ListingTemplateComponent, AmazonV2InteComponent, HermesInteComponent,
    AmazonStockRepricerComponent, WoocommerceInteComponent, BigcommerceComponent, OpencartComponent, AmazonShippingComponent, AmazonLogisticComponent,  MagentoInteComponent, VolusionComponent,
    EkmpowershopComponent, XcartComponent, BlueparkComponent, ShopWiredComponent, SearsComponent, RakutenComponent, FlubitComponent, PriceministerComponent, LazadaComponent, CdiscountComponent, WalmartComponent, JetComponent, StorenvyComponent, IofferComponent, OpenskyComponent, CategoriesComponent, AmazonStockRepricerSettingsComponent,KashflowComponent,AccountingInteComponent,AccountingInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    CustomcomponentsModule,
    ReactiveFormsModule,
    NgbModule,
    PortalModule,
    SharedModule,
    DynamicTempModule,
    // EmailEditorModule ,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class IntegrationsModule { }
