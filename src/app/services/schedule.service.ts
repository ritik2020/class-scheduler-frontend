import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  hostName:string = "https://class-scheduler-backend.herokuapp.com";
  constructor() { }

  async scheduleClass(schedule) {
    try {
      const timeRegex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/; //HH:MM:SS
      if (!timeRegex.test(schedule.start_time) || !timeRegex.test(schedule.end_time)) {
        throw new Error("Time format is incorrect. Please type it in (HH:MM:SS) format");
      }
      const response = await fetch(`${this.hostName}/schedules/`, {
        method: 'POST',
        body: JSON.stringify(schedule),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status !== 200) {
        const err = await response.json();
        throw new Error(err.message);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getDateSchedule(date: string) {
    try {
      const response = await fetch(`${this.hostName}/schedules/date/${date}`);
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Error while fetching schedules");
      }
    }
    catch (err) {
      throw new Error(err.message);
    }
  }

  async getMonthSchedule(month: number, year: number) {
    try {
      const response = await fetch(`${this.hostName}/schedules/month/${month}/${year}`);
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Error while Fetching schedules");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async weekWiseScheduleOfAMonth(month:number, year:number){
    try{
      const weeks = this.getWeeksInAMonth(month, year);
      const fetchAPIPromises = [];
      weeks.forEach((week)=>{
        let startDate = week.dates[0];
        let endDate = week.dates[week.dates.length-1];
        fetchAPIPromises.push(fetch(`${this.hostName}/schedules/range/${startDate}/${endDate}`));
      });
      const responses = await Promise.all(fetchAPIPromises);
      const fetchAPIResponsePromises = responses.map(response=>response.json());
      let weekWiseSchedules = await Promise.all(fetchAPIResponsePromises);
      weekWiseSchedules = weekWiseSchedules.map((weekSchedule,index)=>{
        return {
          startDate: weeks[index].dates[0],
          endDate:weeks[index].dates[weeks[index].dates.length-1],
          schedules: weekSchedule
        }
      });
      return weekWiseSchedules;
    }catch(err){
      throw new Error(err.message);
    }
    
    
    
  }

  getWeeksInAMonth(month: number, year: number) {
    const weeks = [],
      firstDate = new Date(year, month - 1, 1),
      lastDate = new Date(year, month, 0),
      numDays = lastDate.getDate();

    let dayOfWeekCounter = firstDate.getDay();

    for (let date = 1; date <= numDays; date++) {
      if (dayOfWeekCounter === 0 || weeks.length === 0) {
        weeks.push([]);
      }
      weeks[weeks.length - 1].push(`${year}-${month}-${date}`);
      dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
    }

    return weeks
      .filter((w) => !!w.length)
      .map((w) => ({
        dates: w
      }));
  }
}
