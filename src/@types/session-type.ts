import { UserType } from "./user-type"



export type SessionType={
    id:string,
    session_token:string,
    user_id:string,
    expires:Date,
    user:UserType
}