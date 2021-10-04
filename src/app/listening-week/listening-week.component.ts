import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import Chart from 'chart.js/auto';
import { gOffset, ROOT_URL, getDate } from "../global";

import { DBResponse, DB_tracksplayed } from "../types"

@Component({
  selector: 'app-listening-week',
  templateUrl: './listening-week.component.html',
  styleUrls: ['./listening-week.component.css']
})
export class ListeningWeekComponent implements OnInit {

  title = 'Listening Week';

  daily_plays = (offset: number, period: string): void => {
    let daily_scrobbles: any = {mon: 0, tue: 0, wed: 0, thr: 0, fri: 0, sat: 0, sun: 0};
    let week_daily_scrobbles: any = {mon: 0, tue: 0, wed: 0, thr: 0, fri: 0, sat: 0, sun: 0};
    for (let i in daily_scrobbles) daily_scrobbles[i] = 0;
    for (let j in week_daily_scrobbles) week_daily_scrobbles[j] = 0;

    if (gOffset == 1) 
      $("#next_period").removeClass("text-gray-500 cursor-pointer").addClass("text-grey-300");
    else 
      $("#next_period").addClass("text-gray-500 cursor-pointer").removeClass("text-gray-300");
    
      $.ajax({
        url: `${ROOT_URL}/tracksplayed/${period}/${offset}`,
        crossDomain: true,
        success: (resp: DBResponse) => {
          
          (resp.requestParams.period.from == "Beginning") ? $("#time_period").html("11 Nov 2018") : $("#time_period").html(`${getDate(resp.requestParams.period.from)} - ${getDate(resp.requestParams.period.to)}`)
          for (let i = 0; i < resp.results.length; i++) {
            switch (resp.results[i].weekday) {
              case "Monday":
                  daily_scrobbles.mon++;
                  break;
              case "Tuesday":
                  daily_scrobbles.tue++;
                  break;
              case "Wednesday":
                  daily_scrobbles.wed++;
                  break;
              case "Thursday":
                  daily_scrobbles.thr++;
                  break;
              case "Friday":
                  daily_scrobbles.fri++;
                  break;
              case "Saturday":
                  daily_scrobbles.sat++;
                  break;
              case "Sunday":
                  daily_scrobbles.sun++;
                  break;
              default:
                  break;
          }
         }
         let most_days = Object.keys(daily_scrobbles).reduce((a, b) => daily_scrobbles[a] > daily_scrobbles[b] ? a : b);
         switch (most_days) {
          case "mon":
              most_days = "Monday";
              break;
          case "tue":
              most_days = "Tueday";
              break;
          case "wed":
              most_days = "Wednesday";
              break;
          case "thr":
              most_days = "Thursday";
              break;
          case "fri":
              most_days = "Friday";
              break;
          case "sat":
              most_days = "Saturday";
              break;
          case "sun":
              most_days = "Sunday";
              break;
          default: break;
          }
          $("#most_listens").html(`${most_days}s`);
          $("#week_scrobbles").html(resp.results.length.toString());
          if (period == "all") {
            // initChart(daily_scrobbles, null);

          } else {
            $.ajax({
              url: `${ROOT_URL}/tracksplayed/${period}/${offset + 1}`,
              crossDomain: true,
              success: (resp2: DBResponse): void => {
                for (let j = 0; j < resp2.results.length; j++) {
                  switch (resp2.results[j].weekday) {
                    case "Monday":
                                    prev_daily_scrobbles.mon++;
                                    break;
                                case "Tuesday":
                                    prev_daily_scrobbles.tue++;
                                    break;
                                case "Wednesday":
                                    prev_daily_scrobbles.wed++;
                                    break;
                                case "Thursday":
                                    prev_daily_scrobbles.thr++;
                                    break;
                                case "Friday":
                                    prev_daily_scrobbles.fri++;
                                    break;
                                case "Saturday":
                                    prev_daily_scrobbles.sat++;
                                    break;
                                case "Sunday":
                                    prev_daily_scrobbles.sun++;
                                    break;
                                default:
                                    break;
                  }
                }
              }
            })
          }
            
        }
      });

    };

  d = this.daily_plays(1, "week");

  constructor() { }

  ngOnInit(): void {
  }

}
