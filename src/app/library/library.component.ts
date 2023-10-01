import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { Library } from '../models/models';
import { LibraryService } from '../services/library.service';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
  
})
export class LibraryComponent {
  protected libraries: Library[] = [];

  public constructor(
    public dialog: MatDialog,
    private libraryService: LibraryService
  ) {
    this.openBookDetails();
  }

  public ngOnInit(): void {
    this.getLibraries();
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

  protected openBookDetails(){
    console.log("open dialog");
    const dialogRef = this.dialog.open(BookDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
