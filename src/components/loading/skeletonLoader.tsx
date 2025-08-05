"use client";

export default function SkeletonCard() {
  return (
    <div className="bg-white shadow rounded-lg p-3 animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-[180px] bg-gray-200 rounded-md mb-3"></div>

      {/* Title Placeholder */}
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>

      {/* Author Placeholder */}
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>

      {/* Price Placeholder */}
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
  );
}
