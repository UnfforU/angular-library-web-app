import { Component } from '@angular/core';

import { BookDetailsComponent } from '../book-details/book-details.component';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from '../services/book.service';
import { Book } from '../models/models';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {

  public addBookFormHidden: boolean = true;

  public books: Book[] = [];

  public constructor(
    public dialog: MatDialog,
    private bookService: BookService,
  ){}

  protected openBookDetails(): void {
    console.log("open dialog");
    const dialogRef = this.dialog.open(BookDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  protected addBook(): void {
    this.addBookFormHidden = !this.addBookFormHidden;
  }

  protected saveNewBook(title: string, author: string, description: string): void {
    let newBook = {
      name: title,
      authorName: author,
      description: description,
      libraryId: "B91A70B5-493A-4038-B7AB-08DBC2CCCB35", //
      ownerId: "59729847-C8BA-42FD-8938-353B5DDC005A" //
    } as Book

    this.bookService.addBook(newBook)
      .subscribe(book => {
        console.log({book});
        this.books.push(book);
        this.addBookFormHidden = !this.addBookFormHidden;
    })
  }
}
