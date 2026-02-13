import React from "react";
import { Layers, Trash2 } from "lucide-react";
import type { UseFormRegister, Control } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import type { ProductFormData } from "../../validations/productSchema";

interface ProductFeaturesProps {
  control: Control<ProductFormData>;
  register: UseFormRegister<ProductFormData>;
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({
  control,
  register,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "features" as never,
  });

  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-primary">
          <Layers className="w-5 h-5" />
          <h3 className="font-bold">Product Features</h3>
        </div>
        <button
          type="button"
          onClick={() => append("")}
          className="text-[10px] font-bold uppercase tracking-widest text-accent hover:underline"
        >
          Add Feature
        </button>
      </div>
      <div className="space-y-4">
        {fields.map((field, idx) => (
          <div key={field.id} className="flex gap-2">
            <input
              {...register(`features.${idx}` as any)}
              type="text"
              placeholder="e.g. Solid Brass Housing"
              className="flex-1 px-4 py-2.5 bg-secondary/30 border border-transparent rounded-lg focus:bg-white focus:border-accent/30 outline-none transition-all text-sm font-medium"
            />
            <button
              type="button"
              onClick={() => remove(idx)}
              className="p-2 text-muted hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFeatures;
