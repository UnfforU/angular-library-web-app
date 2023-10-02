import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { BookDetailsComponent } from '../book-details/book-details.component';

import { BookService } from '../services/book.service';
import { Book, Library } from '../models/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  @Input() books : Book[] = [];
  @Input() currLibrary?: Library;

  public addBookFormHidden: boolean = true;

  public addBookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  }) 

  public constructor(
    public dialog: MatDialog,
    private bookService: BookService,
  ){
  }

  protected openBookDetails(chosenBook: Book): void {
    console.log(this.books);
    console.log(chosenBook);
    const dialogRef = this.dialog.open(BookDetailsComponent, 
    // {
    //   data: {book: chosenBook},
    // });
    {
      data: chosenBook
    });

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
      libraryId: this.currLibrary?.libraryId, //
      ownerId: "59729847-C8BA-42FD-8938-353B5DDC005A" //
    } as Book

    this.bookService.addBook(newBook)
      .subscribe(book => {
        console.log({book});
        this.books.push(book);
        this.addBookFormHidden = !this.addBookFormHidden;
    })
  }

  protected deleteBook(bookId: string): void {
    this.bookService.deleteBook(bookId)
      .subscribe(books => {
        console.log(books);
        this.books = books;
      })
  }
}