import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EbaytockenComponent } from './ebaytocken/ebaytocken.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'ebaytocken',
    component: EbaytockenComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRouteModule { }
