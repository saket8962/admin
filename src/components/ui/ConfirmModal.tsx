import React from "react";
import { X, AlertTriangle, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary";
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  isLoading = false,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 shadow-2xl overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary/20 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={!isLoading ? onClose : undefined}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl border border-border overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            {/* Icon */}
            <div
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mb-6 animate-in slide-in-from-bottom-4 duration-500",
                variant === "danger"
                  ? "bg-red-50 text-red-500"
                  : "bg-accent/10 text-accent",
              )}
            >
              <AlertTriangle className="w-8 h-8" />
            </div>

            {/* Title & Message */}
            <h3 className="text-xl font-bold font-serif text-primary mb-2">
              {title}
            </h3>
            <p className="text-sm text-muted leading-relaxed">{message}</p>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 mt-10">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-muted hover:bg-secondary hover:text-primary transition-all disabled:opacity-50"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={cn(
                "px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50",
                variant === "danger"
                  ? "bg-red-500 hover:bg-red-600 shadow-red-200"
                  : "bg-accent hover:bg-accent/90 shadow-accent/20",
              )}
            >
              {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {confirmLabel}
            </button>
          </div>
        </div>

        {/* Close hint - optional */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 p-2 text-muted/40 hover:text-muted transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
