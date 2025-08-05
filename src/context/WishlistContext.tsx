"use client";

import { useContext, createContext, useState, ReactNode } from "react";
import { useEffect } from "react";
import Book from "@/book";
import toast from "react-hot-toast";

type WishlistContextType = {
  wishlist: Book[];
  toggleWishlist: (book: Book) => void;
  isInwishList: (id: string) => boolean;
  removeFromWishlist: (id: string) => void;
};

// create context for wishlist
const WishContext = createContext<WishlistContextType | undefined>(undefined);

interface CartProps {
  children: ReactNode;
}

export const WishlistProvider = ({ children }: CartProps) => {
  const [wishlist, setWishlist] = useState<Book[]>([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("stored_book");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const toggleWishlist = (book: Book) => {
    setWishlist((prev) => {
      const exists = prev.some((b) => b.id === book.id);
      const newWishlist = exists
        ? prev.filter((b) => b.id !== book.id)
        : [...prev, book];
      setTimeout(() => {
        toast[exists ? "error" : "success"](
          exists ? "Removed from wishlist" : "Added to wishlist"
        );
      }, 0);

      return newWishlist;
    });
  };

  const isInwishList = (id: string) => {
    return wishlist.some((b) => b.id === id);
  };

  const removeFromWishlist = (id: string) => {
    return setWishlist((prev) => prev.filter((book) => book.id !== id));
  };

  return (
    <WishContext.Provider
      value={{ wishlist, toggleWishlist, isInwishList, removeFromWishlist }}
    >
      {children}
    </WishContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishContext);
  if (!context) throw new Error("Cannot use without context");
  return context;
};
