import { BookType } from "./book-type";
import { UserBaseType } from "./user-type";



export type RatingType={
    id?:string,
    rate: number,
    description: string,
    created_at?:Date,
    book?:BookType,
    book_id:string,
    user?:UserBaseType,
    user_id:string,
}