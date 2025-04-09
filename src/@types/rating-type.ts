import { BookType } from "./book-type";
import { UserType } from "./user-type";



export type RatingType={
    id?:string,
    rate: number,
    description: string,
    created_at?:Date,
    book?:BookType,
    book_id:string,
    user?:UserType,
    user_id:string,
}