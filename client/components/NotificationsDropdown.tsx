"use client";

import { Bell, DollarSign, AlertTriangle, User, Package, ChevronRight, X, CheckCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useNotificationStore } from "@/store/notificationStore";

const iconMap: Record<string, any> = {
  order: DollarSign,
  stock: Package,
  user: User,
  system: CheckCircle,
};

export default function NotificationsDropdown() {
  const { notifications } = useNotificationStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const unreadNotifications = notifications.filter(n => n.unread);
  const unreadCount = unreadNotifications.length;
  const quickNotifications = notifications.slice(0, 3);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 rounded-[1.25rem] transition-all relative group"
      >
        <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
        {unreadCount > 0 && (
          <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-96 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-6 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Recent Alerts</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">You have {unreadCount} new messages</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {quickNotifications.length === 0 ? (
              <p className="text-center py-4 text-sm font-bold text-slate-400">No notifications</p>
            ) : (
              quickNotifications.map((n) => {
                const Icon = iconMap[n.type] || Bell;
                return (
                  <div key={n.id} className="flex gap-4 p-4 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm", n.color)}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <p className={cn("font-black text-sm tracking-tight", n.unread ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400")}>{n.title}</p>
                        <span className="text-[10px] font-bold text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-bold truncate">{n.description}</p>
                    </div>
                    {n.unread && (
                      <div className="w-2 h-2 bg-indigo-600 rounded-full self-center" />
                    )}
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800">
            <Link 
              href="/admin/notifications"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl font-black text-sm transition-all"
            >
              View All Notifications
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
