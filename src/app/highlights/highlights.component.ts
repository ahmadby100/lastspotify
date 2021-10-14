import { Component, OnInit } from '@angular/core';

import { DailyPlaysService } from '../daily-plays.service'

import { period, offset } from '../global'
import { Highlights } from '../types';


@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.css']
})
export class HighlightsComponent implements OnInit {
  high_period = period;
  high_offset = offset;

  total_scrobbles = {
    curr: 0,
    prev: 0,
    percent: 0,
    dir: "more"
  }
  avg_scrobbles = {
    curr: 0,
    prev: 0,
    percent: 0,
    dir: "more"
  }
  time = {
    curr: {
      text: '0 Days, 0 Hours',
      hour: 0
    },
    prev: {
      text: '0 Days, 0 Hours',
      hour: 0
    },
    percent: 0,
    dir: "more"
  }
  active = {
    curr: {
      plays: 0,
      hour: 0
    },
    prev: {
      plays: 0,
      hour: 0
    },
    percent: 0,
    dir: "more"
  }

  constructor(private service: DailyPlaysService) {
    this.service.period_change.subscribe(async period => {
      const highlights = await this.service.highlights(period, 1);
      this.high_period = period;
      this.updateHighlights(highlights);
    });
    this.service.offset_change.subscribe(async offset => {
      const highlights = await this.service.highlights(this.service.getPeriod, offset);
      this.high_offset = offset;
      this.updateHighlights(highlights);
    });
  }

  updateHighlights = (highlights: Highlights) => {
    // Total Scrobbles
    this.total_scrobbles.curr = highlights.curr_plays.results[0].plays!;

    // Average Total Scrobbles
    this.avg_scrobbles.curr = Math.floor(highlights.curr_plays.results[0].avg_plays!);
    
    // Total Listening Time
    this.time.curr.hour = parseInt(highlights.curr_time.results[0].time_played!.split(":")[0]);
    if (this.time.curr.hour  >= 24) 
    this.time.curr.text = `${Math.floor(this.time.curr.hour / 24)} ${this.time.curr.hour  / 24 > 1 ? "Days," : "Day,"} ${Math.round((this.time.curr.hour  / 24 - Math.floor(this.time.curr.hour / 24)) * 24)} Hours`
    else 
    this.time.curr.text = `${this.time.curr.hour} Hours`
    
    // Active Hour
    this.active.curr.hour = highlights.curr_active.results[0].hour!;
    this.active.curr.plays = highlights.curr_active.results[0].plays!;

    if (this.high_period != "all") {
      // Total Scrobbles
      this.total_scrobbles.prev = highlights.prev_plays!.results[0].plays!;
      Object.assign(this.total_scrobbles, this.calcPercent(this.total_scrobbles.curr, this.total_scrobbles.prev));
      
      // Average Total Scrobbles
      this.avg_scrobbles.prev = Math.floor(highlights.prev_plays!.results[0].avg_plays!);
      Object.assign(this.avg_scrobbles, this.calcPercent(this.avg_scrobbles.curr, this.avg_scrobbles.prev));     
      
      // Total Listening Time
      this.time.prev.hour = parseInt(highlights.prev_time!.results[0].time_played!.split(":")[0]);
      if (this.time.prev.hour >= 24) 
        this.time.prev.text = `${Math.floor(this.time.prev.hour / 24)} ${this.time.prev.hour / 24 > 1 ? "Days," : "Day,"} ${Math.round((this.time.prev.hour / 24 - Math.floor(this.time.prev.hour / 24)) * 24)} Hours`
      else 
        this.time.prev.text = `${this.time.prev.hour} Hours`
      Object.assign(this.time, this.calcPercent(this.time.curr.hour, this.time.prev.hour));

      // Active Hour
      this.active.prev.hour = highlights.prev_active!.results[0].hour!;
      this.active.prev.plays = highlights.prev_active!.results[0].plays!;
    }
  }
  calcTime(hours: number) {
    
  }
  calcPercent(curr: number, prev: number): {percent: number, dir: string} {
    let p = curr / prev
    let dir: string;
    if (p > 1) {
      p = Math.round((p - 1) * 100);
      dir = "more";
    } else {
      p = Math.round((1 - p) * 100);
      dir = "less";
    }
    return {
      percent: p,
      dir: dir
    }
  }

  ngOnInit(): void {
    this.service.highlights(period, offset);
  }

}
