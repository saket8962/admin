import React from "react";
import { Search } from "lucide-react";
import type { UseFormRegister } from "react-hook-form";
import type { ProductFormData } from "../../validations/productSchema";

interface ProductSEOProps {
  register: UseFormRegister<ProductFormData>;
}

const ProductSEO: React.FC<ProductSEOProps> = ({ register }) => {
  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6 text-primary">
        <Search className="w-5 h-5" />
        <h3 className="font-bold">Search Engine Listing</h3>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
            Page Title (Meta Title)
          </label>
          <input
            {...register("metaTitle")}
            type="text"
            placeholder="e.g. Luxury Brass Pendants | NIVAA"
            className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/30 outline-none transition-all font-medium"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
            Meta Description
          </label>
          <textarea
            {...register("metaDescription")}
            rows={3}
            placeholder="Summarize the product for search engine results..."
            className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/30 outline-none transition-all font-medium resize-none text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductSEO;
