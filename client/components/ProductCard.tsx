"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, ArrowRight, Star } from "lucide-react";
import { cn } from "@/utils/cn";

export default function ProductCard({ product }: any) {
  const addToCart = useCartStore((state: any) => state.addToCart);
  const isOutOfStock = product.stock === 0;

  return (
    <div className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100/60 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
      <Link href={`/products/${product._id}`} className="relative block aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
          <span className="text-white font-bold text-sm flex items-center gap-2">
            View Details <ArrowRight className="w-4 h-4" />
          </span>
        </div>
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-rose-500 text-white px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg">
              Sold Out
            </span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="text-xs font-bold text-slate-700">4.5</span>
        </div>
      </Link>

      <div className="p-8 flex flex-col flex-1">
        <div className="mb-4">
          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1.5">{product.category}</p>
          <h2 className="font-black text-slate-900 text-xl leading-tight group-hover:text-indigo-600 transition-colors line-clamp-1">
            {product.name}
          </h2>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Price</span>
            <p className="text-2xl font-black text-slate-900">₹{product.price}</p>
          </div>

          <button
            disabled={isOutOfStock}
            onClick={() => addToCart(product)}
            className={cn(
              "p-4 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg active:scale-95",
              isOutOfStock 
                ? "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none" 
                : "bg-indigo-600 text-white shadow-indigo-600/20 hover:bg-indigo-700 hover:shadow-indigo-600/40"
            )}
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
