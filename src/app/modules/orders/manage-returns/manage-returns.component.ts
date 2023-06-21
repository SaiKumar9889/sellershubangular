import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-returns',
  templateUrl: './manage-returns.component.html',
  styleUrls: ['./manage-returns.component.css']
})
export class ManageReturnsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  page=1;
  page2 = 1;
  currentPage = 3;
  disablepage = 3;
  isDisabled = true;

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }
}
