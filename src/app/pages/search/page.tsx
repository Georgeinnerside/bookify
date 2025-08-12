"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { useSearchBooks } from "@/hooks/useSearchBooks";
import { SearchCard } from "@/components/cards/SearchCard";
import { SearchCardSkeleton } from "@/components/loading/SearchCardSkeleton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Footer from "@/components/Footer";

export default function SearchPageWrapper() {
  return (
    <Suspense fallback={<p>Loading search...</p>}>
      <SearchClient />
    </Suspense>
  );
}

function SearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const router = useRouter();
  const { data: books, isLoading, isError } = useSearchBooks(query);

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4">
        <div className="p-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-blue-600 text-xl cursor-pointer"
          >
            <ArrowBackIcon />
          </button>
          <h1 className="text-xl text-gray-700 font-bold">
            Search results for: {query}
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <SearchCardSkeleton key={i} />
            ))
          ) : isError ? (
            <p className="col-span-full">Oops something went wrong ):</p>
          ) : books && books.length > 0 ? (
            books.map((book) => <SearchCard key={book.id} book={book} />)
          ) : (
            <p className="col-span-full">Books not found</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
