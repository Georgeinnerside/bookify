

export default interface Book {
  id: string;
  title: string;
  authors: string[];
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  genre: string;
  badge: string;
}

export interface CartItem extends Book {
  quantity: number;
}

export interface BookCategory {
  id: string;
  title: string;
}

export type Testimonial = {
  id: number;
  name: string;
  image: string;
  quote: string;
};

//books for landing page

export const landingPageBooks = [
  {
    id: 1,
    src: "/assets/endless-book.jpg",
    alt: "Bestselling Book",
    rotate: "-6deg",
  },
  {
    id: 2,
    src: "/assets/molecule.jpg",
    alt: "Mystery Thriller",
    rotate: "6deg",
  },
  { id: 3, src: "/assets/kaizen.jpg", alt: "Romance", rotate: "-4deg" },
  { id: 4, src: "/assets/zen.jpg", alt: "Self Help", rotate: "4deg" },
];
