import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs';

import { Author, Book } from '../models/models';
import { BookService } from '../services/book.service';
import { AuthorService } from '../services/author.service';
import { LibraryService } from '../services/library.service';

@Component({
  selector: 'app-add-change-book',
  templateUrl: './add-change-book.component.html',
  styleUrls: ['./add-change-book.component.css']
})
export class AddChangeBookComponent {
  public book: Book;
  public authorsList: Author[] = []; 
  public filteredAuthorsList: Author[] = [];

  public addUpdBookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  public constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private libraryService: LibraryService
  ) {
    this.book = this.bookService.selectedBook;

    if(this.book.bookId){
      this.addUpdBookForm.get('title')?.setValue(`${this.book.name}`);
      this.addUpdBookForm.get('author')?.setValue(`${this.book.authors[0].name}`);
      this.addUpdBookForm.get('description')?.setValue(`${this.book.description}`);
    }
  }

  public ngOnInit(): void {
    this.authorService.getAuthors()
      .subscribe(authors => {
          this.authorsList = authors,
          this.filteredAuthorsList = this.authorsList
        }
      );
  
    this.addUpdBookForm.get('author')?.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        )
        .subscribe((authors) =>
          this.filteredAuthorsList = authors
        );
  }

  protected displayFn(author: Author): string {
    return author && author.name ? author.name : '';
  }

  protected AddChangeFormClosed(title: string, authorName: string, description: string): void {
    let author = this.authorsList.find(author => author.name == authorName);

    if(this.bookService.selectedBook.bookId) {
      let updBook = this.bookService.selectedBook;
      updBook.name = title;
      updBook.description = description;
      if(author)
        updBook.authors.push(author);

      description = description;
      this.bookService.selectedBook = updBook;
      this.bookService.updateBook(updBook)
    }
    else {
      let newBook = {
        name: title,
        description: description,
        libraryId: this.libraryService.selectedLibrary.libraryId,
        authors: [] as Author[]
      } as Book
      if(author)
        newBook.authors.push(author);

      this.bookService.selectedBook = newBook;
      this.bookService.addBook(newBook).subscribe(
        () => console.log("call addBook")
      )
    }
    console.log(`AddChangeFormClosed = ${this.bookService.selectedBook.bookId}`);
  }

  private _filter(value: string): Author[] {
    return this.authorsList.filter(author => author.name.toLowerCase().includes(value.toLowerCase()))
  }
}
