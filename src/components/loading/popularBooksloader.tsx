export default function PopularBooksLoader() {
  return (
    <section className="py-10 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4 px-4">
        <div>
          <h2 className="text-gray-800 text-2xl font-bold">Popular Books</h2>
          <p className="text-gray-600 text-xl">
            Trending reads that everyone is talking about
          </p>
        </div>
        <button className="text-xs text-blue-600">View all </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4"></div>
    </section>
  );
}
