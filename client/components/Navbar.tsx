"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const cart = useCartStore((state: any) => state.cart);

  // Hide Navbar on Admin pages
  if (pathname?.startsWith("/admin")) return null;

  const totalItems = cart.reduce(
    (acc: number, item: any) => acc + item.quantity,
    0,
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
        OrionCart
      </Link>

      <div className="flex gap-8 items-center font-medium text-gray-600">
        <Link href="/products" className="hover:text-sky-600 transition">Products</Link>
        <Link href="/cart" className="relative group flex items-center gap-2 bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-800 transition">
          <span>🛒</span>
          <span>Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
