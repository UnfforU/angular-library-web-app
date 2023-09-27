import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizationComponent } from './authorization/authorization.component';

const routeConfig: Routes = [
  { path: '', redirectTo: '/authorization', pathMatch: 'full' },
  { path: 'authorization', component: AuthorizationComponent, title: 'Authorization Page' }
];

@NgModule({
  imports: [RouterModule.forRoot(routeConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
