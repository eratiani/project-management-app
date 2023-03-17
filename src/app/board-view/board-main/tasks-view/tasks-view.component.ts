import { Component, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { BoardRecieved } from 'src/app/shared/board-received';
import { BoardsRequestsService } from 'src/app/shared/boards-requests.service';
import { BackendUserService } from 'src/app/shared/backend-user.service';
@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.css'],
})
export class TasksViewComponent {
  private token: { token: string };
  tasks: { id: number; title: string }[] = [
    { id: 1, title: 'smth' },
    { id: 2, title: 'smth2' },
    { id: 3, title: 'smth3' },
  ];
  @Input() board?: BoardRecieved;
  boardId: string = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: BackendUserService,
    private boardService: BoardsRequestsService
  ) {
    this.token = this.userService.getToken();
  }
  task1 = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  task2 = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog',
  ];
  task3 = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog',
  ];
  task4 = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog',
  ];
  async ngOnInit() {
    const id = this.getBoardId();
    console.log(this.token);

    const columns = await this.boardService.getCollumns(this.token, id);
    console.log(columns);
  }
  drop(event: CdkDragDrop<string[]>) {
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
  getBoardId() {
    const pathSegments = this.route.snapshot.url.map((segment) => segment.path); // get URL path segments
    const lastSegment = pathSegments.pop() as string;
    const lastDashIndex = lastSegment.lastIndexOf('-'); // find last dash index
    return (this.boardId = lastSegment.substring(lastDashIndex + 1));
  }
}
