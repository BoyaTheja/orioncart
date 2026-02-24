import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import Hero from "@/components/Hero";
import CategoryFilter from "@/components/CategoryFilter";

type Product = {
  _id: string;
};

async function getProducts(
  search: string,
  category: string,
): Promise<Product[]> {
  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
  const params = new URLSearchParams();

  if (search) {
    params.set("search", search);
  }

  if (category) {
    params.set("category", category);
  }

  const query = params.toString();
  const url = `${apiBaseUrl}/api/products${query ? `?${query}` : ""}`;

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      console.error(`Failed to fetch products from ${url}:`, res.status, res.statusText);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `Products API unreachable at ${url}. Is the server running? Details:`,
        error
      );
    }
    return [];
  }
}

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

  const products = await getProducts(search, category);

  return (
    <div className="p-10">
      <Hero />

      <SearchBar />

      <CategoryFilter />
      <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {products.length === 0 && <p>No products found 😢</p>}
    </div>
  );
}
