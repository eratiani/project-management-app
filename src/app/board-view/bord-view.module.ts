import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardMainComponent } from './board-main/board-main.component';
import { MainPageModule } from '../main-page/main-page.module';
import { UserAuthenticationModule } from '../user-authentication/user-authentication.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [BoardMainComponent],
  imports: [
    CommonModule,
    MainPageModule,
    UserAuthenticationModule,
    RouterModule,
    AppRoutingModule,
  ],
})
export class BoardViewModule {}
