import React from "react";
import { DollarSign } from "lucide-react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { ProductFormData } from "../../validations/productSchema";

interface ProductPricingProps {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

const ProductPricing: React.FC<ProductPricingProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6 text-primary">
        <DollarSign className="w-5 h-5" />
        <h3 className="font-bold">Pricing & Stock</h3>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
            SKU (Identifier)
          </label>
          <input
            {...register("sku")}
            type="text"
            placeholder="e.g. LUM-BL-001"
            className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/30 outline-none transition-all font-medium text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2 text-primary/70">
              Base Price (₹)
            </label>
            <input
              {...register("price")}
              type="number"
              placeholder="0"
              className={`w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/30 outline-none transition-all font-bold text-sm ${
                errors.price ? "border-red-500 bg-red-50/10" : ""
              }`}
            />
            {errors.price && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {errors.price.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2 text-accent">
              Discount Price (₹)
            </label>
            <input
              {...register("discountPrice")}
              type="number"
              placeholder="0"
              className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/30 outline-none transition-all font-bold text-sm text-accent"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2 text-primary/70">
            Stock Quantity
          </label>
          <input
            {...register("stock")}
            type="number"
            className={`w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/30 outline-none transition-all font-medium text-sm ${
              errors.stock ? "border-red-500 bg-red-50/10" : ""
            }`}
          />
          {errors.stock && (
            <p className="mt-1 text-xs text-red-500 font-medium">
              {errors.stock.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPricing;
