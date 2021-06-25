import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ClassSchedulerModalComponent } from './components/class-scheduler-modal/class-scheduler-modal.component';
import { HomeComponent } from './components/home/home.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { SchedulesByDateComponent } from './components/schedules-by-date/schedules-by-date.component';
import { SchedulesByMonthComponent } from './components/schedules-by-month/schedules-by-month.component';
import { SchedulesByWeekComponent } from './components/schedules-by-week/schedules-by-week.component';
import { FilterByTeacherPipe } from './pipes/filter-by-teacher.pipe';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ClassSchedulerModalComponent,
    HomeComponent,
    SchedulesComponent,
    SchedulesByDateComponent,
    SchedulesByMonthComponent,
    SchedulesByWeekComponent,
    FilterByTeacherPipe,
    SpinnerOverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    OverlayModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
