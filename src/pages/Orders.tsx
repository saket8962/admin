import React from "react";
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const orders = [
  {
    id: "#ORD-2024-101",
    customer: "Rahul Sharma",
    date: "Jan 12, 2026",
    status: "Delivered",
    amount: "₹ 1,250",
  },
  {
    id: "#ORD-2024-102",
    customer: "Priya Singh",
    date: "Jan 12, 2026",
    status: "Pending",
    amount: "₹ 890",
  },
  {
    id: "#ORD-2024-103",
    customer: "Amit Patel",
    date: "Jan 11, 2026",
    status: "Shipped",
    amount: "₹ 2,450",
  },
  {
    id: "#ORD-2024-104",
    customer: "Sneha Kapur",
    date: "Jan 11, 2026",
    status: "Cancelled",
    amount: "₹ 450",
  },
  {
    id: "#ORD-2024-105",
    customer: "Vikram Mehta",
    date: "Jan 10, 2026",
    status: "Delivered",
    amount: "₹ 1,890",
  },
];

export default function Orders() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
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
            label: "Pending",
            count: 12,
            icon: Clock,
            color: "text-yellow-600 bg-yellow-50",
          },
          {
            label: "Shipped",
            count: 8,
            icon: Truck,
            color: "text-blue-600 bg-blue-50",
          },
          {
            label: "Delivered",
            count: 124,
            icon: CheckCircle2,
            color: "text-green-600 bg-green-50",
          },
          {
            label: "Cancelled",
            count: 5,
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
              className="w-full pl-10 pr-4 py-2 bg-secondary/30 border border-transparent rounded-lg text-sm focus:bg-white focus:border-accent/30 outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-secondary/50 text-[10px] uppercase font-bold tracking-widest text-muted">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="text-sm hover:bg-secondary/20 transition-colors"
                >
                  <td className="px-6 py-4 font-bold">{order.id}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/users/1`}
                      className="hover:text-accent transition-colors font-medium"
                    >
                      {order.customer}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-muted">{order.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        order.status === "Delivered" &&
                          "bg-green-100 text-green-700",
                        order.status === "Pending" &&
                          "bg-yellow-100 text-yellow-700",
                        order.status === "Shipped" &&
                          "bg-blue-100 text-blue-700",
                        order.status === "Cancelled" &&
                          "bg-red-100 text-red-700",
                      )}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-accent">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/orders/${order.id.replace("#", "")}`}
                      className="p-2 hover:bg-secondary rounded-lg transition-colors group inline-block"
                    >
                      <Eye className="w-4 h-4 text-muted group-hover:text-primary" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
