import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  ChevronRight,
  Package,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../lib/api";
import { toast } from "sonner";
import { API_ENDPOINTS } from "../config/endpoints";

// Sub-components
import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";
import StatsCard from "../components/dashboard/StatsCard";
import StockAlerts from "../components/dashboard/StockAlerts";
import OrdersTable from "../components/orders/OrdersTable";

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

interface DashboardApiResponse {
  stats: DashboardStats;
  recentOrders: RecentOrder[];
  topProducts: TopProduct[];
  lowStockProducts: LowStockProduct[];
}

export default function Dashboard() {
  const { data: dashboardData, isLoading, error } = useQuery<DashboardApiResponse>({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.DASHBOARD.STATS);
      return response.data;
    },
  });

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch dashboard data:", error);
      toast.error("Failed to load dashboard statistics");
    }
  }, [error]);

  const stats = dashboardData?.stats || null;
  const recentOrders = dashboardData?.recentOrders || [];
  const topProducts = dashboardData?.topProducts || [];
  const lowStockProducts = dashboardData?.lowStockProducts || [];

  const normalizedRecentOrders = recentOrders.map((order) => ({
    id: order._id,
    orderNumber: `#${order.orderNumber}`,
    customerName: order.userId?.name || "Guest",
    status: order.status,
    amount: `₹ ${order.summary.total.toLocaleString()}`,
  }));

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
    return <DashboardSkeleton />;
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
          <StatsCard key={stat.label} {...stat} />
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
          <OrdersTable
            orders={normalizedRecentOrders}
            showDate={false}
            showActions={false}
          />
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
          <StockAlerts products={lowStockProducts} />
        </div>
      </div>
    </div>
  );
}
