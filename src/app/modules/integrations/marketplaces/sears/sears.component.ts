import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sears',
  templateUrl: './sears.component.html',
  styleUrls: ['./sears.component.scss']
})
export class SearsComponent implements OnInit {

  listing = false;
  newTemplate = false;
  constructor() { }

  ngOnInit(): void {
  }

}
