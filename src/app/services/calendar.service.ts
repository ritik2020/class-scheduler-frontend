import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }

  monthNameByIndex(monthIndex:number):string{
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[monthIndex];
  }

  getYears(startYear:number, endYear:number):number[]{
    const years:number[] = [];
    for(let i=startYear; i<=endYear; i++){
      years.push(i);
    }
    return years;
  }
}
