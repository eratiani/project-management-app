import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { MainPageModule } from '../main-page/main-page.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule } from '@angular/forms';
import { LogOutComponent } from './log-out/log-out.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UpdateFormComponent } from './user-update/update-form/update-form.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
 
@NgModule({
  declarations: [
    LogInComponent,
    RegisterComponent,
    LogOutComponent,
    UserUpdateComponent,
    UpdateFormComponent,
  ],
  imports: [
    CommonModule,
    MainPageModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [LogOutComponent, UserUpdateComponent],
})
export class UserAuthenticationModule {}
