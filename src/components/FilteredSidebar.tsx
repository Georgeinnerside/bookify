"use client";

const genres = [
  "Fiction",
  "Romance",
  "Mystery",
  "Biography",
  "History",
  "Comics",
  "Science Fiction",
];

const ratings = [5, 4, 3, 2, 1];

export default function FilteredSidebar() {
  return (
    <aside className="w-full md:w-1/6 bg-white p-4 rounded-lg shadow-sm border">
      <h3 className="text-gray-700 font-bold mb-2">Filters</h3>

      <div className="mb-4">
        <h4 className="text-xs text-gray-600 font-semibold mb-2">Genre</h4>
        {genres.map((genre) => (
          <div key={genre} className="flex items-center space-x-2 mb-2">
            <input type="checkbox" className="form-checkbox" />
            <span className="text-sm text-gray-600">{genre}</span>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h4 className="text-xs text-gray-600 font-semibold mb-2">
          Price Range
        </h4>
        <input type="range" min="0" max="50" className=" w-full" />
        <div className="flex justify-between text-xs mt-1">
          <span className="text-sm text-gray-600">$0</span>
          <span className="text-sm text-gray-600">$100</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-xs text-gray-600 font-semibold mb-2">
          Minimum Rating
        </h4>
        {ratings.map((rating) => (
          <div key={rating} className="flex items-center space-x-2 mb-1">
            <input type="radio" name="rating" />
            <span className="text-yellow-500">{`★`.repeat(rating)}</span>
          </div>
        ))}
      </div>

      <button className="text-blue-500 text-xs underline">Clear All</button>
    </aside>
  );
}
