import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

import { ACCESS_TOKEN_KEY } from './auth.service';
import { DecodedToken } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  public decodedToken: DecodedToken | null;

  constructor() 
  { 
    this.decodedToken = this.decodeToken()
  }

  private decodeToken(): DecodedToken | null {
    let token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if(token){
      return jwt_decode(token);
    }
    else{
      return null;
    }
  }
}
