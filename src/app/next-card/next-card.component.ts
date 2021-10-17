import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { Next, TopType } from '../types';

@Component({
  selector: 'app-next-card',
  templateUrl: './next-card.component.html',
  styleUrls: ['./next-card.component.css']
})
export class NextCardComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  @Input() type: string = "";
  @Input() data: TopType = {
    artist: "",
    img: "",
    plays: 0
  };

  @Input() index: number = 2;

  openModal = () => {
    this.modalService.updateModalState();
  }

  ngOnInit(): void {
    if (this.type == "artist") {
      this.data.title = this.data.artist;
    }
  }

}
