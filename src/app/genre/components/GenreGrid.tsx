import GenreCard from "./GenreCard";

export default function GenreGrid({
  books,
  loading,
}: {
  books: any[];
  loading: boolean;
}) {
  if (loading) return <p className="text-center w-full py-10">Loading...</p>;
  if (books.length === 0)
    return <p className="text-center w-full py-10">No books found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 items-stretch">
      {books.length > 0 ? (
        books.map((book) => <GenreCard key={book.id} book={book} />)
      ) : (
        <p>No {books} available ):</p>
      )}
    </div>
  );
}
