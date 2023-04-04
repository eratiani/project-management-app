import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { EntryPageComponent } from './entry-page/entry-page.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    BodyComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    EntryPageComponent,
    UserMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [HeaderComponent],
})
export class MainPageModule {}
 