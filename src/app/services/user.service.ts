import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { User } from '../models/models';
import { DecodedToken } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currUser: User;

  constructor(
    private jwtService: JwtService
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
  }
}
