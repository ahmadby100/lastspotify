import { Component, OnInit } from '@angular/core';
import { DailyPlaysService } from '../daily-plays.service';
import { logger } from '../global';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  constructor(private modalService: ModalService, private service: DailyPlaysService) {
    this.modalService.modal_state.subscribe(val => {
      logger("Modal", `State changed to ${val}`, "#48C9B0")
      this.hidden = val;
    });
   }

  hidden: boolean = true;

  public closeModal = (): void => {
    this.modalService.updateModalState();
  }

  ngOnInit(): void {}

}
