


"use client";
import { UserType } from "@/@types/user-type";
import { api } from "../lib/axios";

export type UserOutputType={
  profile:UserType
  mostReadCategory?:string,
  totalAuthorReaded?:number,
  totalPagesReaded?:number
}

export default async function getProfile(profileID?:string) {
    const { data } = await api.get<UserOutputType>(`/profile?profileID=${profileID}`);
    return data
  }