import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { DailyPlaysService } from './daily-plays.service'


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
  app_period: string = 'week';
  app_offset = 1;
  header_title = `<span class="text-red-600">last</span>+<span class="text-green-600">spotify</span>.`

  ngAfterViewInit() {
  }
  constructor(private service: DailyPlaysService) {
    this.service.period_change.subscribe(period => {
      this.app_period = period;
      this.logapp(`Period Update: ${this.app_period}`);
    });
    this.service.offset_change.subscribe(offset => {
      this.app_offset = offset;
      this.logapp(`Offset Update: ${this.app_offset}`);
    })
  }
  

}
