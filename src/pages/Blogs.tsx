import { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Calendar,
  User,
  ArrowUpRight,
  TrendingUp,
  Ticket,
  Image as ImageIcon,
  BarChart3,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import api from "../lib/api";
import { API_ENDPOINTS } from "../config/endpoints";
import { toast } from "sonner";
import ConfirmModal from "../components/ui/ConfirmModal";

interface LinkedProduct {
  _id: string;
  name: string;
  price: number;
  slug: string;
  images: string[];
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  createdAt: string;
  status: "Published" | "Draft";
  views: number;
  linkedProducts: LinkedProduct[];
  activeOffer?: string;
}

export default function Blogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Delete Modal State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(
        `${API_ENDPOINTS.BLOGS.BASE}?search=${searchTerm}`,
      );
      setPosts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      toast.error("Failed to load stories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBlogs();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleDeleteClick = (id: string) => {
    setBlogToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!blogToDelete) return;

    setIsDeleting(true);
    try {
      await api.delete(`${API_ENDPOINTS.BLOGS.BASE}/${blogToDelete}`);
      toast.success("Story deleted successfully");
      fetchBlogs();
      setIsConfirmOpen(false);
    } catch (error: any) {
      console.error("Failed to delete blog:", error);
      toast.error(error.response?.data?.message || "Failed to delete story");
    } finally {
      setIsDeleting(false);
      setBlogToDelete(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => !isDeleting && setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Story"
        message="Are you sure you want to delete this story? This action cannot be undone."
        confirmLabel={isDeleting ? "Deleting..." : "Delete"}
        isLoading={isDeleting}
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif">Story Hub</h1>
          <p className="text-muted text-sm">
            Manage narratives that connect your products to lifestyles.
          </p>
        </div>
        <Link
          to="/content/blogs/create"
          className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="w-4 h-4" /> New Story
        </Link>
      </div>

      {/* Blog Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-border flex flex-col gap-2 shadow-sm">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg w-fit">
            <FileText className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold">{posts.length}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Total Stories
          </p>
        </div>
        {/* Static Stats for now - backend doesn't support aggregate stats yet */}
        <div className="bg-white p-6 rounded-2xl border border-border flex flex-col gap-2 shadow-sm">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg w-fit">
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold">4.2K</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Cumulative Reach
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-border flex flex-col gap-2 shadow-sm">
          <div className="p-2 bg-accent/10 text-accent rounded-lg w-fit">
            <BarChart3 className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold">18.4%</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Avg. Conversion
          </p>
        </div>
        <div className="bg-primary text-white p-6 rounded-2xl shadow-xl shadow-primary/20 flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
              Campaign of the Month
            </p>
            <h3 className="text-lg font-bold mt-1 line-clamp-1 italic font-serif">
              Kitchen Revamp
            </h3>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-4 relative z-10">
            <span className="text-[10px] font-medium">ROI: ₹ 42,000</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
          <FileText className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 -rotate-12 transition-transform group-hover:scale-110" />
        </div>
      </div>

      {/* Blog Table */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden border-b-4 border-b-primary/10 min-h-[400px] flex flex-col">
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm bg-secondary/10">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search narrative archives..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-border/40 rounded-lg text-sm focus:border-accent/40 transition-all outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border text-muted rounded-lg text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-all">
            <Filter className="w-4 h-4" /> Advanced Filter
          </button>
        </div>

        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted p-12">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Loading Narratives...
            </span>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted p-12">
            <FileText className="w-12 h-12 text-secondary" />
            <div className="text-center">
              <p className="font-bold uppercase tracking-widest text-sm mb-1">
                No stories found
              </p>
              <p className="text-xs">Start writing your first narrative.</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-secondary/40 text-[10px] uppercase tracking-widest text-muted font-bold">
                <tr>
                  <th className="px-6 py-4">Story Narrative</th>
                  <th className="px-6 py-4">Attached Economy</th>
                  <th className="px-6 py-4">Strategy Status</th>
                  <th className="px-6 py-4">Story Reach</th>
                  <th className="px-6 py-4 text-right">Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {posts.map((post) => (
                  <tr
                    key={post._id}
                    className="group hover:bg-secondary/10 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 max-w-sm">
                        <span className="text-sm font-bold text-primary group-hover:text-accent transition-colors line-clamp-1">
                          {post.title}
                        </span>
                        <div className="flex items-center gap-3 text-[10px] text-muted font-medium">
                          <span className="flex items-center gap-1">
                            <User className="w-2.5 h-2.5 uppercase" />{" "}
                            {post.author}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-2.5 h-2.5" />{" "}
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex -space-x-1.5">
                          {post.linkedProducts &&
                          post.linkedProducts.length > 0 ? (
                            post.linkedProducts.map((p, i) => (
                              <div
                                key={p._id || i}
                                className="w-6 h-6 rounded-full border border-white bg-secondary flex items-center justify-center overflow-hidden"
                                title={p.name}
                              >
                                {p.images && p.images[0] ? (
                                  <img
                                    src={p.images[0]}
                                    alt={p.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <ImageIcon className="w-3 h-3 text-muted" />
                                )}
                              </div>
                            ))
                          ) : (
                            <span className="text-[9px] text-muted italic">
                              Clean Narrative
                            </span>
                          )}
                        </div>
                        {post.activeOffer && (
                          <span className="flex items-center gap-1 text-[9px] font-bold text-accent uppercase tracking-tighter">
                            <Ticket className="w-2.5 h-2.5" />{" "}
                            {post.activeOffer}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <span
                          className={cn(
                            "px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border w-fit",
                            post.status === "Published"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                              : "bg-secondary text-muted border-border",
                          )}
                        >
                          {post.status}
                        </span>
                        <span className="text-[8px] font-bold text-muted uppercase tracking-[0.2em]">
                          {post.category}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/content/blogs/${post._id}/analytics`}
                        className="flex items-center gap-4 group/stats"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-primary">
                            {post.views}
                          </span>
                          <span className="text-[10px] text-muted font-bold uppercase tracking-tighter">
                            Verified Reach
                          </span>
                        </div>
                        <div className="p-1.5 bg-secondary text-muted rounded-lg group-hover/stats:bg-accent group-hover/stats:text-white transition-all">
                          <BarChart3 className="w-3.5 h-3.5" />
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/content/blogs/edit/${post.slug}`} // Or ID depending on route setup
                          className="p-2 hover:bg-white text-muted hover:text-primary rounded-xl border border-transparent hover:border-border transition-all"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(post._id)}
                          className="p-2 hover:bg-white text-muted hover:text-red-500 rounded-xl border border-transparent hover:border-border transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
