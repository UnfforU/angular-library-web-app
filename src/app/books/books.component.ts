import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BookDetailsComponent } from '../book-details/book-details.component';

import { BookService } from '../services/book.service';
import { Book, Library, User, UserRole } from '../models/models';
import { UserService } from '../services/user.service';
import { AddChangeBookComponent } from '../add-change-book/add-change-book.component';
import { AuthorService } from '../services/author.service';
import * as FileSaver from 'file-saver';
import { Buffer } from 'buffer/';



@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  @Input() books : Book[] = [];
  @Input() currLibrary: Library = {} as Library;
  @Output() notifyBookCollectionChanged = new EventEmitter();

  public addBookFormHidden: boolean = true;

  public user: User;

  public fileName: string = "";

  public addBookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  }) 

  public constructor(
    public dialog: MatDialog,
    private bookService: BookService,
    private userService: UserService,
    protected authorService: AuthorService,
    private router: Router,
    private snackBar: MatSnackBar
  ){
    this.user = this.userService.currUser
  }

  public ngOnInit(){
    console.log("books on init");
  }

  protected isAdmin = (): boolean => this.userService.currUser.userRole == UserRole.admin;

  protected onFileSelected(event: any) {
    // const inputNode: any = document.querySelector('#file');
  
    // if (typeof (FileReader) !== 'undefined') {
    //   const reader = new FileReader();
  
    //   console.log(inputNode);
    //   reader.onload = (e: any) => {
    //     this.srcResult = e.target.result;
    //     console.log(`result= ${this.srcResult}`);
    //     console.log("nice");
    //   };
  
    //   reader.readAsArrayBuffer(inputNode.files[0]);
    // }

    const file:File = event.target.files[0];

        if (file) {

            this.fileName = file.name;

            const formData = new FormData();
            formData.append("file", file);
            console.log(formData);
            
            this.bookService.uploadFile(formData).subscribe(res => console.log('File Uploaded ...'));

          

            // const upload$ = this.http.post("/api/thumbnail-upload", formData);

            // upload$.subscribe();
        }
  }

  protected getFileByBookId(bookId: string): void {
    this.bookService.getFileByBookId(bookId)
      .subscribe((res) => {
        let blob = Buffer.from(res.fileContent, 'base64');
        const file = new Blob([blob], {type: res.contentType});
        FileSaver.saveAs(file, res.fileName);
    });
  }

  protected openBookDetails(chosenBook: Book): void {
    console.log(this.books);
    console.log(chosenBook);
    this.bookService.selectedBook = chosenBook;
    const dialogRef = this.dialog.open(BookDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  protected addBook(): void {
    this.bookService.selectedBook = {} as Book;
    const dialogRef = this.dialog.open(AddChangeBookComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(`Dialog result: ${result}`);
        console.log(this.bookService.selectedBook);
        // this.books.push(this.bookService.selectedBook);
        this.notifyBookCollectionChanged.emit();
        this.snackBar.open(`Library: "${this.bookService.selectedBook.name}" successfully added!`, "Ok", {duration: 3000});
      }
    });
  }

  protected deleteBook(book: Book): void {
    console.log(book);
    let deleteSnackBarRef = this.snackBar.open(`Do you really want to delete: "${book.name}"?`, "Delete", {duration: 3000});
    deleteSnackBarRef.onAction()
      .subscribe(()=>
        this.bookService.deleteBook(book.bookId)
        .subscribe(books => {
          console.log(books);
          this.books = books;
          this.notifyBookCollectionChanged.emit(); 
        })
      )
  }
}
