"use client";
import { RatingType } from "@/@types/rating-type";
import { api } from "../lib/axios";


export default async function postReview(review:RatingType) {
    const { data } = await api.post('/book/new-review',{data:review});
    return data
  }