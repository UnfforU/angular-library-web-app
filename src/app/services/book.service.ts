import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';



import { REPOS_API_URL } from '../app-injection-tokens';
import { Book, FileDTO } from '../models/models';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private _selectedBook: Book = {} as Book;
  public get selectedBook() {
    return this._selectedBook
  }
  public set selectedBook(value: Book) {
    if(value != this._selectedBook)
      this._selectedBook = value
    
  }
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };
  private options = { responseType:'blob' as 'json'
};

  constructor(
    @Inject(REPOS_API_URL) private reposUrl: string,
    private http: HttpClient,
    private errHandler: ErrorHandlerService
  ) { }

  public uploadFile(item: FormData): Observable<boolean>{
    return this.http.post<boolean>(`${this.reposUrl}/Files`, item)
      .pipe(
        tap((res: boolean) => console.log(res)),
        catchError(this.errHandler.handleError<boolean>('addBook'))
      );
  }

  
  public getFileByBookId(bookId: string): Observable<FileDTO> {
    return this.http.get<FileDTO>(`${this.reposUrl}/Files/${bookId}`)
    .pipe(
      tap(_ => console.log(`get file by book id=${bookId}`)),
      catchError(this.errHandler.handleError<FileDTO>('getFileByBookId'))
    );
  }

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
