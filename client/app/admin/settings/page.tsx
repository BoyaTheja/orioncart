"use client";

import { 
  Settings, 
  User, 
  Store, 
  Bell, 
  ShieldCheck, 
  Mail, 
  Camera, 
  Globe, 
  CreditCard,
  ChevronRight,
  Save,
  Trash2,
  Sun,
  Moon,
  Monitor,
  DollarSign,
  Package
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { useThemeStore } from "@/store/themeStore";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { theme, setTheme } = useThemeStore();

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "store", label: "Store", icon: Store },
    { id: "appearance", label: "Appearance", icon: Sun },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: ShieldCheck },
  ];

  const ThemeOption = ({ id, label, icon: Icon, description }: { id: any, label: string, icon: any, description: string }) => (
    <button
      onClick={() => setTheme(id)}
      className={cn(
        "flex flex-col items-start gap-4 p-8 rounded-[2.5rem] border-2 transition-all group",
        theme === id 
          ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20" 
          : "border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-900"
      )}
    >
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
        theme === id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-slate-100 dark:group-hover:bg-slate-700 group-hover:text-slate-600 dark:group-hover:text-slate-300"
      )}>
        <Icon className="w-7 h-7" />
      </div>
      <div className="text-left">
        <p className={cn("font-black tracking-tight", theme === id ? "text-indigo-600 dark:text-indigo-400" : "text-slate-900 dark:text-white")}>{label}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">{description}</p>
      </div>
    </button>
  );

  return (
    <div className="space-y-12 pb-20 transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">Settings</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 font-bold">Manage your account and platform preferences.</p>
        </div>
        <button className="flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all active:scale-95">
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-4 shadow-sm transition-colors duration-300">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-black text-sm tracking-tight group",
                    activeTab === tab.id
                      ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <Icon className={cn("w-5 h-5", activeTab === tab.id ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />
                  {tab.label}
                  {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 space-y-10">
          {activeTab === "appearance" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
              <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 border border-slate-100 dark:border-slate-800 shadow-sm space-y-10 transition-colors duration-300">
                <div className="flex flex-col gap-2">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Appearance</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-bold">Choose how Orion looks to you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <ThemeOption 
                    id="light" 
                    label="Light" 
                    icon={Sun} 
                    description="Clean and bright UI" 
                  />
                  <ThemeOption 
                    id="dark" 
                    label="Dark" 
                    icon={Moon} 
                    description="Easier on the eyes" 
                  />
                  <ThemeOption 
                    id="system" 
                    label="System" 
                    icon={Monitor} 
                    description="Adapts to your OS" 
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
              {/* Profile Card */}
              <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 border border-slate-100 dark:border-slate-800 shadow-sm space-y-12 transition-colors duration-300">
                <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-4xl font-black ring-8 ring-indigo-50 dark:ring-indigo-900/10">
                      AR
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:scale-110">
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Alex Rivera</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
                      <Mail className="w-4 h-4" /> alex.rivera@orioncart.com
                    </p>
                    <div className="flex gap-3 mt-4">
                      <span className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest">Administrator</span>
                      <span className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-widest">Active</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-slate-50 dark:border-slate-800">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">First Name</label>
                    <input 
                      type="text" 
                      defaultValue="Alex"
                      className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-100 dark:focus:border-indigo-900/50 focus:bg-white dark:focus:bg-slate-900 rounded-2xl p-4 font-bold text-slate-900 dark:text-white transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Last Name</label>
                    <input 
                      type="text" 
                      defaultValue="Rivera"
                      className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-100 dark:focus:border-indigo-900/50 focus:bg-white dark:focus:bg-slate-900 rounded-2xl p-4 font-bold text-slate-900 dark:text-white transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue="alex.rivera@orioncart.com"
                      className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-100 dark:focus:border-indigo-900/50 focus:bg-white dark:focus:bg-slate-900 rounded-2xl p-4 font-bold text-slate-900 dark:text-white transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Phone Number</label>
                    <input 
                      type="text" 
                      defaultValue="+1 (555) 000-0000"
                      className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-100 dark:focus:border-indigo-900/50 focus:bg-white dark:focus:bg-slate-900 rounded-2xl p-4 font-bold text-slate-900 dark:text-white transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Account Deletion */}
              <div className="bg-rose-50 dark:bg-rose-900/10 rounded-[2.5rem] p-10 flex items-center justify-between gap-6 border border-rose-100 dark:border-rose-900/30">
                <div className="space-y-2">
                  <h4 className="text-rose-900 dark:text-rose-400 font-black tracking-tight">Danger Zone</h4>
                  <p className="text-rose-700 dark:text-rose-500 text-sm font-bold opacity-80">Once you delete your account, there is no going back. Please be certain.</p>
                </div>
                <button className="flex items-center gap-3 bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 px-6 py-4 rounded-2xl font-black shadow-sm hover:bg-rose-600 dark:hover:bg-rose-600 hover:text-white dark:hover:text-white transition-all">
                  <Trash2 className="w-5 h-5" />
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {activeTab === "store" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white dark:bg-slate-900 rounded-[3rem] p-12 border border-slate-100 dark:border-slate-800 shadow-sm space-y-10 transition-colors duration-300">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Store Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Store Name</label>
                  <div className="relative group">
                    <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors" />
                    <input 
                      type="text" 
                      defaultValue="Orion Commerce"
                      className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-100 dark:focus:border-indigo-900/50 focus:bg-white dark:focus:bg-slate-900 rounded-2xl p-4 pl-12 font-bold text-slate-900 dark:text-white transition-all outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Currency</label>
                  <div className="relative group">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors" />
                    <select className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-100 dark:focus:border-indigo-900/50 focus:bg-white dark:focus:bg-slate-900 rounded-2xl p-4 pl-12 font-bold text-slate-900 dark:text-white transition-all outline-none appearance-none cursor-pointer">
                      <option className="bg-white dark:bg-slate-900">USD - US Dollar</option>
                      <option className="bg-white dark:bg-slate-900">EUR - Euro</option>
                      <option className="bg-white dark:bg-slate-900">GBP - British Pound</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Default Language</label>
                  <div className="relative group">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors" />
                    <select className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-100 dark:focus:border-indigo-900/50 focus:bg-white dark:focus:bg-slate-900 rounded-2xl p-4 pl-12 font-bold text-slate-900 dark:text-white transition-all outline-none appearance-none cursor-pointer">
                      <option className="bg-white dark:bg-slate-900">English (US)</option>
                      <option className="bg-white dark:bg-slate-900">Spanish</option>
                      <option className="bg-white dark:bg-slate-900">French</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "notifications" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
              <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 border border-slate-100 dark:border-slate-800 shadow-sm space-y-10">
                <div className="flex flex-col gap-2">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Notification Preferences</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-bold">Control which events you want to be notified about.</p>
                </div>

                <div className="space-y-6">
                  {[
                    { id: "order", label: "Order Alerts", desc: "Receive updates about new orders and payment status.", icon: DollarSign },
                    { id: "stock", label: "Inventory Alerts", desc: "Get notified when products are low on stock or restocked.", icon: Package },
                    { id: "user", label: "Customer Alerts", desc: "New customer registrations and account updates.", icon: User },
                    { id: "system", label: "System Updates", desc: "Security alerts, platform updates, and maintenance.", icon: ShieldCheck },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-6 rounded-[2rem] border-2 border-slate-50 dark:border-slate-800/50 hover:border-indigo-100 dark:hover:border-indigo-900/30 transition-all group">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                          <item.icon className="w-7 h-7" />
                        </div>
                        <div>
                          <p className="font-black text-slate-900 dark:text-white tracking-tight">{item.label}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1 max-w-sm">{item.desc}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-14 h-8 bg-slate-200 dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "security" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white dark:bg-slate-900 rounded-[3rem] p-20 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center transition-colors duration-300">
              <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-[2rem] flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-8">
                <Settings className="w-10 h-10 animate-spin-slow" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Coming Soon</h3>
              <p className="text-slate-500 dark:text-slate-400 font-bold max-w-sm">We're finalizing these settings to give you complete control over your store's experience.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
