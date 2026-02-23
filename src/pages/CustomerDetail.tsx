import { useState, useEffect } from "react";
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
  Loader2,
  User as UserIcon,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import api from "../lib/api";
import { API_ENDPOINTS } from "../config/endpoints";
import { toast } from "sonner";
import { format } from "date-fns";

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  membershipTier?: string;
}

export default function CustomerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`${API_ENDPOINTS.USERS.BASE}/${id}`);
        setProfile(response.data.data);
      } catch (error) {
        console.error("Failed to fetch customer profile:", error);
        toast.error("Failed to load customer details");
        navigate("/customers");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCustomer();
    }
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-muted">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
        <span className="text-sm font-bold uppercase tracking-widest">
          Loading Profile...
        </span>
      </div>
    );
  }

  if (!profile) return null;

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
            Detailed view of user activity and profile information.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-3xl font-bold text-primary">
                {profile.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold">{profile.name}</h2>
                <p className="text-xs font-bold text-accent uppercase tracking-widest mt-1">
                  {profile.membershipTier || "Standard Member"}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4 pt-8 border-t border-border">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-muted" />
                <span>
                  Member since{" "}
                  {format(new Date(profile.createdAt), "MMMM yyyy")}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    profile.isActive
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-600",
                  )}
                >
                  {profile.isActive ? "Active Account" : "Inactive Account"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-primary text-white p-6 rounded-2xl shadow-xl shadow-primary/20 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
              Account Metadata
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] opacity-60 uppercase">Role</p>
                <p className="text-lg font-bold capitalize">{profile.role}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] opacity-60 uppercase">User ID</p>
                <p className="text-xs font-mono opacity-80">{profile._id}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order History Table - Placeholder/Link to real orders if needed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-border p-8 flex flex-col items-center justify-center text-center gap-4 text-muted">
            <div className="p-4 bg-secondary/30 rounded-full">
              <ShoppingBag className="w-8 h-8 opacity-20" />
            </div>
            <div>
              <h3 className="font-bold text-primary">
                Order History coming soon
              </h3>
              <p className="text-sm">
                We are currently integrating the order history for individual
                customers.
              </p>
            </div>
            <Link
              to="/orders"
              className="text-xs font-bold uppercase tracking-widest text-accent hover:underline"
            >
              View All Orders <ChevronRight className="w-3 h-3 inline" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
