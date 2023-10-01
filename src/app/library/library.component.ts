import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { Library } from '../models/models';
import { LibraryService } from '../services/library.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
  
})
export class LibraryComponent implements OnInit {
  protected libraries: Library[] = [];
  public newLibrary: Library | null = null;

  public constructor(
    private libraryService: LibraryService,
    private authService: AuthService
  ) {
    // this.openBookDetails();
  }

  public ngOnInit(): void {
    this.getLibraries();
  }

  public logOut(): void {
    this.authService.logOut();
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
