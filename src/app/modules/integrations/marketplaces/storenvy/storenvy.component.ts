import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storenvy',
  templateUrl: './storenvy.component.html',
  styleUrls: ['./storenvy.component.scss']
})
export class StorenvyComponent implements OnInit {
  listing = false;
  newTemplate = false;
  constructor() { }

  ngOnInit(): void {
  }

}
