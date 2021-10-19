import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DailyPlaysService } from '../daily-plays.service';
import { logger } from '../global';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  constructor(private modalService: ModalService, private service: DailyPlaysService, private renderer: Renderer2) {
    this.modalService.modal_state.subscribe(val => {
      logger("Modal", `State changed to ${val}`, "#48C9B0")
      this.hidden = val;
      this.renderer.addClass(document.body, "disable-scrolling");
    });
   }

  hidden: boolean = false;

  public closeModal = (): void => {
    this.modalService.updateModalState();
    this.renderer.removeClass(document.body, "disable-scrolling");
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
  }
}
