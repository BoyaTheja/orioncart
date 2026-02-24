"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DollarSign, AlertTriangle, User, Package, CheckCircle, LucideIcon } from "lucide-react";

export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: string;
  unread: boolean;
  color: string;
}

interface NotificationState {
  notifications: Notification[];
  markAllRead: () => void;
  markAsRead: (id: number) => void;
  deleteNotification: (id: number) => void;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "New Order Received",
    description: "Order #2940 from Alex Rivera is pending confirmation.",
    time: "2 mins ago",
    type: "order",
    unread: true,
    color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
  },
  {
    id: 2,
    title: "Stock Alert: Sony A7 IV",
    description: "Inventory is below threshold (2 units remaining).",
    time: "45 mins ago",
    type: "stock",
    unread: true,
    color: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
  },
  {
    id: 3,
    title: "New Customer Registered",
    description: "Sarah Jenkins joined the platform.",
    time: "2 hours ago",
    type: "user",
    unread: false,
    color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
  },
  {
    id: 4,
    title: "Product Restocked",
    description: "Vintage Camera inventory updated successfully.",
    time: "5 hours ago",
    type: "stock",
    unread: false,
    color: "bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
  },
  {
    id: 5,
    title: "System Update Complete",
    description: "Orion Commerce v2.4 successfully deployed.",
    time: "1 day ago",
    type: "system",
    unread: false,
    color: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
  }
];

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: initialNotifications,
      markAllRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, unread: false }))
      })),
      markAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, unread: false } : n)
      })),
      deleteNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
    }),
    {
      name: 'notification-storage',
    }
  )
);
