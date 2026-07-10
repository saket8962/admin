import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import api from "../lib/api";
import { API_ENDPOINTS } from "../config/endpoints";
import { toast } from "sonner";
import ConfirmModal from "../components/ui/ConfirmModal";

// Sub-components
import CategoriesSkeleton from "../components/skeletons/CategoriesSkeleton";
import CategoryStats from "../components/categories/CategoryStats";
import CategoriesTable from "../components/categories/CategoriesTable";
import CategoryFormDrawer from "../components/categories/CategoryFormDrawer";

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
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Debounce search term changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch categories using React Query
  const {
    data: categories = [],
    isLoading,
    error,
    refetch: refetchCategories,
  } = useQuery<Category[]>({
    queryKey: ["categoriesList", debouncedSearch],
    queryFn: async () => {
      const response = await api.get(
        `${API_ENDPOINTS.CATEGORIES.BASE}?search=${encodeURIComponent(debouncedSearch)}`
      );
      return response.data.data || [];
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to load categories");
    }
  }, [error]);

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
          payload
        );
        toast.success("Category updated successfully");
      } else {
        await api.post(API_ENDPOINTS.CATEGORIES.BASE, payload);
        toast.success("Category created successfully");
      }

      refetchCategories();
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
      refetchCategories();
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
        refetchCategories();
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

  if (isLoading) {
    return <CategoriesSkeleton />;
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif">Category Management</h1>
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
      <CategoryStats categories={categories} />

      {/* Categories Table */}
      <CategoriesTable
        categories={categories}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        toggleStatus={toggleStatus}
        handleEditClick={handleEditClick}
        setDeleteId={setDeleteId}
      />

      {/* Category Creation Sidebar Form */}
      <CategoryFormDrawer
        isOpen={isSidebarOpen}
        onClose={resetSidebar}
        editingCategory={editingCategory}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        isSubmitting={isSubmitting}
        isUploading={isUploading}
        handleFormSubmit={handleFormSubmit}
        handleImageUpload={handleImageUpload}
      />

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
