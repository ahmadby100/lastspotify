import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { BarChartComponent } from './bar-chart/bar-chart.component';

import { DailyPlaysService } from './daily-plays.service'

import { period, offset } from './global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dummy = () => 0;
  period: string = 'week';
  offset = 1;
  header_title = `<span class="text-red-600">last</span>+<span class="text-green-600">spotify</span>.`

  @ViewChild(BarChartComponent)
  private chart!: BarChartComponent;



  timeTravel = (offset: number): void => {
    this.period = period;
    this.offset = offset;
    this.service.top(this.period, this.offset);
    this.service.highlights(this.period, this.offset);
  }

  changePeriod = (period: string) => {
    this.period = period;
    console.log(`Period: ${this.period} from app-root`)
    this.offset = 1;
    this.service.top(this.period, this.offset);
    this.service.highlights(this.period, this.offset);
    // this.chart.getChartData(this.period, this.offset)
    // this.chart.test(this.period, this.offset);
    console.log(this.period, "From app.component");
  }
  ngAfterViewInit() {
    setTimeout(() => this.dummy = () => this.chart.refreshInt, 0);
  }
  constructor(private service: DailyPlaysService) {
    // header.periodChange.subscribe((val) => {
    //   console.log(`Period: ${val} from Root App`);
    // })
  }
}
