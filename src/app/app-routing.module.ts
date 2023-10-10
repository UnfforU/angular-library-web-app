import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizationComponent } from './authorization/authorization.component';
import { LibraryComponent } from './library/library.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { authGuard } from './guards/auth.guard';
import { AddChangeBookComponent } from './add-change-book/add-change-book.component';

const routeConfig: Routes = [
  { path: '', redirectTo: '/authorization', pathMatch: 'full' },
  { path: 'authorization', component: AuthorizationComponent, title: 'Authorization Page' },
  { path: 'library', component: LibraryComponent, title: 'Library Page', canActivate: [authGuard]},
  // { path: 'bookdetails', component: BookDetailsComponent, title: 'Book Details' },
];

@NgModule({
  imports: [RouterModule.forRoot(routeConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
