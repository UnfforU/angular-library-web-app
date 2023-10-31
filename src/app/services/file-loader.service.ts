import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';

import { ErrorHandlerService } from './error-handler.service';
import { REPOS_API_URL } from '../app-injection-tokens';
import { FileDTO } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class FileLoaderService {

  constructor(
    @Inject(REPOS_API_URL) private reposUrl: string,
    private http: HttpClient,
    private errHandler: ErrorHandlerService
  ) { }

  public uploadFile(item: FormData): Observable<boolean>{
    return this.http.post<boolean>(`${this.reposUrl}/Files`, item)
      .pipe(
        tap((res: boolean) => console.log(res)),
        catchError(this.errHandler.handleError<boolean>('uploadFile'))
      );
  }
  
  public getFileByBookId(bookId: string): Observable<FileDTO> {
    return this.http.get<FileDTO>(`${this.reposUrl}/Files/${bookId}`)
      .pipe(
        tap(_ => console.log(`get file by book id=${bookId}`)),
        catchError(this.errHandler.handleError<FileDTO>('getFileByBookId'))
      );
  }
}
