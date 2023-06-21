import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-priceminister',
  templateUrl: './priceminister.component.html',
  styleUrls: ['./priceminister.component.scss']
})
export class PriceministerComponent implements OnInit {
  listing = false;
  newTemplate = false;
  constructor() { }

  ngOnInit(): void {
  }

}
