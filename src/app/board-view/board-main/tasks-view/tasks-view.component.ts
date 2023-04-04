import { Component, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { BoardRecieved } from 'src/app/shared/board-received';
import { BoardsRequestsService } from 'src/app/shared/boards-requests.service';
import { BackendUserService } from 'src/app/shared/backend-user.service';
import { ColumnRecieved } from 'src/app/shared/column-recieved';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorHandllingService } from 'src/app/shared/error-handlling.service';
import { TaskRecieved } from 'src/app/shared/task-recieved';
@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.css'],
})
export class TasksViewComponent {
  private token: { token: string } = { token: '' };
  isEditMode: boolean = false;
  columns: ColumnRecieved[] = [];
  delete: boolean = false;
  @Input() board?: BoardRecieved;
  boardId: string = '';
  colId: string = '';
  createcolumnForm: FormGroup;
  searchTaskForm: FormGroup;
  searchRes: Array<TaskRecieved> = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: BackendUserService,
    private boardService: BoardsRequestsService,
    private formBuilder: FormBuilder,
    private errorService: ErrorHandllingService
  ) {
    this.createcolumnForm = this.formBuilder.group({
      title: ['', [Validators.minLength(1), Validators.required]],
    });
    this.searchTaskForm = this.formBuilder.group({
      search: ['', [Validators.minLength(1), Validators.required]],
    });
  }
  async addsearchedTasks(input: { search: string }) {
    try {
      const searchRes = (await this.boardService.getTasksSet(
        this.token,
        input
      )) as Array<TaskRecieved>;
      this.searchRes.splice(0, this.searchRes.length);
      this.searchRes.push(...searchRes);
    } catch (error) {
      this.errorService.generateError(error)
    }
   
  }
  drop(event: CdkDragDrop<ColumnRecieved[]>) {
    if (event.previousContainer === event.container) {
      event.event.stopImmediatePropagation();
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      try {
        const id = event.item.element.nativeElement.getAttribute('colId');
      this.columns.forEach((e: ColumnRecieved, i: number) => {
        const body: { title: string; order: number } = {
          title: e.title,
          order: i + 1,
        };
        this.boardService.editColumn(this.token, e.boardId, e._id, body);
      });
      } catch (error) {
        this.errorService.generateError(error)
      }
      
    }
  }

  async ngOnInit() {
    try {
      this.token = this.userService.getToken();
      const id = this.getBoardId();

      const column: ColumnRecieved[] = (
        (await this.boardService.getCollumns(
          this.token,
          id
        )) as ColumnRecieved[]
      ).sort((a, b) => a.order - b.order);

      this.columns.push(...column);
    } catch (error) {
      this.errorService.generateError(error);
    }
  }
  async addcolumn(title: { title: string }) {
    try {
      const id = this.getBoardId();

      const colNumber = (await this.boardService.getCollumns(
        this.token,
        id
      )) as ColumnRecieved[];
      let order = 0;
      if (colNumber[colNumber.length - 1]?.order !== undefined) {
        order = colNumber[colNumber.length - 1].order;
      }

      const user: { title: string; order: number } = {
        title: title.title,
        order: (order += 1),
      };

      const column = (await this.boardService.setCollumn(
        this.token,
        this.boardId,
        user
      )) as ColumnRecieved;

      this.columns.push(column);
    } catch (error) {
      this.errorService.generateError(error);
    }
  }

  getBoardId() {
    const pathSegments = this.route.snapshot.url.map((segment) => segment.path);
    const lastSegment = pathSegments.pop() as string;
    const lastDashIndex = lastSegment.lastIndexOf('-');
    return (this.boardId = lastSegment.substring(lastDashIndex + 1));
  }
  cancel(event: boolean) {
    this.delete = !event;
  }
  deleteCol(e: Event) {
    this.delete = true;

    const colId = (e.target as HTMLElement).getAttribute('colid');

    if (colId === null) return;
    this.colId = colId;
  }
  deleteItem(event: boolean) {
    this.delete = !event;
    try {
      const boardId = this.boardId;
      const colId = this.colId;

      if (!event) return;
      const deleted = this.boardService.deleteColumn(
        this.token,
        boardId,
        colId
      );
      this.columns.forEach((column: ColumnRecieved, i: number) => {
        if (column._id === this.colId) {
          this.columns.splice(i, 1);
        }
      });
      this.delete = !event;
    } catch (error) {
      this.errorService.generateError(error);
    }
  }
  editTitle(column: ColumnRecieved) {
    column.isEditMode = true;
  }

  cancelEdit(column: ColumnRecieved) {
    column.isEditMode = false;
  }

  submitEdit(column: ColumnRecieved) {
    try {
      column.title = column.title;
      column.isEditMode = false;
      const boardId = column.boardId;
      const colId = column['_id'];
      const body = {
        title: column.title,
        order: column.order,
      };
      const updatedBoard = this.boardService.editColumn(
        this.token,
        boardId,
        colId,
        body
      );
    } catch (error) {
      this.errorService.generateError(error)
    }
  } 
}
