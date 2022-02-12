import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { Book } from '../common/book';
import { BookCategory } from '../common/book-category';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl: string = 'http://localhost:8080/api/v1/books';
  private categoryUrl: string = 'http://localhost:8080/api/v1/book-category';

  constructor(
    private http: HttpClient
  ) { }

  getBooks(categoryId: number): Observable<Book[]> {
    const searchUrl = `${this.baseUrl}/search/category/?id=${categoryId}`;
    return this.getBookList(searchUrl);
  }

  getBookCategories(): Observable<BookCategory[]> {
    return this.http.get<BookCategoryResponse>(this.categoryUrl).pipe(
      map(response => response._embedded.bookCategory)
    );
  }

  searchBooks(keyword: string): Observable<Book[]> {
    const searchUrl = `${this.baseUrl}/search/searchbykeyword/?name=${keyword}`;
    return this.getBookList(searchUrl);
  }

  get(id: number): Observable<Book> {
    const bookInfoUrl = `${this.baseUrl}/${id}`;
    return this.http.get<Book>(bookInfoUrl);
  }

  private getBookList(searchUrl: string): Observable<Book[]> {
    return this.http.get<BookResponse>(searchUrl).pipe(
      map(response => response._embedded.books)
    );
  }
}

interface BookResponse {
  _embedded: {
    books: Book[];
  }
}

interface BookCategoryResponse {
  _embedded: {
    bookCategory: BookCategory[];
  }
}