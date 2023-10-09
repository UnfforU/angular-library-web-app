import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Library } from '../models/models';
import { REPOS_API_URL } from '../app-injection-tokens';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };
  
  constructor(
    @Inject(REPOS_API_URL) private reposUrl: string,
    private http: HttpClient,
    private errHandler: ErrorHandlerService
  ) { }
  
  public getLibraries(): Observable<Library[]> {
    return this.http.get<Library[]>(`${this.reposUrl}/Libraries`)
      .pipe(
        tap((libraries: Library[]) => console.log('fetched libraries', libraries)),
        catchError(this.errHandler.handleError<Library[]>('getLibrary', []))
      )
  }

  public addLibrary(item: Library): Observable<Library> {
    return this.http.post<Library>(`${this.reposUrl}/Libraries`, item, this.httpOptions)
      .pipe(
        tap((library: Library) => console.log('added library w/', library)),
        catchError(this.errHandler.handleError<Library>('addLibrary'))
      )
  } 

  public deleteLibrary(libraryId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.reposUrl}/Libraries/${libraryId}`, this.httpOptions)
      .pipe(
        tap(_ => console.log(`deleted library guid={${libraryId}}`)),
        catchError(this.errHandler.handleError<boolean>('deleteLibrary'))
      )
  }
}
