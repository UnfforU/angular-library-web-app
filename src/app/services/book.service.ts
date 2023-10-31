import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

import { REPOS_API_URL } from '../app-injection-tokens';
import { Book } from '../models/models';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };

  private _selectedBook: Book = {} as Book;
  public get selectedBook() {
    return this._selectedBook
  }
  public set selectedBook(value: Book) {
    if(value != this._selectedBook)
      this._selectedBook = value 
  }

  constructor(
    @Inject(REPOS_API_URL) private reposUrl: string,
    private http: HttpClient,
    private errHandler: ErrorHandlerService
  ) { }
  
  public addBook(item: Book): Observable<Book> {
    return this.http.post<Book>(`${this.reposUrl}/Books`, item, this.httpOptions)
      .pipe(
        tap((book: Book) => console.log(`added book w/ id=${book.libraryId}`)),
        catchError(this.errHandler.handleError<Book>('addBook'))
      )
  } 

  public getBooksByLibraryId(libraryId: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.reposUrl}/Books/${libraryId}`)
    .pipe(
      tap(_ => console.log(`fetched books id=${libraryId}`)),
      catchError(this.errHandler.handleError<Book[]>('getBooksById', []))
    );
  }

  public deleteBook(bookId: string): Observable<Book[]> {
    return this.http.delete<Book[]>(`${this.reposUrl}/Books/${bookId}`, this.httpOptions)
      .pipe(
        tap(_ => console.log(`deleted book guid={${bookId}}`)),
        catchError(this.errHandler.handleError<Book[]>('deleteBook'))
      )
  }
  
  public updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.reposUrl}/Books/${book.bookId}`, book, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated book id=${book.bookId}`)),
        catchError(this.errHandler.handleError<Book>('updateBook'))
      );
  }

}
