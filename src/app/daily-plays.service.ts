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
	local_period: string = "week";
	period_change: Subject<string> = new Subject<string>();
	offset_change: Subject<number> = new Subject<number>();
	local_offset: number = 1;
	constructor(private http: HttpClient) {
		this.period_change.subscribe(val => {
			this.local_period = val;
			console.log(`Period Changed to "${this.local_period}" in service`);
		})
		this.offset_change.subscribe(val => {
			this.local_offset = val;
			console.log(`Offset Changed to "${this.local_offset}" in service`);
		})
	}
	alertChanges(type: string) {
		if (type == "period")
			this.period_change.next(this.local_period);
		if (type == "offset") 
			this.offset_change.next(this.local_offset);
		
	}
	updateSettings(period: string, offset: number) {
		if (this.local_period != period) {
			this.local_period = period;
			this.alertChanges("period")
			console.log(`Period Changed to "${this.local_period}" in service`);
		}
		if (this.local_offset != offset) {
			this.local_offset = offset;
			this.alertChanges("offset");
			console.log(`Offset Changed to "${this.local_offset}" in service`);
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


	top2 = (type: string, period: string, offset: number): Observable<any> => {
		const nullartwork = "assets/img/musical-note.svg";
		let j = this.http.get<any>(`${ROOT_URL}/top/${type}/${period}/${offset}`)
		console.log(j);
		return j;	
	}
	top = (period: string, offset: number): any => {
		const nullartwork = "assets/img/musical-note.svg";
		let top_data: Top = {
			track: {
				top: {
					title: '',
					artist: '',
					plays: 0,
					img: ''
				},
				next: []
			},
			artist: {
				top: {
					title: '',
					artist: '',
					plays: 0,
					img: ''
				},
				next: []
			},
			album: {
				top: {
					title: '',
					artist: '',
					plays: 0,
					img: ''
				},
				next: []
			}
		};

		$.ajax({
			url: `${ROOT_URL}/top/track/${period}/${offset}`,
			crossDomain: true,
			success: data => {
				top_data.track.top.title = data.results[0].track;
				top_data.track.top.artist = data.results[0].artist;
				top_data.track.top.plays = data.results[0].plays;
				
				// $("#top_track").html(data.results[0].track);
				(data.requestParams.period.from == "Beginning") ? $("#time_period").html(`11 Nov 2018 - ${getDate(data.requestParams.period.to)}`) : $("#time_period").html(`&nbsp;${getDate(data.requestParams.period.from)} - ${getDate(data.requestParams.period.to)}`);
				// $("#top_track_artist").html(data.results[0].artist);
				if (data.results[0].album_image == null) {
					$("#top_track_img").attr("src", nullartwork);
					$("#top_track_img").addClass("bg-gray-300");
				}
				else {
					top_data.track.top.img = data.results[0].album_image;
					$("#top_track_img").attr("src", data.results[0].album_image);
				}
				
				// $("#top_track_plays").html(data.results[0].plays + " plays");
				
				for (let k = 1; k <= 10; k++) {
					let i = k - 1
					let temp = {
						title: data.results[k].track,
						artist: data.results[k].track,
						plays: data.results[k].plays,
						img: nullartwork
					}
					$(`#${k + 1}_track`).html(data.results[k].track);
					$(`#${k + 1}_track_artist`).html(data.results[k].artist);
					if (data.results[k].album_image == null) {
						$(`#${k + 1}_track_img`).addClass("bg-gray-300");
						$(`#${k + 1}_track_img`).attr("src", nullartwork);
					}
					else {
						$(`#${k + 1}_track_img`).attr("src", data.results[k].album_image);
						temp.img = data.results[k].album_image;
					}
					top_data.track.next.push(temp);
				}
			}
		});
		$.ajax({
			url: `${ROOT_URL}/top/album/${period}/${offset}`,
			crossDomain: true,
			success: (data) => {
				top_data.album.top.title = data.results[0].album;
				top_data.album.top.artist = data.results[0].artist;
				top_data.album.top.plays = data.results[0].plays;

				// $("#top_album").html(data.results[0].album);
				// $("#top_album_artist").html(data.results[0].artist);
				$("#top_album_img").attr("src", data.results[0].album_image);
				// $("#top_album_plays").html(data.results[0].plays + " plays");
				for (let k = 1; k <= 10; k++) {
					let temp = {
						title: data.results[k].album,
						artist: data.results[k].artist,
						plays: data.results[k].plays,
						img: nullartwork
					}
					$(`#${k + 1}_album`).html(data.results[k].album);
					$(`#${k + 1}_album_artist`).html(data.results[k].artist);
					if (data.results[k].album_image == null) {
						$(`#${k + 1}_album_img`).addClass("bg-gray-300");
						$(`#${k + 1}_album_img`).attr("src", nullartwork);
					}
					else {
						$(`#${k + 1}_album_img`).attr("src", data.results[k].album_image);
						temp.img = data.results[k].album_image;
					}
					top_data.album.next.push(temp);
				}
			}
		});
		$.ajax({
			url: `${ROOT_URL}/top/artist/${period}/${offset}`,
			crossDomain: true,
			success: (data) => {				
				top_data.artist.top.artist = data.results[0].artist;
				top_data.artist.top.plays = data.results[0].plays;

				$("#top_artist_img").attr("src", data.results[0].artist_image);
				// $("#top_artist_plays").html(data.results[0].plays + " plays");
				for (let k = 1; k <= 10; k++) {
					let temp = {
						title: data.results[k].artist,
						artist: data.results[k].artist,
						plays: data.results[k].plays,
						img: nullartwork
					}
					$(`#${k + 1}_artist`).html(data.results[k].artist);
					if (data.results[k].artist_image == null || data.results[k].artist_image == undefined) {
						$(`#${k + 1}_artist_img`).attr("src", nullartwork);
						$(`#${k + 1}_artist_img`).addClass("bg-gray-300");
					}
					else {
						$(`#${k + 1}_artist_img`).attr("src", data.results[k].artist_image);
						temp.img = data.results[k].album_image;
					}
					top_data.artist.next.push(temp);
				}
			}
		})
		
		console.log(top_data);
		return top_data;
	}
	private eventCallback = new Subject<string>();
	
	highlights = (period: string, offset: number) => {
		let curr: number = 0;
		let prev: number = 0;
		$.ajax({
			url: `${ROOT_URL}/duration/${period}/${offset}`,
			success: data => {
				console.log(data);
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
			// console.log(percent);
			if (percent < 0) {
				percent = -percent;
				$(`#highlights_${type}_arrow`).removeClass("rotate-180");
			}
			$(`#highlights_${type}_percent`).html(`${percent}%`);
		}
	};
}
