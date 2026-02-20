import { create } from "zustand";
import { persist } from "zustand/middleware";

/* ---------- Product Type ---------- */
type Product = {
  _id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

/* ---------- Store Type ---------- */
type CartStore = {
  cart: Product[];

  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const existing = get().cart.find((item) => item._id === product._id);

        if (existing) {
          set({
            cart: get().cart.map((item) =>
              item._id === product._id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item,
            ),
          });
        } else {
          set({
            cart: [...get().cart, { ...product, quantity: 1 }],
          });
        }
      },

      removeFromCart: (id) =>
        set({
          cart: get().cart.filter((item) => item._id !== id),
        }),

      increaseQty: (id) =>
        set({
          cart: get().cart.map((item) =>
            item._id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        }),

      decreaseQty: (id) =>
        set({
          cart: get()
            .cart.map((item) =>
              item._id === id
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item,
            )
            .filter((item) => item.quantity > 0),
        }),
    }),
    {
      name: "orioncart-storage",
    },
  ),
);
