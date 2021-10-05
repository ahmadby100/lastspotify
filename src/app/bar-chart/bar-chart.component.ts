import { Component, OnInit, Input } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { DailyPlaysService } from '../daily-plays.service'

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  curr_period: Object = {};
  prev_period: Object = {};
  period: string = "week";
  offset: number = 1;
  
  delayed = false;
  chartOptions: ChartOptions = {
    responsive: true,
    animation: {
      onComplete: () => {
        this.delayed = true
      },
      delay: (context): number => {
        let delay = 0;
        if (!this.delayed)
          delay = context.dataIndex * 1000 + context.datasetIndex * 100;
        return delay;
      }
    },
    plugins: {
      title: {
        display: false,
        text: ["Listening Week [Scrobbles]"]
      },
      scales: {
        y: {
          type: "linear",
          display: false,
          position: "right"
        }
      }
    }
  }
  chartLabels: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  chartType: ChartType = "bar";
  chartLegend = false;

  getChartData = (): {curr: Object, prev: Object} => {
    return this.dailyPlays.daily_plays(this.offset, this.period);
  } 
  
  chartData: {data: Object, label: string}[] = [];

  constructor(private dailyPlays: DailyPlaysService) { }



  ngOnInit(): void {
    let ret = this.getChartData()
    this.curr_period = ret.curr;
    this.prev_period = ret.prev;
  
    // this.chartData = [
    //   {data: this.curr_period, label: `Current ${this.period}`},
    //   {data: this.prev_period, label: `Previous ${this.period}`}
    // ];
    this.chartData = [
      {
          "data": {
              "Monday": 116,
              "Tuesday": 63,
              "Wednesday": 36,
              "Thursday": 0,
              "Friday": 23,
              "Saturday": 33,
              "Sunday": 60
          },
          "label": "Current week"
      },
      {
          "data": {
              "Monday": 79,
              "Tuesday": 37,
              "Wednesday": 78,
              "Thursday": 116,
              "Friday": 35,
              "Saturday": 60,
              "Sunday": 56
          },
          "label": "Previous week"
      }
  ]
    console.log(this.chartData);
  }

}
