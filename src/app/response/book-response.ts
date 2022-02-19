import { Book } from "../common/book";

interface BookResponse {
    _embedded: {
        books: Book[];
    },
    page: {
        // number of records in each page
        size: number,
        // total number of records in the database
        totalElements: number,
        // total no of pages starts from index 0
        totalPages: number,
        // current page
        number: number
    }
}