import React from "react";
import {
  ArrowLeft,
  TrendingUp,
  Download,
  BarChart3,
  MousePointerClick,
  Users,
  ShoppingCart,
  Percent,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Analytics() {
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
            <h1 className="text-2xl font-bold font-serif">Store Analytics</h1>
            <p className="text-muted text-sm">
              In-depth performance metrics and conversion tracking.
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Avg. Order Value",
            value: "₹ 1,840",
            trend: "+5.2%",
            icon: ShoppingCart,
            color: "text-blue-600 bg-blue-50",
          },
          {
            label: "Conversion Rate",
            value: "3.4%",
            trend: "+1.1%",
            icon: Percent,
            color: "text-green-600 bg-green-50",
          },
          {
            label: "Store Sessions",
            value: "12,450",
            trend: "+12.5%",
            icon: Users,
            color: "text-accent bg-accent/10",
          },
          {
            label: "Click Rate",
            value: "15.2%",
            trend: "-2.4%",
            icon: MousePointerClick,
            color: "text-primary bg-secondary",
          },
        ].map((m) => (
          <div
            key={m.label}
            className="bg-white p-6 rounded-2xl border border-border shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg", m.color)}>
                <m.icon className="w-5 h-5" />
              </div>
              <span
                className={cn(
                  "text-xs font-bold",
                  m.trend.startsWith("+") ? "text-green-600" : "text-red-600",
                )}
              >
                {m.trend}
              </span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
              {m.label}
            </p>
            <p className="text-2xl font-bold mt-1">{m.value}</p>
          </div>
        ))}
      </div>

      {/* Main Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-border flex flex-col items-center justify-center min-h-[300px] text-center space-y-4">
          <div className="p-4 bg-secondary rounded-full">
            <BarChart3 className="w-8 h-8 text-primary opacity-20" />
          </div>
          <div>
            <h4 className="font-bold">Conversion Funnel</h4>
            <p className="text-sm text-muted">
              A visual representation of the path from session to checkout.
            </p>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
            Visualization Under Development
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-border flex flex-col items-center justify-center min-h-[300px] text-center space-y-4">
          <div className="p-4 bg-secondary rounded-full">
            <TrendingUp className="w-8 h-8 text-primary opacity-20" />
          </div>
          <div>
            <h4 className="font-bold">AOV Distribution</h4>
            <p className="text-sm text-muted">
              Analyzing the spread of order values across categories.
            </p>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
            Visualization Under Development
          </p>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
