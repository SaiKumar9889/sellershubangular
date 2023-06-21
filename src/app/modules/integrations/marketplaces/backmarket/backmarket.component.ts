import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-backmarket',
  templateUrl: './backmarket.component.html',
  styleUrls: ['./backmarket.component.scss']
})
export class BackmarketComponent implements OnInit {
  listing = false;
  newTemplate = false;

  constructor() { }

  ngOnInit(): void {
  }

}
