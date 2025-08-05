export default function SkeletonLoading() {
  return (
    <div className="w-[160px] bg-white shadow-sm flex flex-col border animate-pulse">
      <div className="h-[220px] bg-gray-300 rounded mb-2"></div>
      <div className="px-2 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );
}
