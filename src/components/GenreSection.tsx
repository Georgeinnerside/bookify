"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import LibraryBooksSharpIcon from "@mui/icons-material/LibraryBooksSharp";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import Person2SharpIcon from "@mui/icons-material/Person2Sharp";
import CameraIndoorSharpIcon from "@mui/icons-material/CameraIndoorSharp";
import TheaterComedySharpIcon from "@mui/icons-material/TheaterComedySharp";

const genres = [
  {
    name: "Fiction",
    count: 500,
    color: "bg-blue-500",
    icon: <LibraryBooksSharpIcon />,
    slug: "fiction",
  },
  {
    name: "Romance",
    count: 340,
    color: "bg-pink-500",
    icon: <FavoriteSharpIcon />,
    slug: "romance",
  },
  {
    name: "Mystery",
    count: 220,
    color: "bg-purple-500",
    icon: <SearchSharpIcon />,
    slug: "mystery",
  },
  {
    name: "Biography",
    count: 487,
    color: "bg-green-500",
    icon: <Person2SharpIcon />,
    slug: "biography",
  },
  {
    name: "History",
    count: 176,
    color: "bg-yellow-500",
    icon: <CameraIndoorSharpIcon />,
    slug: "history",
  },
  {
    name: "Comics",
    count: 454,
    color: "bg-red-500",
    icon: <TheaterComedySharpIcon />,
    slug: "comics",
  },
];

export default function GenreSection() {
  return (
    <section className="bg-white py-20 px-5  text-center">
      <h2 className="text-gray-800 text-3xl font-bold">Eplore by Genre</h2>
      <p className="text-xl text-gray-600 p-5 ">
        Discover books across all your favorite categories
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-5xl mx-auto">
        {genres.map((genre) => (
          <Link
            key={genre.name}
            href={`/genre/${genre.name.toLocaleLowerCase()}`}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`${genre.color} text-white rounded-lg p-4 flex flex-col items-center hover:scale-105 transition`}
            >
              <div className="text-2xl mb-2">{genre.icon}</div>
              <p className="font-semibold">{genre.name}</p>
              <p>{genre.count.toLocaleString()}books</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
