import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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

  private _selectedLibrary: Library = {} as Library;
  public get selectedLibrary() {
    return this._selectedLibrary;
  }
  public set selectedLibrary(value: Library) {
    if(value != this._selectedLibrary)
      this._selectedLibrary = value;
  } 
  
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
