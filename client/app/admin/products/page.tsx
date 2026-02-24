"use client";

import { useEffect, useState } from "react";
import { 
  ShoppingBag, 
  Search, 
  Edit3, 
  Trash2, 
  MoreVertical, 
  Filter, 
  ChevronRight,
  Loader2,
  Package,
  Plus,
  X
} from "lucide-react";
import { cn } from "@/utils/cn";
import Link from "next/link";
import AdminProductForm from "@/components/AdminProductForm";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  description: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);
  const [selectedStockStatus, setSelectedStockStatus] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "All",
    "Electronics",
    "Mobile",
    "Laptop",
    "Tablet",
    "Accessories",
    "Audio",
    "Cameras",
    "Gaming",
    "Home Appliances",
    "Fashion",
    "Other"
  ];

  const stockStatuses = ["All", "In Stock", "Low Stock", "Out of Stock"];

  const fetchProducts = async () => {
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
    const url = `${baseUrl}/api/products`;
    
    try {
      setLoading(true);
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
      }
      
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(`Failed to fetch products from ${url}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
    const url = `${baseUrl}/api/products/${id}`;
    
    try {
      const res = await fetch(url, {
        method: "DELETE",
      });
      
      if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
      }
      
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error(`Failed to delete product at ${url}:`, error);
      alert("Error deleting product. Please try again.");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchProducts();
  };

  const toggleCategory = (cat: string) => {
    if (cat === "All") {
      setSelectedCategories(["All"]);
      return;
    }

    setSelectedCategories(prev => {
      const newCats = prev.filter(c => c !== "All");
      if (newCats.includes(cat)) {
        const filtered = newCats.filter(c => c !== cat);
        return filtered.length === 0 ? ["All"] : filtered;
      } else {
        return [...newCats, cat];
      }
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategories.includes("All") || 
                           selectedCategories.some(cat => cat.toLowerCase() === p.category.toLowerCase());
    
    const matchesStock = selectedStockStatus === "All" || 
                        (selectedStockStatus === "In Stock" && p.stock > 10) ||
                        (selectedStockStatus === "Low Stock" && p.stock > 0 && p.stock <= 10) ||
                        (selectedStockStatus === "Out of Stock" && p.stock === 0);

    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <div className="space-y-10 relative transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <ShoppingBag className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
            Inventory Management
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Manage and monitor your store's stock levels.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-2">
              <AdminProductForm initialData={editingProduct} onSuccess={handleSuccess} />
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm dark:shadow-none dark:border dark:border-slate-800/50 overflow-hidden transition-colors duration-300">
        <div className="p-8 border-b border-slate-50 dark:border-slate-800/60 bg-slate-50/30 dark:bg-slate-800/30 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600" />
              <input
                type="text"
                placeholder="Search by name or category..."
                className="w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-2 font-bold text-sm px-5 py-3 rounded-2xl transition-all shadow-sm border",
                showFilters 
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-indigo-200" 
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-700 hover:bg-slate-50"
              )}
            >
              <Filter className="w-4 h-4" />
              <span>{showFilters ? "Hide Filters" : "Filters"}</span>
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Category (Multi-select)</label>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 6).map(cat => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-xs font-bold transition-all border-2",
                        selectedCategories.includes(cat)
                          ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400"
                          : "bg-white dark:bg-slate-800 text-slate-500 border-slate-50 dark:border-slate-700 hover:border-slate-200"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                  {categories.length > 6 && (
                    <select 
                      value=""
                      onChange={(e) => toggleCategory(e.target.value)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-500 border-2 border-slate-50 dark:border-slate-700 outline-none cursor-pointer"
                    >
                      <option value="" disabled>More...</option>
                      {categories.slice(6).map(cat => (
                        <option key={cat} value={cat} className={cn(selectedCategories.includes(cat) && "font-black text-indigo-600")}>
                          {cat} {selectedCategories.includes(cat) ? "✓" : ""}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Stock Status</label>
                <div className="flex flex-wrap gap-2">
                  {stockStatuses.map(status => (
                    <button
                      key={status}
                      onClick={() => setSelectedStockStatus(status)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-xs font-bold transition-all border-2",
                        selectedStockStatus === status
                          ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400"
                          : "bg-white dark:bg-slate-800 text-slate-500 border-slate-50 dark:border-slate-700 hover:border-slate-200"
                      )}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-32 flex flex-col items-center justify-center text-slate-400 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
              <p className="font-bold tracking-widest text-xs uppercase">Loading Inventory...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-32 flex flex-col items-center justify-center text-slate-400 gap-4">
              <Package className="w-16 h-16 opacity-20" />
              <p className="font-bold">No products found</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Product</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Price</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Stock</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredProducts.map((p) => (
                  <tr key={p._id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 p-1 overflow-hidden shadow-sm group-hover:scale-110 transition-transform">
                          <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{p.name}</p>
                          <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-tighter mt-0.5">ID: {p._id.slice(-8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-black text-slate-900 dark:text-white">${p.price.toFixed(2)}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          p.stock > 10 ? "bg-emerald-500" : p.stock > 0 ? "bg-amber-500 shadow-amber-500/20 shadow-lg" : "bg-rose-500"
                        )} />
                        <p className={cn(
                          "font-bold",
                          p.stock > 10 ? "text-slate-600 dark:text-slate-400" : p.stock > 0 ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400"
                        )}>
                          {p.stock} in stock
                        </p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(p)}
                          className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteProduct(p._id)}
                          className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="p-8 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-100/60 dark:border-slate-800/60 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Showing {filteredProducts.length} Products</p>
          <div className="flex items-center gap-4">
            <button className="text-xs font-black text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 uppercase tracking-widest disabled:opacity-30" disabled>Previous</button>
            <div className="flex items-center gap-1">
              <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-lg shadow-indigo-600/20">1</span>
            </div>
            <button className="text-xs font-black text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 uppercase tracking-widest disabled:opacity-30" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
