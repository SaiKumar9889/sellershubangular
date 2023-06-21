import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snapdeal',
  templateUrl: './snapdeal.component.html',
  styleUrls: ['./snapdeal.component.scss']
})
export class SnapdealComponent implements OnInit {
  listing = false;
  newTemplate = false;
  constructor() { }

  ngOnInit(): void {
  }

}
