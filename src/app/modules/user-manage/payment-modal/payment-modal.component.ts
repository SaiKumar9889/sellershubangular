import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { ManageUsersService } from '../services/manage-users.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { ToastTypes } from 'src/app/_models/_toaster';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})
export class PaymentModalComponent implements OnInit, OnChanges {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  @Input() plandetails: any;
  @Output() paymentStatus= new EventEmitter<any>();;
  planid: any;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: 'Poppins',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en-GB'
  };

  stripeTest: FormGroup;

  constructor(private toasterService: ToasterService, private userService: ManageUsersService, private fb: FormBuilder, private stripeService: StripeService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.plandetails);
    this.planid=this.plandetails?.subscription?.subscriptionid;
    let price=this.plandetails?.priceWithTaxOnly;
    this.stripeTest?.controls['amount'].setValue(price);
  }

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    });
  }

  createToken(): void {
    if (!this.stripeTest.valid) {
      this.toasterService.openToastMessage(ToastTypes.warning, "Payment Details", 'Please Enter name');
      return;
    }
    const name = this.stripeTest.get('name').value;
    let ref = this;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);

          ref.userService.chargeCard(result.token.id, ref.planid, null).subscribe((res) => {
           ref.paymentStatus.emit(res);
          }, error => {
            console.log(error);
          });

        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
          this.toasterService.openToastMessage(ToastTypes.error, "Payment Details", result.error.message);
          return;
        }
      });
  }
}
