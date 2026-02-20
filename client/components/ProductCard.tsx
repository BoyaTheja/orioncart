"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function ProductCard({ product }: any) {
  const addToCart = useCartStore((state: any) => state.addToCart);

  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-xl transition duration-300">
      <Link href={`/products/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-52 w-full object-cover"
        />
      </Link>

      <div className="p-4">
        <h2 className="font-semibold text-lg">{product.name}</h2>

        <p className="text-xl font-bold mt-2">₹ {product.price}</p>

        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
