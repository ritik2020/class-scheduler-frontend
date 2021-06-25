import { Component, OnInit,OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../../services/schedule.service'; 
import { SpinnerOverlayService } from 'src/app/services/spinner-overlay.service';
@Component({
  selector: 'app-schedules-by-date',
  templateUrl: './schedules-by-date.component.html',
  styleUrls: ['./schedules-by-date.component.scss']
})
export class SchedulesByDateComponent implements OnInit, OnDestroy {
  date: string;
  private sub: any;
  schedules:any[] = [];
  constructor(private route: ActivatedRoute, 
    private scheduleService:ScheduleService, 
    private spinnerOverlayService:SpinnerOverlayService) { }

  ngOnInit() {
    try{
      this.spinnerOverlayService.show();
      this.sub = this.route.params.subscribe(params => {
         this.date = params['date'];
        this.scheduleService.getDateSchedule(this.date).then((schedules)=>{
          this.schedules = schedules;
        })
      });
    }catch(err){
      console.log(err.message);
    }finally{
      this.spinnerOverlayService.hide();
    }
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
