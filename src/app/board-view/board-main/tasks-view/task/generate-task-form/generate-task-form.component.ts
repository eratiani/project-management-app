import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupFormComponent } from '../../popup-form/popup-form.component';

@Component({
  selector: 'app-generate-task-form',
  templateUrl: './generate-task-form.component.html',
  styleUrls: ['./generate-task-form.component.css'],
})
export class GenerateTaskFormComponent {
  constructor(private dialog: MatDialog) {}

  openPopup() {
    const dialogRef = this.dialog.open(PopupFormComponent);
  }
} 
