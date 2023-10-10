import { Component, Input, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { Author, Book } from '../models/models';
import { BookService } from '../services/book.service';
import { UserService } from '../services/user.service';
import { AuthorService } from '../services/author.service';
import { map, startWith } from 'rxjs';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  public book: Book;
  public bookedPeriodEnds: Date = new Date();
 
  public authorsList: Author[] = []; 
  public filteredAuthorsList: Author[] = [];
  public oldVersionBook?: Book;

 
  
  public isAdmin: boolean | undefined = this.userService.currUser?.isAdmin;

  protected updateBookFormHidden = true;

  public updateBookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  public bookedDate = new FormControl('', Validators.required);
  
  constructor(
    private bookService: BookService,
    private userService: UserService,
    private authorService: AuthorService,
  ){
    this.book = this.bookService.selectedBook;
    this.bookedDate.setValue(`${this.book.bookedDate}`);
    this.bookedDate.disable();
  }

  public ngOnInit() {
    this.authorService.getAuthors()
      .subscribe(
        authors => {
          this.authorsList = authors,
          this.filteredAuthorsList = this.authorsList
          console.log(this.authorsList);
        }
      );
  
    this.updateBookForm.get('author')?.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        )
        .subscribe((authors) =>
          this.filteredAuthorsList = authors
        );
  }

  private _filter(value: string): Author[] {
    return this.authorsList.filter(author => author.name.toLowerCase().includes(value.toLowerCase()))
  }

  protected displayFn(author: Author): string {
    return author && author.name ? author.name : '';
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
    // this.book = this.oldVersionBook;
    this.updateBookFormHidden = true;
  }

  protected serveBook(book: Book): void {
    book.isBooked = true;
    book.bookedDate = new Date(this.bookedDate.value!);
    book.ownerId = this.userService.currUser.userId;

    console.log("serveBook");
    console.log(book);

    this.bookService.updateBook(book)
        .subscribe(book => {
          console.log(book);
        })
  }
}
