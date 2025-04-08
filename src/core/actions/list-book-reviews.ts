


"use client";
import { api } from "../lib/axios";

export default async function listBookReviews(bookId:string) {
    const { data } = await api.get(`/book/reviews?bookId=${bookId}`);
    return data
  }