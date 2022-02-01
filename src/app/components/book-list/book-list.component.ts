import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private service: BookService) { }

  ngOnInit(): void {
    this.service.get().subscribe(
      data => {
        this.books = data;
      }
    );
  }
}
