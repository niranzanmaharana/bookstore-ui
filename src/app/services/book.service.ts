import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { Book } from '../common/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  baseUrl: string = 'http://localhost:8080/api/v1/books';

  constructor(
    private http: HttpClient
  ) { }

  get(categoryId: number): Observable<Book[]> {
    const searchUrl = `${this.baseUrl}/search/category/?id=${categoryId}`;
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