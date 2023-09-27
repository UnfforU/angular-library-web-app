import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizationComponent } from './authorization/authorization.component';
import { LibraryComponent } from './library/library.component';

const routeConfig: Routes = [
  { path: '', redirectTo: '/library', pathMatch: 'full' },
  { path: 'authorization', component: AuthorizationComponent, title: 'Authorization Page' },
  { path: 'library', component: LibraryComponent, title: 'Library Page' }
];

@NgModule({
  imports: [RouterModule.forRoot(routeConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
