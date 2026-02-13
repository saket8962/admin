import React from "react";
import { Upload, Trash2, Plus } from "lucide-react";

interface ProductMediaSectionProps {
  images: string[];
  dragActive: boolean;
  setDragActive: (active: boolean) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ProductMediaSection: React.FC<ProductMediaSectionProps> = ({
  images,
  dragActive,
  setDragActive,
  handleImageUpload,
  removeImage,
  setImages,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-primary">
          <Upload className="w-5 h-5" />
          <h3 className="font-bold">Product Media</h3>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
          {images.length} / 5 Images
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative aspect-square group">
            <img
              src={img}
              alt={`Preview ${idx}`}
              className="w-full h-full object-cover rounded-xl border border-border"
            />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute -top-2 -right-2 bg-white border border-border rounded-full p-1 text-muted hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-all z-10"
            >
              <Trash2 className="w-3 h-3" />
            </button>
            {idx === 0 && (
              <span className="absolute bottom-2 left-2 bg-primary/90 text-white text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                Cover
              </span>
            )}
          </div>
        ))}
        {images.length < 5 && (
          <label
            className={`aspect-square border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 group cursor-pointer transition-all ${
              dragActive
                ? "border-accent bg-accent/5"
                : "border-border bg-secondary/30 hover:border-accent/50"
            }`}
            onDragEnter={() => setDragActive(true)}
            onDragLeave={() => setDragActive(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              const files = e.dataTransfer.files;
              if (files) {
                const newImages = Array.from(files).map((file) =>
                  URL.createObjectURL(file),
                );
                setImages((prev) => [...prev, ...newImages].slice(0, 5));
              }
            }}
          >
            <input
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
            <Plus
              className={`w-6 h-6 transition-colors ${
                dragActive
                  ? "text-accent"
                  : "text-muted group-hover:text-accent"
              }`}
            />
            <span
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                dragActive
                  ? "text-accent"
                  : "text-muted group-hover:text-accent"
              }`}
            >
              {dragActive ? "Drop Here" : "Add Image"}
            </span>
          </label>
        )}
      </div>
    </div>
  );
};

export default ProductMediaSection;
