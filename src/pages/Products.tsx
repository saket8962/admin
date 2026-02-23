import { useState, useEffect } from "react";

import {
  Plus,
  Search,
  Package,
  Download,
  Loader2,
  Trash2,
  Edit,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import api from "../lib/api";

import { API_ENDPOINTS } from "../config/endpoints";
import type { Product } from "../types/product";
import ConfirmModal from "../components/ui/ConfirmModal";
import ImportModal from "../components/products/ImportModal";
import { usePagination } from "../hooks/usePagination";
import Pagination from "../components/ui/Pagination";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [totalCount, setTotalCount] = useState(0);

  const { page, setPage, resetPage, limit } = usePagination();

  // Modal State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState<{
    ids: string[];
    title: string;
    message: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(API_ENDPOINTS.CATEGORIES.BASE);
        setCategories(response.data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      let query = `${API_ENDPOINTS.PRODUCTS.BASE}?page=${page}&limit=${limit}&search=${searchTerm}&sortBy=${sortBy}&order=${sortOrder}`;
      if (selectedCategory) {
        query += `&category=${encodeURIComponent(selectedCategory)}`;
      }
      const response = await api.get(query);
      setProducts(response.data.data);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 500); // Debounce search
    return () => clearTimeout(timer);
  }, [page, searchTerm, selectedCategory, sortBy, sortOrder]);

  const toggleSelectAll = () => {
    if (selectedItems.length === products.length && products.length > 0) {
      setSelectedItems([]);
    } else {
      setSelectedItems(products.map((p) => p._id!).filter(Boolean));
    }
  };

  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const openDeleteConfirm = (ids: string[]) => {
    if (ids.length === 0) return;
    const isMultiple = ids.length > 1;
    setConfirmConfig({
      ids,
      title: isMultiple ? "Delete Multiple Products" : "Delete Product",
      message: isMultiple
        ? `Are you sure you want to delete ${ids.length} products? This action cannot be undone.`
        : "Are you sure you want to delete this product? This action cannot be undone.",
    });
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!confirmConfig) return;

    setIsDeleting(true);
    try {
      await api.delete(API_ENDPOINTS.PRODUCTS.BASE, {
        data: { ids: confirmConfig.ids },
      });
      toast.success(
        confirmConfig.ids.length > 1
          ? `${confirmConfig.ids.length} products deleted successfully`
          : "Product deleted successfully",
      );
      setSelectedItems((prev) =>
        prev.filter((id) => !confirmConfig.ids.includes(id)),
      );
      fetchProducts();
      setIsConfirmOpen(false);
    } catch (error: any) {
      console.error("Failed to delete products:", error);
      toast.error(error.response?.data?.message || "Failed to delete products");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => !isDeleting && setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title={confirmConfig?.title || ""}
        message={confirmConfig?.message || ""}
        confirmLabel={isDeleting ? "Deleting..." : "Delete"}
        isLoading={isDeleting}
      />

      <ImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onSuccess={fetchProducts}
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif">Products</h1>
          <p className="text-muted text-sm">
            Manage your inventory and product catalogs.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsImportOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-md text-sm font-bold uppercase tracking-wider text-muted hover:bg-secondary hover:text-primary transition-all"
          >
            <Upload className="w-4 h-4" />
            Import
          </button>
          <Link
            to="/products/create"
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col gap-4">
        <div className="bg-white p-4 rounded-xl border border-border flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                resetPage();
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-secondary/30 border border-transparent rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-4 focus:ring-accent/10 focus:border-accent/30 transition-all"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                resetPage();
              }}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-bold uppercase tracking-widest text-muted hover:bg-secondary hover:text-primary transition-all outline-none focus:ring-2 focus:ring-accent/10"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [sort, order] = e.target.value.split("-");
                setSortBy(sort);
                setSortOrder(order);
                resetPage();
              }}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-bold uppercase tracking-widest text-muted hover:bg-secondary hover:text-primary transition-all outline-none focus:ring-2 focus:ring-accent/10"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="stock-asc">Stock: Low to High</option>
              <option value="stock-desc">Stock: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select>
            <button className="p-2.5 border border-border rounded-lg text-muted hover:bg-secondary hover:text-primary transition-all">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedItems.length > 0 && (
          <div className="bg-primary text-white px-6 py-3 rounded-xl flex items-center justify-between animate-in slide-in-from-top-4 duration-300 shadow-xl shadow-primary/20">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold uppercase tracking-widest">
                {selectedItems.length} Products Selected
              </span>
              <div className="h-4 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openDeleteConfirm(selectedItems)}
                  className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md transition-colors border border-white/10 text-red-100"
                >
                  Delete Selection
                </button>
              </div>
            </div>
            <button
              onClick={() => setSelectedItems([])}
              className="text-xs font-bold uppercase tracking-widest hover:underline"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Product Table Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted/60">
            Showing{" "}
            <span className="text-primary font-bold">{products.length}</span> of{" "}
            <span className="text-primary font-bold">{totalCount}</span>{" "}
            Products
          </p>
        </div>

        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden min-h-[400px] flex flex-col">
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted p-12">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Loading Inventory...
              </span>
            </div>
          ) : products.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted p-12">
              <Package className="w-12 h-12 text-secondary" />
              <div className="text-center">
                <p className="font-bold uppercase tracking-widest text-sm mb-1">
                  No products found
                </p>
                <p className="text-xs">Try adjusting your search or filters.</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead className="bg-secondary/40 text-[10px] uppercase tracking-widest text-muted font-bold">
                  <tr>
                    <th className="px-6 py-4 w-10">
                      <div
                        onClick={toggleSelectAll}
                        className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-all ${
                          products.length > 0 &&
                          selectedItems.length === products.length
                            ? "bg-accent border-accent text-white"
                            : "border-border bg-white"
                        }`}
                      >
                        {products.length > 0 &&
                          selectedItems.length === products.length && (
                            <Check className="w-3 h-3" />
                          )}
                      </div>
                    </th>
                    <th className="px-6 py-4">Product Details</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className={`group transition-all ${
                        selectedItems.includes(product._id!)
                          ? "bg-accent/[0.03]"
                          : "hover:bg-secondary/20"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div
                          onClick={() => toggleSelectItem(product._id!)}
                          className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-all ${
                            selectedItems.includes(product._id!)
                              ? "bg-accent border-accent text-white"
                              : "border-border bg-white"
                          }`}
                        >
                          {selectedItems.includes(product._id!) && (
                            <Check className="w-3 h-3" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-secondary/50 rounded-xl overflow-hidden border border-border group-hover:border-accent/30 transition-all flex items-center justify-center">
                            {product.images?.[0] ? (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Package className="w-5 h-5 text-muted/50 group-hover:text-accent/50" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-primary group-hover:text-accent transition-colors">
                              {product.name}
                            </p>
                            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted/60">
                              <span>SKU: {product.sku || "N/A"}</span>
                              <span className="w-1 h-1 bg-border rounded-full" />
                              <span>{product.category}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">
                        <span
                          className={`px-3 py-1 rounded-full border ${
                            product.status === "Published"
                              ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                              : "bg-amber-50 border-amber-200 text-amber-600"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span
                            className={`text-sm font-bold ${
                              product.stock <= 5
                                ? "text-red-500"
                                : "text-primary"
                            }`}
                          >
                            {product.stock}
                          </span>
                          {product.stock <= 5 && (
                            <span className="text-[9px] font-bold text-red-400 uppercase tracking-tighter">
                              Low Stock
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold tracking-tight text-primary">
                        <div className="flex flex-col">
                          <span>₹ {product.price.toLocaleString()}</span>
                          {product.discountPrice && (
                            <span className="text-[10px] text-muted line-through font-medium">
                              ₹ {product.discountPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/products/edit/${product.slug}`}
                            className="p-2 hover:bg-white hover:text-blue-600 hover:shadow-sm border border-transparent hover:border-border rounded-lg transition-all text-muted"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => openDeleteConfirm([product._id!])}
                            className="p-2 hover:bg-white hover:text-red-600 hover:shadow-sm border border-transparent hover:border-border rounded-lg transition-all text-muted"
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

          {/* Pagination Footer replaced with Component */}
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalCount / limit) || 1}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
