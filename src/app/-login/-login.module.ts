import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRouteModule } from './_login.route.module';
import { CustomcomponentsModule } from '../customcomponents/customcomponents.module';
import { RegistrationComponent } from './registration/registration.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EbaytockenComponent } from './ebaytocken/ebaytocken.component';



@NgModule({
  declarations: [LoginComponent, RegistrationComponent,EbaytockenComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoginRouteModule,
    CustomcomponentsModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class LoginModule { }
