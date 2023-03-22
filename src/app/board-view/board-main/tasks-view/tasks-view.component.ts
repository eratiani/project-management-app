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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: BackendUserService,
    private boardService: BoardsRequestsService,
    private formBuilder: FormBuilder
  ) {
    this.createcolumnForm = this.formBuilder.group({
      title: ['', [Validators.minLength(1), Validators.required]],
    });
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  async ngOnInit() {
    this.token = this.userService.getToken();
    const id = this.getBoardId();
    console.log(id);

    const column = (await this.boardService.getCollumns(
      this.token,
      id
    )) as ColumnRecieved[];
    console.log(column);
    this.columns.push(...column);
  }
  async addcolumn(title: { title: string }, i: number = 0) {
    const user: { title: string; order: number } = {
      title: title.title,
      order: i,
    };
    const column = (await this.boardService.setCollumn(
      this.token,
      this.boardId,
      user
    )) as ColumnRecieved;
    console.log(column);

    this.columns.push(column);
  }

  getBoardId() {
    const pathSegments = this.route.snapshot.url.map((segment) => segment.path); // get URL path segments
    const lastSegment = pathSegments.pop() as string;
    const lastDashIndex = lastSegment.lastIndexOf('-'); // find last dash index
    return (this.boardId = lastSegment.substring(lastDashIndex + 1));
  }
  cancel(event: boolean) {
    this.delete = !event;
  }
  deleteCol(e: Event) {
    this.delete = true;
    console.log(e);

    const colId = (e.target as HTMLElement).getAttribute('colid');
    console.log(colId);

    if (colId === null) return;
    this.colId = colId;
  }
  deleteItem(event: boolean) {
    this.delete = !event;
    try {
      const boardId = this.boardId;
      const colId = this.colId;
      console.log(boardId, colId, this.token);

      if (!event) return;
      const deleted = this.boardService.deleteColumn(
        this.token,
        boardId,
        colId
      );
      console.log(this.columns);
      this.columns.forEach((column: ColumnRecieved, i: number) => {
        if (column._id === this.colId) {
          this.columns.splice(i, 1);
        }
      });
      this.delete = !event;
    } catch (error) {
      console.log(error);
    }
  }
  editTitle(column: ColumnRecieved) {
    column.isEditMode = true;
  }

  cancelEdit(column: ColumnRecieved) {
    column.isEditMode = false;
  }

  submitEdit(column: ColumnRecieved) {
    console.log(column);
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
    } catch (error) {}
  }
}
