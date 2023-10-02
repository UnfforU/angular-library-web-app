import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Library } from '../models/models';
import { REPOS_API_URL } from '../app-injection-tokens';

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
    private http: HttpClient
  ) { }

  public addLibrary(item: Library): Observable<Library> {
    return this.http.post<Library>(`${this.reposUrl}/library`, item, this.httpOptions)
      .pipe(
        tap((library: Library) => console.log(`added library w/ id=${library.libraryId}`)),
        catchError(this.handleError<Library>('addLibrary'))
      )
  } 

  public deleteLibrary(guid: string): Observable<Library[]> {
    return this.http.delete<Library[]>(`${this.reposUrl}/library/${guid}`, this.httpOptions)
      .pipe(
        tap(_ => console.log(`deleted library guid={${guid}}`)),
        catchError(this.handleError<Library[]>('deleteLibrary'))
      )
  }

  public getLibraries(): Observable<Library[]> {
    return this.http.get<Library[]>(`${this.reposUrl}/library`)
      .pipe(
        tap(_ => console.log('fetched libraries')),
        catchError(this.handleError<Library[]>('getLibrary', []))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
