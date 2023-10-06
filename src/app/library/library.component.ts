import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { Library, Book, User } from '../models/models';
import { LibraryService } from '../services/library.service';
import { AuthService } from '../services/auth.service';
import { BookService } from '../services/book.service';
import { JwtService } from '../services/jwt.service';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
  
})
export class LibraryComponent implements OnInit {
  protected libraries: Library[] = [];
  public newLibrary: Library | null = null;
  public chosenBooks: Book[] = [];
  public currLibrary: Library  = this.libraries[0];

  protected user: User;

  public addLibraryForm = new FormGroup({
    name: new FormControl('')
  });

  public constructor(
    private libraryService: LibraryService,
    private authService: AuthService,
    private bookService: BookService,
    private userService: UserService
  ) {

   
    this.user = this.userService.currUser;

    console.log(`const library ${this.user}`);
  }

  public ngOnInit(): void {
    this.getLibraries();
    console.log("token:");
  }

  public logOut(): void {
    this.authService.logOut();
  }

  public chooseLibrary(library: Library): void{
    this.currLibrary = library;
    console.log(library);
    this.bookService.getBooksByLibraryId(library.libraryId)
      .subscribe(books => {
        console.log(`getBooks: ${books}`);
        this.chosenBooks = books
      });
  }

  

  protected createNewLibrary(): void {
    if(!this.newLibrary){
      this.newLibrary = {} as Library;
    }
    else {
      this.newLibrary = null;
    }
  }

  protected addLibrary(name: string): void {
    if(name)
      this.libraryService.addLibrary({name} as Library)
        .subscribe(library => {
          console.log({library});
          this.libraries.push(library),
          this.newLibrary = null;
        })
  }

  protected deleteLibrary(library: Library): void {
    this.libraryService.deleteLibrary(library.libraryId)
      .subscribe(
        libraries => {
          this.libraries = libraries
        }
      );
  }

  private getLibraries(): void {
    this.libraryService.getLibraries()
      .subscribe(
        libraries => {
          this.libraries = libraries,
          console.log(this.libraries);
        }
      );

    console.log(this.libraries);
  } 

  public onNotifyBookCollectionChanged(): void {
    this.getLibraries();
  }
  
}
