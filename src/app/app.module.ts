import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardViewModule } from './board-view/bord-view.module';
import { MainPageModule } from './main-page/main-page.module';
import { UserAuthenticationModule } from './user-authentication/user-authentication.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { APP_BASE_HREF } from '@angular/common';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    MatButtonModule,
    MatDialogModule, 
    BrowserModule,
    MainPageModule,
    AppRoutingModule,
    BoardViewModule,
    UserAuthenticationModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/project-management-app' }],

  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
