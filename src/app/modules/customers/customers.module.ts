import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomcomponentsModule } from 'src/app/customcomponents/customcomponents.module';
import { CustomerComponent } from './customer/customer.component';
import { DirectivesModule } from 'src/app/_directives/directives/directives.module';
import { SharedModule } from '../shared/shared.module';
import { DynamicTempModule } from '../template-designers/dynamic-temp/dynamic-temp.module';

@NgModule({
  declarations: [ CustomerComponent],
  exports: [CustomerComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    CustomcomponentsModule,
    ReactiveFormsModule,
    DirectivesModule,
    DynamicTempModule,
    SharedModule,
  ]
})
export class CustomersModule { }
