import { Component, OnInit } from '@angular/core';
import { DailyPlaysService } from '../daily-plays.service';
import { offset, period } from '../global';
import { Discoveries } from '../types';

@Component({
  selector: 'app-discoveries',
  templateUrl: './discoveries.component.html',
  styleUrls: ['./discoveries.component.css']
})
export class DiscoveriesComponent implements OnInit {
  private css = "color: yellow;"
  private logdiscoveries = (log: string) => {
    console.log(`%cDiscoveries: ${log}`, this.css);
  }
  nullartwork = "assets/img/musical-note.svg";
  discoveries_period = period;
  discoveries_offset = offset;

  constructor(private service: DailyPlaysService) {
    this.service.period_change.subscribe(async period => {
      this.logdiscoveries(`Period Update: ${period}`);
      this.discoveries_period = period;
      const discoveries = await this.service.discoveries(period, 1);
      this.updateDiscoveries(discoveries);
    });
    this.service.offset_change.subscribe(async offset => {
      this.logdiscoveries(`Offset Update: ${offset}`);
      this.discoveries_offset = offset;
      const discoveries = await this.service.discoveries(this.service.getPeriod, offset);
      this.updateDiscoveries(discoveries);
    })
  }
   
  track = {
    title: '',
    artist: '',
    img: this.nullartwork,
    plays: 0,
    prev: 0,
    percent: 0
  }
  artist = {
    title: '',
    img: this.nullartwork,
    plays: 0,
    prev: 0,
    percent: 0
  };
  album = {
    title: '',
    artist: '',
    img: this.nullartwork,
    plays: 0,
    prev:0,
    percent: 0
  }

  updateDiscoveries = (data: Discoveries) => {   
    if (data.track.data.results.length != 0) {
      this.track.title = data.track.data.results[0].rtype!;
      this.track.artist = data.track.data.results[0].artist!;
      this.track.img = data.track.data.results[0].img!;
    }
    this.track.plays = data.track.plays.results[0].plays!;
    
    if (data.album.data.results.length != 0) {
      this.album.title = data.album.data.results[0].rtype!;
      this.album.artist = data.album.data.results[0].artist!;
      this.album.img = data.album.data.results[0].img!;
    }
    this.album.plays = data.album.plays.results[0].plays!;
    
    if (data.artist.data.results.length != 0) {
      this.artist.title = data.artist.data.results[0].artist!;
      this.artist.img = data.artist.data.results[0].img!;
    }
    this.artist.plays = data.artist.plays.results[0].plays!;

    if (this.service.getPeriod != "all") {
      this.track.prev = data.track.prev!.results[0].plays!;
      this.album.prev = data.album.prev!.results[0].plays!;
      this.artist.prev = data.artist.prev!.results[0].plays!;

      this.track.percent = this.calcPercent(this.track.plays, this.track.prev);
      this.artist.percent = this.calcPercent(this.artist.plays, this.artist.prev);
      this.album.percent = this.calcPercent(this.album.plays, this.album.prev);
    }
  }

  calcPercent = (curr: number, prev: number): number => (Math.round(((curr / prev) - 1) * 100) == Infinity) ? 100 : Math.round(((curr / prev) - 1) * 100);

  ngOnInit(): void {
  }

}
