export default function CategoryPaginationSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-[200px] h-[400px] mx-auto animate-pulse">

      <div className="w-full h-[220px] bg-gray-300" />

      <div className="p-2 space-y-2">
    
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
        
        <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />

   
        <div className="flex justify-between items-center mt-2 px-1">
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
