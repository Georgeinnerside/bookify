"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { landingPageBooks } from "@/book";
import Link from "next/link";
import SearchBar from "../app/pages/search/SearchBar";

export default function LandingPage() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-gray-100">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/landing-page-image.jpg"
          alt="landing-page"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/70"></div> {/* Overlay */}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between w-full">
        {/* Left Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Discover Your Next <br />
            <span className="text-blue-600">Favorite Book</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-md">
            Explore millions of books, track your reading progress, and get
            personalized recommendations. Join our community of passionate
            readers and never run out of great stories.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link
              href="/pages/search"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Start Reading
            </Link>
            <Link
              href="/pages/books"
              className="border border-gray-400 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Browse Books
            </Link>
          </div>

          {/* Search Bar */}
          <div className="mt-6 relative border border-gray-400 rounded max-w-md w-full">
            <SearchBar />
          </div>
        </div>

        {/* Right Books Section */}
        <div className="hidden md:flex md:w-1/2 relative justify-center">
          <div className="grid grid-cols-2 gap-6">
            {landingPageBooks.map((book) => (
              <motion.div
                key={book.id}
                initial={{ rotate: book.rotate }}
                whileHover={{ rotate: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="shadow-lg rounded-lg bg-white p-2"
              >
                <Image
                  src={book.src}
                  alt={book.alt}
                  width={180}
                  height={250}
                  className="object-cover rounded-lg cursor-pointer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
