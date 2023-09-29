import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
  
})
export class LibraryComponent {
  public constructor(public dialog: MatDialog) {
    this.openBookDetails();
  }

  protected openBookDetails(){
    console.log("open dialog");
    const dialogRef = this.dialog.open(BookDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
