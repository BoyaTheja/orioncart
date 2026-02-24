"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/utils/cn";
import { 
  Monitor, 
  Smartphone, 
  Laptop, 
  LayoutGrid,
  CheckCircle2
} from "lucide-react";

const categories = [
  { id: "all", name: "All", icon: LayoutGrid },
  { id: "mobile", name: "Mobiles", icon: Smartphone },
  { id: "laptop", name: "Laptops", icon: Laptop },
  { id: "electronics", name: "Gadgets", icon: Monitor },
];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  return (
    <div className="flex flex-wrap gap-4 mb-12">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;
        
        return (
          <button
            key={cat.id}
            onClick={() => router.push(cat.id === "all" ? "/" : `/?category=${cat.id}`)}
            className={cn(
              "group relative flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 active:scale-[0.98]",
              isActive 
                ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10" 
                : "bg-white border border-slate-100/60 text-slate-500 hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-500/5"
            )}
          >
            <Icon className={cn("w-4 h-4", isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-indigo-500")} />
            <span>{cat.name}</span>
            {isActive && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in-50 duration-300">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
