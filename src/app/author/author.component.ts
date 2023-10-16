import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Author, UserRole } from '../models/models';
import { AuthorService } from '../services/author.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent {
  public authorsList: Author[] = [];
  public addNewAuthorMode: boolean = false;

  public addAuthorForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(
    private authorService: AuthorService,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ){
    this.authorService.getAuthors()
      .subscribe(authorsList => this.authorsList = authorsList);
  }

  protected isAdmin = (): boolean => this.userService.currUser.userRole == UserRole.admin;

  protected changeAddAuthorMode(){
    this.addNewAuthorMode = !this.addNewAuthorMode;
    this.addAuthorForm.reset();
  }

  protected addAuthor(name: string){
    if(name)
      this.authorService.addAuthor({name} as Author)
        .subscribe({
          next: (author) => {
            this.authorsList.push(author)
            this.changeAddAuthorMode();
            this.snackBar.open(`Author: "${author.name}" successfully added!`, "Ok", {duration: 3000});
          },
          error: () => 
            this.snackBar.open("Can't add new author. Try Again", "Ok", {duration: 3000})
        });
  }
}
