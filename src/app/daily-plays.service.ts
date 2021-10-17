import { Injectable } from '@angular/core';
import { gOffset, ROOT_URL, getDate, logger } from "./global";
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';

import { DBResponse, Discoveries, Highlights } from "./types";
import { Observable, of, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DailyPlaysService {
	constructor(private http: HttpClient) {}

	public get getPeriod() : string {
		return this.local_period;
	}
	public get getOffset() : number {
		return this.local_offset;
	}

	period_change: Subject<string> = new Subject<string>();
	offset_change: Subject<number> = new Subject<number>();

	curr_date: Subject<string> = new Subject<string>();

	local_period: string = "week";
	local_offset: number = 1;

	// Component Functions
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
	};

	highlights = async (period: string, offset: number): Promise<Highlights> => {
		const curr_plays = await this.http.get<DBResponse>(`${ROOT_URL}/plays/${period}/${offset}`).toPromise();
		const curr_time = await this.http.get<DBResponse>(`${ROOT_URL}/duration/${period}/${offset}`).toPromise();
		const curr_active = await this.http.get<DBResponse>(`${ROOT_URL}/activehour/${period}/${offset}`).toPromise();

		if (this.local_period != "all") {
			const prev_plays = await this.http.get<DBResponse>(`${ROOT_URL}/plays/${period}/${offset + 1}`).toPromise();
			const prev_time = await this.http.get<DBResponse>(`${ROOT_URL}/duration/${period}/${offset +  1}`).toPromise();
			const prev_active = await this.http.get<DBResponse>(`${ROOT_URL}/activehour/${period}/${offset + 1}`).toPromise();
			return {
				curr_active: curr_active,
				curr_plays: curr_plays,
				curr_time: curr_time,
				prev_active: prev_active,
				prev_time: prev_time,
				prev_plays: prev_plays
			}
		} else {
			return {
				curr_active: curr_active,
				curr_plays: curr_plays,
				curr_time: curr_time
			}
		}
	};

	discoveries = async (period: string, offset: number): Promise<Discoveries> => {
		const curr_tracks = await this.http.get<DBResponse>(`${ROOT_URL}/new/track/${period}/${offset}`).toPromise();
		const curr_albums = await this.http.get<DBResponse>(`${ROOT_URL}/new/album/${period}/${offset}`).toPromise();
		const curr_artists = await this.http.get<DBResponse>(`${ROOT_URL}/new/artist/${period}/${offset}`).toPromise();

		const curr_track_plays = await this.http.get<DBResponse>(`${ROOT_URL}/totalnew/track/${period}/${offset}`).toPromise();
		const curr_album_plays = await this.http.get<DBResponse>(`${ROOT_URL}/totalnew/album/${period}/${offset}`).toPromise();
		const curr_artist_plays = await this.http.get<DBResponse>(`${ROOT_URL}/totalnew/artist/${period}/${offset}`).toPromise();


		if (this.local_period != "all") {
			const prev_track_plays = await this.http.get<DBResponse>(`${ROOT_URL}/totalnew/track/${period}/${offset + 1}`).toPromise();
			const prev_album_plays = await this.http.get<DBResponse>(`${ROOT_URL}/totalnew/album/${period}/${offset + 1}`).toPromise();
			const prev_artist_plays = await this.http.get<DBResponse>(`${ROOT_URL}/totalnew/artist/${period}/${offset + 1}`).toPromise();

			return {
					track: {
						plays: curr_track_plays,
						data: curr_tracks,
						prev: prev_track_plays
					},
					album: {
						plays: curr_album_plays,
						data: curr_albums,
						prev: prev_album_plays
					},
					artist: {
						plays: curr_artist_plays,
						data: curr_artists,
						prev: prev_artist_plays
					},
			}
		}
		return {
				track: {
					plays: curr_track_plays,
					data: curr_tracks
				},
				album: {
					plays: curr_album_plays,
					data: curr_albums
				},
				artist: {
					plays: curr_artist_plays,
					data: curr_artists
				}
		}
	};

	// Settings Functions
	alertChanges(type: string) {
		if (type == "period")
			this.period_change.next(this.local_period);
		if (type == "offset")
			this.offset_change.next(this.local_offset);

	}
	updateSettings(period: string, offset: number) {
		logger("Service [Main]", `Received Settings {"period": ${period}, "offset": ${offset}}`, "lightblue");
		if (this.local_period != period) {
			this.local_period = period;
			logger("Service [Main]", `Period Changed to "${this.local_period}"`, "lightblue");
			this.alertChanges("period")
		}
		if (this.local_offset != offset) {
			this.local_offset = offset;
			logger("Service [Main]", `Offset Changed to "${this.local_offset}" in service`, "lightblue");
			this.alertChanges("offset");
		}
	};

	// Misc Functions
	setDate(from: string, to: string) {
		let date = `${getDate(from)} - ${getDate(to)}`;
		if (from == "Beginning") {
			date = `11 Nov 2018 - ${getDate(to)}`;
		}
		this.curr_date.next(date);
	}
}
