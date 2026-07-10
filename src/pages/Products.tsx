import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Plus, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import api from "../lib/api";

import { API_ENDPOINTS } from "../config/endpoints";
import type { Product } from "../types/product";
import ConfirmModal from "../components/ui/ConfirmModal";
import ImportModal from "../components/products/ImportModal";
import { usePagination } from "../hooks/usePagination";

// Sub-components
import ProductFilters from "../components/products/ProductFilters";
import ProductsTable from "../components/products/ProductsTable";

interface ProductsApiResponse {
  data: Product[];
  totalCount: number;
}

export default function Products() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

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

  // Debounce search term changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      resetPage();
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm, resetPage]);

  // Fetch categories using React Query
  const { data: categories = [] } = useQuery<{ _id: string; name: string }[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.CATEGORIES.BASE);
      return response.data.data;
    },
  });

  // Fetch products list with dynamic query keys & layout preservation
  const {
    data: productsData,
    isLoading,
    error,
    refetch: refetchProducts,
  } = useQuery<ProductsApiResponse>({
    queryKey: [
      "productsList",
      { page, limit, search: debouncedSearch, category: selectedCategory, sortBy, sortOrder },
    ],
    queryFn: async () => {
      let query = `${API_ENDPOINTS.PRODUCTS.BASE}?page=${page}&limit=${limit}&search=${encodeURIComponent(
        debouncedSearch
      )}&sortBy=${sortBy}&order=${sortOrder}`;
      if (selectedCategory) {
        query += `&category=${encodeURIComponent(selectedCategory)}`;
      }
      const response = await api.get(query);
      return response.data;
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to load products");
    }
  }, [error]);

  const products = productsData?.data || [];
  const totalCount = productsData?.totalCount || 0;

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
          : "Product deleted successfully"
      );
      setSelectedItems((prev) =>
        prev.filter((id) => !confirmConfig.ids.includes(id))
      );
      refetchProducts();
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
        onSuccess={refetchProducts}
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
        <ProductFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={(sort, order) => {
            setSortBy(sort);
            setSortOrder(order);
          }}
          resetPage={resetPage}
        />

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
      <ProductsTable
        products={products}
        isLoading={isLoading}
        selectedItems={selectedItems}
        onSelectItem={toggleSelectItem}
        onSelectAll={toggleSelectAll}
        openDeleteConfirm={openDeleteConfirm}
        page={page}
        setPage={setPage}
        totalCount={totalCount}
        limit={limit}
      />
    </div>
  );
}
