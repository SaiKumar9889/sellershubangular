import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRouteModule } from './_login.route.module';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginRouteModule,
  ]
})
export class LoginModule { }
