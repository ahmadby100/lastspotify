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
  private css = "color: orange;";
  private logapp = (log: any) => {
		console.log(`%cRoot: ${log}`, this.css);	
	}
  dummy = () => 0;
  period: string = 'week';
  offset = 1;
  header_title = `<span class="text-red-600">last</span>+<span class="text-green-600">spotify</span>.`

  @ViewChild(BarChartComponent)
  private chart!: BarChartComponent;



  timeTravel = (offset: number): void => {
    this.period = period;
    this.offset = offset;
    // this.service.top(this.period, this.offset);
    this.service.highlights(this.period, this.offset);
  }

  changePeriod = (period: string) => {
    this.period = period;
    this.offset = 1;
    // this.service.top(this.period, this.offset);
    this.service.highlights(this.period, this.offset);
  }
  ngAfterViewInit() {
    setTimeout(() => this.dummy = () => this.chart.refreshInt, 0);
  }
  constructor(private service: DailyPlaysService) {
    this.service.period_change.subscribe(val => this.logapp(`Period Update: ${val}`))
  }
  

}
