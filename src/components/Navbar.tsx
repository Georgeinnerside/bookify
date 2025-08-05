"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useSession, signOut } from "next-auth/react";

export const Navbar = () => {
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const { wishlist } = useWishlist();
  const { cartCount } = useCart();

  // ✅ Bounce animation states
  const [wishlistBounce, setWishlistBounce] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);

  useEffect(() => {
    if (wishlist.length > 0) {
      setWishlistBounce(true);
      const timeout = setTimeout(() => setWishlistBounce(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [wishlist.length]);

  useEffect(() => {
    if (cartCount > 0) {
      setCartBounce(true);
      const timeout = setTimeout(() => setCartBounce(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [cartCount]);

  // ✅ Close menu when link is clicked
  const handleCloseMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-[100] bg-white shadow-md">
      {/* ✅ Mobile Navbar */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden">
        <button onClick={() => setIsOpen(true)}>
          <MenuIcon className="w-6 h-6 text-gray-700" />
        </button>

        <Link href="/" className="font-bold text-xl text-blue-700">
          Bookify
        </Link>

        <Link
          href="/pages/cart"
          className="relative flex items-center text-gray-700 hover:text-gray-900"
        >
          <ShoppingCartOutlinedIcon className="w-6 h-6" />
          {cartCount > 0 && (
            <motion.span
              key={cartCount}
              initial={{ scale: 0 }}
              animate={{ scale: cartBounce ? 1.3 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="absolute -top-1 -right-2 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
            >
              {cartCount}
            </motion.span>
          )}
        </Link>
      </div>

      {/* ✅ Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center px-8 py-4">
        <Link href="/" className="font-bold text-2xl text-blue-700">
          Bookify
        </Link>

        <div className="flex gap-8">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link
            href="/pages/new-release"
            className="text-gray-700 hover:text-blue-600"
          >
            New Release
          </Link>
          <Link
            href="/pages/bestsellers"
            className=" text-gray-700 hover:text-blue-600"
          >
            Bestsellers
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {/* Wishlist */}
          <Link
            href="/pages/wishlist"
            className="relative text-gray-700 flex items-center"
          >
            <FavoriteBorderOutlinedIcon />
            {wishlist.length > 0 && (
              <motion.span
                key={wishlist.length}
                initial={{ scale: 0 }}
                animate={{ scale: wishlistBounce ? 1.3 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="absolute -top-1 -right-2 bg-red-500  text-xs rounded-full h-4 w-4 flex items-center justify-center"
              >
                {wishlist.length}
              </motion.span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/pages/cart"
            className="relative text-gray-700 flex items-center"
          >
            <ShoppingCartOutlinedIcon />
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0 }}
                animate={{ scale: cartBounce ? 1.3 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="absolute -top-1 -right-2 bg-green-600 text-gray-700 text-xs rounded-full h-4 w-4 flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </Link>

          {/* Auth */}
          {data ? (
            <button
              onClick={() => signOut()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/pages/login"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/*  Mobile Slide Menu List */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-screen w-1/2 bg-blue-600 text-white font-bold shadow-lg flex flex-col p-6 space-y-6 z-50"
          >
            {/* Close Button */}
            <button onClick={handleCloseMenu} className="self-end">
              <CloseIcon className="w-6 h-6" />
            </button>

            {/* Navigation Links */}
            <Link href="/" className="cursor-pointer" onClick={handleCloseMenu}>
              Home
            </Link>
            <Link
              href="/pages/new-release"
              className="cursor-pointer"
              onClick={handleCloseMenu}
            >
              New Release
            </Link>
            <Link
              href="/pages/bestsellers"
              className="cursor-pointer"
              onClick={handleCloseMenu}
            >
              Bestsellers
            </Link>
            <Link
              href="/pages/wishlist"
              className="cursor-pointer"
              onClick={handleCloseMenu}
            >
              Wishlist ({wishlist.length})
            </Link>
            <Link
              href="/pages/cart"
              className="cursor-pointer"
              onClick={handleCloseMenu}
            >
              Cart ({cartCount})
            </Link>

            {/* Auth for mobile */}
            {data ? (
              <button
                onClick={() => {
                  signOut(), handleCloseMenu();
                }}
                className="hover:text-gray-300"
              >
                <LogoutIcon className="mr-2 cursor-pointer" /> Logout
              </button>
            ) : (
              <Link
                className="mr-2 cursor-pointer"
                href="/pages/login"
                onClick={handleCloseMenu}
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
