import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { Library, Book, User, UserRole } from '../models/models';
import { LibraryService } from '../services/library.service';
import { AuthService } from '../services/auth.service';
import { BookService } from '../services/book.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
  
})
export class LibraryComponent implements OnInit {
  public addNewLibraryMode: boolean = false;
  public chosenBooks: Book[] = [];
  public addLibraryForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  protected user: User = {} as User;
  protected librariesList: Library[] = [];

  public constructor(
    public readonly libraryService: LibraryService,
    protected readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly bookService: BookService,
    private readonly snackBar: MatSnackBar
  ) {
  }

  public ngOnInit(): void {
    this.user = this.userService.currUser;
    this.getLibraries();
  }

  public logOut(): void {
    this.authService.logOut();
  }

  public chooseLibrary(library: Library): void {
    this.libraryService.selectedLibrary = library;
    console.log(library);
    this.bookService.getBooksByLibraryId(library.libraryId)
    .subscribe(books => {
      console.log(`getBooks: ${books as Book[]}`);
      this.libraryService.selectedLibrary.books = books;
      this.chosenBooks = books
      console.log(books);
    }); 
  }

  public onNotifyBookCollectionChanged(): void {
    console.log("notifyBookCollectionChanged");
    this.updateSelectedLibrary();
  }

  protected getUserName(): string {
    return this.userService.currUser.userName;
  }

  protected isAdmin = (): boolean => this.userService.currUser.userRole == UserRole.admin;

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
            this.openSnackBar(`Library: "${library.name}" successfully added!`, "Ok", {duration: 2000});
          },
          error: () => 
            this.openSnackBar("Can't add new library. Try Again", "Ok", {duration: 2000})
        });
  }
  
  protected deleteLibrary(delLibrary: Library): void {
    let deleteSnackBarRef = this.snackBar.open(`Do you really want to delete: "${delLibrary.name}" with all included books?`, "Delete", {duration: 2000});
    deleteSnackBarRef.onAction()
      .subscribe(()=>{
        this.libraryService.deleteLibrary(delLibrary.libraryId)
        .subscribe(
          () => this.librariesList = this.librariesList.filter(library => library.libraryId != delLibrary.libraryId)
        );
      });
  }

  protected openSnackBar(message: string, action: string, config: MatSnackBarConfig) {
    this.snackBar.open(message, action, config);
  }

  private updateSelectedLibrary(): void {
    this.bookService.getBooksByLibraryId(this.libraryService.selectedLibrary.libraryId)
    .subscribe(books => {
      console.log(`getBooks: ${books as Book[]}`);
      this.libraryService.selectedLibrary.books = books;
      this.chosenBooks = books
      console.log(books);
    }); 
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
}
