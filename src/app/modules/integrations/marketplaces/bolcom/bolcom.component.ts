import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bolcom',
  templateUrl: './bolcom.component.html',
  styleUrls: ['./bolcom.component.scss']
})
export class BolcomComponent implements OnInit {
  listing = false;
  constructor() { }

  ngOnInit(): void {
  }

}
