import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateDesignersComponent } from './template-designers/template-designers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { ContextMenuModule } from 'ngx-contextmenu';
import { CustomcomponentsModule } from 'src/app/customcomponents/customcomponents.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { InvoiceCreationComponent } from './invoice-creation/invoice-creation.component';
import { DynamicTempModule } from './dynamic-temp/dynamic-temp.module';
import { PackagingSlipComponent } from './packaging-slip/packaging-slip.component';
import { IntegrationsModule } from '../integrations/integrations.module';
// import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [TemplateDesignersComponent, InvoiceCreationComponent, PackagingSlipComponent],
  exports: [TemplateDesignersComponent,InvoiceCreationComponent],
  imports: [
    CommonModule,
    FormsModule,
    CustomcomponentsModule,
    ReactiveFormsModule,
    NgbModule,   
    DynamicTempModule,
    PipesModule,
    NgMultiSelectDropDownModule.forRoot(),IntegrationsModule
  ]
})
export class TemplateDesignersModule { }
