import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { Library, Book } from '../models/models';
import { LibraryService } from '../services/library.service';
import { AuthService } from '../services/auth.service';
import { BookService } from '../services/book.service';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
  
})
export class LibraryComponent implements OnInit {
  protected libraries: Library[] = [];
  public newLibrary: Library | null = null;
  public chosenBooks: Book[] = [];

  public constructor(
    private libraryService: LibraryService,
    private authService: AuthService,
    private bookService: BookService,
  ) {
    // this.openBookDetails();
  }

  public ngOnInit(): void {
    this.getLibraries();
  }

  public logOut(): void {
    this.authService.logOut();
  }

  public chooseLibrary(library: Library): void{
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

  protected addLibrary(): void {
    if(this.newLibrary)
      this.libraryService.addLibrary(this.newLibrary)
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

  
}
