import React from "react";
import { Percent, Users, TrendingUp, ChevronRight } from "lucide-react";

interface Coupon {
  id: string | number;
  code: string;
  type: "Percentage" | "Fixed Amount" | "Flash Sale";
  value: string;
  status: "Active" | "Paused";
  usage: number;
  limit: number | "Unlimited";
  expiry: string;
}

interface CouponStatsProps {
  coupons: Coupon[];
}

export default function CouponStats({ coupons }: CouponStatsProps) {
  const activeCount = coupons.filter((c) => c.status === "Active").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-in fade-in duration-300">
      <div className="bg-white p-6 rounded-2xl border border-border flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Percent className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-green-600">
            +12% vs last month
          </span>
        </div>
        <p className="text-2xl font-bold">₹ 42,500</p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
          Total Savings Given
        </p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-border flex flex-col gap-2">
        <div className="p-2 bg-accent/10 text-accent rounded-lg w-fit">
          <Users className="w-5 h-5" />
        </div>
        <p className="text-2xl font-bold">482</p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
          Campaign Reach
        </p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-border flex flex-col gap-2">
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg w-fit">
          <TrendingUp className="w-5 h-5" />
        </div>
        <p className="text-2xl font-bold">18.5%</p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
          Conversion Boost
        </p>
      </div>
      <div className="bg-primary text-white p-6 rounded-2xl shadow-xl shadow-primary/20 flex flex-col justify-between">
        <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
          Live Campaigns
        </p>
        <h3 className="text-3xl font-bold mt-1">{activeCount}</h3>
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">
            Real-time tracking
          </span>
          <ChevronRight className="w-4 h-4 text-white/40" />
        </div>
      </div>
    </div>
  );
}
