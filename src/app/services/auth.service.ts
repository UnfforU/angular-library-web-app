import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { REPOS_API_URL } from '../app-injection-tokens';
import { Token } from '../models/token';
import { Login } from '../models/models';


export const ACCESS_TOKEN_KEY = 'library_access_token'

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  public constructor(
    private http: HttpClient,
    @Inject(REPOS_API_URL) private apiUrl: string,
    // public jwtHelper: JwtHelperService,
    private router: Router
  ) { 

  }

  public logIn(login: Login): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/Auth`, login)
      .pipe(
        tap(token => {
          localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
        })
      )
  }

  // public isAuthenticated(): boolean {
  //   let token = localStorage.getItem(ACCESS_TOKEN_KEY);
  //   return token != null && !this.jwtHelper.isTokenExpired(token)
  // }

  public logOut():void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['']);
  }

  
}
