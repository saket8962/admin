import {
  ArrowLeft,
  Package,
  CheckCircle2,
  MapPin,
  User,
  CreditCard,
  Clock,
  Printer,
  Download,
  Mail,
  Phone,
  Truck,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { cn } from "../lib/utils";
import api from "../lib/api";
import { toast } from "sonner";
import CouponsSkeleton from "../components/skeletons/CouponsSkeleton";

interface TimelineStep {
  status: string;
  date: string;
  completed: boolean;
}

interface OrderItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  image?: string;
}

interface OrderDetailData {
  _id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  couponCode?: string;
  discountAmount?: number;
  createdAt: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  shippingAddress: {
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  items: OrderItem[];
  summary: {
    subtotal: number;
    shipping: number;
    tax?: number;
    discount: number;
    total: number;
  };
  timeline: TimelineStep[];
}

export default function SpecificOrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();

  // Fetch single order details
  const {
    data: order,
    isLoading,
    refetch,
  } = useQuery<OrderDetailData>({
    queryKey: ["adminOrderDetail", orderId],
    queryFn: async () => {
      const response = await api.get(`/admin/orders/${orderId}`);
      return response.data.data;
    },
    enabled: !!orderId,
  });

  // Mutate/update order status
  const updateStatus = async (newStatus: string) => {
    try {
      await api.patch(`/admin/orders/${orderId}/status`, { status: newStatus });
      toast.success(`Order updated successfully to '${newStatus}'`);
      refetch();
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to update order status";
      toast.error(msg);
    }
  };

  if (isLoading) {
    return <CouponsSkeleton />;
  }

