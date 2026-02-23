import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Layers,
  Users,
  Settings,
  ChevronRight,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Star,
  SearchCode,
  Ticket,
  Truck,
  LineChart,
  Activity,
  ShoppingBag,
  FileText,
  MessageSquare,
} from "lucide-react";
import { cn } from "../lib/utils";
import WelcomePopup from "../components/ui/WelcomePopup";

const navGroups = [
  {
    title: "Core Shop",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/" },
      { label: "Products", icon: Package, path: "/products" },
      { label: "Categories", icon: Layers, path: "/categories" },
      { label: "Orders", icon: ShoppingBag, path: "/orders" },
      { label: "Customers", icon: Users, path: "/customers" },
    ],
  },
  {
    title: "Growth & Marketing",
    items: [
      { label: "Coupons", icon: Ticket, path: "/marketing/coupons" },
      { label: "Reviews", icon: Star, path: "/marketing/reviews" },
      { label: "SEO Auditor", icon: SearchCode, path: "/marketing/seo" },
      { label: "Blogs", icon: FileText, path: "/content/blogs" },
    ],
  },
  {
    title: "Operational Hub",
    items: [
      { label: "Shipping", icon: Truck, path: "/operations/shipping" },
      {
        label: "Inquiries",
        icon: MessageSquare,
        path: "/operations/inquiries",
      },
      { label: "Analytics", icon: LineChart, path: "/analytics" },
      { label: "System Health", icon: Activity, path: "/operations/health" },
    ],
  },
  {
    title: "Admin Settings",
    items: [
      { label: "Settings", icon: Settings, path: "/settings" },
      { label: "Docs", icon: FileText, path: "/docs" },
    ],
  },
];

export default function AdminLayout({
  children,
  onLogout,
}: {
  children: React.ReactNode;
  onLogout: () => void;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-white border-r border-border transition-all duration-300 ease-in-out lg:static lg:translate-x-0",
          isSidebarOpen
            ? "w-64 translate-x-0"
            : "w-0 -translate-x-full lg:w-20",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-border">
            <span
              className={cn(
                "text-xl font-bold tracking-tighter uppercase font-serif text-accent flex-shrink-0 transition-opacity",
                !isSidebarOpen && "lg:opacity-0",
              )}
            >
              NIVAA
            </span>
            <span
              className={cn(
                "text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground ml-2 transition-opacity",
                !isSidebarOpen && "lg:hidden",
              )}
            >
              Admin
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-4 space-y-8 overflow-y-auto overflow-x-hidden">
            {navGroups.map((group) => (
              <div key={group.title} className="space-y-2">
                {isSidebarOpen && (
                  <h4 className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 mb-3">
                    {group.title}
                  </h4>
                )}
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-all group",
                        location.pathname === item.path
                          ? "bg-primary text-white shadow-lg shadow-primary/10"
                          : "text-muted hover:bg-secondary hover:text-foreground",
                      )}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span
                        className={cn(
                          "text-sm font-medium transition-opacity duration-200",
                          !isSidebarOpen && "lg:opacity-0 lg:w-0",
                        )}
                      >
                        {item.label}
                      </span>
                      {location.pathname === item.path && isSidebarOpen && (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="p-4 border-t border-border">
            <button
              onClick={onLogout}
              className="flex items-center gap-3 px-3 py-2 w-full text-muted hover:bg-red-50 hover:text-red-600 rounded-md transition-all group"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span
                className={cn(
                  "text-sm font-medium transition-opacity",
                  !isSidebarOpen && "lg:opacity-0",
                )}
              >
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-40 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-secondary rounded-md transition-colors"
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
            <div className="hidden md:flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full border border-border/50">
              <Search className="w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm w-48 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 relative hover:bg-secondary rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white" />
            </button>
            <Link
              to="/profile"
              className="group relative cursor-pointer"
              title="View Profile"
            >
              <div className="h-8 w-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xs ring-2 ring-accent/20 group-hover:scale-110 group-hover:ring-accent/40 transition-all duration-300">
                AD
              </div>
              <div className="absolute inset-0 rounded-full bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
      <WelcomePopup />
    </div>
  );
}
