import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Login } from '../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent {
  
  public correctLogin: boolean = false;
  public constructor(
    private router: Router,
    private authService: AuthService
  ){}

  // protected get isLoggedIn() : boolean {
  //   return this.authService.isAuthenticated()
  // }

  protected logIn(username: string, password: string): void {
    this.authService.logIn({username, password} as Login)
      .subscribe({
        complete: () => this.router.navigate(['/library']),
        error: () => alert("Wrong login or password")
      }
      );
  }
}
