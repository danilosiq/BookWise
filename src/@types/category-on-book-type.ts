import { BookType } from "./book-type"
import { CategoryType } from "./category-type"




export type CategoryOnBookType ={
    book_id:string,
    category_id:string,
    book:BookType,
    category:CategoryType
}