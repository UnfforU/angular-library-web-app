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
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
  
})
export class LibraryComponent implements OnInit {
  protected librariesList: Library[] = [];
  public addNewLibraryMode: boolean = false;
  public chosenBooks: Book[] = [];
  public currLibrary: Library  = this.librariesList[0];

  protected user: User;

  public addLibraryForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  public constructor(
    private libraryService: LibraryService,
    private authService: AuthService,
    private bookService: BookService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {

   
    this.user = this.userService.currUser;

    console.log(`const library ${this.user}`);
  }

  public ngOnInit(): void {
    this.getLibraries();
  }

  public logOut(): void {
    this.authService.logOut();
  }

  private getLibraries(): void {
    this.libraryService.getLibraries()
      .subscribe(
        libraries => {
          this.librariesList = libraries,
          console.log(this.librariesList);
        }
      );
  }

  protected changeAddLibraryMode(): void {
    this.addNewLibraryMode = !this.addNewLibraryMode;
    this.addLibraryForm.reset();
  }

  protected addLibrary(name: string): void {
    if(name)
      this.libraryService.addLibrary({name} as Library)
        .subscribe({
          next: (library) => {
            console.log({library});
            this.librariesList.push(library)
            this.changeAddLibraryMode();
            this.openSnackBar("New library add successfully!", "Ok", {duration: 3000});},
          error: () => 
            this.openSnackBar("Can't add new library. Try Again", "Ok", {duration: 3000})});
  }

  // protected doubleOkDeleteLibrary(library: Library): void {
  //   this.openSnackBar("Are you realy want to delete library?", )
  // }

  protected deleteLibrary(library: Library): void {
    this.libraryService.deleteLibrary(library.libraryId)
      .subscribe(
        libraries => {
        }
      );
  }

  public chooseLibrary(library: Library): void{
    // this.currLibrary = library;
    console.log(library);
    this.bookService.getBooksByLibraryId(library.libraryId)
    .subscribe(books => {
      console.log(`getBooks: ${books}`);
      this.chosenBooks = books
    }); 

      


  }

  protected openSnackBar(message: string, action: string, config: MatSnackBarConfig) {
    this.snackBar.open(message, action, config);
  }

  



  // public onNotifyBookCollectionChanged(): void {
  //   this.getLibraries();
  // }
  
}
