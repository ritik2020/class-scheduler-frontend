import { SchedulesByWeekComponent } from './components/schedules-by-week/schedules-by-week.component';
import { SchedulesByMonthComponent } from './components/schedules-by-month/schedules-by-month.component';
import { SchedulesByDateComponent } from './components/schedules-by-date/schedules-by-date.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "schedules-by-date/:date",
    component: SchedulesByDateComponent
  },
  {
    path: "schedules-by-month/:month/:year",
    component: SchedulesByMonthComponent
  },
  {
    path: "schedules-by-week/:month/:year",
    component: SchedulesByWeekComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
