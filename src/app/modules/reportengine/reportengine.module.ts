import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportengineComponent } from './reportengine.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ReportRouteModule } from './reportengine.route.module';
import { DynamicformComponent } from './dynamicform/dynamicform.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { TextareaComponent } from './textarea/textarea.component';
import { FormsModule } from '@angular/forms';
import { ImageComponent } from './image/image.component';
import { TableComponent } from './table/table.component';
import { ReportviewComponent } from './reportview/reportview.component';


@NgModule({
  declarations: [ReportengineComponent,DynamicformComponent,
    TextareaComponent,TextFieldComponent,ImageComponent,TableComponent,ReportviewComponent],
  imports: [
    CommonModule,
    DragDropModule,
    ReportRouteModule,
    FormsModule      
  ]
})
export class ReportengineModule { }
