import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  widthClass?: string; // Default to "w-[400px]"
}

export default function Drawer({
  isOpen,
  onClose,
  title,
  children,
  widthClass = "w-[400px]",
}: DrawerProps) {
  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return createPortal(
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/45 backdrop-blur-[2px] z-[999] transition-opacity duration-300 animate-in fade-in"
          onClick={onClose}
        />
      )}

      {/* Drawer panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full bg-white shadow-2xl z-[1000] transform transition-transform duration-500 ease-out border-l border-border flex flex-col max-w-full",
          widthClass,
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-8 h-full flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <h2 className="text-xl font-bold font-serif italic text-primary">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-full transition-all animate-in spin-in-12 duration-300"
            >
              <X className="w-5 h-5 text-muted" />
            </button>
          </div>
          {/* Content */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {children}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
