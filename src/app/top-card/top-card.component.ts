import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-card',
  templateUrl: './top-card.component.html',
  styleUrls: ['./top-card.component.css']
})
export class TopCardComponent implements OnInit {

  constructor() { }

  @Input() type: string = "";
  @Input() top_type_img: string = "";
  @Input() top_type_name: string = "";
  @Input() top_type_plays: number = 0;
  
  public type_img: string = "";
  public play_img: string = "assets/img/play.svg";
  public top_color: string = "text-gray-600";

  ngOnInit(): void {
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
