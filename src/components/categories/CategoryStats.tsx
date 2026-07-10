import React from "react";
import { Layers, Package, TrendingUp, ChevronRight } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount: number;
  status: "Active" | "Hidden";
  revenue: number;
  isFeatured: boolean;
}

interface CategoryStatsProps {
  categories: Category[];
}

export default function CategoryStats({ categories }: CategoryStatsProps) {
  const totalProducts = categories.reduce(
    (acc, c) => acc + (c.productCount || 0),
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-2xl border border-border flex flex-col gap-2 shadow-sm">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg w-fit">
          <Layers className="w-5 h-5" />
        </div>
        <p className="text-2xl font-bold">{categories.length}</p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
          Total Categories
        </p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-border flex flex-col gap-2 shadow-sm">
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg w-fit">
          <Package className="w-5 h-5" />
        </div>
        <p className="text-2xl font-bold">{totalProducts}</p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
          Total Products Map
        </p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-border flex flex-col gap-2 shadow-sm">
        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg w-fit">
          <TrendingUp className="w-5 h-5" />
        </div>
        <p className="text-2xl font-bold">₹ 2.45L</p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
          Avg. Category Rev
        </p>
      </div>
      <div className="bg-primary text-white p-6 rounded-2xl shadow-xl shadow-primary/20 flex flex-col justify-between">
        <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
          Top Performer
        </p>
        <h3 className="text-xl font-bold mt-1">Indoor Lighting</h3>
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-4">
          <span className="text-[10px] font-medium">12% Growth</span>
          <ChevronRight className="w-4 h-4 text-white/40" />
        </div>
      </div>
    </div>
  );
}
