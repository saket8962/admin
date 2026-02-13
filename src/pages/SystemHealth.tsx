import {
  Database,
  Cpu,
  Wifi,
  HardDrive,
  ShieldCheck,
  RotateCcw,
  Clock,
  ChevronRight,
  LineChart,
  Terminal,
  CheckCircle2,
} from "lucide-react";

const logs = [
  {
    id: 1,
    type: "Info",
    message: "Database backup completed successfully.",
    time: "10 mins ago",
  },
  {
    id: 2,
    type: "Warning",
    message: "High latency detected in /api/products endpoint.",
    time: "45 mins ago",
  },
  {
    id: 3,
    type: "Info",
    message: "Admin 'Siddharth' updated category 'Pendants'.",
    time: "2 hours ago",
  },
  {
    id: 4,
    type: "Error",
    message: "Failed login attempt detected from 192.168.1.105.",
    time: "4 hours ago",
  },
];

export default function SystemHealth() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif">System Health</h1>
          <p className="text-muted text-sm">
            Monitor server stability and operational logs.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
          <Wifi className="w-3 h-3" /> All Systems Nominal
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-border flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-secondary text-primary rounded-lg">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-muted">CPU</span>
          </div>
          <div>
            <p className="text-2xl font-bold">12%</p>
            <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
              <div className="w-[12%] h-full bg-accent" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-border flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-secondary text-primary rounded-lg">
              <HardDrive className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-muted">RAM</span>
          </div>
          <div>
            <p className="text-2xl font-bold">1.2 GB / 4 GB</p>
            <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
              <div className="w-[30%] h-full bg-primary" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-border flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-secondary text-primary rounded-lg">
              <Database className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-muted">DB SIZE</span>
          </div>
          <div>
            <p className="text-2xl font-bold">254 MB</p>
            <p className="text-[10px] text-muted font-medium mt-1">
              Growth: +2% this week
            </p>
          </div>
        </div>
        <div className="bg-primary text-white p-6 rounded-2xl shadow-xl shadow-primary/20 flex flex-col justify-between">
          <div className="flex items-center justify-between opacity-80">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Security
            </span>
          </div>
          <h3 className="text-xl font-bold mt-2">Active Firewall</h3>
          <button className="mt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all">
            Deep Scan <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Server Performance Card */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-border shadow-sm flex flex-col">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LineChart className="w-5 h-5 text-accent" />
              <h2 className="font-bold">API Traffic</h2>
            </div>
            <select className="bg-secondary/50 border-none outline-none text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="flex-1 p-6 flex items-end justify-between gap-2 h-48">
            {[40, 60, 45, 90, 65, 30, 85, 45, 75, 55, 95, 20].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-secondary hover:bg-accent transition-all rounded-t-sm"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="p-4 bg-secondary/10 border-t border-border flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
                Success Requests
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary-foreground/20" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
                Errors
              </span>
            </div>
          </div>
        </div>

        {/* Backup & Maintenance */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-8 space-y-8 flex flex-col justify-center">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">Automated Backups</h3>
                <p className="text-xs text-muted">Securing your data daily.</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-xl border border-border/50">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted" />
                <span className="text-xs font-bold text-primary">
                  Next: Tomorrow, 2 AM
                </span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
          <div className="space-y-4 pt-4 border-t border-border">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
              Maintenance Tools
            </h4>
            <button className="w-full flex items-center justify-between p-3 bg-secondary/10 hover:bg-secondary/20 rounded-lg text-xs font-bold transition-all group">
              Clear Image Cache{" "}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-secondary/10 hover:bg-secondary/20 rounded-lg text-xs font-bold transition-all group">
              Re-Index Search{" "}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Audit Logs */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-accent" />
            <h2 className="font-bold">Operational Audit Logs</h2>
          </div>
          <button className="text-[10px] font-bold uppercase tracking-widest text-accent hover:underline">
            View All Logs
          </button>
        </div>
        <div className="divide-y divide-border">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-4 px-6 flex items-center justify-between hover:bg-secondary/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${
                    log.type === "Info"
                      ? "bg-blue-50 text-blue-600"
                      : log.type === "Warning"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-red-50 text-red-600"
                  }`}
                >
                  {log.type}
                </span>
                <p className="text-sm font-medium text-primary">
                  {log.message}
                </p>
              </div>
              <span className="text-[10px] text-muted font-bold uppercase whitespace-nowrap">
                {log.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
