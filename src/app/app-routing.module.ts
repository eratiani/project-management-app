import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardMainComponent } from './board-view/board-main/board-main.component';
import { BoardMainGuard } from './guards/board-main.guard';
import { EntryPageComponent } from './main-page/entry-page/entry-page.component';
import { PageNotFoundComponent } from './main-page/page-not-found/page-not-found.component';
import { LogInComponent } from './user-authentication/log-in/log-in.component';
import { RegisterComponent } from './user-authentication/register/register.component';
const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: EntryPageComponent },
  { path: 'Home/logIn', component: LogInComponent },
  { path: 'Home/register', component: RegisterComponent },
  {path: 'board/main', component: BoardMainComponent,  canActivate: [BoardMainGuard]},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
