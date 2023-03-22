import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskRecieved } from 'src/app/shared/task-recieved';
import { BoardsRequestsService } from 'src/app/shared/boards-requests.service';
import { BackendUserService } from 'src/app/shared/backend-user.service';
import { MatDialog } from '@angular/material/dialog';
import { async } from 'rxjs';
import { PopupFormComponent } from '../popup-form/popup-form.component';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() columnId: string = '';
  @Input() boardId: string = '';
  @Output() deleteCol = new EventEmitter<any>();
  private token: { token: string };
  get tasksFilteredByColumn(): TaskRecieved[] {
    return this.task1.filter((task) => task.columnId === this.columnId);
  }
  task1: TaskRecieved[] = [];
  constructor(
    private boardRequests: BoardsRequestsService,
    private userService: BackendUserService,
    private dialog: MatDialog
  ) {
    this.token = this.userService.getToken();
  }
  async ngOnInit() {
    console.log(this.columnId);

    const tasks = (await this.boardRequests.getTasksByBoardId(
      this.token,
      this.boardId
    )) as TaskRecieved[];
    this.task1.push(...tasks);
  }
  drop(event: CdkDragDrop<TaskRecieved[]>) {
    console.log(event.previousContainer === event.container);

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log(event.previousIndex, event.currentIndex);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(event.previousContainer.data, event.container.data);
    }
  }
  openPopup() {
    const dialogRef = this.dialog.open(PopupFormComponent);
    dialogRef.componentInstance.formSubmit.subscribe(
      (data: { title: string; description: string }) => {
        this.addTask(data);
      }
    );
  }
  async addTask(obj: { title: string; description: string }) {
    console.log(obj);
    const id = this.userService.userLocal._id;
    const localId = localStorage.getItem('localUserId');
    if (localId === null) return;
    const user: {
      title: string;
      description: string;
      users: string[];
      order: number;
      userId: string;
    } = {
      title: obj.title,
      description: obj.description,
      users: [obj.title],
      order: 0,
      userId: id === '' ? localId : id,
    };
    console.log();

    const board = await this.boardRequests.setTask(
      this.token,
      this.boardId,
      this.columnId,
      user
    );
    console.log(this.task1);

    this.task1.push(board as TaskRecieved);
  }
  deleteForm(event: Event) {
    return this.deleteCol.emit(event);
  }
}
