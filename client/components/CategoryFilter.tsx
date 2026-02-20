"use client";

import { useRouter } from "next/navigation";

const categories = ["all", "mobile", "laptop", "electronics"];

export default function CategoryFilter() {
  const router = useRouter();

  return (
    <div className="flex gap-4 mb-8">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => router.push(cat === "all" ? "/" : `/?category=${cat}`)}
          className="border px-4 py-2 rounded hover:bg-black hover:text-white"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
