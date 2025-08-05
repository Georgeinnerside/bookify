import Image from "next/image";
import { Metadata } from "next";
import {
  truncDescription,
  upperCaseAtuhor,
  removeHTML,
} from "../../utils/helpers";

import getHighResImage from "../../utils/helpers";
import { cache } from "react";

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

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOK_API_KEY;
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${params.id}?key=${API_KEY}`,
    { cache: "no-store" }
  );

  const book = await res.json();

  const title = book.volumeInfo.title || "Book Details";
  const description =
    book.volumeInfo?.description?.slice(0, 150) || "Read this book on Bookify";
  const image = highResImage(book.volumeInfo);

  return {
    title: `${title} | Bookify`,
    description,
    openGraph: {
      title,
      description,
      url: `https://yourdomain.com/books/${params.id}`,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BookDetails({
  params,
}: {
  params: { id: string };
}) {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOK_API_KEY;
  const URL = `https://www.googleapis.com/books/v1/volumes/${params.id}?key=${API_KEY}`;

  const res = await fetch(URL);
  const book = await res.json();
  const volume = book.volumeInfo;

  if (!book) return <p>No Book found...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6 pb-20 scroll-smooth">
        <div className="w-full md:w-1/2 relative aspect-[2/3]">
          <Image
            src={
              highResImage(volume) ||
              "https://via.placeholder.com/150x220?text=No+Image"
            }
            alt={book?.title || "Book Cover"}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-emerald-800 mb-2">
            {book.volumeInfo.title}
          </h1>
          <p className="text-lg font-medium text-gray-700 mb-1">
            Title: {upperCaseAtuhor(book.volumeInfo.author)}
          </p>
          <p className="text-xl text-gray-500 mb-4">
            Publisher: {book.volumeInfo.publisher}
          </p>
          <p className="text-sm text-gray-700 mb-4">
            Description:{" "}
            {truncDescription(removeHTML(book.volumeInfo.description), 200) ||
              "No description available"}
          </p>
        </div>
      </div>
    </div>
  );
}
