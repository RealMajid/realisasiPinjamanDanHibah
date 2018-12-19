import {Component, Output, EventEmitter, Input, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ngbd-datepicker-popup',
  templateUrl: './datepicker-popup.html'
})
export class NgbdDatepickerPopup {
  @Output() changeCalendar = new EventEmitter();
  model: Date;
  todayDate = new Date;
  minDate = {year: this.todayDate.getFullYear(), month: 1, day: 1};
  maxDate = {year: this.todayDate.getFullYear(), month: 12, day: 31};

  onChange(event) {
     this.changeCalendar.emit(event);
  }
}