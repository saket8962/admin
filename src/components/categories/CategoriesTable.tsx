import React from "react";
import {
  Search,
  Layers,
  Package,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
} from "lucide-react";
import { cn } from "../../lib/utils";

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

interface CategoriesTableProps {
  categories: Category[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  toggleStatus: (id: string, currentStatus: string) => void;
  handleEditClick: (category: Category) => void;
  setDeleteId: (id: string) => void;
}

export default function CategoriesTable({
  categories,
  searchTerm,
  setSearchTerm,
  toggleStatus,
  handleEditClick,
  setDeleteId,
}: CategoriesTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden border-b-4 border-b-accent/20 min-h-[400px] flex flex-col animate-in fade-in duration-300">
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

      {categories.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted p-12">
          <Layers className="w-12 h-12 text-secondary" />
          <p className="font-bold uppercase tracking-widest text-sm">
            No categories found
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
                        "flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border",
                        category.status === "Active"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-600 text-emerald-600"
                          : "bg-amber-50 border-amber-200 text-amber-600 text-amber-600"
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
  );
}
