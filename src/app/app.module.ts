import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { MaterialModule } from './material/material.module';
import { LibraryComponent } from './library/library.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { REPOS_API_URL } from './app-injection-tokens';
import { environment } from 'src/environments/environment.development';
import { ACCESS_TOKEN_KEY } from './services/auth.service';
import { BooksComponent } from './books/books.component';
import { AddChangeBookComponent } from './add-change-book/add-change-book.component';
import { AuthorComponent } from './author/author.component';

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    LibraryComponent,
    BookDetailsComponent,
    BooksComponent,
    AddChangeBookComponent,
    AuthorComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5065'],
      },
    }),
  ],
  providers: [{
    provide: REPOS_API_URL,
    useValue: environment.reposApi
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
