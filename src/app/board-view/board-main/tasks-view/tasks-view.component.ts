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
  private token: { token: string };
  columns: ColumnRecieved[] = [];
  @Input() board?: BoardRecieved;
  boardId: string = '';
  createcolumnForm: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: BackendUserService,
    private boardService: BoardsRequestsService,
    private formBuilder: FormBuilder
  ) {
    this.token = this.userService.getToken();
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
    const id = this.getBoardId();
    const column = (await this.boardService.getCollumns(
      this.token,
      id
    )) as ColumnRecieved[];

    this.columns.push(...column);
  }
  async addcolumn(title: { title: string }, i: number = 0) {
    const user: { title: string; order: number } = {
      title: title.title,
      order: i++,
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
}
