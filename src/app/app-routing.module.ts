import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookInfoComponent } from './components/book-info/book-info.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'books', component: BookListComponent },
  { path: 'books/:id', component: BookInfoComponent },
  { path: 'cart-detail', component: CartDetailComponent },
  { path: 'category/:id', component: BookListComponent },
  { path: 'search/:keyword', component: BookListComponent },
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }