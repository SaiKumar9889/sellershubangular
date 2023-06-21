import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ReportUtill } from 'src/app/reports/ReportUtill';
declare var $: any;
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit,OnChanges {
  @Input() obj: any;
  @Output() output = new EventEmitter<any>();
  timePeriods = [

  ];
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.obj=changes.obj.currentValue;
  }
  ngAfterViewInit(): void {

  }
  generateid(name: string) {
    return name + '-' + this.obj.id;
  }

  ngOnInit(): void {
  }
  loadTablePagenation() {
    $(function () {
      this.rolesTable = $('#' + this.generateid('table')).DataTable({
        responsive: true,
        pagingType: "simple_numbers",
        pageLength: 50,
        lengthChange: false,
      });
    });
  }
  delete() {
    this.output.emit(this.obj);
  }
  tabledrop(event: CdkDragDrop<string[]>) {
    //////console.log(event);   
    //////console.log(event.item.data);
    //////console.log(event.currentIndex);
    //////console.log(event.previousIndex);
    //////console.log(event.container.data);
    //////console.log(event.previousContainer.data);
    if (event.previousContainer === event.container) {
     moveItemInArray(this.obj.columns, event.previousIndex, event.currentIndex);
    } else {
      // this.timePeriods.push(event.item.data.columnDisplayname);
      this.obj.columns=this.obj.columns.filter(item=>(item!='Column 1')&& item!=event.item.data.columnDisplayname);
      this.obj.columns.splice(this.obj.columns.length, 0,event.item.data.columnDisplayname) ;
      this.loadTablePagenation();
    }    
    this.obj.query=ReportUtill.generateQuery(this.obj.columns,this.obj.noOfRecords);
  }
  getRows(noOfrows: number) {
    let temp = [];
    for (let i = 0; i < noOfrows; i++) {
      temp.push(i);
    }
    return temp;
  }
  deleteColumn(column:string){
    this.obj.columns=this.obj.columns.filter(item=>(item!=column));
  }
}
