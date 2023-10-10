import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { BookDetailsComponent } from '../book-details/book-details.component';

import { BookService } from '../services/book.service';
import { Author, Book, Library, User } from '../models/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  @Input() books : Book[] = [];
  @Input() currLibrary: Library = {} as Library;
  @Output() notifyBookCollectionChanged = new EventEmitter();

  public addBookFormHidden: boolean = true;

  public user: User;

  public addBookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  }) 

  public constructor(
    public dialog: MatDialog,
    private bookService: BookService,
    private userService: UserService
  ){
    this.user = this.userService.currUser
  }

  public ngOnInit(){
    console.log("books on init");
  }

  protected openBookDetails(chosenBook: Book): void {
    console.log(this.books);
    console.log(chosenBook);
    this.bookService.selectedBook = chosenBook;
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
      authors: [{authorId: "3A13976A-F4DC-4FAD-00A4-08DBC5979989", name: "Mark Manson"} as Author],
      description: description,
      libraryId: this.currLibrary?.libraryId
    } as Book

    console.log(newBook);
    this.bookService.addBook(newBook)
      .subscribe(book => {
        console.log({book});
        this.books.push(book);
        this.addBookFormHidden = !this.addBookFormHidden;
    })
  }

  protected deleteBook(bookId: string): void {
    console.log(bookId);
    this.bookService.deleteBook(bookId)
      .subscribe(books => {
        console.log(books);
        this.books = books;
        this.notifyBookCollectionChanged.emit(); 
      })
  }
}
