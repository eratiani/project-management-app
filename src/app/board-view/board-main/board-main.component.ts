import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-board-main',
  templateUrl: './board-main.component.html',
  styleUrls: ['./board-main.component.css'],
})
export class BoardMainComponent {
  createBoardForm: FormGroup;
  
  boards:string[] = [
  ];
constructor( private formBuilder: FormBuilder,) {
  this.createBoardForm = this.formBuilder.group({
    title: ['', [Validators.minLength(1), Validators.required]],
  });
}
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
  }
  addBoard(title:{title:string}) {
   return this.boards.push(title.title)
  }

}
