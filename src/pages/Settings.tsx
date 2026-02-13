import { useState } from "react";
import {
  Settings,
  CreditCard,
  Building2,
  Lock,
  Mail,
  Phone,
  MapPin,
  Save,
  Globe,
  Truck,
  Bell,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Wallet,
} from "lucide-react";
import { cn } from "../lib/utils";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("finance");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const tabs = [
    { id: "account", label: "Admin Account", icon: Settings },
    { id: "finance", label: "Payments & Finance", icon: CreditCard },
    { id: "logistics", label: "Logistics & APIs", icon: Truck },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif">Store Settings</h1>
          <p className="text-muted text-sm">
            Configure your finance rules and admin preferences.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          {isSaved ? (
            "Settings Saved!"
          ) : (
            <>
              <Save className="w-4 h-4" /> Save Changes
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all",
                activeTab === tab.id
                  ? "bg-primary text-white shadow-lg shadow-primary/10"
                  : "text-muted hover:bg-secondary/50",
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-8">
          {activeTab === "finance" && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              {/* Payment Receipt Info */}
              <div className="bg-white p-8 rounded-2xl border border-border space-y-6 shadow-sm">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <div className="p-2 bg-accent/10 rounded-lg text-accent">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold">Bank Account Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      defaultValue="HDFC Bank"
                      className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/40 outline-none transition-all text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
                      Account Holder
                    </label>
                    <input
                      type="text"
                      defaultValue="NIVAA Home Decor Pvt Ltd"
                      className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/40 outline-none transition-all text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
                      Account Number
                    </label>
                    <input
                      type="password"
                      defaultValue="************4582"
                      className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/40 outline-none transition-all text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      defaultValue="HDFC0001245"
                      className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/40 outline-none transition-all text-sm font-medium font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Gateways */}
              <div className="bg-white p-8 rounded-2xl border border-border space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold">Active Payment Gateways</h3>
                  </div>
                  <button className="text-[10px] font-bold uppercase tracking-widest text-accent hover:underline flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> API Keys
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {["Stripe", "Razorpay", "PayPal"].map((gate) => (
                    <div
                      key={gate}
                      className="p-4 border border-border rounded-2xl flex flex-col items-center gap-4 group hover:border-accent transition-all"
                    >
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center font-bold text-primary group-hover:bg-accent group-hover:text-white transition-all italic tracking-tighter">
                        {gate.charAt(0)}
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold capitalize">{gate}</p>
                        <p className="text-[10px] text-muted">Integrated</p>
                      </div>
                      <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "logistics" && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              {/* Carrier Integration */}
              <div className="bg-white p-8 rounded-2xl border border-border space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold">Aggregator Credentials</h3>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded italic uppercase tracking-widest">
                    Encrypted Storage
                  </span>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
                        Select Partner
                      </label>
                      <select className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl text-sm font-bold outline-none ring-0 focus:bg-white focus:border-accent/40 transition-all">
                        <option>Shiprocket</option>
                        <option>Delhivery Direct</option>
                        <option>NimbusPost</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
                        API Mode
                      </label>
                      <div className="flex p-1 bg-secondary/30 rounded-xl">
                        <button className="flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all bg-white shadow-sm border border-border text-primary">
                          Live
                        </button>
                        <button className="flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all text-muted hover:text-primary">
                          Sandbox
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
                        API Login Email
                      </label>
                      <input
                        type="email"
                        placeholder="api@yourstore.com"
                        className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/40 outline-none transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
                        Secret Auth Token
                      </label>
                      <input
                        type="password"
                        value="********************************"
                        className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/40 outline-none transition-all text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Rules Automation */}
              <div className="bg-primary text-white p-8 rounded-2xl shadow-xl shadow-primary/20 space-y-4 relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold italic font-serif">
                    Automation Assistant
                  </h3>
                  <p className="text-xs opacity-70 mt-1 max-w-xs">
                    Enable auto-manifesting to book couriers instantly when an
                    order is marked "Ready to Pack".
                  </p>
                </div>
                <div className="relative z-10 flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Auto-Book Courier
                  </span>
                  <div className="w-10 h-5 bg-white/20 rounded-full relative cursor-pointer active:scale-95 transition-all">
                    <div className="absolute right-1 top-1 bottom-1 w-3 bg-white rounded-full" />
                  </div>
                </div>
                <Truck className="absolute -right-6 -bottom-6 w-32 h-32 text-white/10 rotate-12 transition-transform group-hover:scale-110" />
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              <div className="bg-white p-8 rounded-2xl border border-border space-y-8 shadow-sm">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-secondary rounded-3xl flex items-center justify-center text-primary text-3xl font-serif font-bold italic relative group cursor-pointer">
                    N
                    <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] uppercase font-bold tracking-widest">
                      Update
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-serif">
                      NIVAA Official Admin
                    </h3>
                    <p className="text-muted text-sm">
                      Level: Super Administrator
                    </p>
                    <div className="mt-2 flex gap-4">
                      <span className="flex items-center gap-1.5 text-xs text-muted">
                        <Mail className="w-3.5 h-3.5" /> admin@nivaa.com
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-muted">
                        <ShieldCheck className="w-3.5 h-3.5" /> 2FA Enabled
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                      <Globe className="w-4 h-4 text-accent" /> Store
                      Localization
                    </h4>
                    <div className="space-y-2">
                      <label className="text-[10px] text-muted font-bold tracking-wide">
                        Primary Currency
                      </label>
                      <select className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl text-sm font-bold outline-none">
                        <option>INR - ₹ Indian Rupee</option>
                        <option>USD - $ US Dollar</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-muted font-bold tracking-wide">
                        Timezone
                      </label>
                      <select className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl text-sm font-bold outline-none">
                        <option>(GMT+5:30) Mumbai, India</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-accent" /> Contact
                      Points
                    </h4>
                    <div className="space-y-2">
                      <label className="text-[10px] text-muted font-bold tracking-wide">
                        Support Email
                      </label>
                      <input
                        type="email"
                        defaultValue="support@nivaa.com"
                        className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl text-sm font-medium outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-muted font-bold tracking-wide">
                        WhatsApp Support
                      </label>
                      <input
                        type="text"
                        defaultValue="+91 98765 43210"
                        className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl text-sm font-medium outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
