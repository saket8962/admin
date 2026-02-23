import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPrevPage,
}: PaginationProps) {
  // If no specific override provided, calculate based on page numbers
  const canGoBack = hasPrevPage ?? currentPage > 1;
  const canGoForward = hasNextPage ?? currentPage < totalPages;

  return (
    <div className="px-6 py-4 bg-secondary/10 border-t border-border flex items-center justify-between">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={!canGoBack}
        className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary disabled:opacity-50 disabled:hover:text-muted transition-colors"
      >
        <ChevronLeft className="w-3 h-3" />
        Previous
      </button>

      <div className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-widest">
        Page <span className="text-primary">{currentPage}</span> of{" "}
        {Math.max(1, totalPages)}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoForward}
        className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-accent hover:underline transition-colors disabled:opacity-50 disabled:hover:no-underline"
      >
        Next
        <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
}
