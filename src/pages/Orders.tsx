import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import api from "../lib/api";
import OrdersTable from "../components/orders/OrdersTable";
import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";

export default function Orders() {
  const { data: rawOrders = [], isLoading } = useQuery<any[]>({
    queryKey: ["adminOrdersList"],
    queryFn: async () => {
      const response = await api.get("/admin/orders");
      return response.data.data || [];
    },
  });

  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // Calculate real-time counts from loaded orders
  const pendingCount = rawOrders.filter(
    (o) =>
      o.status === "Created" ||
      o.status === "Pending" ||
      o.status === "Confirmed" ||
      o.status === "Packed"
  ).length;
  const shippedCount = rawOrders.filter((o) => o.status === "Shipped").length;
  const deliveredCount = rawOrders.filter((o) => o.status === "Delivered").length;
  const cancelledCount = rawOrders.filter((o) => o.status === "Cancelled").length;

  // Filter orders by search term
  const filteredOrders = rawOrders.filter((order) => {
    const term = searchTerm.toLowerCase();
    const matchesId = order.orderNumber?.toLowerCase().includes(term);
    const matchesCustomer = order.userId?.name?.toLowerCase().includes(term);
    return matchesId || matchesCustomer;
  });

  const normalizedOrders = filteredOrders.map((order) => ({
    id: order._id,
    orderNumber: order.orderNumber,
    customerName: order.userId?.name || "Unknown Customer",
    date: new Date(order.createdAt).toLocaleDateString("en-IN"),
    status: order.status,
    amount: `₹ ${order.summary.total.toLocaleString("en-IN")}`,
  }));

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-serif">Order Management</h1>
            <p className="text-muted text-sm">
              Track and fulfill your store orders.
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <Download className="w-4 h-4" />
          Export Orders
        </button>
      </div>

      {/* Order Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Pending / Processing",
            count: pendingCount,
            icon: Clock,
            color: "text-yellow-600 bg-yellow-50",
          },
          {
            label: "Shipped",
            count: shippedCount,
            icon: Truck,
            color: "text-blue-600 bg-blue-50",
          },
          {
            label: "Delivered",
            count: deliveredCount,
            icon: CheckCircle2,
            color: "text-green-600 bg-green-50",
          },
          {
            label: "Cancelled",
            count: cancelledCount,
            icon: XCircle,
            color: "text-red-600 bg-red-50",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white p-4 rounded-xl border border-border shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className={cn("p-2 rounded-lg", s.color)}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
                  {s.label}
                </p>
                <p className="text-xl font-bold">{s.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search by order ID or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-secondary/30 border border-transparent rounded-lg text-sm focus:bg-white focus:border-accent/30 outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        <OrdersTable
          orders={normalizedOrders}
          showDate={true}
          showActions={true}
        />
      </div>
    </div>
  );
}
