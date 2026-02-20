async function getProducts() {
  const res = await fetch("http://localhost:5000/api/products", {
    cache: "no-store",
  });

  return res.json();
}
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product: any) => (
          //   <Link href={`/products/${product._id}`} key={product._id}>
          //     <div className="border p-4 rounded cursor-pointer">
          //       <h2>{product.name}</h2>
          //       <p>₹ {product.price}</p>
          //     </div>
          //   </Link>
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
