import { Injectable, Inject } from '@angular/core';
import { JwtService } from './jwt.service';
import { User } from '../models/models';
import { DecodedToken } from '../models/token';
import { Observable, catchError, tap } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { HttpClient } from '@angular/common/http';
import { REPOS_API_URL } from '../app-injection-tokens';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currUser: User = {} as User;
  private allUsers: User[] = [];

  constructor(
    @Inject(REPOS_API_URL) private reposUrl: string,
    private jwtService: JwtService,
    private http: HttpClient,
    private errHandler: ErrorHandlerService
  ) { 
    this.setUser();
    this.getAllUsers();
    console.log(`all users: ${this.allUsers}`);
  }

    public setUser() {
      let decodedToken = this.jwtService.decodeToken()
      if(decodedToken){
        this.currUser = {
          userId: decodedToken.sub,
          userName: decodedToken.name,
          userRole: decodedToken.role
        } as User;
      } 
      else {
        this.currUser = {} as User;
      }
      console.log("setUser");
      console.log(this.currUser);
  }

  private getAllUsers() {
    return this.http.get<User[]>(`${this.reposUrl}/Users`)
      .pipe(
        tap((users: User[]) => console.log('fetched users', users)),
        catchError(this.errHandler.handleError<User[]>('getLibrary', []))
      )
      .subscribe(users => { 
        this.allUsers = users,
        console.log(this.allUsers) })
  }

  public getUserNameById(id: string): string {
    let result = this.allUsers.find(us => us.userId == id)?.userName;
    return result ? result : ""
  }
}
