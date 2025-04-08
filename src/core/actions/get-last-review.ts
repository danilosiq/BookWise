"use client";
import { BookType } from "@/@types/book-type";
import { api } from "../lib/axios";

interface OutputLastBookReadedType{
lastBookReaded:BookType

}

export default async function getLastBookReaded(profileID?:string) {
    const { data } = await api.get<BookType>(`/profile/last-book-readed?profileID=${profileID}`);
    return data
  }