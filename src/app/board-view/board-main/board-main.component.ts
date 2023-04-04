import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BoardsRequestsService } from 'src/app/shared/boards-requests.service';
import { BackendUserService } from 'src/app/shared/backend-user.service';
import { HttpClient } from '@angular/common/http';
import { BoardSent } from 'src/app/shared/board-sent';
import { BoardRecieved } from 'src/app/shared/board-received';
import { ErrorHandllingService } from 'src/app/shared/error-handlling.service';

@Component({
  selector: 'app-board-main',
  templateUrl: './board-main.component.html',
  styleUrls: ['./board-main.component.css'],
})
export class BoardMainComponent {
  delete: boolean = false;
  createBoardForm: FormGroup;
  private token: { token: string };
  private currUser: string = '';
  private currBoard: string = '';
  boards: BoardRecieved[] = [];
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: BackendUserService,
    private boardService: BoardsRequestsService,
    private errorService: ErrorHandllingService
  ) {
    this.createBoardForm = this.formBuilder.group({
      title: ['', [Validators.minLength(1), Validators.required]],
    });
    this.token = this.userService.getToken();

    const userlogIn = localStorage.getItem('userName');
    if (userlogIn === null) return;
    this.currUser = userlogIn;
  }
  async ngOnInit() {
    try {
      const board = (await this.getBoards(this.token)) as BoardRecieved[];
      this.boards.push(...board);
    } catch (error) {
      this.errorService.generateError(error)
    }
   
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
  }
  goToTasks(e: Event) {
    const myValue = (e.target as HTMLElement)
      .closest('#boardsDom')
      ?.getAttribute('dataId');

    this.router.navigateByUrl(`board/main/${myValue}`);
  }
  async addBoard(title: { title: string }) {
    try {
      const user: BoardSent = {
        title: title.title,
        owner: this.currUser,
        users: [this.currUser],
      };

      const board = await this.boardService.setBoard(user, this.token);

      this.boards.push(board as BoardRecieved);
    } catch (error) {
      this.errorService.generateError(error);
    }
  }
  async getBoards(token: { token: string }) {
    return await this.boardService.getBoards(token);
  }
  deleteForm(event: Event) {
    event.stopImmediatePropagation();
    this.delete = true;
    const boardId = (event.target as HTMLElement).getAttribute('dataId');
    if (boardId === null) return;
    this.currBoard = boardId;
  }
  cancel(event: boolean) {
    this.delete = !event;
  }
  deleteItem(event: boolean) {
    try {
      if (!event) return;
      const deleteb = this.boardService.deleteBoard(this.token, this.currBoard);
      this.boards.forEach((board: BoardRecieved, i: number) => {
        if (board._id === this.currBoard) {
          this.boards.splice(i, 1);
        }
      });
      this.delete = !event;
    } catch (error) {
      this.errorService.generateError(error);
    }
  }
}
 