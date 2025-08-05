"use client";

import { useEffect, useState, use } from "react";
import GenreHeader from "../components/GenreHeader";
import GenreGrid from "../components/GenreGrid";
import Sidebar from "../components/Sidebar";
import LandingSection from "@/service/LandingSection";
import axios from "axios";

interface Book {
  id: string;
  title: string;
  authors: string;
  image: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  genre: string;
}

const genreList = [
  "Fiction",
  "Mystery",
  "Biography",
  "Romance",
  "History",
  "Comic",
];

export default function GenrePage({
  params,
}: {
  params: Promise<{ genre: string }>;
}) {
  const { genre } = use(params);
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOK_API_KEY;
  const URL = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=12&key=${API_KEY}`;

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(URL);
        const fetchedBooks = res.data.items.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors || ["Unkown Author"],
          image: item.volumeInfo.imageLinks?.thumbnail,
          price: Math.random() * (30 - 10) * 10,
          oldPrice: Math.random() * (40 - 31) * 10,
          rating: Math.floor(Math.random() * 5) + 1,
          reviews: Math.floor(Math.random() * 1000),
          genre,
        }));
        setBooks(fetchedBooks);
        setFilteredBooks(fetchedBooks);
        setLoading(false);
      } catch (error) {
        console.error("couldn't fetch book", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [genre]);

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

    // Applt genre filter
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
    <LandingSection>
      <div className="min-h-screen bg-gray-50">
        <GenreHeader genre={genre} total={books.length} />

        <div className="flex flex-col md:flex-row gap-6">
          <Sidebar genres={genreList} onFilteredChange={handleFilteredChange} />

          <GenreGrid books={filteredBooks} loading={loading} />
        </div>
      </div>
    </LandingSection>
  );
}
