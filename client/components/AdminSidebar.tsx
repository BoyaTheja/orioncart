"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  Settings,
  Store,
  Menu,
  X,
  LogOut,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useState } from "react";

const navItems = [
  { name: "Overview", path: "/admin", icon: LayoutDashboard },
  { name: "Inventory", path: "/admin/products", icon: ShoppingBag },
  { name: "Orders", path: "/admin/orders", icon: ClipboardList },
  { name: "Analytics", path: "/admin/settings", icon: TrendingUp },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 px-6 py-8 shadow-sm dark:shadow-none dark:border-r dark:border-slate-900/50 transition-colors duration-300">
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
          <Store className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Orion</h1>
          <p className="text-[9px] uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500 font-bold">Commerce Cloud</p>
        </div>
      </div>

      <div className="flex-1 space-y-8">
        <div>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-4 px-4">Menu</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name + item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold"
                      : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <Icon className={cn("w-5 h-5 transition-colors", isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />
                  <span className="text-sm tracking-tight">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-4 px-4">Support</p>
          <div className="space-y-1">
            <Link 
              href="/admin/settings"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-white transition-all text-sm tracking-tight group"
            >
              <TrendingUp className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
              <span>Help Center</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800/60">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all text-sm font-bold tracking-tight"
        >
          <LogOut className="w-5 h-5" />
          <span>Exit Admin</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-72 hidden lg:block h-screen sticky top-0">
        <SidebarContent />
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-lg shadow-md border border-slate-200 text-slate-600"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 bg-slate-900 shadow-2xl animate-in slide-in-from-left duration-300">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
