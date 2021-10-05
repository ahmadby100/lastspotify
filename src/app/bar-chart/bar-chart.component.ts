import { Component, OnInit, Input } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Input() curr_period: any;
  @Input() prev_period: any;
  @Input() period: string | undefined;

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
          position: "left"
        }
      }
    }
  }
  chartLabels: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  chartType: ChartType = "bar";
  chartLegend = false;
  
  chartData: ChartDataset[] = []

  constructor() { }

  ngOnInit(): void {
    this.chartData = [
      {data: this.curr_period, label: `Current ${this.period}`},
      {data: this.prev_period, label: `Previous ${this.period}`},
      
    ]
  }

}
