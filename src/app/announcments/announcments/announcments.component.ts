import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-announcments',
  templateUrl: './announcments.component.html',
  styleUrls: ['./announcments.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AnnouncmentsComponent implements OnInit {
  monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  month = 'January'; currentMonth = 'January';
  title = 'Now Sellershub Users can print Packing Slips for all the Orders across the channels to ease their process of packaging.';
  title2 = 'Sellershub now support Users for Duplex Printing where user can print Packing Slips along with Label for all the Orders.'
  title3 = 'Sellershub Users are able to process orders and print label through Amazon Buy Shipping Now.'
  title4 = 'We at Sellershub are pleased to announce the launch of Premium Artificial Intelligence Dashboard for Inventory and Orders, where User can generate custom reports.'
  title5 = 'Sellershub.io has a handy Profit & loss calculator which is a useful tool for any online seller. This allows you to figure out either you are making profit or loss on your entire sales/efforts after deducting all expenses such cost of product, delivery fee, customer service and very importantly the VAT elements involved in the whole transaction for order sales/ fulfillment by any marketplace/ channel for any given product. We at Sellershub believe this is a must have tool for any merchant or seller.'
  constructor() { }

  ngOnInit(): void {
    this.month = this.monthNames[new Date().getMonth()-1];
    this.currentMonth = this.monthNames[new Date().getMonth()];
  }



}
