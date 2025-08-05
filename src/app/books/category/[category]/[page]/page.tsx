import CategoryList from "@/components/CategoryList";

type CategoryNavProps = {
  params: { category: string; page: string };
};

export default function CategoryNav({ params }: CategoryNavProps) {
  const page = parseInt(params.page, 10);

  return (
    <main className="p-4">
      <h1 className="text-2xl text-center text-gray-600 font-bold capitalize m-6">
        {params.category} books
      </h1>
      <CategoryList category={params.category} page={page} />
    </main>
  );
}
