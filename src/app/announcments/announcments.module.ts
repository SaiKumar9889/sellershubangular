import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncmentsComponent } from './announcments/announcments.component';
// import { MessagesComponent } from '../modules/user-manage/messages/messages.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomcomponentsModule } from '../customcomponents/customcomponents.module';
import { RouterModule, Routes } from '@angular/router';
import { ReleasesComponent } from './releases/releases.component';
const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'announcments',
  //   pathMatch: 'full'    
  // },
  // {
  //   path: 'announcments',
  //   component: AnnouncmentsComponent
  // },
  // {
  //   path: 'messages',
  //   component: MessagesComponent
  // }
];
@NgModule({
  declarations: [AnnouncmentsComponent, ReleasesComponent],
  exports: [AnnouncmentsComponent, ReleasesComponent],
  imports: [
    CommonModule,
    FormsModule,
    CustomcomponentsModule,
    RouterModule.forChild(routes),
    NgbModule,
    CustomcomponentsModule
  ]
})
export class AnnouncmentsModule { }
