import React from "react";
import { Search, Download } from "lucide-react";

interface Category {
  _id: string;
  name: string;
}

interface ProductFiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  categories: Category[];
  sortBy: string;
  sortOrder: string;
  onSortChange: (sortBy: string, sortOrder: string) => void;
  resetPage: () => void;
}

export default function ProductFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  sortBy,
  sortOrder,
  onSortChange,
  resetPage,
}: ProductFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-border flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            resetPage();
          }}
          className="w-full pl-10 pr-4 py-2.5 bg-secondary/30 border border-transparent rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-4 focus:ring-accent/10 focus:border-accent/30 transition-all"
        />
      </div>
      <div className="flex items-center gap-3 w-full md:w-auto">
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            resetPage();
          }}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-bold uppercase tracking-widest text-muted hover:bg-secondary hover:text-primary transition-all outline-none focus:ring-2 focus:ring-accent/10"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [sort, order] = e.target.value.split("-");
            onSortChange(sort, order);
            resetPage();
          }}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-bold uppercase tracking-widest text-muted hover:bg-secondary hover:text-primary transition-all outline-none focus:ring-2 focus:ring-accent/10"
        >
          <option value="createdAt-desc">Newest First</option>
          <option value="createdAt-asc">Oldest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="stock-asc">Stock: Low to High</option>
          <option value="stock-desc">Stock: High to Low</option>
          <option value="name-asc">Name: A-Z</option>
          <option value="name-desc">Name: Z-A</option>
        </select>
        <button className="p-2.5 border border-border rounded-lg text-muted hover:bg-secondary hover:text-primary transition-all">
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
