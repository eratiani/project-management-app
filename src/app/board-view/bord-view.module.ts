import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardMainComponent } from './board-main/board-main.component';
import { MainPageModule } from '../main-page/main-page.module';
import { UserAuthenticationModule } from '../user-authentication/user-authentication.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksViewComponent } from './board-main/tasks-view/tasks-view.component';
import { TaskComponent } from './board-main/tasks-view/task/task.component';
import { GenerateTaskFormComponent } from './board-main/tasks-view/task/generate-task-form/generate-task-form.component';
import { PopupFormComponent } from './board-main/tasks-view/popup-form/popup-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormDeleteComponent } from './board-main/form-delete/form-delete.component';
import { SortPipe } from '../shared/sort';
import { SearchResultComponent } from './board-main/tasks-view/search-result/search-result.component';
import { MatCardModule } from '@angular/material/card';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    BoardMainComponent,
    TasksViewComponent,
    TaskComponent,
    GenerateTaskFormComponent,
    PopupFormComponent,
    FormDeleteComponent,
    SortPipe,
    SearchResultComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
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
    MatCardModule,
    UserAuthenticationModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    FormsModule,
  ],
})
export class BoardViewModule {}
