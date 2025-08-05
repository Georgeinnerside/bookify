"use client";

import { useState, useEffect } from "react";

interface FilteredSidebarProps {
  genres: string[];
  onFilteredChange: (filters: {
    priceRange: [number, number];
    selectedGenres: string[];
    selectedRating: number | null;
  }) => void;
}

const ratings = [5, 4, 3, 2, 1];

export default function NewReleaseSidebar({
  genres,
  onFilteredChange,
}: FilteredSidebarProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  useEffect(() => {
    onFilteredChange({
      priceRange,
      selectedGenres,
      selectedRating,
    });
  }, [onFilteredChange, priceRange, selectedGenres, selectedRating]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  return (
    <aside className="w-full md:w-1/6 bg-white p-4 rounded-lg shadow-sm border h-fit sm:w-fit">
      <h3 className="text-gray-700 font-bold mb-2">Filters</h3>

      <div className="mb-4">
        <h4 className="text-xs text-gray-600 font-semibold mb-2">Genre</h4>
        {genres.map((genre) => (
          <div key={genre} className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              value={genre}
              checked={selectedGenres.includes(genre)}
              onChange={() => toggleGenre(genre)}
              className="form-checkbox"
            />
            <label htmlFor={genre} className="text-sm text-gray-600">
              {genre}
            </label>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h4 className="text-xs text-gray-600 font-semibold mb-2">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </h4>
        <input
          type="range"
          min="0"
          max="200"
          value={priceRange[1]}
          onChange={(e: any) => setPriceRange([0, parseInt(e.target.value)])}
          className=" w-full"
        />
      </div>

      <div className="mb-4">
        <h4 className="text-xs text-gray-600 font-semibold mb-2">Rating</h4>
        {ratings.map((rating) => (
          <div key={rating} className="flex items-center space-x-2 mb-1">
            <label key={rating}>
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={selectedRating === rating}
                onChange={() => setSelectedRating(rating)}
              />
            </label>

            <span className="text-yellow-500">{`★`.repeat(rating)}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
