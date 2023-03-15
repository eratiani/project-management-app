import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardMainComponent } from './board-main/board-main.component';
import { MainPageModule } from '../main-page/main-page.module';
import { UserAuthenticationModule } from '../user-authentication/user-authentication.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksViewComponent } from './board-main/tasks-view/tasks-view.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [BoardMainComponent, TasksViewComponent],
  imports: [
    CommonModule,
    DragDropModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MainPageModule,
    UserAuthenticationModule,
    RouterModule,
    AppRoutingModule,
  ],
})
export class BoardViewModule {}
