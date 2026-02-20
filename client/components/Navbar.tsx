"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const cart = useCartStore((state: any) => state.cart);

  const totalItems = cart.reduce(
    (acc: number, item: any) => acc + item.quantity,
    0,
  );

  return (
    <nav className="flex justify-between p-4 border">
      <Link href="/">OrionCart</Link>

      <Link href="/cart">Cart ({totalItems})</Link>
    </nav>
  );
}
