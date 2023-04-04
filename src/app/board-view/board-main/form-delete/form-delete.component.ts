import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form-delete',
  templateUrl: './form-delete.component.html',
  styleUrls: ['./form-delete.component.css'],
})
export class FormDeleteComponent {
  @Output() canCelEv = new EventEmitter<any>();
  @Output() delEv = new EventEmitter<any>();
  constructor() {}
  cancel() {
    return this.canCelEv.emit(true);
  }
  delete() {
    return this.delEv.emit(true);
  } 
}
