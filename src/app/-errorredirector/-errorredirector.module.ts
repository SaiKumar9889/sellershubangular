import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound/notfound.component';
import { ErrorRouteModule } from './error.routing.module';



@NgModule({
  declarations: [NotfoundComponent],
  imports: [
    CommonModule,
    ErrorRouteModule
  ]
})
export class ErrorredirectorModule { }
