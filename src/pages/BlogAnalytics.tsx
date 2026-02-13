import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Eye,
  TrendingUp,
  ShoppingBag,
  MousePointer2,
  Clock,
  ArrowUpRight,
  ChevronRight,
  Sparkles,
  BarChart3,
  Users,
  MessageSquare,
  Globe,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { cn } from "../lib/utils";

export default function BlogAnalytics() {
  const { id } = useParams();

  // Mock data for analytics
  const storyData = {
    title: "How to Choose the Perfect Pendant Light for Your Kitchen",
    author: "Admin",
    publishedDate: "Feb 01, 2026",
    reach: "1,240",
    engagement: "18.4%",
    conversions: "₹ 12,450",
    reads: "842",
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-border">
        <div className="flex items-center gap-4">
          <Link
            to="/content/blogs"
            className="p-2 hover:bg-secondary rounded-full transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold font-serif italic text-primary">
              Performance Audit
            </h1>
            <p className="text-muted text-sm mt-1">
              Analyzing the reach of:{" "}
              <span className="text-primary font-bold italic">
                "{storyData.title}"
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none bg-secondary text-primary px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-border transition-all">
            Export Report
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <Calendar className="w-4 h-4" /> Last 30 Days
          </button>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-border flex flex-col gap-4 shadow-sm relative overflow-hidden group">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-3xl font-black italic font-serif text-primary">
              {storyData.reach}
            </h3>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">
              Audience Reach
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded w-fit">
            <TrendingUp className="w-3 h-3" /> +12% from avg
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/30 rounded-full -mr-16 -mt-16 pointer-events-none" />
        </div>

        <div className="bg-white p-8 rounded-3xl border border-border flex flex-col gap-4 shadow-sm group">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
            <MousePointer2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-3xl font-black italic font-serif text-primary">
              {storyData.engagement}
            </h3>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">
              Click Engagement
            </p>
          </div>
          <span className="text-[9px] font-bold text-muted uppercase tracking-widest">
            Linked Products CTR
          </span>
        </div>

        <div className="bg-primary text-white p-8 rounded-3xl shadow-xl shadow-primary/30 flex flex-col gap-4 relative overflow-hidden group">
          <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center relative z-10 transition-transform group-hover:scale-110">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl font-black italic font-serif">
              {storyData.conversions}
            </h3>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
              Attributed ROI
            </p>
          </div>
          <div className="relative z-10 flex items-center gap-1.5 text-[9px] font-bold text-white bg-white/10 px-2 py-1 rounded w-fit uppercase tracking-widest">
            <Sparkles className="w-3 h-3" /> Commerce Active
          </div>
          <ShoppingBag className="absolute -right-8 -bottom-8 w-40 h-40 text-black/5 rotate-12 transition-transform group-hover:scale-110" />
        </div>

        <div className="bg-white p-8 rounded-3xl border border-border flex flex-col gap-4 shadow-sm group">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-3xl font-black italic font-serif text-primary">
              04:15
            </h3>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">
              Avg. Reading Time
            </p>
          </div>
          <span className="text-[9px] font-bold text-muted uppercase tracking-widest">
            High retention Story
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Analytics Chart Placeholder */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-border shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2 text-primary uppercase tracking-widest text-xs">
              <BarChart3 className="w-4 h-4 text-accent" />
              Reach Over Time
            </h3>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded bg-primary" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-muted">
                Daily Views
              </span>
            </div>
          </div>

          <div className="h-64 flex items-end gap-3 px-4">
            {[40, 60, 45, 90, 65, 80, 70, 55, 100, 85, 75, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-secondary hover:bg-primary transition-all duration-500 rounded-t-lg group relative"
                style={{ height: `${h}%` }}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-bold whitespace-nowrap">
                  {h * 12} Views
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between px-2 text-[9px] font-black uppercase tracking-widest text-muted/40">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
        </div>

        {/* Engagement Hub */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-border shadow-sm space-y-6">
            <h3 className="font-bold flex items-center gap-2 text-primary uppercase tracking-widest text-xs">
              <Users className="w-4 h-4 text-accent" />
              Audience Origin
            </h3>
            <div className="space-y-4">
              {[
                { source: "Direct Traffic", val: "45%", color: "bg-blue-500" },
                { source: "Social Media", val: "30%", color: "bg-pink-500" },
                {
                  source: "Email Campaigns",
                  val: "15%",
                  color: "bg-emerald-500",
                },
                {
                  source: "Search Engines",
                  val: "10%",
                  color: "bg-orange-500",
                },
              ].map((s, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold text-primary uppercase tracking-widest">
                    <span>{s.source}</span>
                    <span>{s.val}</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full", s.color)}
                      style={{ width: s.val }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-accent text-white p-8 rounded-3xl shadow-xl shadow-accent/20 space-y-4 relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">
                Story Recommendation
              </h4>
              <h3 className="text-xl font-bold font-serif italic mt-1">
                Boost Reach with Social ADs
              </h3>
              <p className="text-[10px] opacity-80 leading-relaxed mt-2">
                "This story is performing 3x better than average. Promoting it
                on Instagram could yield ₹ 40k+ in attributed sales."
              </p>
            </div>
            <button className="relative z-10 w-full bg-white/10 hover:bg-white/20 border border-white/20 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
              Launch Campaign
            </button>
            <Sparkles className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 rotate-12 transition-transform group-hover:scale-110" />
          </div>
        </div>
      </div>
    </div>
  );
}
