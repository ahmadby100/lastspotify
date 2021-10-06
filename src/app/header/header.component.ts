import { Component, OnInit } from '@angular/core';
import { period, offset } from "../global"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})



export class HeaderComponent implements OnInit {
  period = period;
  offset = offset;
  header_title = `<span class="text-red-600">last</span>+<span class="text-green-600">spotify</span>.`
  
  constructor() { }

  ngOnInit(): void {
  }

}
