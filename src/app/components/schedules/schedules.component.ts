import { Component, OnInit,Input } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { SpinnerOverlayService } from 'src/app/services/spinner-overlay.service';
@Component({
  selector: 'schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {
  @Input('schedules') schedules:any[];
  filterTeacherID:number = -1;
  teachers:any[];
  constructor(private teacherService: TeacherService, private spinnerOverlayService:SpinnerOverlayService) { }

  async ngOnInit(){
    this.spinnerOverlayService.show();
    this.teachers = await this.teacherService.getAllTeachers();
    this.spinnerOverlayService.hide();
  }

  
  filterByTeacher(id){
    this.filterTeacherID = Number(id);
  }
}
