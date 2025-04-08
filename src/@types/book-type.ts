import { CategoryOnBookType } from "./category-on-book-type"
import { RatingType } from "./rating-type"



export type BookType={
    id:string,
    name:string,
    author:string,
    summary:string,
    cover_url:string,
    total_pages:number,
    created_at:Date,
    categories:CategoryOnBookType[],
    ratings:RatingType[],
    averageRating:number
}

