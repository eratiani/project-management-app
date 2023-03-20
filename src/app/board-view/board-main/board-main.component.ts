import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BoardsRequestsService } from 'src/app/shared/boards-requests.service';
import { BackendUserService } from 'src/app/shared/backend-user.service';
import { HttpClient } from '@angular/common/http';
import { BoardSent } from 'src/app/shared/board-sent';
import { BoardRecieved } from 'src/app/shared/board-received';

@Component({
  selector: 'app-board-main',
  templateUrl: './board-main.component.html',
  styleUrls: ['./board-main.component.css'],
})
export class BoardMainComponent {
  delete:boolean=false
  createBoardForm: FormGroup;
  private token: { token: string };
  private currUser: string = '';
  boards: BoardRecieved[] = [];
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: BackendUserService,
    private boardService: BoardsRequestsService
  ) {
    this.createBoardForm = this.formBuilder.group({
      title: ['', [Validators.minLength(1), Validators.required]],
    });
    this.token = this.userService.getToken();
    setTimeout(() => {
      this.currUser = this.userService.userLocal.login;
    }, 1000);
  }
  async ngOnInit() {
    const board = (await this.getBoards(this.token)) as BoardRecieved[];
    this.boards.push(...board);
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
  }
  goToTasks(e: Event) {
    const myValue = (e.target as HTMLElement).parentElement?.getAttribute(
      'dataId'
    );
    this.router.navigateByUrl(`board/main/${myValue}`);
  }
  async addBoard(title: { title: string }) {
    const user: BoardSent = {
      title: title.title,
      owner: this.currUser,
      users: [this.currUser],
    };
    const board = await this.boardService.setBoard(user, this.token);

    this.boards.push(board as BoardRecieved);
  }
  async getBoards(token: { token: string }) {
    return await this.boardService.getBoards(token);
  }
  deleteForm(event:Event){
    event.stopImmediatePropagation()
    this.delete = true;
  }
}
