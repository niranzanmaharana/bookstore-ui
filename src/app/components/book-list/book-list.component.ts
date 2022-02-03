import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-list',
  // templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  categoryId: number;

  constructor(private _service: BookService,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(() => this.listBooks());
  }

  listBooks() {
    if (this._activatedRoute.snapshot.paramMap.has('id')) {
      let id = this._activatedRoute.snapshot.paramMap.get('id');
      this.categoryId = id == null ? 1 : +id;
    } else {
      this.categoryId = 1;
    }

    this._service.get(this.categoryId).subscribe(
      data => {
        this.books = data;
      }
    );
  }
}
