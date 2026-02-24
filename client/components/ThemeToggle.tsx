"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";
import { cn } from "@/utils/cn";
import { useState, useEffect, useRef } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const themes = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "System", icon: Monitor },
  ];

  const ActiveIcon = themes.find((t) => t.id === theme)?.icon || Monitor;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 rounded-[1.25rem] transition-all group relative"
        title="Change Theme"
      >
        <ActiveIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="px-3 py-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Appearance</p>
          </div>
          {themes.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id as any);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-200 group",
                  theme === t.id
                    ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Icon className={cn("w-4 h-4", theme === t.id ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 group-hover:text-indigo-500")} />
                <span className="font-bold text-sm">{t.label}</span>
                {theme === t.id && (
                  <div className="ml-auto w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
