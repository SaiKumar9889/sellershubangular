import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { DateAdapter } from "@angular/material/core";
const my = new Date();
declare var $: any;
@Component({
  selector: "app-app-date-picker",
  templateUrl: "./app-date-picker.component.html",
  styleUrls: ["./app-date-picker.component.css"],
})
export class AppDatePickerComponent implements OnInit, OnChanges {
  date: Date = new Date();
  model: any;
  @Input() lable: any;
  // @Input() minDate;
  // @Input() maxDate;
  @Input() isDisabled = true;
  @Input() isclear = false;
  @Input() selectedIpDate: any;
  minDate: Date = new Date();
  maxDate: Date = new Date();
  @Output() selectedDate: EventEmitter<any> = new EventEmitter();
  newModel: string = "";
  // minDate = { year: new Date().getFullYear()-70, month: 1, day: 1 };
  // maxDate:any;
  datePopupOpen = false;
  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale("en-GB"); //dd/MM/yyyy
    this.model = {
      day: this.date.getUTCDate(),
      month: this.date.getUTCMonth() + 1,
      year: this.date.getUTCFullYear(),
    };
    this.selectedIpDate = {
      day: this.date.getUTCDate(),
      month: this.date.getUTCMonth() + 1,
      year: this.date.getUTCFullYear(),
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.selectedIpDate);
    if (this.selectedIpDate) {
      this.model = {
        day: this.selectedIpDate.day,
        month: this.selectedIpDate.month,
        year: this.selectedIpDate.year,
      };

      this.newModel =
        this.model.day + "-" + this.model.month + "-" + this.model.year;
    }
    if (this.minDate) if (this.isclear) this.clear();
  }
  onChange(event: any) {
    console.log(this.model);
    this.newModel =
      this.model.day + "-" + this.model.month + "-" + this.model.year;
    this.datePopupOpen = false;
    this.selectedDate.emit(this.model);
  }
  ngOnInit(): void {
    console.log(this.selectedIpDate);
    if (this.selectedIpDate != null) {
      this.model = {
        day: this.selectedIpDate.day,
        month: this.selectedIpDate.month,
        year: this.selectedIpDate.year,
      };
      this.newModel =
        this.model.day + "-" + this.model.month + "-" + this.model.year;
    }
    if (!this.minDate) {
      //this.minDate={ year: new Date().getFullYear()-20, month: 1, day: 1 }
    }
  }
  openDate() {
    this.datePopupOpen = true;
    setTimeout(() => {
      $("#toogleClick").click();
    }, 5);
  }

  clear() {
    this.model = null;
    this.newModel = "";
  }
}
export const MY_FORMATS = {
  parse: {
    dateInput: "LL",
  },
  display: {
    dateInput: "YYYY-MM-DD",
    monthYearLabel: "YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "YYYY",
  },
};
