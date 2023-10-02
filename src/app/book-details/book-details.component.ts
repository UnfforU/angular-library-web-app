import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Book } from '../models/models';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  public book?: Book; 

  constructor(
    @Inject(MAT_DIALOG_DATA) injectBook: Book,
  ){
    this.book = injectBook;
  }

}
