import React from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";

interface LowStockProduct {
  _id: string;
  name: string;
  stock: number;
  images: string[];
  price: number;
}

interface StockAlertsProps {
  products: LowStockProduct[];
}

export default function StockAlerts({ products }: StockAlertsProps) {
  if (products.length === 0) return null;

  return (
    <div className="bg-red-50/50 rounded-2xl border border-red-100 shadow-sm p-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <h2 className="font-bold text-red-900">Stock Alerts</h2>
        </div>
        <Link
          to="/products"
          className="text-[10px] font-bold uppercase tracking-widest text-red-600 hover:underline"
        >
          Restock
        </Link>
      </div>
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex items-center gap-3 bg-white p-3 rounded-xl border border-red-50 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-secondary rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center border border-border">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package className="w-4 h-4 text-muted/30" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-primary truncate">
                {product.name}
              </p>
              <p className="text-[10px] font-bold text-red-600 uppercase tracking-tighter mt-0.5">
                {product.stock} Left in Stock
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
