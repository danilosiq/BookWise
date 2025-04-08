import { UserType } from "./user-type"


export type AccountType={
    id:string,
    user_id:string,
    type:string,
    provider:string,
    provider_account_id:string,
    refresh_token:string,
    access_token:string,
    expires_at:number
    token_type:string,
    scope:string,
    id_token:string,
    session_state:string,
    user:UserType
}