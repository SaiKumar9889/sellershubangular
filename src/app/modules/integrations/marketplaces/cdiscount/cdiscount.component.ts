import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cdiscount',
  templateUrl: './cdiscount.component.html',
  styleUrls: ['./cdiscount.component.scss']
})
export class CdiscountComponent implements OnInit {
 
  listing = false;
  newTemplate = false;

  constructor() { }

  ngOnInit(): void {
  }

}
