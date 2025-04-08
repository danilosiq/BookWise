"use client";
import { BookType } from "@/@types/book-type";
import { api } from "../lib/axios";

interface BookOutuptType{
  topFivePopularBooks: BookType[]
}

export default async function listPopularBooks() {
    const { data } = await api.get<BookOutuptType>('/book/popular-books');
    return data
  }