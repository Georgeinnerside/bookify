"use client";

import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SendIcon from "@mui/icons-material/Send";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-gray-300 py-10 px-6 m-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-xl font-bold text-white">Bookify</h2>
          </div>
          <p className="text-sm mb-4">
            Your ultimate destination for discovering, tracking, and enjoying
            great books.
          </p>
          <div className="flex flex-col gap-4 text-gray-400 text-lg">
            <FacebookIcon className="cursor-pointer hover:text-white" />
            <XIcon className="cursor-pointer hover:text-white" />
            <LinkedInIcon className="cursor-pointer hover:text-white" />
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-white">
                Browse Books
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Bestsellers
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                New Releases
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Genres
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Authors
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-white">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Shipping Info
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Returns
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">Newsletter</h3>
          <p className="text-sm mb-4">
            Stay updated with new releases and exclusive offers
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 bg-gray-800 text-gray-200 rounded-l-md w-full focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700">
              <SendIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm mt-6">
        <p>© 2025 Bookify All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="#" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-white">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-white">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
