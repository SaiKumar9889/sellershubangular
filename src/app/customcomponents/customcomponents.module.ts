import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppDatePickerComponent } from "./app-date-picker/app-date-picker.component";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [AppDatePickerComponent],
  exports: [AppDatePickerComponent],
  imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule],
})
export class CustomcomponentsModule {}
