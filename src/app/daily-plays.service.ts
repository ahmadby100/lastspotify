import { Injectable } from '@angular/core';
import { gOffset, ROOT_URL, getDate, period, offset } from "./global";
import * as $ from 'jquery';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DBResponse, Single, Top } from "./types";
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DailyPlaysService {
	constructor(private http: HttpClient) {}
	
	private css = "color: lightblue;";
	local_period: string = "week";
	period_change: Subject<string> = new Subject<string>();
	offset_change: Subject<number> = new Subject<number>();
	curr_date: Subject<string> = new Subject<string>();
	local_offset: number = 1;

	private logservice = (log: any) => {
		console.log(`%cService: ${log}`, this.css);	
	}
	
	
	public get getPeriod() : string {
		return this.local_period;
	}
	
	public get getOffset() : number {
		return this.local_offset;
	}
	
	

	alertChanges(type: string) {
		if (type == "period")
			this.period_change.next(this.local_period);
		if (type == "offset") 
			this.offset_change.next(this.local_offset);
		
	}
	updateSettings(period: string, offset: number) {
		this.logservice(`Received Settings {"period": ${period}, "offset": ${offset}} from header`);
		if (this.local_period != period) {
			this.local_period = period;
			this.logservice(`Period Changed to "${this.local_period}"`);
			this.alertChanges("period")
		}
		if (this.local_offset != offset) {
			this.local_offset = offset;
			this.logservice(`Offset Changed to "${this.local_offset}" in service`);
			this.alertChanges("offset");
		}
	}

	daily_plays = (period: string, offset: number): Observable<{curr: Object, prev: Object}> => {

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

	setDate(from: string, to: string) {
		let date = `${getDate(from)} - ${getDate(to)}`;
		if (from == "Beginning") {
			date = `11 Nov 2018 - ${getDate(to)}`;
		}
		this.curr_date.next(date);
	}


	top = async (period: string, offset: number): Promise<{track: DBResponse, album: DBResponse, artist: DBResponse}> => {
		const track = await this.http.get<DBResponse>(`${ROOT_URL}/top/track/${period}/${offset}`).toPromise();
		const album = await this.http.get<DBResponse>(`${ROOT_URL}/top/album/${period}/${offset}`).toPromise();
		const artist = await this.http.get<DBResponse>(`${ROOT_URL}/top/artist/${period}/${offset}`).toPromise();

		this.setDate(track.requestParams.period.from,track.requestParams.period.to);

		return {
			track: track,
			album: album,
			artist: artist
		}
	}
	private eventCallback = new Subject<string>();
	
	highlights = (period: string, offset: number) => {
		let curr: number = 0;
		let prev: number = 0;
		$.ajax({
			url: `${ROOT_URL}/duration/${period}/${offset}`,
			success: data => {
				this.logservice(data);
				let timeplayed = data.results[0].time_played.split(":");
				let hour = parseInt(timeplayed[0]);
				curr = hour;
				if (hour >= 24) {
					let day: string;
					(hour / 24 > 2) ? day = " Days, " : day = " Day, ";
					$("#highlights_listen").html(`${Math.round(hour / 24)}${day}${Math.round((hour / 24 - Math.floor(hour / 24)) * 24)} Hours`)
					
				} else 
					$("#highlights_listen").html(`${hour} Hours`);			
			}
		});
		if (period != "all")
        $.ajax({
            url: `${ROOT_URL}/duration/${period}/${offset + 1}`,
            success: data => {
                $("#highlights_prev_listen").show();
				let timeplayed = data.results[0].time_played.split(":");
				let hour = parseInt(timeplayed[0]);
				prev = hour;
                $("#listen2").html(hour.toString());
				if (hour >= 24) {
					let day: string;
					(hour / 24 > 2) ? day = " Days, " : day = " Day, ";
					$("#highlights_last_listen").html(`${Math.round(hour / 24)}${day}${Math.round((hour / 24 - Math.floor(hour / 24)) * 24)} Hours`)
				} else 
					$("#highlights_last_listen").html(`${hour} Hours`);	
                this.calcPercent("last_listen");
            }
        });

	}

	// Misc Functions
	percentCount = 0;
	calcPercent = (type: string) => {
		this.percentCount++;
		if (this.percentCount == 2) {
			this.percentCount = 0;
			let val1 = parseInt($(`#${type}1`).html());
			let val2 = parseInt($(`#${type}2`).html());
			let percent = (val1 - val2) / val2 * 100;
			// this.logservice(percent);
			if (percent < 0) {
				percent = -percent;
				$(`#highlights_${type}_arrow`).removeClass("rotate-180");
			}
			$(`#highlights_${type}_percent`).html(`${percent}%`);
		}
	};
}
