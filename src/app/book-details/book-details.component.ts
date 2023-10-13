import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Book, Order, UserRole } from '../models/models';
import { BookService } from '../services/book.service';
import { UserService } from '../services/user.service';
import { AuthorService } from '../services/author.service';
import { AddChangeBookComponent } from '../add-change-book/add-change-book.component';
import { OrderService } from '../services/order.service';

interface DateRange {
  start: Date,
  end: Date
}

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent {
  public book: Book;
  public oldVersionBook?: Book;
  public sortedOrderList: Order[] = [];
  
  public bookedPeriodEnds: Date = new Date();
  public nowDate: Date = new Date();
  
  protected updateBookFormHidden = true;
  
  public bookedDateRange = new FormGroup({
    start: new FormControl(new Date(), Validators.required),
    end: new FormControl(new Date(), Validators.required),
  });

  constructor(
    public dialog: MatDialog,
    private bookService: BookService,
    protected userService: UserService,
    protected authorService: AuthorService,
    private orderService: OrderService,
    
  ){
    this.book = this.bookService.selectedBook;
    console.log("book-details comn");
    this.sortedOrderList = this.book.orders.sort(order => new Date(order.startDateTime).getTime());
    console.log(this.sortedOrderList);
  }

  protected isAdmin = (): boolean => this.userService.currUser.userRole == UserRole.admin;
  
  protected myFilter = (d: Date): boolean => {
    return this.myFilterFunc(d)
  };
  private myFilterFunc(d: Date): boolean {
    let ordersList = this.bookService.selectedBook.orders;
    var dateRanges: DateRange[] = [];
   
    ordersList.forEach(order => {
      dateRanges.push({
        start: this.removeTime(new Date(order.startDateTime)), 
        end: this.removeTime(new Date(order.endDateTime))
      });
    });
    let res = true;
    dateRanges.forEach(tmp => {
      if(res && d >= tmp.start && d <= tmp.end)
        res = false;
    })
    return res
  } 

  protected openAddUpdateForm(): void {
    const dialogRef = this.dialog.open(AddChangeBookComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(`Dialog result: ${result}`);
      }
      
    });
  }

  private addHours(date: Date, hours: number) {
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  
    return date;
  }

  private removeTime(date: Date) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
  }

  protected serveBook(): void {
    let newOrder = {
      userId: this.userService.currUser.userId,
      bookId: this.bookService.selectedBook.bookId,
      startDateTime: this.addHours(this.bookedDateRange.get('start')?.value!, 3),
      endDateTime: this.addHours(this.bookedDateRange.get('end')?.value!, 3),
    } as Order;
    console.log(newOrder);

    this.bookedDateRange.reset();
    this.orderService.createOrder(newOrder)
      .subscribe((order) => {
        this.bookService.selectedBook.orders.push(order);
        console.log(`new order ${order}`);
      })
  }
}
