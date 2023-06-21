import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRouteModule } from './_admin.route.module';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PocComponent } from './poc/poc.component';
// import * as PlotlyJS from 'plotly.js/dist/plotly.js';
// import { PlotlyModule } from 'angular-plotly.js';
// PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    PocComponent  ],
  imports: [
    CommonModule,
    AdminRouteModule,
    // PlotlyModule, 
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class AdminModule { }
