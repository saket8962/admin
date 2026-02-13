import { useState, useEffect } from "react";

import {
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Loader2,
  Package,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../lib/api";
import { toast } from "sonner";
import { API_ENDPOINTS } from "../config/endpoints";

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  avgOrderValue: number;
}

interface RecentOrder {
  _id: string;
  orderNumber: string;
  userId: {
    name: string;
    email: string;
  };
  status: string;
  summary: {
    total: number;
  };
}

interface TopProduct {
  _id: string;
  name: string;
  image: string;
  totalSales: number;
  totalRevenue: number;
}

interface LowStockProduct {
  _id: string;
  name: string;
  stock: number;
  images: string[];
  price: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<LowStockProduct[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(API_ENDPOINTS.DASHBOARD.STATS);
        setStats(response.data.stats);

        setRecentOrders(response.data.recentOrders);
        setTopProducts(response.data.topProducts);
        setLowStockProducts(response.data.lowStockProducts || []);
      } catch (error: any) {
        console.error("Failed to fetch dashboard data:", error);
        toast.error("Failed to load dashboard statistics");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statsDisplay = [
    {
      label: "Total Revenue",
      value: `₹ ${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      trend: "+12.5%", // These could be calculated if we had historical data
      isPositive: true,
      path: "/products", // Temporary path until orders list is built
    },
    {
      label: "Total Orders",
      value: stats?.totalOrders.toString() || "0",
      icon: ShoppingBag,
      trend: "+8.2%",
      isPositive: true,
      path: "/products",
    },
    {
      label: "Total Customers",
      value: (stats?.totalCustomers || 0).toLocaleString(),
      icon: Users,
      trend: "+18.4%",
      isPositive: true,
      path: "/products",
    },
    {
      label: "Avg. Order Value",
      value: `₹ ${(stats?.avgOrderValue || 0).toLocaleString()}`,
      icon: TrendingUp,
      trend: "-2.1%",
      isPositive: false,
      path: "/products",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted p-12 h-[calc(100vh-200px)]">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
        <span className="text-xs font-bold uppercase tracking-widest">
          Calculating Metrics...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-serif">Welcome back, Admin</h1>
          <p className="text-muted text-sm">
            Here's what's happening with your store today.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsDisplay.map((stat) => (
          <Link
            key={stat.label}
            to={stat.path}
            className="group bg-white p-6 rounded-2xl border border-border flex flex-col gap-4 shadow-sm hover:shadow-xl hover:border-accent/20 transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex justify-between items-start relative z-10">
              <div className="p-2 bg-secondary rounded-lg text-primary group-hover:bg-accent group-hover:text-white transition-colors">
                <stat.icon className="w-6 h-6" />
              </div>
              <div
                className={`flex items-center text-xs font-bold ${stat.isPositive ? "text-green-600" : "text-red-600"}`}
              >
                {stat.trend}
                {stat.isPositive ? (
                  <ArrowUpRight className="w-3 h-3 ml-0.5" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 ml-0.5" />
                )}
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest group-hover:text-accent transition-colors">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </div>

            <div className="absolute right-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="w-4 h-4 text-accent" />
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors" />
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h2 className="font-bold">Recent Orders</h2>
            <Link
              to="/products"
              className="text-[10px] font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors flex items-center gap-1 group"
            >
              View All
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-secondary/50 text-[10px] uppercase tracking-widest text-muted font-bold">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-muted text-xs font-bold uppercase tracking-widest"
                    >
                      No recent orders
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="text-sm hover:bg-secondary/20 transition-colors"
                    >
                      <td className="px-6 py-4 font-bold text-primary">
                        #{order.orderNumber}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        {order.userId?.name || "Guest"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-accent">
                        ₹ {order.summary.total.toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Top Products & Low Stock Alerts */}
        <div className="space-y-8">
          {/* Top Products */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-bold">Top Products</h2>
              <Link
                to="/products"
                className="text-[10px] font-bold uppercase tracking-widest text-accent hover:underline"
              >
                Manage
              </Link>
            </div>
            <div className="space-y-6">
              {topProducts.length === 0 ? (
                <div className="text-center py-12 text-muted text-xs font-bold uppercase tracking-widest">
                  No data available
                </div>
              ) : (
                topProducts.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="w-14 h-14 bg-secondary rounded-xl flex-shrink-0 group-hover:bg-accent/10 transition-colors overflow-hidden border border-border/50 flex items-center justify-center">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-6 h-6 text-muted/30" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold group-hover:text-accent transition-colors line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted mt-0.5">
                        {product.totalSales} Sales
                      </p>
                    </div>
                    <div className="text-sm font-bold text-accent">
                      ₹ {product.totalRevenue.toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Low Stock Alerts */}
          {lowStockProducts.length > 0 && (
            <div className="bg-red-50/50 rounded-2xl border border-red-100 shadow-sm p-6">
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
                {lowStockProducts.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center gap-3 bg-white p-3 rounded-xl border border-red-50 shadow-sm"
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
          )}
        </div>
      </div>
    </div>
  );
}
