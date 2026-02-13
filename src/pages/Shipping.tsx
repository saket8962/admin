import { useState } from "react";
import {
  Truck,
  Plus,
  MapPin,
  Globe,
  Settings,
  MoreVertical,
  CheckCircle2,
  Package,
  Clock,
  ArrowRight,
  X,
  PlusCircle,
  ShieldCheck,
} from "lucide-react";
import { cn } from "../lib/utils";

interface ShippingZone {
  id: number;
  name: string;
  regions: string[];
  rate: string;
  condition: string;
  status: "Active" | "Paused";
}

const initialZones: ShippingZone[] = [
  {
    id: 1,
    name: "Domestic (Standard)",
    regions: ["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu"],
    rate: "Fixed ₹ 99",
    condition: "None",
    status: "Active",
  },
  {
    id: 2,
    name: "Tier 2 Cities",
    regions: ["Jaipur", "Lucknow", "Chandigarh"],
    rate: "Fixed ₹ 149",
    condition: "Orders < ₹ 1,000",
    status: "Active",
  },
  {
    id: 3,
    name: "Northeast Regions",
    regions: ["Assam", "Sikkim", "Meghalaya"],
    rate: "Fixed ₹ 299",
    condition: "Weight < 5kg",
    status: "Paused",
  },
];

