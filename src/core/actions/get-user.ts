


"use client";
import { UserType } from "@/@types/user-type";
import { api } from "../lib/axios";


export type UserOutputType={
    user:UserType
    mostReadCategory?:string,
    totalAuthorReaded?:number,
    totalPagesReaded?:number
  }

export default async function getUser(userId:string) {
    const { data } = await api.get<UserOutputType>(`/user?userID=${userId}`);
    return data
  }