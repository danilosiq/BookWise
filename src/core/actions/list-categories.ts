"use client";
import { api } from "../lib/axios";

export default async function listCategories() {
    const { data } = await api.get('/book/categories');
    return data
  }