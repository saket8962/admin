import { useState } from "react";
import {
  Star,
  Search,
  MoreVertical,
  CheckCircle2,
  XCircle,
  MessageSquare,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

const reviews = [
  {
    id: 1,
    product: "Lumina Pendant Light",
    customer: "Rahul Sharma",
    rating: 5,
    date: "2 hours ago",
    comment:
      "Absolutely stunning! The brass finish is even better in person. Perfectly matches my dining decor.",
    status: "Pending",
    sentiment: "Positive",
  },
  {
    id: 2,
    product: "Industrial Wall Sconce",
    customer: "Priya Singh",
    rating: 2,
    date: "5 hours ago",
    comment:
      "The installation was very difficult and the instructions were missing. Light quality is okay though.",
    status: "Published",
    sentiment: "Negative",
  },
  {
    id: 3,
    product: "Modern Table Lamp",
    customer: "Amit Patel",
    rating: 4,
    date: "Yesterday",
    comment: "Good lamp, but took 10 days to deliver. Packaging was excellent.",
    status: "Published",
    sentiment: "Neutral",
  },
];

export default function Reviews() {
  const [selectedTab, setSelectedTab] = useState("All");

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif">Review Moderation</h1>
          <p className="text-muted text-sm">
            Monitor and manage your customer feedback.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white bg-secondary flex items-center justify-center text-[10px] font-bold"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <p className="text-xs font-medium text-muted">4 Active Moderators</p>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-border flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <span className="text-xs font-bold text-green-600 flex items-center gap-1">
              +4.2% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-2xl font-bold">4.8</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Average Rating
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-border flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold">92%</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Positive Sentiment
          </p>
        </div>
        <button className="bg-white p-6 rounded-2xl border-2 border-dashed border-border hover:border-accent/40 hover:bg-accent/[0.02] transition-all flex flex-col items-center justify-center text-center group">
          <AlertTriangle className="w-5 h-5 text-amber-500 mb-1 group-hover:scale-110 transition-transform" />
          <p className="text-xs font-bold text-primary">12 Flagged</p>
          <p className="text-[10px] text-muted">Needs Attention</p>
        </button>
        <div className="bg-primary text-white p-6 rounded-2xl shadow-lg shadow-primary/20">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
            Total Reviews
          </p>
          <h3 className="text-3xl font-bold mt-1">2,450</h3>
          <div className="mt-4 flex gap-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="w-[70%] bg-white h-full" />
            <div className="w-[20%] bg-white/40 h-full" />
            <div className="w-[10%] bg-red-400 h-full" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        {/* Tabs & Search */}
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-1 bg-secondary/30 p-1 rounded-xl">
            {["All", "Pending", "Published", "Flagged"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedTab === tab
                    ? "bg-white text-primary shadow-sm"
                    : "text-muted hover:text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search by product or customer..."
              className="w-full pl-10 pr-4 py-2 bg-secondary/30 border border-transparent rounded-lg text-sm focus:bg-white focus:ring-4 focus:ring-accent/10 transition-all"
            />
          </div>
        </div>

        <div className="divide-y divide-border">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-6 hover:bg-secondary/10 transition-all group"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-primary">
                        {review.customer.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary">
                          {review.customer}
                        </p>
                        <p className="text-[11px] text-muted font-medium uppercase tracking-tight">
                          On {review.product}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${s <= review.rating ? "fill-accent text-accent" : "text-border"}`}
                        />
                      ))}
                      <span className="text-[10px] text-muted ml-2">
                        {review.date}
                      </span>
                    </div>
                  </div>

                  <div className="bg-secondary/20 p-4 rounded-xl relative">
                    {review.sentiment === "Negative" && (
                      <div className="absolute top-4 right-4 text-[9px] font-bold text-red-500 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded border border-red-100 flex items-center gap-1">
                        <ThumbsDown className="w-3 h-3" /> Sentiment Negative
                      </div>
                    )}
                    {review.sentiment === "Positive" && (
                      <div className="absolute top-4 right-4 text-[9px] font-bold text-green-500 uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded border border-green-100 flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" /> Sentiment Positive
                      </div>
                    )}
                    <p className="text-sm text-primary leading-relaxed pr-24">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          review.status === "Pending"
                            ? "bg-amber-50 border-amber-200 text-amber-600"
                            : "bg-emerald-50 border-emerald-200 text-emerald-600"
                        }`}
                      >
                        {review.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {review.status === "Pending" && (
                        <button className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/10">
                          <CheckCircle2 className="w-3 h-3" /> Approve
                        </button>
                      )}
                      <button className="flex items-center gap-2 px-4 py-1.5 bg-secondary text-primary rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-border transition-all">
                        <MessageSquare className="w-3 h-3" /> Reply
                      </button>
                      <button className="p-1.5 hover:bg-secondary rounded-lg transition-colors text-muted">
                        <XCircle className="w-4 h-4 hover:text-red-500 transition-colors" />
                      </button>
                      <button className="p-1.5 hover:bg-secondary rounded-lg transition-colors text-muted">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
