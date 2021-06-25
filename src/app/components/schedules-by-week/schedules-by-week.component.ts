import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../../services/schedule.service'; 
import { SpinnerOverlayService } from 'src/app/services/spinner-overlay.service';
@Component({
  selector: 'app-schedules-by-week',
  templateUrl: './schedules-by-week.component.html',
  styleUrls: ['./schedules-by-week.component.scss']
})
export class SchedulesByWeekComponent implements OnInit {

  month:number;
  year:number;
  private sub: any;
  schedules:any[]=[];
  constructor(private route: ActivatedRoute, 
    private scheduleService:ScheduleService,
    private spinnerOverlayService:SpinnerOverlayService) { }


  ngOnInit() {
    try{
      this.spinnerOverlayService.show();
      this.sub = this.route.params.subscribe(params => {
        this.month = params['month'];
        this.year = params['year'];
       this.scheduleService.weekWiseScheduleOfAMonth(this.month, this.year).then((schedules)=>{
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
