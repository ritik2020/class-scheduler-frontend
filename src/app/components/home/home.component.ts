import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  month:number = 0; //0 based indexing
  year:number = 2021;
  showModal:boolean;
  modalDate:string;
  months:string[] = [];
  years:number[] = [];
  constructor(
    private calendarService:CalendarService,
    private router:Router
    ){}

  ngOnInit(){
    const dt = new Date;
    this.month = dt.getMonth();
    this.year = dt.getFullYear();
    for(let i=0; i<=11; i++){
      this.months.push(this.calendarService.monthNameByIndex(i));
    }
    this.years = this.calendarService.getYears(2021,2030);
  }

  openModal(date=''){
    if(date===''){
      this.modalDate = '';
      this.showModal = true;
    }
    else{
      this.modalDate = date;
      this.showModal = true;
    }
  }

  hideModal(){
    this.showModal = false;
  }

  changeMonth(monthIndex){
    this.month = Number(monthIndex);
  }

  changeYear(year){
    this.year = Number(year);
  }

  showDateSchedules(date:string){
    this.router.navigateByUrl(`schedules-by-date/${date}`);
  }

  showMonthSchedules(month:number, year:number){
    this.router.navigateByUrl(`schedules-by-month/${month}/${year}`);
  }

  showWeekWiseSchedule(month:number, year:number){
    this.router.navigateByUrl(`schedules-by-week/${month}/${year}`);
  }
}
