import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.css'],
})
export class PopupFormComponent {
  @Output() formSubmit = new EventEmitter<any>();
  createTaskForm: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<PopupFormComponent>,
    private formBuilder: FormBuilder
  ) {
    this.createTaskForm = this.formBuilder.group({
      title: ['', [Validators.minLength(1), Validators.required]],
      description: ['', [Validators.minLength(5), Validators.required]],
    });
  }
  close(e:Event) {
    e.stopPropagation() 
    this.dialogRef.close();
  }
  onSubmit(value: { title: string; description: string }) {

    this.formSubmit.emit(value);
    this.dialogRef.close();
  }
}
