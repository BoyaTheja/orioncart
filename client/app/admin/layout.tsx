import AdminSidebar from "@/components/AdminSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import NotificationsDropdown from "@/components/NotificationsDropdown";
import { Bell, Search, User, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen font-sans transition-colors duration-300">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-6 lg:px-8 h-16 flex items-center justify-between shadow-sm dark:shadow-none dark:border-b dark:border-slate-900/50 transition-all duration-300">
          <div className="flex items-center gap-6 flex-1">
            <div className="relative max-w-md w-full hidden lg:block group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="text"
                placeholder="Search products, orders..."
                className="w-full bg-slate-100 dark:bg-slate-800 border border-transparent group-focus-within:bg-white dark:group-focus-within:bg-slate-900 group-focus-within:border-indigo-100 dark:group-focus-within:border-indigo-900 rounded-xl py-2 pl-10 pr-4 text-xs font-medium transition-all outline-none placeholder:text-slate-400 dark:text-slate-200 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <NotificationsDropdown />
              <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 rounded-xl transition-all group lg:hidden">
                <Search className="w-4 h-4" />
              </button>
            </div>
            
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />
            
            <button className="flex items-center gap-3 p-1.5 pl-3 pr-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all group text-left">
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-none tracking-tight">Alex Rivera</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">Admin</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 dark:shadow-none overflow-hidden ring-2 ring-white dark:ring-slate-800">
                <User className="w-4 h-4" />
              </div>
            </button>
          </div>
        </header>
        <main className="p-6 lg:p-10 max-w-[1600px] mx-auto w-full transition-colors duration-300">{children}</main>
      </div>
    </div>
  );
}
