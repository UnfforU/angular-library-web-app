import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
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

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}


// const conf: JwtModuleOptions = {
//   tokenGetter,
//   allowedDomains: environment.tokenWhiteListedDomains
// }

// const Jwt: JwtModuleOptions = {
  
// }

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    LibraryComponent,
    BookDetailsComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  //   JwtModule.forRoot({
  //     config: {
  //       tokenGetter
  //   },
  // }),
  ],
  providers: [{
    provide: REPOS_API_URL,
    useValue: environment.reposApi
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
