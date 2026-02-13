import React from "react";
import { Package, Tag } from "lucide-react";
import type { UseFormRegister } from "react-hook-form";
import type { ProductFormData } from "../../validations/productSchema";
import api from "../../lib/api";
import { API_ENDPOINTS } from "../../config/endpoints";

interface ProductOrganizationProps {
  register: UseFormRegister<ProductFormData>;
  slug: string;
}

const ProductOrganization: React.FC<ProductOrganizationProps> = ({
  register,
  slug,
}) => {
  const [categories, setCategories] = React.useState<{ name: string }[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(API_ENDPOINTS.CATEGORIES.BASE);
        setCategories(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="space-y-8">
      {/* Permalink Card */}
      <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-primary">
          <Tag className="w-5 h-5" />
          <h3 className="font-bold">Product Permalink</h3>
        </div>
        <div className="p-3 bg-secondary/20 rounded-xl border border-border/50">
          <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            URL Preview
          </p>
          <p className="text-xs font-medium text-primary break-all">
            nivaa.com/shop/
            <span className="text-accent font-bold">
              {slug || "new-product"}
            </span>
          </p>
        </div>
      </div>

      {/* Organization */}
      <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6 text-primary">
          <Package className="w-5 h-5" />
          <h3 className="font-bold">Organization</h3>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
              Product Status
            </label>
            <select
              {...register("status")}
              className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl outline-none appearance-none font-medium text-sm transition-all focus:bg-white focus:border-accent/30"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
              Category
            </label>
            <select
              {...register("category")}
              className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl outline-none appearance-none font-medium text-sm transition-all focus:bg-white focus:border-accent/30"
              disabled={isLoading}
            >
              {isLoading ? (
                <option>Loading...</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="pt-4 border-t border-border space-y-4">
            <label className="flex items-center justify-between cursor-pointer group">
              <div>
                <span className="block text-sm font-bold text-muted group-hover:text-primary transition-colors">
                  Featured Product
                </span>
                <span className="text-[10px] text-muted/60">
                  Show on homepage
                </span>
              </div>
              <input
                {...register("isFeatured")}
                type="checkbox"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-secondary/50 rounded-full peer peer-checked:bg-accent relative transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
            <label className="flex items-center justify-between cursor-pointer group">
              <div>
                <span className="block text-sm font-bold text-muted group-hover:text-primary transition-colors">
                  New Arrival
                </span>
                <span className="text-[10px] text-muted/60">
                  Mark as new collection
                </span>
              </div>
              <input
                {...register("isNewProduct")}
                type="checkbox"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-secondary/50 rounded-full peer peer-checked:bg-accent relative transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOrganization;
