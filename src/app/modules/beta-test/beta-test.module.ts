import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'    
  }, 
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ]
})
export class BetaTestModule { }
