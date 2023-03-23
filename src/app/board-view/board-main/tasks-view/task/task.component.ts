import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { TaskSent } from 'src/app/shared/task-sent';
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
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private element:ElementRef
  ) {
    this.token = this.userService.getToken();
  }
  async ngOnInit() {

    const tasks = (await this.boardRequests.getTasksByBoardId(
      this.token,
      this.boardId
    ) as TaskRecieved[]).sort((a, b) => a.order - b.order);;
    this.task1.push(...tasks);
  }
  async drop(event: CdkDragDrop<TaskRecieved[]>) {
    console.log(event.previousContainer === event.container);

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(this.task1);
      this.task1.forEach((e:TaskRecieved,i:number)=>{
        const body:TaskSent = {title: e.title,
        order: i+1,
        description: e.description,
        columnId: e.columnId,
        userId: e.userId,
        users: e.users}
        
        this.boardRequests.editTask(this.token,e.boardId,e.columnId,body,e._id)})
      } else {
        const task = event.container.data[event.currentIndex];
        const columnId = event.container.element.nativeElement.closest("#board")?.getAttribute("data-colId") as string;
        console.log(columnId);
        
        const body = {title: task.title,
          order: task.order,
          description: task.description,
          userId: task.userId,
          users: task.users}
        await this.boardRequests.deleteTask(this.token,task.boardId,task.columnId,task._id);
        await this.boardRequests.createTask(this.token,task.boardId,columnId,body)
      this.task1.forEach((e,i)=>{
        if(e._id===task._id) {

          this.task1.splice(i, 1);
        }
      });
        console.log(this.task1);
        
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      const el = this.element
      console.log(this.element.nativeElement.querySelector(`[cdkDrag]`));
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
        const user: TaskSent= {
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
    const idboard = this.getBoardId();
    const localId = localStorage.getItem('localUserId');
    if (localId === null) return;
    const taskNumber = await this.boardRequests.getTasksByBoardId(this.token,idboard) as TaskRecieved[];
      let order = 0;
      
      if (taskNumber[taskNumber.length-1]?.order !== undefined) {
        order = taskNumber[taskNumber.length-1].order
         
      } 
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
      order: order+=1,
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
getBoardId() {
  const pathSegments = this.route.snapshot.url.map((segment) => segment.path); 
  const lastSegment = pathSegments.pop() as string;
  const lastDashIndex = lastSegment.lastIndexOf('-'); 
  return (this.boardId = lastSegment.substring(lastDashIndex + 1));
}
  deleteFormOpen(event: Event) {
    event.stopImmediatePropagation()
    this.delete = true;
   

    const taskId = (event.target as HTMLElement).getAttribute('taskId');

    if (taskId === null) return;
    this.taskId = taskId;
  }
}
