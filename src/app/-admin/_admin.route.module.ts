
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PocComponent } from './poc/poc.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'poc',
    pathMatch: 'full'
  },
  {
    path: 'poc',
    component: PocComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouteModule { }