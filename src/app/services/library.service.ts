import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Library } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private RepositoryUrl: string = 'http://localhost:5065/api/Library';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };
  
  constructor(
    private http: HttpClient
  ) { }

  public addLibrary(item: Library): Observable<Library> {
    return this.http.post<Library>(this.RepositoryUrl, item, this.httpOptions)
      .pipe(
        tap((library: Library) => console.log(`added library w/ id=${library.libraryId}`)),
        catchError(this.handleError<Library>('addLibrary'))
      )
  } 

  public deleteLibrary(guid: string): Observable<Library[]> {
    return this.http.delete<Library[]>(`${this.RepositoryUrl}/${guid}`, this.httpOptions)
      .pipe(
        tap(_ => console.log(`deleted library guid={${guid}}`)),
        catchError(this.handleError<Library[]>('deleteLibrary'))
      )
  }

  public getLibraries(): Observable<Library[]> {
    return this.http.get<Library[]>(this.RepositoryUrl)
      .pipe(
        tap(_ => console.log('fetched heroes')),
        catchError(this.handleError<Library[]>('getHeroes', []))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
