"use client";

import { 
  Bell, 
  Package, 
  DollarSign, 
  AlertTriangle, 
  User, 
  CheckCircle, 
  Search,
  MoreVertical,
  Trash2,
  Settings
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useNotificationStore } from "@/store/notificationStore";

const iconMap: Record<string, any> = {
  order: DollarSign,
  stock: Package,
  user: User,
  system: CheckCircle,
};

export default function NotificationsPage() {
  const { notifications, markAllRead, deleteNotification } = useNotificationStore();
  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="space-y-12 pb-20 transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter flex items-center gap-4">
            Notifications
            {unreadCount > 0 && (
              <span className="text-lg bg-indigo-600 text-white px-4 py-1 rounded-2xl align-middle">
                {unreadCount} New
              </span>
            )}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 font-bold">Stay updated with your store's latest events.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={markAllRead}
            className="px-6 py-3.5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-black text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm shadow-sm"
          >
            Mark all as read
          </button>
          <Link 
            href="/admin/settings"
            className="p-3.5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm"
          >
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30 flex flex-col sm:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
            {["all", "order", "stock", "user"].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                  filter === t 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                    : "text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl py-2.5 pl-11 pr-4 text-sm font-bold tracking-tight outline-none focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {notifications.length === 0 ? (
            <div className="py-40 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center mb-6">
                <Bell className="w-10 h-10 text-slate-300 dark:text-slate-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">All caught up!</h3>
              <p className="text-slate-500 dark:text-slate-400 font-bold mt-2">No new notifications to show.</p>
            </div>
          ) : (
            notifications
              .filter(n => filter === "all" || n.type === filter)
              .map((n) => {
                const Icon = iconMap[n.type] || Bell;
                return (
                  <div 
                    key={n.id} 
                    className={cn(
                      "p-8 flex items-start gap-8 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group relative",
                      n.unread && "bg-indigo-50/20 dark:bg-indigo-900/5"
                    )}
                  >
                    {n.unread && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600" />
                    )}
                    <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 shadow-sm", n.color)}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h4 className={cn("text-xl font-black tracking-tight", n.unread ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400")}>
                          {n.title}
                        </h4>
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest shrink-0">
                          {n.time}
                        </span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-2xl">
                        {n.description}
                      </p>
                      <div className="flex items-center gap-6 mt-6">
                        <button className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest hover:underline">
                          View Details
                        </button>
                        <div className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
                        <button 
                          onClick={() => deleteNotification(n.id)}
                          className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest hover:text-rose-600 transition-colors"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })
          )}
        </div>
        
        {notifications.length > 0 && (
          <div className="p-8 bg-slate-50/30 dark:bg-slate-800/30 text-center border-t border-slate-100 dark:border-slate-800">
            <button className="text-sm font-black text-slate-400 dark:text-slate-500 hover:text-indigo-600 transition-all uppercase tracking-[0.2em]">
              Load Older Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
