import { BookCategory } from "../common/book-category";

interface BookCategoryResponse {
    _embedded: {
        bookCategory: BookCategory[];
    }
}