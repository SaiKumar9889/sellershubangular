import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApploaderComponent } from './apploader/apploader.component';
// import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgbdDatepickerBasicComponent } from './datepicker/datepicker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppDatePickerComponent } from './app-date-picker/app-date-picker.component';
import { SortingComponent } from './sorting/sorting.component';
import { FilterComponent } from './filter/filter.component';
import { NgbdPopTooltipComponent } from './popover-tooltip/popover-tooltip.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
@NgModule({
  declarations: [ApploaderComponent,NgbdDatepickerBasicComponent, AppDatePickerComponent, SortingComponent, FilterComponent,NgbdPopTooltipComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    // NgxLoadingModule.forRoot({
    //   animationType: ngxLoadingAnimationTypes.cubeGrid,
    //   backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
    //   fullScreenBackdrop:true,
    //   backdropBorderRadius: '4px',
    //   primaryColour: '#ffffff', 
    //   secondaryColour: '#ffffff', 
    //   tertiaryColour: '#ffffff'
    // }),
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[ApploaderComponent,NgbdDatepickerBasicComponent,AppDatePickerComponent,SortingComponent,FilterComponent,NgbdPopTooltipComponent]
})
export class CustomcomponentsModule { }
