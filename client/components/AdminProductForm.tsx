"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { 
  Package, 
  DollarSign, 
  Tag, 
  Layers, 
  Image as ImageIcon, 
  TextQuote, 
  Loader2, 
  CheckCircle,
  AlertCircle,
  Plus
} from "lucide-react";
import { cn } from "@/utils/cn";

interface ProductState {
  _id?: string;
  name: string;
  price: string;
  category: string;
  image: string;
  stock: string;
  description: string;
}

const initialState: ProductState = {
  name: "",
  price: "",
  category: "",
  image: "",
  stock: "",
  description: "",
};

const categories = [
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

export default function AdminProductForm({ 
  initialData, 
  onSuccess 
}: { 
  initialData?: any;
  onSuccess?: () => void;
}) {
  const [product, setProduct] = useState<ProductState>(() => {
    if (initialData) {
      return {
        ...initialData,
        price: initialData.price.toString(),
        stock: initialData.stock.toString(),
      };
    }
    return initialState;
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const isEditing = !!initialData;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
    const url = isEditing 
      ? `${baseUrl}/api/products/${product._id}` 
      : `${baseUrl}/api/products`;

    try {
      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...product,
          price: parseFloat(product.price),
          stock: parseInt(product.stock),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
      }

      setStatus({ 
        type: "success", 
        message: isEditing ? "Product successfully updated!" : "Product successfully added to inventory!" 
      });
      
      if (!isEditing) {
        setProduct(initialState);
      }

      if (onSuccess) {
        setTimeout(onSuccess, 1500);
      }
      
      // Clear success message after 5 seconds
      setTimeout(() => setStatus({ type: null, message: "" }), 5000);
    } catch (error: any) {
      console.error(`Failed to save product to ${url}:`, error);
      setStatus({ 
        type: "error", 
        message: error.message || "Something went wrong. Please check your connection." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm dark:shadow-none dark:border dark:border-slate-800/60 p-8 h-full transition-colors duration-300">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center">
          <Plus className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{isEditing ? "Edit Product" : "Add New Product"}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{isEditing ? "Update existing product details." : "Create a new listing in your store."}</p>
        </div>
      </div>

      {status.type && (
        <div className={cn(
          "mb-8 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300",
          status.type === "success" ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30" : "bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30"
        )}>
          {status.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <p className="text-sm font-bold tracking-tight">{status.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2 px-1">
              <Tag className="w-3 h-3" /> Product Name
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors pointer-events-none">
                <Tag className="w-5 h-5" />
              </div>
              <input
                name="name"
                required
                value={product.name}
                placeholder="e.g. Classic Sneakers"
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 pl-12 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2 px-1">
              <DollarSign className="w-3 h-3" /> Price ($)
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors pointer-events-none">
                <DollarSign className="w-5 h-5" />
              </div>
              <input
                name="price"
                type="number"
                step="0.01"
                required
                value={product.price}
                placeholder="0.00"
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 pl-12 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2 px-1">
              <Layers className="w-3 h-3" /> Category
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors pointer-events-none z-10">
                <Layers className="w-5 h-5" />
              </div>
              <select
                name="category"
                required
                value={product.category}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 pl-12 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none cursor-pointer relative z-0 hover:bg-white dark:hover:bg-slate-700"
              >
                <option value="" disabled className="text-slate-400">Choose a Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat} className="text-slate-900 dark:text-white bg-white dark:bg-slate-900 font-medium py-2">
                    {cat}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2 px-1">
              <Package className="w-3 h-3" /> Stock Count
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors pointer-events-none">
                <Package className="w-5 h-5" />
              </div>
              <input
                name="stock"
                type="number"
                required
                value={product.stock}
                placeholder="0"
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 pl-12 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2 px-1">
            <ImageIcon className="w-3 h-3" /> Product Image URL
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors pointer-events-none">
              <ImageIcon className="w-5 h-5" />
            </div>
            <input
              name="image"
              required
              value={product.image}
              placeholder="https://images.unsplash.com/..."
              onChange={handleChange}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 pl-12 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
            />
          </div>
        </div>

        {product.image && (
          <div className="p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] flex flex-col items-center bg-slate-50/50 dark:bg-slate-800/50 animate-in zoom-in-95 duration-300">
            <p className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 mb-4 tracking-widest">Live Preview</p>
            <div className="relative w-full max-w-xs h-48 rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/10 bg-white dark:bg-slate-900">
              <img
                src={product.image}
                alt="Preview"
                className="w-full h-full object-contain p-4"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          </div>
        )}

        <div className="space-y-3">
          <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2 px-1">
            <TextQuote className="w-3 h-3" /> Description
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-5 text-slate-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors pointer-events-none">
              <TextQuote className="w-5 h-5" />
            </div>
            <textarea
              name="description"
              required
              value={product.description}
              placeholder="Describe the product's features, benefits, and specifications..."
              onChange={handleChange}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 pl-12 h-40 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none"
            />
          </div>
        </div>

        <button 
          disabled={loading}
          className={cn(
            "w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl",
            loading 
              ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed" 
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20 active:scale-[0.98]"
          )}
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              {isEditing ? <CheckCircle className="w-6 h-6" /> : <PlusCircle className="w-6 h-6" />}
              <span>{isEditing ? "Update Product Details" : "Add to Inventory"}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

function PlusCircle({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}
