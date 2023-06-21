import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { filterDropDown } from 'src/app/_models/filterDropDown';
declare var $ :any;
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FilterComponent implements OnInit,OnChanges {
  @ViewChild('p', { static: false }) public popover;
  @Output() filterObj:EventEmitter<any>= new EventEmitter();
  @Input() multipleColumns:filterDropDown[];
  @Input() isMultiple:boolean;
  columnName:any='';
  searchString:any='';
  filterKey:any='';
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.multipleColumns=changes.multipleColumns.currentValue;
    this.isMultiple=changes.isMultiple.currentValue;
    this.columnName=this.multipleColumns[0].columnName;
  }

  ngOnInit(): void {
   
  }
  changesFilterKey(){
    this.columnName=this.multipleColumns.find(fil=>fil.columnFilterKey==this.filterKey).columnName;
  }
  openPopOver(){
    const isOpen = this.popover.isOpen();
    this.popover.close();
    if (!isOpen) {
      this.popover.open('');
    }
  }
  closePopOver(){
    this.filterObj.emit({key:this.filterKey,value:this.searchString});
    this.popover.close();
  }
  saveData(){
    this.closePopOver();
  }
}
