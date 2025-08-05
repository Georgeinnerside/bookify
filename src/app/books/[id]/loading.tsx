export default function Loading() {
  return (
    <div className="max-w-4wl mx-auto px-4 py-20">
      <div className="animate-pulse flex flex-col md:flex-row gap-6">
        <div className="w-[300px] h-[400px] bg-gray-300 rounded" />
        <div className="flex-1 space-y-4">
          <div className="h-8 bg-gray-300 rounded w-3/4">
            <div className="h-6 bg-gray-300 rounded w-1/2">
              <div className="h-4 bg-gray-300 rounded w-1/3">
                <div className="h-24 bg-gray-200 rounded w-full mt-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
