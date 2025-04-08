"use client";
import { RatingType } from "@/@types/rating-type";
import { api } from "../lib/axios";

interface ReviewOutuptType{
  dailyReviews: RatingType[]
}

export default async function listRecentReviews() {
    const { data } = await api.get<RatingType[]>('/reviews/recent-reviews');
    return data
  }