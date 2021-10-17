import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { logger } from './global';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor() { }

  modal_state: Subject<boolean> = new Subject<boolean>();
  state = true;

  updateModalState = (): void => {
    this.state = !this.state;
    logger("Service [Modal]",`Modal State changed to ${this.state}`, "#FFC300");
    this.modal_state.next(this.state);
  }

}
