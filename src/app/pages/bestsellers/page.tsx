"use client";

import { useState, useEffect, useCallback } from "react";
import BestsellersCard from "@/app/pages/bestsellers/BestsellersCard";
import BestsellersSidebar from "./BestsellersSidebar";
import SkeletonCard from "@/components/loading/skeletonLoader";
import LandingSection from "@/service/LandingSection";
import Book from "@/book";
import axios from "axios";

type Filters = {
  priceRange: [number, number];
  selectedGenres: string[];
  selectedRating: number | null;
};

const genreList = [
  "Fiction",
  "Mystery",
  "Biography",
  "Romance",
  "History",
  "Comic",
];

function highResImage(volumeInfo: any) {
  if (volumeInfo.imageLinks?.thumbnail) {
    return volumeInfo.imageLinks.thumbnail.replace("zoom=1", "zoom=3");
  }

  const isbn = volumeInfo.industryIdentifiers?.find(
    (id: any) => id.type === "ISBN_10"
  ).identifier;

  if (isbn) {
    return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
  }

  return "https://via.placeholder.com/150x220?text=No+Image";
}

//   {
//     id: "1",
//     image: "/books/hugo.jpg",
//     title: "The Seven Husbands of Evelyn Hugo",
//     author: "Taylor Jenkins Reid",
//     rating: 4.8,
//     reviews: 12487,
//     price: 21.99,
//     oldPrice: 25.99,
//     discount: "Save $4.00",
//     publishDate: "08-03-2002",
//   },
//   {
//     id: "2",
//     image: "/books/selfhelp.jpg",
//     title: "Atomic Habits",
//     author: "James Clear",
//     rating: 4.9,
//     reviews: 15621,
//     price: 19.99,
//     oldPrice: 24.99,
//     discount: "Save $5.00",
//     publishDate: "18-07-2005",
//   },
// ];

export default function BestsellersPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOK_API_KEY;
  const query = "bestsellers";
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
          image: highResImage(item.volumeInfo) || "via.placeholder.com",
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
  }, [URL]);

  const handleFilteredChange = useCallback(
    (filters: Filters) => {
      const { priceRange, selectedGenres, selectedRating } = filters;
      let result = books;

      // apply price filter
      result = result.filter(
        (b) => b.price >= priceRange[0] && b.price <= priceRange[1]
      );

      // Applt genre filter
      if (selectedGenres.length > 0) {
        result = result.filter((b) => selectedGenres.includes(b.genre));
      }

      // apply rating
      if (selectedRating) {
        result = result.filter((b) => b.rating >= selectedRating);
      }

      setFilteredBooks(result);
    },
    [books]
  );

  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <LandingSection>
        <div className="bg-blue-100 py-10 mb-4">
          <h1 className="text-gray-700 text-2xl font-bold text-center">
            Bestsellers
          </h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            Discover the most popular and highly rated books that everyone is
            talking about
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <BestsellersSidebar
            genreList={genreList}
            onFilteredChange={handleFilteredChange}
          />

          <section className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 items-stretch">
              {isLoading
                ? Array.from({ length: 12 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))
                : filteredBooks.map((book) => (
                    <BestsellersCard key={book.id} book={book} />
                  ))}
            </div>
          </section>
        </div>
      </LandingSection>
    </main>
  );
}
