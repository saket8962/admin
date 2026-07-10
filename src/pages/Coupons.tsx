import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, AlertCircle, CheckCircle2 } from "lucide-react";

// Reusable components
import Drawer from "../components/ui/Drawer";
import CouponsSkeleton from "../components/skeletons/CouponsSkeleton";
import CouponStats from "../components/coupons/CouponStats";
import CouponsTable from "../components/coupons/CouponsTable";

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
    code: "WELCOME100",
    type: "Fixed Amount",
    value: "₹ 100",
    status: "Active",
    usage: 145,
    limit: 1000,
    expiry: "2024-12-31",
  },
  {
    id: 2,
    code: "DIWALI50",
    type: "Percentage",
    value: "50%",
    status: "Active",
    usage: 890,
    limit: 1000,
    expiry: "2024-11-15",
  },
  {
    id: 3,
    code: "FLASHSALE30",
    type: "Flash Sale",
    value: "30%",
    status: "Paused",
    usage: 300,
    limit: 300,
    expiry: "2024-10-01",
  },
  {
    id: 4,
    code: "FREESHIP",
    type: "Percentage",
    value: "100%",
    status: "Active",
    usage: 89,
    limit: "Unlimited",
    expiry: "2024-12-10",
  },
];

let mockCoupons = [...initialCoupons];

export default function Coupons() {
  const {
    data: coupons = [],
    isLoading,
    refetch: refetchCoupons,
  } = useQuery<Coupon[]>({
    queryKey: ["couponsList"],
    queryFn: async () => {
      // Simulate API call latency
      await new Promise((resolve) => setTimeout(resolve, 300));
      return mockCoupons;
    },
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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

    mockCoupons = [couponToAdd, ...mockCoupons];
    refetchCoupons();
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
    mockCoupons = mockCoupons.map((c) =>
      c.id === id
        ? { ...c, status: c.status === "Active" ? "Paused" : "Active" }
        : c
    );
    refetchCoupons();
  };

  const deleteCoupon = (id: number) => {
    mockCoupons = mockCoupons.filter((c) => c.id !== id);
    refetchCoupons();
  };

  if (isLoading) {
    return <CouponsSkeleton />;
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
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
      <CouponStats coupons={coupons} />

      {/* Active Coupons Table */}
      <CouponsTable
        coupons={coupons}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        toggleStatus={toggleStatus}
        deleteCoupon={deleteCoupon}
      />

      {/* Creation Slide Panel */}
      <Drawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        title="New Promotion"
      >
        <form onSubmit={handleCreateCoupon} className="space-y-6">
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
              value={newCoupon.code || ""}
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
                value={newCoupon.value || ""}
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
                value={newCoupon.limit || 100}
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
                value={newCoupon.expiry || ""}
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
      </Drawer>
    </div>
  );
}
