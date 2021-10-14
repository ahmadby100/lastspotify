import { Component, Input, OnInit } from '@angular/core';
import { DailyPlaysService } from '../daily-plays.service';
import { period, offset } from '../global';
import { DBResponse, Next, Top, TopType } from '../types';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
  private css = "color: lightgreen;"
  private logtop = (log: any) => {
		console.log(`%cTop: ${log}`, this.css);	
	}

  nullartwork = "assets/img/musical-note.svg";

  initTop = (period: string, offset: number) => {
    // this.service.top(period, offset);
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

  next: Next = {
    track: [],
    album: [],
    artist: []
  }

  updateTop = (data: {track: DBResponse, album: DBResponse, artist: DBResponse}): void => {
    this.top_track = data.track.results[0].track!;
    this.top_track_artist = data.track.results[0].artist!;
    this.top_track_plays = data.track.results[0].plays!;
    this.top_track_img = data.track.results[0].album_image || this.nullartwork;
    
    this.top_album = data.album.results[0].album!;
    this.top_album_artist = data.album.results[0].artist!;
    this.top_album_plays = data.album.results[0].plays!;
    this.top_album_img = data.album.results[0].album_image!;

    this.top_artist = data.artist.results[0].artist!;
    this.top_artist_plays = data.artist.results[0].plays!;
    this.top_artist_img = data.artist.results[0].artist_image!;

    this.next.artist = []
    this.next.track = []
    this.next.album = []

    for (let i = 1; i < 5; i++) {
      let temp = {
        title: '',
        artist: '',
        plays: 0,
        img: this.nullartwork
      }
      temp.title = data.track.results[i].track!;
      temp.artist = data.track.results[i].artist!;
      temp.plays = data.track.results[i].plays!;
      temp.img = data.track.results[i].album_image|| this.nullartwork;
      this.next.track.push(temp);
    }
    for (let i = 1; i < 5; i++) {
      let temp = {
        title: '',
        artist: '',
        plays: 0,
        img: this.nullartwork
      }
      temp.title = data.album.results[i].album!;
      temp.artist = data.album.results[i].artist!;
      temp.plays = data.album.results[i].plays!;
      temp.img = data.album.results[i].album_image|| this.nullartwork;
      this.next.album.push(temp);
    }
    for (let i = 1; i < 5; i++) {
      let temp = {
        artist: '',
        plays: 0,
        img: this.nullartwork
      }
      temp.artist = data.artist.results[i].artist!;
      temp.plays = data.artist.results[i].plays!;
      temp.img = data.artist.results[i].artist_image|| this.nullartwork;
      this.next.artist.push(temp);
    }
  }

  constructor(private service: DailyPlaysService) {
    this.service.period_change.subscribe(async (period) => {
      this.logtop(`Period Update: ${period}`);
      const top_data = await this.service.top(period, 1);
      this.updateTop(top_data);
    });
    this.service.offset_change.subscribe(async (offset) => {
      this.logtop(`Offset Update: ${offset}`);
      const top_data = await this.service.top(this.service.getPeriod, offset);
      this.updateTop(top_data);
    });
   }

  ngOnInit(): void {
    this.initTop(period, offset);
  }

}
