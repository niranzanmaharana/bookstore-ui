import { Component, OnInit } from '@angular/core';
import { BookCategory } from 'src/app/common/book-category';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.css']
})
export class BookCategoryComponent implements OnInit {
  categories: BookCategory[];

  constructor(
    private _service: BookService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this._service.getBookCategories().subscribe(
      data => {
        this.categories = data;
      }
    );
  }

}
