import { ScheduleService } from '../../services/schedule.service';
import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { SpinnerOverlayService } from '../../services/spinner-overlay.service';
@Component({
  selector: 'class-scheduler-modal',
  templateUrl: './class-scheduler-modal.component.html',
  styleUrls: ['./class-scheduler-modal.component.scss']
})
export class ClassSchedulerModalComponent implements OnInit{
  topic:string;
  @Input('date') date?:string;
  startTime:string;
  endTime:string;
  teacherID:number;
  teachers:any[];
  errorMessage:string;
  @Output() onCancel:EventEmitter<void> = new EventEmitter<void>();
  @Output() onClassSchedule:EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private teacherService:TeacherService,
    private scheduleService:ScheduleService,
    private spinnerOverlayService:SpinnerOverlayService
    ){

  }
  async ngOnInit(){
    this.spinnerOverlayService.show();
    this.teachers = await this.teacherService.getAllTeachers();
    this.spinnerOverlayService.hide();
  }
  async schedule(){
    try{
      this.spinnerOverlayService.show();
      await this.scheduleService.scheduleClass({
        schedule_date: this.date,
        start_time: this.startTime, 
        end_time: this.endTime, 
        topic_name: this.topic, 
        teacher_id: Number(this.teacherID)
      });
      alert("Class Scheduled Succesfully");
      this.onClassSchedule.emit();
    }
    catch(err){
      alert(err.message);
    }finally{
      this.spinnerOverlayService.hide();
    }
  }

  cancel(){
    this.onCancel.emit();    
  }
}
