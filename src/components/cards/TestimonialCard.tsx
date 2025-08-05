"use client";

import Image from "next/image";
import { Testimonial } from "@/book";

type TestimonialCardProps = {
  test: Testimonial;
};

export default function TestimonialCard({ test }: TestimonialCardProps) {
  return (
    <div className="flex flex-col md:flex-row w-full items-center gap-8 bg-gray-200 p-6 rounded-lg shadow-md">
      <div className="w-full md:w-1/2 h-[300px] relative">
        <Image
          src={test.image}
          alt={test.name}
          fill
          className="object-contain rounded"
        />
      </div>
      <div className="w-full md:w-1/2 p-6 text-center md:text-left">
        <h3 className="text-lg italic text-gray-800">{test.quote}</h3>
        <p className="text-yellow-500 text-sm">★★★★☆</p>
        <p className="text-gray-900">{test.name}</p>
      </div>
    </div>
  );
}
