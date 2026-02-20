import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import Hero from "@/components/Hero";
import CategoryFilter from "@/components/CategoryFilter";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
}) {
  const params = await searchParams;

  const search = params?.search || "";
  const category = params?.category || "";

  const res = await fetch(
    `http://localhost:5000/api/products?search=${search}&category=${category}`,
    { cache: "no-store" },
  );

  const products = await res.json();

  return (
    <div className="p-10">
      <Hero />

      <SearchBar />

      <CategoryFilter />
      <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {products.length === 0 && <p>No products found 😢</p>}
    </div>
  );
}
