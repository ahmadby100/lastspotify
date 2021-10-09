import { Component, Input, OnInit } from '@angular/core';
import { DailyPlaysService } from '../daily-plays.service';
import { period, offset } from '../global';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  @Input() newPeriod: string = '';

  ack = (period: string) => {
    console.log(`Period: ${period} from Top`);
  }

  initTop = (period: string, offset: number) => {
    this.service.top(period, offset);
  }

  constructor(private service: DailyPlaysService) { }

  ngOnInit(): void {
    this.initTop(period, offset);
  }

}
