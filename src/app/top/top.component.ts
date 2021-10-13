import { Component, Input, OnInit } from '@angular/core';
import { DailyPlaysService } from '../daily-plays.service';
import { period, offset } from '../global';
import { Top } from '../types';

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

  updateTop = (data: Top) => {
    // const d = { ...data};
    // console.log("Updating Top");
    // this.top_track = d.track.top.title;
    // this.top_track_artist = data.track.top.artist;
    // this.top_track_plays = data.track.top.plays;
    // this.top_track_plays = data.track.top.plays;
    // this.top_track_img = data.track.top.img;
    
    // this.top_album = data.album.top.title;
    // this.top_album_artist = data.album.top.artist;
    // this.top_album_plays = data.album.top.plays;
    // this.top_album_img = data.album.top.img;

    // this.top_artist = d.artist.top.artist;
    // this.top_artist_plays = data.artist.top.plays;
    // this.top_artist_img = data.artist.top.img;

    // console.log(this);
  }

  constructor(private service: DailyPlaysService) {
    this.service.period_change.subscribe(async(val) => {
      console.log(`Period update from app-top: ${val}`);
      // const top_data: Top = await this.service.top(val, 1);
      this.service.top2("track", val, 1);
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
