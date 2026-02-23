import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import { ShoppingBag } from "lucide-react";

const ProductComponent = ({ node }: any) => {
  const { name, price, image } = node.attrs;

  return (
    <NodeViewWrapper className="my-8 font-sans not-italic">
      <div className="flex items-center gap-6 p-4 bg-white border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow max-w-2xl mx-auto group cursor-default">
        <div className="w-20 h-20 bg-secondary rounded-xl overflow-hidden shrink-0 border border-black/5">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted">
              <ShoppingBag className="w-6 h-6" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-lg truncate group-hover:text-primary transition-colors">
            {name}
          </h4>
          <p className="text-accent font-bold uppercase tracking-widest text-xs">
            {price}
          </p>
        </div>
        <button className="px-6 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-black/80 transition-colors shrink-0">
          View Product
        </button>
      </div>
    </NodeViewWrapper>
  );
};

export const ProductExtension = Node.create({
  name: "productComponent",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      id: {
        default: null,
      },
      name: {
        default: "Product Name",
      },
      price: {
        default: "$0.00",
      },
      image: {
        default: "",
      },
      slug: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "product-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["product-component", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ProductComponent);
  },
});
