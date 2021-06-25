import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByTeacher'
})
export class FilterByTeacherPipe implements PipeTransform {

  transform(schedules: any[], teacherID:number): any[] {
    if(teacherID===-1){
      return schedules;
    }
    return schedules.filter(schedule=>schedule.teacher_id===teacherID)
  }

}
