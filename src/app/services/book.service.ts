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

  get(): Observable<Book[]> {
    let temp: any = this.http.get<BookResponse>(this.baseUrl).pipe(
      map(response => response._embedded.books)
    );
    console.log(temp);
    return temp;
  }
}

interface BookResponse {
  _embedded: {
    books: Book[];
  }
}