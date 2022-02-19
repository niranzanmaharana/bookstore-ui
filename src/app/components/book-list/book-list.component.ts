import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { NgbPagination, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-list',
  // templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  categoryId: number = 1;
  searchMode: boolean = false;
  previousCategoryId: number = 1;

  // new properties for service side pagination
  currentPage: number = 1;
  pageSize: number = 1;
  totalRecords: number = 0;

  constructor(
    private _service: BookService,
    private _activatedRoute: ActivatedRoute,
    private _config: NgbPaginationConfig
  ) {
    _config.maxSize = 3;
  }

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
      this.categoryId = id == null ? -1 : +id;
    } else {
      this.categoryId = -1;
    }

    /**
     * Setting up the page number to 1, if the user naviagates to the different category
     */
    if (this.categoryId != this.previousCategoryId) {
      this.currentPage = 1;
    }

    this.previousCategoryId = this.categoryId;

    this._service.getBooks(this.categoryId,
                          this.currentPage - 1, 
                          this.pageSize).subscribe(
                            data => {
                            this.books = data._embedded.books;
                            this.currentPage = data.page.number + 1,
                            this.totalRecords = data.page.totalElements,
                            this.pageSize = data.page.size
                          });
  }

  handleSearchBooks() {
    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword') as string;
    this._service.searchBooks(keyword,
                              this.currentPage - 1, 
                              this.pageSize).subscribe(
                              data => {
                                this.books = data._embedded.books;
                                this.currentPage = data.page.number + 1,
                                this.totalRecords = data.page.totalElements,
                                this.pageSize = data.page.size
                              }
    );
  }

  onPageSizeChange(event: Event) {
    this.pageSize = +(event.target as HTMLSelectElement).value;
    this.loadBooks();
  }
}
