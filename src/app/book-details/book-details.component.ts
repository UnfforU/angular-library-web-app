import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { Book } from '../models/models';
import { BookService } from '../services/book.service';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  public book?: Book;
  
  public oldVersionBook?: Book;

  protected updateBookFormHidden = true;

  public updateBookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })
  
  constructor(
    @Inject(MAT_DIALOG_DATA) injectBook: Book,
    private bookService: BookService
  ){
    this.book = injectBook;
  }

  protected useUpdateMode(): void {
    this.updateBookFormHidden = false;
    this.oldVersionBook = this.book;
  }

  protected saveUpdateChanges(): void {
    if(this.book){
      this.bookService.updateBook(this.book)
        .subscribe(book => {
          console.log(book);
        })
    }
    this.updateBookFormHidden = true;
      
  }

  protected revertChanges(): void{
    this.book = this.oldVersionBook;
  }

}
