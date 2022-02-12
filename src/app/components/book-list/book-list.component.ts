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
  searchMode: boolean;

  constructor(
    private _service: BookService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(() => this.loadBooks());
  }

  loadBooks() {
    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');
    /**
     * If user is searching for books with some keyword then use search method,
     * otherwise use list books method.
     */
    if (this.searchMode) {
      this.handleSearchBooks();
    } else {
      this.handleBoolListBooks();
    }
  }

  handleBoolListBooks() {
    if (this._activatedRoute.snapshot.paramMap.has('id')) {
      let id = this._activatedRoute.snapshot.paramMap.get('id');
      this.categoryId = id == null ? 1 : +id;
    } else {
      this.categoryId = 1;
    }

    this._service.getBooks(this.categoryId).subscribe(
      data => {
        this.books = data;
      }
    );
  }

  handleSearchBooks() {
    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword') as string;
    this._service.searchBooks(keyword).subscribe(
      data => {
        this.books = data;
      }
    );
  }
}
