"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <input
      className="border p-2 mb-6 w-full"
      placeholder="Search products..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        router.push(`/?search=${e.target.value}`);
      }}
    />
  );
}
