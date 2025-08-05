"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import getHighResImage from "@/app/utils/helpers";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function WishlistClient() {
  const router = useRouter();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <button
        onClick={() => router.back()}
        className="text-blue-600 text-xl cursor-pointer"
      >
        <ArrowBackIcon />
      </button>
      <h2 className="text-2xl text-gray-700 font-bold text-center">
        Your Wishlist
      </h2>

      {wishlist.length === 0 ? (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-xl text-center text-gray-500">
            Your wishlist is empty ):
          </p>
        </div>
      ) : (
        wishlist.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b-2 border-gray-300 py-4"
          >
            <div className="flex gap-4 items-center">
              <Link href={`/books/${item.id}`}>
                <Image
                  src={getHighResImage(item.image)}
                  alt={item.title}
                  width={100}
                  height={140}
                  className="object-cover rounded shadow-sm"
                />
              </Link>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-1">
                  {item.authors || "Unknown Author"}
                </p>
                <p className="text-green-700 font-bold mt-1">${item.price}</p>
                {/* ✅ Add to Cart Button */}
                <button
                  onClick={() => addToCart(item)}
                  className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <button
              onClick={() => removeFromWishlist(item.id)}
              className="text-red-500 hover:text-red-600 cursor-pointer"
            >
              <DeleteOutlineIcon />
            </button>
          </div>
        ))
      )}
    </div>
  );
}
