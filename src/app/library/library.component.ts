import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
  
})
export class LibraryComponent {
  public constructor(public dialog: MatDialog) {}

  protected openBookDetails(){
    console.log("open dialog");
    this.dialog.open(BookDetailsComponent);
  }
}
