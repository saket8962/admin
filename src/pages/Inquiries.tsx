import { useState } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  Eye,
  Mail,
  Trash2,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  MoreVertical,
  ArrowUpRight,
  X,
} from "lucide-react";
import { cn } from "../lib/utils";

interface Inquiry {
  id: number;
  customerName: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: "New" | "In-Progress" | "Resolved";
  priority: "High" | "Medium" | "Low";
}

const initialInquiries: Inquiry[] = [
  {
    id: 1,
    customerName: "Rahul Bansal",
    email: "rahul.b@example.com",
    subject: "Bulk Order Inquiry",
    message:
      "I am looking to buy 50 units of the Modern Gold Chandelier for a hotel project. Do you offer bulk discounts?",
    date: "Feb 06, 2026, 12:45 PM",
    status: "New",
    priority: "High",
  },
  {
    id: 2,
    customerName: "Sneha Reddy",
    email: "sneha.r@gmail.com",
    subject: "Shipping Delay",
    message:
      "My order #ORD-2026-045 hasn't been shipped yet. It's been 3 days since I placed the order.",
    date: "Feb 05, 2026, 03:20 PM",
    status: "In-Progress",
    priority: "Medium",
  },
  {
    id: 3,
    customerName: "Amit Kumar",
    email: "amit.k@hotmail.com",
    subject: "Product Question",
    message: "Does the Vintage Wall Sconce come with an LED bulb included?",
    date: "Feb 04, 2026, 10:15 AM",
    status: "Resolved",
    priority: "Low",
  },
];

export default function Inquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const resolveInquiry = (id: number) => {
    setInquiries(
      inquiries.map((inv) =>
        inv.id === id ? { ...inv, status: "Resolved" } : inv,
      ),
    );
    if (selectedInquiry?.id === id) {
      setSelectedInquiry((prev) =>
        prev ? { ...prev, status: "Resolved" } : null,
      );
    }
  };

  return (
    <div className="relative min-h-screen">
      <div
        className={cn(
          "space-y-8 animate-in fade-in duration-500 pb-12 transition-all",
          selectedInquiry ? "pr-[450px] blur-[2px] pointer-events-none" : "",
        )}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold font-serif">Inquiry Inbox</h1>
            <p className="text-muted text-sm">
              Manage customer queries and support requests from your website.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" /> 84% Response Rate
            </div>
          </div>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {inquiries.filter((i) => i.status === "New").length}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
                New Inquiries
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">~2.4h</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
                Avg. Response Time
              </p>
            </div>
          </div>
          <div className="bg-primary text-white p-6 rounded-2xl shadow-xl shadow-primary/20 flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {inquiries.filter((i) => i.priority === "High").length}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                Urgent Tickets
              </p>
            </div>
          </div>
        </div>

        {/* Inbox List */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between shadow-sm">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 bg-secondary/30 border border-transparent rounded-lg text-sm focus:bg-white focus:ring-4 focus:ring-accent/10 transition-all outline-none"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-primary rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-border transition-all">
              <Filter className="w-4 h-4" /> Priority
            </button>
          </div>

          <div className="divide-y divide-border">
            {inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                onClick={() => setSelectedInquiry(inquiry)}
                className={cn(
                  "p-6 flex items-start gap-6 cursor-pointer transition-all hover:bg-secondary/10 group relative",
                  inquiry.status === "New" ? "bg-accent/[0.02]" : "",
                )}
              >
                {inquiry.status === "New" && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />
                )}
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary font-bold group-hover:bg-accent group-hover:text-white transition-all">
                  {inquiry.customerName.charAt(0)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold flex items-center gap-2">
                      {inquiry.customerName}
                      <span
                        className={cn(
                          "text-[10px] px-2 py-0.5 rounded-full border uppercase tracking-widest",
                          inquiry.priority === "High"
                            ? "bg-red-50 text-red-600 border-red-100"
                            : inquiry.priority === "Medium"
                              ? "bg-orange-50 text-orange-600 border-orange-100"
                              : "bg-blue-50 text-blue-600 border-blue-100",
                        )}
                      >
                        {inquiry.priority}
                      </span>
                    </h4>
                    <span className="text-[10px] text-muted font-medium italic">
                      {inquiry.date}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-accent">
                    {inquiry.subject}
                  </p>
                  <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                    {inquiry.message}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted/30 group-hover:text-accent transition-all self-center" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[450px] bg-white shadow-2xl z-50 transform transition-all duration-500 ease-out border-l border-border flex flex-col",
          selectedInquiry ? "translate-x-0" : "translate-x-full",
        )}
      >
        {selectedInquiry && (
          <div className="h-full flex flex-col">
            <div className="p-8 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold font-serif italic text-primary">
                Inquiry Detail
              </h2>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 hover:bg-secondary rounded-full transition-all"
              >
                <X className="w-5 h-5 text-muted" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="flex items-center gap-4 p-4 bg-secondary/20 rounded-2xl border border-border">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary font-black text-xl">
                  {selectedInquiry.customerName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold">{selectedInquiry.customerName}</h3>
                  <p className="text-xs text-muted flex items-center gap-1">
                    <Mail className="w-3 h-3" /> {selectedInquiry.email}
                  </p>
                </div>
                <Link
                  to={`/customers`}
                  className="ml-auto p-2 bg-white rounded-lg border border-border text-muted hover:text-accent transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
                    Original Message
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded italic">
                    Recieved {selectedInquiry.date.split(",")[0]}
                  </span>
                </div>
                <div className="p-6 bg-secondary/10 rounded-2xl border border-dashed border-border leading-relaxed text-sm text-primary">
                  <p className="font-bold mb-3 italic">
                    " {selectedInquiry.subject} "
                  </p>
                  {selectedInquiry.message}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
                  Admin Response
                </label>
                <textarea
                  placeholder="Type your response here..."
                  className="w-full h-40 px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/40 outline-none transition-all text-sm resize-none"
                />
                <div className="flex gap-3">
                  <button className="flex-1 bg-primary text-white py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" /> Send Email Reply
                  </button>
                  <button
                    onClick={() => resolveInquiry(selectedInquiry.id)}
                    disabled={selectedInquiry.status === "Resolved"}
                    className={cn(
                      "px-6 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all",
                      selectedInquiry.status === "Resolved"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100 opacity-60"
                        : "bg-white text-muted hover:text-emerald-600 hover:border-emerald-200",
                    )}
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8 bg-secondary/20 border-t border-border mt-auto">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg text-accent">
                  <User className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-medium text-muted">
                  This inquiry is also visible to the Super-Admin. Use formal
                  ethics for replies.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Minimal Link component for type safety in this standalone component if needed
function Link({ to, children, className }: any) {
  return (
    <a href={to} className={className}>
      {children}
    </a>
  );
}