  if (!order) {
    return (
      <div className="p-8 text-center text-muted">
        <p>Order not found or has been deleted.</p>
        <Link to="/orders" className="text-accent underline mt-4 inline-block">
          Back to Orders List
        </Link>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    Created: "bg-amber-100 text-amber-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Confirmed: "bg-blue-100 text-blue-700",
    Packed: "bg-indigo-100 text-indigo-700",
    Shipped: "bg-cyan-100 text-cyan-700",
    Delivered: "bg-emerald-100 text-emerald-700",
    Cancelled: "bg-rose-100 text-rose-700",
  };

  const currentStatus = order.status;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/orders"
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold font-serif font-mono">
                {order.orderNumber}
              </h1>
              <span
                className={cn(
                  "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                  statusColors[currentStatus] || "bg-secondary text-primary"
                )}
              >
                {currentStatus}
              </span>
            </div>
            <p className="text-muted text-sm mt-1">
              {new Date(order.createdAt).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Context-aware COD flow transitions */}
          {currentStatus === "Created" && (
            <>
              <button
                onClick={() => updateStatus("Confirmed")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-md shadow-emerald-600/20"
              >
                Confirm Order
              </button>
              <button
                onClick={() => updateStatus("Cancelled")}
                className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-md shadow-rose-600/20"
              >
                Cancel Order
              </button>
            </>
          )}
          {currentStatus === "Confirmed" && (
            <button
              onClick={() => updateStatus("Shipped")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-md shadow-blue-600/20"
            >
              Ship Order
            </button>
          )}
          {currentStatus === "Shipped" && (
            <button
              onClick={() => updateStatus("Delivered")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-md shadow-emerald-600/20"
            >
              Mark Delivered
            </button>
          )}

          <button className="p-2 border border-border rounded-lg hover:bg-secondary transition-all text-muted hover:text-primary">
            <Printer className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <Download className="w-4 h-4" />
            Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Items and Summary */}
        <div className="lg:col-span-2 space-y-8">
          {/* Items Table */}
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="font-bold flex items-center gap-2">
                <Package className="w-5 h-5 text-accent" />
                Items Detail
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-secondary/50 text-[10px] uppercase font-bold tracking-widest text-muted">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Quantity</th>
                    <th className="px-6 py-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {order.items.map((item) => (
                    <tr key={item._id} className="text-sm">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-secondary rounded-lg overflow-hidden flex-shrink-0 border border-border/50">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-secondary" />
                            )}
                          </div>
                          <p className="font-bold">{item.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted">₹ {item.price}</td>
                      <td className="px-6 py-4 font-medium">x{item.quantity}</td>
                      <td className="px-6 py-4 text-right font-bold">
                        ₹ {(item.price * item.quantity).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-secondary/20 flex flex-col items-end space-y-3">
              <div className="w-full max-w-xs space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-medium">
                    ₹ {order.summary.subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Shipping</span>
                  <span className="font-medium">
                    ₹ {order.summary.shipping}
                  </span>
                </div>
                {order.discountAmount && order.discountAmount > 0 ? (
                  <div className="flex justify-between text-sm text-green-600">
                    <span className="font-medium">
                      Discount {order.couponCode ? `(Coupon: ${order.couponCode})` : ""}
                    </span>
                    <span>-₹ {order.discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                ) : null}
                <div className="pt-2 border-t border-border flex justify-between">
                  <span className="font-bold">Total Amount</span>
                  <span className="font-bold text-accent text-lg font-mono">
                    ₹ {order.summary.total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
            <h3 className="font-bold mb-8 flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              Order Timeline
            </h3>
            <div className="relative space-y-8">
              {order.timeline.map((step, idx) => (
                <div key={idx} className="flex gap-4 relative">
                  {idx !== order.timeline.length - 1 && (
                    <div className="absolute left-2.5 top-6 w-0.5 h-10 bg-secondary" />
                  )}
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center relative z-10",
                      step.completed
                        ? "bg-accent text-white"
                        : "bg-secondary text-muted"
                    )}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <div>
                    <p
                      className={cn(
                        "text-sm font-bold",
                        step.completed ? "text-primary" : "text-muted"
                      )}
                    >
                      {step.status}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      {new Date(step.date).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Customer & Shipping */}
        <div className="space-y-8">
          {/* Customer Card */}
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
            <h3 className="font-bold flex items-center gap-2">
              <User className="w-5 h-5 text-accent" />
              Customer Details
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary text-primary rounded-full flex items-center justify-center font-bold font-sans">
                {order.userId?.name?.charAt(0) || "U"}
              </div>
              <div>
                <p className="font-bold">{order.userId?.name || "Unknown Customer"}</p>
                <Link
                  to={`/customers/${order.userId?._id}`}
                  className="text-xs text-accent hover:underline font-bold uppercase tracking-widest mt-0.5"
                >
                  View Profile
                </Link>
              </div>
            </div>
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted" />
                <span>{order.userId?.email || "No email"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted" />
                <span>{order.userId?.phone || "No phone contact"}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
            <h3 className="font-bold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" />
              Shipping Address
            </h3>
            <div className="text-sm space-y-1">
              <p className="font-bold">{order.userId?.name || "Unknown Customer"}</p>
              <p className="text-muted leading-relaxed">
                {order.shippingAddress?.street},<br />
                {order.shippingAddress?.area},<br />
                {order.shippingAddress?.city}, {order.shippingAddress?.state}
                <br />
                {order.shippingAddress?.pincode}
                <br />
                {order.shippingAddress?.country || "India"}
              </p>
            </div>
          </div>

          {/* Payment Card */}
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
            <h3 className="font-bold flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-accent" />
              Payment Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted">Method</span>
                <span className="font-bold uppercase">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted">Status</span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                    order.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  )}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Logistics & Fulfillment */}
          <div className="bg-primary text-white p-6 rounded-2xl border border-primary shadow-xl shadow-primary/20 space-y-6 relative overflow-hidden group">
            <div className="relative z-10 flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Logistics & Fulfillment
              </h3>
              <span className="text-[9px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded">
                API Linked
              </span>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="p-4 bg-white/10 rounded-xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                    Courier Partner
                  </span>
                  <span className="text-xs font-bold">Delhivery</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                    AWB Number
                  </span>
                  <span className="text-xs font-mono font-bold tracking-tighter">
                    987456321012
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-white text-primary py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/90 transition-all flex items-center justify-center gap-2">
                  <Printer className="w-3.5 h-3.5" /> Print Label
                </button>
                <button className="flex-1 bg-accent text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-accent/90 transition-all flex items-center justify-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5" /> Track Live
                </button>
              </div>
            </div>

            <Truck className="absolute -right-8 -bottom-8 w-32 h-32 text-white/5 -rotate-12 transition-transform group-hover:scale-110" />
          </div>

          {/* Safe Custody Note */}
          <div className="p-4 bg-secondary/20 rounded-2xl border border-dashed border-border flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-[10px] text-muted leading-relaxed italic">
              All shipment details are synced with <strong>Shiprocket</strong>.
              Changes made here will reflect in your partner dashboard
              instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
