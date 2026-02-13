import React from "react";
import {
  ArrowLeft,
  TrendingUp,
  Download,
  Filter,
  CreditCard,
  Wallet,
  Banknote,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Revenue() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-serif">Revenue Overview</h1>
            <p className="text-muted text-sm">
              Detailed financial performance and trends.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Main Stats Card */}
      <div className="bg-primary text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <p className="text-accent font-bold uppercase tracking-[0.2em] text-xs">
              Total Revenue
            </p>
            <h2 className="text-5xl font-bold tracking-tight">₹ 1,24,500</h2>
            <div className="flex items-center gap-2 text-green-400 text-sm font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>+12.5% from last month</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/10 flex flex-col gap-2 min-w-[120px]">
              <p className="text-[10px] uppercase opacity-60">Today</p>
              <p className="text-lg font-bold">₹ 4,250</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/10 flex flex-col gap-2 min-w-[120px]">
              <p className="text-[10px] uppercase opacity-60">Yesterday</p>
              <p className="text-lg font-bold">₹ 3,890</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Methods */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="font-bold mb-6">Payment Methods</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">Cards</p>
                  <p className="text-xs text-muted">45 transactions</p>
                </div>
              </div>
              <p className="font-bold">₹ 56,200</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">UPI / Wallets</p>
                  <p className="text-xs text-muted">82 transactions</p>
                </div>
              </div>
              <p className="font-bold">₹ 48,150</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
                  <Banknote className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">Cash on Delivery</p>
                  <p className="text-xs text-muted">27 transactions</p>
                </div>
              </div>
              <p className="font-bold">₹ 20,150</p>
            </div>
          </div>
        </div>

        {/* Categories Breakdown */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="font-bold mb-6">Revenue by Category</h3>
          <div className="space-y-4">
            {[
              { label: "Pendants", value: 45000, color: "bg-accent" },
              { label: "Chandeliers", value: 38000, color: "bg-primary" },
              { label: "Wall Lamps", value: 25000, color: "bg-muted" },
              { label: "Floor Lamps", value: 16500, color: "bg-secondary" },
            ].map((cat) => (
              <div key={cat.label} className="space-y-1">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                  <span>{cat.label}</span>
                  <span>₹ {cat.value.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cat.color} transition-all duration-1000`}
                    style={{ width: `${(cat.value / 124500) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
