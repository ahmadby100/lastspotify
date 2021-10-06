import { Component, ViewChild } from '@angular/core';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Spotify Analysis';
  period: "week" | "month" | "year" | "all" = "week";
  offset = 1;
  header_title = `<span class="text-red-600">last</span>+<span class="text-green-600">spotify</span>`

  @ViewChild(BarChartComponent) chart!: BarChartComponent;

  timeTravel = (direction: string): void => {
    (direction == "forwards") ? this.offset-- : this.offset++;
  }

  changePeriod = (period: "week" | "month" | "year" | "all") => {
    this.period = period;
    // this.chart.getChartData(period, this.offset)
  }

}
