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
  private taskId:string = ''
  delete:boolean=false;
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
  openPopupTask(e:Event) {
    const dialogRef = this.dialog.open(PopupFormComponent);
    dialogRef.componentInstance.formSubmit.subscribe(
      (data: { title: string; description: string }) => {
        if (e.target===null) return
        
       const taskId = (e.target as HTMLElement).closest("#special")?.getAttribute("taskId") as string
        const boardId = this.boardId;
        const columnId = this.columnId;
        const localId = localStorage.getItem('localUserId');
        const id = this.userService.userLocal._id;
        
        if (localId === null) return;
        const user: {
          title: string;
          description: string;
          users: string[];
          order: number;
          columnId: string,
          userId: string;
        } = {
          title: data.title,
          description: data.description,
          users: [data.title],
          order: 0,
          userId: id === '' ? localId : id,
          columnId:columnId
        };
        this.task1.forEach((column: TaskRecieved, i: number) => {
          if (column._id === taskId) {
            column.description = user.description,
            column.title = user.title,
            column.order = user.order
          }
        });
        this.boardRequests.editTask(this.token,boardId,columnId,user,taskId)
      }
    );
  }
  async addTask(obj: { title: string; description: string }) {
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

    const board = await this.boardRequests.setTask(
      this.token,
      this.boardId,
      this.columnId,
      user
    );

    this.task1.push(board as TaskRecieved);
  }
  deleteForm(event: Event) {
    return this.deleteCol.emit(event);
  }
  cancel(event: boolean) {
    this.delete = !event;
  }
  deleteTask(e: boolean) {
     this.delete = !e;
    try {
      const boardId = this.boardId;
      const colId = this.columnId;

      if (!e) return;
      const deleted = this.boardRequests.deleteTask(
        this.token,
        boardId,
        colId,
        this.taskId
      );
      this.task1.forEach((column: TaskRecieved, i: number) => {
        if (column._id === this.taskId) {
          this.task1.splice(i, 1);
        }
      });
    }
    catch(error) {
  }
}
  deleteFormOpen(event: Event) {
    event.stopImmediatePropagation()
    this.delete = true;
   

    const taskId = (event.target as HTMLElement).getAttribute('taskId');

    if (taskId === null) return;
    this.taskId = taskId;
  }
}
