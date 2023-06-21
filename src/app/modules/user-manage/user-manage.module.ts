import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountComponent } from './my-account/my-account.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { SubscrptionComponent } from './subscrption/subscrption.component';
import { RedemCouponComponent } from './redem-coupon/redem-coupon.component';
import { UserGuidesComponent } from './user-guides/user-guides.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomcomponentsModule } from 'src/app/customcomponents/customcomponents.module';
import { NgxStripeModule } from 'ngx-stripe';
import { MessagesComponent } from './messages/messages.component';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';
import { FbaCalculatorComponent } from './fba-calculator/fba-calculator.component';



@NgModule({
  declarations: [MyAccountComponent, ManageUsersComponent, SubscrptionComponent, RedemCouponComponent, UserGuidesComponent,MessagesComponent, PaymentModalComponent, FbaCalculatorComponent],
  exports: [MyAccountComponent, ManageUsersComponent, SubscrptionComponent, RedemCouponComponent, UserGuidesComponent,MessagesComponent, FbaCalculatorComponent],
  imports: [
    CommonModule,
    FormsModule,
    CustomcomponentsModule,
    NgbModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_live_PS3leXwKaiJx2UKyMvk2MpGM'),
  ]
})
export class UserManageModule { }
