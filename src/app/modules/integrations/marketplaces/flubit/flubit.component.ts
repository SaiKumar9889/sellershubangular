import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flubit',
  templateUrl: './flubit.component.html',
  styleUrls: ['./flubit.component.scss']
})
export class FlubitComponent implements OnInit {
  listing = false;
  newTemplate = false;
  constructor() { }

  ngOnInit(): void {
  }

}
