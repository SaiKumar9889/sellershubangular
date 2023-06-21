import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportengineComponent } from './reportengine.component';
import { ReportviewComponent } from './reportview/reportview.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'engine',
    pathMatch: 'full'
  },
  {
    path: 'engine',
    component: ReportengineComponent
  },
  {
    path: 'rview',
    component: ReportviewComponent
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRouteModule { }