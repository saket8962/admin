import {
  ArrowLeft,
  Users,
  Percent,
  TrendingUp,
  Tag,
  Clock,
  Calendar,
  ExternalLink,
  ChevronRight,
  TrendingDown,
  ArrowUpRight,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { cn } from "../lib/utils";

// Mock data for a specific coupon's intelligence
const couponIntelligence = {
  id: "COUP-881",
  code: "WELCOME2024",
  status: "Active",
  type: "Percentage",
  value: "20%",
  created: "Oct 12, 2024",
  expiry: "Dec 31, 2024",
  stats: {
    totalSavings: "₹ 1,24,500",
    redemptions: 482,
    conversionRate: "18.5%",
    avgDiscount: "₹ 258",
  },
  redemptions: [
    {
      id: 1,
      user: "Rahul Sharma",
      userId: "CUST-101",
      orderId: "#ORD-2026-081",
      discountGiven: "₹ 450",
      orderTotal: "₹ 2,250",
      date: "Feb 06, 2026, 02:30 PM",
    },
    {
      id: 2,
      user: "Priya Singh",
      userId: "CUST-102",
      orderId: "#ORD-2026-075",
      discountGiven: "₹ 180",
      orderTotal: "₹ 890",
      date: "Feb 05, 2026, 11:15 AM",
    },
    {
      id: 3,
      user: "Sneha Kapur",
      userId: "CUST-8821",
      orderId: "#ORD-2026-045",
      discountGiven: "₹ 850",
      orderTotal: "₹ 4,250",
      date: "Jan 12, 2026, 02:30 PM",
    },
    {
      id: 4,
      user: "Amit Patel",
      userId: "CUST-103",
      orderId: "#ORD-2026-012",
      discountGiven: "₹ 490",
      orderTotal: "₹ 2,450",
      date: "Jan 05, 2026, 04:45 PM",
    },
    {
      id: 5,
      user: "Vikram Mehta",
      userId: "CUST-104",
      orderId: "#ORD-2025-992",
      discountGiven: "₹ 378",
      orderTotal: "₹ 1,890",
      date: "Dec 28, 2025, 09:10 AM",
    },
  ],
};

export default function CouponDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/coupons"
          className="p-2 hover:bg-secondary rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold font-serif font-mono tracking-tighter">
              {couponIntelligence.code}
            </h1>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
              {couponIntelligence.status}
            </span>
          </div>
          <p className="text-muted text-sm mt-1">
            Campaign started on {couponIntelligence.created} • Expires{" "}
            {couponIntelligence.expiry}
          </p>
        </div>
      </div>

      {/* Intelligence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-border flex flex-col gap-2 shadow-sm">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg w-fit">
            <Percent className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold">
            {couponIntelligence.stats.totalSavings}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Total Discount Given
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-border flex flex-col gap-2 shadow-sm">
          <div className="p-2 bg-orange-50 text-orange-600 rounded-lg w-fit">
            <Users className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold">
            {couponIntelligence.stats.redemptions}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Unique Redemptions
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-border flex flex-col gap-2 shadow-sm">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg w-fit">
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold">
            {couponIntelligence.stats.conversionRate}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Checkout Conversion
          </p>
        </div>
        <div className="bg-primary text-white p-6 rounded-2xl shadow-xl shadow-primary/20 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
              Avg. Discount/User
            </p>
            <h3 className="text-2xl font-bold mt-1">
              {couponIntelligence.stats.avgDiscount}
            </h3>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-4">
            <span className="text-[10px] font-medium">ROI Level: High</span>
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main: Redemption History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="font-bold">Redemption History by User</h3>
              <button className="text-[10px] font-bold uppercase tracking-widest text-accent hover:underline flex items-center gap-1">
                <ExternalLink className="w-3 h-3" /> Export JSON
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-secondary/40 text-[10px] uppercase tracking-widest text-muted font-bold">
                  <tr>
                    <th className="px-6 py-4">User Details</th>
                    <th className="px-6 py-4">Order Context</th>
                    <th className="px-6 py-4">Discount Applied</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {couponIntelligence.redemptions.map((item) => (
                    <tr
                      key={item.id}
                      className="group hover:bg-secondary/10 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center text-xs font-bold">
                            {item.user.charAt(0)}
                          </div>
                          <div>
                            <Link
                              to={`/customers/${item.userId}`}
                              className="text-sm font-bold text-primary hover:text-accent transition-colors"
                            >
                              {item.user}
                            </Link>
                            <p className="text-[10px] text-muted font-medium">
                              {item.userId}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/orders/${item.orderId.replace("#", "")}`}
                          className="text-sm font-medium hover:underline flex items-center gap-1"
                        >
                          {item.orderId} <ArrowUpRight className="w-3 h-3" />
                        </Link>
                        <p className="text-[10px] text-muted">{item.date}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-emerald-600">
                            -{item.discountGiven}
                          </span>
                          <span className="text-[10px] text-muted">
                            On {item.orderTotal}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/orders/${item.orderId.replace("#", "")}`}
                          className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-border transition-all text-muted inline-block"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar: Strategy & Settings */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
            <h3 className="font-bold flex items-center gap-2">
              <Tag className="w-5 h-5 text-accent" />
              Campaign Settings
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted">Promo Code</span>
                <span className="font-mono font-bold text-accent">
                  {couponIntelligence.code}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted">Discount Type</span>
                <span className="font-bold">{couponIntelligence.type}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted">Value</span>
                <span className="font-bold text-lg">
                  {couponIntelligence.value}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pt-4 border-t border-border">
                <span className="text-muted">Min. Requirement</span>
                <span className="font-medium italic text-muted text-xs">
                  None
                </span>
              </div>
            </div>
          </div>

          <div className="bg-secondary/20 p-6 rounded-2xl border border-dashed border-border flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <h4 className="text-sm font-bold">Campaign Health</h4>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              This campaign is performing **24% better** than your previous
              seasonal promotion. High traction from repeat customers found.
            </p>
            <button className="w-full py-2 bg-white border border-border rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-all">
              Boost Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
