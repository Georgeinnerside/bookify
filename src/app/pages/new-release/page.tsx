"use client";

import { useState, useEffect } from "react";
import NewReleaseCard from "@/app/pages/new-release/NewReleaseCard";
import NewReleaseSidebar from "@/app/pages/new-release/NewReleaseSidebar";
import SkeletonCard from "@/components/loading/skeletonLoader";
import LandingSection from "@/service/LandingSection";

import Book from "@/book";
import axios from "axios";

// const books = [
//   {
//     id: "1",
//     image: "/books/zen.jpg",
//     title: "Zen",
//     author: "Taylor Rawlings",
//     rating: 4.8,
//     reviews: 12487,
//     price: 21.99,
//     oldPrice: 25.99,
//     discount: "Save $4.00",
//     publishDate: "03-07-2025",
//   },
//   {
//     id: "2",
//     image: "/books/brethren.jpg",
//     title: "The Brethren",
//     author: "Roman Weidenfeller",
//     rating: 4.9,
//     reviews: 15621,
//     price: 19.99,
//     oldPrice: 24.99,
//     discount: "Save $5.00",
//     publishDate: "06-12-2024",
//   },
// ];

const genreList = [
  "Fiction",
  "Mystery",
  "Biography",
  "Romance",
  "History",
  "Comic",
];

export default function NewReleasePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOK_API_KEY;
  const query = "lastest";
  const URL = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=12&key=${API_KEY}`;

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(URL);
        const fetchedBooks: Book[] = res.data.items.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors || ["Unknown Author"],
          image: item.volumeInfo.imageLinks.thumbnail || "via.placeholder.com",
          price: Math.floor(Math.random() * (30 - 10) + 10),
          oldPrice: Math.floor(Math.random() * (50 - 31) + 31),
          rating: Math.floor(Math.random() * 5) + 1,
          reviews: Math.floor(Math.random() * 1000),
          genre: item.volumeInfo.categories?.[0] || query,
        }));
        setBooks(fetchedBooks);
        setFilteredBooks(fetchedBooks);
        setIsLoading(false);
      } catch (error) {
        console.error("couldn't fetch book", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleFilteredChange = (filters: {
    priceRange: [number, number];
    selectedGenres: string[];
    selectedRating: number | null;
  }) => {
    const { priceRange, selectedGenres, selectedRating } = filters;
    let result = books;

    // apply price filter
    result = result.filter(
      (b) => b.price >= priceRange[0] && b.price <= priceRange[1]
    );

    // apply genre filter
    if (selectedGenres.length > 0) {
      result = result.filter((b) => selectedGenres.includes(b.genre));
    }

    // apply rating
    if (selectedRating) {
      result = result.filter((b) => b.rating === selectedRating);
    }

    setFilteredBooks(result);
  };

  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <LandingSection>
        <div className="bg-green-100 py-10 mb-4 mx-0">
          <h1 className="text-2xl text-gray-800 font-bold text-center">
            New Release
          </h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            Discover the most popular and highly rated books that everyone is
            talking about
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <NewReleaseSidebar
            genres={genreList}
            onFilteredChange={handleFilteredChange}
          />

          <section className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 items-stretch">
              {isLoading
                ? Array.from({ length: 12 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))
                : books.map((book) => (
                    <NewReleaseCard key={book.id} book={book} />
                  ))}
            </div>
          </section>
        </div>
      </LandingSection>
    </main>
  );
}
