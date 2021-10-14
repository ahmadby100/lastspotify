import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { period, offset } from "../global";
import { Subject } from 'rxjs';
import { DailyPlaysService } from '../daily-plays.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})



export class HeaderComponent implements OnInit {
  period: string = period;
  offset: number = 1;
  curr_date = "";
  prevBtn = false;
  nextBtn = true;
  private css = "color: lightcoral;";
  private logheader = (log: any) => {
		console.log(`%cHeader: ${log}`, this.css);	
	}
  sub: any;
  periodChange: Subject<string> = new Subject<string>();
  offsetChange: Subject<number> = new Subject<number>();
  
  constructor(private service: DailyPlaysService) {
    this.service.curr_date.subscribe(date => this.curr_date = date);
  }

  get getPeriod(): string {
    return this.service.local_period;
  }
  
  

  changePeriod = (newPeriod: string) => {
    this.logheader(`Setting Period: ${newPeriod}`);
    this.period = newPeriod;
    this.offset = 1;
    this.disableButtons();
    this.service.updateSettings(this.period, this.offset);
  }

  timeTravel = (direction: string) => {
    if (this.offset == 1 && direction == 'next') {
      alert("Cannot travel to the future")
      return;
    }
    if (this.period == "all") {
      alert("Thats it");
      return;
    }
    if (this.period == "year" && this.offset == 3 && direction == "prev") {
      alert("Final Year");
      return;
    }
    (direction == 'prev') ? this.offset++ : this.offset--;
    this.disableButtons();
    this.logheader(`Setting Offset: ${this.offset}`);
    this.service.updateSettings(this.period, this.offset);
  }

  disableButtons = () => {
    this.prevBtn = this.nextBtn = false;
    if (this.period == "all") {
      this.nextBtn = true;
      this.prevBtn = true;
      return
    }
    if (this.offset == 1) {
      this.nextBtn = true;
      console.log("disable forwards");
      return
    }
    if (this.period == "year" && this.offset == 3) {
      this.prevBtn = true;
      return
    }
  }

  ngOnInit(): void {
  }

}
