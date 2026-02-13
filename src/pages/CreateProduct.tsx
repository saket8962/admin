import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, ChevronRight, Loader2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import api from "../lib/api";
import { API_ENDPOINTS } from "../config/endpoints";
import type { ProductFormData } from "../validations/productSchema";

import { productSchema } from "../validations/productSchema";

// Sub-components
import ProductGeneralInfo from "../components/products/ProductGeneralInfo";
import ProductMediaSection from "../components/products/ProductMediaSection";
import ProductFeatures from "../components/products/ProductFeatures";
import ProductSEO from "../components/products/ProductSEO";
import ProductSpecifications from "../components/products/ProductSpecifications";
import ProductPricing from "../components/products/ProductPricing";
import ProductOrganization from "../components/products/ProductOrganization";

export default function CreateProduct() {
  const { slug: urlSlug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(!!urlSlug);
  const [productId, setProductId] = useState<string | null>(null);

  const isEditMode = !!urlSlug;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      price: 0,
      category: "Pendants",
      stock: 10,
      sku: "",
      discountPrice: undefined,
      status: "Draft",
      brand: "NIVAA",
      metaTitle: "",
      metaDescription: "",
      specifications: [{ key: "", value: "" }],
      isFeatured: false,
      isNewProduct: true,
      features: [""],
      images: [],
    },
  });

  const currentSlug = watch("slug");

  // Fetch product data if in edit mode
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(
          `${API_ENDPOINTS.PRODUCTS.BASE}/${urlSlug}`,
        );
        const product = response.data.data;

        setProductId(product._id);

        // Populate form
        reset({
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          category: product.category,
          stock: product.stock,
          sku: product.sku || "",
          discountPrice: product.discountPrice,
          status: product.status,
          brand: product.brand || "NIVAA",
          metaTitle: product.metaTitle || "",
          metaDescription: product.metaDescription || "",
          specifications:
            product.specifications?.length > 0
              ? product.specifications
              : [{ key: "", value: "" }],
          isFeatured: product.isFeatured || false,
          isNewProduct: product.isNewProduct || false,
          features: product.features?.length > 0 ? product.features : [""],
          images: product.images || [],
        });

        setImages(product.images || []);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        toast.error("Failed to load product data");
        navigate("/products");
      } finally {
        setIsLoading(false);
      }
    };

    if (isEditMode) {
      fetchProduct();
    }
  }, [urlSlug, isEditMode, reset, navigate]);

  // Auto-slug generator
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditMode) return; // Don't auto-generate slug in edit mode
    const name = e.target.value;
    const generatedSlug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
    setValue("slug", generatedSlug, { shouldValidate: true });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      const updatedImages = [...images, ...newImages].slice(0, 5);
      setImages(updatedImages);
      setValue("images", updatedImages, { shouldValidate: true });
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    setValue("images", updatedImages, { shouldValidate: true });
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);

    const promise = isEditMode
      ? api.put(`${API_ENDPOINTS.PRODUCTS.BASE}/${productId}`, data)
      : api.post(API_ENDPOINTS.PRODUCTS.BASE, data);

    toast.promise(promise, {
      loading: isEditMode ? "Updating product..." : "Creating product...",
      success: () => {
        navigate("/products");
        return isEditMode
          ? "Product updated successfully!"
          : "Product created successfully!";
      },
      error: (err) => {
        const message =
          err.response?.data?.message ||
          err.message ||
          (isEditMode
            ? "Failed to update product"
            : "Failed to create product");
        return `Error: ${message}`;
      },
    });

    try {
      await promise;
    } catch (err) {
      console.error(
        isEditMode ? "Failed to update product:" : "Failed to create product:",
        err,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-muted">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
        <span className="text-sm font-bold uppercase tracking-widest">
          Loading Inventory...
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit as SubmitHandler<ProductFormData>)}
      className="space-y-8 animate-in fade-in duration-500 pb-20"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/products"
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted mb-1">
              <span>Products</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-accent">
                {isEditMode ? "Edit Product" : "New Product"}
              </span>
            </div>
            <h1 className="text-2xl font-bold font-serif">
              {isEditMode ? "Edit Product" : "Create New Product"}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="px-4 py-2 text-sm font-bold uppercase tracking-wider text-muted hover:text-primary transition-colors"
          >
            Discard
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSubmitting
              ? "Saving..."
              : isEditMode
                ? "Update Product"
                : "Save Product"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <ProductGeneralInfo
            register={register}
            errors={errors}
            handleNameChange={handleNameChange}
          />

          <ProductMediaSection
            images={images}
            dragActive={dragActive}
            setDragActive={setDragActive}
            handleImageUpload={handleImageUpload}
            removeImage={removeImage}
            setImages={setImages}
          />
          {errors.images && (
            <p className="mt-[-2rem] text-xs text-red-500 font-medium">
              {errors.images.message}
            </p>
          )}

          <ProductFeatures control={control} register={register} />

          <ProductSEO register={register} />

          <ProductSpecifications control={control} register={register} />
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-8">
          <ProductOrganization register={register} slug={currentSlug} />
          <ProductPricing register={register} errors={errors} />
        </div>
      </div>
    </form>
  );
}
