import {
  ArrowLeft,
  ShoppingBag,
  RotateCcw,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

// Mock data for a single user's order history
const userProfile = {
  name: "Sneha Kapur",
  email: "sneha@example.com",
  phone: "+91 98765 43213",
  address: "123 Elegance St, Mumbai, Maharashtra",
  memberSince: "Oct 2024",
  totalSpent: "₹ 45,200",
  totalOrders: 24,
  returnCount: 2,
  returnRate: "8.3%",
  isVip: true,
};

const userOrders = [
  {
    id: "#ORD-2025-045",
    date: "Jan 12, 2026",
    status: "Delivered",
    amount: "₹ 4,250",
    items: 2,
    products: "Lumina Pendant Light, Edison Bulb (2x)",
  },
  {
    id: "#ORD-2024-982",
    date: "Dec 20, 2025",
    status: "Returned",
    amount: "₹ 1,890",
    items: 1,
    products: "Industrial Wall Sconce",
    returnReason: "Damaged on arrival",
  },
  {
    id: "#ORD-2024-855",
    date: "Nov 15, 2025",
    status: "Delivered",
    amount: "₹ 12,400",
    items: 4,
    products: "Modern Table Lamp, Floor Lamp (x2), Bulb",
  },
  {
    id: "#ORD-2024-712",
    date: "Oct 28, 2025",
    status: "Delivered",
    amount: "₹ 8,750",
    items: 3,
    products: "Vintage Edison Bulb Pack, Brass Socket",
  },
];

export default function CustomerDetail() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Link
          to="/customers"
          className="p-2 hover:bg-secondary rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-serif">Customer Details</h1>
          <p className="text-muted text-sm">
            Detailed view of user activity, orders, and purchased products.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-3xl font-bold text-primary">
                {userProfile.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold">{userProfile.name}</h2>
                {userProfile.isVip && (
                  <p className="text-xs font-bold text-accent uppercase tracking-widest mt-1">
                    VIP Member
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 space-y-4 pt-8 border-t border-border">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted" />
                <span>{userProfile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted" />
                <span>{userProfile.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-muted flex-shrink-0" />
                <span className="text-xs leading-relaxed">
                  {userProfile.address}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-muted" />
                <span>Member since {userProfile.memberSince}</span>
              </div>
            </div>
          </div>

          <div className="bg-primary text-white p-6 rounded-2xl shadow-xl shadow-primary/20 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
              LTV Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] opacity-60 uppercase">Total Spent</p>
                <p className="text-lg font-bold">{userProfile.totalSpent}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] opacity-60 uppercase">Total Orders</p>
                <p className="text-lg font-bold">{userProfile.totalOrders}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] opacity-60 uppercase">Returns</p>
                <p className="text-lg font-bold">{userProfile.returnCount}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] opacity-60 uppercase">Return Rate</p>
                <p className="text-lg font-bold">{userProfile.returnRate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order History Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-border flex items-center gap-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-muted">
                  First Order
                </p>
                <p className="text-sm font-bold">Oct 28, 2024</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-border flex items-center gap-4">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-muted">
                  AOV
                </p>
                <p className="text-sm font-bold">₹ 1,883</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-border flex items-center gap-4">
              <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-muted">
                  Return Value
                </p>
                <p className="text-sm font-bold">₹ 1,890</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="font-bold">Order History & Purchased Products</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-secondary/50 text-[10px] uppercase font-bold tracking-widest text-muted">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Purchased Products</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {userOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="text-sm hover:bg-secondary/20 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <Link
                            to={`/orders/${order.id.replace("#", "")}`}
                            className="font-bold hover:text-accent transition-colors"
                          >
                            {order.id}
                          </Link>
                          <span className="text-[10px] text-muted">
                            {order.date}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs font-medium text-primary line-clamp-2 italic">
                          {order.products}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            order.status === "Delivered" &&
                              "bg-green-100 text-green-700",
                            order.status === "Returned" &&
                              "bg-red-100 text-red-700",
                          )}
                        >
                          {order.status}
                        </span>
                        {order.status === "Returned" && (
                          <p className="text-[10px] text-red-500 mt-1 italic">
                            {order.returnReason}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4 font-bold text-accent">
                        {order.amount}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/orders/${order.id.replace("#", "")}`}
                          className="p-2 hover:bg-secondary rounded-lg transition-colors group inline-block"
                        >
                          <ChevronRight className="w-4 h-4 text-muted group-hover:text-primary" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
