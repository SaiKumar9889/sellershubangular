import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flipkart',
  templateUrl: './flipkart.component.html',
  styleUrls: ['./flipkart.component.scss']
})
export class FlipkartComponent implements OnInit {

  listing = false;
  constructor() { }

  ngOnInit(): void {
  }

}
