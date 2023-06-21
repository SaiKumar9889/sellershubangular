import { Component, EventEmitter,Input, OnInit, Output } from '@angular/core';
export enum Sort {
  default = 'default',
  up = 'asc',
  down = 'desc'
}
@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent implements OnInit {

  @Input() sortingColumn;
  @Output() sortingobj:EventEmitter<any>= new EventEmitter();
  sortType: Sort = Sort.default;
  constructor() { }

  ngOnInit(): void {
  }
  applySort() {
    switch (this.sortType) {
      case Sort.default:
        this.sortType=Sort.up;
        this.sortingobj.emit(this.sortingColumn+','+this.sortType);
        break;
      case Sort.up:
        this.sortType=Sort.down;
        this.sortingobj.emit(this.sortingColumn+','+this.sortType);
        break;
      case Sort.down:
        this.sortType=Sort.default;
        break;
      default:
        break;
    }
  }
}
