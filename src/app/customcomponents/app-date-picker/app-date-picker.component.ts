import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
const my = new Date();
declare var $:any;
@Component({
  selector: 'app-app-date-picker',
  templateUrl: './app-date-picker.component.html',
  styleUrls: ['./app-date-picker.component.css']
})
export class AppDatePickerComponent implements OnInit, OnChanges {
  model: NgbDateStruct;
  @Input() lable;
  // @Input() minDate;
  // @Input() maxDate;
  @Input() isDisabled = true;
  @Input() isclear=false;
  @Input() selectedIpDate: NgbDateStruct;
  @Input() minDate: NgbDateStruct;
  @Input() maxDate: NgbDateStruct;
  @Output() selectedDate: EventEmitter<any> = new EventEmitter();
  newModel: string;
  // minDate = { year: new Date().getFullYear()-70, month: 1, day: 1 };
  // maxDate:any;
  datePopupOpen = false;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.selectedIpDate);
    if(this.selectedIpDate){
      this.model = {day: this.selectedIpDate.day, month: this.selectedIpDate.month  ,  year: this.selectedIpDate.year  };

      this.newModel = this.model.day+'-'+this.model.month+'-'+this.model.year;
    }
    if(this.minDate)
    //this.minDate = {day: this.minDate.day, month: this.minDate.month + 1,  year: this.minDate.year };
    if(this.maxDate)
    this.maxDate = { day: this.maxDate.day, month: this.maxDate.month + 1, year: this.maxDate.year };
    if(this.isclear)
    this.clear();
  }
  onChange(event: any) {
    //console.log(this.model);
    this.newModel = this.model.day+'-'+this.model.month+'-'+this.model.year;
    this.datePopupOpen = false;
    this.selectedDate.emit(this.model);
  }
  ngOnInit(): void {
    if(this.selectedIpDate!=null){
      this.model = {day: this.selectedIpDate.day, month: this.selectedIpDate.month  ,  year: this.selectedIpDate.year,  };
      this.newModel = this.model.day+'-'+this.model.month+'-'+this.model.year;
    }
    if(!this.minDate){
      //this.minDate={ year: new Date().getFullYear()-20, month: 1, day: 1 }
    }

  }
  openDate(){
    this.datePopupOpen = true;
    setTimeout(() => {
      $('#toogleClick').click();
    }, 5);

  }

  clear(){
    this.model = null;
    this.newModel = null;
  }
}
