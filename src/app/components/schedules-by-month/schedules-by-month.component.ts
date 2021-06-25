import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../../services/schedule.service';
import { SpinnerOverlayService } from 'src/app/services/spinner-overlay.service';
@Component({
  selector: 'app-schedules-by-month',
  templateUrl: './schedules-by-month.component.html',
  styleUrls: ['./schedules-by-month.component.scss']
})
export class SchedulesByMonthComponent implements OnInit {
  month:number;
  year:number;
  private sub: any;
  schedules:any[]=[];
  constructor(private route: ActivatedRoute, 
    private scheduleService:ScheduleService,
    private spinnerOverlayService:SpinnerOverlayService
    ) { }


  ngOnInit() {
    try{
      this.spinnerOverlayService.show();
      this.sub = this.route.params.subscribe(params => {
        this.month = params['month'];
        this.year = params['year'];
       this.scheduleService.getMonthSchedule(this.month, this.year).then((schedules)=>{
         this.schedules = schedules;
       })
     })
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