export default function Shipping() {
  const [zones, setZones] = useState<ShippingZone[]>(initialZones);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newZone, setNewZone] = useState<Partial<ShippingZone>>({
    name: "",
    rate: "",
    regions: [],
    condition: "None",
  });
  const [regionInput, setRegionInput] = useState("");

  const handleAddRegion = () => {
    if (regionInput.trim() && !newZone.regions?.includes(regionInput.trim())) {
      setNewZone({
        ...newZone,
        regions: [...(newZone.regions || []), regionInput.trim()],
      });
      setRegionInput("");
    }
  };

  const handleCreateZone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newZone.name || !newZone.rate) return;

    const zoneToAdd: ShippingZone = {
      id: Date.now(),
      name: newZone.name,
      rate: newZone.rate,
      regions: newZone.regions || [],
      condition: newZone.condition || "None",
      status: "Active",
    };

    setZones([zoneToAdd, ...zones]);
    setIsSidebarOpen(false);
    setNewZone({ name: "", rate: "", regions: [], condition: "None" });
  };

  const toggleZoneStatus = (id: number) => {
    setZones(
      zones.map((z) =>
        z.id === id
          ? { ...z, status: z.status === "Active" ? "Paused" : "Active" }
          : z,
      ),
    );
  };

  return (
    <div className="relative min-h-screen">
      <div
        className={cn(
          "space-y-8 animate-in fade-in duration-500 pb-12 transition-all",
          isSidebarOpen ? "pr-[400px] blur-[2px] pointer-events-none" : "",
        )}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold font-serif">
              Logistics & Shipping
            </h1>
            <p className="text-muted text-sm">
              Manage where you deliver and your shipping pricing strategy.
            </p>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" /> Add Shipping Zone
          </button>
        </div>

        {/* Logistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-border flex flex-col gap-4 shadow-sm relative overflow-hidden group">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary relative z-10 transition-transform group-hover:scale-110">
              <Package className="w-6 h-6" />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold">Unfulfilled Orders</h3>
              <p className="text-3xl font-bold">42</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full w-fit relative z-10">
              <Clock className="w-3.5 h-3.5" /> 12 High Priority
            </div>
            <Package className="absolute -right-6 -bottom-6 w-32 h-32 text-secondary/50 rotate-12 transition-transform group-hover:scale-110" />
          </div>
          <div className="bg-white p-8 rounded-2xl border border-border flex flex-col gap-4 shadow-sm">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Delivery Coverage</h3>
              <p className="text-3xl font-bold">
                {zones.reduce((acc, z) => acc + z.regions.length, 0)}{" "}
                States/Cities
              </p>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
              Across {zones.filter((z) => z.status === "Active").length} active
              zones
            </p>
          </div>
          <div className="bg-black text-white p-8 rounded-2xl shadow-xl shadow-black/20 space-y-6 relative overflow-hidden group">
            <div className="relative z-10 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                Logisitcs Efficiency
              </p>
              <h3 className="text-3xl font-bold italic font-serif">
                NIVAA Express
              </h3>
            </div>
            <div className="relative z-10 space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <span>Avg Delivery Time</span>
                <span>4.2 Days</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-accent w-[75%] transition-all duration-1000" />
              </div>
            </div>
            <Truck className="absolute -right-10 -bottom-10 w-48 h-48 text-white/5 -rotate-12 transition-transform group-hover:scale-110" />
          </div>
        </div>

        {/* Shipping Zones Table */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden border-b-4 border-b-primary/10">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-accent" />
              <h2 className="font-bold">Active Availability Zones</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-muted uppercase tracking-widest">
                Pricing Rules
              </span>
              <Settings className="w-4 h-4 text-muted/50 cursor-pointer hover:rotate-90 transition-all duration-500" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-secondary/40 text-[10px] uppercase tracking-widest text-muted font-bold">
                <tr>
                  <th className="px-6 py-4">Zone Name</th>
                  <th className="px-6 py-4">Available Locations</th>
                  <th className="px-6 py-4">Price Rule</th>
                  <th className="px-6 py-4 text-right">Operational Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {zones.map((zone) => (
                  <tr
                    key={zone.id}
                    className="group hover:bg-secondary/10 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-primary">
                          {zone.name}
                        </span>
                        <span className="text-[10px] text-muted font-medium italic">
                          {zone.condition}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5 max-w-sm">
                        {zone.regions.map((r) => (
                          <span
                            key={r}
                            className="px-2 py-0.5 bg-secondary/50 rounded text-[9px] font-bold text-primary group-hover:bg-accent/10 transition-colors"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-accent">
                        {zone.rate}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => toggleZoneStatus(zone.id)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border",
                          zone.status === "Active"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : "bg-amber-50 text-amber-600 border-amber-100",
                        )}
                      >
                        {zone.status}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Zone Creation Side Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-out border-l border-border",
          isSidebarOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <h2 className="text-xl font-bold font-serif italic text-primary">
              New Delivery Zone
            </h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-secondary rounded-full transition-all"
            >
              <X className="w-5 h-5 text-muted" />
            </button>
          </div>

          <form
            onSubmit={handleCreateZone}
            className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar"
          >
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
                Zone Name
              </label>
              <input
                type="text"
                placeholder="e.g. South India Express"
                required
                value={newZone.name}
                onChange={(e) =>
                  setNewZone({ ...newZone, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/40 outline-none transition-all text-sm font-medium"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
                Serviceable Regions
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter City/State"
                  value={regionInput}
                  onChange={(e) => setRegionInput(e.target.value)}
                  className="flex-1 px-4 py-2 bg-secondary/30 border border-transparent rounded-lg text-xs outline-none focus:bg-white focus:border-accent/20 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={handleAddRegion}
                  className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 p-4 bg-secondary/10 rounded-2xl border border-dashed border-border min-h-[80px]">
                {newZone.regions?.length === 0 && (
                  <p className="text-[10px] text-muted italic m-auto">
                    No regions added yet.
                  </p>
                )}
                {newZone.regions?.map((r) => (
                  <span
                    key={r}
                    className="px-2.5 py-1 bg-white border border-border rounded-lg text-[10px] font-bold text-primary flex items-center gap-1.5 animate-in zoom-in-50"
                  >
                    {r}
                    <X
                      className="w-3 h-3 text-muted hover:text-red-500 cursor-pointer"
                      onClick={() =>
                        setNewZone({
                          ...newZone,
                          regions: newZone.regions?.filter((x) => x !== r),
                        })
                      }
                    />
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
                  Pricing Rule
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹ 99"
                  required
                  value={newZone.rate}
                  onChange={(e) =>
                    setNewZone({ ...newZone, rate: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/40 outline-none transition-all text-sm font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
                  Conditions
                </label>
                <input
                  type="text"
                  placeholder="e.g. Free > ₹5k"
                  value={newZone.condition}
                  onChange={(e) =>
                    setNewZone({ ...newZone, condition: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/40 outline-none transition-all text-[11px] font-medium"
                />
              </div>
            </div>

            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" /> Logistics Assurance
              </h4>
              <p className="text-[10px] text-emerald-600/80 leading-relaxed italic">
                "Zones defined here will be visible at customer checkout. Ensure
                carrier API support for the added regions."
              </p>
            </div>

            <div className="pt-8 mt-auto border-t border-border">
              <button
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:bg-primary/90 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3"
              >
                <CheckCircle2 className="w-4 h-4" /> Save Logistics Zone
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
