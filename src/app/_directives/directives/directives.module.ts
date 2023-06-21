import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimaNumberDirectiveDirective } from '../decima-number-directive.directive';
import { NumberDirective } from '../number.directive';



@NgModule({
  declarations: [NumberDirective,DecimaNumberDirectiveDirective],
  imports: [
    CommonModule
  ],
  exports:[NumberDirective,DecimaNumberDirectiveDirective]
})
export class DirectivesModule { }
