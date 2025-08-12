import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import QueryProvider from "@/context/QuerClient";
import { WishlistProvider } from "@/context/WishlistContext";
import AuthClientProvider from "@/context/SessionContext";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bookify",
  description: "Website for book shopping!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col`}
      >
        <AuthProvider>
          <QueryProvider>
            <CartProvider>
              <WishlistProvider>
                <Navbar />
                <Toaster position="top-right" />
                {children}
                <Footer />
              </WishlistProvider>
            </CartProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
