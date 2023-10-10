import { Component, Input, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { Author, Book } from '../models/models';
import { BookService } from '../services/book.service';
import { UserService } from '../services/user.service';
import { AuthorService } from '../services/author.service';
import { map, startWith } from 'rxjs';
import { AddChangeBookComponent } from '../add-change-book/add-change-book.component';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  public book: Book;
  public oldVersionBook?: Book;
  
  public bookedPeriodEnds: Date = new Date();
  
  public isAdmin: boolean | undefined = this.userService.currUser?.isAdmin;

  protected updateBookFormHidden = true;

  private startBookedDate = new Date();
  
  public bookedDateRange = new FormGroup({
    start: new FormControl<Date>(new Date, Validators.required),
    end: new FormControl<Date>(new Date, Validators.required),
  });
  constructor(
    public dialog: MatDialog,
    private bookService: BookService,
    private userService: UserService,
    protected authorService: AuthorService,
  ){
    this.book = this.bookService.selectedBook;
    // this.bookedDate.controls.startBookedDate.setValue(`${this.startBookedDate}`);
    // this.bookedDate.controls.endBookedDate.setValue(`${this.book.bookedDate}`);
    // console.log(this.book.bookedDate);
    // console.log(this.startBookedDate);
    // this.bookedDateRange.disable();
  }

  protected openAddUpdateForm(): void {

    const dialogRef = this.dialog.open(AddChangeBookComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(`Dialog result: ${result}`);
      }
      
    });
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
    // this.book = this.oldVersionBook;
    this.updateBookFormHidden = true;
  }

  protected serveBook(book: Book): void {
    book.isBooked = true;
    // let endBookedDate = this.bookedDate.get('endBookedDate')?.value;
    // book.bookedDate = new Date(endBookedDate ? endBookedDate : "");
    book.ownerId = this.userService.currUser.userId;

    console.log("serveBook");
    console.log(book);

    this.bookService.updateBook(book)
        .subscribe(book => {
          console.log(book);
        })
  }
}
