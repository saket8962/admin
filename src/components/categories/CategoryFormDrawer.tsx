import React from "react";
import { Image as ImageIcon, Loader2, Plus, CheckCircle2 } from "lucide-react";
import Drawer from "../ui/Drawer";

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

interface CategoryFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  editingCategory: Category | null;
  newCategory: Partial<Category>;
  setNewCategory: React.Dispatch<React.SetStateAction<Partial<Category>>>;
  isSubmitting: boolean;
  isUploading: boolean;
  handleFormSubmit: (e: React.FormEvent) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CategoryFormDrawer({
  isOpen,
  onClose,
  editingCategory,
  newCategory,
  setNewCategory,
  isSubmitting,
  isUploading,
  handleFormSubmit,
  handleImageUpload,
}: CategoryFormDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={editingCategory ? "Edit Category" : "New Category"}
    >
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
            Category Full Name
          </label>
          <input
            type="text"
            placeholder="e.g. Modern Chandeliers"
            required
            value={newCategory.name || ""}
            onChange={(e) => {
              const name = e.target.value;
              const slug = name
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]+/g, "");
              setNewCategory({ ...newCategory, name, slug });
            }}
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
            value={newCategory.slug || ""}
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
              checked={newCategory.isFeatured || false}
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
    </Drawer>
  );
}
