export const SearchCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white shadow rounded p-2">
      <div className="bg-gray-300 h-[220px] w-[150px] rounded" />
      <div className="h-4 bg-gray-300 rounded mt-3 w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded mt-2 w-1/2"></div>
    </div>
  );
};
