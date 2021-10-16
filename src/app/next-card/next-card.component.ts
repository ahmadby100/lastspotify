import { Component, Input, OnInit } from '@angular/core';
import { Next, TopType } from '../types';

@Component({
  selector: 'app-next-card',
  templateUrl: './next-card.component.html',
  styleUrls: ['./next-card.component.css']
})
export class NextCardComponent implements OnInit {

  constructor() { }

  @Input() type: string = "";
  @Input() data: TopType = {
    artist: "",
    img: "",
    plays: 0
  };

  @Input() index: number = 2;

  ngOnInit(): void {
    if (this.type == "artist") {
      this.data.title = this.data.artist;
    }
  }

}
