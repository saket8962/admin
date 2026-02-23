import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Image as ImageIcon,
  ShoppingBag,
  Sparkles,
  Ticket,
  ChevronDown,
  Globe,
  Maximize2,
  Trash2,
  ArrowRight,
  Loader2,
  Search,
  LayoutTemplate,
  Type,
  Eye,
  Settings2,
  Link as LinkIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import TiptapEditor from "../components/editor/TiptapEditor";
import { motion, AnimatePresence } from "framer-motion";

import api from "../lib/api";
import { API_ENDPOINTS } from "../config/endpoints";
import { toast } from "sonner";
import type { Product } from "../types/product";

interface LinkedProduct {
  id: string;
  name: string;
  price: string;
  image: string;
}

export default function CreateBlog() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeView, setActiveView] = useState<"edit" | "preview">("edit");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Product Selection State
  const [availableProducts, setAvailableProducts] = useState<LinkedProduct[]>(
    [],
  );
  const [filteredProducts, setFilteredProducts] = useState<LinkedProduct[]>([]);
  const [productSearch, setProductSearch] = useState("");
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Guides",
    status: "Draft",
    content: "",
    linkedProducts: [] as LinkedProduct[],
    activeOffer: "",
  });

  const [isSlugEdited, setIsSlugEdited] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (productSearch.trim() === "") {
      setFilteredProducts(availableProducts);
    } else {
      setFilteredProducts(
        availableProducts.filter((p) =>
          p.name.toLowerCase().includes(productSearch.toLowerCase()),
        ),
      );
    }
  }, [productSearch, availableProducts]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!isSlugEdited && formData.title) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, isSlugEdited]);

  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const response = await api.get(
        `${API_ENDPOINTS.PRODUCTS.BASE}?limit=100`,
      );
      const products: Product[] = response.data.data;

      const formattedProducts: LinkedProduct[] = products.map((p) => ({
        id: p._id!,
        name: p.name,
        price: `₹ ${p.price.toLocaleString()}`,
        image: p.images?.[0] || "",
      }));

      setAvailableProducts(formattedProducts);
      setFilteredProducts(formattedProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to load products catalog");
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadToastId = toast.loading("Uploading cover image...");

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("image", file);
      const response = await api.post(API_ENDPOINTS.UPLOAD, formDataUpload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCoverImage(response.data.url);
      toast.success("Cover image uploaded", { id: uploadToastId });
    } catch (error) {
      console.error("Cover upload failed:", error);
      toast.error("Failed to upload cover", { id: uploadToastId });
    } finally {
      setIsUploading(false);
      // Reset input so same file can be selected again if needed
      if (fileInputRef.current) fileInputRef.current.value = "";
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
      if (formData.linkedProducts.length >= 3) {
        toast.error("Maximum 3 products allowed per story");
        return;
      }
      setFormData({
        ...formData,
        linkedProducts: [...formData.linkedProducts, product],
      });
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      toast.error("Title and content are required");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        ...formData,
        coverImage,
        linkedProducts: formData.linkedProducts.map((p) => p.id),
      };

      await api.post(API_ENDPOINTS.BLOGS.BASE, payload);
      toast.success("Story created successfully");
      navigate("/content/blogs");
    } catch (error: any) {
      console.error("Failed to save story:", error);
      toast.error(error.response?.data?.message || "Failed to save story");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] selection:bg-accent/20 selection:text-accent font-sans">
      {/* Premium Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-[#FDFCFB]/80 backdrop-blur-xl border-b border-black/[0.03] h-20 px-8 flex items-center justify-between"
      >
        <div className="flex items-center gap-6">
          <Link to="/content/blogs" className="group flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white border border-black/[0.05] flex items-center justify-center group-hover:scale-105 group-hover:border-accent/20 transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
            </div>
          </Link>
          <div className="h-8 w-px bg-black/[0.05]" />
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Sparkles className="w-3 h-3 text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">
                Editor
              </span>
            </div>
            <h1 className="font-serif italic font-bold text-xl text-primary leading-none">
              New Narrative
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white border border-black/[0.05] p-1 rounded-xl flex items-center gap-1 shadow-sm">
            {[
              { id: "edit", label: "Write", icon: Type },
              { id: "preview", label: "Preview", icon: Eye },
            ].map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id as any)}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all",
                  activeView === view.id
                    ? "bg-black text-white shadow-md"
                    : "text-muted hover:bg-black/[0.03]",
                )}
              >
                <view.icon className="w-3.5 h-3.5" />
                {view.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="group relative overflow-hidden bg-accent text-white px-8 h-11 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isSaving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5" />
              )}
              {isSaving ? "Publishing..." : "Publish"}
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </motion.header>

      <main className="max-w-[1800px] mx-auto p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-12 items-start">
          <AnimatePresence mode="wait">
            {activeView === "edit" ? (
              <motion.div
                key="edit"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                {/* Cover Image Upload - PREMIUM REDESIGN */}
                <div className="relative group/cover">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "relative aspect-[21/9] rounded-[32px] overflow-hidden transition-all duration-500 cursor-pointer isolate",
                      !coverImage
                        ? "bg-secondary/30 border-2 border-dashed border-black/[0.08] hover:border-accent hover:bg-accent/[0.02]"
                        : "shadow-2xl shadow-black/10 hover:shadow-3xl hover:shadow-black/20",
                    )}
                  >
                    {coverImage ? (
                      <>
                        <img
                          src={coverImage}
                          alt="Cover"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/cover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover/cover:bg-black/20 transition-colors duration-300" />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-muted group-hover:text-accent transition-colors z-10">
                        <div className="w-20 h-20 rounded-full bg-white shadow-sm border border-black/[0.05] flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                          {isUploading ? (
                            <Loader2 className="w-8 h-8 animate-spin text-accent" />
                          ) : (
                            <ImageIcon className="w-8 h-8 text-black/40 group-hover:text-accent transition-colors" />
                          )}
                        </div>
                        <div className="text-center space-y-2">
                          <p className="font-serif italic text-2xl font-medium text-primary/80 group-hover:text-primary transition-colors">
                            {isUploading ? "Uploading..." : "Add Cover Image"}
                          </p>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                            1920 x 1080 Recommended
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Overlay Action Buttons */}
                    {coverImage && (
                      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300 z-20">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current?.click();
                          }}
                          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105 hover:shadow-lg transition-all"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          Change
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCoverImage(null);
                          }}
                          className="w-10 h-10 rounded-full bg-white/90 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white hover:scale-105 transition-all shadow-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>

                {/* Editor Container */}
                <div className="bg-white rounded-[32px] border border-black/[0.03] shadow-xl shadow-black/[0.02] overflow-hidden">
                  <div className="p-8 pb-0 space-y-8">
                    {/* Title Input */}
                    <input
                      type="text"
                      placeholder="The Title..."
                      className="w-full text-5xl md:text-6xl font-serif italic font-bold placeholder:text-black/10 bg-transparent border-none outline-none focus:ring-0 px-0"
                      value={formData.title}
                      onChange={(e) => {
                        setFormData({ ...formData, title: e.target.value });
                      }}
                    />

                    {/* Metadata Bar */}
                    <div className="flex flex-wrap items-center gap-6 p-4 bg-secondary/30 rounded-2xl border border-black/[0.03]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-black/[0.05]">
                          <LayoutTemplate className="w-3.5 h-3.5 text-muted" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black uppercase tracking-wider text-muted">
                            Category
                          </span>
                          <select
                            value={formData.category}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                category: e.target.value,
                              })
                            }
                            className="bg-transparent text-xs font-bold text-primary outline-none cursor-pointer -ml-1 py-0.5"
                          >
                            <option value="Guides">Guides</option>
                            <option value="Trends">Trends</option>
                            <option value="News">News</option>
                          </select>
                        </div>
                      </div>

                      <div className="w-px h-8 bg-black/[0.05]" />

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-black/[0.05]">
                          <Settings2 className="w-3.5 h-3.5 text-muted" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black uppercase tracking-wider text-muted">
                            Status
                          </span>
                          <button
                            onClick={() =>
                              setFormData({
                                ...formData,
                                status:
                                  formData.status === "Published"
                                    ? "Draft"
                                    : "Published",
                              })
                            }
                            className="text-start text-xs font-bold text-primary -ml-1 py-0.5 hover:text-accent transition-colors"
                          >
                            {formData.status}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <TiptapEditor
                      content={formData.content}
                      onChange={(html) =>
                        setFormData({ ...formData, content: html })
                      }
                      className="min-h-[500px] prose-lg"
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[40px] shadow-2xl shadow-black/5 border border-black/[0.03] overflow-hidden min-h-[90vh]"
              >
                {/* Preview Header */}
                <div className="h-[400px] relative">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center">
                      <span className="font-serif italic text-muted text-2xl">
                        No Cover Image
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                      {formData.category}
                    </span>
                    <h1 className="text-5xl md:text-6xl font-serif italic font-bold leading-tight max-w-4xl">
                      {formData.title || "Untitled Story"}
                    </h1>
                  </div>
                </div>

                <div className="max-w-3xl mx-auto py-16 px-8">
                  <div className="prose prose-lg prose-serif prose-headings:font-serif prose-headings:italic focus:outline-none max-w-none">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formData.content || "<p>Start writing...</p>",
                      }}
                    />
                  </div>

                  {formData.linkedProducts.length > 0 && (
                    <div className="mt-20 pt-12 border-t border-black/5">
                      <h3 className="font-serif italic font-bold text-3xl text-center mb-12">
                        Shop the Story
                      </h3>
                      <div className="grid grid-cols-2 gap-8">
                        {formData.linkedProducts.map((product) => (
                          <div
                            key={product.id}
                            className="group cursor-pointer space-y-4"
                          >
                            <div className="aspect-[4/5] bg-secondary rounded-2xl overflow-hidden relative">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            </div>
                            <div className="text-center">
                              <h4 className="font-serif italic font-bold text-lg">
                                {product.name}
                              </h4>
                              <p className="text-xs font-black uppercase tracking-wider text-muted mt-1">
                                {product.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sidebar */}
          <aside className="sticky top-28 space-y-6">
            {/* Permalink / Slug Widget */}
            <div className="bg-white rounded-[32px] border border-black/[0.03] shadow-xl shadow-black/[0.02] p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <LinkIcon className="w-4 h-4 text-accent" />
                <span className="text-sm font-bold text-primary">
                  Permalink
                </span>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-muted">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => {
                    setFormData({ ...formData, slug: e.target.value });
                    setIsSlugEdited(true);
                  }}
                  placeholder="post-url-slug"
                  className="w-full bg-secondary/30 border-none rounded-xl py-3 px-4 text-xs font-mono text-primary focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-muted/50"
                />
                <p className="text-[10px] text-muted">
                  Example: domain.com/blog/{formData.slug || "your-slug-here"}
                </p>
              </div>
            </div>

            {/* Products Widget */}
            <div className="bg-white rounded-[32px] border border-black/[0.03] shadow-xl shadow-black/[0.02] p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-accent" />
                  <span className="text-sm font-bold text-primary">
                    Products
                  </span>
                </div>
                <span className="text-[10px] font-black bg-black text-white px-2 py-0.5 rounded-full">
                  {formData.linkedProducts.length}/3
                </span>
              </div>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-secondary/30 border-none rounded-xl py-3 pl-10 pr-4 text-xs font-medium focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-muted/70"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                />
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-black/5 scrollbar-track-transparent">
                {isLoadingProducts ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-3 text-muted">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <p className="text-xs font-medium">Loading catalog...</p>
                  </div>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => {
                    const isSelected = formData.linkedProducts.some(
                      (p) => p.id === product.id,
                    );
                    return (
                      <motion.div
                        key={product.id}
                        layoutId={`product-${product.id}`}
                        onClick={() => toggleProduct(product)}
                        className={cn(
                          "group p-3 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center gap-4 relative overflow-hidden",
                          isSelected
                            ? "bg-black border-black text-white shadow-lg shadow-black/20"
                            : "bg-white border-black/[0.05] hover:border-black/10 hover:shadow-md hover:-translate-y-0.5",
                        )}
                      >
                        <div className="w-14 h-14 bg-white rounded-xl overflow-hidden shrink-0 border border-black/5 relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate section-heading">
                            {product.name}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <p
                              className={cn(
                                "text-[10px] font-black uppercase tracking-wider",
                                isSelected ? "text-white/60" : "text-muted",
                              )}
                            >
                              {product.price}
                            </p>
                            {!isSelected && (
                              <div className="w-6 h-6 rounded-full border border-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Search className="w-3 h-3 text-black" />
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 px-6">
                    <div className="w-12 h-12 rounded-full bg-secondary mx-auto flex items-center justify-center mb-3">
                      <Search className="w-5 h-5 text-muted" />
                    </div>
                    <p className="text-sm font-bold text-primary">
                      No products found
                    </p>
                    <p className="text-xs text-muted mt-1">
                      Try different keywords to find your items.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Offer Widget */}
            <div className="bg-gradient-to-br from-black to-neutral-900 rounded-[32px] p-6 text-white shadow-xl shadow-black/20 relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-accent" />
                  <span className="text-sm font-bold">Active Offer</span>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-white/40">
                    Campaign Code
                  </label>
                  <select
                    value={formData.activeOffer}
                    onChange={(e) =>
                      setFormData({ ...formData, activeOffer: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white outline-none focus:bg-white/20 transition-all cursor-pointer appearance-none"
                  >
                    <option value="" className="bg-neutral-900 text-white">
                      No Active Offer
                    </option>
                    <option
                      value="WELCOME2024"
                      className="bg-neutral-900 text-white"
                    >
                      WELCOME2024
                    </option>
                    <option
                      value="FESTIVE50"
                      className="bg-neutral-900 text-white"
                    >
                      FESTIVE50
                    </option>
                  </select>
                </div>
              </div>

              <Sparkles className="absolute -right-8 -bottom-8 w-32 h-32 text-white/5 rotate-12 group-hover:rotate-45 transition-transform duration-700" />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
