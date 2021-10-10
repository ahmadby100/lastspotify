import { Component, OnInit, Input, ViewChild, SimpleChange, SimpleChanges } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { gOffset, ROOT_URL, getDate, offset } from "../global";
import { Subscription } from 'rxjs'
import * as $ from 'jquery';

import { daily_plays } from '../types'

import { DailyPlaysService } from '../daily-plays.service'
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  curr_period: Object = {};
  prev_period: Object | null | undefined;
  // period: string = "week";
  // offset: number = 1;
  datastate: boolean = false;
  refreshInt = 1;

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  @Input('period') period: string = "week";
  @Input('offset') offset: number = 1;

  
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
  chartData: any[] = [
    {
      "data": {Monday: 0, Tuesday: 10, Wednesday: 20, Thursday: 30, Friday: 40, Saturday: 50, Sunday: 60}, 
      "label": "Current "
    },
    {
      "data": {Monday: 0, Tuesday: 10, Wednesday: 20, Thursday: 30, Friday: 40, Saturday: 50, Sunday: 60}, 
      "label": "Previous"
    }
  ];

  subscription!: Subscription;
  getChartData = (period: string, offset: number): boolean => {  
    this.subscription = this.service.daily_plays(period, offset)
      .subscribe((obj: daily_plays): boolean => {
        this.curr_period = obj.curr;
        this.prev_period = obj.prev;
        let newData = [
          {"data": this.curr_period, "label": `Current ${this.period}`},
          {"data": this.prev_period, "label": `Previous ${this.period}`}
        ];

        this.chartData = newData;
        console.log(this.chartData);
        
        while (this.datastate) {
          if (!$.isEmptyObject(this.chartData[0]) && !$.isEmptyObject(this.chartData[1])) this.datastate = true;
        }
        
        setTimeout(() => {
          this.datastate = true;
          console.log(this.chart)

        }, 5000);
        return true;
      });
    this.subscription.unsubscribe();
    return true;
  } 
  updateChart = (period: string, offset: number) => {
    this.chart.chart?.update("hide");
    console.log("Prev Data:",this.chartData[0].data);
    this.subscription = this.service.daily_plays(period, offset).subscribe((obj: daily_plays) => {
      this.curr_period = obj.curr;
      this.prev_period = obj.prev;
      let newData = [
        {"data": this.curr_period, "label": `Current ${this.period}`},
        {"data": this.prev_period, "label": `Previous ${this.period}`}
      ]
      this.chartData = newData;
      console.log("New Data:", this.chartData);
      console.log(this.chart.chart?.update("show"));
      this.chartData = [null];
      this.chartData = newData;
      this.chart.update();
    });
    console.log("Updating Chart");
    this.chart.chart?.update();
    this.subscription.unsubscribe();
  }
  
  
  test(period: string, offset: number) { console.log({period, offset})}

  constructor(private service: DailyPlaysService) {
    this.service.period_change.subscribe(val => {
      console.log(`Period update from app-bar-chart: ${val}`);
      this.period = val;
      this.updateChart(this.period, 1);
      console.log(`Running UpdateChart Function`);
      this.chart.update();

    })

   }


  ngOnInit(): void {
    this.getChartData(this.period, this.offset);
    setTimeout(() => console.log(this.chart), 10000)
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
