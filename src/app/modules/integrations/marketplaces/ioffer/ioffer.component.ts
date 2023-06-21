import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ioffer',
  templateUrl: './ioffer.component.html',
  styleUrls: ['./ioffer.component.scss']
})
export class IofferComponent implements OnInit {
  listing = false;
  newTemplate = false;
  constructor() { }

  ngOnInit(): void {
  }

}
