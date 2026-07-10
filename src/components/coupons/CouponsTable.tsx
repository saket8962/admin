import React from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Tag, ChevronRight, X } from "lucide-react";
import { cn } from "../../lib/utils";

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

interface CouponsTableProps {
  coupons: Coupon[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  toggleStatus: (id: string | number) => void;
  deleteCoupon: (id: string | number) => void;
}

export default function CouponsTable({
  coupons,
  searchTerm,
  setSearchTerm,
  toggleStatus,
  deleteCoupon,
}: CouponsTableProps) {
  // Filter coupons locally by code
  const filteredCoupons = coupons.filter((c) =>
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden animate-in fade-in duration-300">
      <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search by code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-secondary/30 border border-transparent rounded-lg text-sm focus:bg-white focus:ring-4 focus:ring-accent/10 transition-all outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-primary rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-border transition-all">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      <div className="overflow-x-auto min-h-[200px] flex flex-col justify-center">
        {filteredCoupons.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 gap-4 text-muted">
            <span className="text-sm font-bold uppercase tracking-widest">
              No promotions found
            </span>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-secondary/40 text-[10px] uppercase tracking-widest text-muted font-bold">
              <tr>
                <th className="px-6 py-4 border-b border-border">
                  Coupon Code
                </th>
                <th className="px-6 py-4 border-b border-border">
                  Value / Type
                </th>
                <th className="px-6 py-4 border-b border-border">Status</th>
                <th className="px-6 py-4 border-b border-border">
                  Redemptions
                </th>
                <th className="px-6 py-4 border-b border-border">Expires</th>
                <th className="px-6 py-4 border-b border-border text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCoupons.map((coupon) => (
                <tr
                  key={coupon.id}
                  className="group hover:bg-secondary/10 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-secondary text-primary rounded-lg group-hover:bg-accent group-hover:text-white transition-all">
                        <Tag className="w-4 h-4" />
                      </div>
                      <Link
                        to={`/marketing/coupons/${coupon.id}`}
                        className="text-sm font-bold font-mono tracking-wider text-primary hover:text-accent transition-colors"
                      >
                        {coupon.code}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-accent">
                        {coupon.value} OFF
                      </span>
                      <span className="text-[10px] text-muted font-medium uppercase tracking-widest">
                        {coupon.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(coupon.id)}
                      className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all hover:scale-105",
                        coupon.status === "Active"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100"
                          : "bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100"
                      )}
                    >
                      {coupon.status}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5 w-32">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-primary">{coupon.usage}</span>
                        <span className="text-muted">/ {coupon.limit}</span>
                      </div>
                      <div className="h-1 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent transition-all duration-700"
                          style={{
                            width:
                              coupon.limit === "Unlimited"
                                ? "60%"
                                : `${
                                    (coupon.usage /
                                      (coupon.limit as number)) *
                                    100
                                  }%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted">
                    {coupon.expiry}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/marketing/coupons/${coupon.id}`}
                        className="p-2 text-muted hover:text-accent hover:bg-accent/5 rounded-lg transition-all border border-transparent hover:border-border/50"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => deleteCoupon(coupon.id)}
                        className="p-2 text-muted hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
