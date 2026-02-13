import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  images: z.array(z.string()).min(1, "At least one image is required").max(5),
  features: z.array(z.string()).default([""]),
  isNewProduct: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  stock: z.coerce.number().int().min(0, "Stock must be at least 0"),
  sku: z.string().optional().default(""),
  discountPrice: z.coerce.number().min(0).optional(),
  status: z
    .enum(["Draft", "Published", "Scheduled", "Archived"])
    .default("Draft"),
  brand: z.string().default("NIVAA"),
  metaTitle: z.string().optional().default(""),
  metaDescription: z.string().optional().default(""),
  specifications: z
    .array(
      z.object({
        key: z.string(),
        value: z.string(),
      }),
    )
    .default([{ key: "", value: "" }]),
});

export type ProductFormData = z.infer<typeof productSchema>;
