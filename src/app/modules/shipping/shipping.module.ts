import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationsComponent } from './integrations/integrations.component';
import { ShippingManifestsComponent } from './shipping-manifests/shipping-manifests.component';
import { FiledManifestsComponent } from './filed-manifests/filed-manifests.component';
import { IntegrationsModule } from '../integrations/integrations.module';
import { CustomcomponentsModule } from 'src/app/customcomponents/customcomponents.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DirectivesModule } from 'src/app/_directives/directives/directives.module';
import { DynamicTempModule } from '../template-designers/dynamic-temp/dynamic-temp.module';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
@NgModule({
    declarations: [IntegrationsComponent,ShippingManifestsComponent,FiledManifestsComponent],
    exports: [IntegrationsComponent,ShippingManifestsComponent,FiledManifestsComponent],
    imports: [
        CommonModule,
        FormsModule,
        CustomcomponentsModule,
        IntegrationsModule,
        ReactiveFormsModule,
        NgbModule,
        DirectivesModule,
        DynamicTempModule,
        SharedModule,
        PipesModule,
    ]
  })
  export class ShippingModule { }