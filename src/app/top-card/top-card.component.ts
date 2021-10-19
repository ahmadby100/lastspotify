import { Component, Input, OnInit } from '@angular/core';
import { TopType } from '../types';

@Component({
  selector: 'app-top-card',
  templateUrl: './top-card.component.html',
  styleUrls: ['./top-card.component.css']
})
export class TopCardComponent implements OnInit {
  private nullartwork = "assets/img/musical-note.svg";

  constructor() { }

  @Input() type: string = "";
  @Input() type_data: TopType = {
    artist: "",
    plays: 0,
    img: this.nullartwork
  };

  public type_img: string = "";
  public play_img: string = "assets/img/play.svg";
  public top_color: string = "text-gray-600";

  ngOnInit(): void {
    console.log(this.type_data);
    if (this.type == "ARTIST") {
      this.type_img = "assets/img/artist.svg";
      this.top_color = "text-yellow-600";
    }
    if (this.type == "ALBUM") {
      this.type_img = "assets/img/album.svg";
      this.top_color = "text-green-600";
    }
    if (this.type == "TRACK") {
      this.type_img = "assets/img/track.svg";
      this.top_color = "text-blue-600";
    }

  }

}
