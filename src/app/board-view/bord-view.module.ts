import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardMainComponent } from './board-main/board-main.component';
import { MainPageModule } from '../main-page/main-page.module';

@NgModule({
  declarations: [
    BoardMainComponent
  ],
  imports: [CommonModule,
  MainPageModule],
})
export class BoardViewModule {}
