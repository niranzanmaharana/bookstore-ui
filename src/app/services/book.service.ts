import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { Book } from '../common/book';
import { BookCategory } from '../common/book-category';
import { BookResponse } from '../common/interface/book-response';
import { BookCategoryResponse } from '../common/interface/book-category-response';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl: string = 'http://localhost:8080/api/v1/books';
  private categoryUrl: string = 'http://localhost:8080/api/v1/book-category';

  constructor(
    private http: HttpClient
  ) { }

  getBooks(categoryId: number, currentPage: number, pageSize: number): Observable<BookResponse> {
    if (categoryId == -1) {
      return this.http.get<BookResponse>(`${this.baseUrl}/?page=${currentPage}&size=${pageSize}`);
    }
    const searchUrl = `${this.baseUrl}/search/category/?id=${categoryId}&page=${currentPage}&size=${pageSize}`;
    // return this.getBookList(searchUrl);
    return this.http.get<BookResponse>(searchUrl);
  }

  getBookCategories(): Observable<BookCategory[]> {
    return this.http.get<BookCategoryResponse>(this.categoryUrl).pipe(
      map(response => response._embedded.bookCategory)
    );
  }

  searchBooks(keyword: string, currentPage: number, pageSize: number): Observable<BookResponse> {
    const searchUrl = `${this.baseUrl}/search/searchbykeyword/?name=${keyword}&page=${currentPage}&size=${pageSize}`;
    return this.getBookList(searchUrl);
  }

  get(id: number): Observable<Book> {
    const bookInfoUrl = `${this.baseUrl}/${id}`;
    return this.http.get<Book>(bookInfoUrl);
  }

  private getBookList(searchUrl: string): Observable<BookResponse> {
    return this.http.get<BookResponse>(searchUrl);
  }
}
