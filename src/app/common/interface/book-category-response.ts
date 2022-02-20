import { BookCategory } from "../book-category";

export interface BookCategoryResponse {
    _embedded: {
        bookCategory: BookCategory[];
    }
}