import { Component, Input, OnInit } from '@angular/core';
import { DailyPlaysService } from '../daily-plays.service';
import { period, offset } from '../global';
import { DBResponse, Top } from '../types';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  @Input() newPeriod: string = '';

  initTop = (period: string, offset: number) => {
    this.service.top(period, offset);
  }

  top_artist = '';
  top_track = '';
  top_album = '';
  top_album_artist = '';
  top_track_artist = '';
  top_artist_plays = 0;
  top_album_plays = 0;
  top_track_plays = 0;
  top_track_img = '';
  top_album_img = '';
  top_artist_img = '';

  updateTop = (data: DBResponse, type: string) => {
    // const d = { ...data};
    console.log("Updating Top");
    if (type == "track") {
      this.top_track = data.results[0].track || '';
      this.top_track_artist = data.results[0].artist || '';
      this.top_track_plays = data.results[0].plays || 0;
      this.top_track_img = data.results[0].album_image || '';
    }
    if (type == "album") {
      this.top_album = data.results[0].album || '';
      this.top_album_artist = data.results[0].artist || '';
      this.top_album_plays = data.results[0].plays || 0;
      this.top_album_img = data.results[0].album_image || '';
    }
    if (type == "artist") {
      this.top_artist = data.results[0].artist || '';
      this.top_artist_plays = data.results[0].plays || 0;
      this.top_artist_img = data.results[0].artist_image || ''; 
    }
  }

  constructor(private service: DailyPlaysService) {
    this.service.period_change.subscribe(async(val) => {
      console.log(`Period update from app-top: ${val}`);
      // const top_data: Top = await this.service.top(val, 1);
      this.service.top2("track", val, 1).subscribe((data) => this.updateTop(data, "track"));
      this.service.top2("album", val, 1).subscribe((data) => this.updateTop(data, "album"));
      this.service.top2("artist", val, 1).subscribe((data) => this.updateTop(data, "artist"));
      // while (top_data.)
      // setTimeout(() => this.updateTop(top_data), 1000);
      // this.updateTop(top_data);
      // console.log(top_data);

    })
   }

  ngOnInit(): void {
    this.initTop(period, offset);
  }

}
