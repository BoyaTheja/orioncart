"use client";

import AdminProductForm from "@/components/AdminProductForm";
import {
  Package,
  DollarSign,
  AlertTriangle,
  Clock,
  PlusCircle,
  ArrowUpRight,
  TrendingUp,
  Settings,
  Tag,
  FileText,
  FileSpreadsheet,
  Download,
  X,
} from "lucide-react";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useState } from "react";

const stats = [
  {
    name: "Total Products",
    value: "240",
    icon: Package,
    color: "bg-indigo-50 text-indigo-600",
    trend: "+12%",
  },
  {
    name: "Total Sales",
    value: "$12,450",
    icon: DollarSign,
    color: "bg-emerald-50 text-emerald-600",
    trend: "+8.4%",
  },
  {
    name: "Low Stock",
    value: "12",
    icon: AlertTriangle,
    color: "bg-amber-50 text-amber-600",
    trend: "-2",
  },
  {
    name: "Pending Orders",
    value: "5",
    icon: Clock,
    color: "bg-purple-50 text-purple-600",
    trend: "+2",
  },
];

export default function AdminPage() {
  const [showExportModal, setShowExportModal] = useState(false);

  const handleExport = (format: "pdf" | "xls") => {
    console.log(`Exporting as ${format}...`);
    // Mock download logic
    alert(
      `Generating ${format.toUpperCase()} report... Your download will start shortly.`,
    );
    setShowExportModal(false);
  };

  return (
    <div className="space-y-10 transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Dashboard
          </h2>
          <div className="flex items-center gap-3 mt-1.5">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              Store performance is up{" "}
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                12%
              </span>
            </p>
            <div className="h-3 w-[1px] bg-slate-200 dark:bg-slate-800" />
            <p className="text-slate-400 dark:text-slate-500 font-medium text-xs">
              Last sync: 2 mins ago
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-all shadow-sm">
            Generate Report
          </button>
          <Link
            href="/admin/products"
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all"
          >
            + New Product
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="group bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm dark:shadow-none dark:border dark:border-slate-800/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-inner",
                    stat.color,
                  )}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                    stat.trend.startsWith("+")
                      ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                      : "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400",
                  )}
                >
                  {stat.trend}
                </div>
              </div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                {stat.name}
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* <div className="xl:col-span-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm dark:shadow-none dark:border dark:border-slate-800/50">
            <div className="p-8 border-b border-slate-50 dark:border-slate-800/60">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                <PlusCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                Inventory Entry
              </h3>
            </div>
            <div className="p-2">
              <AdminProductForm />
            </div>
          </div>
        </div> */}

        <div className="xl:col-span-4 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm dark:shadow-none dark:border dark:border-slate-800/50 p-8 flex flex-col h-full min-h-[500px]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Activity
              </h3>
              <Link
                href="/admin/orders"
                className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all group shadow-sm"
              >
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              </Link>
            </div>

            <div className="space-y-8 flex-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-5 items-start group">
                  <div className="w-11 h-11 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-center text-lg group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 group-hover:border-indigo-100 dark:group-hover:border-indigo-900/50 transition-all">
                    {i % 2 === 0 ? (
                      <Package className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" />
                    ) : (
                      <DollarSign className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" />
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                      {i % 2 === 0
                        ? "Sony A7 IV restocked"
                        : "Order #2940 received"}
                    </p>
                    <div className="flex items-center gap-2.5 mt-1.5">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        3 mins ago
                      </span>
                      <div className="h-1 w-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
                      <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">
                        Auto
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <div className="p-6 bg-slate-900 dark:bg-slate-800 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold tracking-tight mb-1 relative z-10">
                  Pro Insights
                </h4>
                <p className="text-slate-400 text-xs font-medium mb-4 relative z-10">
                  Predictive analytics ready.
                </p>
                <button className="w-full py-2.5 bg-white text-slate-900 rounded-xl font-bold text-xs relative z-10 hover:bg-slate-100 transition-all">
                  Upgrade
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowExportModal(true)}
                  className="flex-1 py-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-2 group hover:border-amber-500 transition-all shadow-sm"
                >
                  <Download className="w-5 h-5 text-amber-500" />
                  <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Export
                  </span>
                </button>
                <Link
                  href="/admin/settings"
                  className="flex-1 py-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-2 group hover:border-emerald-500 transition-all shadow-sm"
                >
                  <Tag className="w-5 h-5 text-emerald-500" />
                  <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Coupon
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setShowExportModal(false)}
          />
          <div className="relative bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowExportModal(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Export Sales Data
              </h3>
              <p className="text-slate-500 text-sm font-medium mt-1">
                Select your preferred file format
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleExport("pdf")}
                className="flex flex-col items-center gap-4 p-6 rounded-3xl border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50/50 transition-all group"
              >
                <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="font-bold text-slate-900">PDF Document</span>
              </button>

              <button
                onClick={() => handleExport("xls")}
                className="flex flex-col items-center gap-4 p-6 rounded-3xl border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50/50 transition-all group"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <span className="font-bold text-slate-900">Excel Sheet</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
