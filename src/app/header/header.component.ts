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
  header_title = `<span class="text-red-600">last</span>+<span class="text-green-600">spotify</span>.`
  
  @Output() newPeriod = new EventEmitter<string>();
  @Output() newOffset = new EventEmitter<number>();
  sub: any;
  periodChange: Subject<string> = new Subject<string>();
  offsetChange: Subject<number> = new Subject<number>();
  
  constructor(private service: DailyPlaysService) {
    this.service.period_change.subscribe(val => {
      console.log(`Period update from app-header: ${val}`);
    })
  }

  get getPeriod(): string {
    return this.service.local_period;
  }
  
  

  changePeriod = (newPeriod: string) => {
    console.log(`Setting Period: ${newPeriod}`);
    this.service.updateSettings(newPeriod, 1);
    this.period = newPeriod;
    this.offset = 1;
    this.periodChange.next(this.period);
    this.newPeriod.emit(newPeriod);

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
    (direction == 'prev') ? this.offset++ : this.offset--;
    console.log(`Setting Offset: ${this.offset}`);
    this.offsetChange.next(this.offset);
    this.newOffset.emit(this.offset);
    this.service.updateSettings(this.period, this.offset);
  }


  ngOnInit(): void {
  }

}
