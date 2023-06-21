import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationsComponent } from './integrations/integrations.component';
import { ShippingManifestsComponent } from './shipping-manifests/shipping-manifests.component';
import { FiledManifestsComponent } from './filed-manifests/filed-manifests.component';
import { IntegrationsModule } from '../integrations/integrations.module';
import { CustomcomponentsModule } from 'src/app/customcomponents/customcomponents.module';
@NgModule({
    declarations: [IntegrationsComponent,ShippingManifestsComponent,FiledManifestsComponent],
    exports: [IntegrationsComponent,ShippingManifestsComponent,FiledManifestsComponent],
    imports: [
        CommonModule,
        CustomcomponentsModule,
        IntegrationsModule
    ]
  })
  export class ShippingModule { }