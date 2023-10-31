import { Injectable, Inject } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Order } from '../models/models';
import { REPOS_API_URL } from '../app-injection-tokens';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
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

  public createOrder(order: Order): Observable<Order>{
    return this.http.post<Order>(`${this.reposUrl}/Orders`, order, this.httpOptions)
    .pipe(
      tap((order: Order) => console.log("added order w/ id" + order)),
      catchError(this.errHandler.handleError<Order>('addOrder'))
    )
  }
}
