import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jet',
  templateUrl: './jet.component.html',
  styleUrls: ['./jet.component.scss']
})
export class JetComponent implements OnInit {

  listing = false;
  newTemplate = false;
  constructor() { }

  ngOnInit(): void {
  }

}
