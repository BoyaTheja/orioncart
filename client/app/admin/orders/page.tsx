import { ClipboardList, PlusCircle } from "lucide-react";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <ClipboardList className="w-10 h-10 text-indigo-600" />
            Order Management
          </h2>
          <p className="text-slate-500 mt-2 font-medium">Track and manage your customer's orders.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100/60 p-20 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-6">
          <ClipboardList className="w-10 h-10 text-indigo-500" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">Orders are coming soon!</h3>
        <p className="text-slate-500 max-w-sm">We're currently building the order management system to give you the best experience possible.</p>
      </div>
    </div>
  );
}
