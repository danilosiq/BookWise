import { AccountType } from "./account-type"
import { RatingType } from "./rating-type"
import { SessionType } from "./session-type"


export type UserType={
    id:string,
    name:string,
    avatar_url:string,
    created_at:Date,
    accounts:AccountType[],
    sessions:SessionType[],
    ratings:RatingType[],

}

