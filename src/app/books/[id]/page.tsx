import Image from "next/image";
import { Metadata } from "next";
import { removeHTML } from "@/app/utils/helpers";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    description?: string;
    imageLinks?: {
      thumbnail?: string;
    };
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOK_API_KEY;
  console.log("Api key", API_KEY);
  const URL = `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`;

  try {
    const res = await fetch(URL, {
      next: { revalidate: 86400, tags: [`book:${id}`] },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch metadata: ${res.statusText}`);
    }

    const book: Book = await res.json();

    const title = book.volumeInfo?.title || "Book Not Found";
    const description =
      book.volumeInfo?.description?.slice(0, 160) || "Book details page";
    const image =
      book.volumeInfo?.imageLinks?.thumbnail
        ?.replace("http://", "https://")
        ?.replace("zoom=1", "zoom=2") || "/default-book.jpg";

    return {
      title: `${title} | Bookify`,
      description,
      openGraph: {
        title,
        description,
        images: [
          {
            url: image,
            width: 200,
            height: 300,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);

    return {
      title: "Book Details | Bookify",
      description: "Explore amazing books on Bookify",
      openGraph: {
        title: "Book Details | Bookify",
        description: "Explore amazing books on Bookify",
        images: [
          {
            url: "/default-book.jpg",
            width: 200,
            height: 300,
            alt: "Book cover placeholder",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Book Details | Bookify",
        description: "Explore amazing books on Bookify",
        images: ["/default-book.jpg"],
      },
    };
  }
}
export default async function BookDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log("Bookd ID", id);
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOK_API_KEY;
  const URL = `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`;
  console.log("My API key", API_KEY);
  try {
    const res = await fetch(URL, {
      next: { revalidate: 86400, tags: [`book:${id}`] },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch book details: ${res.statusText}`);
    }

    const book: Book = await res.json();

    if (!book || !book.volumeInfo) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p className="text-gray-600 text-lg">No book details found.</p>
        </div>
      );
    }

    const {
      title = "Unknown Title",
      authors,
      publisher,
      description,
      imageLinks,
    } = book.volumeInfo;

    const imageUrl =
      imageLinks?.thumbnail
        ?.replace("http://", "https://")
        ?.replace("zoom=1", "zoom=3") ||
      "https://via.placeholder.com/150x220?text=No+Image";

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 pb-20">
          {/* Book Image */}
          <div className="w-full md:w-1/2 relative aspect-[2/3]">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="rounded-lg object-cover"
              priority
            />
          </div>

          {/* Book Details */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-emerald-800 mb-2">
              {title}
            </h1>

            {authors && (
              <p className="text-lg font-medium text-gray-700 mb-1">
                Author: {authors.join(", ")}
              </p>
            )}

            {publisher && (
              <p className="text-xl text-gray-500 mb-4">
                Publisher: {publisher}
              </p>
            )}

            {description && (
              <p className="text-sm text-gray-700 mb-4">
                Description:{" "}
                {removeHTML(description.slice(0, 1000)) +
                  (description.length > 1000 ? "..." : "")}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching book details:", error);
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-red-500 font-semibold text-lg">
          Something went wrong. Please try again later.
        </p>
      </div>
    );
  }
}
