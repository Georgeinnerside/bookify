// app/genre/[genre]/components/BookCard.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { motion } from "framer-motion";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import getHighResImage from "@/app/utils/helpers";

export default function GenreCard({ book }: { book: any }) {
  const { toggleWishlist, isInwishList } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInwishList(book);
  const discount = (book.oldPrice - book.price).toFixed(2);

  return (
    <Link href={`/books/${book.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="flex bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden border p-4 gap-4 items-start w-full h-[230px]"
      >
        {/* Left: Book Image with Badge */}
        <div className="relative w-[130px] h-[190px] flex-shrink-0 shadow-lg">
          <Image
            src={getHighResImage(book.image)}
            alt={book.title}
            fill
            className="object-contain rounded"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>

        {/* Right: Book Details */}
        <div className="flex flex-col justify-between flex-1 h-full">
          {/* Title and Category */}
          <div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
              {book.title}
            </h3>
            <p className="text-xs text-gray-500 mb-2 line-clamp-1">
              {book.genre || "General"}
            </p>

            {/* Rating */}
            <p className="text-yellow-400 text-sm mb-2">
              {"★".repeat(Math.floor(book.rating))}{" "}
              <span className="text-gray-300">
                {"★".repeat(5 - Math.floor(book.rating))}
              </span>
            </p>
            <p className="text-green-600 font-bold text-base">
              ${book.price.toFixed(2)}
            </p>
            <div className="flex gap-2 items-center">
              <p className="text-gray-400 text-xs line-through">
                ${book.oldPrice.toFixed(2)}
              </p>
              <span className="text-xs text-red-500">Save ${discount}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 mt-3 cursor-pointer">
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(book);
              }}
              className="flex-1 bg-gray-900 text-white py-2 rounded text-sm hover:bg-gray-700"
            >
              Add to cart
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(book);
              }}
              className="p-2 rounded-full border hover:bg-gray-100"
            >
              {inWishlist ? (
                <FavoriteIcon className="text-red-500" />
              ) : (
                <FavoriteBorderOutlinedIcon className="text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
