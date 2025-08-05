"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/pages/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSearch}
        className="flex justify-between items-center"
      >
        <input
          type="text"
          placeholder="search books with title, authors, ISBN"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="text-xl text-gray-700 md:w-[24rem] px-4 py-4 outline-none"
        />
        <button type="submit" className="px-3 py-2 text-gray-700">
          <SearchIcon />
        </button>
      </form>
    </>
  );
}
