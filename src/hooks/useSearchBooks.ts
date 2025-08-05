"use client";

import { useQuery } from "@tanstack/react-query";
import Book from "@/book";
import axios from "axios";



export const useSearchBooks = (query: string) => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOK_API_KEY;

  return useQuery<Book[]>({
    queryKey: ["searchBooks", query],
    queryFn: async () => {
      if (!query) return [];

      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&maxResults=10&key=${API_KEY}`
      );
      const data = response.data.items || [];

      return data.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.author,
        image:
          item.volumeInfo.imageLinks?.thumbnail ??
          "https://via.placeholder.com/150x220",
        price: Math.floor(Math.random() * (30 - 10) + 10),
        oldPrice: Math.floor(Math.random() * (50 - 31) + 31),
        rating: Math.floor(Math.random() * 5) + 1,
        reviews: Math.floor(Math.random() * 1000),
      }));
    },
    enabled: !!query,
  });
};
