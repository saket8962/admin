import { useState, useEffect } from "react";
import {
  Layers,
  Plus,
  Search,
  ChevronRight,
  Eye,
  EyeOff,
  Trash2,
  Package,
  TrendingUp,
  Image as ImageIcon,
  X,
  CheckCircle2,
  Loader2,
  Pencil,
} from "lucide-react";
import { cn } from "../lib/utils";
import api from "../lib/api";
import { API_ENDPOINTS } from "../config/endpoints";
import { toast } from "sonner";
import ConfirmModal from "../components/ui/ConfirmModal";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount: number;
  status: "Active" | "Hidden";
  revenue: number;
  isFeatured: boolean;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: "",
    slug: "",
    status: "Active",
    isFeatured: false,
    image: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(
        `${API_ENDPOINTS.CATEGORIES.BASE}?search=${searchTerm}`,
      );
      setCategories(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCategories();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...newCategory,
        slug:
          newCategory.slug ||
          newCategory.name.toLowerCase().replace(/\s+/g, "-"),
      };

      if (editingCategory) {
        await api.put(
          `${API_ENDPOINTS.CATEGORIES.BASE}/${editingCategory._id}`,
          payload,
        );
        toast.success("Category updated successfully");
      } else {
        await api.post(API_ENDPOINTS.CATEGORIES.BASE, payload);
        toast.success("Category created successfully");
      }

      fetchCategories();
      resetSidebar();
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to process category";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setNewCategory({ ...category });
    setIsSidebarOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await api.post(API_ENDPOINTS.UPLOAD, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNewCategory((prev) => ({ ...prev, image: response.data.url }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const resetSidebar = () => {
    setIsSidebarOpen(false);
    setEditingCategory(null);
    setNewCategory({
      name: "",
      slug: "",
      status: "Active",
      isFeatured: false,
      image: "",
    });
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "Active" ? "Hidden" : "Active";
      await api.put(`${API_ENDPOINTS.CATEGORIES.BASE}/${id}`, {
        status: newStatus,
      });
      toast.success(`Category marked as ${newStatus}`);
      fetchCategories();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    const promise = api.delete(`${API_ENDPOINTS.CATEGORIES.BASE}/${deleteId}`);

    toast.promise(promise, {
      loading: "Removing category...",
      success: () => {
        fetchCategories();
        setDeleteId(null);
        return "Category removed successfully";
      },
      error: "Failed to remove category",
    });

    try {
      await promise;
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
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
              Category Management
            </h1>
            <p className="text-muted text-sm">
              Organize your product hierarchy and merchandising.
            </p>
          </div>
          <button
            onClick={() => {
              resetSidebar();
              setIsSidebarOpen(true);
            }}
            className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-border flex flex-col gap-2 shadow-sm">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg w-fit">
              <Layers className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold">{categories.length}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
              Total Categories
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-border flex flex-col gap-2 shadow-sm">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg w-fit">
              <Package className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold">
              {categories.reduce((acc, c) => acc + (c.productCount || 0), 0)}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
              Total Products Map
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-border flex flex-col gap-2 shadow-sm">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg w-fit">
              <TrendingUp className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold">₹ 2.45L</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
              Avg. Category Rev
            </p>
          </div>
          <div className="bg-primary text-white p-6 rounded-2xl shadow-xl shadow-primary/20 flex flex-col justify-between">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
              Top Performer
            </p>
            <h3 className="text-xl font-bold mt-1">Indoor Lighting</h3>
            <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-4">
              <span className="text-[10px] font-medium">12% Growth</span>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </div>
          </div>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden border-b-4 border-b-accent/20 min-h-[400px] flex flex-col">
          <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-secondary/30 border border-transparent rounded-lg text-sm focus:bg-white focus:ring-4 focus:ring-accent/10 transition-all outline-none"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted p-12">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Accessing Collections...
              </span>
            </div>
          ) : categories.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted p-12">
              <Layers className="w-12 h-12 text-secondary" />
              <p className="font-bold uppercase tracking-widest text-sm">
                No categories yet
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-secondary/40 text-[10px] uppercase tracking-widest text-muted font-bold">
                  <tr>
                    <th className="px-6 py-4">Category Name</th>
                    <th className="px-6 py-4">Products</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Revenue</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {categories.map((category) => (
                    <tr
                      key={category._id}
                      className="group hover:bg-secondary/10 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all overflow-hidden">
                            {category.image ? (
                              <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Layers className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-primary">
                              {category.name}
                            </p>
                            <p className="text-[10px] text-muted font-mono">
                              {category.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">
                            {category.productCount || 0}
                          </span>
                          <Package className="w-3.5 h-3.5 text-muted" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            toggleStatus(category._id, category.status)
                          }
                          className={cn(
                            "flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all",
                            category.status === "Active"
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                              : "bg-amber-50 text-amber-600 border border-amber-100",
                          )}
                        >
                          {category.status === "Active" ? (
                            <Eye className="w-3 h-3" />
                          ) : (
                            <EyeOff className="w-3 h-3" />
                          )}
                          {category.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 font-bold text-accent text-sm">
                        ₹ {(category.revenue || 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleEditClick(category)}
                            className="p-2 hover:bg-white text-muted hover:text-accent rounded-lg border border-transparent hover:border-border transition-all"
                            title="Edit Category"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(category._id)}
                            className="p-2 hover:bg-white text-muted hover:text-red-500 rounded-lg border border-transparent hover:border-border transition-all"
                            title="Delete Category"
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

      {/* Category Creation Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-out border-l border-border",
          isSidebarOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <h2 className="text-xl font-bold font-serif italic text-primary">
              {editingCategory ? "Edit Category" : "New Category"}
            </h2>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-secondary rounded-full transition-all"
            >
              <X className="w-5 h-5 text-muted" />
            </button>
          </div>

          <form
            onSubmit={handleFormSubmit}
            className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar"
          >
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                Category Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Modern Chandeliers"
                required
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/40 outline-none transition-all text-sm font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                Category Slug
              </label>
              <input
                type="text"
                placeholder="URL slug (leave empty for auto)"
                value={newCategory.slug}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, slug: e.target.value })
                }
                className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/40 outline-none transition-all text-sm font-mono"
              />
            </div>

            <div className="p-6 bg-accent/[0.03] rounded-2xl border border-accent/10 space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                <ImageIcon className="w-3 h-3" /> Merchandising Info
              </h4>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  id="category-image"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("category-image")?.click()
                  }
                  className="w-16 h-16 bg-white border-2 border-dashed border-border rounded-xl flex items-center justify-center text-muted hover:border-accent hover:text-accent transition-all cursor-pointer group overflow-hidden relative"
                >
                  {isUploading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : newCategory.image ? (
                    <img
                      src={newCategory.image}
                      className="w-full h-full object-cover"
                      alt="Preview"
                    />
                  ) : (
                    <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  )}
                </button>
                <p className="text-xs text-muted flex-1 italic">
                  {newCategory.image
                    ? "Image uploaded successfully. Click to change."
                    : "Assign a hero image for the category landing page."}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-xl">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  Featured Category
                </span>
                <span className="text-[9px] text-muted">
                  Show in homepage navigation
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={newCategory.isFeatured}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      isFeatured: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>

            <div className="pt-8 mt-auto border-t border-border">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:bg-primary/90 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                {isSubmitting
                  ? "Processing..."
                  : editingCategory
                    ? "Update Category"
                    : "Save Category"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Category?"
        message="This will permanently remove this category and all its merchandising data. Product assignments will need to be updated manually. Are you sure?"
        confirmLabel="Remove Category"
        isLoading={isDeleting}
      />
    </div>
  );
}
