import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template/template.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GridsterModule } from 'angular-gridster2';
import { DynamicUiuilderComponent } from './dynamic-uiuilder/dynamic-uiuilder.component';
import { TemplateViewComponent } from './template-view/template-view.component';
import { TemplateViewBuilderComponent } from './template-view-builder/template-view-builder.component';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { TextEditorModalComponent } from './components/text-editor-modal/text-editor-modal.component';
import { CompanyLogoComponent } from './components/company-logo/company-logo.component';
import { CompanyLabelComponent } from './components/company-label/company-label.component';
import { CustomcomponentsModule } from 'src/app/customcomponents/customcomponents.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DirectivesModule } from 'src/app/_directives/directives/directives.module';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { PrintOrdersComponent } from './print-orders/print-orders.component';
import { PrintViewBuilderComponent } from './print-view-builder/print-view-builder.component';
import { LabelTemplateComponent } from './label-template/label-template.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { PicklistTemplateComponent } from './picklist-template/picklist-template.component';
import { PacklistTemplateComponent } from './packlist-template/packlist-template.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {A11yModule} from '@angular/cdk/a11y';
import { PackageSlipViewComponent } from './package-slip-view/package-slip-view.component';
import { PackageSlipTemplateComponent } from './package-slip-template/package-slip-template.component';
import { PackageSlipEditTemplateComponent } from './package-slip-edit-template/package-slip-edit-template.component';
import { PrintPackingslipComponent } from './print-packingslip/print-packingslip.component';
// const routes: Routes = [
//   {
//     path: 'template',
//     component: TemplateComponent
//   },
//   {
//     path: 'template-view',
//     component: TemplateViewComponent
//   },
// ];

@NgModule({
  declarations: [
    TemplateComponent,
    DynamicUiuilderComponent,
    TemplateViewComponent,
    TemplateViewBuilderComponent,
    TextEditorComponent,
    TextFieldComponent,
    TextEditorModalComponent,
    CompanyLogoComponent,
    CompanyLabelComponent,
    EditTemplateComponent,
    PrintOrdersComponent,
    PrintViewBuilderComponent,
    LabelTemplateComponent,
    PicklistTemplateComponent,
    PacklistTemplateComponent,
    PackageSlipViewComponent,
    PackageSlipTemplateComponent,
    PackageSlipEditTemplateComponent,
    PrintPackingslipComponent
  ],
  exports: [
    TemplateComponent,
    DynamicUiuilderComponent,
    TemplateViewComponent,
    TemplateViewBuilderComponent,
    TextEditorComponent,
    TextFieldComponent,
    TextEditorModalComponent,
    CompanyLogoComponent,
    CompanyLabelComponent,
    EditTemplateComponent,
    PrintOrdersComponent,
    LabelTemplateComponent,
    PicklistTemplateComponent,
    PacklistTemplateComponent,
    PackageSlipViewComponent,
    PackageSlipTemplateComponent,
    PackageSlipEditTemplateComponent,
    PrintPackingslipComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomcomponentsModule,
    ReactiveFormsModule,
    NgbModule,
    DirectivesModule,
    PipesModule,
    DragDropModule,
    NgMultiSelectDropDownModule.forRoot(),
    GridsterModule,
    HttpClientModule,
    AngularEditorModule,
    CKEditorModule,
    A11yModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    ScrollingModule
  ]
})
export class DynamicTempModule { }
