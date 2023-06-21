import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-elevenstreet',
  templateUrl: './elevenstreet.component.html',
  styleUrls: ['./elevenstreet.component.scss']
})
export class ElevenstreetComponent implements OnInit {
  listing = false;
  newTemplate = false;
  constructor() { }

  ngOnInit(): void {
  }

}
