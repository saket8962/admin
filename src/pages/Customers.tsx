import {
  ArrowLeft,
  Search,
  Filter,
  UserPlus,
  Mail,
  Phone,
  MoreVertical,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

const customers = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    orders: 12,
    spent: "₹ 15,400",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya@example.com",
    phone: "+91 98765 43211",
    orders: 5,
    spent: "₹ 8,900",
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit@example.com",
    phone: "+91 98765 43212",
    orders: 8,
    spent: "₹ 12,450",
  },
  {
    id: 4,
    name: "Sneha Kapur",
    email: "sneha@example.com",
    phone: "+91 98765 43213",
    orders: 24,
    spent: "₹ 45,200",
    isVip: true,
  },
  {
    id: 5,
    name: "Vikram Mehta",
    email: "vikram@example.com",
    phone: "+91 98765 43214",
    orders: 3,
    spent: "₹ 4,890",
  },
];

export default function Customers() {
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
            <h1 className="text-2xl font-bold font-serif">
              Customer Directory
            </h1>
            <p className="text-muted text-sm">
              Manage your relationship with customers.
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <UserPlus className="w-4 h-4" />
          Add Customer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-accent text-white p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
              Total Customers
            </p>
            <h3 className="text-3xl font-bold">1,205</h3>
          </div>
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
            <Star className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-border flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
              New This Month
            </p>
            <h3 className="text-3xl font-bold">+84</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-border flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
              Avg. Life Time Value
            </p>
            <h3 className="text-3xl font-bold">₹ 4,250</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search customers by name or email..."
              className="w-full pl-10 pr-4 py-2 bg-secondary/30 border border-transparent rounded-lg text-sm focus:bg-white focus:border-accent/30 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-secondary/50 text-[10px] uppercase font-bold tracking-widest text-muted">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Orders</th>
                <th className="px-6 py-4">Total Spent</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="text-sm hover:bg-secondary/20 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/customers/${customer.id}`}
                            className="font-bold hover:text-accent transition-colors"
                          >
                            {customer.name}
                          </Link>
                          {customer.isVip && (
                            <Star className="w-3 h-3 fill-accent text-accent" />
                          )}
                        </div>
                        <p className="text-xs text-muted">Member since 2024</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-muted">
                      <Mail className="w-3 h-3" />
                      {customer.email}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted">
                      <Phone className="w-3 h-3" />
                      {customer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{customer.orders}</td>
                  <td className="px-6 py-4 font-bold text-accent">
                    {customer.spent}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-muted" />
                    </button>
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
