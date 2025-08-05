"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PopularBooksCard } from "./cards/PopularBooksCard";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SkeletonCard from "./loading/skeletonLoader";
import Book from "@/book";
import axios from "axios";

export default function PopularBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOK_API_KEY;
  const query = "trending";
  const URL = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=3&key=${API_KEY}`;

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const res = (await axios.get(URL)) || [];
        console.log(res.data.items);
        const fetchedBooks: Book[] = res.data.items.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title || "Unkown Title",
          authors: item.volumeInfo.authors || ["Unkown Author"],
          description:
            item.volumeInfo.describtion || "Describtion not available",
          image: item.volumeInfo.imageLinks?.thumbnail || "/placeholder.jpg",
          price: Math.floor(Math.random() * (30 - 10) + 10),
          oldPrice: Math.floor(Math.random() * (50 - 31) + 31),
          rating: Math.floor(Math.random() * 5) + 1,
          reviews: Math.floor(Math.random() * 1000),
          badge: query,
        }));
        setBooks(fetchedBooks);

        setIsLoading(false);
      } catch (error) {
        console.error("couldn't fetch book", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="py-10 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4 px-4">
        <div>
          <h2 className="text-gray-800 text-2xl font-bold">Popular Books</h2>
          <p className="text-gray-600 sm:text-xs md:text-xl">
            Trending reads that everyone is talking about
          </p>
        </div>
        <button className="text-xs font-bold text-blue-600">
          <Link href="/pages/bestsellers">
            View all <ArrowForwardIcon />{" "}
          </Link>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 items-stretch">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : books.map((book) => <PopularBooksCard key={book.id} book={book} />)}
      </div>
    </section>
  );
}
