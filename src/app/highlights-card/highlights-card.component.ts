import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { HighlightsCard } from '../types';

@Component({
  selector: 'app-highlights-card',
  templateUrl: './highlights-card.component.html',
  styleUrls: ['./highlights-card.component.css']
})
export class HighlightsCardComponent implements OnInit {

  constructor() { }

  @Input() period: string = "week";
  @Input() title: string = "";
  @Input() data: HighlightsCard = {
    curr: {},
    prev: {},
    percent: 0,
    dir: ''
  };
  
  current: string = "";
  previous: string = "";
  percentage: boolean = true;

  check = () => {
    if (this.title == "TOTAL SCROBBLES") {
      this.current = `${this.data.curr.plays} ${this.data.curr.text}`;
      this.previous = `${this.data.prev.plays}`;
    }
    if (this.title == "AVG DAILY SCROBBLES") {
      this.current = `${this.data.curr.plays} ${this.data.curr.text}`;
      this.previous = `${this.data.prev.plays}`;
    }
    if (this.title == "LISTENING TIME") {
      this.current = this.data.curr.text!;
      this.previous = `${this.data.prev.text}`;
    }
    if (this.title == "MOST ACTIVE HOUR") {
      this.percentage = false;
      this.current = `${this.data.curr.hour}:00 [${this.data.curr.plays} Plays]`;
      this.previous = `${this.data.prev.hour}:00`
    }
  }

  ngOnInit(): void {
    this.check();
  }

  ngOnChanges(changes: SimpleChange): void {
    this.check();
  }
}
