import React from "react";
import { Settings, Trash2 } from "lucide-react";
import type { UseFormRegister, Control } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import type { ProductFormData } from "../../validations/productSchema";

interface ProductSpecificationsProps {
  control: Control<ProductFormData>;
  register: UseFormRegister<ProductFormData>;
}

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({
  control,
  register,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "specifications",
  });

  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-primary">
          <Settings className="w-5 h-5" />
          <h3 className="font-bold">Technical Specifications</h3>
        </div>
        <button
          type="button"
          onClick={() => append({ key: "", value: "" })}
          className="text-[10px] font-bold uppercase tracking-widest text-accent hover:underline"
        >
          Add Row
        </button>
      </div>
      <div className="space-y-4">
        {fields.map((field, idx) => (
          <div
            key={field.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-secondary/10 rounded-xl relative group"
          >
            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-muted">
                Attribute
              </label>
              <input
                {...register(`specifications.${idx}.key` as any)}
                type="text"
                placeholder="e.g. Material"
                className="w-full px-3 py-2 bg-white border border-border/50 rounded-lg text-sm outline-none focus:border-accent/30"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-muted">
                Value
              </label>
              <input
                {...register(`specifications.${idx}.value` as any)}
                type="text"
                placeholder="e.g. Solid Brass"
                className="w-full px-3 py-2 bg-white border border-border/50 rounded-lg text-sm outline-none focus:border-accent/30"
              />
            </div>
            <button
              type="button"
              onClick={() => remove(idx)}
              className="absolute -right-2 -top-2 w-6 h-6 bg-white border border-border rounded-full flex items-center justify-center text-muted hover:text-red-500 hover:border-red-200 shadow-sm opacity-0 group-hover:opacity-100 transition-all z-10"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSpecifications;
