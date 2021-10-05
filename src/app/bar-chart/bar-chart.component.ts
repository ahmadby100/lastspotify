import { Component, OnInit, Input } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { gOffset, ROOT_URL, getDate } from "../global";
import * as $ from 'jquery';

import { daily_plays } from '../types'

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
  datastate: boolean = false;
  
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

  getChartData = async():  /* { curr: Object; prev: Object; state: boolean} */ Promise<void> => {
    // let daily_scrobbles: any = { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 };
		// let week_daily_scrobbles: any = { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 };
		// for (let i in daily_scrobbles) daily_scrobbles[i] = 0;
		// for (let j in week_daily_scrobbles) week_daily_scrobbles[j] = 0;

		// if (gOffset == 1)
		// 	$("#next_period").removeClass("text-gray-500 cursor-pointer").addClass("text-grey-300");
		// else
		// 	$("#next_period").addClass("text-gray-500 cursor-pointer").removeClass("text-gray-300");

    

    
    // return this.dailyPlays.daily_plays(this.offset, this.period, this.datastate);
    this.dailyPlays.daily_plays(this.offset, this.period)
      .subscribe((obj: daily_plays) => {
        this.curr_period = obj.curr;
        this.prev_period = obj.prev;
        let newData = [
          {"data": this.curr_period, "label": `Current ${this.period}`},
          {"data": this.prev_period, "label": `Previous ${this.period}`}
        ];
        let clone = JSON.parse(JSON.stringify(this.chartData));
        clone = newData;
        this.chartData = clone;
        console.log(this.chartData);
        
      });
      setTimeout(() => {
        this.datastate = true;
      }, 4000) 
  } 
  
  chartData: {data: Object, label: string}[] = [];
  

  constructor(private dailyPlays: DailyPlaysService) {
    this.getChartData();
    console.log(this.chartData);
    
    console.log(this.datastate);
    
   
    //   this.chartData = [
    //     {
    //         "data": {
    //             "Monday": 116,
    //             "Tuesday": 63,
    //             "Wednesday": 36,
    //             "Thursday": 0,
    //             "Friday": 23,
    //             "Saturday": 33,
    //             "Sunday": 60
    //         },
    //         "label": "Current week"
    //     },
    //     {
    //         "data": {
    //             "Monday": 79,
    //             "Tuesday": 37,
    //             "Wednesday": 78,
    //             "Thursday": 116,
    //             "Friday": 35,
    //             "Saturday": 60,
    //             "Sunday": 56
    //         },
    //         "label": "Previous week"
    //     }
    // ]
   }



  ngOnInit(): void {
    
  }

}
