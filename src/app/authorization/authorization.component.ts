import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Login } from '../models/models';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent {
  public authForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  public constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ){}

  // protected get isLoggedIn() : boolean {
  //   return this.authService.isAuthenticated()
  // }

  protected logIn(username: string, password: string): void {
    console.log({username, password});
    this.authService.logIn({username, password} as Login)
      .subscribe({
        complete: () => this.router.navigate(['/library']),
        error: () => this.snackBar.open('UserName or password is incorrect. Try again!', undefined, {duration: 3000})}
      );
  }
}
