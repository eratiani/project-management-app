import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BoardsRequestsService } from 'src/app/shared/boards-requests.service';

@Component({
  selector: 'app-board-main',
  templateUrl: './board-main.component.html',
  styleUrls: ['./board-main.component.css'],
})
export class BoardMainComponent {
  createBoardForm: FormGroup;
  
  boards:{id:number, title:string}[] = [{id:1,title:"smth"},{id:2,title:"smth2"},{id:3,title:"smth3"}]
constructor( private formBuilder: FormBuilder, private router: Router,) {
  this.createBoardForm = this.formBuilder.group({
    title: ['', [Validators.minLength(1), Validators.required]],
  });
}
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
  }
  goToTasks(e:Event) {
    const myValue = (e.target as HTMLElement).parentElement?.getAttribute('data-id');
    this.router.navigateByUrl(`board/main/${myValue}`);
  }
  addBoard(title:{title:string}) {
    BoardsRequestsService.
   return this.boards.push({title:title.title,id:2})
  }

}
