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


  constructor(private service: DailyPlaysService) {
    this.service.period_change.subscribe(val => {
      console.log(`Period update from app-top: ${val}`);
      let top_data: Top = this.service.top(val, 1);
      this.top_track = top_data.track.top.title;
      console.log(top_data.track.top.artist);
      this.top_album = top_data.album.top.title;
      this.top_artist = top_data.artist.top.artist;
    })
   }

  ngOnInit(): void {
    this.initTop(period, offset);
  }

}
