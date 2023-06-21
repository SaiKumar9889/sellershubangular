import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomcomponentsModule } from 'src/app/customcomponents/customcomponents.module';
import { AiDashboardComponent } from './ai-dashboard/ai-dashboard.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { AiProductDashboardComponent } from './ai-product-dashboard/ai-product-dashboard.component';
import { AiUserDashboardComponent } from './ai-user-dashboard/ai-user-dashboard.component';
import { AiSubscriptionDashboardComponent } from './ai-subscription-dashboard/ai-subscription-dashboard.component';
import { AiChannelorderdownloaderDashboardComponent } from './ai-channelorderdownloader-dashboard/ai-channelorderdownloader-dashboard.component';
import { AiSubscriptionplansDashboardComponent } from './ai-subscriptionplans-dashboard/ai-subscriptionplans-dashboard.component';
import { NgxStripeModule } from 'ngx-stripe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    DashboardComponent,
    AiDashboardComponent,
    AiProductDashboardComponent,
    AiUserDashboardComponent,
    AiSubscriptionDashboardComponent,
    AiChannelorderdownloaderDashboardComponent,
    AiSubscriptionplansDashboardComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    CustomcomponentsModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_live_PS3leXwKaiJx2UKyMvk2MpGM'),
    PipesModule
  ],
  exports: [DashboardComponent, AiDashboardComponent, AiProductDashboardComponent, AiUserDashboardComponent, AiSubscriptionDashboardComponent, AiChannelorderdownloaderDashboardComponent, AiSubscriptionplansDashboardComponent]
})
export class DashboardModule { }
