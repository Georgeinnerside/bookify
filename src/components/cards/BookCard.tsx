import Image from "next/image";
import Book from "@/book";

interface Props {
  book: Book & { title: string; author: string; image: string };
}

const BookCard = ({ book }: Props) => {
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden p-3 hover:shadow-lg transition">
      <Image
        src={book.image}
        alt={book.title}
        width={150}
        height={220}
        className="mx-auto rounded"
      />
      <div className="mt_3 text-center">
        <p className="font font-semibold text-gray-800 text-sm truncate">
          {book.title}
        </p>
        <p className="text-gray-600">{book.author}</p>
      </div>
    </div>
  );
};

export default BookCard;
