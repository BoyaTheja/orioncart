"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <div className="relative group w-full max-w-xl mx-auto mb-10">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
        <Search className="w-5 h-5" />
      </div>
      <input
        className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400 shadow-sm"
        placeholder="Search for amazing products..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          router.push(`/?search=${e.target.value}`);
        }}
      />
    </div>
  );
}
