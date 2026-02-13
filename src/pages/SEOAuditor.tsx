import {
  SearchCode,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Filter,
  BarChart3,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

const seoIssues = [
  {
    id: 1,
    name: "Lumina Pendant Light",
    sku: "LUM-PL-001",
    issue: "Missing Meta Description",
    impact: "High",
  },
  {
    id: 2,
    name: "Industrial Wall Sconce",
    sku: "IND-WS-002",
    issue: "Meta Title too short (12 chars)",
    impact: "Medium",
  },
  {
    id: 3,
    name: "Modern Table Lamp",
    sku: "MOD-TL-003",
    issue: "Missing Alt Text for 2 images",
    impact: "Low",
  },
];

export default function SEOAuditor() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif">SEO Auditor</h1>
          <p className="text-muted text-sm">
            Optimize your store's search visibility.
          </p>
        </div>
        <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
          <SearchCode className="w-4 h-4" /> Full Store Scan
        </button>
      </div>

      {/* SEO Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-8 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row items-center gap-10">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                className="stroke-secondary fill-none stroke-[10]"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                className="stroke-accent fill-none stroke-[10] transition-all duration-1000"
                strokeDasharray="440"
                strokeDashoffset="110"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-bold text-primary">75%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
                Health Score
              </span>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold">Store Visibility Health</h3>
              <p className="text-sm text-muted leading-relaxed">
                Your store is performing well, but 12 products are missing
                critical meta descriptions which affects your Google ranking.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-primary">
                  154 Optimized
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-xs font-bold text-primary">
                  28 Warning
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-xs font-bold text-primary">
                  98.2 Speed Score
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-xs font-bold text-primary">
                  12 Critical
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary text-white p-8 rounded-2xl shadow-xl shadow-primary/20 space-y-6 flex flex-col justify-between">
          <div className="space-y-2">
            <Globe className="w-8 h-8 opacity-40" />
            <h4 className="text-lg font-bold">Google Index Status</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Last crawl: Today, 4:20 AM. 182 pages indexed successfully.
            </p>
          </div>
          <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">
            View Search Console
          </button>
        </div>
      </div>

      {/* SEO Issues Table */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-accent" />
            <h2 className="font-bold">Optimization Tasks</h2>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-secondary text-primary rounded-lg text-[10px] font-bold uppercase tracking-widest">
              <Filter className="w-3 h-3" /> Filter Impact
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-secondary/40 text-[10px] uppercase tracking-widest text-muted font-bold">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Issue Found</th>
                <th className="px-6 py-4">SEO Impact</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {seoIssues.map((item) => (
                <tr
                  key={item.id}
                  className="group hover:bg-secondary/10 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-primary">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-bold text-muted uppercase tracking-widest">
                        {item.sku}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-primary font-medium text-sm">
                      <AlertCircle
                        className={`w-4 h-4 ${item.impact === "High" ? "text-red-500" : item.impact === "Medium" ? "text-amber-500" : "text-blue-500"}`}
                      />
                      {item.issue}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
                        item.impact === "High"
                          ? "bg-red-50 border-red-100 text-red-600"
                          : item.impact === "Medium"
                            ? "bg-amber-50 border-amber-100 text-amber-600"
                            : "bg-blue-50 border-blue-100 text-blue-600"
                      }`}
                    >
                      {item.impact}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to="/products/create"
                      className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors"
                    >
                      Update Metadata <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-secondary/20 border-t border-border flex items-center justify-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
          <CheckCircle2 className="w-3 h-3 mr-2 text-emerald-500" /> All core
          pages optimized for mobile
        </div>
      </div>
    </div>
  );
}
