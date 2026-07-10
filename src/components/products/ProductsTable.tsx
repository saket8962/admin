import React from "react";
import { Link } from "react-router-dom";
import { Loader2, Package, Check, Edit, Trash2 } from "lucide-react";
import type { Product } from "../../types/product";
import Pagination from "../ui/Pagination";

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
  selectedItems: string[];
  onSelectItem: (id: string) => void;
  onSelectAll: () => void;
  openDeleteConfirm: (ids: string[]) => void;
  page: number;
  setPage: (page: number) => void;
  totalCount: number;
  limit: number;
}

export default function ProductsTable({
  products,
  isLoading,
  selectedItems,
  onSelectItem,
  onSelectAll,
  openDeleteConfirm,
  page,
  setPage,
  totalCount,
  limit,
}: ProductsTableProps) {
  const allSelected =
    products.length > 0 && selectedItems.length === products.length;

  return (
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
                      onClick={onSelectAll}
                      className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-all ${
                        allSelected
                          ? "bg-accent border-accent text-white"
                          : "border-border bg-white"
                      }`}
                    >
                      {allSelected && <Check className="w-3 h-3" />}
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
                {products.map((product) => {
                  const isSelected = selectedItems.includes(product._id!);
                  return (
                    <tr
                      key={product._id}
                      className={`group transition-all ${
                        isSelected
                          ? "bg-accent/[0.03]"
                          : "hover:bg-secondary/20"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div
                          onClick={() => onSelectItem(product._id!)}
                          className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-all ${
                            isSelected
                              ? "bg-accent border-accent text-white"
                              : "border-border bg-white"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
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
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalCount / limit) || 1}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
