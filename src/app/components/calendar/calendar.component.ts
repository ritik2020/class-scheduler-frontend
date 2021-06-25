import { Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input('month') month:number;
  @Input('year') year:number;
  @Output() onDateSelect:EventEmitter<string> = new EventEmitter<string>();
  @Output() onDateDoubleClick:EventEmitter<string> = new EventEmitter<string>();
  daysInMonth:number;
  paddingDays:number;
  weeks:string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  todayDate:number;
  todayMonth:number;
  todayYear:number;
  dateClickTimer:any;
  constructor(public calendarService:CalendarService) { }

  ngOnChanges(){
    const dt = new Date();
    this.todayDate = dt.getDate();
    this.todayMonth = dt.getMonth();
    this.todayYear = dt.getFullYear();
    const firstDayOfMonth = new Date(this.year, this.month, 1);
    this.daysInMonth = new Date(this.year, this.month+1, 0).getDate();
    const dateString = firstDayOfMonth.toLocaleDateString('en-us',{
      weekday: 'long',
      year: 'numeric',
      month:'numeric',
      day: 'numeric'
    });
    this.paddingDays = this.weeks.indexOf(dateString.split(', ')[0]);
  }

  ngOnInit(): void {
    
  }


  numberToIterable(num){
    return new Array(num);
  }

  dateClickHandler(date:number){
    const dateString = `${this.year}-${this.month+1}-${date}`;
    if(this.dateClickTimer===undefined){
      this.dateClickTimer = setTimeout(()=>{
        this.onDateSelect.emit(dateString);
        this.dateClickTimer=undefined;
      },250);
    }else{
      clearInterval(this.dateClickTimer);
      this.dateClickTimer = undefined;
      this.onDateDoubleClick.emit(dateString);
    }
  }  

}
