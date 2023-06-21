import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opensky',
  templateUrl: './opensky.component.html',
  styleUrls: ['./opensky.component.scss']
})
export class OpenskyComponent implements OnInit {
  listing = false;
  newTemplate = false;
  constructor() { }

  ngOnInit(): void {
  }

}
