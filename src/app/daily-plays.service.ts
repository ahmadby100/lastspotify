import { Injectable } from '@angular/core';
import { gOffset, ROOT_URL, getDate } from "./global";
import * as $ from 'jquery';

import { DBResponse } from "./types";
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DailyPlaysService {

  constructor() { }
	daily_plays = (period: "week" | "month" | "year" | "all", offset: number): Observable<{curr: Object, prev: Object }> => {

		let daily_scrobbles: any = { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 };
		let week_daily_scrobbles: any = { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 };
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
				(resp.requestParams.period.from == "Beginning") ? $("#time_period").html(`11 Nov 2018 - ${getDate(resp.requestParams.period.to)}`) : $("#time_period").html(`&nbsp;${getDate(resp.requestParams.period.from)} - ${getDate(resp.requestParams.period.to)}`)
				for (let i = 0; i < resp.results.length; i++) {
					switch (resp.results[i].weekday) {
						case "Monday":
							daily_scrobbles.Monday++;
							break;
						case "Tuesday":
							daily_scrobbles.Tuesday++;
							break;
						case "Wednesday":
							daily_scrobbles.Wednesday++;
							break;
						case "Thursday":
							daily_scrobbles.Thursday++;
							break;
						case "Friday":
							daily_scrobbles.Friday++;
							break;
						case "Saturday":
							daily_scrobbles.Saturday++;
							break;
						case "Sunday":
							daily_scrobbles.Sunday++;
							break;
						default:
							break;
					}
				}
				let most_days = Object.keys(daily_scrobbles).reduce((a, b) => daily_scrobbles[a] > daily_scrobbles[b] ? a : b);
				switch (most_days) {
					case "Monday":
						most_days = "Monday";
						break;
					case "Tuesday":
						most_days = "Tuesday";
						break;
					case "Wednesday":
						most_days = "Wednesday";
						break;
					case "Thursday":
						most_days = "Thursday";
						break;
					case "Friday":
						most_days = "Friday";
						break;
					case "Saturday":
						most_days = "Saturday";
						break;
					case "Sunday":
						most_days = "Sunday";
						break;
					default: break;
				}
				$("#most_listens").html(`${most_days}${(period == "week") ? " " : "s"} `);
				$("#week_scrobbles").html(resp.results.length.toString());

				if (period != "all") {
					$.ajax({
						url: `${ROOT_URL}/tracksplayed/${period}/${offset + 1}`,
						crossDomain: true,
						success: (resp2: DBResponse): void => {
							for (let j = 0; j < resp2.results.length; j++) {
								switch (resp2.results[j].weekday) {
									case "Monday":
										week_daily_scrobbles.Monday++;
										break;
									case "Tuesday":
										week_daily_scrobbles.Tuesday++;
										break;
									case "Wednesday":
										week_daily_scrobbles.Wednesday++;
										break;
									case "Thursday":
										week_daily_scrobbles.Thursday++;
										break;
									case "Friday":
										week_daily_scrobbles.Friday++;
										break;
									case "Saturday":
										week_daily_scrobbles.Saturday++;
										break;
									case "Sunday":
										week_daily_scrobbles.Sunday++;
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
	return of({
		curr: daily_scrobbles,
		prev: week_daily_scrobbles
	})
	};

	top = (period: "week" | "month" | "year" | "all", offset: number): any => {
		const nullartwork = "/src/assets/img/musical-note.svg";
		$.ajax({
			url: `${ROOT_URL}/top/track/${period}/${offset}`,
			success: data => {
				$("#top_track").html()
			}
		})
	}
}
