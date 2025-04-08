"use client";
import { BookType } from "@/@types/book-type";
import { api } from "../lib/axios";

interface BookOutuptType{
  books: BookType[]
}

export default async function listBooks() {
    const { data } = await api.get<BookOutuptType>('/book');
    return data
  }