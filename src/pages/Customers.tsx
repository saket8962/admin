import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  Filter,
  UserPlus,
  Mail,
  Phone,
  MoreVertical,
  Star,
  Loader2,
  Users as UsersIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../lib/api";
import { API_ENDPOINTS } from "../config/endpoints";
import { toast } from "sonner";
import { format } from "date-fns";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLogin: string;
  // Membership info if available
  membershipTier?: string;
}

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  recentlyActiveUsers: number;
  newThisMonth: number;
}

export default function Customers() {
  const [customers, setCustomers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [usersRes, statsRes] = await Promise.all([
        api.get(API_ENDPOINTS.USERS.BASE),
        api.get(API_ENDPOINTS.USERS.STATS),
      ]);

      // Filter for customers only if needed, or show all
      setCustomers(
        usersRes.data.data.filter((u: any) => u.role === "customer"),
      );
      setStats(statsRes.data.data);
    } catch (error) {
      console.error("Failed to fetch customer data:", error);
      toast.error("Failed to load customer directory");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
            <h3 className="text-3xl font-bold">
              {isLoading ? "..." : stats?.totalUsers || 0}
            </h3>
          </div>
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
            <UsersIcon className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-border flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
              New This Month
            </p>
            <h3 className="text-3xl font-bold">
              {isLoading ? "..." : `+${stats?.newThisMonth || 0}`}
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-border flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
              Active Customers
            </p>
            <h3 className="text-3xl font-bold font-serif">
              {isLoading ? "..." : stats?.recentlyActiveUsers || 0}
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden min-h-[400px]">
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search customers by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-20 gap-4 text-muted">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Gathering directory...
              </span>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 gap-4 text-muted">
              <UsersIcon className="w-12 h-12 opacity-10" />
              <span className="text-sm font-bold uppercase tracking-widest">
                No customers found
              </span>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-secondary/50 text-[10px] uppercase font-bold tracking-widest text-muted">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Registered</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer._id}
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
                              to={`/customers/${customer._id}`}
                              className="font-bold hover:text-accent transition-colors"
                            >
                              {customer.name}
                            </Link>
                          </div>
                          <p className="text-xs text-muted">
                            {customer.isActive ? "Active Account" : "Inactive"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted">
                        <Mail className="w-3 h-3" />
                        {customer.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-secondary text-[10px] font-bold uppercase tracking-wider rounded-md">
                        {customer.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-muted">
                      {format(new Date(customer.createdAt), "MMM d, yyyy")}
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
          )}
        </div>
      </div>
    </div>
  );
}
