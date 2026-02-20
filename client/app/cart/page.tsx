"use client";

import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCartStore();

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">Your Cart</h1>

      {cart.map((item: any) => (
        <div key={item._id} className="border p-4 mb-4">
          <h2>{item.name}</h2>

          <p>₹ {item.price}</p>

          <div className="flex gap-2 mt-2">
            <button onClick={() => decreaseQty(item._id)}>-</button>

            <span>{item.quantity}</span>

            <button onClick={() => increaseQty(item._id)}>+</button>
          </div>

          <button
            onClick={() => removeFromCart(item._id)}
            className="mt-2 text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
