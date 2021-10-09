import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { period, offset } from "../global";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})



export class HeaderComponent implements OnInit {
  period: string;
  offset: number = 1;
  header_title = `<span class="text-red-600">last</span>+<span class="text-green-600">spotify</span>.`
  
  @Output() newPeriod = new EventEmitter<string>();
  @Output() newOffset = new EventEmitter<number>();

  periodChange: Subject<string> = new Subject<string>();

  constructor() {
    this.period = period;
   }
  

  changePeriod = (newPeriod: string) => {
    console.log(`Setting Period: ${newPeriod}`);
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
    this.newOffset.emit(this.offset);
      
    
  }


  ngOnInit(): void {
  }

}
