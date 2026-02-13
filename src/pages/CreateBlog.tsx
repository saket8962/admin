import { useState, useRef } from "react";
import {
  ArrowLeft,
  X,
  CheckCircle2,
  Image as ImageIcon,
  ShoppingBag,
  Sparkles,
  Ticket,
  ChevronDown,
  Globe,
  Eye,
  Settings,
  Layout,
  Type,
  Maximize2,
  Trash2,
  AlertCircle,
  ChevronRight,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

interface LinkedProduct {
  id: number;
  name: string;
  price: string;
  image: string;
}

const initialProducts: LinkedProduct[] = [
  {
    id: 1,
    name: "Gold Pendant Light",
    price: "₹ 1,850",
    image:
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Modern Wall Sconce",
    price: "₹ 1,200",
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Vintage Chandelier",
    price: "₹ 8,900",
    image:
      "https://images.unsplash.com/photo-1542728928-1413ee094939?q=80&w=200&auto=format&fit=crop",
  },
];

export default function CreateBlog() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeView, setActiveView] = useState<"edit" | "preview">("edit");
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Guides",
    status: "Draft",
    content: "",
    linkedProducts: [] as LinkedProduct[],
    activeOffer: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleProduct = (product: LinkedProduct) => {
    const exists = formData.linkedProducts.find((p) => p.id === product.id);
    if (exists) {
      setFormData({
        ...formData,
        linkedProducts: formData.linkedProducts.filter(
          (p) => p.id !== product.id,
        ),
      });
    } else {
      setFormData({
        ...formData,
        linkedProducts: [...formData.linkedProducts, product],
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/content/blogs");
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] selection:bg-accent selection:text-white">
      {/* Sticky Premium Navigation */}
      <header className="sticky top-0 z-[100] bg-white/70 backdrop-blur-xl border-b border-black/5 px-8 h-24 flex items-center justify-between transition-all">
        <div className="flex items-center gap-6">
          <Link
            to="/content/blogs"
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-muted hover:text-primary transition-all"
          >
            <div className="w-8 h-8 rounded-full border border-black/5 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            Back to Hub
          </Link>
          <div className="h-8 w-px bg-black/5" />
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Editorial Canvas
            </span>
            <h1 className="text-xl font-serif italic font-bold text-primary truncate max-w-[300px]">
              {formData.title || "Untitled Story"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex p-1.5 bg-secondary/30 rounded-2xl border border-black/5 shadow-inner">
            <button
              onClick={() => setActiveView("edit")}
              className={cn(
                "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                activeView === "edit"
                  ? "bg-white text-primary shadow-lg shadow-black/5"
                  : "text-muted hover:text-primary",
              )}
            >
              Compose
            </button>
            <button
              onClick={() => setActiveView("preview")}
              className={cn(
                "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                activeView === "preview"
                  ? "bg-white text-primary shadow-lg shadow-black/5"
                  : "text-muted hover:text-primary",
              )}
            >
              Preview
            </button>
          </div>

          <button
            onClick={handleSave}
            className="bg-black text-white px-8 h-12 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-black/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
          >
            <CheckCircle2 className="w-4 h-4" /> Save Narrative
          </button>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr,450px] gap-0 lg:gap-12 p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Editorial Content Area */}
        <div className="space-y-12">
          {activeView === "edit" ? (
            <div className="space-y-12">
              {/* Cover Experience */}
              <div
                className={cn(
                  "relative w-full aspect-[21/9] rounded-[48px] overflow-hidden group/cover transition-all duration-700",
                  !coverImage
                    ? "bg-secondary/40 border-2 border-dashed border-black/10 hover:border-accent/40 cursor-pointer"
                    : "shadow-3xl shadow-black/10",
                )}
                onClick={() => !coverImage && fileInputRef.current?.click()}
              >
                {coverImage ? (
                  <>
                    <img
                      src={coverImage}
                      alt="Story Cover"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover/cover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/cover:opacity-100 transition-all flex items-center justify-center gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="bg-white text-primary px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 transition-all"
                      >
                        Change Visual
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCoverImage(null);
                        }}
                        className="bg-red-500 text-white p-4 rounded-2xl hover:scale-105 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center gap-6">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl shadow-black/5 group-hover/cover:scale-110 group-hover/cover:text-accent transition-all">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-serif italic font-bold">
                        A Masterpiece needs a Cover
                      </h3>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted">
                        21:9 Aspect Ratio recommended
                      </p>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>

              {/* Title & Canvas area */}
              <div className="max-w-[900px] mx-auto space-y-12 px-4 py-8 bg-white/50 rounded-[48px] border border-black/[0.03] backdrop-blur-sm">
                <textarea
                  rows={1}
                  placeholder="The Narrative Headline..."
                  className="w-full text-7xl font-serif italic font-bold border-none outline-none placeholder:text-black/[0.05] focus:ring-0 p-0 resize-none leading-[1.1]"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    e.target.style.height = "inherit";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  onFocus={(e) => {
                    e.target.style.height = "inherit";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                />

                <div className="flex flex-wrap items-center gap-8 pb-12 border-b border-black/[0.03]">
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-muted">
                      Collection Genre
                    </label>
                    <div className="relative group">
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-full outline-none appearance-none cursor-pointer pr-10 shadow-xl shadow-black/10 hover:scale-105 transition-all"
                      >
                        <option value="Guides">Editorial Guides</option>
                        <option value="Trends">Design Trends</option>
                        <option value="Maintenance">Lumina Philosophy</option>
                        <option value="News">Maison Updates</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-50" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-muted">
                      Estimated Read
                    </label>
                    <span className="text-xs font-serif italic font-medium px-4 py-2.5 bg-accent/5 text-accent rounded-full border border-accent/10">
                      4 minutes duration
                    </span>
                  </div>

                  <div className="flex-1" />

                  <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-emerald-500 bg-emerald-500/5 px-5 py-2.5 rounded-full ring-1 ring-emerald-500/10">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-glow-emerald" />
                    Live Persistence Active
                  </div>
                </div>

                <textarea
                  placeholder="Share the inspiration behind the craftsmanship..."
                  className="w-full text-2xl font-serif leading-[1.8] border-none outline-none focus:ring-0 p-0 resize-none min-h-[600px] placeholder:text-black/[0.05] italic"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                />
              </div>
            </div>
          ) : (
            /* Premium Live Preview Experience */
            <div className="animate-in zoom-in-95 duration-700 bg-white rounded-[64px] shadow-4xl shadow-black/5 overflow-hidden border border-black/5 flex flex-col">
              {/* Preview Banner */}
              <div className="relative h-[600px] w-full overflow-hidden bg-secondary">
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt="Story Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-muted italic font-serif text-3xl opacity-20 capitalize">
                    Visual selection pending
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent shadow-inner" />
                <div className="absolute bottom-16 left-16 right-16 space-y-6 text-white text-shadow-lg">
                  <span className="bg-accent px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-accent/40 inline-flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" /> {formData.category}
                  </span>
                  <h2 className="text-7xl font-serif italic font-bold leading-[1.05] max-w-4xl">
                    {formData.title || "The Unwritten Narrative"}
                  </h2>
                  <div className="flex items-center gap-8 pt-4">
                    <div className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-white/20 border border-white/20 flex items-center justify-center text-[10px] font-black group-hover:bg-white group-hover:text-black transition-all">
                        A.A
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                          Curated by Admin
                        </span>
                        <span className="text-[9px] opacity-60 font-medium">
                          Head of Curation
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Story Content Area */}
              <div className="max-w-[800px] mx-auto py-24 px-8 space-y-24">
                <div className="prose prose-2xl prose-serif text-primary leading-[2] italic whitespace-pre-wrap font-serif first-letter:text-[120px] first-letter:font-bold first-letter:float-left first-letter:mr-4 first-letter:mt-4 first-letter:leading-none first-letter:text-accent">
                  {formData.content ||
                    "Placeholder for your beautiful narrative content. Start writing to see the editorial layout flow."}
                </div>

                {/* Shop the Story Integration */}
                {formData.linkedProducts.length > 0 && (
                  <div className="space-y-16 border-t border-black/[0.03] pt-24 mt-24">
                    <div className="text-center space-y-4">
                      <h3 className="text-5xl font-serif italic font-bold">
                        Shop the Look
                      </h3>
                      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent">
                        Curated from this narrative
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {formData.linkedProducts.map((p) => (
                        <div
                          key={p.id}
                          className="group/item cursor-pointer space-y-6"
                        >
                          <div className="aspect-[4/5] bg-secondary rounded-[40px] overflow-hidden border border-black/[0.03] shadow-lg shadow-black/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 relative">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                            <button className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white text-black px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] opacity-0 translate-y-4 group-hover/item:opacity-100 group-hover/item:translate-y-0 transition-all duration-500 shadow-2xl">
                              View Detail
                            </button>
                          </div>
                          <div className="text-center space-y-1">
                            <h4 className="text-xl font-serif italic font-bold">
                              {p.name}
                            </h4>
                            <p className="text-xs font-black uppercase tracking-widest text-muted">
                              {p.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exclusive Offer Card */}
                {formData.activeOffer && (
                  <div className="p-16 bg-black text-white rounded-[48px] relative overflow-hidden group/card shadow-3xl shadow-black/20 text-center">
                    <div className="relative z-10 space-y-8">
                      <div className="space-y-4">
                        <span className="inline-flex items-center gap-2 px-6 py-2 bg-accent text-white rounded-full text-[9px] font-black uppercase tracking-[0.3em]">
                          Exclusive Reward
                        </span>
                        <h4 className="text-5xl font-serif italic font-bold">
                          Maison Privilege
                        </h4>
                        <p className="text-sm opacity-60 font-serif italic max-w-md mx-auto">
                          Use this code at checkout for your complimentary
                          reader-only curation discount.
                        </p>
                      </div>
                      <div className="inline-flex flex-col items-center gap-4 bg-white/5 border border-white/10 px-16 py-8 rounded-[32px] hover:bg-white/10 hover:scale-105 transition-all duration-500 cursor-pointer shadow-inner">
                        <span className="text-4xl font-black font-serif italic tracking-[0.2em]">
                          {formData.activeOffer}
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">
                          Tap to Secure Code
                        </span>
                      </div>
                    </div>
                    <Sparkles className="absolute -right-20 -bottom-20 w-[400px] h-[400px] text-white/5 -rotate-12 transition-transform duration-1000 group-hover/card:scale-110" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Curation Sidebar (Control Hub) */}
        <aside className="space-y-8 sticky top-32 h-fit pb-12">
          {/* Strategy Box: Glassmorphism */}
          <div className="bg-white/40 backdrop-blur-3xl border border-white p-10 rounded-[48px] shadow-2xl shadow-black/5 space-y-10 group/hub hover:border-accent/30 transition-all">
            <div className="flex items-center justify-between border-b border-black/[0.03] pb-8">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">
                  Section I
                </span>
                <h3 className="font-bold text-primary text-xl font-serif italic">
                  Commerce Hub
                </h3>
              </div>
              <div className="p-3 bg-accent/5 text-accent rounded-2xl">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-10">
              {/* Product Curation */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">
                    Curate products
                  </label>
                  <span className="text-[9px] font-black bg-black text-white px-2 py-0.5 rounded-full">
                    {formData.linkedProducts.length}/3
                  </span>
                </div>
                <div className="space-y-4">
                  {initialProducts.map((p) => (
                    <div
                      key={p.id}
                      className={cn(
                        "p-5 rounded-[28px] border transition-all cursor-pointer flex items-center gap-6 group/item active:scale-95",
                        formData.linkedProducts.find((x) => x.id === p.id)
                          ? "bg-black border-black text-white shadow-2xl shadow-black/20 translate-x-3"
                          : "bg-white border-black/[0.05] hover:border-black/20 hover:shadow-lg",
                      )}
                      onClick={() => toggleProduct(p)}
                    >
                      <div className="w-16 h-16 bg-secondary/50 rounded-2xl overflow-hidden border border-black/5 shrink-0 group-hover/item:scale-110 transition-transform">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p
                          className={cn(
                            "text-xs font-bold uppercase tracking-tight",
                            formData.linkedProducts.find((x) => x.id === p.id)
                              ? "text-white"
                              : "text-primary",
                          )}
                        >
                          {p.name}
                        </p>
                        <p
                          className={cn(
                            "text-[10px] font-black italic",
                            formData.linkedProducts.find((x) => x.id === p.id)
                              ? "text-accent/80"
                              : "text-accent",
                          )}
                        >
                          {p.price}
                        </p>
                      </div>
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500",
                          formData.linkedProducts.find((x) => x.id === p.id)
                            ? "bg-accent border-accent text-white scale-125 shadow-lg shadow-accent/40"
                            : "border-black/5",
                        )}
                      >
                        {formData.linkedProducts.find((x) => x.id === p.id) && (
                          <CheckCircle2 className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-4 border-2 border-dashed border-black/5 text-[9px] font-black uppercase tracking-[0.3em] text-muted rounded-2xl hover:border-accent hover:text-accent transition-all flex items-center justify-center gap-2">
                  <Plus className="w-3 h-3" /> Browse Catalog
                </button>
              </div>

              {/* Reward Curation */}
              <div className="space-y-6 pt-10 border-t border-black/[0.03]">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">
                    Reward Injection
                  </label>
                  <Ticket className="w-4 h-4 text-accent/40" />
                </div>
                <div className="relative group/sel">
                  <select
                    value={formData.activeOffer}
                    onChange={(e) =>
                      setFormData({ ...formData, activeOffer: e.target.value })
                    }
                    className="w-full pl-6 pr-12 py-5 bg-white border border-black/5 rounded-[24px] text-[11px] font-black outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent/40 transition-all appearance-none uppercase tracking-[0.2em] cursor-pointer shadow-sm group-hover/sel:shadow-xl"
                  >
                    <option value="">No Strategy</option>
                    <option value="WELCOME2024">WELCOME2024 (20%)</option>
                    <option value="FESTIVE50">FESTIVE50 (50%)</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none opacity-40 group-hover:opacity-100 transition-all" />
                </div>
              </div>
            </div>
          </div>

          {/* Distribution Panel */}
          <div className="bg-black text-white p-10 rounded-[48px] shadow-3xl shadow-black/30 space-y-10 relative overflow-hidden group/dist transition-all hover:scale-[1.02]">
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-8">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                  Section II
                </span>
                <h3 className="font-bold text-xl font-serif italic">
                  Distribution
                </h3>
              </div>
              <div
                onClick={() => navigate("/operations/health")}
                className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 cursor-pointer transition-all"
              >
                <Globe className="w-5 h-5 opacity-40" />
              </div>
            </div>

            <div className="relative z-10 space-y-8">
              <div className="flex flex-col gap-4">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">
                  Visibility Target
                </label>
                <button
                  onClick={() =>
                    setFormData({
                      ...formData,
                      status:
                        formData.status === "Published" ? "Draft" : "Published",
                    })
                  }
                  className="w-full flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group/stat shadow-inner"
                >
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {formData.status === "Published"
                        ? "Maison Live"
                        : "Internal Curation"}
                    </span>
                    <span className="text-[8px] opacity-40 font-medium">
                      Auto-Sync via Cloud
                    </span>
                  </div>
                  <div
                    className={cn(
                      "w-12 h-6 rounded-full relative transition-all duration-500",
                      formData.status === "Published"
                        ? "bg-accent shadow-glow-accent"
                        : "bg-white/20",
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-500",
                        formData.status === "Published" ? "left-7" : "left-1",
                      )}
                    />
                  </div>
                </button>
              </div>

              <p className="text-[10px] text-white/40 leading-relaxed font-serif italic border-l-2 border-accent pl-5">
                "Publishing will notify 1,240 subscribers and feature these
                curation sets on the Main Maison facade."
              </p>
            </div>

            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-accent/20 blur-[100px] pointer-events-none" />
            <Maximize2 className="absolute -right-12 -bottom-12 w-48 h-48 text-white/5 -rotate-12 transition-transform group-hover/dist:scale-125 duration-1000" />
          </div>
        </aside>
      </main>

      {/* Floating Action Hint */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl border border-black/5 px-8 py-4 rounded-full shadow-2xl z-[200] flex items-center gap-6 animate-in slide-in-from-bottom-8 duration-700 delay-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-glow-emerald" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">
            Saved as Draft
          </span>
        </div>
        <div className="h-4 w-px bg-black/10" />
        <button className="text-[9px] font-black uppercase tracking-[0.3em] text-accent flex items-center gap-2 hover:scale-105 transition-all">
          Quick Preview <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
