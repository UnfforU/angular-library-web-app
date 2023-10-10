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

  currUser: User;

  private allUsers: User[] = [];

  constructor(
    @Inject(REPOS_API_URL) private reposUrl: string,
    private jwtService: JwtService,
    private http: HttpClient,
    private errHandler: ErrorHandlerService
  ) { 
    
    if(this.jwtService.decodedToken){
      this.currUser = {
        userId: this.jwtService.decodedToken.sub,
        userName: this.jwtService.decodedToken.name,
        isAdmin: true
      } as User;
    } 
    else {
      this.currUser = {} as User;
    }

    console.log("constructor userService");
    console.log(this.currUser);

    this.getAllUsers();
    console.log(`all users: ${this.allUsers}`);
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
