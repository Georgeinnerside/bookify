import Link from "next/link";
export default function GenreHeader({
  genre,
}: {
  genre: string;
  total: number;
}) {
  return (
    <div className="bg-blue-100 py-6 px-4 mb-4">
      <div className="max-w-6wl mx-auto">
        <nav>
          <Link href="/">Home </Link> &gt; {genre} Books
        </nav>
        <h1 className="text-gray-700 text-2xl font-bold text-center">
          {genre.charAt(0).toLocaleUpperCase() + genre.slice(1)} Books
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Discover the most popular and highly rated {genre} books that everyone
          is talking about
        </p>
      </div>
    </div>
  );
}
