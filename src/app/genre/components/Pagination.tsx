// export default function Pagination({
//   page,
//   setPage,
// }: {
//   page: number;
//   setPage: (p: number) => void;
// }) {
//   return (
//     <div className="flex justify-center items-center gap-4 my-4">
//       <button
//         disabled={page === 1}
//         onClick={() => setPage(page - 1)}
//         className="text-gray-600 px-3 py-1 border rounded disabled:opacity-50"
//       >
//         Prev
//       </button>
//       <span className="text-gray-700">{page}</span>
//       <button
//         onClick={() => setPage(page + 1)}
//         className="text-gray-700 px-3 py-1 border rounded"
//       >
//         Next
//       </button>
//     </div>
//   );
// }
