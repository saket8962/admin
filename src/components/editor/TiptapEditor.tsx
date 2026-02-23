import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ProductExtension } from "./extensions/ProductExtension";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Quote,
  ShoppingBag,
} from "lucide-react";
import { cn } from "../../lib/utils";
import type { Product } from "../../types/product";
import { useState, useEffect } from "react";
import api from "../../lib/api";
import { API_ENDPOINTS } from "../../config/endpoints";
import Placeholder from "@tiptap/extension-placeholder";

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  className?: string; // Allow passing styles
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const [isProductPickerOpen, setIsProductPickerOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (isProductPickerOpen) {
      fetchProducts();
    }
  }, [isProductPickerOpen, search]);

  const fetchProducts = async () => {
    try {
      const response = await api.get(
        `${API_ENDPOINTS.PRODUCTS.BASE}?limit=5&search=${search}`,
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch products for editor:", error);
    }
  };

  if (!editor) {
    return null;
  }

  const addProduct = (product: Product) => {
    editor
      .chain()
      .focus()
      .insertContent({
        type: "productComponent",
        attrs: {
          id: product._id,
          name: product.name,
          price: `₹ ${product.price.toLocaleString()}`,
          image: product.images?.[0] || "",
          slug: product.slug,
        },
      })
      .run();
    setIsProductPickerOpen(false);
  };

  return (
    <div className="border-b border-border p-2 flex flex-wrap gap-2 sticky top-[88px] z-50 bg-white/80 backdrop-blur-md rounded-t-3xl transition-all">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cn(
          "p-2 rounded-lg hover:bg-secondary transition-colors",
          editor.isActive("bold") ? "bg-secondary text-primary" : "text-muted",
        )}
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cn(
          "p-2 rounded-lg hover:bg-secondary transition-colors",
          editor.isActive("italic")
            ? "bg-secondary text-primary"
            : "text-muted",
        )}
      >
        <Italic className="w-4 h-4" />
      </button>
      <div className="w-px h-6 bg-border mx-1 self-center" />
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(
          "p-2 rounded-lg hover:bg-secondary transition-colors",
          editor.isActive("heading", { level: 1 })
            ? "bg-secondary text-primary"
            : "text-muted",
        )}
      >
        <Heading1 className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(
          "p-2 rounded-lg hover:bg-secondary transition-colors",
          editor.isActive("heading", { level: 2 })
            ? "bg-secondary text-primary"
            : "text-muted",
        )}
      >
        <Heading2 className="w-4 h-4" />
      </button>
      <div className="w-px h-6 bg-border mx-1 self-center" />
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          "p-2 rounded-lg hover:bg-secondary transition-colors",
          editor.isActive("bulletList")
            ? "bg-secondary text-primary"
            : "text-muted",
        )}
      >
        <List className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(
          "p-2 rounded-lg hover:bg-secondary transition-colors",
          editor.isActive("orderedList")
            ? "bg-secondary text-primary"
            : "text-muted",
        )}
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn(
          "p-2 rounded-lg hover:bg-secondary transition-colors",
          editor.isActive("blockquote")
            ? "bg-secondary text-primary"
            : "text-muted",
        )}
      >
        <Quote className="w-4 h-4" />
      </button>

      <div className="flex-1" />

      <div className="relative">
        <button
          onClick={() => setIsProductPickerOpen(!isProductPickerOpen)}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border",
            isProductPickerOpen
              ? "bg-accent text-white border-accent shadow-lg shadow-accent/20"
              : "bg-white text-muted border-border hover:border-accent hover:text-accent",
          )}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          Embed Product
        </button>

        {isProductPickerOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-border rounded-xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
            <input
              type="text"
              placeholder="Search catalog..."
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 bg-secondary/30 rounded-lg text-sm mb-3 focus:outline-none border border-transparent focus:border-accent/20"
            />
            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
              {products.map((p) => (
                <button
                  key={p._id}
                  onClick={() => addProduct(p)}
                  className="w-full text-left p-2 hover:bg-secondary rounded-lg flex items-center gap-3 group transition-colors"
                >
                  <div className="w-10 h-10 bg-white border border-border rounded-md overflow-hidden shrink-0">
                    <img
                      src={p.images?.[0] || ""}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate group-hover:text-primary transition-colors">
                      {p.name}
                    </p>
                    <p className="text-[10px] text-muted font-medium">
                      ₹ {p.price.toLocaleString()}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function TiptapEditor({
  content,
  onChange,
  className,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Tell your story...",
      }),
      ProductExtension,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-lg prose-serif max-w-none focus:outline-none min-h-[500px] px-8 py-6",
          className,
        ),
      },
    },
  });

  // Handle external content updates
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      if (editor.getText() === "" && content !== "") {
        editor.commands.setContent(content);
      }
    }
  }, [content, editor]);

  return (
    <div className="bg-white/50 rounded-[32px] border border-black/[0.03] backdrop-blur-sm overflow-hidden flex flex-col relative w-full">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="flex-1" />
    </div>
  );
}
