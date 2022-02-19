import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent implements OnInit {
  book: Book = new Book();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _service: BookService
  ) { }

  ngOnInit(): void {
    let bookId: number = +this._activatedRoute?.snapshot?.paramMap?.get("id");
    this.loadBookInfo(bookId);
  }

  loadBookInfo(bookId: number) {
    this._service.get(bookId).subscribe(
      data => {
        this.book = data;
      }
    );
  }

}
