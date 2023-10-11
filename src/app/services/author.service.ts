import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { REPOS_API_URL } from '../app-injection-tokens';
import { Author } from '../models/models';
import { Observable, catchError, tap } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(
    @Inject(REPOS_API_URL) private reposUrl: string,
    private http: HttpClient,
    private errHandler: ErrorHandlerService
  ) { }

  public getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.reposUrl}/Authors`)
      .pipe(
        tap((authors: Author[]) => console.log('fetched authors', authors)),
        catchError(this.errHandler.handleError<Author[]>('getAuthors', []))
      )
  }

  public addAuthor(item: Author): Observable<Author> {
    return this.http.post<Author>(`${this.reposUrl}/Authors`, item)
      .pipe(
        tap((author: Author) => console.log('added author w/', author)),
        catchError(this.errHandler.handleError<Author>('addAuthor'))
      )
  } 

  public getConcatAuthors(authorsList: Author[]): string {
    return Array.from(authorsList, (author) => author.name).join(", ");
  }

}
