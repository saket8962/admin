import { useState } from "react";
import {
  Ticket,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Users,
  Percent,
  TrendingUp,
  Tag,
  ChevronRight,
  X,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

interface Coupon {
  id: number;
  code: string;
  type: "Percentage" | "Fixed Amount" | "Flash Sale";
  value: string;
  status: "Active" | "Paused";
  usage: number;
  limit: number | "Unlimited";
  expiry: string;
}

const initialCoupons: Coupon[] = [
  {
    id: 1,
    code: "WELCOME2024",
    type: "Percentage",
    value: "20%",
    status: "Active",
    usage: 154,
    limit: 500,
    expiry: "2024-12-31",
  },
  {
    id: 2,
    code: "FESTIVE500",
    type: "Fixed Amount",
    value: "₹ 500",
    status: "Paused",
    usage: 42,
    limit: 100,
    expiry: "2024-11-15",
  },
  {
    id: 3,
    code: "GOLDENHOUR",
    type: "Flash Sale",
    value: "35%",
    status: "Active",
    usage: 89,
    limit: "Unlimited",
    expiry: "2024-12-10",
  },
];

export default function Coupons() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState<Partial<Coupon>>({
    code: "",
    type: "Percentage",
    value: "",
    limit: 100,
    expiry: "",
  });

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoupon.code || !newCoupon.value) return;

    const couponToAdd: Coupon = {
      id: Date.now(),
      code: newCoupon.code.toUpperCase(),
      type: newCoupon.type as any,
      value:
        newCoupon.type === "Percentage" || newCoupon.type === "Flash Sale"
          ? `${newCoupon.value}%`
          : `₹ ${newCoupon.value}`,
      status: "Active",
      usage: 0,
      limit: newCoupon.limit as number,
      expiry: newCoupon.expiry || "2025-01-01",
    };

    setCoupons([couponToAdd, ...coupons]);
    setIsSidebarOpen(false);
    setNewCoupon({
      code: "",
      type: "Percentage",
      value: "",
      limit: 100,
      expiry: "",
    });
  };

  const toggleStatus = (id: number) => {
    setCoupons(
      coupons.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Active" ? "Paused" : "Active" }
          : c,
      ),
    );
  };

  const deleteCoupon = (id: number) => {
    setCoupons(coupons.filter((c) => c.id !== id));
  };

  return (
    <div className="relative min-h-screen">
      <div
        className={cn(
          "space-y-8 animate-in fade-in duration-500 pb-12 transition-all",
          isSidebarOpen ? "pr-[400px] blur-[2px] pointer-events-none" : "",
        )}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold font-serif">
              Promotions & Coupons
            </h1>
            <p className="text-muted text-sm">
              Drive revenue with real-time discount campaigns.
            </p>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" /> Create Promotion
          </button>
        </div>

        {/* Promotion Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            <h3 className="text-3xl font-bold mt-1">
              {coupons.filter((c) => c.status === "Active").length}
            </h3>
            <div className="mt-4 flex items-center justify-between gap-2">
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">
                Real-time tracking
              </span>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </div>
          </div>
        </div>

        {/* Active Coupons Table */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search by code..."
                className="w-full pl-10 pr-4 py-2 bg-secondary/30 border border-transparent rounded-lg text-sm focus:bg-white focus:ring-4 focus:ring-accent/10 transition-all outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-primary rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-border transition-all">
                <Filter className="w-4 h-4" /> Filters
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
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
                {coupons.map((coupon) => (
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
                            : "bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100",
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
                                  : `${(coupon.usage / (coupon.limit as number)) * 100}%`,
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
          </div>
        </div>
      </div>

      {/* Creation Side Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-out border-l border-border",
          isSidebarOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold font-serif">New Promotion</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-secondary rounded-full transition-all"
            >
              <X className="w-5 h-5 text-muted" />
            </button>
          </div>

          <form
            onSubmit={handleCreateCoupon}
            className="space-y-6 flex-1 overflow-y-auto pr-2"
          >
            <div className="space-y-4 p-5 bg-secondary/20 rounded-2xl border border-dashed border-border">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="w-4 h-4 text-accent" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
                  Campaign Intel
                </p>
              </div>
              <p className="text-xs text-muted leading-relaxed italic">
                "Creating a coupon here will activate it across your storefront
                instantly. Real-time usage tracking is enabled by default."
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
                Coupon Code
              </label>
              <input
                type="text"
                placeholder="e.g. FLASH50"
                required
                value={newCoupon.code}
                onChange={(e) =>
                  setNewCoupon({
                    ...newCoupon,
                    code: e.target.value.toUpperCase(),
                  })
                }
                className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/40 outline-none transition-all font-mono tracking-wider"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
                  Discount Type
                </label>
                <select
                  value={newCoupon.type}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, type: e.target.value as any })
                  }
                  className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/40 outline-none transition-all text-sm font-medium"
                >
                  <option value="Percentage">Percentage %</option>
                  <option value="Fixed Amount">Fixed Amount ₹</option>
                  <option value="Flash Sale">Flash Sale %</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
                  Value
                </label>
                <input
                  type="number"
                  placeholder="20"
                  required
                  value={newCoupon.value}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, value: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/40 outline-none transition-all text-sm font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
                  Usage Limit
                </label>
                <input
                  type="number"
                  value={newCoupon.limit}
                  onChange={(e) =>
                    setNewCoupon({
                      ...newCoupon,
                      limit: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/40 outline-none transition-all text-sm font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={newCoupon.expiry}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, expiry: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/40 outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="pt-8 mt-auto border-t border-border">
              <button
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:bg-primary/90 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3"
              >
                <CheckCircle2 className="w-4 h-4" /> Deploy Promotion
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
