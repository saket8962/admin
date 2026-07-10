import React from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { cn } from "../../lib/utils";

export interface TableOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  date?: string;
  status: string;
  amount: string;
}

interface OrdersTableProps {
  orders: TableOrder[];
  showDate?: boolean;
  showActions?: boolean;
}

function getStatusStyles(status: string) {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-50 text-green-700 border-green-200";
    case "pending":
    case "draft":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "shipped":
    case "processing":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "cancelled":
    case "failed":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-secondary text-primary border-border";
  }
}

export default function OrdersTable({
  orders,
  showDate = false,
  showActions = false,
}: OrdersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-secondary/50 text-[10px] uppercase font-bold tracking-widest text-muted">
          <tr>
            <th className="px-6 py-4">Order ID</th>
            <th className="px-6 py-4">Customer</th>
            {showDate && <th className="px-6 py-4">Date</th>}
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Amount</th>
            {showActions && <th className="px-6 py-4 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-sm">
          {orders.length === 0 ? (
            <tr>
              <td
                colSpan={3 + (showDate ? 1 : 0) + (showActions ? 1 : 0)}
                className="px-6 py-12 text-center text-muted text-xs font-bold uppercase tracking-widest"
              >
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-secondary/20 transition-colors"
              >
                <td className="px-6 py-4 font-bold text-primary">
                  {order.orderNumber}
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/orders/user/${order.id}`}
                    className="hover:text-accent font-medium transition-colors"
                  >
                    {order.customerName}
                  </Link>
                </td>
                {showDate && (
                  <td className="px-6 py-4 text-muted font-medium">
                    {order.date}
                  </td>
                )}
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                      getStatusStyles(order.status)
                    )}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-accent">
                  {order.amount}
                </td>
                {showActions && (
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/orders/${order.id.replace("#", "")}`}
                      className="p-2 hover:bg-secondary rounded-lg transition-colors group inline-block"
                      title="View Order Details"
                    >
                      <Eye className="w-4 h-4 text-muted group-hover:text-primary" />
                    </Link>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
