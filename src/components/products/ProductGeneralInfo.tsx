import React from "react";
import { Info } from "lucide-react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { ProductFormData } from "../../validations/productSchema";

interface ProductGeneralInfoProps {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductGeneralInfo: React.FC<ProductGeneralInfoProps> = ({
  register,
  errors,
  handleNameChange,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6 text-primary">
        <Info className="w-5 h-5" />
        <h3 className="font-bold">General Information</h3>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
            Product Name
          </label>
          <input
            {...register("name")}
            type="text"
            onChange={(e) => {
              register("name").onChange(e);
              handleNameChange(e);
            }}
            placeholder="e.g. Lumina Brass Sconce"
            className={`w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/30 outline-none transition-all font-medium ${
              errors.name ? "border-red-500 bg-red-50/10" : ""
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500 font-medium">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
              Brand
            </label>
            <input
              {...register("brand")}
              type="text"
              placeholder="e.g. NIVAA"
              className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/30 outline-none transition-all font-medium"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={6}
            placeholder="Describe the product materials, design, and inspiration..."
            className={`w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:bg-white focus:border-accent/30 outline-none transition-all font-medium resize-none ${
              errors.description ? "border-red-500 bg-red-50/10" : ""
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500 font-medium">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGeneralInfo;
