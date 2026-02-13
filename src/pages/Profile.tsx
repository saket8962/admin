import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Shield,
  Key,
  Clock,
  Activity,
  Smartphone,
  Globe,
  Camera,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Settings as SettingsIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { cn } from "../lib/utils";

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "general" | "security" | "activity"
  >("general");

  const activityLogs = [
    {
      id: 1,
      action: "Updated product 'Lumina Sconce'",
      time: "2 hours ago",
      icon: Activity,
    },
    {
      id: 2,
      action: "Login from Chrome on Windows",
      time: "5 hours ago",
      icon: Globe,
    },
    {
      id: 3,
      action: "Changed category status: 'Pendants'",
      time: "Yesterday at 4:30 PM",
      icon: SettingsIcon,
    },
    {
      id: 4,
      action: "Generated monthly revenue report",
      time: "2 days ago",
      icon: Activity,
    },
  ];

  const sessions = [
    {
      id: 1,
      device: "Chrome / Windows 11",
      location: "Mumbai, India",
      status: "Active Now",
      current: true,
    },
    {
      id: 2,
      device: "Safari / iPhone 15",
      location: "Mumbai, India",
      status: "Last active: 3 days ago",
      current: false,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header Card */}
      <div className="relative overflow-hidden bg-white rounded-[40px] border border-border shadow-xl shadow-black/5 p-8 md:p-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-32 -mt-32" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Avatar Section */}
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-accent text-white flex items-center justify-center text-4xl md:text-5xl font-serif font-bold shadow-2xl shadow-accent/20 ring-4 ring-white">
              {user?.name?.substring(0, 2).toUpperCase() || "AD"}
            </div>
            <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg border border-border group-hover:scale-110 transition-transform">
              <Camera className="w-5 h-5 text-primary" />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h1 className="text-3xl md:text-4xl font-serif font-bold">
                  {user?.name || "Admin User"}
                </h1>
                <span className="bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-lg shadow-primary/10">
                  {user?.role || "Administrator"}
                </span>
              </div>
              <p className="text-muted text-sm font-medium">
                Managing NIVAA Lighting since Feb 2026
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-xl border border-border text-xs font-bold text-muted transition-colors hover:bg-white hover:text-primary cursor-default">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Verified Identity
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 text-[10px] font-black uppercase tracking-widest">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Active Session
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation / Tabs */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-3xl border border-border shadow-sm p-3 space-y-1">
            <button
              onClick={() => setActiveTab("general")}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group font-bold text-sm",
                activeTab === "general"
                  ? "bg-primary text-white shadow-xl shadow-primary/20"
                  : "text-muted hover:bg-secondary hover:text-primary",
              )}
            >
              <User className="w-5 h-5" />
              General Details
              <ChevronRight
                className={cn(
                  "ml-auto w-4 h-4 transition-transform",
                  activeTab === "general" ? "rotate-90" : "",
                )}
              />
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group font-bold text-sm",
                activeTab === "security"
                  ? "bg-primary text-white shadow-xl shadow-primary/20"
                  : "text-muted hover:bg-secondary hover:text-primary",
              )}
            >
              <Shield className="w-5 h-5" />
              Security & Identity
              <ChevronRight
                className={cn(
                  "ml-auto w-4 h-4 transition-transform",
                  activeTab === "security" ? "rotate-90" : "",
                )}
              />
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group font-bold text-sm",
                activeTab === "activity"
                  ? "bg-primary text-white shadow-xl shadow-primary/20"
                  : "text-muted hover:bg-secondary hover:text-primary",
              )}
            >
              <Activity className="w-5 h-5" />
              Activity Stream
              <ChevronRight
                className={cn(
                  "ml-auto w-4 h-4 transition-transform",
                  activeTab === "activity" ? "rotate-90" : "",
                )}
              />
            </button>
          </div>

          <div className="bg-red-50 rounded-3xl border border-red-100 p-3">
            <button className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-sm text-red-600 hover:bg-red-100/50">
              <LogOut className="w-5 h-5" />
              Terminate All Sessions
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === "general" && (
            <div className="bg-white rounded-[40px] border border-border shadow-sm p-8 md:p-10 space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold">
                  Personal Profile
                </h3>
                <p className="text-muted text-sm font-medium">
                  Update your professional details and contact information.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-1">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-accent transition-colors" />
                    <input
                      type="text"
                      defaultValue={user?.name || ""}
                      className="w-full bg-secondary/30 border border-transparent rounded-2xl pl-12 pr-4 py-4 outline-none focus:bg-white focus:border-accent/30 focus:ring-4 focus:ring-accent/5 transition-all text-sm font-bold"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-1">
                    Role Identifier
                  </label>
                  <div className="relative group grayscale opacity-60">
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                      type="text"
                      value={user?.role || "Administrator"}
                      disabled
                      className="w-full bg-secondary/30 border border-transparent rounded-2xl pl-12 pr-4 py-4 cursor-not-allowed text-sm font-bold"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-accent transition-colors" />
                    <input
                      type="email"
                      defaultValue={user?.email || ""}
                      className="w-full bg-secondary/30 border border-transparent rounded-2xl pl-12 pr-4 py-4 outline-none focus:bg-white focus:border-accent/30 focus:ring-4 focus:ring-accent/5 transition-all text-sm font-bold"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-1">
                    Phone Number
                  </label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-accent transition-colors" />
                    <input
                      type="tel"
                      placeholder="+91-0000000000"
                      className="w-full bg-secondary/30 border border-transparent rounded-2xl pl-12 pr-4 py-4 outline-none focus:bg-white focus:border-accent/30 focus:ring-4 focus:ring-accent/5 transition-all text-sm font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border flex justify-end">
                <button className="bg-primary text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-white rounded-[40px] border border-border shadow-sm p-8 md:p-10 space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold">
                  Security & Identity
                </h3>
                <p className="text-muted text-sm font-medium">
                  Manage your credentials and view authorized devices.
                </p>
              </div>

              {/* Password Section */}
              <div className="p-6 bg-secondary/20 rounded-[32px] border border-border/50 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-border">
                    <Key className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Account Password</h4>
                    <p className="text-[10px] font-medium text-muted uppercase tracking-widest mt-1">
                      Last changed: 45 days ago
                    </p>
                  </div>
                </div>
                <button className="bg-white text-primary border border-border px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-all">
                  Update Password
                </button>
              </div>

              {/* Active Sessions */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted flex items-center gap-2">
                  <Smartphone className="w-4 h-4" /> Active Device Sessions
                </h4>
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-6 bg-white border border-border rounded-[32px] hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-center gap-5">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                            session.current
                              ? "bg-accent/10 text-accent"
                              : "bg-secondary text-muted",
                          )}
                        >
                          <Smartphone className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-sm flex items-center gap-2">
                            {session.device}
                            {session.current && (
                              <span className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse" />
                            )}
                          </p>
                          <p className="text-[10px] text-muted font-bold uppercase tracking-tighter mt-0.5">
                            {session.location} • {session.status}
                          </p>
                        </div>
                      </div>
                      {!session.current && (
                        <button className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-xl">
                          Revoke Access
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "activity" && activeTab === "activity" && (
            <div className="bg-white rounded-[40px] border border-border shadow-sm p-8 md:p-10 space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold">
                  Activity Stream
                </h3>
                <p className="text-muted text-sm font-medium">
                  A ledger of your recent administrative interactions.
                </p>
              </div>

              <div className="space-y-8 relative before:absolute before:left-[23px] before:top-4 before:bottom-4 before:w-px before:bg-border">
                {activityLogs.map((log) => (
                  <div key={log.id} className="flex gap-6 relative group">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md border border-border z-10 group-hover:border-accent group-hover:scale-110 transition-all">
                      <log.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1 pt-1 space-y-1">
                      <p className="font-bold text-sm group-hover:text-accent transition-colors">
                        {log.action}
                      </p>
                      <p className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                        <Clock className="w-3 h-3" /> {log.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
