import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomcomponentsModule } from 'src/app/customcomponents/customcomponents.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DirectivesModule } from 'src/app/_directives/directives/directives.module';

@NgModule({
  declarations: [SuppliersComponent],
  exports: [SuppliersComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    CustomcomponentsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    DirectivesModule
  ]
})
export class SuppliersModule { }
