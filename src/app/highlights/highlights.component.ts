import { Component, OnInit } from '@angular/core';

import { period, offset } from '../global'

import { DailyPlaysService } from '../daily-plays.service'


@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.css']
})
export class HighlightsComponent implements OnInit {

constructor(private service: DailyPlaysService) {
  this.service.period_change.subscribe(period => {
    // Change Period
  });
  this.service.offset_change.subscribe(offset => {
    // Change Offset
  });
 }

  ngOnInit(): void {
    this.service.highlights(period, offset);
  }

}
