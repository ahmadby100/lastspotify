import { Component } from '@angular/core';

import { DailyPlaysService } from './daily-plays.service'
import { logger } from './global';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  app_period: string = 'week';
  app_offset = 1;
  header_title = `<span class="text-red-600">last</span>+<span class="text-green-600">spotify</span>.`

  ngAfterViewInit() {
  }
  constructor(private service: DailyPlaysService) {
    this.service.period_change.subscribe(period => {
      this.app_period = period;
      logger("Root",`Period Update: ${this.app_period}`, "orange");
    });
    this.service.offset_change.subscribe(offset => {
      this.app_offset = offset;
      logger("Root",`Offset Update: ${this.app_offset}`, "orange");
    })
  }


}
