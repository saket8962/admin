export interface Specification {
  key: string;
  value: string;
}

export interface Product {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  tags?: string[];
  sizes?: string[] | { size: string; stock: number }[];
  colors?: string[];
  rating?: number;
  reviews?: number;
  category: string;
  images: string[];
  features: string[];
  isNewProduct: boolean;
  isFeatured: boolean;
  stock: number;
  sku: string;
  discountPrice?: number;
  status: "Draft" | "Published" | "Scheduled" | "Archived";
  brand: string;
  metaTitle?: string;
  metaDescription?: string;
  specifications: Specification[];
  createdAt?: string;
  updatedAt?: string;
}
